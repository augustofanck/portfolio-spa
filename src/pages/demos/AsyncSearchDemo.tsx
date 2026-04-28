import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Item = {
  id: string;
  code: string;
  text: string;
  category: string;
  price: number;
  stock: number;
};

type ApiResult = {
  items: Item[];
  hasMore: boolean;
};

const categories = ["Armação", "Lente", "Serviço", "Acessório"];

function createItems(label: string): Item[] {
  return Array.from({ length: 120 }).map((_, index) => {
    const id = String(index + 1);
    const category = categories[index % categories.length];

    return {
      id,
      code: `SKU-${String(index + 1).padStart(4, "0")}`,
      text: `${label} ${index + 1}`,
      category,
      price: Number((Math.random() * 350 + 40).toFixed(2)),
      stock: Math.floor(Math.random() * 80),
    };
  });
}

function fakeApi(
  label: string,
  search: string,
  page: number,
  shouldFail: boolean
) {
  const all = createItems(label);

  const filtered = all.filter((item) => {
    const haystack = `${item.code} ${item.text} ${item.category}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  const hasMore = start + pageSize < filtered.length;

  return new Promise<ApiResult>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("simulated_request_failure"));
        return;
      }

      resolve({ items, hasMore });
    }, 450);
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function AsyncSearchDemo() {
  const { t } = useTranslation();
  const label = t("demo.async.itemLabel");

  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldFail, setShouldFail] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(term.trim()), 300);
    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    if (debounced.length < 2) {
      return;
    }

    fakeApi(label, debounced, page, shouldFail)
      .then((response) => {
        setItems((previous) =>
          page === 1 ? response.items : [...previous, ...response.items]
        );
        setHasMore(response.hasMore);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setHasMore(false);
        setError(true);
        setLoading(false);
      });
  }, [debounced, page, shouldFail, label]);

  const canSearch = useMemo(() => debounced.length >= 2, [debounced]);
  const visibleItems = canSearch && !error ? items : [];
  const visibleHasMore = canSearch && !error && hasMore;
  const showEmpty =
    canSearch && !loading && !error && visibleItems.length === 0;

  function handleSearchChange(value: string) {
    setTerm(value);
    setPage(1);
    setError(false);
    setLoading(value.trim().length >= 2);
  }

  function retry() {
    setPage(1);
    setError(false);
    setLoading(debounced.length >= 2);
  }

  function clearSearch() {
    setTerm("");
    setDebounced("");
    setPage(1);
    setItems([]);
    setSelected(null);
    setHasMore(false);
    setLoading(false);
    setError(false);
    setShouldFail(false);
  }

  return (
    <div className="demo-detail">
      <section className="section-header">
        <p className="eyebrow">{t("demosPage.eyebrow")}</p>
        <h1 style={{ margin: 0 }}>{t("demo.async.title")}</h1>
        <p className="muted lede" style={{ margin: 0 }}>
          {t("demo.async.desc")}
        </p>
      </section>

      <section className="demo-workspace">
        <div className="card demo-panel">
          <div className="demo-panel-header">
            <div>
              <p className="eyebrow">{t("demo.async.title")}</p>
              <h2 style={{ margin: 0 }}>{t("demo.async.itemLabel")}</h2>
            </div>

            <div className="row">
              <button
                type="button"
                className={shouldFail ? "primary" : "ghost"}
                onClick={() => {
                  setShouldFail((current) => !current);
                  setPage(1);
                  setLoading(debounced.length >= 2);
                }}
              >
                {t("demo.async.simulateError")}
              </button>
              <button type="button" className="ghost" onClick={clearSearch}>
                {t("demo.async.clear")}
              </button>
            </div>
          </div>

          <input
            value={term}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={t("demo.async.placeholder")}
          />

          <div className="async-results">
            {!canSearch ? (
              <div className="empty-state">
                <p className="eyebrow">{t("demo.async.type2")}</p>
              </div>
            ) : null}

            {loading ? (
              <div className="async-loading">
                <span />
                <p className="muted">{t("demo.async.loading")}</p>
              </div>
            ) : null}

            {error ? (
              <div className="empty-state">
                <p className="eyebrow">{t("demo.async.errorTitle")}</p>
                <p className="muted">{t("demo.async.errorDesc")}</p>
                <button type="button" className="ghost" onClick={retry}>
                  {t("demo.async.retry")}
                </button>
              </div>
            ) : null}

            {showEmpty ? (
              <div className="empty-state">
                <p className="eyebrow">{t("demo.async.emptyTitle")}</p>
                <p className="muted" style={{ margin: 0 }}>
                  {t("demo.async.emptyDesc")}
                </p>
              </div>
            ) : null}

            {visibleItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="async-result"
                onClick={() => setSelected(item)}
              >
                <span>
                  <strong>{item.text}</strong>
                  <small className="muted">
                    {t("demo.async.code")}: {item.code} •{" "}
                    {t("demo.async.category")}: {item.category}
                  </small>
                </span>

                <span className="async-result-meta">
                  <strong>{formatCurrency(item.price)}</strong>
                  <small className="muted">
                    {t("demo.async.stock")}: {item.stock}
                  </small>
                </span>
              </button>
            ))}

            {visibleHasMore && !loading ? (
              <button
                type="button"
                className="ghost"
                onClick={() => {
                  setLoading(true);
                  setPage((current) => current + 1);
                }}
              >
                {t("demo.async.loadMore")}
              </button>
            ) : null}
          </div>
        </div>

        <aside className="card demo-summary">
          <p className="eyebrow">{t("demo.async.selectedTitle")}</p>

          {selected ? (
            <div className="selected-item">
              <h2 style={{ margin: 0 }}>{selected.text}</h2>
              <dl>
                <div>
                  <dt>{t("demo.async.code")}</dt>
                  <dd>{selected.code}</dd>
                </div>

                <div>
                  <dt>{t("demo.async.category")}</dt>
                  <dd>{selected.category}</dd>
                </div>

                <div>
                  <dt>{t("demo.async.price")}</dt>
                  <dd>{formatCurrency(selected.price)}</dd>
                </div>

                <div>
                  <dt>{t("demo.async.stock")}</dt>
                  <dd>{selected.stock}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <p className="muted" style={{ margin: 0 }}>
              {t("demo.async.type2")}
            </p>
          )}
        </aside>
      </section>
    </div>
  );
}
