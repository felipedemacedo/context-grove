---
name: knowledge-consultation
description: Consult shared project knowledge before executing a coding or operations task; use at task start in every agent. / Consulte o conhecimento compartilhado antes de executar tarefas de código ou operação; use no início de cada tarefa.
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

---

# Consulta ao conhecimento

Antes de executar uma tarefa:

1. Leia as instruções dos agentes no repositório e observe as mudanças existentes na worktree.
2. Leia `.context-grove/CONSULTATION.md` e `.context-grove/CATALOG.md`.
3. Se este for o primeiro acesso ao Context Grove em uma nova data UTC, complete primeiro `.context-grove/DAILY_REVIEW.md`.
4. Leia os documentos canônicos e decisões relevantes. Se o MCP estiver configurado, use `knowledge_health`, `knowledge_catalog` e depois `knowledge_search`/`knowledge_read`, conforme necessário.
5. Verifique os caminhos das fontes e sua atualidade antes de confiar em afirmações. Consulte o código ou o sistema oficial para confirmar o comportamento atual.
6. Continue com a tarefa. Relate conflitos ou lacunas de conhecimento e suas fontes.

Nunca trate um candidato não revisado como política aprovada do projeto.
