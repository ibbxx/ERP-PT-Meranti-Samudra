import { Roles } from "@/types/rbac";
import type { Role } from "@/types/rbac";

export type StatusStep =
  | "SPK"
  | "PRE_ARRIVAL"
  | "ARRIVAL"
  | "OPS_COST"
  | "CLEARANCE_SPB"
  | "INVOICE";

export type ExternalPartyType = "SUB_AGENT" | "VENDOR" | "FREELANCE";

export type FundRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "PAID";

export type FundRequest = {
  id: string;
  requestNo: string;
  requester: string;
  amount: number;
  category: "OPERATIONAL" | "OFFICE" | "ENTERTAINMENT" | "OTHER";
  description: string;
  status: FundRequestStatus;
  bankDetails: string;
  createdAt: string;
  proofPaid: boolean;
};

export type ExternalParty = {
  id: string;
  name: string;
  type: ExternalPartyType;
  area: string;
  contact: string;
};

export type CallDocuments = {
  memorandum: boolean;
  spb: boolean;
  timesheet: boolean;
  nor: boolean;
  certificateCheck: boolean;
  onboardDocsCollected: boolean;
};

export type InaportnetStatus = "OK" | "ISSUE" | "MONITORING";

export type InaportnetMonitor = {
  monitored: boolean;
  status: InaportnetStatus;
  lastCheck: string;
};

export type CallNeeds = {
  freshwater: boolean;
  supplies: boolean;
  certificateExtension: boolean;
  notes: string;
};

export type CostCategory = "OPEX" | "COGS";

export type CostItem = {
  id: string;
  label: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  category: CostCategory;
  vendorId?: string;
  proofPaid: boolean;
};

export type InvoiceItem = {
  id: string;
  amount: number;
  status: "DRAFT" | "PENDING" | "PAID";
  issuedDate: string;
  dueDate: string;
  outstanding: boolean;
};

export type DailyReport = {
  id: string;
  sentAt: string;
  recipient: string;
  content: string;
};

export type CashAdvance = {
  requested: boolean;
  amount: number;
  proofPaid: boolean;
  requestedAt: string;
};

export type Call = {
  id: string;
  noCall: string;
  owner: string;
  vessel: string;
  eta: string;
  ata: string;
  statusStep: StatusStep;
  picOps: string;
  branch: string;
  inaportnet: InaportnetMonitor;
  documents: CallDocuments;
  needs: CallNeeds;
  dailyReports: DailyReport[];
  cashAdvance: CashAdvance;
  costs: CostItem[];
  invoices: InvoiceItem[];
  reconciliationDates: {
    midMonth: string;
    endMonth: string;
  };
};

export type LogisticsStatus =
  | "REQUESTED"
  | "VENDOR_COMPARE"
  | "NEGOTIATION"
  | "FUND_SUBMIT"
  | "PURCHASED"
  | "DELIVERING"
  | "DELIVERED"
  | "INVOICED";

export type VendorCompare = {
  vendorId: string;
  price: number;
  notes: string;
};

export type LogisticsRequest = {
  id: string;
  requestNo: string;
  requester: string;
  branch: string;
  item: string;
  quantity: string;
  baRequest: boolean;
  status: LogisticsStatus;
  vendorCompare: VendorCompare[];
  fundRequestAmount: number;
  deliveryEta: string;
  deliveryStatus: "PENDING" | "ON_ROUTE" | "DELIVERED";
  receiptConfirmed: boolean;
  invoiceId?: string;
  costItems: CostItem[];
};

export type ApprovalItem = {
  id: string;
  callId?: string;
  callNo?: string;
  logisticsId?: string;
  type: "COST" | "INVOICE" | "LOGISTICS";
  sourceId: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requester: string;
  createdAt: string;
  branch: string;
  targetRole: Role;
  category?: CostCategory;
};

export const approvalTargetForAmount = (amount: number): Role => {
  return amount > 5_000_000 ? Roles.DIRECTOR : Roles.GM;
};

export const externalParties: ExternalParty[] = [
  {
    id: "EXT-AG-01",
    name: "Sub Agen Borneo",
    type: "SUB_AGENT",
    area: "Banjarmasin",
    contact: "+62 812 0001 2233"
  },
  {
    id: "EXT-VN-01",
    name: "Vendor Nautika",
    type: "VENDOR",
    area: "Surabaya",
    contact: "+62 811 3399 1188"
  },
  {
    id: "EXT-FR-01",
    name: "Freelance Area Makassar",
    type: "FREELANCE",
    area: "Makassar",
    contact: "+62 821 5566 7788"
  }
];

