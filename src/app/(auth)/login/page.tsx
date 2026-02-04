"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Role } from "@/types/rbac";
import { roleOptions } from "@/types/rbac";
import { writeSession } from "@/lib/session";

const roleDescriptions: Record<Role, string> = {
  DIRECTOR: "Approve large opex/cogs and view strategic reports.",
  GM: "Full operational view with approvals and client coordination.",
  OPERATION_HEAD: "Ops dashboard, documents, and daily reporting.",
  PIC_OPS: "ETA/ATA updates, needs request, and document handling.",
  ADMIN_OPS: "Memorandum updates, daily reports, time sheet/NOR.",
  FIELD_SUPPORT: "Field tasks and delivery status updates.",
  FINANCE: "Cashflow, fund requests, and cost control.",
  ADMIN_FINANCE: "Financial reports, tax, invoice archive, outstanding.",
  COMMERCIAL_ADMIN: "Draft offers, SPK, and invoice/cost attachments.",
  ADMIN_LOGISTICS: "Logistics procurement, vendor compare, delivery."
};

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(roleOptions[0].value);
  const [name, setName] = useState("");

  const handleLogin = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    writeSession({ role: selectedRole, name: trimmed });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 py-12 lg:flex-row">
        <div
          className="flex-1 space-y-6 animate-fade-up"
          style={{ animationDelay: "40ms" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 shadow-soft">
            Demo Mode · No real backend
          </div>
          <h1 className="max-w-xl font-display text-4xl text-ink md:text-5xl">
            Meranti Prima Samudra
            <span className="block text-ocean">ERP Experience Lab</span>
          </h1>
          <p className="max-w-xl text-lg text-ink/70">
            Clickable prototype to showcase sales calls, approvals, and GM-level
            insights. Built for a fast demo in the browser using local state and
            dummy data.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "GM cockpit: pipeline + approvals",
              "Unified call tracking",
              "Clean handoff to operations",
              "Pricing and credit controls"
            ].map((item) => (
              <div key={item} className="card p-4 text-sm text-ink/70">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-full max-w-md animate-fade-up"
          style={{ animationDelay: "140ms" }}
        >
          <div className="card-solid space-y-6 p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-ink/40">
                Mock Login
              </p>
              <h2 className="font-display text-2xl text-ink">
                Select your role
              </h2>
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                Your name
              </label>
              <input
                className="input"
                placeholder="e.g. Arif Pratama"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-3">
              {roleOptions.map((role) => {
                const active = selectedRole === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-ink bg-ink text-white shadow-glow"
                        : "border-ink/10 bg-white/90 text-ink/70 hover:border-ink/30"
                    }`}
                  >
                    <div className="text-sm font-semibold tracking-[0.08em]">
                      {role.label}
                    </div>
                    <div className="text-xs opacity-80">
                      {roleDescriptions[role.value]}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              className="btn-primary w-full"
              onClick={handleLogin}
              disabled={!name.trim()}
            >
              Enter Dashboard
            </button>
            <p className="text-xs text-ink/50">
              Tip: role is stored in localStorage for demo continuity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
