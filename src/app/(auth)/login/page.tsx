"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Role } from "@/types/rbac";
import { writeSession } from "@/lib/session";
import { roleData, getRoleDefinition } from "@/lib/roleData";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("GM");
  const [name, setName] = useState("");

  const activeRole = getRoleDefinition(selectedRole);

  const handleLogin = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    writeSession({ role: selectedRole, name: trimmed });

    // Redirect to specific landing page
    router.push(activeRole.landingPage);
  };

  return (
    <div className="min-h-screen bg-sand/20 flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* Left Column: Login Form */}
        <div className="space-y-8 animate-fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-xs font-semibold tracking-wider uppercase text-ink/60 mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              ERP Experience Lab
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-4">
              Meranti Prima Samudra
            </h1>
            <p className="text-lg text-ink/60 leading-relaxed">
              Login to access the integrated ERP system. Experience how operations, finance, and management flow together seamlessly.
            </p>
          </div>

          <div className="card bg-white p-6 lg:p-8 shadow-xl shadow-ink/5 border-ink/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-ink/40">Select Role</label>
              <select
                className="input w-full bg-sand/10 border-ink/10 text-lg font-medium"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
              >
                {roleData.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-ink/40">Your Name</label>
              <input
                className="input w-full bg-sand/10 border-ink/10"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <button
              className={`btn-primary w-full py-4 text-base flex items-center justify-center gap-2 group ${activeRole.color}`}
              onClick={handleLogin}
              disabled={!name.trim()}
            >
              <span>Login as {activeRole.label}</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Role Preview Card */}
        <div className="relative animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="absolute -inset-4 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 rounded-[2rem] -z-10 blur-2xl" />

          <div className="bg-white rounded-[2rem] border border-ink/5 shadow-2xl shadow-ink/10 overflow-hidden transition-all duration-300">
            {/* Header */}
            <div className={`p-8 ${activeRole.color} text-white relative overflow-hidden transition-colors duration-300`}>
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <activeRole.icon className="w-64 h-64 -translate-y-12 translate-x-12" />
              </div>
              <div className="relative z-10">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl w-fit mb-6">
                  <activeRole.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-2">{activeRole.label}</h2>
                <p className="text-white/80 text-lg">{activeRole.description}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Responsibilities */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink/40 mb-4">Key Responsibilities</h3>
                <div className="space-y-3">
                  {activeRole.responsibilities.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircleIcon className={`w-5 h-5 shrink-0 mt-0.5 ${activeRole.color.replace('bg-', 'text-')}`} />
                      <span className="text-ink/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connections */}
              <div className="bg-sand/10 rounded-xl p-6 border border-ink/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink/40 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/40" />
                  Connected Workflow
                </h3>
                <div className="space-y-2">
                  {activeRole.connections.map((item, i) => (
                    <p key={i} className="text-sm text-ink/60 flex items-center gap-2">
                      <span className="w-px h-3 bg-ink/20" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
