"use client";

import { useMemo, useState } from "react";
import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
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

          <Table
            data={pendingInvoices}
            keyExtractor={(inv) => inv.id}
            columns={[
              {
                header: "Invoice No",
                accessor: (inv) => (
                  <div>
                    <div className="font-medium text-ink">{inv.id}</div>
                    <div className="text-xs text-ink/40">{inv.owner}</div>
                  </div>
                )
              },
              {
                header: "Call Ref",
                accessor: (inv) => (
                  <div>
                    <div className="text-ink/80">{inv.vessel}</div>
                    <div className="text-xs text-ink/40">{inv.callNo}</div>
                  </div>
                )
              },
              { header: "Amount", accessor: (inv) => <span className="font-medium text-ink">{formatCurrency(inv.amount)}</span> },
              { header: "Period", accessor: (inv) => <span className="text-xs text-ink/60">Due: {inv.dueDate}</span> },
              {
                header: "Status",
                accessor: (inv) => (
                  <Badge tone={inv.status === "PENDING" ? "warning" : "neutral"}>
                    {inv.status}
                  </Badge>
                )
              },
              {
                header: "Actions",
                accessor: (inv) => (
                  <div className="flex justify-end">
                    {canManage && (
                      <button
                        className="btn-secondary text-xs"
                        onClick={() => setModal({ open: true, invoice: inv })}
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                ),
                className: "text-right"
              }
            ]}
            emptyMessage="Great job! No outstanding invoices."
          />
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
