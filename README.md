# Context Grove

**One trusted project memory for every human and AI agent.**

Give your coding agents the same project guide, decisions, and lessons learned. Context Grove helps you add that shared memory to your own project in a few small steps.

## Use Context Grove in your project

You need Node.js 22 or newer and an AI coding tool that supports MCP and skills.

### 1. Get Context Grove

Clone the toolkit somewhere on your computer. Keep this folder available because your project and agent will use its MCP server and skill files.

```bash
mkdir -p ~/repos
git clone https://github.com/felipedemacedo/context-grove.git ~/repos/context-grove
npm install --prefix ~/repos/context-grove
```

### 2. Add a knowledge folder to your project

Run the initializer from your project directory. It creates `.context-grove/` with a catalog and starter guides. It will stop if that folder already exists, so it won't overwrite your work.

```bash
cd /path/to/your-project
node ~/repos/context-grove/src/init.js
```

Commit `.context-grove/` to your project repository so your teammates and agents can share it.

### 3. Make the guides yours

Open `.context-grove/CATALOG.md` and follow its links. Add or link the information your project agents should know, such as:

- how the architecture fits together;
- where important code lives and who owns it;
- security, product, and operational rules;
- decisions the team has already made.

Keep useful facts tied to evidence, such as a source file, decision, or issue. When an agent discovers something reusable, it can propose that knowledge as a candidate; the next steps explain how.

### 4. Connect your AI tool

Add Context Grove as an MCP server in your agent's settings. The exact settings file varies by tool; use its MCP server configuration format. This example shows the command and environment values to provide:

```json
{
  "mcpServers": {
    "context-grove": {
      "command": "node",
      "args": ["/absolute/path/to/context-grove/src/server.js"],
      "env": {
        "CONTEXT_GROVE_ROOT": "/path/to/your-project"
      }
    }
  }
}
```

Use absolute paths. `CONTEXT_GROVE_ROOT` must point to your project folder, the one containing `.context-grove/`. Restart or reload your agent after saving its settings.

### 5. Teach your agent the two routines

Copy these skills into the skill folder used by your agent:

- `~/repos/context-grove/templates/skills/knowledge-consultation/SKILL.md`
- `~/repos/context-grove/templates/skills/daily-review/SKILL.md`

Then add a short rule to your project's agent instructions file (`AGENTS.md`, `CLAUDE.md`, or the equivalent):

> Before starting a task, follow the knowledge-consultation skill. At the first Context Grove access on a new UTC day, finish the daily candidate review before doing task work.

If you use more than one AI tool, install the skills and add the rule for each one. The project knowledge folder stays the same.

### 6. Start a task and share what you learn

Your agent can now check the source, list the knowledge catalog, search for a topic, and read a guide before changing the project. On its first knowledge access each UTC day, it reviews pending learning candidates and records the result.

When work uncovers a useful, reusable fact, add a separate Markdown file under `.context-grove/candidates/` using `.context-grove/LEARNING.md` as the guide. Separate files let agents make discoveries in parallel without editing the same candidate file.

### 7. Review and promote good knowledge

Review candidates through your normal Git process. A maintainer decides whether a candidate is accurate and useful, then moves approved guidance into the right canonical document and updates the catalog. A candidate is only a proposal; the MCP server cannot approve or promote it.

For agents working at the same time, see [Parallel agents](docs/parallel-agents.md) for the shared-checkout lock and separate-worktree Git workflows.

## What Context Grove gives your team

- **One shared guide:** project knowledge lives beside the code in readable Markdown.
- **Fewer repeated explanations:** agents consult the same decisions and working rules before they act.
- **Learning with review:** discoveries become evidence-backed proposals; maintainers control what becomes official guidance.
- **A daily upkeep habit:** the first agent to access knowledge each UTC day checks pending candidates and records the review.
- **A clear trail:** answers point to their source, and knowledge changes go through Git.

## Technical details

Context Grove is an open-source, Git-backed knowledge layer. Git is the source of truth; there is no hosted service or database to run. The MCP server uses local stdio and reads Markdown under `.context-grove/` only. It does not write knowledge or access application data.

### MCP tools

| Tool | What it does |
| --- | --- |
| `knowledge_health` | Checks that the knowledge folder and core guides are available |
| `knowledge_catalog` | Returns the project's knowledge catalog |
| `knowledge_read` | Reads a Markdown file from `.context-grove/` |
| `knowledge_search` | Finds literal text and returns source snippets |

Knowledge responses include source paths and file freshness where applicable. Search is literal text matching, not semantic or vector search.

### Knowledge lifecycle

```text
discovery -> candidate with evidence -> daily review -> maintainer approval -> canonical guide -> catalog
```

The daily gate is idempotent by UTC date: if another agent has already recorded that day's review, the next agent reuses it. Agents in one checkout coordinate review with an atomic lock. Agents in separate worktrees coordinate shared log changes through Git merge and rebase.

### Included documentation

- [Setup details](docs/setup.md)
- [Day-to-day workflow](docs/workflow.md)
- [Parallel agent coordination](docs/parallel-agents.md)
- [Contribution guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

### GitHub topics

`mcp` · `mcp-server` · `model-context-protocol` · `ai-agents` · `agentic-ai` · `ai-memory` · `knowledge-management` · `shared-memory` · `developer-tools` · `open-source` · `markdown` · `git`

#MCP #MCPServer #ModelContextProtocol #AIAgents #AgenticAI #AIMemory #KnowledgeManagement #SharedMemory #DeveloperTools #OpenSource #Markdown #Git

## License

MIT. See [LICENSE](LICENSE).
