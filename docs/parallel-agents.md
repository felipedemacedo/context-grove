# Parallel agents

All agents read the same committed knowledge snapshot through Git and MCP. Each observation gets its own candidate file, so simultaneous discovery rarely collides. Shared files (`CATALOG.md`, `REVIEW_LOG.md`, canonical docs) are contention points.

Use one of two supported modes:

- **Shared checkout:** one reviewer acquires `.review-lock` atomically for the daily gate. Other agents wait, then re-check the log.
- **Separate worktrees:** each agent works on a branch; Git merges serialize the shared daily report/log. Re-read after rebase and reconcile additive changes before merge.

For ordinary work, give parallel agents non-overlapping file ownership. Use a clear handoff with task, files changed, evidence, unresolved questions, and commit/branch. Git is the durable communication and conflict-resolution layer; do not rely on private agent memory.

---

# Agentes em paralelo

Todos os agentes leem pelo Git e pelo MCP o mesmo snapshot de conhecimento já commitado. Cada observação ganha seu próprio arquivo candidato, reduzindo colisões durante descobertas simultâneas. Arquivos compartilhados (`CATALOG.md`, `REVIEW_LOG.md` e documentos canônicos) são pontos de concorrência.

Use um destes modos:

- **Checkout compartilhado:** um revisor adquire atomicamente `.review-lock` para o gate diário. Os demais aguardam e depois consultam o log novamente.
- **Worktrees separados:** cada agente trabalha em uma branch; os merges do Git serializam o relatório e o log diários. Após rebase, releia e reconcilie as alterações aditivas antes do merge.

No trabalho comum, atribua aos agentes arquivos sem sobreposição. Faça um handoff claro com tarefa, arquivos alterados, evidências, dúvidas pendentes e commit/branch. O Git é a camada durável de comunicação e resolução de conflitos; não dependa da memória privada dos agentes.