export const calls: Call[] = [
  {
    id: "C-2401",
    noCall: "MPS-OPS-2401",
    owner: "R. Hanafi",
    vessel: "MV Meranti Prime",
    eta: "2026-02-05 08:00",
    ata: "2026-02-05 07:20",
    statusStep: "ARRIVAL",
    picOps: "N. Savitri",
    branch: "Surabaya",
    inaportnet: {
      monitored: true,
      status: "OK",
      lastCheck: "2026-02-04 18:00"
    },
    documents: {
      memorandum: true,
      spb: false,
      timesheet: true,
      nor: true,
      certificateCheck: true,
      onboardDocsCollected: false
    },
    needs: {
      freshwater: true,
      supplies: false,
      certificateExtension: false,
      notes: "Freshwater 20 ton sebelum sandar."
    },
    dailyReports: [
      {
        id: "DR-2401-01",
        sentAt: "2026-02-04 18:30",
        recipient: "Owner",
        content: "ETA on track, inaportnet clear."
      }
    ],
    cashAdvance: {
      requested: true,
      amount: 4500000,
      proofPaid: false,
      requestedAt: "2026-02-04 12:00"
    },
    costs: [
      {
        id: "CST-1001",
        label: "Port handling",
        amount: 5200000,
        status: "PENDING",
        category: "OPEX",
        vendorId: "EXT-VN-01",
        proofPaid: false
      },
      {
        id: "CST-1002",
        label: "Bunker adjustment",
        amount: 18000000,
        status: "PENDING",
        category: "COGS",
        vendorId: "EXT-VN-01",
        proofPaid: false
      }
    ],
    invoices: [
      {
        id: "INV-2101",
        amount: 98000000,
        status: "DRAFT",
        issuedDate: "2026-02-03",
        dueDate: "2026-03-03",
        outstanding: true
      }
    ],
    reconciliationDates: {
      midMonth: "2026-02-15",
      endMonth: "2026-02-28"
    }
  },
  {
    id: "C-2402",
    noCall: "MPS-OPS-2402",
    owner: "A. Rahman",
    vessel: "MV Sagara",
    eta: "2026-02-06 14:30",
    ata: "2026-02-06 15:05",
    statusStep: "OPS_COST",
    picOps: "T. Ayu",
    branch: "Makassar",
    inaportnet: {
      monitored: true,
      status: "MONITORING",
      lastCheck: "2026-02-05 20:15"
    },
    documents: {
      memorandum: true,
      spb: true,
      timesheet: false,
      nor: false,
      certificateCheck: true,
      onboardDocsCollected: true
    },
    needs: {
      freshwater: false,
      supplies: true,
      certificateExtension: true,
      notes: "Extension sertifikat pending vendor."
    },
    dailyReports: [],
    cashAdvance: {
      requested: true,
      amount: 6200000,
      proofPaid: false,
      requestedAt: "2026-02-05 10:00"
    },
    costs: [
      {
        id: "CST-1003",
        label: "Pilotage",
        amount: 24000000,
        status: "PENDING",
        category: "COGS",
        vendorId: "EXT-AG-01",
        proofPaid: false
      },
      {
        id: "CST-1004",
        label: "Tug assist",
        amount: 36000000,
        status: "PENDING",
        category: "COGS",
        vendorId: "EXT-AG-01",
        proofPaid: false
      }
    ],
    invoices: [
      {
        id: "INV-2102",
        amount: 135000000,
        status: "PENDING",
        issuedDate: "2026-02-06",
        dueDate: "2026-03-06",
        outstanding: true
      }
    ],
    reconciliationDates: {
      midMonth: "2026-02-15",
      endMonth: "2026-02-28"
    }
  },
  {
    id: "C-2403",
    noCall: "MPS-OPS-2403",
    owner: "K. Lingga",
    vessel: "MV Nusantara",
    eta: "2026-02-04 22:00",
    ata: "2026-02-05 00:10",
    statusStep: "CLEARANCE_SPB",
    picOps: "D. Fathur",
    branch: "Jakarta",
    inaportnet: {
      monitored: true,
      status: "OK",
      lastCheck: "2026-02-04 17:00"
    },
    documents: {
      memorandum: true,
      spb: true,
      timesheet: true,
      nor: true,
      certificateCheck: true,
      onboardDocsCollected: true
    },
    needs: {
      freshwater: false,
      supplies: false,
      certificateExtension: false,
      notes: "All needs satisfied."
    },
    dailyReports: [
      {
        id: "DR-2403-01",
        sentAt: "2026-02-05 08:10",
        recipient: "Owner",
        content: "SPB issued, clearance complete."
      }
    ],
    cashAdvance: {
      requested: false,
      amount: 0,
      proofPaid: true,
      requestedAt: ""
    },
    costs: [
      {
        id: "CST-1005",
        label: "Customs clearance",
        amount: 41000000,
        status: "APPROVED",
        category: "OPEX",
        vendorId: "EXT-VN-01",
        proofPaid: true
      }
    ],
    invoices: [
      {
        id: "INV-2103",
        amount: 162000000,
        status: "PENDING",
        issuedDate: "2026-02-05",
        dueDate: "2026-03-07",
        outstanding: true
      }
    ],
    reconciliationDates: {
      midMonth: "2026-02-15",
      endMonth: "2026-02-28"
    }
  },
  {
    id: "C-2404",
    noCall: "MPS-OPS-2404",
    owner: "L. Prakoso",
    vessel: "MV Meridian",
    eta: "2026-02-07 09:00",
    ata: "2026-02-07 08:45",
    statusStep: "PRE_ARRIVAL",
    picOps: "J. Wijaya",
    branch: "Belawan",
    inaportnet: {
      monitored: false,
      status: "ISSUE",
      lastCheck: "2026-02-06 12:00"
    },
    documents: {
      memorandum: false,
      spb: false,
      timesheet: false,
      nor: false,
      certificateCheck: false,
      onboardDocsCollected: false
    },
    needs: {
      freshwater: true,
      supplies: true,
      certificateExtension: true,
      notes: "Pending vendor compare."
    },
    dailyReports: [],
    cashAdvance: {
      requested: true,
      amount: 3200000,
      proofPaid: false,
      requestedAt: "2026-02-06 09:00"
    },
    costs: [
      {
        id: "CST-1006",
        label: "Berth reservation",
        amount: 15000000,
        status: "PENDING",
        category: "OPEX",
        vendorId: "EXT-AG-01",
        proofPaid: false
      }
    ],
    invoices: [],
    reconciliationDates: {
      midMonth: "2026-02-15",
      endMonth: "2026-02-28"
    }
  },
  {
    id: "C-2405",
    noCall: "MPS-OPS-2405",
    owner: "S. Widodo",
    vessel: "MV Oceanic",
    eta: "2026-02-08 05:30",
    ata: "2026-02-08 06:10",
    statusStep: "INVOICE",
    picOps: "F. Halim",
    branch: "Semarang",
    inaportnet: {
      monitored: true,
      status: "OK",
      lastCheck: "2026-02-07 18:00"
    },
    documents: {
      memorandum: true,
      spb: true,
      timesheet: true,
      nor: true,
      certificateCheck: true,
      onboardDocsCollected: true
    },
    needs: {
      freshwater: false,
      supplies: false,
      certificateExtension: false,
      notes: ""
    },
    dailyReports: [
      {
        id: "DR-2405-01",
        sentAt: "2026-02-08 09:00",
        recipient: "Owner",
        content: "Invoice issued, outstanding monitoring ongoing."
      }
    ],
    cashAdvance: {
      requested: false,
      amount: 0,
      proofPaid: true,
      requestedAt: ""
    },
    costs: [
      {
        id: "CST-1007",
        label: "Stevedoring",
        amount: 67000000,
        status: "APPROVED",
        category: "COGS",
        vendorId: "EXT-VN-01",
        proofPaid: true
      }
    ],
    invoices: [
      {
        id: "INV-2104",
        amount: 198000000,
        status: "DRAFT",
        issuedDate: "2026-02-08",
        dueDate: "2026-03-10",
        outstanding: true
      },
      {
        id: "INV-2105",
        amount: 42000000,
        status: "PENDING",
        issuedDate: "2026-02-08",
        dueDate: "2026-03-12",
        outstanding: true
      }
    ],
    reconciliationDates: {
      midMonth: "2026-02-15",
      endMonth: "2026-02-28"
    }
  },
  {
    id: "C-2406",
    noCall: "MPS-OPS-2406",
    owner: "N. Yolanda",
    vessel: "MV Mahkota",
    eta: "2026-02-09 13:00",
    ata: "2026-02-09 13:35",
    statusStep: "SPK",
    picOps: "R. Putra",
    branch: "Banjarmasin",
    inaportnet: {
      monitored: false,
      status: "MONITORING",
      lastCheck: "2026-02-08 14:00"
    },
    documents: {
      memorandum: true,
      spb: false,
      timesheet: false,
      nor: false,
      certificateCheck: false,
      onboardDocsCollected: false
    },
    needs: {
      freshwater: false,
      supplies: false,
      certificateExtension: true,
      notes: "Awaiting certificate extension vendor."
    },
    dailyReports: [],
    cashAdvance: {
      requested: true,
      amount: 5200000,
      proofPaid: false,
      requestedAt: "2026-02-08 11:30"
    },
    costs: [
      {
        id: "CST-1008",
        label: "Agency fee",
        amount: 12000000,
        status: "PENDING",
        category: "OPEX",
        vendorId: "EXT-AG-01",
        proofPaid: false
      }
    ],
    invoices: [
      {
        id: "INV-2106",
        amount: 88000000,
        status: "DRAFT",
        issuedDate: "2026-02-09",
        dueDate: "2026-03-15",
        outstanding: true
      }
    ],
    reconciliationDates: {
      midMonth: "2026-02-15",
      endMonth: "2026-02-28"
    }
  }
];

