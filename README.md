# Context Grove

**One trusted project memory for every human and AI agent.**

Context Grove is an open-source, Git-native knowledge layer for software projects. It gives compatible agents the same approved project context through MCP, makes consultation part of the task workflow, and turns useful discoveries into reviewable knowledge. No hosted service, vector database, or vendor lock-in: your Markdown stays in your repository.

## Why it exists

Agents forget between sessions and disagree when each carries a private version of project rules. Context Grove gives the team one auditable source of truth with evidence, ownership, review dates, and a clear path from a fresh observation to reusable guidance.

## Quick start

Requires Node.js 22+ and an MCP-compatible client.

```bash
git clone https://github.com/felipedemacedo/context-grove.git
cd context-grove
npm install
cd /path/to/your-project
node /path/to/context-grove/src/init.js
```

Add the following server to your agent's MCP configuration (adjust the path):

```json
{
  "mcpServers": {
    "context-grove": {
      "command": "node",
      "args": ["/absolute/path/to/context-grove/src/server.js"],
      "env": { "CONTEXT_GROVE_ROOT": "/absolute/path/to/your/project" }
    }
  }
}
```

Copy the included skills from `.context-grove/skills/` into the skill location supported by your agent, then add this short rule to its project instructions:

> Before acting on a task, follow the Context Grove knowledge-consultation skill. At the first Context Grove access on a new UTC date, complete the daily candidate review gate before task work.

See [Setup](docs/setup.md), [Workflow](docs/workflow.md), and [Parallel agents](docs/parallel-agents.md).

## What you get

- **MCP knowledge access:** list areas, read canonical documents, search topics, and check source health. The MCP server is read-only.
- **Consult before execution:** a reusable skill makes agents inspect project instructions, catalog, relevant policies, architecture, and existing patterns before editing.
- **Daily review gate:** the first agent to enter on a new UTC date reviews pending learning candidates and writes a dated, auditable result. Repeat access on that date is idempotent.
- **Shared, reusable knowledge:** evidence-backed candidates, approved docs, decisions, handoffs, and a discoverable catalog live in Git.
- **Parallel by design:** agents can create separate candidate files concurrently. Shared index updates are serialized through Git review/merge; conflicting edits are reconciled instead of silently overwritten.

## Knowledge lifecycle

```text
task discovery -> candidate with evidence -> daily review -> human approval -> canonical doc -> catalog
```

The review gate may keep, reject, or request evidence for a candidate. Promotion to canonical guidance requires an explicitly authorized maintainer; the MCP never writes or promotes knowledge.

## Design principles

1. Git and readable Markdown are the source of truth.
2. Every answer points to its file and section and reports source freshness.
3. Agent memories are shared project assets: factual, bounded, reviewable, and free of secrets or personal data.
4. MCP serves knowledge; normal Git workflows govern changes.
5. Parallel agents do not share mutable process memory. They communicate through committed files, branches, and reviewable handoffs.

## License

MIT. See [LICENSE](LICENSE).
