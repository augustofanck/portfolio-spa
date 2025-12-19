import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #eee",
  background: isActive ? "#111" : "white",
  color: isActive ? "white" : "#111",
});

export default function NavBar() {
  return (
    <div style={{ borderBottom: "1px solid #eee", background: "white" }}>
      <div className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="row">
            <strong style={{ letterSpacing: -0.2 }}>Augusto Fanck</strong>
            <span className="muted">• Dev Pleno (Produto + Integrações)</span>
          </div>

          <nav className="row">
            <NavLink to="/" style={linkStyle}>
              Home
            </NavLink>
            <NavLink to="/projects" style={linkStyle}>
              Projetos
            </NavLink>
            <NavLink to="/demos" style={linkStyle}>
              Demos
            </NavLink>
            <NavLink to="/engineering" style={linkStyle}>
              Engineering
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
