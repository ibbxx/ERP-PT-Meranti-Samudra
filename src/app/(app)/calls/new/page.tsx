"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import { useCalls } from "@/hooks/useCalls";
import type { Call } from "@/data/mock";

const generateId = () => `C-24${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;

export default function NewCallPage() {
    const router = useRouter();
    const { createCall } = useCalls();
    const [formData, setFormData] = useState({
        noCall: "",
        vessel: "",
        owner: "",
        etaDate: "",
        etaTime: "",
        branch: "Surabaya", // Default
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.noCall || !formData.vessel || !formData.owner || !formData.etaDate || !formData.etaTime) {
            alert("Please fill in all required fields.");
            return;
        }

        const newCall: Call = {
            id: generateId(),
            noCall: formData.noCall,
            owner: formData.owner,
            vessel: formData.vessel,
            eta: `${formData.etaDate} ${formData.etaTime}`,
            ata: "", // Empty initially
            statusStep: "SPK", // Initial status
            picOps: "Unassigned", // Default
            branch: formData.branch,
            inaportnet: {
                monitored: false,
                status: "MONITORING",
                lastCheck: "-",
            },
            documents: {
                memorandum: false,
                spb: false,
                timesheet: false,
                nor: false,
                certificateCheck: false,
                onboardDocsCollected: false,
            },
            needs: {
                freshwater: false,
                supplies: false,
                certificateExtension: false,
                notes: "",
            },
            dailyReports: [],
            cashAdvance: {
                requested: false,
                amount: 0,
                proofPaid: false,
                requestedAt: "",
            },
            costs: [],
            invoices: [],
            reconciliationDates: {
                midMonth: "-",
                endMonth: "-",
            },
        };

        createCall(newCall);
        router.push("/calls");
    };

    return (
        <section className="space-y-6 max-w-2xl mx-auto">
            <Card className="p-6">
                <h1 className="font-display text-2xl text-ink mb-6">Create New Call</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                            Call No.
                        </label>
                        <input
                            name="noCall"
                            value={formData.noCall}
                            onChange={handleChange}
                            className="input w-full"
                            placeholder="e.g. MPS-OPS-2407"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                            Vessel Name
                        </label>
                        <input
                            name="vessel"
                            value={formData.vessel}
                            onChange={handleChange}
                            className="input w-full"
                            placeholder="e.g. MV Baruna"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                            Owner
                        </label>
                        <input
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                            className="input w-full"
                            placeholder="e.g. PT Pelayaran Nasional"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                                ETA Date
                            </label>
                            <input
                                type="date"
                                name="etaDate"
                                value={formData.etaDate}
                                onChange={handleChange}
                                className="input w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                                ETA Time
                            </label>
                            <input
                                type="time"
                                name="etaTime"
                                value={formData.etaTime}
                                onChange={handleChange}
                                className="input w-full"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                            Branch
                        </label>
                        <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="input w-full"
                        >
                            <option value="Surabaya">Surabaya</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Makassar">Makassar</option>
                            <option value="Semarang">Semarang</option>
                            <option value="Banjarmasin">Banjarmasin</option>
                            <option value="Belawan">Belawan</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Link href="/calls" className="btn-secondary">
                            Cancel
                        </Link>
                        <button type="submit" className="btn-primary">
                            Create Call
                        </button>
                    </div>
                </form>
            </Card>
        </section>
    );
}
