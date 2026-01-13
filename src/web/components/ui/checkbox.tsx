"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(event.target.checked)
      onChange?.(event)
    }

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer h-5 w-5 opacity-0 absolute cursor-pointer z-10"
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div className={cn(
          "h-5 w-5 shrink-0 rounded-sm border border-primary ring-offset-background",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "peer-checked:bg-primary peer-checked:text-primary-foreground",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "flex items-center justify-center transition-colors duration-200",
          className
        )}>
           <Check className="h-3.5 w-3.5 hidden peer-checked:block text-on-primary" strokeWidth={3} />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
