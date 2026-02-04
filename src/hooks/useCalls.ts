import { useState, useEffect, useCallback } from "react";
import { getCalls, setCalls as saveCallsToStorage } from "@/lib/storage";
import type { Call } from "@/data/mock";

export function useCalls() {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load calls on mount
    useEffect(() => {
        const loaded = getCalls();
        setCalls(loaded);
        setIsLoading(false);
    }, []);

    const refreshCalls = useCallback(() => {
        const loaded = getCalls();
        setCalls(loaded);
    }, []);

    const getCallById = useCallback((id: string) => {
        // If we have state calls, search there first (faster), fallback to storage
        return getCalls().find((c) => c.id === id);
    }, []);

    const createCall = useCallback((newCall: Call) => {
        const current = getCalls();
        const updated = [newCall, ...current];
        saveCallsToStorage(updated);
        setCalls(updated);
    }, []);

    const updateCall = useCallback((updatedCall: Call) => {
        const current = getCalls();
        const updated = current.map((c) =>
            c.id === updatedCall.id ? updatedCall : c
        );
        saveCallsToStorage(updated);
        setCalls(updated);
    }, []);

    return {
        calls,
        isLoading,
        refreshCalls,
        getCallById,
        createCall,
        updateCall,
    };
}
