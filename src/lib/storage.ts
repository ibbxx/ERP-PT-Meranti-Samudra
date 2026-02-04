import {
  approvals as seedApprovals,
  calls as seedCalls,
  logisticsApprovals,
  logisticsRequests as seedLogistics
} from "@/data/mock";
import type { ApprovalItem, Call, LogisticsRequest } from "@/data/mock";

const CALLS_KEY = "mps_calls";
const APPROVALS_KEY = "mps_approvals";
const LOGISTICS_KEY = "mps_logistics";

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data)) as T;

const safeParse = <T>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getCalls = (): Call[] => {
  if (typeof window === "undefined") return seedCalls;
  const stored = window.localStorage.getItem(CALLS_KEY);
  if (stored) return safeParse<Call[]>(stored, clone(seedCalls));
  const seeded = clone(seedCalls);
  window.localStorage.setItem(CALLS_KEY, JSON.stringify(seeded));
  return seeded;
};

export const setCalls = (items: Call[]): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CALLS_KEY, JSON.stringify(items));
};

export const getApprovals = (): ApprovalItem[] => {
  const seedAll = [...seedApprovals, ...logisticsApprovals];
  if (typeof window === "undefined") return seedAll;
  const stored = window.localStorage.getItem(APPROVALS_KEY);
  if (stored) return safeParse<ApprovalItem[]>(stored, clone(seedAll));
  const seeded = clone(seedAll);
  window.localStorage.setItem(APPROVALS_KEY, JSON.stringify(seeded));
  return seeded;
};

export const setApprovals = (items: ApprovalItem[]): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(APPROVALS_KEY, JSON.stringify(items));
};

export const getLogisticsRequests = (): LogisticsRequest[] => {
  if (typeof window === "undefined") return seedLogistics;
  const stored = window.localStorage.getItem(LOGISTICS_KEY);
  if (stored) return safeParse<LogisticsRequest[]>(stored, clone(seedLogistics));
  const seeded = clone(seedLogistics);
  window.localStorage.setItem(LOGISTICS_KEY, JSON.stringify(seeded));
  return seeded;
};

export const setLogisticsRequests = (items: LogisticsRequest[]): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOGISTICS_KEY, JSON.stringify(items));
};
