# Context Grove

**One trusted project memory for every human and AI agent.**

Give your coding agents the same project guide, decisions, and lessons learned. Context Grove helps you add that shared memory to your own project in a few small steps.

## Benefits and trade-offs

**Benefits:** everyone works from the same project guidance; agents spend less time asking for context; decisions and lessons stay traceable beside the code; and reviewed knowledge can be reused across sessions and AI tools.

**Trade-offs:** the team must keep its guides current and review proposed learnings. Setup requires an MCP-capable tool and a small amount of agent-specific configuration. Search is literal text matching, so it does not provide semantic retrieval. Git makes knowledge portable and auditable, but concurrent edits to shared indexes still need review and merge conflict resolution.

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

## System prompt: set this up in my project

Copy this prompt into a coding agent while it is open in the project where you want to install Context Grove. Replace the two paths first. The prompt asks the agent to adapt the knowledge to the actual project and configure the available agent tools, instead of leaving you with generic starter files.

```text
You are installing Context Grove, a Git-backed shared knowledge architecture for this project.

Target project: <ABSOLUTE_PATH_TO_TARGET_PROJECT>
Context Grove checkout: <ABSOLUTE_PATH_TO_CONTEXT_GROVE>

Goal: leave this project with a useful, project-specific shared knowledge base, an MCP connection when supported by the installed coding agent, and required consultation and daily review routines installed for this agent. Preserve all existing user work.

Work through these steps without asking for confirmation for routine, reversible local changes:

1. Inspect the target repository's agent instructions, current Git status, available agent configuration, and existing docs. Do not overwrite user changes. If `.context-grove/` already exists, inspect and extend it rather than initializing over it.
2. Check Node.js is version 22 or newer. If Context Grove is not installed at the supplied path, clone the public repository into a stable location and report the resulting path. Install its runtime dependencies with `npm install --prefix <ABSOLUTE_PATH_TO_CONTEXT_GROVE>`.
3. If `.context-grove/` is absent, run the initializer from the target project root: `node <ABSOLUTE_PATH_TO_CONTEXT_GROVE>/src/init.js`. Confirm that the knowledge folder is inside the target project.
4. Read the Context Grove templates and adapt the catalog and starter docs to this project's real architecture, ownership, security, operational practices, and durable decisions. Inspect project sources before writing facts. Link to authoritative files; mark unknowns instead of inventing them. Keep secrets, personal data, and raw conversations out of shared knowledge. Remove generic placeholders that are not useful.
5. Copy `templates/skills/knowledge-consultation/SKILL.md` and `templates/skills/daily-review/SKILL.md` into the skill locations supported by the installed agent. Add a concise rule to the existing project entrypoint (such as `AGENTS.md`, `CLAUDE.md`, or its equivalent) requiring consultation before task execution and the daily review at first knowledge access on each UTC date. Preserve the file's existing conventions and unrelated content.
6. Configure the installed agent's MCP settings to launch `<ABSOLUTE_PATH_TO_CONTEXT_GROVE>/src/server.js` with `CONTEXT_GROVE_ROOT` set to the target project root. Discover the actual config format and preserve existing MCP servers. If this agent does not support MCP or its settings cannot be identified safely, leave a copyable configuration snippet and explain the limitation.
7. Explain in the project docs how agents create one evidence-backed candidate file per learning, review candidates daily, and promote knowledge only with maintainer approval. For parallel agents, document the shared-checkout lock or separate-worktree Git merge workflow. Keep MCP access read-only.
8. Validate the setup with `knowledge_health`, `knowledge_catalog`, and a read/search against project knowledge when the MCP client is available. Otherwise perform equivalent local checks and state what could not be verified. Run only checks appropriate to this repository's instructions.
9. Summarize files changed, agent configuration updated, validation results, remaining manual steps, and any worktree changes that were already present. Do not commit, push, or publish unless I explicitly request it.

Use the language I used to request this setup when reporting results. Complete all feasible setup work before asking me to resolve a genuine blocker.
```

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
