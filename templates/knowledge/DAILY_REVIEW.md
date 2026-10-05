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
