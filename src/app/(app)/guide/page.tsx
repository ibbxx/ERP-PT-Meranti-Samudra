"use client";

import PageHeader from "@/components/PageHeader";
import { roleData } from "@/lib/roleData";
import {
    ArrowRightIcon,
    BanknotesIcon,
    MapIcon,
    ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";

export default function GuidePage() {
    return (
        <section className="space-y-12 pb-12">
            <PageHeader
                title="System Guide"
                subtitle="Understanding the ERP workflows and roles."
            />

            {/* 1. The Core Concept */}
            <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-ink">The Core: "The Port Call"</h2>
                <div className="card p-8 bg-white/50 border-ink/5">
                    <p className="text-lg leading-relaxed text-ink/70 max-w-4xl">
                        At the heart of PT MPS operations is the <strong>"Port Call"</strong>.
                        Every job, invoice, and task revolves around a vessel visiting a port.
                        The ERP connects Agency (Handling the ship), Field Support ( delivering needs),
                        and Finance (billing the client).
                    </p>
                </div>
            </div>

            {/* 2. The Lifecycle Flow */}
            <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-ink">The Lifecycle Flow</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Step 1 */}
                    <div className="card p-6 border-l-4 border-l-rose-500 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
                            <span className="font-bold">1</span>
                        </div>
                        <h3 className="font-bold text-ink">Marketing</h3>
                        <p className="text-sm text-ink/60">
                            Commercial Admin creates an <strong>Offer</strong>. Once confirmed, it becomes an <strong>SPK</strong>.
                        </p>
                        <div className="pt-2 text-xs font-mono text-ink/40 bg-ink/5 px-2 py-1 rounded w-fit">
                            Create Call
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="card p-6 border-l-4 border-l-blue-500 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                            <span className="font-bold">2</span>
                        </div>
                        <h3 className="font-bold text-ink">Operations</h3>
                        <p className="text-sm text-ink/60">
                            PIC Ops manages the ship. Field Support delivers goods. Admin Ops sends Daily Reports.
                        </p>
                        <div className="pt-2 text-xs font-mono text-ink/40 bg-ink/5 px-2 py-1 rounded w-fit">
                            Fund Requests
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="card p-6 border-l-4 border-l-emerald-500 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                            <span className="font-bold">3</span>
                        </div>
                        <h3 className="font-bold text-ink">Finance</h3>
                        <p className="text-sm text-ink/60">
                            Finance records cashflow, validates fund requests, and prepares Invoices (Proforma/Final).
                        </p>
                        <div className="pt-2 text-xs font-mono text-ink/40 bg-ink/5 px-2 py-1 rounded w-fit">
                            Invoicing
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="card p-6 border-l-4 border-l-purple-500 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
                            <span className="font-bold">4</span>
                        </div>
                        <h3 className="font-bold text-ink">Management</h3>
                        <p className="text-sm text-ink/60">
                            GM/Director approves requests and monitors Profit/Loss via the Dashboard.
                        </p>
                        <div className="pt-2 text-xs font-mono text-ink/40 bg-ink/5 px-2 py-1 rounded w-fit">
                            Approvals
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Approval Logic */}
            <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-ink">Approval Hierarchy</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-blue-50/50 border-blue-100 p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <ClipboardDocumentCheckIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-ink">General Manager</h3>
                                <div className="text-sm text-blue-600 font-medium">Routine Approvals</div>
                            </div>
                        </div>
                        <p className="text-sm text-ink/70">
                            Can approve operational fund requests and costs up to a specific limit.
                        </p>
                        <div className="inline-block px-3 py-1 bg-white border border-blue-200 rounded-md text-xs font-bold text-blue-700">
                            Limit: ≤ Rp 5,000,000
                        </div>
                    </div>

                    <div className="card bg-purple-50/50 border-purple-100 p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                <BanknotesIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-ink">Director</h3>
                                <div className="text-sm text-purple-600 font-medium">Strategic Approvals</div>
                            </div>
                        </div>
                        <p className="text-sm text-ink/70">
                            Required for high-value transactions, OPEX, COGS, and complex non-routine costs.
                        </p>
                        <div className="inline-block px-3 py-1 bg-white border border-purple-200 rounded-md text-xs font-bold text-purple-700">
                            Limit: Unlimited
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Role Reference */}
            <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-ink">Role Dictionary</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roleData.map((role) => (
                        <div key={role.id} className="card p-5 space-y-4 hover:shadow-lg transition-shadow duration-200 group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg text-white ${role.color} group-hover:scale-110 transition-transform`}>
                                    <role.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-ink text-sm">{role.label}</h3>
                            </div>
                            <p className="text-xs text-ink/60 leading-relaxed min-h-[40px]">
                                {role.description}
                            </p>
                            <div className="pt-3 border-t border-ink/5">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-ink/30 mb-2">Key Tasks</div>
                                <ul className="space-y-1">
                                    {role.responsibilities.slice(0, 2).map((task, i) => (
                                        <li key={i} className="text-xs text-ink/70 flex items-start gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-ink/30 mt-1.5" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
