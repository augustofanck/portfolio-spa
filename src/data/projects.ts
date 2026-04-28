export type ProjectStatus = "published" | "in-progress" | "archived";
export type ProjectKind = "case-study" | "demo" | "internal-system";

export type ProjectLink = {
  key: "repo" | "demo";
  url: string;
};

export type Project = {
  slug: string;
  year: string;
  kind: ProjectKind;
  status: ProjectStatus;
  role: string;
  stack: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "estoque-ci4",
    year: "2025",
    kind: "internal-system",
    status: "published",
    role: "Full-stack developer",
    stack: [
      "PHP",
      "CodeIgniter 4",
      "JavaScript",
      "Bootstrap 5",
      "Select2",
      "AJAX",
      "MySQL",
      "JWT",
    ],
    links: [
      { key: "repo", url: "https://github.com/augustofanck/estoque-ci4" },
      { key: "demo", url: "" },
    ],
  },
];
