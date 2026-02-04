"use client";

import Card from "@/components/Card";

export default function PurchasePage() {
    return (
        <section className="space-y-6">
            <Card className="p-6">
                <h1 className="font-display text-2xl text-ink">Purchase / Pembelian</h1>
                <p className="mt-2 text-sm text-ink/60">
                    Halaman untuk mencatat pembelian logistik, upload bukti bayar, dan setor nota.
                </p>
            </Card>
        </section>
    );
}
