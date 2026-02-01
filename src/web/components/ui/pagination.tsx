"use client"

import * as React from "react"
import { Link } from "@/routing"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/web/components/ui/button"

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
    totalPages: number
    currentPage: number
}

const Pagination = ({ className, totalPages, currentPage, ...props }: PaginationProps) => {
    const searchParams = useSearchParams()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", pageNumber.toString())
        // Ensure we keep the current pathname implicitly by just returning query string
        // Link from @/routing handles relative paths properly
        return `?${params.toString()}`
    }

    // Helper to render page numbers
    const renderPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        if (startPage > 1) {
            pages.push(
                <PaginationLink key={1} href={createPageURL(1)} isActive={currentPage === 1}>
                    1
                </PaginationLink>
            )
            if (startPage > 2) {
                pages.push(<PaginationEllipsis key="ellipsis-start" />)
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PaginationLink key={i} href={createPageURL(i)} isActive={currentPage === i}>
                    {i}
                </PaginationLink>
            )
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<PaginationEllipsis key="ellipsis-end" />)
            }
            pages.push(
                <PaginationLink key={totalPages} href={createPageURL(totalPages)} isActive={currentPage === totalPages}>
                    {totalPages}
                </PaginationLink>
            )
        }

        return pages
    }

    if (totalPages <= 1) return null;

    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn("mx-auto flex w-full justify-center gap-1", className)}
            {...props}
        >
            <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                disabled={currentPage <= 1}
            />
            {renderPageNumbers()}
            <PaginationNext
                href={createPageURL(currentPage + 1)}
                disabled={currentPage >= totalPages}
            />
        </nav>
    )
}

interface PaginationLinkProps extends React.ComponentProps<typeof Link> {
    isActive?: boolean
    disabled?: boolean
}

const PaginationLink = ({
    className,
    isActive,
    disabled,
    ...props
}: PaginationLinkProps) => (
    <Link
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "filled" : "ghost",
                size: "icon",
            }),
            disabled && "pointer-events-none opacity-50",
            className
        )}
        {...props}
    />
)

const PaginationPrevious = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 pl-2.5", className)}
        disabled={disabled}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
)

const PaginationNext = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 pr-2.5", className)}
        disabled={disabled}
        {...props}
    >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
)

const PaginationEllipsis = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
)

export {
    Pagination,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
}
