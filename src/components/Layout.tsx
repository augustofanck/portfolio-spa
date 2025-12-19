import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
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
          <span>© {new Date().getFullYear()} • Portfólio</span>
          <span>Feito com React + Vite + Vercel</span>
        </div>
      </footer>
    </>
  );
}
