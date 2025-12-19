import { useState } from "react";

type Status = "approved" | "pending" | "failed";

const copy: Record<Status, { title: string; msg: string }> = {
  approved: {
    title: "Pagamento aprovado ✅",
    msg: "Pedido confirmado. Você já pode liberar o acesso/entrega e registrar a transação.",
  },
  pending: {
    title: "Pagamento pendente ⏳",
    msg: "Aguardando confirmação do provedor. Mostre instruções e evite duplicidade de tentativa.",
  },
  failed: {
    title: "Pagamento falhou ❌",
    msg: "Informe o motivo (quando houver) e ofereça nova tentativa com UX limpa.",
  },
};

export default function PaymentStatusDemo() {
  const [status, setStatus] = useState<Status>("pending");

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>Demo — Estados de Pagamento</h1>
      <p className="muted">
        Simula o que você trataria em integrações reais (ex.: Mercado Pago):
        estados e UX do retorno.
      </p>

      <div className="row">
        <button onClick={() => setStatus("approved")} className="ghost">
          approved
        </button>
        <button onClick={() => setStatus("pending")} className="ghost">
          pending
        </button>
        <button onClick={() => setStatus("failed")} className="ghost">
          failed
        </button>
      </div>

      <hr />

      <h2 style={{ marginTop: 0 }}>{copy[status].title}</h2>
      <p className="muted">{copy[status].msg}</p>

      <div className="row" style={{ marginTop: 12 }}>
        <button className="primary">Ação principal</button>
        <button className="ghost">Ação secundária</button>
      </div>
    </div>
  );
}
