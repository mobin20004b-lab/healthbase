"use client";

import { Button } from "@/web/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationSimpleProps {
    currentPage: number;
    totalPages: number;
    className?: string;
}

export function PaginationSimple({ currentPage, totalPages, className }: PaginationSimpleProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`flex items-center justify-center gap-4 ${className}`}>
            <Button
                variant="outlined"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </Button>

            <span className="text-sm font-medium text-on-surface">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="outlined"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
        </div>
    );
}
