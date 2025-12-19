import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <>
      <NavBar />
      <main className="container">
        <Outlet />
      </main>
      <footer className="container muted" style={{ paddingTop: 0 }}>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span>{t("footer.left", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.right")}</span>
        </div>
      </footer>
    </>
  );
}
