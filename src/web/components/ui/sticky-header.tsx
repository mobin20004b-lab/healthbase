import * as React from "react"
import { cn } from "@/lib/utils"

interface StickyHeaderProps extends React.HTMLAttributes<HTMLHeaderElement> {
  children: React.ReactNode
}

const StickyHeader = React.forwardRef<HTMLHeaderElement, StickyHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-outline-variant/20 bg-background/70 backdrop-blur-md",
          "supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
            {children}
        </div>
      </header>
    )
  }
)
StickyHeader.displayName = "StickyHeader"

export { StickyHeader }
