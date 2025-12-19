import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Item = { id: string; text: string; preco: number; estoque: number };

function fakeApi(label: string, search: string, page: number) {
  const all: Item[] = Array.from({ length: 120 }).map((_, i) => ({
    id: String(i + 1),
    text: `${label} ${i + 1} — ${["A", "B", "C"][i % 3]}`,
    preco: Number((Math.random() * 100 + 1).toFixed(2)),
    estoque: Math.floor(Math.random() * 200),
  }));

  const filtered = all.filter((x) =>
    x.text.toLowerCase().includes(search.toLowerCase())
  );
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  const hasMore = start + pageSize < filtered.length;

  return new Promise<{ items: Item[]; hasMore: boolean }>((resolve) => {
    setTimeout(() => resolve({ items, hasMore }), 350);
  });
}

export default function AsyncSearchDemo() {
  const { t } = useTranslation();
  const label = t("demo.async.itemLabel");

  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(term.trim()), 300);
    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    if (debounced.length < 2) {
      setItems([]);
      setHasMore(false);
      setPage(1);
      return;
    }

    setLoading(true);
    fakeApi(label, debounced, page).then((res) => {
      setItems((prev) => (page === 1 ? res.items : [...prev, ...res.items]));
      setHasMore(res.hasMore);
      setLoading(false);
    });
  }, [debounced, page, label]);

  const canSearch = useMemo(() => debounced.length >= 2, [debounced]);

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>{t("demo.async.title")}</h1>
      <p className="muted">{t("demo.async.desc")}</p>

      <input
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          setPage(1);
        }}
        placeholder={t("demo.async.placeholder")}
      />

      <div style={{ marginTop: 16 }} className="grid">
        {!canSearch && <div className="muted">{t("demo.async.type2")}</div>}
        {loading && <div className="muted">{t("demo.async.loading")}</div>}

        {items.map((it) => (
          <div key={it.id} className="card" style={{ padding: 12 }}>
            <strong>{it.text}</strong>
            <div className="muted">
              {t("demo.async.price")}: R$ {it.preco.toFixed(2)} •{" "}
              {t("demo.async.stock")}: {it.estoque}
            </div>
          </div>
        ))}

        {hasMore && !loading && (
          <button onClick={() => setPage((p) => p + 1)} className="ghost">
            {t("demo.async.loadMore")}
          </button>
        )}
      </div>
    </div>
  );
}
