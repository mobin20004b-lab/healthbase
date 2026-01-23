"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, id }, ref) => {
    return (
      <label className={cn("relative inline-flex items-center cursor-pointer", disabled && "cursor-not-allowed opacity-50")}>
        <input
          type="checkbox"
          id={id}
          className="peer sr-only"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded border-2 border-outline transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            checked ? "bg-primary border-primary text-on-primary" : "bg-transparent hover:bg-surface-variant/30",
            className
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
        </div>
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
