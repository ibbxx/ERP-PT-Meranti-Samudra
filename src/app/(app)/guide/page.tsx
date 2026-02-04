"use client";

import PageHeader from "@/components/PageHeader";
import { roleData } from "@/lib/roleData";
import {
    CheckCircleIcon,
    BookOpenIcon,
    LifebuoyIcon
} from "@heroicons/react/24/outline";

export default function GuidePage() {
    return (
        <section className="space-y-20 pb-24 max-w-5xl mx-auto">
            {/* Hero */}
            <div className="space-y-6 text-center pt-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-ink/5 flex items-center justify-center text-ink/40 mb-6">
                    <BookOpenIcon className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-ink">
                    Operational Manual
                </h1>
                <p className="text-xl leading-relaxed text-ink/50 max-w-2xl mx-auto">
                    The definitive guide to the PT MPS ecosystem. <br />
                    From commercial initiation to financial closing.
                </p>
            </div>

            <hr className="border-ink/5" />

            {/* 1. The Core Lifecycle (Vertical Minimalist) */}
            <div className="space-y-12">
                <div className="flex items-end justify-between border-b border-ink/5 pb-4">
                    <h2 className="text-2xl font-display font-bold text-ink">The Port Call Lifecycle</h2>
                    <span className="text-sm font-mono text-ink/40 uppercase tracking-widest">6 Stages</span>
                </div>

                <div className="relative space-y-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-ink/10 before:to-transparent">

                    {/* Stage 1 */}
                    <TimelineItem
                        step="01"
                        title="Commercial"
                        subtitle="Sales & Inquiry"
                        color="text-rose-600"
                        bg="bg-rose-50"
                    >
                        <p>
                            The journey begins with an <strong>Inquiry</strong>. Commercial Admin drafts an <strong>Offer (Penawaran)</strong> estimating the PDA.
                            Once agreed, the client sends a nomination.
                        </p>
                    </TimelineItem>

                    {/* Stage 2 */}
                    <TimelineItem
                        step="02"
                        title="Appointment"
                        subtitle="SPK Generation"
                        color="text-rose-600"
                        bg="bg-rose-50"
                    >
                        <p>
                            Upon verification, an <strong>SPK (Surat Perintah Kerja)</strong> is issued.
                            The system officially creates a "Call" entity, assigning a unique Reference Number (e.g., <em>MPS-SUB-24-001</em>).
                        </p>
                    </TimelineItem>

                    {/* Stage 3 */}
                    <TimelineItem
                        step="03"
                        title="Agency Ops"
                        subtitle="Permits & Clearance"
                        color="text-blue-600"
                        bg="bg-blue-50"
                    >
                        <p>
                            <strong>Critical Phase.</strong> Agency team manages <strong>Inaportnet</strong> clearance.
                            PIC Ops secures the <strong>SPB (Port Clearance)</strong> and updates live vessel movements (ETA/ATA).
                        </p>
                    </TimelineItem>

                    {/* Stage 4 */}
                    <TimelineItem
                        step="04"
                        title="Logistics"
                        subtitle="Procurement"
                        color="text-orange-600"
                        bg="bg-orange-50"
                    >
                        <p>
                            Logistics team receives requisitions. A <strong>Vendor Compare</strong> (3 quotes) is mandatory for provisions/spares.
                            Field Support executes the delivery to the vessel.
                        </p>
                    </TimelineItem>

                    {/* Stage 5 */}
                    <TimelineItem
                        step="05"
                        title="Funding"
                        subtitle="Disbursement"
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                    >
                        <p>
                            Operational costs require funding.
                            <span className="block mt-2 p-3 bg-ink/5 rounded text-sm text-ink/70 border-l-2 border-emerald-500">
                                <strong>Rule:</strong> Requests &gt; 5 Juta require Director approval. Below that, GM approval suffices.
                            </span>
                        </p>
                    </TimelineItem>

                    {/* Stage 6 */}
                    <TimelineItem
                        step="06"
                        title="Closing"
                        subtitle="Financial Reporting"
                        color="text-purple-600"
                        bg="bg-purple-50"
                    >
                        <p>
                            Post-departure, all costs are reconciled (FDA).
                            Finance sends the <strong>Final Invoice</strong>. Management reviews the P&L statement.
                        </p>
                    </TimelineItem>

                </div>
            </div>

            <hr className="border-ink/5" />

            {/* 2. System Intelligence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h2 className="text-xl font-display font-bold text-ink">Glossary</h2>
                    <dl className="space-y-6">
                        {[
                            { term: "PDA", desc: "Proforma Disbursement Account. Estimated cost sent to client." },
                            { term: "FDA", desc: "Final Disbursement Account. Actual billed cost." },
                            { term: "SPB", desc: "Surat Persetujuan Berlayar. Mandatory sailing permit." },
                            { term: "COGS", desc: "Cost of Goods Sold. Direct operational expenses." },
                        ].map((item) => (
                            <div key={item.term}>
                                <dt className="font-mono text-xs font-bold text-ink uppercase tracking-wider mb-1">{item.term}</dt>
                                <dd className="text-sm text-ink/60">{item.desc}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="space-y-8">
                    <h2 className="text-xl font-display font-bold text-ink">Key Modules</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <LifebuoyIcon className="w-5 h-5 text-ink/30 shrink-0" />
                            <div>
                                <h4 className="font-bold text-ink text-sm">Ops Dashboard</h4>
                                <p className="text-xs text-ink/50 mt-1">Real-time view of all active vessels and their current status steps.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <LifebuoyIcon className="w-5 h-5 text-ink/30 shrink-0" />
                            <div>
                                <h4 className="font-bold text-ink text-sm">Approvals Center</h4>
                                <p className="text-xs text-ink/50 mt-1">Centralized inbox for Management to review and sign off on fund requests.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <hr className="border-ink/5" />

            {/* 3. Roles Grid */}
            <div className="space-y-8">
                <h2 className="text-xl font-display font-bold text-ink">Role Architecture</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roleData.map((role) => (
                        <div key={role.id} className="group p-5 rounded-xl border border-ink/5 hover:border-ink/20 transition-all bg-white hover:shadow-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-lg text-white ${role.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                                    <role.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">{role.id.replace('_', ' ')}</span>
                            </div>
                            <h3 className="font-bold text-ink mb-1">{role.label}</h3>
                            <p className="text-xs text-ink/50 mb-4 line-clamp-2 h-8">
                                {role.description}
                            </p>
                            <div className="space-y-1.5 border-t border-ink/5 pt-3">
                                {role.responsibilities.slice(0, 3).map((task, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[11px] text-ink/70">
                                        <CheckCircleIcon className="w-3 h-3 text-ink/30" />
                                        <span className="truncate">{task}</span>
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

function TimelineItem({ step, title, subtitle, color, bg, children }: any) {
    return (
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon/Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono text-xs font-bold text-ink/40">
                {step}
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-ink/5 bg-white hover:border-ink/20 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${bg} ${color}`}>
                        {title}
                    </div>
                    <span className="text-xs font-medium text-ink/30">{subtitle}</span>
                </div>
                <div className="text-sm text-ink/70 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    )
}
