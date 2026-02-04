export const Roles = {
  DIRECTOR: "DIRECTOR",
  GM: "GM",
  OPERATION_HEAD: "OPERATION_HEAD",
  PIC_OPS: "PIC_OPS",
  ADMIN_OPS: "ADMIN_OPS",
  FIELD_SUPPORT: "FIELD_SUPPORT",
  FINANCE: "FINANCE",
  ADMIN_FINANCE: "ADMIN_FINANCE",
  COMMERCIAL_ADMIN: "COMMERCIAL_ADMIN",
  ADMIN_LOGISTICS: "ADMIN_LOGISTICS"
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const RoleLabels: Record<Role, string> = {
  DIRECTOR: "Direktur",
  GM: "General Manager",
  OPERATION_HEAD: "Operation Head",
  PIC_OPS: "PIC OPS",
  ADMIN_OPS: "Admin Operasional",
  FIELD_SUPPORT: "Field Support / Freelance",
  FINANCE: "Finance",
  ADMIN_FINANCE: "Admin Finance",
  COMMERCIAL_ADMIN: "Commercial Admin",
  ADMIN_LOGISTICS: "Admin Logistik"
};

export const Permissions = {
  // Menus
  MENU_DASHBOARD: "MENU_DASHBOARD",
  MENU_CALLS: "MENU_CALLS",
  MENU_CALL_DETAIL: "MENU_CALL_DETAIL",
  MENU_DOCUMENTS: "MENU_DOCUMENTS",
  MENU_DAILY_REPORT: "MENU_DAILY_REPORT",
  MENU_REQUEST_NEEDS: "MENU_REQUEST_NEEDS",
  MENU_OPS_DASHBOARD: "MENU_OPS_DASHBOARD",
  MENU_TIME_SHEET_NOR: "MENU_TIME_SHEET_NOR",
  MENU_TASKS_LAPANGAN: "MENU_TASKS_LAPANGAN",
  MENU_DELIVERY_TRACKING: "MENU_DELIVERY_TRACKING",
  MENU_LOGISTICS: "MENU_LOGISTICS",
  MENU_VENDOR_COMPARE: "MENU_VENDOR_COMPARE",
  MENU_PURCHASE: "MENU_PURCHASE",
  MENU_DELIVERY: "MENU_DELIVERY",
  MENU_LOGISTICS_COST: "MENU_LOGISTICS_COST",
  MENU_CASHFLOW: "MENU_CASHFLOW",
  MENU_FUND_REQUEST: "MENU_FUND_REQUEST",
  MENU_INVOICE_MASUK: "MENU_INVOICE_MASUK",
  MENU_INVOICE_KELUAR: "MENU_INVOICE_KELUAR",
  MENU_OUTSTANDING: "MENU_OUTSTANDING",
  MENU_APPROVALS: "MENU_APPROVALS",
  MENU_REPORTS: "MENU_REPORTS",
  MENU_TAXES: "MENU_TAXES",
  MENU_ARCHIVE: "MENU_ARCHIVE",
  MENU_PENAWARAN_DRAFT: "MENU_PENAWARAN_DRAFT",
  MENU_SPK_DRAFT: "MENU_SPK_DRAFT",
  MENU_COST_CONTROL: "MENU_COST_CONTROL", // Added as alias for Costs view

  // Actions
  ACTION_CALL_CREATE: "ACTION_CALL_CREATE",
  ACTION_CALL_UPDATE_STATUS: "ACTION_CALL_UPDATE_STATUS",
  ACTION_DOC_UPLOAD: "ACTION_DOC_UPLOAD",
  ACTION_DAILY_REPORT_WRITE: "ACTION_DAILY_REPORT_WRITE",
  ACTION_REQUEST_CREATE: "ACTION_REQUEST_CREATE",
  ACTION_COST_ADD: "ACTION_COST_ADD",
  ACTION_FUND_REQUEST_CREATE: "ACTION_FUND_REQUEST_CREATE",
  ACTION_APPROVE_SMALL: "ACTION_APPROVE_SMALL",
  ACTION_APPROVE_LARGE: "ACTION_APPROVE_LARGE",
  ACTION_INVOICE_CREATE: "ACTION_INVOICE_CREATE",
  ACTION_INVOICE_SEND: "ACTION_INVOICE_SEND",
  ACTION_DELIVERY_UPDATE: "ACTION_DELIVERY_UPDATE",
  ACTION_VENDOR_COMPARE_EDIT: "ACTION_VENDOR_COMPARE_EDIT",
  ACTION_REPORT_EXPORT: "ACTION_REPORT_EXPORT",
  ACTION_TAX_MANAGE: "ACTION_TAX_MANAGE",
  ACTION_OFFER_CREATE: "ACTION_OFFER_CREATE",
  ACTION_ARCHIVE_UPLOAD: "ACTION_ARCHIVE_UPLOAD",
  ACTION_TASK_STATUS_UPDATE: "ACTION_TASK_STATUS_UPDATE",
  ACTION_TIMESHEET_CREATE: "ACTION_TIMESHEET_CREATE",
  ACTION_CASHFLOW_ENTRY: "ACTION_CASHFLOW_ENTRY",
  ACTION_INVOICE_MASUK_RECORD: "ACTION_INVOICE_MASUK_RECORD",
  ACTION_OUTSTANDING_UPDATE: "ACTION_OUTSTANDING_UPDATE",
  ACTION_PURCHASE_UPDATE: "ACTION_PURCHASE_UPDATE",
  ACTION_LOGISTICS_MANAGE: "ACTION_LOGISTICS_MANAGE",
  ACTION_SPB_MARK_ISSUED: "ACTION_SPB_MARK_ISSUED", // Optional per spec
  ACTION_CALL_ASSIGN_PIC: "ACTION_CALL_ASSIGN_PIC"  // Optional per spec
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

export type RbacEntry = {
  menus: Permission[];
  actions: Permission[];
};

export const rbac: Record<Role, RbacEntry> = {
  DIRECTOR: {
    menus: [
      Permissions.MENU_DASHBOARD,
      Permissions.MENU_APPROVALS,
      Permissions.MENU_REPORTS
    ],
    actions: [
      Permissions.ACTION_APPROVE_LARGE,
      Permissions.ACTION_REPORT_EXPORT
    ]
  },
  GM: {
    menus: [
      Permissions.MENU_DASHBOARD,
      Permissions.MENU_CALLS,
      Permissions.MENU_CALL_DETAIL,
      Permissions.MENU_LOGISTICS,
      Permissions.MENU_APPROVALS,
      Permissions.MENU_INVOICE_KELUAR,
      Permissions.MENU_OUTSTANDING,
      Permissions.MENU_REPORTS
    ],
    actions: [
      Permissions.ACTION_APPROVE_SMALL,
      Permissions.ACTION_REPORT_EXPORT,
      Permissions.ACTION_CALL_ASSIGN_PIC
    ]
  },
  OPERATION_HEAD: {
    menus: [
      Permissions.MENU_OPS_DASHBOARD,
      Permissions.MENU_CALLS,
      Permissions.MENU_CALL_DETAIL,
      Permissions.MENU_DOCUMENTS,
      Permissions.MENU_DAILY_REPORT
    ],
    actions: [
      Permissions.ACTION_CALL_UPDATE_STATUS,
      Permissions.ACTION_DOC_UPLOAD,
      Permissions.ACTION_DAILY_REPORT_WRITE,
      Permissions.ACTION_REQUEST_CREATE,
      Permissions.ACTION_SPB_MARK_ISSUED
    ]
  },
  PIC_OPS: {
    menus: [
      Permissions.MENU_CALLS,
      Permissions.MENU_CALL_DETAIL,
      Permissions.MENU_REQUEST_NEEDS,
      Permissions.MENU_DOCUMENTS
    ],
    actions: [
      Permissions.ACTION_CALL_UPDATE_STATUS,
      Permissions.ACTION_REQUEST_CREATE,
      Permissions.ACTION_DOC_UPLOAD,
      Permissions.ACTION_SPB_MARK_ISSUED
    ]
  },
  ADMIN_OPS: {
    menus: [
      Permissions.MENU_CALLS,
      Permissions.MENU_CALL_DETAIL,
      Permissions.MENU_DOCUMENTS,
      Permissions.MENU_DAILY_REPORT,
      Permissions.MENU_TIME_SHEET_NOR
    ],
    actions: [
      Permissions.ACTION_DOC_UPLOAD,
      Permissions.ACTION_DAILY_REPORT_WRITE,
      Permissions.ACTION_TIMESHEET_CREATE,
      Permissions.ACTION_REPORT_EXPORT
    ]
  },
  FIELD_SUPPORT: {
    menus: [
      Permissions.MENU_TASKS_LAPANGAN,
      Permissions.MENU_DELIVERY_TRACKING
    ],
    actions: [
      Permissions.ACTION_DELIVERY_UPDATE,
      Permissions.ACTION_TASK_STATUS_UPDATE
    ]
  },
  FINANCE: {
    menus: [
      Permissions.MENU_CASHFLOW,
      Permissions.MENU_FUND_REQUEST,
      Permissions.MENU_INVOICE_MASUK,
      Permissions.MENU_COST_CONTROL
    ],
    actions: [
      Permissions.ACTION_COST_ADD,
      Permissions.ACTION_FUND_REQUEST_CREATE,
      Permissions.ACTION_CASHFLOW_ENTRY,
      Permissions.ACTION_INVOICE_MASUK_RECORD,
      Permissions.ACTION_ARCHIVE_UPLOAD
    ]
  },
  ADMIN_FINANCE: {
    menus: [
      Permissions.MENU_REPORTS,
      Permissions.MENU_TAXES,
      Permissions.MENU_INVOICE_KELUAR,
      Permissions.MENU_OUTSTANDING,
      Permissions.MENU_ARCHIVE
    ],
    actions: [
      Permissions.ACTION_INVOICE_CREATE,
      Permissions.ACTION_TAX_MANAGE,
      Permissions.ACTION_REPORT_EXPORT,
      Permissions.ACTION_OUTSTANDING_UPDATE
    ]
  },
  COMMERCIAL_ADMIN: {
    menus: [
      Permissions.MENU_PENAWARAN_DRAFT,
      Permissions.MENU_SPK_DRAFT,
      Permissions.MENU_ARCHIVE
    ],
    actions: [
      Permissions.ACTION_CALL_CREATE,
      Permissions.ACTION_OFFER_CREATE,
      Permissions.ACTION_ARCHIVE_UPLOAD
    ]
  },
  ADMIN_LOGISTICS: {
    menus: [
      Permissions.MENU_LOGISTICS,
      Permissions.MENU_VENDOR_COMPARE,
      Permissions.MENU_PURCHASE,
      Permissions.MENU_DELIVERY,
      Permissions.MENU_LOGISTICS_COST
    ],
    actions: [
      Permissions.ACTION_VENDOR_COMPARE_EDIT,
      Permissions.ACTION_LOGISTICS_MANAGE,
      Permissions.ACTION_PURCHASE_UPDATE,
      Permissions.ACTION_DELIVERY_UPDATE,
      Permissions.ACTION_INVOICE_CREATE,
      Permissions.ACTION_ARCHIVE_UPLOAD
    ]
  }
};

export const roleOptions = (Object.values(Roles) as Role[]).map((role) => ({
  value: role,
  label: RoleLabels[role]
}));

// STRICT MODE ENABLED
const ALLOW_ALL_MENUS = false;

export const hasMenuPermission = (role: Role, permission: Permission) => {
  if (ALLOW_ALL_MENUS) return true;
  return rbac[role]?.menus.includes(permission) ?? false;
};

// STRICT MODE ENABLED
const ALLOW_ALL_ACTIONS = false;

export const hasActionPermission = (role: Role, permission: Permission) => {
  if (ALLOW_ALL_ACTIONS) return true;
  return rbac[role]?.actions.includes(permission) ?? false;
};

export const getRoleLabel = (role: Role) => RoleLabels[role] ?? role;
