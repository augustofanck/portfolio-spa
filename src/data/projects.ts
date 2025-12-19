export type ProjectLink = { key: "repo" | "demo"; url: string };

export type Project = {
  slug: string;
  stack: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "estoque-ci4",
    stack: [
      "PHP",
      "CodeIgniter 4",
      "JavaScript",
      "Bootstrap 5",
      "Select2",
      "AJAX",
    ],
    links: [
      { key: "repo", url: "https://github.com/augustofanck/estoque-ci4" },
      {
        key: "demo",
        url: "",
      },
    ],
  },
];
