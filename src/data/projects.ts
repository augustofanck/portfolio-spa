export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  stack: string[];
  problem: string;
  solution: string[];
  highlights: string[];
  metrics?: string[]; // coloque só quando tiver número real
  links: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: "orcamentos-codeigniter",
    title: "Módulo de Orçamentos Avulsos (CodeIgniter 4)",
    oneLiner:
      "Form dinâmico com itens, subtotal/total automático, desconto e prevenção de duplicidade.",
    stack: [
      "PHP",
      "CodeIgniter 4",
      "JavaScript",
      "Bootstrap 5",
      "Select2",
      "AJAX",
    ],
    problem:
      "Cadastro manual causava duplicidade de itens, totais inconsistentes e retrabalho (dados quebrando no POST).",
    solution: [
      "Add/remove de itens com índice estável no payload: itens[index][campo]",
      "Cálculo em tempo real: subtotal por linha + total geral com desconto",
      "Busca assíncrona de itens (Select2 AJAX + paginação) para evitar listas gigantes",
      "Validação de duplicidade no front e consistência do envio",
    ],
    highlights: [
      "UX rápida e previsível",
      "Menos erro operacional",
      "Dados prontos para persistência no back-end",
    ],
    links: [
      { label: "Repositório", url: "https://github.com/augustofanck/estoque-ci4" },
      {
        label: "Demo",
        url: "https://SEUAPP.vercel.app/projects/orcamentos-codeigniter",
      },
    ],
  },
];
