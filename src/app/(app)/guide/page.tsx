"use client";

import PageHeader from "@/components/PageHeader";
import { roleData } from "@/lib/roleData";
import {
    BookOpenIcon,
    CubeTransparentIcon,
    DocumentTextIcon,
    BanknotesIcon,
    TruckIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";

export default function GuidePage() {
    return (
        <section className="space-y-16 pb-32 max-w-5xl mx-auto text-ink">

            {/* HEADER */}
            <div className="space-y-6 pt-8 border-b border-ink/10 pb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ink text-white flex items-center justify-center">
                        <BookOpenIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink">
                            ERP Operational Manual
                        </h1>
                        <p className="text-lg text-ink/50 mt-1">
                            PT Meranti Prima Samudra
                        </p>
                    </div>
                </div>
                <p className="text-base leading-relaxed text-ink/70 max-w-3xl">
                    This document serves as the single source of truth for the PT MPS Enterprise Resource Planning (ERP) system.
                    It details the end-to-end workflows connecting Commercial, Operational, Logistics, and Financial divisions
                    into a unified "Port Call" lifecycle.
                </p>
            </div>

            {/* CHAPTER 1: ARCHITECTURE */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <CubeTransparentIcon className="w-6 h-6 text-ocean" />
                    <h2 className="text-2xl font-display font-bold">Chapter 1: System Architecture</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="prose prose-sm prose-ink">
                        <h3 className="text-lg font-bold">The "Call" Entity</h3>
                        <p>
                            The core atomic unit of this ERP is the <strong>Call</strong> (Port Call). Every operational activity must be linked to a specific Call ID (e.g., <em>MPS-SUB-24-001</em>).
                        </p>
                        <ul className="list-disc pl-4 space-y-2 text-ink/70">
                            <li><strong>Parent</strong>: The Vessel (Kapal).</li>
                            <li><strong>Trigger</strong>: Created automatically when an SPK is generated.</li>
                            <li><strong>Lifecycle</strong>: Has 6 strict stages that cannot be skipped.</li>
                        </ul>
                    </div>

                    <div className="bg-sand/10 p-6 rounded-xl border border-ink/5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-ink/40 mb-4">Data Hierarchy</h3>
                        <div className="space-y-3 font-mono text-xs">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-rose-500" />
                                <span>Client (Principal)</span>
                            </div>
                            <div className="flex items-center gap-2 pl-4 border-l border-ink/10 ml-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                <span>Vessel (Ship)</span>
                            </div>
                            <div className="flex items-center gap-2 pl-8 border-l border-ink/10 ml-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span><strong>Call (Port Visit)</strong></span>
                            </div>
                            <div className="flex items-center gap-2 pl-12 border-l border-ink/10 ml-1 opacity-60">
                                <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                                <span>Fund Requests</span>
                            </div>
                            <div className="flex items-center gap-2 pl-12 border-l border-ink/10 ml-1 opacity-60">
                                <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                                <span>Logistics PO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-ink/5" />

            {/* CHAPTER 2: AGENCY WORKFLOW */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <DocumentTextIcon className="w-6 h-6 text-rose-600" />
                    <h2 className="text-2xl font-display font-bold">Chapter 2: Agency & Operations</h2>
                </div>

                <div className="space-y-6">
                    <p className="text-ink/70 max-w-3xl">
                        The Agency module manages the vessel's physical presence in the port.
                        This workflow is heavily integrated with government systems like <strong>Inaportnet</strong>.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <CardSteps
                            step="01"
                            title="Pre-Arrival"
                            points={[
                                "Commercial Admin inputs PDA.",
                                "Ops Admin creates 'Call' entry.",
                                "Agent submits PKK (Pemberitahuan Kedatangan Kapal) to Inaportnet."
                            ]}
                        />
                        <CardSteps
                            step="02"
                            title="Arrival & Berting"
                            points={[
                                "PIC Ops inputs 'Actual Time of Arrival' (ATA).",
                                "Field Support delivers 'Fresh Water' & Provisions.",
                                "Daily Reports are generated (status: ALONGSIDE)."
                            ]}
                        />
                        <CardSteps
                            step="03"
                            title="Clearance & Departure"
                            points={[
                                "Ops Admin compiles cargo documents.",
                                "Agent secures SPB (Sailing Permit).",
                                "Final Departure Report (ATD) is triggered."
                            ]}
                        />
                    </div>
                </div>
            </div>

            <hr className="border-ink/5" />

            {/* CHAPTER 3: LOGISTICS */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <TruckIcon className="w-6 h-6 text-orange-600" />
                    <h2 className="text-2xl font-display font-bold">Chapter 3: Logistics Chain</h2>
                </div>

                <div className="bg-white border border-ink/10 rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-ink/5 text-ink font-bold border-b border-ink/10">
                            <tr>
                                <th className="px-6 py-4">Status Step</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Required Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ink/5">
                            <tr className="hover:bg-sand/5">
                                <td className="px-6 py-4 font-mono text-xs uppercase font-bold text-orange-600">REQUESTED</td>
                                <td className="px-6 py-4">Crew/Ops request item (e.g., Spare Parts).</td>
                                <td className="px-6 py-4">Admin Logistics verifies details.</td>
                            </tr>
                            <tr className="hover:bg-sand/5">
                                <td className="px-6 py-4 font-mono text-xs uppercase font-bold text-orange-600">VENDOR_COMPARE</td>
                                <td className="px-6 py-4"><strong>Mandatory Rule:</strong> Must compare 3 vendors.</td>
                                <td className="px-6 py-4">Input prices from Vendor A, B, C. Select winner.</td>
                            </tr>
                            <tr className="hover:bg-sand/5">
                                <td className="px-6 py-4 font-mono text-xs uppercase font-bold text-orange-600">FUND_SUBMIT</td>
                                <td className="px-6 py-4">Request money to buy the item.</td>
                                <td className="px-6 py-4">Auto-creates a 'Fund Request' for Finance.</td>
                            </tr>
                            <tr className="hover:bg-sand/5">
                                <td className="px-6 py-4 font-mono text-xs uppercase font-bold text-orange-600">DELIVERING</td>
                                <td className="px-6 py-4">Item bought and en-route to ship.</td>
                                <td className="px-6 py-4">Field Support uploads Delivery Order (DO).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <hr className="border-ink/5" />

            {/* CHAPTER 4: FINANCIAL CONTROL */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <BanknotesIcon className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-2xl font-display font-bold">Chapter 4: Financial Control</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Tiered Approval Logic</h3>
                        <p className="text-ink/70 text-sm leading-relaxed">
                            To maintain cashflow security while ensuring operational speed, we implement a tiered approval system for all <strong>Fund Requests</strong>.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-emerald-800">General Manager</span>
                                    <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-emerald-200">≤ IDR 5,000,000</span>
                                </div>
                                <p className="text-xs text-emerald-700">Can approve routine operational costs (Fresh water, grab transport, small provisions).</p>
                            </div>

                            <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-purple-800">Director</span>
                                    <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-purple-200">Unlimited</span>
                                </div>
                                <p className="text-xs text-purple-700">Must approve all OPEX, large procurements, and non-routine expenses above 5 Million.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Request Categories</h3>
                        <ul className="space-y-0 divide-y divide-ink/5 border-t border-b border-ink/5">
                            <li className="py-3 flex justify-between text-sm">
                                <span>OPERATIONAL</span>
                                <span className="text-ink/50">Direct expenses for the vessel (Taxi, Boat, Meals).</span>
                            </li>
                            <li className="py-3 flex justify-between text-sm">
                                <span>LOGISTICS</span>
                                <span className="text-ink/50">Purchase of goods (Spare parts, Oil).</span>
                            </li>
                            <li className="py-3 flex justify-between text-sm">
                                <span>OFFICE</span>
                                <span className="text-ink/50">Internal office supplies (ATK, Coffee).</span>
                            </li>
                            <li className="py-3 flex justify-between text-sm">
                                <span>SALLARY</span>
                                <span className="text-ink/50">Payroll for freelance/daily workers.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr className="border-ink/5" />

            {/* CHAPTER 5: ROLE MATRIX */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <UserGroupIcon className="w-6 h-6 text-stone-600" />
                    <h2 className="text-2xl font-display font-bold">Appendix: Role Matrix</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b border-ink/10 py-2 font-bold text-ink">Role</th>
                                <th className="border-b border-ink/10 py-2 font-bold text-ink">Description</th>
                                <th className="border-b border-ink/10 py-2 font-bold text-ink">Key Responsibilities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleData.map((role) => (
                                <tr key={role.id}>
                                    <td className="py-3 border-b border-ink/5 pr-4 align-top font-bold text-ink/80 whitespace-nowrap">
                                        {role.label}
                                    </td>
                                    <td className="py-3 border-b border-ink/5 pr-4 align-top text-ink/60 w-1/3">
                                        {role.description}
                                    </td>
                                    <td className="py-3 border-b border-ink/5 align-top">
                                        <div className="flex flex-wrap gap-1">
                                            {role.responsibilities.map(r => (
                                                <span key={r} className="px-2 py-0.5 rounded bg-ink/5 text-ink/70">{r}</span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    );
}

function CardSteps({ step, title, points }: any) {
    return (
        <div className="p-6 rounded-xl border border-ink/10 bg-white">
            <div className="text-xs font-bold font-mono text-ink/30 mb-2">STAGE {step}</div>
            <h3 className="font-bold text-ink mb-4 text-lg">{title}</h3>
            <ul className="space-y-2">
                {points.map((p: string, i: number) => (
                    <li key={i} className="text-sm text-ink/60 flex gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-ink/40 shrink-0" />
                        {p}
                    </li>
                ))}
            </ul>
        </div>
    )
}
