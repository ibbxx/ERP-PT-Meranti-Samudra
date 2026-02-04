"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import { menuItems } from "@/lib/menu";
import { clearSession } from "@/lib/session";
import { useSession } from "@/lib/useSession";
import type { Permission, Role } from "@/types/rbac";
import { getRoleLabel, hasMenuPermission } from "@/types/rbac";

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, name } = useSession();
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    );
  }, []);

  const hasAccess = (permission: Permission) => {
    if (!role) return false;
    return hasMenuPermission(role as Role, permission);
  };

  const visibleItems = menuItems.filter((item) => hasAccess(item.permission));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-sand/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
              Meranti ERP Prototype
            </p>
            <p className="font-display text-lg text-ink">
              PT. Meranti Prima Samudra
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="chip border-ink/20 bg-white/90 text-ink/70">
              {today}
            </div>
            <div className="chip border-ink/20 bg-white/90 text-ink/70">
              {name ?? "Guest"}
            </div>
            {role && (
              <Badge tone="info">{getRoleLabel(role as Role)}</Badge>
            )}
            <button
              className="btn-ghost"
              onClick={() => {
                clearSession();
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <Card className="p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/40">
              Navigation
            </p>
            <div className="mt-4 space-y-2">
              {visibleItems.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      active
                        ? "btn-primary w-full justify-start"
                        : "btn-secondary w-full justify-start border-ink/10 text-ink/70"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
              {visibleItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-ink/20 bg-white/70 p-4 text-xs text-ink/60">
                  No menus assigned for this role.
                </div>
              )}
            </div>
          </Card>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
