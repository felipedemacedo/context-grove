# Learning lifecycle

## Candidate format

Create a separate file at `candidates/YYYY-MM-DD-short-topic.md`. One file per observation avoids agents overwriting one another. Include:

- **Observation:** concise, reusable fact or failure pattern.
- **Evidence:** file paths, command/result, issue/PR, or other verifiable source.
- **Scope:** where the learning applies and where it does not.
- **Confidence:** confirmed, likely, or unresolved.
- **Proposed destination:** canonical document or decision record, if known.
- **Author and date:** agent identity when available and UTC date.

Never add secrets, personal data, unsupported assumptions, or raw conversation transcripts.

## Review and promotion

The daily review records each candidate as keep, reject, or needs-evidence, with a short reason. A maintainer explicitly approves promotion. Move approved knowledge into its canonical document, preserve evidence and provenance, update `CATALOG.md`, and mark the candidate as promoted with the destination. Rejected candidates are retained or removed according to project policy; record the reason either way.

The MCP server does not write, approve, or promote knowledge. Promotion happens through the project's normal Git review process.
