"use client";

import PageHeader from "@/components/PageHeader";
import { roleData } from "@/lib/roleData";
import {
    ArrowRightIcon,
    BanknotesIcon,
    ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";

export default function GuidePage() {
    return (
        <section className="space-y-16 pb-24">
            {/* Hero Section */}
            <div className="space-y-4 border-b border-ink/5 pb-10">
                <PageHeader
                    title="Manual & Documentation"
                    subtitle="Comprehensive guide to PT Meranti Prima Samudra ERP workflows."
                />
                <p className="text-xl leading-relaxed text-ink/60 max-w-3xl">
                    This system integrates <strong>Commercial, Operational, and Financial</strong> workflows into a single "Port Call" lifecycle.
                    Use this guide to understand how your role connects with the bigger picture.
                </p>
            </div>

            {/* 1. The Core Lifecycle (Detailed) */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-display font-bold text-ink mb-2">The "Call" Lifecycle</h2>
                    <p className="text-ink/60">Step-by-step flow from initial customer contact to final invoicing.</p>
                </div>

                <div className="relative border-l-2 border-ink/10 ml-4 md:ml-6 space-y-12">
                    {/* Step 1 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 ring-4 ring-white" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-1 rounded">Stage 1: Commercial</span>
                                <span className="text-sm font-medium text-ink/40">Sales Team</span>
                            </div>
                            <h3 className="text-lg font-bold text-ink">Inquiry & Offer</h3>
                            <p className="text-ink/60 max-w-2xl">
                                Commercial Admin receives an inquiry and drafts an <strong>Offer (Penawaran)</strong>.
                                This document estimates the PDA (Port Disbursement Account) based on the vessel type and cargo.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 ring-4 ring-white" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-1 rounded">Stage 2: Appointment</span>
                                <span className="text-sm font-medium text-ink/40">Sales -> Ops</span>
                            </div>
                            <h3 className="text-lg font-bold text-ink">SPK & Call Creation</h3>
                            <p className="text-ink/60 max-w-2xl">
                                Once the client accepts, a <strong>SPK (Surat Perintah Kerja)</strong> is generated.
                                The system automatically creates a "Call" entry in the dashboard.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">Stage 3: Agency Operations</span>
                                <span className="text-sm font-medium text-ink/40">Agency Team</span>
                            </div>
                            <h3 className="text-lg font-bold text-ink">Ship Handling & Clearance</h3>
                            <p className="text-ink/60 max-w-2xl">
                                <strong>Agency</strong> handles the vessel's legal entry/exit.
                                PIC Ops manages <strong>Inaportnet</strong>, updates ETA/ATA, and secures the <strong>SPB (Port Clearance)</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded">Stage 4: Logistics</span>
                                <span className="text-sm font-medium text-ink/40">Logistics & Field Support</span>
                            </div>
                            <h3 className="text-lg font-bold text-ink">Procurement & Delivery</h3>
                            <p className="text-ink/60 max-w-2xl">
                                <strong>Logistics</strong> compares 3 vendors for needs (Provisions/Spare Parts).
                                Once approved, <strong>Field Support</strong> executes the delivery to the ship.
                            </p>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Stage 5: Funding</span>
                                <span className="text-sm font-medium text-ink/40">Finance Team</span>
                            </div>
                            <h3 className="text-lg font-bold text-ink">Fund Request & Cashflow</h3>
                            <p className="text-ink/60 max-w-2xl">
                                Ops and Logistics request funds for their activities. Finance verifies and disburses cash.
                                <strong>Management Approval</strong> is required here (GM/Director) depending on the amount.
                            </p>
                        </div>
                    </div>

                    {/* Step 6 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-white" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded">Stage 6: Closing</span>
                                <span className="text-sm font-medium text-ink/40">Finance -> Management</span>
                            </div>
                            <h3 className="text-lg font-bold text-ink">Final Invoice & Reporting</h3>
                            <p className="text-ink/60 max-w-2xl">
                                After the ship departs, all costs are tallied (FDA). Final Invoice is sent to the client.
                                Profit/Loss analysis is generated for the Directors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-ink/5" />

            {/* 2. Glossary & Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Module Glossary */}
                <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold text-ink">System Modules</h2>
                    <div className="space-y-4">
                        <div className="card p-4 hover:bg-ink/5 transition-colors cursor-default">
                            <div className="font-bold text-ink mb-1">Calls (Port Calls)</div>
                            <p className="text-sm text-ink/60">Updates vessel status (ETA, ATA, ETD, ATD) and manages cargo info.</p>
                        </div>
                        <div className="card p-4 hover:bg-ink/5 transition-colors cursor-default">
                            <div className="font-bold text-ink mb-1">Logicstics (Vendor Compare)</div>
                            <p className="text-sm text-ink/60">Compare prices from 3 vendors before purchasing spare parts or provisions.</p>
                        </div>
                        <div className="card p-4 hover:bg-ink/5 transition-colors cursor-default">
                            <div className="font-bold text-ink mb-1">Approvals (Tiered)</div>
                            <p className="text-sm text-ink/60">Central inbox for GM/Director to review Fund Requests exceeding auto-approval limits.</p>
                        </div>
                    </div>
                </div>

                {/* Industry Terms */}
                <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold text-ink">Industry Terms</h2>
                    <dl className="space-y-4">
                        <div className="grid grid-cols-[80px_1fr] gap-4">
                            <dt className="font-mono text-sm font-bold text-ink/80">PDA</dt>
                            <dd className="text-sm text-ink/60">Proforma Disbursement Account. Estimated cost sent to client before arrival.</dd>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-4">
                            <dt className="font-mono text-sm font-bold text-ink/80">FDA</dt>
                            <dd className="text-sm text-ink/60">Final Disbursement Account. Actual cost billed after departure.</dd>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-4">
                            <dt className="font-mono text-sm font-bold text-ink/80">SPB</dt>
                            <dd className="text-sm text-ink/60">Surat Persetujuan Berlayar. Port clearance permit required for departure.</dd>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-4">
                            <dt className="font-mono text-sm font-bold text-ink/80">NOR</dt>
                            <dd className="text-sm text-ink/60">Notice of Readiness. Statement that the ship is ready for cargo operations.</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <hr className="border-ink/5" />

            {/* 3. Role Dictionary (Updated Visuals) */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-display font-bold text-ink mb-2">Role Reference</h2>
                    <p className="text-ink/60">Who is responsible for what.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roleData.map((role) => (
                        <div key={role.id} className="card p-6 space-y-4 hover:shadow-lg hover:border-ink/20 transition-all duration-300">
                            <div className="flex flex-col gap-2">
                                <div className={`w-fit p-2 rounded-lg text-white ${role.color}`}>
                                    <role.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-ink">{role.label}</h3>
                            </div>
                            <p className="text-sm text-ink/60">
                                {role.description}
                            </p>
                            <div className="space-y-2 pt-2">
                                {role.responsibilities.map((task, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs text-ink/70">
                                        <div className="w-1 h-1 rounded-full bg-ink/30 mt-1.5 shrink-0" />
                                        {task}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
