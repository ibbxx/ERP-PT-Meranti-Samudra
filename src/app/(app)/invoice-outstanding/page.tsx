"use client";

import { useMemo, useState } from "react";
import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import Modal from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import { useInvoices } from "@/hooks/useInvoices";
import type { EnrichedInvoice } from "@/hooks/useInvoices";
import { usePermission } from "@/hooks/usePermission";
import { Permissions } from "@/types/rbac";

export default function Page() {
  const { invoices, updateInvoiceStatus } = useInvoices();
  const { can } = usePermission();

  const [modal, setModal] = useState<{ open: boolean; invoice: EnrichedInvoice | null }>({
    open: false,
    invoice: null
  });

  const canManage = can(Permissions.ACTION_OUTSTANDING_UPDATE);

  const pendingInvoices = useMemo(
    () => invoices.filter((inv) => inv.status !== "PAID" && inv.outstanding),
    [invoices]
  );

  const handleMarkPaid = () => {
    if (!modal.invoice) return;
    updateInvoiceStatus(modal.invoice.callId, modal.invoice.id, "PAID", false);
    setModal({ open: false, invoice: null });
  };

  return (
    <AccessGate permission={Permissions.MENU_OUTSTANDING}>
      <PageShell
        title="Outstanding Invoices"
        description="Monitor unpaid invoices and outstanding payments."
        chips={
          <div className="flex gap-2">
            <Badge tone="danger">Outstanding: {pendingInvoices.length}</Badge>
            <Badge tone="neutral">Total Value: {formatCurrency(pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0))}</Badge>
          </div>
        }
      >
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink mb-6">Receivables Queue</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-ink/40 border-b border-ink/10">
                <tr>
                  <th className="px-4 py-3 text-left">Invoice No</th>
                  <th className="px-4 py-3 text-left">Call Ref</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Period</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {pendingInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-ink/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-ink">
                      {inv.id}
                      <div className="text-xs text-ink/40">{inv.owner}</div>
                    </td>
                    <td className="px-4 py-3 text-ink/80">
                      <div>{inv.vessel}</div>
                      <div className="text-xs text-ink/40">{inv.callNo}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-ink">
                      {formatCurrency(inv.amount)}
                    </td>
                    <td className="px-4 py-3 text-xs text-ink/60">
                      Due: {inv.dueDate}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={inv.status === "PENDING" ? "warning" : "neutral"}>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {canManage && (
                        <button
                          className="btn-secondary text-xs"
                          onClick={() => setModal({ open: true, invoice: inv })}
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {pendingInvoices.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-ink/50 bg-success/5 rounded-lg">
                      Great job! No outstanding invoices.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Payment Confirmation Modal */}
        <Modal
          open={modal.open && modal.invoice !== null}
          title="Confirm Payment"
          onClose={() => setModal({ open: false, invoice: null })}
          actions={
            <>
              <button className="btn-secondary" onClick={() => setModal({ open: false, invoice: null })}>Cancel</button>
              <button className="btn-primary" onClick={handleMarkPaid}>Confirm Paid</button>
            </>
          }
        >
          <p className="text-ink/80">
            Mark invoice <strong>{modal.invoice?.id}</strong> from <strong>{modal.invoice?.owner}</strong> as PAID?
          </p>
          <p className="text-sm text-ink/60 mt-2">
            This will remove it from the outstanding list and update the Call status.
          </p>
        </Modal>

      </PageShell>
    </AccessGate>
  );
}
