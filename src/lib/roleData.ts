import {
    SparklesIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    TruckIcon,
    BanknotesIcon,
    DocumentTextIcon,
    WrenchScrewdriverIcon,
    CalculatorIcon,
    ArchiveBoxIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";
import type { Role } from "@/types/rbac";

export type RoleDefinition = {
    id: Role;
    label: string;
    description: string;
    responsibilities: string[];
    connections: string[]; // How this role connects to others
    landingPage: string;
    icon: any;
    color: string;
};

export const roleData: RoleDefinition[] = [
    {
        id: "DIRECTOR",
        label: "Director",
        description: "Strategic oversight and high-value approvals.",
        responsibilities: [
            "Approve OPEX/COGS > 5,000,000 IDR",
            "Review monthly financial performance",
            "Monitor overall fleet profitability"
        ],
        connections: [
            "Receives high-value requests from FINANCE",
            "Reviews reports from GM"
        ],
        landingPage: "/approvals?scope=high",
        icon: SparklesIcon,
        color: "bg-purple-600"
    },
    {
        id: "GM",
        label: "General Manager",
        description: "Operational leadership and agency supervision.",
        responsibilities: [
            "Supervise Agency Calls & Logistics",
            "Set profit margins & approve small funds",
            "Follow up on outstanding invoices"
        ],
        connections: [
            "Supervises OPERATION HEAD",
            "Approves routine requests from FINANCE"
        ],
        landingPage: "/dashboard",
        icon: ChartBarIcon,
        color: "bg-blue-600"
    },
    {
        id: "OPERATION_HEAD",
        label: "Head of Operations",
        description: "Fleet coordination and port clearance oversight.",
        responsibilities: [
            "Coordinate Inaport arrivals",
            "Monitor vessel needs & SPB issuance",
            "Oversee ops dashboard metrics"
        ],
        connections: [
            "Assigns tasks to PIC OPS",
            "Reports fleet status to GM"
        ],
        landingPage: "/ops-dashboard",
        icon: UserGroupIcon,
        color: "bg-cyan-600"
    },
    {
        id: "PIC_OPS",
        label: "PIC Operations",
        description: "On-the-ground vessel handling and documentation.",
        responsibilities: [
            "Update ETA/ATA & cargo status",
            "Coordinate documents & permits",
            "Monitor daily ship needs"
        ],
        connections: [
            "Reports directly to OPERATION HEAD",
            "Requests funds from FINANCE"
        ],
        landingPage: "/calls",
        icon: DocumentTextIcon,
        color: "bg-sky-500"
    },
    {
        id: "ADMIN_OPS",
        label: "Admin Operational",
        description: "Operational reporting and certification management.",
        responsibilities: [
            "Update Memorandum & Certificates",
            "Send daily reports to clients",
            "Create Time Sheets & NOR"
        ],
        connections: [
            "Supports PIC OPS administration",
            "Coordinates with FIELD SUPPORT"
        ],
        landingPage: "/daily-report",
        icon: ClipboardDocumentCheckIcon,
        color: "bg-indigo-500"
    },
    {
        id: "FIELD_SUPPORT",
        label: "Field Support",
        description: "Logistics execution and field delivery.",
        responsibilities: [
            "Purchase goods & deliverables",
            "Guest handling & document shuttling",
            "Upload proof of receipt"
        ],
        connections: [
            "Executes requests from LOGISTICS",
            "Supports PIC OPS on site"
        ],
        landingPage: "/tasks-lapangan",
        icon: WrenchScrewdriverIcon,
        color: "bg-orange-500"
    },
    {
        id: "FINANCE",
        label: "Finance Staff",
        description: "Cashflow management and payment processing.",
        responsibilities: [
            "Process Fund Requests & Cost Breakdown",
            "Daily cashflow recording",
            "Coordinate sub-agent costs"
        ],
        connections: [
            "Processes requests from OPS/LOGISTICS",
            "Submits approvals to GM/DIRECTOR"
        ],
        landingPage: "/fund-request",
        icon: BanknotesIcon,
        color: "bg-emerald-600"
    },
    {
        id: "ADMIN_FINANCE",
        label: "Admin Finance",
        description: "Taxation, reporting, and archiving.",
        responsibilities: [
            "Manage Taxes (PPN, PPh21, PPh23)",
            "Monthly financial reporting",
            "Archive outgoing invoices"
        ],
        connections: [
            "Supports FINANCE team",
            "Reports tax status to DIRECTOR"
        ],
        landingPage: "/pajak",
        icon: CalculatorIcon,
        color: "bg-teal-600"
    },
    {
        id: "COMMERCIAL_ADMIN",
        label: "Commercial Admin",
        description: "Sales offerings and contract drafting.",
        responsibilities: [
            "Create Offers & Profit Estimates",
            "Draft SPK (Contracts)",
            "Archive invoice attachments"
        ],
        connections: [
            "Supports GM in sales",
            "Hands off SPK to OPS"
        ],
        landingPage: "/penawaran-draft",
        icon: DocumentTextIcon,
        color: "bg-rose-600"
    },
    {
        id: "ADMIN_LOGISTICS",
        label: "Admin Logistics",
        description: "Procurement tracking and vendor management.",
        responsibilities: [
            "Vendor comparison & selection",
            "Arranging delivery fleet",
            "Archiving logistics costs"
        ],
        connections: [
            "Coordinates with FIELD SUPPORT",
            "Requests purchases via FINANCE"
        ],
        landingPage: "/logistics",
        icon: TruckIcon,
        color: "bg-amber-600"
    }
];

export const getRoleDefinition = (role: Role): RoleDefinition => {
    return roleData.find((r) => r.id === role) || roleData[0];
};
