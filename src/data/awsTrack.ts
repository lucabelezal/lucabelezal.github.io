// Fonte única da trilha do guia AWS. Consumida pelo sidebar (sidebarsAws.ts)
// e pelos componentes de navegação. Não conte páginas do guia em outro lugar.
export const AWS_GUIDE_IDS: string[] = [
  'index',
  'mapa-mental',
  'computacao',
  'dados',
  'comunicacao',
  'seguranca-e-custo',
  'cloud-practitioner',
];

// A home /aws não conta como página de conteúdo do guia.
export const AWS_GUIDE_TOTAL = AWS_GUIDE_IDS.filter((id) => id !== 'index').length;
