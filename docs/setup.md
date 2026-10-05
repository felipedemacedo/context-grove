# Setup

1. From the target project root, run `node /path/to/context-grove/src/init.js` (or set `CONTEXT_GROVE_ROOT`). The initializer refuses to overwrite an existing `.context-grove/`.
2. Add project-specific information to the starter docs and catalog. Remove any placeholders that do not fit your project.
3. Install runtime dependencies: `npm install --prefix /path/to/context-grove`.
4. Configure your MCP client to launch `node /path/to/context-grove/src/server.js` with `CONTEXT_GROVE_ROOT` set to the project root.
5. Copy both `templates/skills/*/SKILL.md` into agent skill locations and include the short required entrypoint rule in each supported agent's project instructions (for example `AGENTS.md`, `CLAUDE.md`, or equivalent).
6. Read `.context-grove/CONSULTATION.md` and make sure the project catalog points to its real architecture, security, and operations docs.

The initializer only creates the knowledge folder. It does not modify existing agent configuration, install dependencies into the project, or make network calls.
