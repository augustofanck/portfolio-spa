import { useMemo, useState } from "react";
type Line = {
  id: string;
  name: string;
  qty: number;
  unit: number;
  discount: number;
};

export default function BudgetDemo() {
  const [lines, setLines] = useState<Line[]>([
    {
      id: crypto.randomUUID(),
      name: "Item exemplo",
      qty: 1,
      unit: 10,
      discount: 0,
    },
  ]);

  const total = useMemo(
    () =>
      lines.reduce(
        (acc, l) => acc + l.qty * l.unit * (1 - l.discount / 100),
        0
      ),
    [lines]
  );

  function update(i: number, patch: Partial<Line>) {
    setLines((prev) =>
      prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l))
    );
  }

  function add() {
    setLines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "Novo item",
        qty: 1,
        unit: 0,
        discount: 0,
      },
    ]);
  }

  function remove(i: number) {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="grid">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Demo — Orçamento Dinâmico</h1>
        <p className="muted">
          A lógica é a mesma de um módulo real: subtotal por item, total final e
          desconto percentual.
        </p>

        <button className="primary" onClick={add}>
          + Adicionar linha
        </button>

        <div className="grid" style={{ marginTop: 16 }}>
          {lines.map((l, i) => {
            const subtotal = l.qty * l.unit * (1 - l.discount / 100);
            return (
              <div key={l.id} className="card" style={{ padding: 12 }}>
                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <input
                    value={l.name}
                    onChange={(e) => update(i, { name: e.target.value })}
                    style={{ flex: 1, minWidth: 220 }}
                  />
                  <button onClick={() => remove(i)}>Remover</button>
                </div>

                <div className="row" style={{ marginTop: 10 }}>
                  <input
                    type="number"
                    step="0.01"
                    value={l.qty}
                    onChange={(e) => update(i, { qty: Number(e.target.value) })}
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={l.unit}
                    onChange={(e) =>
                      update(i, { unit: Number(e.target.value) })
                    }
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={l.discount}
                    onChange={(e) =>
                      update(i, { discount: Number(e.target.value) })
                    }
                  />
                </div>

                <div
                  style={{ textAlign: "right", fontWeight: 700, marginTop: 8 }}
                >
                  Subtotal: R$ {subtotal.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <hr />
        <div style={{ textAlign: "right", fontSize: 18, fontWeight: 800 }}>
          Total: R$ {total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
