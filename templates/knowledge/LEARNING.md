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

---

# Ciclo de aprendizado

## Formato do candidato

Crie um arquivo separado em `candidates/AAAA-MM-DD-topico-curto.md`. Um arquivo por observação evita que agentes sobrescrevam o trabalho uns dos outros. Inclua:

- **Observação:** fato ou padrão de falha conciso e reutilizável.
- **Evidência:** caminhos de arquivos, comando/resultado, issue/PR ou outra fonte verificável.
- **Escopo:** onde o aprendizado se aplica e onde não se aplica.
- **Confiança:** confirmado, provável ou não resolvido.
- **Destino proposto:** documento canônico ou registro de decisão, se conhecido.
- **Autor e data:** identidade do agente, quando disponível, e data UTC.

Nunca inclua segredos, dados pessoais, suposições sem suporte ou transcrições brutas de conversas.

## Revisão e promoção

A revisão diária registra cada candidato como manter, rejeitar ou precisa de evidência, com uma justificativa breve. Um mantenedor precisa aprovar explicitamente a promoção. Mova o conteúdo aprovado para o documento canônico, preserve evidências e proveniência, atualize `CATALOG.md` e marque o candidato como promovido com o destino. Candidatos rejeitados são mantidos ou removidos conforme a política do projeto; registre a justificativa de qualquer forma.

O servidor MCP não escreve, aprova nem promove conhecimento. A promoção acontece pelo fluxo normal de revisão Git do projeto.
