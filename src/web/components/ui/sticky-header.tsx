import * as React from "react"
import { cn } from "@/lib/utils"

export type StickyHeaderProps = React.HTMLAttributes<HTMLElement>

export function StickyHeader({ className, children, ...props }: StickyHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-outline-variant/20 transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {children}
      </div>
    </header>
  )
}
