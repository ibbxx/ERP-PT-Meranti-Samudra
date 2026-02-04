"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AccessGate from "@/components/AccessGate";
import Badge from "@/components/Badge";
import type { BadgeTone } from "@/components/Badge";
import Card from "@/components/Card";
import Tabs from "@/components/Tabs";
import PageHeader from "@/components/PageHeader";
import Table from "@/components/Table";
import type {
  ApprovalItem,
  Call,
  CostCategory,
  CostItem,
  StatusStep
} from "@/data/mock";
import { approvalTargetForAmount } from "@/data/mock";
import { useCalls } from "@/hooks/useCalls";
import { useApprovals } from "@/hooks/useApprovals";
import { usePermission } from "@/hooks/usePermission";
import { Permissions } from "@/types/rbac";

const steps: StatusStep[] = [
  "SPK",
  "PRE_ARRIVAL",
  "ARRIVAL",
  "OPS_COST",
  "CLEARANCE_SPB",
  "INVOICE"
];

const tabs = ["Overview", "Timeline", "Documents", "Costs", "Daily Report"] as const;
type Tab = (typeof tabs)[number];

type Params = {
  params: {
    id: string;
  };
};

type TimelineItem = {
  time: string;
  author: string;
  note: string;
  step: StatusStep;
};

const formatStepLabel = (step: StatusStep) => step.replace("_", " ");

const stepTone = (step: StatusStep): BadgeTone => {
  switch (step) {
    case "INVOICE": return "success";
    case "CLEARANCE_SPB": return "info";
    case "OPS_COST": return "info";
    case "ARRIVAL": return "warning";
    case "PRE_ARRIVAL": return "danger";
    default: return "neutral";
  }
};

