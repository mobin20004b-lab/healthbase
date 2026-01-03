import React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BentoGrid = ({
  className,
  children,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
}

export const BentoItem = ({
  className,
  children,
  colSpan = 1,
  rowSpan = 1,
  ...props
}: BentoItemProps) => {
  // Map colSpan/rowSpan numbers to tailwind classes
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan];

  const rowSpanClass = {
    1: "md:row-span-1",
    2: "md:row-span-2",
    3: "md:row-span-3",
    4: "md:row-span-4",
  }[rowSpan];

  return (
    <div
      className={cn(
        "col-span-1", // Default to col-span-1 on mobile
        colSpanClass,
        rowSpanClass,
        "rounded-3xl border border-outline-variant/40 bg-surface-container-low p-6 overflow-hidden relative", // Default bento card styling
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
