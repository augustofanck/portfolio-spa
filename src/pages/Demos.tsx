import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const demoCards = [
  {
    to: "/demos/budget",
    titleKey: "demosPage.cards.budgetTitle",
    descKey: "demosPage.cards.budgetDesc",
    skillKey: "demosPage.cards.budgetSkill",
  },
  {
    to: "/demos/async-search",
    titleKey: "demosPage.cards.asyncTitle",
    descKey: "demosPage.cards.asyncDesc",
    skillKey: "demosPage.cards.asyncSkill",
  },
  {
    to: "/demos/payment-status",
    titleKey: "demosPage.cards.payTitle",
    descKey: "demosPage.cards.payDesc",
    skillKey: "demosPage.cards.paySkill",
  },
];

export default function Demos() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="section">
        <div className="section-header">
          <p className="eyebrow">{t("demosPage.eyebrow")}</p>
          <h1 style={{ margin: 0 }}>{t("demosPage.title")}</h1>
          <p className="muted lede" style={{ margin: 0 }}>
            {t("demosPage.subtitle")}
          </p>
        </div>

        <div className="card demo-intro">
          <div>
            <p className="eyebrow">{t("demosPage.introTitle")}</p>
            <p className="demo-intro-copy">{t("demosPage.introDesc")}</p>
          </div>
        </div>

        <div className="demo-grid">
          {demoCards.map((demo) => (
            <Link
              key={demo.to}
              to={demo.to}
              className="card interactive-card demo-card"
            >
              <article>
                <span className="pill">{t(demo.skillKey)}</span>

                <h2 className="demo-card-title">{t(demo.titleKey)}</h2>

                <p className="muted demo-card-copy">{t(demo.descKey)}</p>

                <span className="project-card-link">
                  {t("demosPage.viewDemo")}
                </span>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
