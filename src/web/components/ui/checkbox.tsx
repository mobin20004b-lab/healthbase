"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative inline-flex items-center justify-center align-middle w-4 h-4">
      <input
        type="checkbox"
        className="peer absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10 m-0"
        ref={ref}
        {...props}
      />
      <div className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary shadow-sm bg-background pointer-events-none",
        "peer-focus-visible:outline-none peer-focus-visible:ring-1 peer-focus-visible:ring-ring",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "peer-checked:bg-primary peer-checked:text-on-primary",
        "transition-colors duration-200",
        "peer-checked:[&>svg]:block",
        className
      )}>
        <Check className="h-3 w-3 hidden" strokeWidth={3} />
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
