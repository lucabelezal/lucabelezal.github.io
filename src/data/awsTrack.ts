// Fonte única da trilha do guia AWS. Consumida pelo sidebar (sidebarsAws.ts)
// e pelos componentes de navegação. Não conte páginas do guia em outro lugar.
export type AwsGuidePage = {
  id: string;
  title: string;
  description: string;
  stage: number;
};

export type AwsGuideStage = {
  id: number;
  title: string;
  hint: string;
};

// A escada de aprendizado. A ordem de AWS_GUIDE_PAGES é a ordem de leitura;
// o stage agrupa os capítulos na home.
export const AWS_GUIDE_STAGES: AwsGuideStage[] = [
  {
    id: 1,
    title: 'Entender o modelo',
    hint: 'Vocabulário e a lógica da nuvem antes de criar qualquer recurso.',
  },
  {
    id: 2,
    title: 'Colocar código para rodar',
    hint: 'Onde a aplicação executa e quanto de operação você delega.',
  },
  {
    id: 3,
    title: 'Guardar e consultar dados',
    hint: 'Objeto, bloco, arquivo e banco: cada dado no lugar certo.',
  },
  {
    id: 4,
    title: 'Conectar as peças',
    hint: 'Rede, entrada de tráfego e conversa assíncrona entre serviços.',
  },
  {
    id: 5,
    title: 'Operar e consolidar',
    hint: 'Segurança, custo e a prova de entrada como revisão do caminho.',
  },
  {
    id: 6,
    title: 'Aplicar IA',
    hint: 'Modelos, serviços gerenciados e uso responsável de IA sobre os dados que você já guarda.',
  },
];

export const AWS_GUIDE_PAGES: AwsGuidePage[] = [
  {
    id: 'mapa-mental',
    title: 'Mapa mental',
    description:
      'Os 3 grupos de serviços, o espectro de responsabilidade e por que os nomes são siglas.',
    stage: 1,
  },
  {
    id: 'fundamentos-nuvem',
    title: 'Fundamentos de nuvem',
    description:
      'O modelo mental: IaaS, PaaS e SaaS, regiões, zonas de disponibilidade e a lógica da conta.',
    stage: 1,
  },
  {
    id: 'computacao',
    title: 'Computação',
    description: 'EC2, ECS, Fargate, Lambda e EKS: onde o código executa e quanto você delega.',
    stage: 2,
  },
  {
    id: 'ec2',
    title: 'EC2 na prática',
    description:
      'Famílias, imagens, disco, auto scaling e as decisões que fazem a fatura crescer.',
    stage: 2,
  },
  {
    id: 'armazenamento',
    title: 'Armazenamento',
    description: 'S3, EBS, EFS e Glacier: onde guardar cada byte e quanto custa guardar.',
    stage: 3,
  },
  {
    id: 'dados',
    title: 'Bancos de dados',
    description: 'RDS, Aurora e DynamoDB: escolher o banco pelo formato do dado e do acesso.',
    stage: 3,
  },
  {
    id: 'rede-vpc',
    title: 'Rede e VPC',
    description:
      'Sub-redes, rotas, gateways e security groups: por que a instância não tem internet.',
    stage: 4,
  },
  {
    id: 'entrega-de-conteudo',
    title: 'Entrega de conteúdo',
    description: 'Route 53, CloudFront e load balancers: como o usuário chega no seu serviço.',
    stage: 4,
  },
  {
    id: 'comunicacao',
    title: 'Comunicação',
    description: 'API Gateway, SQS, SNS, EventBridge: como as peças conversam sem se grudar.',
    stage: 4,
  },
  {
    id: 'seguranca-e-custo',
    title: 'Segurança e custo',
    description: 'IAM, responsabilidade compartilhada, free tier, preços e suporte.',
    stage: 5,
  },
  {
    id: 'cloud-practitioner',
    title: 'Cloud Practitioner (CLF-C02)',
    description: 'Os 4 domínios da prova com pesos e o que estudar em cada um.',
    stage: 5,
  },
  {
    id: 'ia-e-ml',
    title: 'IA e machine learning',
    description: 'O ciclo de vida de um modelo: problema, dados, treino, avaliação e operação.',
    stage: 6,
  },
  {
    id: 'genai-e-foundation-models',
    title: 'GenAI e foundation models',
    description: 'Tokens, prompt engineering, RAG, fine-tuning e o custo real de uma inferência.',
    stage: 6,
  },
  {
    id: 'servicos-de-ia',
    title: 'Serviços de IA',
    description: 'Bedrock, SageMaker, Rekognition, Textract e companhia: qual resolve qual problema.',
    stage: 6,
  },
  {
    id: 'ia-responsavel-e-governanca',
    title: 'IA responsável e governança',
    description: 'Viés, explicabilidade, privacidade, guardrails e o que a LGPD exige.',
    stage: 6,
  },
  {
    id: 'ai-practitioner',
    title: 'AI Practitioner (AIF-C01)',
    description: 'Os 5 domínios da prova de IA com pesos e o que estudar em cada um.',
    stage: 6,
  },
];

export const AWS_GUIDE_IDS: string[] = AWS_GUIDE_PAGES.map((page) => page.id);

// A home /aws não conta como página de conteúdo do guia.
export const AWS_GUIDE_TOTAL = AWS_GUIDE_PAGES.length;
