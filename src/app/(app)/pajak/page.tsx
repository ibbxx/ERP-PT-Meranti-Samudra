"use client";

import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import { Permissions } from "@/types/rbac";

export default function Page() {
  return (
    <AccessGate permission={Permissions.MENU_TAXES}>
      <PageShell
        title="Pajak"
        description="Tax reporting, bupot, and annual filings."
        chips={<Badge tone="info">RBAC Protected</Badge>}
      >
        <Card className="p-6">
          <div className="text-sm text-ink/60">
            This module is a placeholder for the pajak workflow.
          </div>
        </Card>
      </PageShell>
    </AccessGate>
  );
}
