"use client";

import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '@/routing';
import { Button } from "@/web/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    className?: string;
}

export function Pagination({ currentPage, totalPages, className }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Link
                href={createPageURL(currentPage - 1)}
                aria-disabled={currentPage <= 1}
                className={cn(
                    "pointer-events-auto",
                    currentPage <= 1 && "pointer-events-none opacity-50"
                )}
            >
                <Button variant="outlined" size="icon" disabled={currentPage <= 1}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>

            <span className="text-sm font-medium text-on-surface">
                Page {currentPage} of {totalPages}
            </span>

            <Link
                href={createPageURL(currentPage + 1)}
                aria-disabled={currentPage >= totalPages}
                className={cn(
                    "pointer-events-auto",
                    currentPage >= totalPages && "pointer-events-none opacity-50"
                )}
            >
                <Button variant="outlined" size="icon" disabled={currentPage >= totalPages}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </Link>
        </div>
    );
}
