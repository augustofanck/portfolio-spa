import { useEffect, useMemo, useState } from "react";

type Item = { id: string; text: string; preco: number; estoque: number };

function fakeApi(search: string, page: number) {
  const all: Item[] = Array.from({ length: 120 }).map((_, i) => ({
    id: String(i + 1),
    text: `Item ${i + 1} — ${["A", "B", "C"][i % 3]}`,
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
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(term.trim()), 300);
    return () => clearTimeout(t);
  }, [term]);

  useEffect(() => {
    if (debounced.length < 2) {
      setItems([]);
      setHasMore(false);
      setPage(1);
      return;
    }

    setLoading(true);
    fakeApi(debounced, page).then((res) => {
      setItems((prev) => (page === 1 ? res.items : [...prev, ...res.items]));
      setHasMore(res.hasMore);
      setLoading(false);
    });
  }, [debounced, page]);

  const canSearch = useMemo(() => debounced.length >= 2, [debounced]);

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>Demo — Busca Assíncrona</h1>
      <p className="muted">
        Simula Select2 AJAX: <strong>debounce</strong>, paginação e{" "}
        <strong>load more</strong>. Digite pelo menos 2 caracteres.
      </p>

      <input
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          setPage(1);
        }}
        placeholder="Ex: Item 2"
      />

      <div style={{ marginTop: 16 }} className="grid">
        {!canSearch && (
          <div className="muted">Digite 2+ caracteres para buscar.</div>
        )}

        {loading && <div className="muted">Carregando…</div>}

        {items.map((it) => (
          <div key={it.id} className="card" style={{ padding: 12 }}>
            <strong>{it.text}</strong>
            <div className="muted">
              Preço: R$ {it.preco.toFixed(2)} • Estoque: {it.estoque}
            </div>
          </div>
        ))}

        {hasMore && !loading && (
          <button onClick={() => setPage((p) => p + 1)} className="ghost">
            Carregar mais
          </button>
        )}
      </div>
    </div>
  );
}
