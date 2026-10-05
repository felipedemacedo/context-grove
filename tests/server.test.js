import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const temporaryDirectories = new Set();
const clients = new Set();

afterEach(async () => {
  await Promise.all([...clients].map(async ({ client, transport }) => {
    await client.close().catch(() => {});
    await transport.close().catch(() => {});
  }));
  clients.clear();
  await Promise.all([...temporaryDirectories].map((directory) => rm(directory, { recursive: true, force: true })));
  temporaryDirectories.clear();
});

async function createClient(root) {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.resolve("src/server.js")],
    env: { ...process.env, CONTEXT_GROVE_ROOT: root },
  });
  const client = new Client({ name: "context-grove-test", version: "1.0.0" });
  clients.add({ client, transport });
  await client.connect(transport);
  return client;
}

async function createProject() {
  const root = await mkdtemp(path.join(os.tmpdir(), "context-grove-test-"));
  temporaryDirectories.add(root);
  const knowledge = path.join(root, ".context-grove");
  await mkdir(path.join(knowledge, "docs"), { recursive: true });
  await writeFile(path.join(knowledge, "README.md"), "# Project knowledge\n", "utf8");
  await writeFile(path.join(knowledge, "CATALOG.md"), "# Catalog\n", "utf8");
  await writeFile(path.join(knowledge, "CONSULTATION.md"), "# Consultation\n", "utf8");
  await writeFile(path.join(knowledge, "docs", "architecture.md"), "# Architecture\nThe service uses a queue.\n", "utf8");
  return { root, knowledge };
}

function parseText(result) {
  assert.equal(result.isError, undefined);
  return JSON.parse(result.content[0].text);
}

test("MCP health and document tools read the project's knowledge", async () => {
  const { root } = await createProject();
  const client = await createClient(root);

  const health = parseText(await client.callTool({ name: "knowledge_health", arguments: {} }));
  assert.equal(health.status, "ready");

  const document = parseText(await client.callTool({
    name: "knowledge_read",
    arguments: { path: "docs/architecture.md" },
  }));
  assert.match(document.content, /service uses a queue/);
  assert.equal(document.traceability.source, ".context-grove/docs/architecture.md");

  const search = parseText(await client.callTool({
    name: "knowledge_search",
    arguments: { query: "queue", limit: 5 },
  }));
  assert.equal(search.matches[0].source, ".context-grove/docs/architecture.md");
});

test("MCP refuses paths that escape the knowledge directory", async () => {
  const { root, knowledge } = await createProject();
  const outside = path.join(root, "outside.md");
  await writeFile(outside, "# Private file\n", "utf8");
  await symlink(outside, path.join(knowledge, "docs", "outside.md"));
  const client = await createClient(root);

  const traversal = await client.callTool({
    name: "knowledge_read",
    arguments: { path: "../../outside.md" },
  });
  assert.equal(traversal.isError, true);

  const symlinkEscape = await client.callTool({
    name: "knowledge_read",
    arguments: { path: "docs/outside.md" },
  });
  assert.equal(symlinkEscape.isError, true);
  assert.doesNotMatch(JSON.stringify(symlinkEscape), /Private file/);
});
