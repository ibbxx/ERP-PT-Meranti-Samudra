import { Permissions } from "@/types/rbac";
import type { Permission } from "@/types/rbac";

export type MenuItem = {
  label: string;
  href: string;
  permission: Permission;
};

export type MenuGroup = {
  label: string;
  items: MenuItem[];
};

export const menuGroups: MenuGroup[] = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", permission: Permissions.MENU_DASHBOARD },
      { label: "User Guide", href: "/guide", permission: Permissions.MENU_GUIDE },
    ]
  },
  {
    label: "Agency / Calls",
    items: [
      { label: "Calls", href: "/calls", permission: Permissions.MENU_CALLS },
      { label: "Ops Dashboard", href: "/ops-dashboard", permission: Permissions.MENU_OPS_DASHBOARD },
      { label: "Documents", href: "/documents", permission: Permissions.MENU_DOCUMENTS },
      { label: "Daily Report", href: "/daily-report", permission: Permissions.MENU_DAILY_REPORT },
      { label: "Request / Needs", href: "/request-needs", permission: Permissions.MENU_REQUEST_NEEDS },
      { label: "Time Sheet", href: "/time-sheet-nor", permission: Permissions.MENU_TIME_SHEET_NOR },
    ]
  },
  {
    label: "Field Support",
    items: [
      { label: "Tasks Lapangan", href: "/tasks-lapangan", permission: Permissions.MENU_TASKS_LAPANGAN },
      { label: "Delivery Tracking", href: "/delivery-tracking", permission: Permissions.MENU_DELIVERY_TRACKING },
    ]
  },
  {
    label: "Logistics",
    items: [
      { label: "Logistics", href: "/logistics", permission: Permissions.MENU_LOGISTICS },
      { label: "Vendor Compare", href: "/vendor-compare", permission: Permissions.MENU_VENDOR_COMPARE },
      { label: "Purchase", href: "/purchase", permission: Permissions.MENU_PURCHASE },
      { label: "Delivery", href: "/delivery", permission: Permissions.MENU_DELIVERY },
      { label: "Logistics Cost", href: "/logistics-cost", permission: Permissions.MENU_LOGISTICS_COST },
    ]
  },
  {
    label: "Finance",
    items: [
      { label: "Cashflow", href: "/cashflow", permission: Permissions.MENU_CASHFLOW },
      { label: "Fund Request", href: "/fund-request", permission: Permissions.MENU_FUND_REQUEST },
      { label: "Cost Control", href: "/cost-control", permission: Permissions.MENU_COST_CONTROL },
      { label: "Invoice Masuk", href: "/invoice-masuk", permission: Permissions.MENU_INVOICE_MASUK },
      { label: "Invoice Keluar", href: "/invoice-keluar", permission: Permissions.MENU_INVOICE_KELUAR },
      { label: "Outstanding", href: "/outstanding", permission: Permissions.MENU_OUTSTANDING },
      { label: "Pajak", href: "/pajak", permission: Permissions.MENU_TAXES },
    ]
  },
  {
    label: "Management",
    items: [
      { label: "Approvals", href: "/approvals", permission: Permissions.MENU_APPROVALS },
      { label: "Reports", href: "/reports", permission: Permissions.MENU_REPORTS },
      { label: "Penawaran (Draft)", href: "/penawaran-draft", permission: Permissions.MENU_PENAWARAN_DRAFT },
      { label: "SPK Draft", href: "/spk-draft", permission: Permissions.MENU_SPK_DRAFT },
      { label: "Arsip", href: "/arsip-lampiran", permission: Permissions.MENU_ARCHIVE }
    ]
  }
];
