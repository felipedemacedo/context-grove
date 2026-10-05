# Daily candidate review gate

At the first knowledge access by any agent on a new UTC date, inspect `candidates/` and complete the gate before task execution. Read `REVIEW_LOG.md` first: if today's UTC date already has a completed entry, reuse that result and continue. This makes the gate idempotent across agents.

## Review steps

1. Re-read `REVIEW_LOG.md` from disk immediately before editing it.
2. List every unreviewed candidate and examine its evidence, scope, and duplication against canonical docs.
3. Record a dated report at `docs/reviews/YYYY-MM-DD.md`, including each candidate path, disposition (`keep`, `reject`, `needs-evidence`), rationale, and reviewer.
4. Append one concise entry to `REVIEW_LOG.md` linking the report and recording the commit SHA after the report is committed.
5. Candidate review does not itself authorize promotion. Only a maintainer's explicit approval can promote knowledge.

## Concurrent agents and worktrees

- Agents in one shared worktree: acquire an exclusive lock by atomically creating `.context-grove/.review-lock` (`mkdir` must succeed); include UTC date and agent/session. Re-read the log after acquiring it. Release the lock on completion. If a process crashed, verify no reviewer is active before removing a stale lock.
- Agents in separate worktrees/branches: Git is the coordination mechanism. Each reviewer prepares a dated report and minimal log change; merge one review first, then rebase/reconcile the other. Before committing, re-read the log and check whether another branch already completed today's review. Keep review reports additive and never replace the whole log from stale memory.
- If a lock or merge conflict creates uncertainty, stop the duplicate review, preserve both reports, and reconcile with the maintainer. Never silently discard a candidate or another agent's work.

## Review log

See [REVIEW_LOG.md](REVIEW_LOG.md).

---

# Gate diário de revisão dos candidatos

No primeiro acesso ao conhecimento por qualquer agente em uma nova data UTC, inspecione `candidates/` e complete o gate antes de executar a tarefa. Leia primeiro `REVIEW_LOG.md`: se já houver um registro concluído para a data UTC atual, reutilize o resultado e continue. Isso torna o gate idempotente entre agentes.

## Etapas da revisão

1. Releia `REVIEW_LOG.md` do disco imediatamente antes de editá-lo.
2. Liste todos os candidatos ainda não revisados e confira suas evidências, escopo e duplicidade em relação aos documentos canônicos.
3. Registre o relatório datado em `docs/reviews/YYYY-MM-DD.md`, incluindo cada caminho de candidato, decisão (`keep`, `reject`, `needs-evidence`), justificativa e revisor. Mantenha esses valores de status em inglês para padronizar os registros entre agentes e idiomas.
4. Acrescente uma entrada concisa a `REVIEW_LOG.md` com link para o relatório e registre o SHA do commit após o relatório ter sido commitado.
5. A revisão não autoriza a promoção por si só. Somente a aprovação explícita de um mantenedor permite promover conhecimento.

## Agentes concorrentes e worktrees

- No mesmo checkout: adquira um lock exclusivo criando atomicamente `.context-grove/.review-lock` (`mkdir` deve ter sucesso); inclua data UTC e identidade da sessão/agente. Releia o log depois de adquirir o lock e libere-o ao terminar. Se o processo tiver falhado, confirme que não há revisão ativa antes de remover um lock antigo.
- Em branches/worktrees separados: o Git coordena as mudanças. Cada revisor prepara um relatório datado e uma alteração mínima no log; faça merge de uma revisão e depois rebase/reconcilie a outra. Antes do commit, releia o log e confira se outra branch já concluiu a revisão do dia. Mantenha relatórios aditivos e nunca substitua o log inteiro usando uma cópia desatualizada.
- Se um lock ou conflito de merge causar dúvida, pare a revisão duplicada, preserve ambos os relatórios e reconcilie com o mantenedor. Nunca descarte silenciosamente um candidato nem o trabalho de outro agente.

## Log de revisão

Consulte [REVIEW_LOG.md](REVIEW_LOG.md).
