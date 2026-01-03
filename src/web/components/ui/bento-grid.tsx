import { cn } from "@/lib/utils";
import React from "react";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
}

export function BentoItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  ...props
}: BentoItemProps) {
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  };

  const rowSpanClass = {
    1: "md:row-span-1",
    2: "md:row-span-2",
  };

  return (
    <div
      className={cn(
        "bg-surface-container rounded-3xl p-6 relative overflow-hidden group",
        "border border-outline-variant/20 shadow-sm transition-all duration-300",
        "hover:shadow-md hover:border-outline-variant/40",
        colSpanClass[colSpan],
        rowSpanClass[rowSpan],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
