"use client";

import React from "react";
import { Link } from "@/routing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/web/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    basePath: string; // e.g., "/search" or "/clinics"
    className?: string;
}

export function Pagination({
    totalPages,
    currentPage,
    basePath,
    className,
}: PaginationProps) {
    const searchParams = useSearchParams();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        return `${basePath}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center gap-2 mt-8", className)}>
            {/* Previous Button */}
            <Link
                href={createPageUrl(currentPage - 1)}
                className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    currentPage <= 1 && "pointer-events-none opacity-50"
                )}
                aria-disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isCurrent = page === currentPage;
                    // Simple logic: show all for now, or could implement "..." logic
                    // limiting to 5 pages for MVP simplicity if total > 7
                     if (totalPages > 7) {
                        if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                             return (
                                <Link
                                    key={page}
                                    href={createPageUrl(page)}
                                    className={cn(
                                        buttonVariants({
                                            variant: isCurrent ? "filled" : "ghost",
                                            size: "sm",
                                        }),
                                        "w-8 h-8 p-0"
                                    )}
                                >
                                    {page}
                                </Link>
                            );
                        }
                         if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                        ) {
                            return <span key={page} className="text-on-surface-variant">...</span>;
                        }
                        return null;
                     }

                    return (
                        <Link
                            key={page}
                            href={createPageUrl(page)}
                            className={cn(
                                buttonVariants({
                                    variant: isCurrent ? "filled" : "ghost",
                                    size: "sm",
                                }),
                                "w-8 h-8 p-0"
                            )}
                        >
                            {page}
                        </Link>
                    );
                })}
            </div>

            {/* Next Button */}
            <Link
                href={createPageUrl(currentPage + 1)}
                className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    currentPage >= totalPages && "pointer-events-none opacity-50"
                )}
                aria-disabled={currentPage >= totalPages}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
            </Link>
        </div>
    );
}
