import { Outlet } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar";
import { profile } from "../data/profile";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <>
      <NavBar />

      <main className="container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-shell">
          <div className="footer-main">
            <p className="eyebrow">{profile.name}</p>
            <h2 className="footer-title">{t("footer.headline")}</h2>
            <p className="footer-copy">{t("footer.desc")}</p>
          </div>

          <div className="footer-bottom">
            <div className="muted">
              <span>
                {t("footer.left", { year: new Date().getFullYear() })}
              </span>
              <span> • </span>
              <span>{t("footer.right")}</span>
            </div>

            <div className="footer-links">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="button-link ghost footer-link"
              >
                <FaGithub size={14} />
                {t("footer.github")}
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="button-link ghost footer-link"
              >
                <FaLinkedin size={14} />
                {t("footer.linkedin")}
              </a>

              <a
                href={profile.links.email}
                className="button-link ghost footer-link"
              >
                <FaEnvelope size={14} />
                {t("footer.email")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
