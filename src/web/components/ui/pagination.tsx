'use client';

import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '@/routing';
import { buttonVariants } from '@/web/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    className?: string;
}

export function Pagination({ currentPage, totalPages, className }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Link
                href={createPageURL(1)}
                className={cn(buttonVariants({ variant: "outlined", size: "icon" }), currentPage <= 1 && "pointer-events-none opacity-50")}
                aria-disabled={currentPage <= 1}
            >
                <ChevronsLeft className="h-4 w-4" />
            </Link>
            <Link
                href={createPageURL(currentPage - 1)}
                className={cn(buttonVariants({ variant: "outlined", size: "icon" }), currentPage <= 1 && "pointer-events-none opacity-50")}
                aria-disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-1 mx-2 text-sm font-medium text-on-surface">
                <span>Page {currentPage} of {totalPages}</span>
            </div>

            <Link
                href={createPageURL(currentPage + 1)}
                className={cn(buttonVariants({ variant: "outlined", size: "icon" }), currentPage >= totalPages && "pointer-events-none opacity-50")}
                aria-disabled={currentPage >= totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
                href={createPageURL(totalPages)}
                className={cn(buttonVariants({ variant: "outlined", size: "icon" }), currentPage >= totalPages && "pointer-events-none opacity-50")}
                aria-disabled={currentPage >= totalPages}
            >
                <ChevronsRight className="h-4 w-4" />
            </Link>
        </div>
    );
}
