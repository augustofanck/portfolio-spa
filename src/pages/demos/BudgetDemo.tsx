import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Line = {
  id: string;
  name: string;
  qty: number;
  unit: number;
  discount: number;
};

export default function BudgetDemo() {
  const { t } = useTranslation();

  const [lines, setLines] = useState<Line[]>([
    {
      id: crypto.randomUUID(),
      name: t("demo.budget.sampleItemName"),
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
        name: t("demo.budget.newItemName"),
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
        <h1 style={{ marginTop: 0 }}>{t("demo.budget.title")}</h1>
        <p className="muted">{t("demo.budget.desc")}</p>

        <button className="primary" onClick={add}>
          {t("demo.budget.add")}
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
                  <button onClick={() => remove(i)}>
                    {t("demo.budget.remove")}
                  </button>
                </div>

                <div
                  style={{ textAlign: "right", fontWeight: 700, marginTop: 8 }}
                >
                  {t("demo.budget.subtotal")}: R$ {subtotal.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <hr />
        <div style={{ textAlign: "right", fontSize: 18, fontWeight: 800 }}>
          {t("demo.budget.total")}: R$ {total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
