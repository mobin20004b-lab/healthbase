"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <label className="relative flex items-center p-0.5 cursor-pointer isolate group">
    <input
        type="checkbox"
        className="peer sr-only"
        ref={ref}
        {...props}
    />
    <div className={cn(
        "h-5 w-5 shrink-0 rounded-sm border-2 border-outline transition-all duration-200 ease-in-out flex items-center justify-center",
        "peer-checked:bg-primary peer-checked:border-primary",
        "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "group-hover:border-primary group-hover:bg-primary/5",
        className
    )}>
         <Check className="h-3.5 w-3.5 text-on-primary opacity-0 peer-checked:opacity-100 transition-opacity duration-200" strokeWidth={3} />
    </div>
  </label>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
