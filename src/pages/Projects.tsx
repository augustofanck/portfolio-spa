import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  const tags = useMemo(() => {
    const all = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => all.add(s)));
    return Array.from(all).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const title = t(`caseStudies.${p.slug}.title`).toLowerCase();
      const oneLiner = t(`caseStudies.${p.slug}.oneLiner`).toLowerCase();
      const hitQuery =
        !q ||
        title.includes(q) ||
        oneLiner.includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q);
      const hitTag = !tag || p.stack.includes(tag);
      return hitQuery && hitTag;
    });
  }, [query, tag, t]);

  return (
    <div className="grid">
      <div>
        <h1 style={{ margin: 0 }}>{t("projectsPage.title")}</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          {t("projectsPage.subtitle")}
        </p>
      </div>

      <div className="row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("projectsPage.searchPlaceholder")}
          style={{ flex: 1, minWidth: 240 }}
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">{t("projectsPage.allStacks")}</option>
          {tags.map((tg) => (
            <option key={tg} value={tg}>
              {tg}
            </option>
          ))}
        </select>
      </div>

      <div className="grid-cards">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <h3 style={{ marginTop: 0 }}>
                {t(`caseStudies.${p.slug}.title`)}
              </h3>
              <p className="muted">{t(`caseStudies.${p.slug}.oneLiner`)}</p>

              <div className="row" style={{ gap: 8 }}>
                {p.stack.slice(0, 7).map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
