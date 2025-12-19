import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="grid">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>
          {t("home.title")} •{" "}
          <span className="muted">{t("home.subtitle")}</span>
        </h1>

        <p className="muted" style={{ marginBottom: 0 }}>
          {t("home.desc")}
        </p>

        <div className="row" style={{ marginTop: 16 }}>
          <Link to="/projects">
            <button className="primary">{t("home.ctaProjects")}</button>
          </Link>
          <Link to="/demos">
            <button className="ghost">{t("home.ctaDemos")}</button>
          </Link>
        </div>
      </section>

      <section className="grid-cards">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>{t("home.deliverTitle")}</h3>
          <ul className="muted" style={{ marginBottom: 0 }}>
            <li>{t("home.deliver1")}</li>
            <li>{t("home.deliver2")}</li>
            <li>{t("home.deliver3")}</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>{t("home.thinkTitle")}</h3>
          <p className="muted" style={{ marginBottom: 0 }}>
            {t("home.thinkDesc")}
          </p>
        </div>
      </section>
    </div>
  );
}
