import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
import Modal from "../components/Modal";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const project = useMemo(
    () => projects.find((item) => item.slug === slug),
    [slug]
  );

  if (!project) {
    return (
      <section className="section">
        <div className="card empty-state">
          <p className="eyebrow">404</p>
          <h1 style={{ marginTop: 0 }}>{t("projectDetail.notFoundTitle")}</h1>
          <Link to="/projects" className="button-link ghost">
            {t("projectDetail.backProjects")}
          </Link>
        </div>
      </section>
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

  const responsibilities = t(`caseStudies.${project.slug}.responsibilities`, {
    returnObjects: true,
  }) as string[];

  const technicalDecisions = t(
    `caseStudies.${project.slug}.technicalDecisions`,
    {
      returnObjects: true,
    }
  ) as string[];

  const learnings = t(`caseStudies.${project.slug}.learnings`, {
    returnObjects: true,
  }) as string[];

  const nextSteps = t(`caseStudies.${project.slug}.nextSteps`, {
    returnObjects: true,
  }) as string[];

  return (
    <div>
      <section className="project-detail-hero">
        <Link to="/projects" className="project-back-link">
          {"←"} {t("projectDetail.backLabel")}
        </Link>

        <p className="eyebrow">{t("projectDetail.eyebrow")}</p>

        <h1 className="project-detail-title">
          {t(`caseStudies.${project.slug}.title`)}
        </h1>

        <p className="hero-copy">{t(`caseStudies.${project.slug}.oneLiner`)}</p>

        <div className="project-detail-meta">
          <span>{t(`projectMeta.kind.${project.kind}`)}</span>
          <span>{project.year}</span>
          <span>{t(`projectMeta.role.${project.role}`)}</span>
          <span>{t(`projectMeta.status.${project.status}`)}</span>
        </div>

        <div className="row" style={{ gap: 8 }}>
          {project.stack.map((stack) => (
            <span key={stack} className="pill">
              {stack}
            </span>
          ))}
        </div>
      </section>

      <section className="project-detail-layout">
        <article className="card project-case">
          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.context")}</p>
            <p className="case-copy">
              {t(`caseStudies.${project.slug}.context`)}
            </p>
          </div>
          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.problem")}</p>
            <p className="case-copy">
              {t(`caseStudies.${project.slug}.problem`)}
            </p>
          </div>

          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.solution")}</p>
            <ul className="case-list">
              {solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.highlights")}</p>
            <ul className="case-list">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.responsibilities")}</p>
            <ul className="case-list">
              {responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.technicalDecisions")}</p>
            <ul className="case-list">
              {technicalDecisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.learnings")}</p>
            <ul className="case-list">
              {learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-section">
            <p className="eyebrow">{t("projectDetail.nextSteps")}</p>
            <ul className="case-list">
              {nextSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {metrics.length > 0 ? (
            <div className="case-section">
              <p className="eyebrow">{t("projectDetail.metrics")}</p>
              <ul className="case-list">
                {metrics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>

        <aside className="project-sidebar">
          <div className="card">
            <p className="eyebrow">{t("projectDetail.overview")}</p>

            <dl className="project-overview-list">
              <div>
                <dt>{t("projectDetail.stack")}</dt>
                <dd>{project.stack[0]}</dd>
              </div>

              <div>
                <dt>{t("projectMeta.kindLabel")}</dt>
                <dd>{t(`projectMeta.kind.${project.kind}`)}</dd>
              </div>

              <div>
                <dt>{t("projectMeta.statusLabel")}</dt>
                <dd>{t(`projectMeta.status.${project.status}`)}</dd>
              </div>

              <div>
                <dt>{t("projectMeta.roleLabel")}</dt>
                <dd>{t(`projectMeta.role.${project.role}`)}</dd>
              </div>
            </dl>
          </div>

          <div className="card">
            <p className="eyebrow">{t("projectDetail.stack")}</p>
            <div className="row" style={{ gap: 8, marginTop: 8 }}>
              {project.stack.map((stack) => (
                <span key={stack} className="pill">
                  {stack}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <p className="eyebrow">{t("projectDetail.links")}</p>

            <div className="project-link-list" style={{ marginTop: 8 }}>
              {project.links.map((link) => {
                const label = t(
                  `caseStudies.${project.slug}.links.${link.key}`
                );

                if (link.key === "demo" && !link.url) {
                  return (
                    <button
                      key={link.key}
                      type="button"
                      className="button-link ghost"
                      onClick={() => setDemoModalOpen(true)}
                    >
                      {label}
                    </button>
                  );
                }

                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="button-link ghost"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </aside>
      </section>

      <Modal
        open={demoModalOpen}
        title={t("modal.demoUnavailableTitle")}
        closeLabel={t("ui.close")}
        onClose={() => setDemoModalOpen(false)}
      >
        {t("modal.demoUnavailableBody")}
      </Modal>
    </div>
  );
}
