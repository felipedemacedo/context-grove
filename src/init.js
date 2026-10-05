import { cp, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(process.env.CONTEXT_GROVE_ROOT || process.cwd());
const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "../templates/knowledge");
const target = path.join(projectRoot, ".context-grove");
try { await access(target); console.error(`Already initialized: ${target}`); process.exit(1); }
catch { /* target does not exist */ }
await mkdir(projectRoot, { recursive: true });
await cp(source, target, { recursive: true });
console.log(`Initialized Context Grove at ${target}`);
console.log("Copy templates/skills/* into your agent's skill directory and add the consultation rule from docs/setup.md.");
