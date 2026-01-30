'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/routing';
import { Button } from '@/web/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    totalPages: number;
    className?: string;
}

export function Pagination({ totalPages, className }: PaginationProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        // router.push automatically handles the locale prefix
        router.push(`${pathname}?${params.toString()}`);
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        // Always show first, last, current, and one around current
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Button
                variant="outlined"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous Page"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                    <Button
                        key={index}
                        variant={currentPage === page ? 'filled' : 'text'}
                        size="icon"
                        onClick={() => handlePageChange(page)}
                        className="w-10"
                    >
                        {page}
                    </Button>
                ) : (
                    <span key={index} className="px-1 text-on-surface-variant select-none">...</span>
                )
            ))}

            <Button
                variant="outlined"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Next Page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
