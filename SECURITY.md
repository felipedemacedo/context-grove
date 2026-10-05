# Security policy

Report vulnerabilities privately through GitHub's **Report a vulnerability** flow. Do not put credentials, private project documents, or exploit details in a public issue.

The MCP server is designed for local stdio use and read-only access to `.context-grove/`. Keep it bound to the project root, do not expose it as an unauthenticated network service, and review symlink/path handling when changing file access.

---

# Política de segurança

Reporte vulnerabilidades em privado pelo fluxo **Report a vulnerability** do GitHub. Não publique credenciais, documentos privados de projetos nem detalhes de exploração em uma issue pública.

O servidor MCP foi projetado para uso local via stdio e acesso somente de leitura a `.context-grove/`. Mantenha-o restrito à raiz do projeto, não o exponha como serviço de rede sem autenticação e revise o tratamento de links simbólicos e caminhos ao alterar o acesso a arquivos.
