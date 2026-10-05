# Security policy

Report vulnerabilities privately through GitHub's **Report a vulnerability** flow. Do not put credentials, private project documents, or exploit details in a public issue.

The MCP server is designed for local stdio use and read-only access to `.context-grove/`. Keep it bound to the project root, do not expose it as an unauthenticated network service, and review symlink/path handling when changing file access.
