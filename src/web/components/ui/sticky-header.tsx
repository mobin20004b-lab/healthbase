import * as React from "react"
import { cn } from "@/lib/utils"

interface StickyHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const StickyHeader = React.forwardRef<HTMLDivElement, StickyHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 flex w-full items-center justify-between border-b border-outline-variant/20 bg-background/70 px-6 py-4 backdrop-blur-md transition-all",
          className
        )}
        {...props}
      >
        {children}
      </header>
    )
  }
)
StickyHeader.displayName = "StickyHeader"

export { StickyHeader }
