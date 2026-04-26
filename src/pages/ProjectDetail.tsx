import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  if (!project) {
    return (
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{t("projectDetail.notFoundTitle")}</h2>
        <Link to="/projects">{t("projectDetail.backProjects")}</Link>
      </div>
    );
  }

  const solution = t(`caseStudies.${project.slug}.solution`, {
    returnObjects: true,
  }) as string[];
  const highlights = t(`caseStudies.${project.slug}.highlights`, {
    returnObjects: true,
  }) as string[];
  const metrics = t(`caseStudies.${project.slug}.metrics`, {
    returnObjects: true,
  }) as string[];

  return (
    <div className="grid">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>
          {t(`caseStudies.${project.slug}.title`)}
        </h1>
        <p className="muted">{t(`caseStudies.${project.slug}.oneLiner`)}</p>

        <div className="row" style={{ gap: 8, marginTop: 10 }}>
          {project.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>

        <hr />

        <h3>{t("projectDetail.problem")}</h3>
        <p className="muted">{t(`caseStudies.${project.slug}.problem`)}</p>

        <h3>{t("projectDetail.solution")}</h3>
        <ul className="muted">
          {solution.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>

        <h3>{t("projectDetail.highlights")}</h3>
        <ul className="muted">
          {highlights.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>

        {metrics?.length ? (
          <>
            <h3>{t("projectDetail.metrics")}</h3>
            <ul className="muted">
              {metrics.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </>
        ) : null}

        <h3>{t("projectDetail.links")}</h3>

        <div className="row">
          {project.links.map((l) => {
            const label = t(`caseStudies.${project.slug}.links.${l.key}`);

            if (l.key === "demo" && !l.url) {
              return (
                <button
                  key={l.key}
                  type="button"
                  className="ghost"
                  onClick={() => setDemoModalOpen(true)}
                >
                  {label}
                </button>
              );
            }

            return (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="button-link ghost"
              >
                {label}
              </a>
            );
          })}
        </div>

        <Modal
          open={demoModalOpen}
          title={t("modal.demoUnavailableTitle")}
          closeLabel={t("ui.close")}
          onClose={() => setDemoModalOpen(false)}
        >
          {t("modal.demoUnavailableBody")}
        </Modal>

        <hr />
        <Link to="/projects">← {t("projectDetail.backProjects")}</Link>
      </div>
    </div>
  );
}
