import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: isActive ? "var(--text)" : "var(--surface)",
  color: isActive ? "var(--bg)" : "var(--text)",
});

export default function NavBar() {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();

  function toggleLang() {
    const next = i18n.language === "ptBR" ? "en" : "ptBR";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  }

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* Esquerda: identidade */}
          <div className="row" style={{ gap: 10 }}>
            <strong style={{ letterSpacing: -0.2 }}>Augusto Fanck</strong>
            <span className="muted">{t("nav.identity")}</span>
          </div>

          {/* Centro: navegação */}
          <nav
            className="row"
            style={{ justifyContent: "center", flex: 1, minWidth: 260 }}
          >
            <NavLink to="/" style={linkStyle}>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/projects" style={linkStyle}>
              {t("nav.projects")}
            </NavLink>
            <NavLink to="/demos" style={linkStyle}>
              {t("nav.demos")}
            </NavLink>
            <NavLink to="/engineering" style={linkStyle}>
              {t("nav.eng")}
            </NavLink>
          </nav>

          {/* Direita: botões pequenos (tema/idioma) */}
          <div className="row" style={{ justifyContent: "flex-end" }}>
            <button
              className="ghost btn-sm"
              onClick={toggle}
              title={t("ui.theme")}
              aria-label={t("ui.theme")}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            <button
              className="ghost btn-sm"
              onClick={toggleLang}
              title={t("ui.lang")}
              aria-label={t("ui.lang")}
            >
              {i18n.language === "ptBR" ? "PT" : "EN"}
            </button>

            <button
              className="ghost btn-sm"
              // onClick={openGitHub}
              title={t("ui.github")}
              aria-label={t("ui.github")}>
                {/* {i18n.} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
