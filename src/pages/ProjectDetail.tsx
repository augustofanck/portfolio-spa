import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  if (!project) {
    return (
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Projeto não encontrado</h2>
        <Link to="/projects">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>{project.title}</h1>
        <p className="muted">{project.oneLiner}</p>

        <div className="row" style={{ gap: 8, marginTop: 10 }}>
          {project.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>

        <hr />

        <h3>Problema</h3>
        <p className="muted">{project.problem}</p>

        <h3>Solução</h3>
        <ul className="muted">
          {project.solution.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>

        <h3>Destaques</h3>
        <ul className="muted">
          {project.highlights.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>

        {project.metrics?.length ? (
          <>
            <h3>Métricas</h3>
            <ul className="muted">
              {project.metrics.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </>
        ) : null}

        <h3>Links</h3>
        <div className="row">
          {project.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
              <button className="ghost">{l.label}</button>
            </a>
          ))}
        </div>

        <hr />
        <Link to="/projects">← Voltar para projetos</Link>
      </div>
    </div>
  );
}
