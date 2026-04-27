import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const focusAreas = t("home.focusAreas", { returnObjects: true }) as string[];
  const deliverItems = t("home.deliverItems", {
    returnObjects: true,
  }) as string[];

  return (
    <div>
      <section className="hero">
        <p className="eyebrow">{t("home.eyebrow")}</p>

        <h1 className="hero-title">
          {t("home.titleStart")} <span>{t("home.titleHighlight")}</span>.
        </h1>

        <p className="hero-copy">{t("home.desc")}</p>

        <div className="hero-actions">
          <Link to="/projects" className="button-link primary">
            {t("home.ctaProjects")}
          </Link>

          <Link to="/demos" className="button-link ghost">
            {t("home.ctaDemos")}
          </Link>
        </div>

        <div className="row" style={{ gap: 8 }}>
          {focusAreas.map((area) => (
            <span key={area} className="pill">
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">{t("home.workEyebrow")}</p>
          <h2 style={{ margin: 0 }}>{t("home.workTitle")}</h2>
          <p className="muted lede" style={{ margin: 0 }}>
            {t("home.workDesc")}
          </p>
        </div>

        <div className="signal-grid" style={{ marginTop: 20 }}>
          <article className="card signal-card">
            <h3 style={{ marginTop: 0 }}>{t("home.deliverTitle")}</h3>
            <ul className="muted" style={{ marginBottom: 0 }}>
              {deliverItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card signal-card">
            <h3 style={{ marginTop: 0 }}>{t("home.thinkTitle")}</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              {t("home.thinkDesc")}
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">{t("home.proofEyebrow")}</p>
          <h2 style={{ margin: 0 }}>{t("home.proofTitle")}</h2>
          <p className="muted lede" style={{ margin: 0 }}>
            {t("home.proofDesc")}
          </p>
        </div>

        <div className="grid-cards" style={{ marginTop: 20 }}>
          <Link
            to="/projects"
            className="card interactive-card"
            style={{ textDecoration: "none" }}
          >
            <p className="eyebrow">{t("home.proofProjectsEyebrow")}</p>
            <h3 style={{ marginTop: 0 }}>{t("projectsPage.title")}</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              {t("projectsPage.subtitle")}
            </p>
          </Link>

          <Link
            to="/demos"
            className="card interactive-card"
            style={{ textDecoration: "none" }}
          >
            <p className="eyebrow">{t("home.proofDemosEyebrow")}</p>
            <h3 style={{ marginTop: 0 }}>{t("demosPage.title")}</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              {t("demosPage.subtitle")}
            </p>
          </Link>

          <Link
            to="/engineering"
            className="card interactive-card"
            style={{ textDecoration: "none" }}
          >
            <p className="eyebrow">{t("home.proofEngineeringEyebrow")}</p>
            <h3 style={{ marginTop: 0 }}>{t("engineeringPage.title")}</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              {t("home.proofEngineerincDesc")}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
