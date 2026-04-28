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

type Source = "mock" | "live";

type DummyProduct = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  sku?: string;
};

type DummyProductsResponse = {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
};

const categories = ["Armação", "Lente", "Serviço", "Acessório"];

const dummyCategories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

function normalizeSearchTerm(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function resolveDummyCategory(search: string) {
  const raw = search.trim();

  if (raw.length < 2) {
    return null;
  }

  const normalized = normalizeSearchTerm(raw);
  const readable = raw.toLowerCase();

  return (
    dummyCategories.find((category) => {
      return (
        category === normalized ||
        category.includes(normalized) ||
        category.replaceAll("-", " ").includes(readable)
      );
    }) ?? null
  );
}

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

function mapDummyProduct(product: DummyProduct): Item {
  return {
    id: String(product.id),
    code: product.sku ?? `DUMMY-${String(product.id).padStart(4, "0")}`,
    text: product.title,
    category: product.category,
    price: product.price,
    stock: product.stock,
  };
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

async function liveProductApi(
  search: string,
  page: number
): Promise<ApiResult> {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const category = resolveDummyCategory(search);

  const params = new URLSearchParams({
    limit: String(pageSize),
    skip: String(skip),
    select: "id,title,category,price,stock,sku",
  });

  const url = category
    ? `https://dummyjson.com/products/category/${category}?${params.toString()}`
    : `https://dummyjson.com/products/search?${new URLSearchParams({
        q: search,
        limit: String(pageSize),
        skip: String(skip),
        select: "id,title,category,price,stock,sku",
      }).toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("product_request_failed");
  }

  const data = (await response.json()) as DummyProductsResponse;

  return {
    items: data.products.map(mapDummyProduct),
    hasMore: data.skip + data.limit < data.total,
  };
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
  const [source, setSource] = useState<Source>("mock");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(term.trim()), 300);
    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    if (debounced.length < 2) {
      return;
    }

    const request =
      source === "live"
        ? liveProductApi(debounced, page)
        : fakeApi(label, debounced, page, shouldFail);

    request
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
  }, [debounced, page, shouldFail, label, source]);

  const canSearch = useMemo(() => debounced.length >= 2, [debounced]);
  const visibleItems = canSearch && !error ? items : [];
  const visibleHasMore = canSearch && !error && hasMore;
  const showEmpty =
    canSearch && !loading && !error && visibleItems.length === 0;

  function changeSource(nextSource: Source) {
    setSource(nextSource);
    setPage(1);
    setItems([]);
    setSelected(null);
    setHasMore(false);
    setError(false);
    setLoading(debounced.length >= 2);
  }

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

  const detectedCategory =
    source === "live" && canSearch ? resolveDummyCategory(debounced) : null;

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

            <div
              className="source-switcher"
              aria-label={t("demo.async.sourceLabel")}
            >
              <button
                type="button"
                className={source === "mock" ? "primary" : "ghost"}
                onClick={() => changeSource("mock")}
              >
                {t("demo.async.mockSource")}
              </button>

              <button
                type="button"
                className={source === "live" ? "primary" : "ghost"}
                onClick={() => changeSource("live")}
              >
                {t("demo.async.liveSource")}
              </button>
            </div>

            <div className="row">
              <button
                type="button"
                className={shouldFail ? "primary" : "ghost"}
                disabled={source === "live"}
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

          <p className="muted" style={{ margin: 0 }}>
            {source === "live"
              ? t("demo.async.liveHint")
              : t("demo.async.mockHint")}
          </p>

          {detectedCategory ? (
            <span className="pill">
              {t("demo.async.categoryDetected")}: {detectedCategory}
            </span>
          ) : null}

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
