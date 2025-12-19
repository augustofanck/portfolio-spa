import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  closeLabel?: string;
};

export default function Modal({
  open,
  title,
  children,
  onClose,
  closeLabel = "Close",
}: Props) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="modal-card"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h2 className="modal-title">{title}</h2>
        <div className="muted">{children}</div>

        <div className="modal-actions">
          <button type="button" className="ghost" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
