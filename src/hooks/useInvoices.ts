import { useState, useEffect, useCallback } from "react";
import { getCalls, setCalls } from "@/lib/storage";
import type { InvoiceItem } from "@/data/mock";

export type EnrichedInvoice = InvoiceItem & {
    callId: string;
    callNo: string;
    vessel: string;
    owner: string;
};

export function useInvoices() {
    const [invoices, setInvoices] = useState<EnrichedInvoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadInvoices = useCallback(() => {
        const calls = getCalls();
        const allInvoices: EnrichedInvoice[] = calls.flatMap((call) =>
            call.invoices.map((inv) => ({
                ...inv,
                callId: call.id,
                callNo: call.noCall,
                vessel: call.vessel,
                owner: call.owner
            }))
        );
        setInvoices(allInvoices);
        return allInvoices;
    }, []);

    useEffect(() => {
        loadInvoices();
        setIsLoading(false);
    }, [loadInvoices]);

    const updateInvoiceStatus = useCallback(
        (
            callId: string,
            invoiceId: string,
            newStatus: InvoiceItem["status"],
            outstanding: boolean
        ) => {
            const calls = getCalls();
            const updatedCalls = calls.map((call) => {
                if (call.id !== callId) return call;
                return {
                    ...call,
                    invoices: call.invoices.map((inv) =>
                        inv.id === invoiceId
                            ? { ...inv, status: newStatus, outstanding }
                            : inv
                    )
                };
            });

            setCalls(updatedCalls);
            loadInvoices();
        },
        [loadInvoices]
    );

    return {
        invoices,
        isLoading,
        updateInvoiceStatus,
        refreshInvoices: loadInvoices
    };
}
