import { useState, useEffect, useCallback } from "react";

export type FieldTaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type FieldTask = {
    id: string;
    title: string;
    description: string;
    location: string;
    assignedTo: string;
    dueDate: string;
    status: FieldTaskStatus;
    priority: "HIGH" | "MEDIUM" | "LOW";
};

const STORAGE_KEY = "mps_field_tasks";

const INITIAL_DATA: FieldTask[] = [
    {
        id: "TSK-001",
        title: "Check MV Meranti Prime",
        description: "Verify hull condition and document readiness.",
        location: "Port of Surabaya",
        assignedTo: "Field Support",
        dueDate: "2026-02-06",
        status: "PENDING",
        priority: "HIGH"
    },
    {
        id: "TSK-002",
        title: "Deliver SPB Documents",
        description: "Hand over SPB to Master of MV Sagara.",
        location: "Port of Makassar",
        assignedTo: "Field Support",
        dueDate: "2026-02-07",
        status: "PENDING",
        priority: "MEDIUM"
    }
];

export function useTasks() {
    const [tasks, setTasks] = useState<FieldTask[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setTasks(JSON.parse(stored));
        } else {
            setTasks(INITIAL_DATA);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        }
        setIsLoading(false);
    }, []);

    const saveToStorage = (data: FieldTask[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setTasks(data);
    };

    const updateTask = useCallback((updatedItem: FieldTask) => {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        const updated = current.map((item: FieldTask) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        saveToStorage(updated);
    }, []);

    return {
        tasks,
        isLoading,
        updateTask
    };
}
