import type { ReactNode } from "react";
import Card from "./Card";

export type PageShellProps = {
  title: string;
  description?: string;
  chips?: ReactNode;
  children?: ReactNode;
};

export default function PageShell({
  title,
  description,
  chips,
  children
}: PageShellProps) {
  return (
    <section className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/40">
              Module
            </p>
            <h1 className="font-display text-3xl text-ink">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-ink/60">{description}</p>
            )}
          </div>
          {chips && <div className="flex flex-wrap gap-3">{chips}</div>}
        </div>
      </Card>
      {children}
    </section>
  );
}
