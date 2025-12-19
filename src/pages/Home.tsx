import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>
          Portfólio • <span className="muted">desenvolvimento com orientação a objetos</span>
        </h1>
        <p className="muted" style={{ marginBottom: 0 }}>
          Eu construo fluxo de negócio de ponta a ponta: formulário dinâmico,
          consistência de dados, integrações, e UX que não dá dor de cabeça na
          operação.
        </p>

        <div className="row" style={{ marginTop: 16 }}>
          <Link to="/projects">
            <button className="primary">Ver projetos</button>
          </Link>
          <Link to="/demos">
            <button className="ghost">Ver demos</button>
          </Link>
        </div>
      </section>

      <section className="grid-cards">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>O que eu entrego</h3>
          <ul className="muted" style={{ marginBottom: 0 }}>
            <li>Formulários complexos com payload consistente</li>
            <li>Busca assíncrona e performance de UI</li>
            <li>Integrações (pagamento, auth, dados)</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Como eu penso</h3>
          <p className="muted" style={{ marginBottom: 0 }}>
            Menos “funcionou aqui”, mais “aguenta produção”: validação,
            anti-duplicidade, estados, e evolução sem quebrar o que já existe.
          </p>
        </div>
      </section>
    </div>
  );
}
