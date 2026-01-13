"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <label className={cn(
        "relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-outline cursor-pointer overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        checked ? "bg-primary border-primary text-on-primary" : "bg-surface hover:bg-surface-variant/20",
        disabled && "cursor-not-allowed opacity-50 bg-surface-variant/10",
        className
      )}>
        <input
          type="checkbox"
          className="peer sr-only"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        <Check
            className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                checked ? "scale-100" : "scale-0"
            )}
            strokeWidth={3}
        />
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
