import { createServer } from "node:http";
import { readFile, readdir, stat, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const root = path.resolve(process.env.CONTEXT_GROVE_ROOT || process.cwd());
const knowledge = path.join(root, ".context-grove");
const safeFile = async (relative) => {
  const absolute = path.resolve(root, relative);
  if (absolute !== root && !absolute.startsWith(root + path.sep)) throw new Error("Path outside project root / Caminho fora da raiz do projeto");
  const resolvedRoot = await realpath(root);
  const resolvedKnowledge = await realpath(knowledge);
  const resolvedFile = await realpath(absolute);
  if (!resolvedKnowledge.startsWith(resolvedRoot + path.sep) || !resolvedFile.startsWith(resolvedKnowledge + path.sep)) {
    throw new Error("Knowledge path resolves outside .context-grove / O caminho de conhecimento aponta para fora de .context-grove");
  }
  return resolvedFile;
};
const freshness = async (file) => {
  try { const s = await stat(await safeFile(file)); return { checked_at: new Date().toISOString(), modified_at: s.mtime.toISOString(), status: "available" }; }
  catch { return { checked_at: new Date().toISOString(), modified_at: null, status: "missing" }; }
};
const textResult = (data) => ({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }] });
const read = async (rel) => readFile(await safeFile(rel), "utf8");
const markdownFiles = async (dir) => {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return []; }
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
  return files;
};

const mcp = new McpServer({ name: "context-grove", version: "0.1.0" });
mcp.tool("knowledge_health", "Check whether the project's Context Grove knowledge source is available. / Verifique se a fonte de conhecimento Context Grove do projeto está disponível.", {}, async () => {
  const required = [".context-grove/README.md", ".context-grove/CATALOG.md", ".context-grove/CONSULTATION.md"];
  const checks = await Promise.all(required.map(async (f) => ({ path: f, ...(await freshness(f)) })));
  return textResult({ status: checks.every((x) => x.status === "available") ? "ready" : "incomplete", root: ".context-grove", checks });
});
mcp.tool("knowledge_catalog", "List knowledge areas and canonical project documents. / Liste as áreas de conhecimento e documentos canônicos do projeto.", {}, async () => {
  const file = ".context-grove/CATALOG.md";
  const content = await read(file);
  return textResult({ content, source: file, freshness: await freshness(file) });
});
mcp.tool("knowledge_read", "Read a project knowledge document by its path relative to .context-grove. / Leia um documento de conhecimento pelo caminho relativo a .context-grove.", { path: z.string().min(1) }, async ({ path: requested }) => {
  const rel = path.posix.normalize(requested).replace(/^\/+/, "");
  if (rel.startsWith("..") || !rel.endsWith(".md")) throw new Error("Provide a Markdown path inside .context-grove / Informe um caminho Markdown dentro de .context-grove");
  const file = `.context-grove/${rel}`;
  const content = await read(file);
  return textResult({ content, traceability: { source: file }, freshness: await freshness(file) });
});
mcp.tool("knowledge_search", "Find matching text in project knowledge and return cited snippets. / Busque texto correspondente no conhecimento e retorne trechos com fontes.", { query: z.string().min(1), limit: z.number().int().min(1).max(20).default(5) }, async ({ query, limit }) => {
  const files = await markdownFiles(knowledge);
  const matches = [];
  for (const full of files) {
    const rel = path.relative(root, full).split(path.sep).join("/");
    let content;
    try { content = await read(rel); } catch { continue; }
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    if (index < 0) continue;
    const heading = content.slice(0, index).match(/^#{1,6}\s+(.+)$/gm)?.at(-1)?.replace(/^#+\s+/, "") ?? null;
    matches.push({ source: rel, section: heading, snippet: content.slice(Math.max(0, index - 100), Math.min(content.length, index + query.length + 180)).replace(/\s+/g, " ").trim(), freshness: await freshness(rel) });
    if (matches.length >= limit) break;
  }
  return textResult({ query, matches });
});

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const transport = new StdioServerTransport();
  await mcp.connect(transport);
}
