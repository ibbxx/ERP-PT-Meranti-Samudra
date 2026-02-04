"use client";

import { useMemo, useState } from "react";
import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import Modal from "@/components/Modal";
import type { LogisticsRequest, LogisticsStatus } from "@/data/mock";
import { externalParties } from "@/data/mock";
import Table from "@/components/Table";
import { useLogistics } from "@/hooks/useLogistics";
import { usePermission } from "@/hooks/usePermission";
import { Permissions, getRoleLabel } from "@/types/rbac";
import type { Role } from "@/types/rbac";

type ModalState = {
  open: boolean;
  type: "CREATE" | "UPDATE";
  data?: LogisticsRequest;
};

const defaultModal: ModalState = {
  open: false,
  type: "CREATE"
};

const statuses: LogisticsStatus[] = [
  "REQUESTED",
  "VENDOR_COMPARE",
  "NEGOTIATION",
  "FUND_SUBMIT",
  "PURCHASED",
  "DELIVERING",
  "DELIVERED",
  "INVOICED"
];

export default function Page() {
  const { logistics, createLogisticsRequest, updateLogistics } = useLogistics();
  const { role, can } = usePermission();
  const [modal, setModal] = useState<ModalState>(defaultModal);

  // Form State
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [branch, setBranch] = useState("Surabaya");
  const [selectedStatus, setSelectedStatus] = useState<LogisticsStatus>("REQUESTED");

  const vendorMap = useMemo(() => new Map(
    externalParties.map((party) => [party.id, party.name])
  ), []);

  const canManage = can(Permissions.ACTION_LOGISTICS_MANAGE);
  const canRequest = can(Permissions.ACTION_REQUEST_CREATE);

  const handleCreate = () => {
    if (!item || !quantity) return;

    const newRequest: LogisticsRequest = {
      id: `LOG-${Date.now()}`,
      requestNo: `REQ-${Math.floor(Math.random() * 10000)}`,
      requester: role ? getRoleLabel(role as Role) : "Unknown",
      branch,
      item,
      quantity,
      baRequest: false,
      status: "REQUESTED",
      vendorCompare: [],
      fundRequestAmount: 0,
      deliveryEta: "-",
      deliveryStatus: "PENDING",
      receiptConfirmed: false,
      costItems: []
    };

    createLogisticsRequest(newRequest);
    closeModal();
    resetForm();
  };

  const handleUpdate = () => {
    if (!modal.data) return;
    updateLogistics({ ...modal.data, status: selectedStatus });
    closeModal();
  };

  const closeModal = () => setModal(defaultModal);

  const resetForm = () => {
    setItem("");
    setQuantity("");
    setBranch("Surabaya");
  };

  const openCreateModal = () => {
    resetForm();
    setModal({ open: true, type: "CREATE" });
  };

  const openUpdateModal = (req: LogisticsRequest) => {
    setSelectedStatus(req.status);
    setModal({ open: true, type: "UPDATE", data: req });
  };

  return (
    <AccessGate permission={Permissions.MENU_LOGISTICS}>
      <PageShell
        title="Logistics"
        description="Procurement and delivery monitoring for logistics requests."
        chips={
          <div className="flex gap-2">
            <Badge tone="info">RBAC Protected</Badge>
            <Badge tone="neutral">Total: {logistics.length}</Badge>
          </div>
        }
      >
        <Card className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-bold text-ink">Request Queue</h2>

            {/* Allow creation if they have permission, OR if they are simply not restricted (depending on strictness) */}
            {/* For now, using canRequest which is mapped to proper roles */}
            {canRequest && (
              <button className="btn-primary" onClick={openCreateModal}>
                New Request
              </button>
            )}
          </div>

          <Table
            data={logistics}
            keyExtractor={(req) => req.id}
            columns={[
              {
                header: "Request",
                accessor: (req) => (
                  <div>
                    <div className="font-semibold text-ink">{req.requestNo}</div>
                    <div className="text-xs text-ink/50">{req.branch}</div>
                  </div>
                )
              },
              {
                header: "Item",
                accessor: (req) => (
                  <div>
                    {req.item}
                    <div className="text-xs text-ink/50">{req.quantity}</div>
                  </div>
                )
              },
              {
                header: "Status",
                accessor: (req) => (
                  <Badge tone={req.status === "DELIVERED" ? "success" : "warning"}>
                    {req.status.replace("_", " ")}
                  </Badge>
                )
              },
              {
                header: "Vendor Compare",
                accessor: (req) => (
                  <div className="text-xs text-ink/60">
                    {req.vendorCompare.length > 0 ? req.vendorCompare.map((vendor) => (
                      <div key={vendor.vendorId}>
                        {vendorMap.get(vendor.vendorId)} · Rp {vendor.price.toLocaleString("id-ID")}
                      </div>
                    )) : "No vendors yet"}
                  </div>
                )
              },
              {
                header: "Delivery",
                accessor: (req) => (
                  <div className="text-xs text-ink/60">
                    {req.deliveryStatus}
                    {req.deliveryEta !== "-" && ` · ETA ${req.deliveryEta}`}
                  </div>
                )
              },
              {
                header: "Actions",
                accessor: (req) => (
                  <div className="flex justify-end">
                    <button
                      className="btn-secondary text-xs"
                      onClick={() => openUpdateModal(req)}
                      disabled={!canManage}
                      title={!canManage ? "No permission" : undefined}
                    >
                      Update
                    </button>
                  </div>
                ),
                className: "text-right"
              }
            ]}
            emptyMessage="No logistics requests yet."
          />
        </Card>

        {/* Create Modal */}
        <Modal
          open={modal.open && modal.type === "CREATE"}
          title="New Logistics Request"
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
              <label className="text-xs font-bold uppercase text-ink/40">Item Need</label>
              <input
                className="input w-full mt-1"
                placeholder="e.g. Sparepart Mesin"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-ink/40">Quantity</label>
              <input
                className="input w-full mt-1"
                placeholder="e.g. 2 Units"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-ink/40">Branch / Port</label>
              <select
                className="input w-full mt-1"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="Surabaya">Surabaya</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Banjarmasin">Banjarmasin</option>
                <option value="Makassar">Makassar</option>
                <option value="Belawan">Belawan</option>
                <option value="Semarang">Semarang</option>
              </select>
            </div>
          </div>
        </Modal>

        {/* Update Modal */}
        <Modal
          open={modal.open && modal.type === "UPDATE"}
          title={`Update ${modal.data?.requestNo}`}
          onClose={closeModal}
          actions={
            <>
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleUpdate}>Save Changes</button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-ink/40">Status</label>
              <select
                className="input w-full mt-1"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as LogisticsStatus)}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s.replace("_", " ")}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-ink/50">
              Vendor comparison and delivery details are managed in detailed view (Not implemented in this prototype).
            </p>
          </div>
        </Modal>

      </PageShell>
    </AccessGate>
  );
}
