import { useState, useEffect, useCallback } from "react";
import type { FundRequest } from "@/data/mock";

const STORAGE_KEY = "mps_fund_requests";

// Initial seed data
const INITIAL_DATA: FundRequest[] = [
    {
        id: "FR-1001",
        requestNo: "FR-2026-001",
        requester: "Admin Finance",
        amount: 1500000,
        category: "OFFICE",
        description: "Pembelian ATK bulan Februari",
        status: "APPROVED",
        bankDetails: "BCA 1234567890 a.n PT MPS",
        createdAt: "2026-02-01 09:00",
        proofPaid: true
    }
];

export function useFundRequests() {
    const [requests, setRequests] = useState<FundRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setRequests(JSON.parse(stored));
        } else {
            setRequests(INITIAL_DATA);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        }
        setIsLoading(false);
    }, []);

    const saveToStorage = (data: FundRequest[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setRequests(data);
    };

    const createRequest = useCallback((newRequest: FundRequest) => {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        const updated = [newRequest, ...current];
        saveToStorage(updated);
    }, []);

    const updateRequest = useCallback((updatedItem: FundRequest) => {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        const updated = current.map((item: FundRequest) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        saveToStorage(updated);
    }, []);

    return {
        requests,
        isLoading,
        createRequest,
        updateRequest
    };
}
