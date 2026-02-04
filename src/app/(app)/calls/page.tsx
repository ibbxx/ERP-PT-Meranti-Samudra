"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCalls } from "@/hooks/useCalls";
import PageHeader from "@/components/PageHeader";
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

export default function CallsPage() {
  const { calls } = useCalls();
  const [search, setSearch] = useState("");

  const filteredCalls = useMemo(() => calls.filter(
    (item) =>
      item.vessel.toLowerCase().includes(search.toLowerCase()) ||
      item.noCall.toLowerCase().includes(search.toLowerCase()) ||
      item.owner.toLowerCase().includes(search.toLowerCase())
  ), [calls, search]);

  return (
    <section>
      <PageHeader
        title="Calls Management"
        subtitle="Manage ongoing vessel operations and status."
        actions={
          <Link href="/calls/new" className="btn-primary flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            <span>New Call</span>
          </Link>
        }
      />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by vessel, owner, or call number..."
          className="input w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table
        data={filteredCalls}
        keyExtractor={(item) => item.id}
        columns={[
          {
            header: "Vessel",
            accessor: (c) => (
              <div>
                <div className="font-semibold text-ink">{c.vessel}</div>
                <div className="text-xs text-ink/50">{c.noCall}</div>
              </div>
            )
          },
          { header: "Owner", accessor: (c) => c.owner },
          { header: "Branch", accessor: (c) => c.branch },
          { header: "ETA", accessor: (c) => c.eta },
          { header: "PIC", accessor: (c) => c.picOps },
          {
            header: "Status",
            accessor: (c) => (
              <Badge tone={stepTone(c.statusStep)}>
                {c.statusStep.replace("_", " ")}
              </Badge>
            )
          },
          {
            header: "Action",
            accessor: (c) => (
              <Link href={`/calls/${c.id}`} className="text-sm font-medium text-ink/60 hover:text-ink underline decoration-ink/20">
                Details
              </Link>
            )
          }
        ]}
        emptyMessage="No calls found. Try adjusting your search."
      />
    </section>
  );
}
