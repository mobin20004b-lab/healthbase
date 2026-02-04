"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <label className="relative flex items-center justify-center cursor-pointer group w-5 h-5 shrink-0">
    <input
      type="checkbox"
      className="peer sr-only"
      ref={ref}
      {...props}
    />
    <div className={cn(
      "absolute inset-0 rounded-md border-2 border-on-surface-variant/40 bg-transparent transition-all",
      "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
      "peer-checked:bg-primary peer-checked:border-primary",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className
    )} />
    <Check className="h-3.5 w-3.5 text-on-primary opacity-0 peer-checked:opacity-100 transition-opacity z-10 pointer-events-none" />
  </label>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
