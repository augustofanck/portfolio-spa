import { Link } from "react-router-dom";

export default function Demos() {
  return (
    <div className="grid">
      <div>
        <h1 style={{ margin: 0 }}>Demos</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Mini-apps pra provar habilidade na prática, sem PowerPoint.
        </p>
      </div>

      <div className="grid-cards">
        <Link to="/demos/budget" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Orçamento dinâmico</h3>
            <p className="muted">
              Subtotal/total + desconto, add/remove de linhas.
            </p>
          </div>
        </Link>

        <Link to="/demos/async-search" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Busca assíncrona</h3>
            <p className="muted">
              Simula Select2 AJAX: debounce, paginação e “load more”.
            </p>
          </div>
        </Link>

        <Link to="/demos/payment-status" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Estados de pagamento</h3>
            <p className="muted">
              Simula approved/pending/failed e UX de retorno.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
