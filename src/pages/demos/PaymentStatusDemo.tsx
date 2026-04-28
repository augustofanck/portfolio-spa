import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Status = "idle" | "processing" | "approved" | "pending" | "failed";
type Method = "credit" | "pix" | "boleto";

type TimelineEvent = {
  id: string;
  label: string;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function PaymentStatusDemo() {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(149.9);
  const [method, setMethod] = useState<Method>("credit");
  const [status, setStatus] = useState<Status>("idle");
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  const statusCopy = useMemo(() => {
    return {
      idle: {
        title: t("demo.payment.idleTitle"),
        msg: t("demo.payment.idleMsg"),
        label: t("demo.payment.statusIdle"),
      },
      processing: {
        title: t("demo.payment.processingTitle"),
        msg: t("demo.payment.processingMsg"),
        label: t("demo.payment.statusProcessing"),
      },
      approved: {
        title: t("demo.payment.approvedTitle"),
        msg: t("demo.payment.approvedMsg"),
        label: t("demo.payment.statusApproved"),
      },
      pending: {
        title: t("demo.payment.pendingTitle"),
        msg: t("demo.payment.pendingMsg"),
        label: t("demo.payment.statusPending"),
      },
      failed: {
        title: t("demo.payment.failedTitle"),
        msg: t("demo.payment.failedMsg"),
        label: t("demo.payment.statusFailed"),
      },
    } satisfies Record<Status, { title: string; msg: string; label: string }>;
  }, [t]);

  function addEvent(label: string) {
    setTimeline((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        label,
      },
    ]);
  }

  function startPayment(forcedStatus?: Exclude<Status, "idle" | "processing">) {
    setStatus("processing");
    setTimeline([
      {
        id: crypto.randomUUID(),
        label: t("demo.payment.eventStarted"),
      },
      {
        id: crypto.randomUUID(),
        label: t("demo.payment.eventProcessing"),
      },
    ]);

    window.setTimeout(() => {
      const finalStatus =
        forcedStatus ??
        (["approved", "pending", "failed"][
          Math.floor(Math.random() * 3)
        ] as Exclude<Status, "idle" | "processing">);

      setStatus(finalStatus);

      const eventKey = {
        approved: "demo.payment.eventApproved",
        pending: "demo.payment.eventPending",
        failed: "demo.payment.eventFailed",
      }[finalStatus];

      addEvent(t(eventKey));
    }, 700);
  }

  function reset() {
    setStatus("idle");
    setTimeline([]);
  }

  return (
    <div className="demo-detail">
      <section className="section-header">
        <p className="eyebrow">{t("demosPage.eyebrow")}</p>
        <h1 style={{ margin: 0 }}>{t("demo.payment.title")}</h1>
        <p className="muted lede" style={{ margin: 0 }}>
          {t("demo.payment.desc")}
        </p>
      </section>

      <section className="demo-workspace">
        <div className="card demo-panel">
          <div className="demo-panel-header">
            <div>
              <p className="eyebrow">{t("demo.payment.methodLabel")}</p>
              <h2 style={{ margin: 0 }}>{formatCurrency(amount)}</h2>
            </div>

            <span className={`payment-status payment-status-${status}`}>
              {statusCopy[status].label}
            </span>
          </div>

          <div className="payment-form-grid">
            <label>
              <span>{t("demo.payment.amountLabel")}</span>
              <input
                type="number"
                min={1}
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </label>

            <label>
              <span>{t("demo.payment.methodLabel")}</span>
              <select
                value={method}
                onChange={(event) => setMethod(event.target.value as Method)}
              >
                <option value="credit">{t("demo.payment.methodCredit")}</option>
                <option value="pix">{t("demo.payment.methodPix")}</option>
                <option value="boleto">{t("demo.payment.methodBoleto")}</option>
              </select>
            </label>
          </div>

          <div className="payment-result">
            <h2 style={{ margin: 0 }}>{statusCopy[status].title}</h2>
            <p className="muted" style={{ margin: 0 }}>
              {statusCopy[status].msg}
            </p>
          </div>

          <div className="row">
            <button
              type="button"
              className="primary"
              disabled={status === "processing"}
              onClick={() => startPayment()}
            >
              {status === "processing"
                ? t("demo.payment.processing")
                : t("demo.payment.start")}
            </button>

            <button
              type="button"
              className="ghost"
              disabled={status === "processing"}
              onClick={() => startPayment("approved")}
            >
              {t("demo.payment.forceApproved")}
            </button>

            <button
              type="button"
              className="ghost"
              disabled={status === "processing"}
              onClick={() => startPayment("pending")}
            >
              {t("demo.payment.forcePending")}
            </button>

            <button
              type="button"
              className="ghost"
              disabled={status === "processing"}
              onClick={() => startPayment("failed")}
            >
              {t("demo.payment.forceFailed")}
            </button>

            <button type="button" className="ghost" onClick={reset}>
              {status === "idle"
                ? t("demo.payment.reset")
                : t("demo.payment.retry")}
            </button>
          </div>
        </div>

        <aside className="card demo-summary">
          <p className="eyebrow">{t("demo.payment.timelineTitle")}</p>

          {timeline.length > 0 ? (
            <ol className="payment-timeline">
              {timeline.map((event) => (
                <li key={event.id}>{event.label}</li>
              ))}
            </ol>
          ) : (
            <p className="muted" style={{ marginBottom: 0 }}>
              {t("demo.payment.emptyTimeline")}
            </p>
          )}
        </aside>
      </section>
    </div>
  );
}
