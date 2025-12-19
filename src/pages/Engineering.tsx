import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import mdPT from "../content/engineering.ptBR.md?raw";
import mdEN from "../content/engineering.en.md?raw";

export default function Engineering() {
  const { t, i18n } = useTranslation();

  const md = i18n.language === "ptBR" ? mdPT : mdEN;

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>{t("engineeringPage.title")}</h1>
      <div className="muted" style={{ marginTop: 8 }}>
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
    </div>
  );
}
