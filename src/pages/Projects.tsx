import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
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
      const hitQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.oneLiner.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q);
      const hitTag = !tag || p.stack.includes(tag);
      return hitQuery && hitTag;
    });
  }, [query, tag]);

  return (
    <div className="grid">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0 }}>Projetos</h1>
          <p className="muted" style={{ marginTop: 6 }}>
            Case studies com problema → solução → impacto.
          </p>
        </div>
      </div>

      <div className="row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por stack, projeto, feature…"
          style={{ flex: 1, minWidth: 240 }}
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Todas as stacks</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
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
              <h3 style={{ marginTop: 0 }}>{p.title}</h3>
              <p className="muted">{p.oneLiner}</p>
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
