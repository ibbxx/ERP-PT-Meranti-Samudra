"use client";

import { ReactNode } from "react";

type Column<T> = {
    header: string;
    accessor: (item: T) => ReactNode;
    className?: string; // for width or alignment
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
};

export default function Table<T>({
    data,
    columns,
    keyExtractor,
    emptyMessage = "No data found.",
    onRowClick
}: TableProps<T>) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-ink/5 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-ink/5 bg-sand/20 text-xs font-bold uppercase tracking-wider text-ink/50">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className={`px-4 py-3 sm:px-6 sm:py-4 ${col.className ?? ""}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                        {data.map((item) => (
                            <tr
                                key={keyExtractor(item)}
                                onClick={() => onRowClick && onRowClick(item)}
                                className={`group transition-colors ${onRowClick ? "cursor-pointer hover:bg-ink/5" : ""}`}
                            >
                                {columns.map((col, i) => (
                                    <td key={i} className={`px-4 py-3 sm:px-6 sm:py-4 align-top ${col.className ?? ""}`}>
                                        {col.accessor(item)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-8 sm:px-6 sm:py-12 text-center text-ink/40">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
