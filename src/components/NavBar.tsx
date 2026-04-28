import { NavLink } from "react-router-dom";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { profile } from "../data/profile";
import i18n from "../i18n";

const navItems = [
  { to: "/", labelKey: "nav.home" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/projects", labelKey: "nav.projects" },
  { to: "/demos", labelKey: "nav.demos" },
  { to: "/engineering", labelKey: "nav.eng" },
];

export default function NavBar() {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();

  function toggleLang() {
    const next = i18n.language === "ptBR" ? "en" : "ptBR";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  }

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <NavLink to="/" className="brand-link">
          <span className="brand-mark">AF</span>

          <span className="brand-copy">
            <span className="brand-name">{profile.name}</span>
            <span className="brand-role">{t("nav.identity")}</span>
          </span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="ghost btn-sm icon-button"
            onClick={toggle}
            title={t("ui.theme")}
            aria-label={t("ui.theme")}
          >
            {theme === "dark" ? <FaMoon size={14} /> : <FaSun size={14} />}
          </button>

          <button
            type="button"
            className="ghost btn-sm"
            onClick={toggleLang}
            title={t("ui.lang")}
            aria-label={t("ui.lang")}
          >
            {i18n.language === "ptBR" ? "PT" : "EN"}
          </button>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            title={t("ui.github")}
            aria-label={t("ui.github")}
            className="button-link ghost btn-sm icon-button"
          >
            <FaGithub size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
