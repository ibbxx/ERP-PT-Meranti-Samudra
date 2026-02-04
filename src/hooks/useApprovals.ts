import { useState, useEffect, useCallback } from "react";
import { getApprovals, setApprovals as saveApprovalsToStorage } from "@/lib/storage";
import type { ApprovalItem } from "@/data/mock";

export function useApprovals() {
    const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loaded = getApprovals();
        setApprovals(loaded);
        setIsLoading(false);
    }, []);

    const refreshApprovals = useCallback(() => {
        const loaded = getApprovals();
        setApprovals(loaded);
    }, []);

    const addApproval = useCallback((newItem: ApprovalItem) => {
        const current = getApprovals();
        const updated = [newItem, ...current];
        saveApprovalsToStorage(updated);
        setApprovals(updated);
    }, []);

    const updateApproval = useCallback((updatedItem: ApprovalItem) => {
        const current = getApprovals();
        const updated = current.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        saveApprovalsToStorage(updated);
        setApprovals(updated);
    }, []);

    const removeApproval = useCallback((id: string) => {
        const current = getApprovals();
        const updated = current.filter((item) => item.id !== id);
        saveApprovalsToStorage(updated);
        setApprovals(updated);
    }, []);

    return {
        approvals,
        isLoading,
        refreshApprovals,
        addApproval,
        updateApproval,
        removeApproval,
    };
}
