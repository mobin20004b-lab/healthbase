import * as React from "react"
import { cn } from "@/lib/utils"

interface BottomNavProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const BottomNav = React.forwardRef<HTMLDivElement, BottomNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full items-center justify-around border-t border-outline-variant/10 bg-surface/80 px-2 backdrop-blur-md md:hidden",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    )
  }
)
BottomNav.displayName = "BottomNav"

interface BottomNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  active?: boolean
}

const BottomNavItem = React.forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({ className, icon, label, active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group flex flex-1 flex-col items-center justify-center gap-1 p-1 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative flex h-8 w-16 items-center justify-center rounded-full transition-colors duration-300 m3-motion",
            active
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-transparent text-on-surface-variant group-hover:bg-surface-container-high"
          )}
        >
          <span className="[&_svg]:size-6">{icon}</span>
        </div>
        <span
          className={cn(
            "text-xs font-medium transition-colors duration-300",
            active ? "text-on-surface" : "text-on-surface-variant"
          )}
        >
          {label}
        </span>
      </button>
    )
  }
)
BottomNavItem.displayName = "BottomNavItem"

export { BottomNav, BottomNavItem }
