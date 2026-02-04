"use client";

import { useMemo } from "react";
import { useCalls } from "@/hooks/useCalls";
import { useApprovals } from "@/hooks/useApprovals";
import { useSession } from "@/lib/useSession";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Table from "@/components/Table";
import Badge from "@/components/Badge";
import type { StatusStep } from "@/data/mock";

const stepTone = (step: StatusStep) => {
  switch (step) {
    case "INVOICE": return "success";
    case "CLEARANCE_SPB": return "info";
    case "OPS_COST": return "info";
    case "ARRIVAL": return "warning";
    case "PRE_ARRIVAL": return "danger";
    default: return "neutral";
  }
};
import { Roles } from "@/types/rbac";

export default function DashboardPage() {
  const { role } = useSession();
  const { calls } = useCalls();
  const { approvals } = useApprovals();

  // Role-based data filtering
  const activeCalls = useMemo(() => calls.filter(c => c.statusStep !== "INVOICE"), [calls]);
  const pendingApprovals = useMemo(() => approvals.filter(a => a.status === "PENDING"), [approvals]);

  // View selection
  const isFinance = role === Roles.FINANCE;
  const isOps = role === Roles.OPERATION_HEAD || role === Roles.PIC_OPS || role === Roles.ADMIN_OPS;

  return (
    <section>
      <PageHeader
        title={`Dashboard`}
        subtitle={`Overview for ${role}`}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="p-6">
          <div className="text-sm font-medium text-ink/60">Active Calls</div>
          <div className="mt-2 text-3xl font-bold text-ink">{activeCalls.length}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-ink/60">Pending Approvals</div>
          <div className="mt-2 text-3xl font-bold text-ink">{pendingApprovals.length}</div>
          {pendingApprovals.length > 0 && <div className="mt-1 text-xs text-amber-600">Action required</div>}
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-ink/60">Total Fleet</div>
          <div className="mt-2 text-3xl font-bold text-ink">{calls.length}</div>
        </Card>
      </div>

      {/* Main Table Area */}
      <h2 className="mb-4 text-lg font-bold text-ink">
        {isFinance ? "Outstanding Payments" : "Active Operations"}
      </h2>

      {isFinance ? (
        <div className="rounded-xl border border-ink/5 bg-white p-8 text-center text-ink/40">
          {/* Placeholder for Finance Table - using calls for now to demonstrate layout */}
          <p>Finance Module: Invoice summary would appear here.</p>
        </div>
      ) : (
        <Table
          data={activeCalls.slice(0, 5)}
          keyExtractor={(item) => item.id}
          columns={[
            { header: "Vessel", accessor: (c) => <span className="font-semibold text-ink">{c.vessel}</span> },
            { header: "Call No", accessor: (c) => c.noCall },
            { header: "ETA", accessor: (c) => c.eta },
            {
              header: "Status", accessor: (c) => (
                <Badge tone={stepTone(c.statusStep)}>{c.statusStep.replace("_", " ")}</Badge>
              )
            },
            { header: "PIC", accessor: (c) => c.picOps },
          ]}
        />
      )}

      {/* Secondary Section for Director/GM */}
      {(!isFinance && !isOps) && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-ink">Pending Approvals</h2>
          <Table
            data={pendingApprovals.slice(0, 5)}
            keyExtractor={(item) => item.id}
            columns={[
              { header: "Type", accessor: (a) => <Badge tone="neutral">{a.type}</Badge> },
              { header: "Reference", accessor: (a) => <span className="font-medium">{a.callNo}</span> },
              { header: "Amount", accessor: (a) => `Rp ${a.amount.toLocaleString("id-ID")}` },
              { header: "Requester", accessor: (a) => a.requester },
            ]}
            emptyMessage="No pending approvals."
          />
        </div>
      )}
    </section>
  );
}
