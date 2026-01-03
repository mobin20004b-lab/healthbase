import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "grid grid-cols-1 md:grid-cols-4 gap-4",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
BentoGrid.displayName = "BentoGrid";

interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3;
}

const BentoItem = React.forwardRef<HTMLDivElement, BentoItemProps>(
    ({ className, children, colSpan = 1, rowSpan = 1, ...props }, ref) => {
        const colSpanClass = {
            1: "col-span-1",
            2: "md:col-span-2 col-span-1",
            3: "md:col-span-3 col-span-1",
            4: "md:col-span-4 col-span-1",
        };

        const rowSpanClass = {
            1: "row-span-1",
            2: "row-span-2",
            3: "row-span-3",
        };

        return (
            <Card
                ref={ref}
                variant="bento"
                className={cn(
                    colSpanClass[colSpan],
                    rowSpanClass[rowSpan],
                    "h-full w-full",
                    className
                )}
                {...props}
            >
                {children}
            </Card>
        );
    }
);
BentoItem.displayName = "BentoItem";

export { BentoGrid, BentoItem };
