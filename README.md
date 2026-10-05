# Context Grove

[English](#context-grove) · [Português](#context-grove-em-português)

**One trusted project memory for every human and AI agent.**

Give your coding agents the same project guide, decisions, and lessons learned. Context Grove helps you add that shared memory to your own project in a few small steps.

## Benefits and trade-offs

**Benefits:** everyone works from the same project guidance; agents spend less time asking for context; decisions and lessons stay traceable beside the code; and reviewed knowledge can be reused across sessions and AI tools.

**Trade-offs:** the team must keep its guides current and review proposed learnings. Setup requires an MCP-capable tool and a small amount of agent-specific configuration. Search is literal text matching, so it does not provide semantic retrieval. Git makes knowledge portable and auditable, but concurrent edits to shared indexes still need review and merge conflict resolution.

## Use Context Grove in your project

You need Node.js 22 or newer and an AI coding tool that supports MCP and skills.

### 1. Get Context Grove

Clone the toolkit somewhere on your computer. Keep this folder available because your project and agent will use its MCP server and skill files.

```bash
mkdir -p ~/repos
git clone https://github.com/felipedemacedo/context-grove.git ~/repos/context-grove
npm install --prefix ~/repos/context-grove
```

### 2. Add a knowledge folder to your project

Run the initializer from your project directory. It creates `.context-grove/` with a catalog and starter guides. It will stop if that folder already exists, so it won't overwrite your work.

```bash
cd /path/to/your-project
node ~/repos/context-grove/src/init.js
```

Commit `.context-grove/` to your project repository so your teammates and agents can share it.

### 3. Make the guides yours

Open `.context-grove/CATALOG.md` and follow its links. Add or link the information your project agents should know, such as:

- how the architecture fits together;
- where important code lives and who owns it;
- security, product, and operational rules;
- decisions the team has already made.

Keep useful facts tied to evidence, such as a source file, decision, or issue. When an agent discovers something reusable, it can propose that knowledge as a candidate; the next steps explain how.

### 4. Connect your AI tool

Add Context Grove as an MCP server in your agent's settings. The exact settings file varies by tool; use its MCP server configuration format. This example shows the command and environment values to provide:

```json
{
  "mcpServers": {
    "context-grove": {
      "command": "node",
      "args": ["/absolute/path/to/context-grove/src/server.js"],
      "env": {
        "CONTEXT_GROVE_ROOT": "/path/to/your-project"
      }
    }
  }
}
```

Use absolute paths. `CONTEXT_GROVE_ROOT` must point to your project folder, the one containing `.context-grove/`. Restart or reload your agent after saving its settings.

### 5. Teach your agent the two routines

Copy these skills into the skill folder used by your agent:

- `~/repos/context-grove/templates/skills/knowledge-consultation/SKILL.md`
- `~/repos/context-grove/templates/skills/daily-review/SKILL.md`

Then add a short rule to your project's agent instructions file (`AGENTS.md`, `CLAUDE.md`, or the equivalent):

> Before starting a task, follow the knowledge-consultation skill. At the first Context Grove access on a new UTC day, finish the daily candidate review before doing task work.

If you use more than one AI tool, install the skills and add the rule for each one. The project knowledge folder stays the same.

### 6. Start a task and share what you learn

Your agent can now check the source, list the knowledge catalog, search for a topic, and read a guide before changing the project. On its first knowledge access each UTC day, it reviews pending learning candidates and records the result.

When work uncovers a useful, reusable fact, add a separate Markdown file under `.context-grove/candidates/` using `.context-grove/LEARNING.md` as the guide. Separate files let agents make discoveries in parallel without editing the same candidate file.

### 7. Review and promote good knowledge

Review candidates through your normal Git process. A maintainer decides whether a candidate is accurate and useful, then moves approved guidance into the right canonical document and updates the catalog. A candidate is only a proposal; the MCP server cannot approve or promote it.

For agents working at the same time, see [Parallel agents](docs/parallel-agents.md) for the shared-checkout lock and separate-worktree Git workflows.

## System prompt: set this up in my project

Copy this prompt into a coding agent while it is open in the project where you want to install Context Grove. Replace the two paths first. The prompt asks the agent to adapt the knowledge to the actual project and configure the available agent tools, instead of leaving you with generic starter files.

```text
You are installing Context Grove, a Git-backed shared knowledge architecture for this project.

Target project: <ABSOLUTE_PATH_TO_TARGET_PROJECT>
Context Grove checkout: <ABSOLUTE_PATH_TO_CONTEXT_GROVE>

Goal: leave this project with a useful, project-specific shared knowledge base, an MCP connection when supported by the installed coding agent, and required consultation and daily review routines installed for this agent. Preserve all existing user work.

Work through these steps without asking for confirmation for routine, reversible local changes:

1. Inspect the target repository's agent instructions, current Git status, available agent configuration, and existing docs. Do not overwrite user changes. If `.context-grove/` already exists, inspect and extend it rather than initializing over it.
2. Check Node.js is version 22 or newer. If Context Grove is not installed at the supplied path, clone the public repository into a stable location and report the resulting path. Install its runtime dependencies with `npm install --prefix <ABSOLUTE_PATH_TO_CONTEXT_GROVE>`.
3. If `.context-grove/` is absent, run the initializer from the target project root: `node <ABSOLUTE_PATH_TO_CONTEXT_GROVE>/src/init.js`. Confirm that the knowledge folder is inside the target project.
4. Read the Context Grove templates and adapt the catalog and starter docs to this project's real architecture, ownership, security, operational practices, and durable decisions. Inspect project sources before writing facts. Link to authoritative files; mark unknowns instead of inventing them. Keep secrets, personal data, and raw conversations out of shared knowledge. Remove generic placeholders that are not useful.
5. Copy `templates/skills/knowledge-consultation/SKILL.md` and `templates/skills/daily-review/SKILL.md` into the skill locations supported by the installed agent. Add a concise rule to the existing project entrypoint (such as `AGENTS.md`, `CLAUDE.md`, or its equivalent) requiring consultation before task execution and the daily review at first knowledge access on each UTC date. Preserve the file's existing conventions and unrelated content.
6. Configure the installed agent's MCP settings to launch `<ABSOLUTE_PATH_TO_CONTEXT_GROVE>/src/server.js` with `CONTEXT_GROVE_ROOT` set to the target project root. Discover the actual config format and preserve existing MCP servers. If this agent does not support MCP or its settings cannot be identified safely, leave a copyable configuration snippet and explain the limitation.
7. Explain in the project docs how agents create one evidence-backed candidate file per learning, review candidates daily, and promote knowledge only with maintainer approval. For parallel agents, document the shared-checkout lock or separate-worktree Git merge workflow. Keep MCP access read-only.
8. Validate the setup with `knowledge_health`, `knowledge_catalog`, and a read/search against project knowledge when the MCP client is available. Otherwise perform equivalent local checks and state what could not be verified. Run only checks appropriate to this repository's instructions.
9. Summarize files changed, agent configuration updated, validation results, remaining manual steps, and any worktree changes that were already present. Do not commit, push, or publish unless I explicitly request it.

Use the language I used to request this setup when reporting results. Complete all feasible setup work before asking me to resolve a genuine blocker.
```

## What Context Grove gives your team

- **One shared guide:** project knowledge lives beside the code in readable Markdown.
- **Fewer repeated explanations:** agents consult the same decisions and working rules before they act.
- **Learning with review:** discoveries become evidence-backed proposals; maintainers control what becomes official guidance.
- **A daily upkeep habit:** the first agent to access knowledge each UTC day checks pending candidates and records the review.
- **A clear trail:** answers point to their source, and knowledge changes go through Git.

## Technical details

Context Grove is an open-source, Git-backed knowledge layer. Git is the source of truth; there is no hosted service or database to run. The MCP server uses local stdio and reads Markdown under `.context-grove/` only. It does not write knowledge or access application data.

### MCP tools

| Tool | What it does |
| --- | --- |
| `knowledge_health` | Checks that the knowledge folder and core guides are available |
| `knowledge_catalog` | Returns the project's knowledge catalog |
| `knowledge_read` | Reads a Markdown file from `.context-grove/` |
| `knowledge_search` | Finds literal text and returns source snippets |

Knowledge responses include source paths and file freshness where applicable. Search is literal text matching, not semantic or vector search.

### Knowledge lifecycle

```text
discovery -> candidate with evidence -> daily review -> maintainer approval -> canonical guide -> catalog
```

The daily gate is idempotent by UTC date: if another agent has already recorded that day's review, the next agent reuses it. Agents in one checkout coordinate review with an atomic lock. Agents in separate worktrees coordinate shared log changes through Git merge and rebase.

### Included documentation

- [Setup details](docs/setup.md)
- [Day-to-day workflow](docs/workflow.md)
- [Parallel agent coordination](docs/parallel-agents.md)
- [Contribution guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

### GitHub topics

`mcp` · `mcp-server` · `model-context-protocol` · `ai-agents` · `agentic-ai` · `ai-memory` · `knowledge-management` · `shared-memory` · `developer-tools` · `open-source` · `markdown` · `git`

#MCP #MCPServer #ModelContextProtocol #AIAgents #AgenticAI #AIMemory #KnowledgeManagement #SharedMemory #DeveloperTools #OpenSource #Markdown #Git

## License

MIT. See [LICENSE](LICENSE).

---

# Context Grove em português

**Uma memória confiável do projeto para pessoas e agentes de IA.**

Compartilhe com seus agentes de programação os mesmos guias, decisões e aprendizados do projeto. O Context Grove ajuda a adicionar essa memória compartilhada ao seu próprio projeto em alguns passos simples.

## Benefícios e trade-offs

**Benefícios:** todas as pessoas e agentes trabalham com as mesmas orientações; há menos repetição de contexto; decisões e aprendizados ficam rastreáveis junto ao código; e o conhecimento revisado pode ser reutilizado entre sessões e ferramentas de IA.

**Trade-offs:** a equipe precisa manter os guias atualizados e revisar os aprendizados propostos. A configuração exige uma ferramenta compatível com MCP e alguns ajustes específicos do agente. A busca compara texto literal, sem recuperação semântica. O Git torna o conhecimento portátil e auditável, mas edições concorrentes em índices compartilhados ainda exigem revisão e resolução de conflitos.

## Use o Context Grove no seu projeto

Você precisa do Node.js 22 ou mais recente e de uma ferramenta de programação com IA compatível com MCP e skills.

### 1. Obtenha o Context Grove

Clone o toolkit em um local estável do computador. Mantenha essa pasta disponível, pois o projeto e o agente usarão o servidor MCP e os arquivos de skills.

```bash
mkdir -p ~/repos
git clone https://github.com/felipedemacedo/context-grove.git ~/repos/context-grove
npm install --prefix ~/repos/context-grove
```

### 2. Adicione uma pasta de conhecimento ao projeto

Execute o inicializador a partir do diretório do seu projeto. Ele cria `.context-grove/` com um catálogo e guias iniciais. Se essa pasta já existir, o inicializador para sem sobrescrever seu conteúdo.

```bash
cd /caminho/para/seu-projeto
node ~/repos/context-grove/src/init.js
```

Faça commit de `.context-grove/` no repositório do projeto para compartilhar o conhecimento com a equipe e os agentes.

### 3. Adapte os guias

Abra `.context-grove/CATALOG.md` e siga os links. Acrescente ou referencie as informações que os agentes do projeto devem conhecer, por exemplo:

- como a arquitetura se organiza;
- onde ficam os principais códigos e quem é responsável por eles;
- regras de segurança, produto e operação;
- decisões que a equipe já tomou.

Associe os fatos úteis a evidências, como arquivos-fonte, decisões ou issues. Quando um agente descobrir algo reutilizável, ele pode propor esse aprendizado como candidato; os próximos passos explicam como revisá-lo.

### 4. Conecte sua ferramenta de IA

Adicione o Context Grove como servidor MCP nas configurações do agente. O arquivo exato varia conforme a ferramenta; use o formato de configuração MCP dela. Este exemplo mostra o comando e as variáveis necessários:

```json
{
  "mcpServers": {
    "context-grove": {
      "command": "node",
      "args": ["/caminho/absoluto/para/context-grove/src/server.js"],
      "env": {
        "CONTEXT_GROVE_ROOT": "/caminho/para/seu-projeto"
      }
    }
  }
}
```

Use caminhos absolutos. `CONTEXT_GROVE_ROOT` deve apontar para a pasta do projeto, que contém `.context-grove/`. Reinicie ou recarregue o agente depois de salvar as configurações.

### 5. Ensine as duas rotinas ao agente

Copie estas skills para o diretório de skills usado pelo agente:

- `~/repos/context-grove/templates/skills/knowledge-consultation/SKILL.md`
- `~/repos/context-grove/templates/skills/daily-review/SKILL.md`

Depois, adicione esta regra às instruções do projeto (`AGENTS.md`, `CLAUDE.md` ou equivalente):

> Antes de iniciar uma tarefa, siga a skill de consulta ao conhecimento. No primeiro acesso ao Context Grove em cada novo dia UTC, conclua a revisão diária de candidatos antes de começar o trabalho.

Se você usa mais de uma ferramenta de IA, instale as skills e inclua a regra em cada uma. A pasta de conhecimento do projeto continua sendo a mesma.

### 6. Comece uma tarefa e compartilhe o que aprendeu

Agora o agente pode conferir as fontes, listar o catálogo, buscar um assunto e ler um guia antes de alterar o projeto. No primeiro acesso ao conhecimento em cada dia UTC, ele revisa os candidatos pendentes e registra o resultado.

Quando o trabalho revelar um fato útil e reutilizável, crie um arquivo Markdown separado em `.context-grove/candidates/`, seguindo `.context-grove/LEARNING.md`. Arquivos separados permitem que agentes descubram aprendizados em paralelo sem editar o mesmo candidato.

### 7. Revise e promova bons aprendizados

Revise os candidatos pelo fluxo Git normal. Um mantenedor decide se o candidato é correto e útil; depois, move a orientação aprovada para o documento canônico apropriado e atualiza o catálogo. Candidato é proposta: o servidor MCP não pode aprovar nem promover conteúdo.

Para agentes trabalhando ao mesmo tempo, consulte [Agentes em paralelo](docs/parallel-agents.md), que explica o lock em checkout compartilhado e o fluxo Git com worktrees separados.

## Prompt de sistema: configure isto no meu projeto

Copie este prompt para um agente de programação aberto no projeto em que você quer instalar o Context Grove. Substitua os dois caminhos antes de enviar. O prompt orienta o agente a adaptar o conhecimento ao projeto real e configurar as ferramentas disponíveis, em vez de deixar apenas arquivos genéricos.

```text
Você está instalando o Context Grove, uma arquitetura de conhecimento compartilhado, versionada no Git, para este projeto.

Projeto de destino: <CAMINHO_ABSOLUTO_DO_PROJETO>
Checkout do Context Grove: <CAMINHO_ABSOLUTO_DO_CONTEXT_GROVE>

Objetivo: deixar este projeto com uma base de conhecimento compartilhada e específica, uma conexão MCP quando o agente instalado oferecer suporte, e rotinas obrigatórias de consulta e revisão diária configuradas para este agente. Preserve todo o trabalho já existente do usuário.

Siga estas etapas sem pedir confirmação para alterações locais rotineiras e reversíveis:

1. Inspecione as instruções dos agentes no repositório, o status atual do Git, as configurações de agentes disponíveis e a documentação existente. Não sobrescreva alterações do usuário. Se `.context-grove/` já existir, inspecione e amplie seu conteúdo em vez de inicializá-la novamente.
2. Confira se o Node.js é versão 22 ou mais recente. Se o Context Grove não estiver instalado no caminho fornecido, clone o repositório público em um local estável e informe o caminho resultante. Instale as dependências de runtime com `npm install --prefix <CAMINHO_ABSOLUTO_DO_CONTEXT_GROVE>`.
3. Se `.context-grove/` não existir, execute o inicializador a partir da raiz do projeto: `node <CAMINHO_ABSOLUTO_DO_CONTEXT_GROVE>/src/init.js`. Confirme que a pasta de conhecimento está dentro do projeto de destino.
4. Leia os templates do Context Grove e adapte o catálogo e os documentos iniciais à arquitetura, responsabilidades, segurança, práticas operacionais e decisões duráveis reais deste projeto. Inspecione as fontes antes de registrar fatos. Aponte para arquivos oficiais; marque o que não souber em vez de inventar. Não inclua segredos, dados pessoais nem transcrições brutas na base compartilhada. Remova placeholders que não sejam úteis.
5. Copie `templates/skills/knowledge-consultation/SKILL.md` e `templates/skills/daily-review/SKILL.md` para os diretórios de skills suportados pelo agente instalado. Adicione uma regra concisa às instruções de entrada do projeto (`AGENTS.md`, `CLAUDE.md` ou equivalente) exigindo consulta antes da execução de tarefas e a revisão diária no primeiro acesso ao conhecimento de cada data UTC. Preserve as convenções e o conteúdo não relacionado já existentes.
6. Configure o MCP do agente instalado para executar `<CAMINHO_ABSOLUTO_DO_CONTEXT_GROVE>/src/server.js` com `CONTEXT_GROVE_ROOT` apontando para a raiz do projeto de destino. Descubra o formato real da configuração e preserve os servidores MCP existentes. Se este agente não oferecer suporte a MCP ou não for possível identificar a configuração com segurança, deixe um exemplo de configuração pronto para copiar e explique a limitação.
7. Explique na documentação do projeto como criar um arquivo candidato por aprendizado, com evidências; revisar candidatos diariamente; e promover conhecimento somente após aprovação do mantenedor. Para agentes em paralelo, documente o lock no checkout compartilhado ou o fluxo de merge Git em worktrees separados. Mantenha o acesso MCP somente leitura.
8. Quando o cliente MCP estiver disponível, valide a configuração com `knowledge_health`, `knowledge_catalog` e uma operação de leitura/busca no conhecimento do projeto. Caso contrário, faça verificações locais equivalentes e informe o que não foi possível validar. Execute somente verificações compatíveis com as instruções deste repositório.
9. Resuma os arquivos alterados, as configurações de agentes atualizadas, os resultados das verificações, as etapas manuais restantes e as mudanças na worktree que já existiam antes. Não faça commit, push nem publicação sem pedido explícito.

Use o idioma em que solicitei esta configuração ao apresentar os resultados. Conclua todo o trabalho viável antes de me pedir para resolver um impedimento real.
```

## O que o Context Grove oferece à equipe

- **Um guia compartilhado:** o conhecimento do projeto fica junto ao código em Markdown legível.
- **Menos explicações repetidas:** os agentes consultam as mesmas decisões e regras antes de agir.
- **Aprendizados revisados:** descobertas viram propostas baseadas em evidências; mantenedores decidem o que se torna orientação oficial.
- **Manutenção diária:** o primeiro agente a acessar o conhecimento em cada dia UTC verifica os candidatos e registra a revisão.
- **Rastreabilidade:** respostas apontam para suas fontes e as mudanças de conhecimento passam pelo Git.

## Detalhes técnicos

O Context Grove é uma camada de conhecimento de código aberto, versionada no Git. O Git é a fonte da verdade; não há serviço hospedado ou banco de dados para operar. O servidor MCP usa stdio local e lê somente Markdown dentro de `.context-grove/`. Ele não escreve conhecimento nem acessa dados da aplicação.

### Ferramentas MCP

| Ferramenta | O que faz |
| --- | --- |
| `knowledge_health` | Verifica se a pasta de conhecimento e os guias principais estão disponíveis |
| `knowledge_catalog` | Retorna o catálogo de conhecimento do projeto |
| `knowledge_read` | Lê um arquivo Markdown de `.context-grove/` |
| `knowledge_search` | Encontra texto literal e retorna trechos com fontes |

Quando aplicável, as respostas incluem os caminhos das fontes e a data de atualização dos arquivos. A busca compara texto literal; não é busca semântica nem vetorial.

### Ciclo de conhecimento

```text
descoberta -> candidato com evidência -> revisão diária -> aprovação do mantenedor -> guia canônico -> catálogo
```

O gate diário é idempotente por data UTC: se outro agente já registrou a revisão do dia, o próximo reutiliza aquele resultado. Em um checkout compartilhado, os agentes coordenam a revisão com um lock atômico. Em worktrees separados, coordenam as alterações de log por merge e rebase do Git.

### Documentação incluída

- [Detalhes de configuração](docs/setup.md)
- [Fluxo de trabalho](docs/workflow.md)
- [Coordenação de agentes paralelos](docs/parallel-agents.md)
- [Guia de contribuição](CONTRIBUTING.md)
- [Política de segurança](SECURITY.md)

### Tópicos do GitHub

`mcp` · `mcp-server` · `model-context-protocol` · `ai-agents` · `agentic-ai` · `ai-memory` · `knowledge-management` · `shared-memory` · `developer-tools` · `open-source` · `markdown` · `git`

#MCP #MCPServer #ModelContextProtocol #AIAgents #AgenticAI #AIMemory #KnowledgeManagement #SharedMemory #DeveloperTools #OpenSource #Markdown #Git

## Licença

MIT. Consulte [LICENSE](LICENSE).
