import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Demos() {
  const { t } = useTranslation();

  return (
    <div className="grid">
      <div>
        <h1 style={{ margin: 0 }}>{t("demosPage.title")}</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          {t("demosPage.subtitle")}
        </p>
      </div>

      <div className="grid-cards">
        <Link to="/demos/budget" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>{t("demosPage.cards.budgetTitle")}</h3>
            <p className="muted">{t("demosPage.cards.budgetDesc")}</p>
          </div>
        </Link>

        <Link to="/demos/async-search" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>{t("demosPage.cards.asyncTitle")}</h3>
            <p className="muted">{t("demosPage.cards.asyncDesc")}</p>
          </div>
        </Link>

        <Link to="/demos/payment-status" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>{t("demosPage.cards.payTitle")}</h3>
            <p className="muted">{t("demosPage.cards.payDesc")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
