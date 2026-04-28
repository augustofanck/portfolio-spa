import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import mdPT from "../content/engineering.ptBR.md?raw";
import mdEN from "../content/engineering.en.md?raw";

const topics = [
  "topicPrinciples",
  "topicSystems",
  "topicValidation",
  "topicIntegrations",
  "topicContracts",
  "topicEvolution",
];

export default function Engineering() {
  const { t, i18n } = useTranslation();

  const md = i18n.language === "ptBR" ? mdPT : mdEN;

  return (
    <div className="engineering-page">
      <section className="section-header">
        <p className="eyebrow">{t("engineeringPage.eyebrow")}</p>
        <h1 style={{ margin: 0 }}>{t("engineeringPage.title")}</h1>
        <p className="muted lede" style={{ margin: 0 }}>
          {t("engineeringPage.subtitle")}
        </p>
      </section>

      <section className="engineering-layout">
        <article className="card engineering-prose">
          <ReactMarkdown>{md}</ReactMarkdown>
        </article>

        <aside className="card engineering-sidebar">
          <p className="eyebrow">{t("engineeringPage.sidebarTitle")}</p>

          <ul>
            {topics.map((topic) => (
              <li key={topic}>{t(`engineeringPage.${topic}`)}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
