"use client";

import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import { Permissions } from "@/types/rbac";

export default function Page() {
  return (
    <AccessGate permission={Permissions.MENU_OPS_DASHBOARD}>
      <PageShell
        title="Ops Dashboard"
        description="Operational overview for arrivals, needs, and SPB issuance."
        chips={<Badge tone="info">RBAC Protected</Badge>}
      >
        <Card className="p-6">
          <div className="text-sm text-ink/60">
            This module is a placeholder for the ops dashboard workflow.
          </div>
        </Card>
      </PageShell>
    </AccessGate>
  );
}
