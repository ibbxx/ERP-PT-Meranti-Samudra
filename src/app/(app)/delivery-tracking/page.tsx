"use client";

import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import { Permissions } from "@/types/rbac";

export default function Page() {
  return (
    <AccessGate permission={Permissions.MENU_DELIVERY_TRACKING}>
      <PageShell
        title="Delivery Tracking"
        description="Track delivery status from vendor to vessel."
        chips={<Badge tone="info">RBAC Protected</Badge>}
      >
        <Card className="p-6">
          <div className="text-sm text-ink/60">
            This module is a placeholder for the delivery tracking workflow.
          </div>
        </Card>
      </PageShell>
    </AccessGate>
  );
}
