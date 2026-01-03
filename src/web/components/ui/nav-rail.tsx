import * as React from "react"
import { cn } from "@/lib/utils"

interface NavigationRailProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

const NavigationRail = React.forwardRef<HTMLDivElement, NavigationRailProps>(
  ({ className, children, header, footer, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "sticky top-0 z-30 flex h-screen w-20 flex-col items-center border-r border-outline-variant/10 bg-surface/80 py-4 backdrop-blur-md transition-all",
          "rtl:border-l rtl:border-r-0",
          className
        )}
        {...props}
      >
        {header && <div className="mb-4">{header}</div>}
        <div className="flex w-full flex-1 flex-col items-center gap-3 space-y-4">
          {children}
        </div>
        {footer && <div className="mt-auto pb-4">{footer}</div>}
      </nav>
    )
  }
)
NavigationRail.displayName = "NavigationRail"

interface NavigationRailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label?: string
  active?: boolean
}

const NavigationRailItem = React.forwardRef<HTMLButtonElement, NavigationRailItemProps>(
  ({ className, icon, label, active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group flex flex-col items-center justify-center gap-1 p-1 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-300 m3-motion",
            active
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-transparent text-on-surface-variant group-hover:bg-surface-container-high"
          )}
        >
          <span className="[&_svg]:size-6">{icon}</span>
        </div>
        {label && (
          <span
            className={cn(
              "text-xs font-medium transition-colors duration-300",
              active ? "text-on-surface" : "text-on-surface-variant"
            )}
          >
            {label}
          </span>
        )}
      </button>
    )
  }
)
NavigationRailItem.displayName = "NavigationRailItem"

export { NavigationRail, NavigationRailItem }
