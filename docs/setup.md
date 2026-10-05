# Setup

1. From the target project root, run `node /path/to/context-grove/src/init.js` (or set `CONTEXT_GROVE_ROOT`). The initializer refuses to overwrite an existing `.context-grove/`.
2. Add project-specific information to the starter docs and catalog. Remove any placeholders that do not fit your project.
3. Install runtime dependencies: `npm install --prefix /path/to/context-grove`.
4. Configure your MCP client to launch `node /path/to/context-grove/src/server.js` with `CONTEXT_GROVE_ROOT` set to the project root.
5. Copy both `templates/skills/*/SKILL.md` into agent skill locations and include the short required entrypoint rule in each supported agent's project instructions (for example `AGENTS.md`, `CLAUDE.md`, or equivalent).
6. Read `.context-grove/CONSULTATION.md` and make sure the project catalog points to its real architecture, security, and operations docs.

The initializer only creates the knowledge folder. It does not modify existing agent configuration, install dependencies into the project, or make network calls.

---

# Configuração

1. Na raiz do projeto de destino, execute `node /caminho/para/context-grove/src/init.js` (ou defina `CONTEXT_GROVE_ROOT`). O inicializador não sobrescreve uma pasta `.context-grove/` existente.
2. Acrescente informações específicas do projeto aos documentos iniciais e ao catálogo. Remova placeholders que não se aplicam.
3. Instale as dependências de runtime com `npm install --prefix /caminho/para/context-grove`.
4. Configure seu cliente MCP para iniciar `node /caminho/para/context-grove/src/server.js` com `CONTEXT_GROVE_ROOT` apontando para a raiz do projeto.
5. Copie `templates/skills/*/SKILL.md` para os diretórios de skills dos agentes e inclua a regra obrigatória de consulta nas instruções de cada agente suportado (por exemplo, `AGENTS.md`, `CLAUDE.md` ou equivalente).
6. Leia `.context-grove/CONSULTATION.md` e ajuste o catálogo para apontar para os documentos reais de arquitetura, segurança e operação.

O inicializador apenas cria a pasta de conhecimento. Ele não altera configurações existentes de agentes, não instala dependências no projeto e não faz chamadas de rede.