export default function CallDetailPage({ params }: Params) {
  const [call, setCall] = useState<Call | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const { calls, updateCall } = useCalls();
  const { addApproval } = useApprovals();
  const {
    canUpdateCallStatus: canUpdateStep,
    canUploadDocs: canUpdateDocuments,
    canAddCost: canSubmitCost,
    canWriteReport: canSendReport
  } = usePermission();

  const [selectedStep, setSelectedStep] = useState<StatusStep>("SPK");
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [costLabel, setCostLabel] = useState("");
  const [costAmount, setCostAmount] = useState("");
  const [costCategory, setCostCategory] = useState<CostCategory>("OPEX");
  const [costVendorId, setCostVendorId] = useState<string | undefined>(undefined);
  const [dailyReport, setDailyReport] = useState("");
  const [lastReportSent, setLastReportSent] = useState<string | null>(null);

  useEffect(() => {
    const found = calls.find((item) => item.id === params.id) ?? null;
    if (!found) return;
    setCall(found);

    if (timeline.length === 0) {
      setSelectedStep(found.statusStep);
      setTimeline([
        {
          time: "Feb 3, 2026 · 10:15",
          author: found.picOps,
          note: "Status updated after vessel arrival.",
          step: found.statusStep
        },
        {
          time: "Feb 2, 2026 · 16:40",
          author: found.owner,
          note: "Documents prepared for clearance.",
          step: "PRE_ARRIVAL"
        }
      ]);
      setDailyReport("Ops standby di dermaga. ETA sesuai jadwal.");
      setLastReportSent("Feb 3, 2026 · 17:20");
    }
  }, [calls, params.id, timeline.length]);

  const persistCall = (updated: Call) => {
    setCall(updated);
    updateCall(updated);
  };

  const handleStatusUpdate = () => {
    if (!call || !canUpdateStep) return;
    const updated = { ...call, statusStep: selectedStep };
    persistCall(updated);
    setTimeline((prev) => [
      {
        time: new Date().toLocaleString("id-ID"),
        author: call.picOps,
        note: `Status updated to ${formatStepLabel(selectedStep)}.`,
        step: selectedStep
      },
      ...prev
    ]);
  };

  const handleToggleDocument = (key: keyof Call["documents"]) => {
    if (!call || !canUpdateDocuments) return;
    const updated = {
      ...call,
      documents: { ...call.documents, [key]: !(call.documents?.[key] ?? false) }
    };
    persistCall(updated);
  };

  const handleAddCost = () => {
    if (!call || !canSubmitCost) return;
    const trimmed = costLabel.trim();
    const parsedAmount = Number(costAmount);
    if (!trimmed || Number.isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newCost: CostItem = {
      id: `CST-${Date.now()}`,
      label: trimmed,
      amount: parsedAmount,
      status: "PENDING",
      category: costCategory,
      vendorId: costVendorId,
      proofPaid: false
    };

    const updated = { ...call, costs: [newCost, ...(call.costs ?? [])] };
    persistCall(updated);

    const newApproval: ApprovalItem = {
      id: `APR-${call.id}-${newCost.id}`,
      callId: call.id,
      callNo: call.noCall,
      type: "COST",
      sourceId: newCost.id,
      amount: newCost.amount,
      status: "PENDING",
      requester: call.owner,
      createdAt: new Date().toLocaleString("id-ID"),
      branch: call.branch,
      targetRole: approvalTargetForAmount(newCost.amount),
      category: newCost.category
    };
    addApproval(newApproval);
    setCostLabel("");
    setCostAmount("");
    setCostVendorId(undefined);
  };

  const handleSaveReport = () => {
    if (!call || !canSendReport || !dailyReport.trim()) return;
    const sentAt = new Date().toLocaleString("id-ID");
    const updated = {
      ...call,
      dailyReports: [
        {
          id: `DR-${call.id}-${Date.now()}`,
          sentAt,
          recipient: "Owner/Internal",
          content: dailyReport.trim()
        },
        ...(call.dailyReports ?? [])
      ]
    };
    persistCall(updated);
    setLastReportSent(sentAt);
  };

  if (!call) return null;

  return (
    <AccessGate permission={Permissions.MENU_CALLS}>
      <section>
        <PageHeader
          title={`${call.vessel}`}
          subtitle={`Call No: ${call.noCall} · ${call.owner}`}
          actions={
            <div className="flex items-center gap-3">
              <Badge tone={stepTone(call.statusStep)}>{call.statusStep.replace("_", " ")}</Badge>
              <Link href="/calls" className="btn-secondary">Back</Link>
            </div>
          }
        />

        {/* Stepper */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex min-w-[600px] items-center justify-between border-b border-ink/10 pb-4">
            {steps.map((step, i) => {
              const active = step === call.statusStep;
              const passed = steps.indexOf(call.statusStep) > i;
              return (
                <div key={step} className={`flex flex-col items-center gap-2 ${active ? "opacity-100" : passed ? "opacity-60" : "opacity-30"}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${active ? "border-ink bg-ink text-white" : "border-ink text-ink"}`}>
                    {i + 1}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider">{formatStepLabel(step)}</div>
                </div>
              )
            })}
          </div>
        </div>

        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === "Overview" && (
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-6">
                <div className="font-bold text-ink mb-4">Voyage Details</div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-ink/5 pb-2">
                    <span className="text-ink/60">ETA</span>
                    <span className="font-medium text-ink">{call.eta}</span>
                  </div>
                  <div className="flex justify-between border-b border-ink/5 pb-2">
                    <span className="text-ink/60">Branch</span>
                    <span className="font-medium text-ink">{call.branch}</span>
                  </div>
                  <div className="flex justify-between border-b border-ink/5 pb-2">
                    <span className="text-ink/60">PIC Ops</span>
                    <span className="font-medium text-ink">{call.picOps}</span>
                  </div>
                  <div className="flex justify-between border-b border-ink/5 pb-2">
                    <span className="text-ink/60">Inaportnet</span>
                    <Badge tone={call.inaportnet?.status === "OK" ? "success" : "warning"}>
                      {call.inaportnet?.status ?? "Unknown"}
                    </Badge>
                  </div>
                </div>
              </Card>

              {canUpdateStep && (
                <Card className="p-6">
                  <div className="font-bold text-ink mb-4">Update Status</div>
                  <div className="flex flex-col gap-4">
                    <select
                      className="input"
                      value={selectedStep}
                      onChange={(e) => setSelectedStep(e.target.value as StatusStep)}
                    >
                      {steps.map(s => <option key={s} value={s}>{formatStepLabel(s)}</option>)}
                    </select>
                    <button className="btn-primary w-full" onClick={handleStatusUpdate}>
                      Update Status
                    </button>
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === "Documents" && (
            <Table
              data={[
                { key: "memorandum", label: "Memorandum" },
                { key: "spb", label: "SPB" },
                { key: "timesheet", label: "Time Sheet" },
                { key: "nor", label: "NOR" },
                { key: "certificateCheck", label: "Sertifikat" },
                { key: "onboardDocsCollected", label: "Dokumen Onboard" }
              ]}
              keyExtractor={(i) => i.key}
              columns={[
                { header: "Document Name", accessor: (i) => i.label },
                {
                  header: "Status", accessor: (i) => (
                    <Badge tone={call.documents?.[i.key as keyof typeof call.documents] ? "success" : "neutral"}>
                      {call.documents?.[i.key as keyof typeof call.documents] ? "Uploaded" : "Pending"}
                    </Badge>
                  )
                },
                {
                  header: "Action", accessor: (i) => (
                    <button
                      className="text-sm font-medium text-ink underline disabled:opacity-50"
                      onClick={() => handleToggleDocument(i.key as keyof Call["documents"])}
                      disabled={!canUpdateDocuments}
                    >
                      {call.documents?.[i.key as keyof typeof call.documents] ? "Replace" : "Upload"}
                    </button>
                  )
                }
              ]}
            />
          )}

          {activeTab === "Costs" && (
            <div className="space-y-6">
              {canSubmitCost && (
                <Card className="p-6">
                  <div className="font-bold text-ink mb-4">Add Cost Item</div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <input className="input" placeholder="Item Name" value={costLabel} onChange={(e) => setCostLabel(e.target.value)} />
                    <input className="input" placeholder="Amount" value={costAmount} onChange={(e) => setCostAmount(e.target.value)} />
                    <select className="input" value={costCategory} onChange={(e) => setCostCategory(e.target.value as CostCategory)}>
                      <option value="OPEX">OPEX</option>
                      <option value="COGS">COGS</option>
                    </select>
                    <button className="btn-primary" onClick={handleAddCost}>Add</button>
                  </div>
                </Card>
              )}
              <Table
                data={call.costs ?? []}
                keyExtractor={(c) => c.id}
                columns={[
                  { header: "Item", accessor: (c) => c.label },
                  { header: "Category", accessor: (c) => c.category },
                  { header: "Amount", accessor: (c) => `Rp ${c.amount.toLocaleString("id-ID")}` },
                  { header: "Status", accessor: (c) => <Badge tone={c.status === "APPROVED" ? "success" : c.status === "PENDING" ? "warning" : "danger"}>{c.status}</Badge> }
                ]}
                emptyMessage="No costs recorded."
              />
            </div>
          )}

          {activeTab === "Daily Report" && (
            <div className="space-y-6">
              {canSendReport && (
                <Card className="p-6">
                  <div className="font-bold text-ink mb-4">Send Report</div>
                  <textarea className="input h-24 w-full" value={dailyReport} onChange={(e) => setDailyReport(e.target.value)} />
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-ink/50">Last sent: {lastReportSent ?? "Never"}</span>
                    <button className="btn-primary" onClick={handleSaveReport}>Send Update</button>
                  </div>
                </Card>
              )}
              <div className="space-y-4">
                {call.dailyReports?.map((dr) => (
                  <div key={dr.id} className="border-l-2 border-ink pl-4 py-2">
                    <div className="text-xs font-bold text-ink/50 uppercase tracking-widest">{dr.sentAt}</div>
                    <div className="mt-1 text-sm text-ink">{dr.content}</div>
                  </div>
                )) ?? <div className="text-ink/40 italic">No reports yet.</div>}
              </div>
            </div>
          )}

          {activeTab === "Timeline" && (
            <div className="max-w-xl space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-8 border-l border-ink/10 pb-8 last:pb-0">
                  <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-ink" />
                  <div className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-1">{item.time}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-ink">{item.author}</span>
                    <Badge tone={stepTone(item.step)}>{formatStepLabel(item.step)}</Badge>
                  </div>
                  <div className="text-sm text-ink/80">{item.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </AccessGate>
  );
}
