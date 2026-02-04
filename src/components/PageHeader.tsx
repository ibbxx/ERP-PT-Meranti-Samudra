"use client";

import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
};

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-ink/60">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
    );
}
