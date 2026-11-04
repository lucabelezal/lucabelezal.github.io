# Guia AWS — como escrever e publicar um capítulo

Área `/aws` é docs de referência (pt-BR only), shell padrão **Posts**
(`PageShell`). Regras gerais de arquitetura: `rules/architecture.md`.

## Fontes e confiabilidade

Corpus extraído em `../ArquivosReferencia/AWS/_texto/` (fora do repo).

| Fonte | O que serve | Confiabilidade |
|---|---|---|
| `aws-overview.txt` (whitepaper AWS, 177p) | catálogo atual de serviços, definições curtas, infraestrutura global, modelos de preço | alta para *o que existe*; tradução automática com artefatos — reescrever, nunca copiar |
| `Amazon AWS - Descomplicando...` (Casa do Código, 231p) | intuição e passo a passo de console (S3, EC2, RDS, Route 53, CloudFront, CloudWatch, custos) | alta para *conceito*; console e preços de ~2016 — não citar número nem fluxo de tela |
| `cloud-practitioner-02.txt` / `AWS-Certified...Exam-Guide.txt` | taxonomia e escopo do exame CLF-C02 | alta para escopo da prova |
| `_texto/modulos/*.txt` | notas de estudo por domínio, linguagem de iniciante | média; usar como apoio didático |
| `ai-practitioner-01.txt` (Exam Guide AIF-C01, 26p) | domínios, tarefas e serviços no escopo de IA/ML e GenAI | alta para escopo da prova AI Practitioner |

Reextrair quando os PDFs mudarem:

```bash
cd ../ArquivosReferencia/AWS
pdftotext -layout "arquivo.pdf" "_texto/arquivo.txt"
```

`_texto/INDICE.md` mapeia documento → página → primeiras linhas. Para achar um
tema: `rg -n "termo" _texto/*.txt`.

## Regras de fato

- **Nunca** preço absoluto, limite ou cota fixa. Preço muda; escreva modelo e
  custo **relativo** ("mais barato que", "cobra por requisição").
- Livro de 2016 não é fonte de console, serviço novo nem região. Fato atual vem
  do whitepaper 2026; em dúvida, `docs.aws.amazon.com`.
- Nome de serviço sempre expandido na primeira menção (regra do mapa mental).
- Toda página fecha com **Regra prática** e links para os capítulos vizinhos.
- pt-BR only. Não criar pasta em `i18n/` (área é canonical pt-BR).

## Taxonomia (ordem do array em `src/data/awsTrack.ts`)

1. `mapa-mental` — visão geral, siglas, 3 grupos, espectro.
2. `fundamentos-nuvem` — modelos, implantação, região/AZ/edge, economia.
3. `computacao` — panorama: EC2, ECS, Fargate, EKS, Lambda.
4. `ec2` — máquina virtual na prática.
5. `armazenamento` — S3, EBS, EFS, FSx, Glacier, Backup.
6. `dados` — RDS, Aurora, DynamoDB, ElastiCache.
7. `rede-vpc` — VPC, sub-redes, rotas, gateways, SG/NACL.
8. `entrega-de-conteudo` — Route 53, CloudFront, ELB, Global Accelerator.
9. `comunicacao` — API Gateway, SQS, SNS, EventBridge, Step Functions, Kinesis, MQ.
10. `seguranca-e-custo` — IAM, serviços de segurança, preços, suporte.
11. `cloud-practitioner` — escopo da prova CLF-C02.
12. `ia-e-ml` — fundamentos de IA/ML, ciclo de vida, quando não usar.
13. `genai-e-foundation-models` — tokens, prompt, RAG, fine-tuning, avaliação.
14. `servicos-de-ia` — catálogo por problema (Bedrock, SageMaker, Textract...).
15. `ia-responsavel-e-governanca` — viés, privacidade, guardrails, LGPD.
16. `ai-practitioner` — escopo da prova AIF-C01.

Os seis degraus da home agrupam esses capítulos: modelo, computação, dados,
conexão, operação e IA. O `stage` de cada página em `awsTrack.ts` define o grupo.

Roadmap (sem link até existir): `iam` (aprofundar), `servicos-de-seguranca`,
`dados-especializados` (Redshift, Athena, Glue, Kinesis), `containers`,
`lambda-serverless`, `monitoramento` (CloudWatch, CloudTrail, Config, X-Ray),
`migracao` (MGN, DMS, Snow, DataSync), `custos-e-suporte`, `well-architected`.

## Esqueleto do capítulo

```mdx
---
title: Nome do capítulo
---

Lead: o problema concreto que existe sem esse serviço.

## O que é e como funciona
## Os serviços
| Serviço | O que resolve | Quando usar | Custo relativo |
## Problemas comuns e solução
| Sintoma | Causa provável | Solução |
## Trade-offs e armadilhas
![Diagrama](/img/diagramas/aws-xxx.svg)
**Regra prática:** uma frase memorizável.

Próximo: [Capítulo](/aws/slug).
```

Alvo: 800–1.500 palavras (páginas de certificação podem ser mais curtas). Tabela só quando compara; diagrama só quando há
fluxo ou hierarquia (tabela simples não vira imagem).

## Checklist de publicação

- [ ] página `.mdx` em `aws-guide/<slug>.mdx`
- [ ] entrada em `src/data/awsTrack.ts` com `stage` (home, rail e sidebar saem daí)
- [ ] `displayed_sidebar` não é necessário: o sidebar é `AWS_GUIDE_IDS`
- [ ] links internos apontam para páginas existentes (`onBrokenLinks: 'throw'`)
- [ ] diagrama novo em `static/img/diagramas/aws-*.svg`, gerado por
      `scripts/aws-guide-diagrams.mjs` (theme-aware) ou pelas cenas de
      `scripts/aws-guide-excalidraw.mjs`
- [ ] `npm run build` e `npm run typecheck` verdes
- [ ] conferir dark/light e mobile
