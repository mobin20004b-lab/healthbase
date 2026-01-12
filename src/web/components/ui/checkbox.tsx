"use client";

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(event.target.checked);
    };

    return (
      <div className="relative inline-flex items-center justify-center w-11 h-11"> {/* 44px touch target */}
        <input
          type="checkbox"
          className="peer absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "flex items-center justify-center w-[18px] h-[18px] rounded-sm border-2 border-on-surface-variant transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            "peer-checked:bg-primary peer-checked:border-primary",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
             className
          )}
        >
          {checked && (
             <Check className="h-3.5 w-3.5 text-on-primary" strokeWidth={3} />
          )}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
