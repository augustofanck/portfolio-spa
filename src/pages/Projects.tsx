import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";

export default function Projects() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  const tags = useMemo(() => {
    const all = new Set<string>();

    projects.forEach((project) => {
      project.stack.forEach((stack) => all.add(stack));
    });

    return Array.from(all).sort();
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const title = t(`caseStudies.${project.slug}.title`).toLowerCase();
      const oneLiner = t(`caseStudies.${project.slug}.oneLiner`).toLowerCase();
      const stack = project.stack.join(" ").toLowerCase();

      const matchesQuery =
        !normalizedQuery ||
        title.includes(normalizedQuery) ||
        oneLiner.includes(normalizedQuery) ||
        stack.includes(normalizedQuery);

      const matchesTag = !tag || project.stack.includes(tag);

      return matchesQuery && matchesTag;
    });
  }, [query, tag, t]);

  return (
    <div>
      <section className="section">
        <div className="section-header">
          <p className="eyebrow">{t("projectsPage.eyebrow")}</p>
          <h1 style={{ margin: 0 }}>{t("projectsPage.title")}</h1>
          <p className="muted lede" style={{ margin: 0 }}>
            {t("projectsPage.subtitle")}
          </p>
        </div>

        <div className="project-toolbar">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("projectsPage.searchPlaceholder")}
            aria-label={t("projectsPage.searchPlaceholder")}
          />

          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            aria-label={t("projectsPage.allStacks")}
          >
            <option value="">{t("projectsPage.allStacks")}</option>

            {tags.map((currentTag) => (
              <option key={currentTag} value={currentTag}>
                {currentTag}
              </option>
            ))}
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="project-grid">
            {filtered.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="card interactive-card project-card"
              >
                <article>
                  <div className="project-card-topline">
                    <span className="pill">
                      {t(`projectMeta.kind.${project.kind}`)}
                    </span>

                    <span className="muted">{project.year}</span>
                  </div>

                  <h2 className="project-card-title">
                    {t(`caseStudies.${project.slug}.title`)}
                  </h2>

                  <p className="muted project-card-copy">
                    {t(`caseStudies.${project.slug}.oneLiner`)}
                  </p>

                  <div className="project-card-meta">
                    <span>{t(`projectMeta.role.${project.role}`)}</span>
                    <span>{t(`projectMeta.status.${project.status}`)}</span>
                  </div>

                  <div className="row" style={{ gap: 8 }}>
                    {project.stack.slice(0, 6).map((stack) => (
                      <span key={stack} className="pill">
                        {stack}
                      </span>
                    ))}
                  </div>
                  <span className="project-card-link">
                    {t("projectsPage.viewCase")}
                  </span>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card empty-state">
            <p className="eyebrow">{t("projectsPage.emptyTitle")}</p>
            <p className="muted" style={{ margin: 0 }}>
              {t("projectsPage.emptyDesc")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
