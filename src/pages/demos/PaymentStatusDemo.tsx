import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Status = "approved" | "pending" | "failed";

export default function PaymentStatusDemo() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("pending");

  const copy = useMemo(() => {
    return {
      approved: {
        title: t("demo.payment.approvedTitle"),
        msg: t("demo.payment.approvedMsg"),
      },
      pending: {
        title: t("demo.payment.pendingTitle"),
        msg: t("demo.payment.pendingMsg"),
      },
      failed: {
        title: t("demo.payment.failedTitle"),
        msg: t("demo.payment.failedMsg"),
      },
    } satisfies Record<Status, { title: string; msg: string }>;
  }, [t]);

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>{t("demo.payment.title")}</h1>
      <p className="muted">{t("demo.payment.desc")}</p>

      <div className="row">
        <button
          type="button"
          onClick={() => setStatus("approved")}
          className="ghost"
        >
          {t("demo.payment.statusApproved")}
        </button>
        <button
          type="button"
          onClick={() => setStatus("pending")}
          className="ghost"
        >
          {t("demo.payment.statusPending")}
        </button>
        <button
          type="button"
          onClick={() => setStatus("failed")}
          className="ghost"
        >
          {t("demo.payment.statusFailed")}
        </button>
      </div>

      <hr />

      <h2 style={{ marginTop: 0 }}>{copy[status].title}</h2>
      <p className="muted">{copy[status].msg}</p>

      <div className="row" style={{ marginTop: 12 }}>
        <button type="button" className="primary">
          {t("demo.payment.primaryAction")}
        </button>
        <button type="button" className="ghost">
          {t("demo.payment.secondaryAction")}
        </button>
      </div>
    </div>
  );
}
