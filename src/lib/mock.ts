export const roles = ["GM", "Operations", "Finance", "CSR"] as const;
export type Role = (typeof roles)[number];

export const callStages = [
  "Lead Captured",
  "Qualified",
  "Quoted",
  "Negotiation",
  "Won"
] as const;

export type CallStatus =
  | "New"
  | "Qualified"
  | "Quoted"
  | "Negotiation"
  | "Won"
  | "Lost";

export type Call = {
  id: string;
  customer: string;
  lane: string;
  contact: string;
  value: number;
  status: CallStatus;
  lastUpdate: string;
  stage: number;
  nextStep: string;
  owner: string;
  margin: number;
};

export const calls: Call[] = [
  {
    id: "C-1187",
    customer: "PT Nusantara Agro",
    lane: "Surabaya → Manila",
    contact: "H. Satria",
    value: 870000000,
    status: "Negotiation",
    lastUpdate: "Feb 3, 2026",
    stage: 3,
    nextStep: "Confirm berth slot with carrier",
    owner: "R. Hanafi",
    margin: 18
  },
  {
    id: "C-1191",
    customer: "Meridian Cold Chain",
    lane: "Jakarta → Ho Chi Minh",
    contact: "L. Prakoso",
    value: 540000000,
    status: "Quoted",
    lastUpdate: "Feb 2, 2026",
    stage: 2,
    nextStep: "Send adjusted fuel surcharge",
    owner: "N. Savitri",
    margin: 22
  },
  {
    id: "C-1198",
    customer: "CV Lautan Timur",
    lane: "Belawan → Singapore",
    contact: "J. Wijaya",
    value: 320000000,
    status: "Qualified",
    lastUpdate: "Jan 31, 2026",
    stage: 1,
    nextStep: "Validate volume forecast",
    owner: "A. Rahman",
    margin: 15
  },
  {
    id: "C-1204",
    customer: "PT Sagara Mineral",
    lane: "Makassar → Qingdao",
    contact: "N. Yolanda",
    value: 1120000000,
    status: "Negotiation",
    lastUpdate: "Feb 1, 2026",
    stage: 3,
    nextStep: "Align SLA on demurrage",
    owner: "D. Fathur",
    margin: 19
  },
  {
    id: "C-1208",
    customer: "Oceanic Textiles",
    lane: "Semarang → Laem Chabang",
    contact: "S. Widodo",
    value: 260000000,
    status: "New",
    lastUpdate: "Feb 3, 2026",
    stage: 0,
    nextStep: "Schedule discovery call",
    owner: "T. Ayu",
    margin: 12
  },
  {
    id: "C-1212",
    customer: "PT Mahkota Energi",
    lane: "Jakarta → Busan",
    contact: "F. Halim",
    value: 980000000,
    status: "Won",
    lastUpdate: "Jan 29, 2026",
    stage: 4,
    nextStep: "Handover to ops for booking",
    owner: "K. Lingga",
    margin: 24
  }
];

export type ApprovalItem = {
  id: string;
  title: string;
  type: "Pricing" | "Credit" | "Vendor" | "Capex";
  requester: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
  submitted: string;
  notes: string;
};

export const approvals: ApprovalItem[] = [
  {
    id: "APR-2101",
    title: "Special rate for Nusantara Agro",
    type: "Pricing",
    requester: "R. Hanafi",
    amount: 76000000,
    status: "Pending",
    submitted: "Feb 2, 2026",
    notes: "Match competitor quote for Q2 lanes."
  },
  {
    id: "APR-2103",
    title: "Credit extension for Sagara Mineral",
    type: "Credit",
    requester: "D. Fathur",
    amount: 250000000,
    status: "Pending",
    submitted: "Feb 1, 2026",
    notes: "Extension to 45 days for new contract."
  },
  {
    id: "APR-2106",
    title: "Vendor onboarding: Astra Docking",
    type: "Vendor",
    requester: "N. Savitri",
    amount: 0,
    status: "Pending",
    submitted: "Jan 31, 2026",
    notes: "Needed for cold chain in Vietnam."
  },
  {
    id: "APR-2108",
    title: "Capex: Mobile reefer monitoring",
    type: "Capex",
    requester: "T. Ayu",
    amount: 420000000,
    status: "Pending",
    submitted: "Jan 30, 2026",
    notes: "Improve SLA reporting and exception alerts."
  }
];

export const dashboardStats = [
  {
    label: "Active Calls",
    value: "24",
    change: "+3 this week",
    accent: "ocean"
  },
  {
    label: "Pipeline Value",
    value: "Rp 6.4B",
    change: "+12% vs Jan",
    accent: "sun"
  },
  {
    label: "Win Rate",
    value: "38%",
    change: "Stable",
    accent: "pine"
  },
  {
    label: "On-time Delivery",
    value: "96%",
    change: "Above target",
    accent: "sky"
  }
];

export const dashboardActivities = [
  {
    time: "09:30",
    title: "GM review call with PT Nusantara Agro",
    detail: "Align pricing strategy and margin floor."
  },
  {
    time: "11:00",
    title: "Ops handover: PT Mahkota Energi",
    detail: "Confirm booking details & SLA."
  },
  {
    time: "14:15",
    title: "Finance approval window",
    detail: "Review 2 pending credit requests."
  },
  {
    time: "16:30",
    title: "Carrier alignment",
    detail: "Finalize slot allocation for Q2."
  }
];

export const callNotes = [
  {
    author: "N. Savitri",
    time: "Feb 2, 2026 · 15:12",
    note: "Customer asked for bundled reefer monitoring."
  },
  {
    author: "R. Hanafi",
    time: "Feb 3, 2026 · 10:45",
    note: "Shared revised pricing with GM review notes."
  }
];
