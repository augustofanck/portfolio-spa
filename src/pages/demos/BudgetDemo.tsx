import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Line = {
  id: string;
  name: string;
  qty: number;
  unit: number;
  discount: number;
};

function clampNumber(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function BudgetDemo() {
  const { t } = useTranslation();

  const [lines, setLines] = useState<Line[]>([
    {
      id: crypto.randomUUID(),
      name: t("demo.budget.sampleItemName"),
      qty: 1,
      unit: 380,
      discount: 0,
    },
  ]);

  const summary = useMemo(() => {
    return lines.reduce(
      (acc, line) => {
        const gross = line.qty * line.unit;
        const discountValue = gross * (line.discount / 100);
        const subtotal = gross - discountValue;

        return {
          count: acc.count + line.qty,
          gross: acc.gross + gross,
          discount: acc.discount + discountValue,
          net: acc.net + subtotal,
        };
      },
      { count: 0, gross: 0, discount: 0, net: 0 }
    );
  }, [lines]);

  function update(index: number, patch: Partial<Line>) {
    setLines((prev) =>
      prev.map((line, currentIndex) =>
        currentIndex === index ? { ...line, ...patch } : line
      )
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

  function remove(index: number) {
    setLines((prev) =>
      prev.filter((_, currentIndex) => currentIndex !== index)
    );
  }

  return (
    <div className="demo-detail">
      <section className="section-header">
        <p className="eyebrow">{t("demosPage.eyebrow")}</p>
        <h1 style={{ margin: 0 }}>{t("demo.budget.title")}</h1>
        <p className="muted lede" style={{ margin: 0 }}>
          {t("demo.budget.desc")}
        </p>
      </section>

      <section className="demo-workspace">
        <div className="card demo-panel">
          <div className="demo-panel-header">
            <div>
              <p className="eyebrow">{t("demo.budget.title")}</p>
              <h2 style={{ margin: 0 }}>{t("demo.budget.summaryTitle")}</h2>
            </div>

            <button type="button" className="primary" onClick={add}>
              {t("demo.budget.add")}
            </button>
          </div>

          {lines.length > 0 ? (
            <div className="budget-lines">
              {lines.map((line, index) => {
                const gross = line.qty * line.unit;
                const discountValue = gross * (line.discount / 100);
                const subtotal = gross - discountValue;

                return (
                  <article key={line.id} className="budget-line">
                    <div className="budget-line-fields">
                      <label>
                        <span>{t("demo.budget.itemName")}</span>
                        <input
                          value={line.name}
                          onChange={(event) =>
                            update(index, { name: event.target.value })
                          }
                        />
                      </label>

                      <label>
                        <span>{t("demo.budget.qty")}</span>
                        <input
                          type="number"
                          min={1}
                          value={line.qty}
                          onChange={(event) =>
                            update(index, {
                              qty: clampNumber(
                                Number(event.target.value),
                                1,
                                999
                              ),
                            })
                          }
                        />
                      </label>

                      <label>
                        <span>{t("demo.budget.unit")}</span>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={line.unit}
                          onChange={(event) =>
                            update(index, {
                              unit: clampNumber(
                                Number(event.target.value),
                                0,
                                999999
                              ),
                            })
                          }
                        />
                      </label>

                      <label>
                        <span>{t("demo.budget.discount")}</span>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={line.discount}
                          onChange={(event) =>
                            update(index, {
                              discount: clampNumber(
                                Number(event.target.value),
                                0,
                                100
                              ),
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="budget-line-footer">
                      <div className="budget-line-total">
                        <span>{t("demo.budget.subtotal")}</span>
                        <strong>{formatCurrency(subtotal)}</strong>
                        {discountValue > 0 ? (
                          <small className="muted">
                            - {formatCurrency(discountValue)}
                          </small>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        className="ghost"
                        onClick={() => remove(index)}
                      >
                        {t("demo.budget.remove")}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">{t("demo.budget.emptyTitle")}</p>
              <p className="muted" style={{ margin: 0 }}>
                {t("demo.budget.emptyDesc")}
              </p>
            </div>
          )}
        </div>

        <aside className="card demo-summary">
          <p className="eyebrow">{t("demo.budget.summaryTitle")}</p>

          <dl>
            <div>
              <dt>{t("demo.budget.itemsCount")}</dt>
              <dd>{summary.count}</dd>
            </div>

            <div>
              <dt>{t("demo.budget.grossTotal")}</dt>
              <dd>{formatCurrency(summary.gross)}</dd>
            </div>

            <div>
              <dt>{t("demo.budget.discountTotal")}</dt>
              <dd>{formatCurrency(summary.discount)}</dd>
            </div>

            <div className="demo-summary-total">
              <dt>{t("demo.budget.netTotal")}</dt>
              <dd>{formatCurrency(summary.net)}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </div>
  );
}
