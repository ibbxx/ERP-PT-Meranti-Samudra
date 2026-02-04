"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Card from "./Card";
import { useSession } from "@/lib/useSession";
import type { Permission, Role } from "@/types/rbac";
import { getRoleLabel, hasMenuPermission } from "@/types/rbac";

export type AccessGateProps = {
  permission: Permission;
  children: ReactNode;
};

export default function AccessGate({ permission, children }: AccessGateProps) {
  const { role } = useSession();

  if (!role) {
    return (
      <Card className="p-8 text-center">
        <h2 className="font-display text-2xl text-ink">403 - Access Denied</h2>
        <p className="mt-2 text-sm text-ink/60">
          Please login to access this module.
        </p>
        <Link className="btn-primary mt-4" href="/login">
          Go to Login
        </Link>
      </Card>
    );
  }

  const allowed = hasMenuPermission(role as Role, permission);

  if (!allowed) {
    return (
      <Card className="p-8 text-center">
        <h2 className="font-display text-2xl text-ink">403 - Access Denied</h2>
        <p className="mt-2 text-sm text-ink/60">
          {getRoleLabel(role as Role)} does not have access to this module.
        </p>
        <Link className="btn-secondary mt-4" href="/dashboard">
          Back to Dashboard
        </Link>
      </Card>
    );
  }

  return <>{children}</>;
}
