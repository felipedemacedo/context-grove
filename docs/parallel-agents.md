# Parallel agents

All agents read the same committed knowledge snapshot through Git and MCP. Each observation gets its own candidate file, so simultaneous discovery rarely collides. Shared files (`CATALOG.md`, `REVIEW_LOG.md`, canonical docs) are contention points.

Use one of two supported modes:

- **Shared checkout:** one reviewer acquires `.review-lock` atomically for the daily gate. Other agents wait, then re-check the log.
- **Separate worktrees:** each agent works on a branch; Git merges serialize the shared daily report/log. Re-read after rebase and reconcile additive changes before merge.

For ordinary work, give parallel agents non-overlapping file ownership. Use a clear handoff with task, files changed, evidence, unresolved questions, and commit/branch. Git is the durable communication and conflict-resolution layer; do not rely on private agent memory.
