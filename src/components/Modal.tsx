import type { ReactNode } from "react";
import Card from "./Card";

export type ModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
};

export default function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
  actions
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <Card variant="solid" className="w-full max-w-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {subtitle && (
              <p className="text-xs uppercase tracking-[0.2em] text-ink/40">
                {subtitle}
              </p>
            )}
            <h2 className="font-display text-2xl text-ink">{title}</h2>
          </div>
          <button className="btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-4 space-y-4">{children}</div>
        {actions && (
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            {actions}
          </div>
        )}
      </Card>
    </div>
  );
}
