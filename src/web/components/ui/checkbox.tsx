"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="relative inline-flex items-center justify-center w-5 h-5 align-middle">
        <input
          type="checkbox"
          className="peer absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 rounded-sm border-2 border-outline transition-all flex items-center justify-center bg-surface",
            "peer-checked:bg-primary peer-checked:border-primary",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:bg-surface-variant",
            "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
            className
          )}
        >
          <Check className="h-3.5 w-3.5 text-on-primary pointer-events-none transition-opacity duration-200" strokeWidth={3} />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
