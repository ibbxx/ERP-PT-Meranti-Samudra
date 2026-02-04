import type { Role } from "@/types/rbac";

export type Session = {
  role?: Role;
  name?: string;
};

export const readSession = (): Session => {
  if (typeof window === "undefined") return {};
  const stored = window.localStorage.getItem("mps_session");
  if (!stored) return {};
  try {
    return JSON.parse(stored) as Session;
  } catch {
    return {};
  }
};

export const writeSession = (session: Session): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("mps_session", JSON.stringify(session));
};

export const clearSession = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("mps_session");
};
