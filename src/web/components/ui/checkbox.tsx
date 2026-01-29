"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative flex items-center justify-center w-4 h-4">
        <input
            type="checkbox"
            ref={ref}
            className={cn(
                "peer h-4 w-4 shrink-0 rounded-sm border border-outline text-primary ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-primary checked:border-primary",
                className
            )}
            {...props}
        />
        <Check className="absolute h-3 w-3 text-on-primary opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
    </div>
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
