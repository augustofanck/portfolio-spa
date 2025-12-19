import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>{t("notFound.title")}</h1>
      <p className="muted">{t("notFound.desc")}</p>
      <Link to="/">
        <button className="ghost">{t("notFound.backHome")}</button>
      </Link>
    </div>
  );
}
