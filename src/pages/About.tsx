import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { profile } from "../data/profile";

export default function About() {
  const { t } = useTranslation();

  const workItems = t("aboutPage.workItems", {
    returnObjects: true,
  }) as string[];

  const stackItems = t("aboutPage.stackItems", {
    returnObjects: true,
  }) as string[];

  const nowItems = t("aboutPage.nowItems", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="about-page">
      <section className="section-header">
        <p className="eyebrow">{t("aboutPage.eyebrow")}</p>
        <h1 style={{ margin: 0 }}>{t("aboutPage.title")}</h1>
        <p className="muted lede" style={{ margin: 0 }}>
          {t("aboutPage.intro")}
        </p>
      </section>

      <section className="about-layout">
        <article className="card about-main">
          <section>
            <p className="eyebrow">{t("aboutPage.profileTitle")}</p>
            <p className="case-copy">{t("aboutPage.profileDesc")}</p>
          </section>

          <section>
            <p className="eyebrow">{t("aboutPage.workTitle")}</p>
            <ul className="case-list">
              {workItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="eyebrow">{t("aboutPage.nowTitle")}</p>
            <ul className="case-list">
              {nowItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="about-sidebar">
          <div className="card">
            <p className="eyebrow">{t("aboutPage.stackTitle")}</p>

            <div className="about-stack">
              {stackItems.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <p className="eyebrow">{t("aboutPage.contactTitle")}</p>
            <p className="muted">{t("aboutPage.contactDesc")}</p>

            <div className="project-link-list">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="button-link ghost"
              >
                <FaGithub size={14} />
                GitHub
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="button-link ghost"
              >
                <FaLinkedin size={14} />
                LinkedIn
              </a>

              <a href={profile.links.email} className="button-link ghost">
                <FaEnvelope size={14} />
                Email
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
