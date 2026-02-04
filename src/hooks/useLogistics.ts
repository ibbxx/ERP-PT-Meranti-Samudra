import { useState, useEffect, useCallback } from "react";
import { getLogisticsRequests, setLogisticsRequests as saveLogisticsToStorage } from "@/lib/storage";
import type { LogisticsRequest } from "@/data/mock";

export function useLogistics() {
    const [logistics, setLogistics] = useState<LogisticsRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loaded = getLogisticsRequests();
        setLogistics(loaded);
        setIsLoading(false);
    }, []);

    const refreshLogistics = useCallback(() => {
        const loaded = getLogisticsRequests();
        setLogistics(loaded);
    }, []);

    const createLogisticsRequest = useCallback((newRequest: LogisticsRequest) => {
        const current = getLogisticsRequests();
        const updated = [newRequest, ...current];
        saveLogisticsToStorage(updated);
        setLogistics(updated);
    }, []);

    const updateLogistics = useCallback((updatedItem: LogisticsRequest) => {
        const current = getLogisticsRequests();
        const updated = current.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        saveLogisticsToStorage(updated);
        setLogistics(updated);
    }, []);

    return {
        logistics,
        isLoading,
        refreshLogistics,
        createLogisticsRequest,
        updateLogistics,
    };
}
