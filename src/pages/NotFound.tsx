import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>404</h1>
      <p className="muted">
        Essa rota não existe (ainda). Mas a ambição existe.
      </p>
      <Link to="/">
        <button className="ghost">Voltar pra Home</button>
      </Link>
    </div>
  );
}
