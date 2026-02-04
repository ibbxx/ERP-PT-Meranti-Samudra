"use client";

import { useMemo, useState } from "react";
import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import Table from "@/components/Table";
import type { ApprovalItem } from "@/data/mock";
import { useApprovals } from "@/hooks/useApprovals";
import { usePermission } from "@/hooks/usePermission";
import { useSession } from "@/lib/useSession";
import { Permissions } from "@/types/rbac";

export default function ApprovalsPage() {
  const { approvals, updateApproval } = useApprovals();
  const { role, canApproveSmall, canApproveLarge } = usePermission();

  // Combine permission check
  const canApprove = canApproveSmall || canApproveLarge;

  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(null);

  const pendingApprovals = useMemo(
    () => approvals.filter((item) => item.status === "PENDING"),
    [approvals]
  );

  const historyApprovals = useMemo(
    () => approvals.filter((item) => item.status !== "PENDING"),
    [approvals]
  );

  const handleProcess = (status: "APPROVED" | "REJECTED") => {
    if (!selectedApproval) return;
    const updated = { ...selectedApproval, status };
    updateApproval(updated);
    setSelectedApproval(null);
  };

  return (
    <AccessGate permission={Permissions.MENU_APPROVALS}>
      <section>
        <PageHeader
          title="Approvals"
          subtitle="Manage cost and request approvals."
        />

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-ink mb-4">Pending Review</h2>
            <Table
              data={pendingApprovals}
              keyExtractor={(item) => item.id}
              columns={[
                { header: "Type", accessor: (a) => <Badge tone="neutral">{a.type}</Badge> },
                { header: "Ref", accessor: (a) => <span className="font-medium text-ink">{a.callNo}</span> },
                { header: "Amount", accessor: (a) => `Rp ${a.amount.toLocaleString("id-ID")}` },
                { header: "Requester", accessor: (a) => a.requester },
                { header: "Submitted", accessor: (a) => a.createdAt },
                {
                  header: "Action",
                  accessor: (a) => (
                    <button
                      className="btn-primary py-1 px-3 text-xs"
                      onClick={() => setSelectedApproval(a)}
                      disabled={!canApprove}
                    >
                      Review
                    </button>
                  )
                }
              ]}
              emptyMessage="No pending approvals found."
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink mb-4">Approval History</h2>
            <Table
              data={historyApprovals}
              keyExtractor={(item) => item.id}
              columns={[
                { header: "Type", accessor: (a) => <Badge tone="neutral">{a.type}</Badge> },
                { header: "Ref", accessor: (a) => a.callNo },
                { header: "Amount", accessor: (a) => `Rp ${a.amount.toLocaleString("id-ID")}` },
                { header: "Requester", accessor: (a) => a.requester },
                {
                  header: "Status", accessor: (a) => (
                    <Badge tone={a.status === "APPROVED" ? "success" : "danger"}>
                      {a.status}
                    </Badge>
                  )
                },
              ]}
              emptyMessage="No history yet."
            />
          </div>
        </div>

        {selectedApproval && (
          <Modal
            open={!!selectedApproval}
            onClose={() => setSelectedApproval(null)}
            title="Review Request"
          >
            <div className="space-y-4">
              <div className="rounded-lg bg-ink/5 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs uppercase text-ink/40">Type</div>
                    <div className="font-medium">{selectedApproval.type}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-ink/40">Amount</div>
                    <div className="font-medium">Rp {selectedApproval.amount.toLocaleString("id-ID")}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs uppercase text-ink/40">Requester</div>
                    <div className="font-medium">{selectedApproval.requester} ({selectedApproval.branch})</div>
                    <div className="text-xs text-ink/50">{selectedApproval.createdAt}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  className="btn-secondary flex-1 border-danger/20 text-danger hover:bg-danger/5"
                  onClick={() => handleProcess("REJECTED")}
                >
                  Reject
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={() => handleProcess("APPROVED")}
                >
                  Approve
                </button>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </AccessGate>
  );
}