export const logisticsRequests: LogisticsRequest[] = [
  {
    id: "LOG-3001",
    requestNo: "LOG-REQ-3001",
    requester: "M. Aisyah",
    branch: "Surabaya",
    item: "Freshwater supplies",
    quantity: "20 ton",
    baRequest: true,
    status: "VENDOR_COMPARE",
    vendorCompare: [
      { vendorId: "EXT-VN-01", price: 4800000, notes: "Include delivery" },
      { vendorId: "EXT-AG-01", price: 5200000, notes: "24h notice" }
    ],
    fundRequestAmount: 5200000,
    deliveryEta: "2026-02-05 07:00",
    deliveryStatus: "ON_ROUTE",
    receiptConfirmed: false,
    invoiceId: "INV-LOG-01",
    costItems: [
      {
        id: "LCST-01",
        label: "Freshwater procurement",
        amount: 5200000,
        status: "PENDING",
        category: "OPEX",
        vendorId: "EXT-VN-01",
        proofPaid: false
      }
    ]
  }
];

export const approvals: ApprovalItem[] = calls.flatMap((call) => {
  const costApprovals = call.costs
    .filter((cost) => cost.status === "PENDING")
    .map((cost) => ({
      id: `APR-${call.id}-${cost.id}`,
      callId: call.id,
      callNo: call.noCall,
      type: "COST" as const,
      sourceId: cost.id,
      amount: cost.amount,
      status: "PENDING" as const,
      requester: call.owner,
      createdAt: `${call.eta.split(" ")[0]} 09:00`,
      branch: call.branch,
      targetRole: approvalTargetForAmount(cost.amount),
      category: cost.category
    }));

  const invoiceApprovals = call.invoices
    .filter((invoice) => invoice.status === "PENDING")
    .map((invoice) => ({
      id: `APR-${call.id}-${invoice.id}`,
      callId: call.id,
      callNo: call.noCall,
      type: "INVOICE" as const,
      sourceId: invoice.id,
      amount: invoice.amount,
      status: "PENDING" as const,
      requester: call.owner,
      createdAt: `${call.eta.split(" ")[0]} 13:30`,
      branch: call.branch,
      targetRole: Roles.GM
    }));

  return [...costApprovals, ...invoiceApprovals];
});

export const logisticsApprovals: ApprovalItem[] = logisticsRequests.flatMap(
  (request) => {
    return request.costItems
      .filter((cost) => cost.status === "PENDING")
      .map((cost) => ({
        id: `APR-${request.id}-${cost.id}`,
        logisticsId: request.id,
        type: "LOGISTICS" as const,
        sourceId: cost.id,
        amount: cost.amount,
        status: "PENDING" as const,
        requester: request.requester,
        createdAt: `${request.deliveryEta.split(" ")[0]} 10:00`,
        branch: request.branch,
        targetRole: approvalTargetForAmount(cost.amount),
        category: cost.category
      }));
  }
);
