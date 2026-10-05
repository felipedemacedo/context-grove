---
name: knowledge-consultation
description: Consult shared project knowledge before executing a coding or operations task; use at task start in every agent.
---

# Knowledge consultation

Before executing a task:

1. Read repository-level agent instructions and note current worktree changes.
2. Read `.context-grove/CONSULTATION.md` and `.context-grove/CATALOG.md`.
3. If this is the first Context Grove access on a new UTC date, complete `.context-grove/DAILY_REVIEW.md` first.
4. Read canonical docs and decisions relevant to the request. If MCP is configured, use `knowledge_health`, `knowledge_catalog`, then `knowledge_search`/`knowledge_read` as appropriate.
5. Verify source paths and freshness before relying on operational claims. Consult source code or the authoritative system for current behavior.
6. Continue with the task. Report unresolved or conflicting knowledge and its sources.

Never treat an unreviewed candidate as approved project policy.
