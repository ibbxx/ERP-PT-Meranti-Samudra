"use client";

import type { ReactNode } from "react";
import { useSession } from "@/lib/useSession";
import type { Permission, Role } from "@/types/rbac";
import { hasActionPermission } from "@/types/rbac";

export type ActionGateProps = {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function ActionGate({
  permission,
  children,
  fallback
}: ActionGateProps) {
  const { role } = useSession();

  if (!role) return fallback ?? null;

  const allowed = hasActionPermission(role as Role, permission);
  if (!allowed) return fallback ?? null;

  return <>{children}</>;
}
