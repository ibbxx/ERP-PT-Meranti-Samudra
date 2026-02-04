"use client";

import { useState } from "react";
import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import Modal from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import { useFundRequests } from "@/hooks/useFundRequests";
import { usePermission } from "@/hooks/usePermission";
import { Permissions, getRoleLabel } from "@/types/rbac";
import type { Role } from "@/types/rbac";
import type { FundRequest } from "@/data/mock";

type ModalState = {
  open: boolean;
  type: "CREATE" | "APPROVE";
  data?: FundRequest;
};

const defaultModal: ModalState = {
  open: false,
  type: "CREATE"
};

export default function Page() {
  const { requests, createRequest, updateRequest } = useFundRequests();
  const { can, role } = usePermission();
  const [modal, setModal] = useState<ModalState>(defaultModal);

  // Form State
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<FundRequest["category"]>("OPERATIONAL");
  const [bankDetails, setBankDetails] = useState("");

  const canCreate = can(Permissions.ACTION_FUND_REQUEST_CREATE);
  // Director can approve large, GM can approve smaller (logic reused from approvals)
  // For simplicity here, we'll just check if they are Director or GM for approval actions
  const canApprove = role === "DIRECTOR" || role === "GM";

  const handleCreate = () => {
    if (!amount || !description) return;

    const newRequest: FundRequest = {
      id: `FR-${Date.now()}`,
      requestNo: `FR-2026-${Math.floor(Math.random() * 1000)}`,
      requester: role ? getRoleLabel(role as Role) : "Unknown",
      amount: Number(amount),
      category,
      description,
      status: "PENDING",
      bankDetails: bankDetails || "N/A",
      createdAt: new Date().toLocaleString("id-ID"),
      proofPaid: false
    };

    createRequest(newRequest);
    closeModal();
    resetForm();
  };

  const handleApprove = () => {
    if (!modal.data) return;
    updateRequest({ ...modal.data, status: "APPROVED" });
    closeModal();
  };

  const handlePaid = (item: FundRequest) => {
    updateRequest({ ...item, status: "PAID", proofPaid: true });
  };

  const closeModal = () => setModal(defaultModal);

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setCategory("OPERATIONAL");
    setBankDetails("");
  };

  return (
    <AccessGate permission={Permissions.MENU_FUND_REQUEST}>
      <PageShell
        title="Fund Request"
        description="Submit and monitor fund requests for operations."
        chips={
          <div className="flex gap-2">
            <Badge tone="info">Finance Module</Badge>
            <Badge tone="neutral">Total: {requests.length}</Badge>
          </div>
        }
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-ink">Recent Requests</h2>
            {canCreate && (
              <button
                className="btn-primary"
                onClick={() => setModal({ open: true, type: "CREATE" })}
              >
                New Request
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-ink/40 border-b border-ink/10">
                <tr>
                  <th className="px-4 py-3 text-left">No Request</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {requests.map((item) => (
                  <tr key={item.id} className="hover:bg-ink/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-ink">{item.requestNo}</td>
                    <td className="px-4 py-3 text-ink/80">
                      <div>{item.description}</div>
                      <div className="text-xs text-ink/40">{item.createdAt} by {item.requester}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone="neutral">{item.category}</Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-ink">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={
                        item.status === "APPROVED" ? "success" :
                          item.status === "PAID" ? "success" :
                            item.status === "REJECTED" ? "danger" : "warning"
                      }>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.status === "PENDING" && canApprove && (
                        <button
                          className="text-xs text-primary hover:underline font-semibold"
                          onClick={() => setModal({ open: true, type: "APPROVE", data: item })}
                        >
                          Review
                        </button>
                      )}
                      {item.status === "APPROVED" && role === "FINANCE" && (
                        <button
                          className="text-xs text-success hover:underline font-semibold"
                          onClick={() => handlePaid(item)}
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-ink/50">
                      No fund requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Create Modal */}
        <Modal
          open={modal.open && modal.type === "CREATE"}
          title="New Fund Request"
          onClose={closeModal}
          actions={
            <>
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleCreate}>Submit Request</button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-ink/40">Amount</label>
              <input
                type="number"
                className="input w-full mt-1"
                placeholder="e.g. 5000000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-ink/40">Category</label>
              <select
                className="input w-full mt-1"
                value={category}
                onChange={(e) => setCategory(e.target.value as FundRequest["category"])}
              >
                <option value="OPERATIONAL">Operational</option>
                <option value="OFFICE">Office</option>
                <option value="ENTERTAINMENT">Entertainment</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-ink/40">Description</label>
              <textarea
                className="input w-full mt-1 h-20"
                placeholder="Describe the purpose..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-ink/40">Bank Details</label>
              <input
                className="input w-full mt-1"
                placeholder="Bank Name & Account No"
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
              />
            </div>
          </div>
        </Modal>

        {/* Approve Modal */}
        <Modal
          open={modal.open && modal.type === "APPROVE"}
          title={`Approve ${modal.data?.requestNo}`}
          onClose={closeModal}
          actions={
            <>
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleApprove}>Confirm Approval</button>
            </>
          }
        >
          <p className="text-ink/80">
            Are you sure you want to approve this request for <strong>{modal.data && formatCurrency(modal.data.amount)}</strong>?
          </p>
          <div className="mt-4 bg-ink/5 p-3 rounded-lg text-sm text-ink/60">
            &quot;{modal.data?.description}&quot;
          </div>
        </Modal>

      </PageShell>
    </AccessGate>
  );
}
