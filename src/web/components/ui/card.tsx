import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'filled' | 'outlined' | 'bento';
    interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', interactive = false, ...props }, ref) => {
        const variants = {
            default: "bg-surface-container-low border border-outline-variant/10 rounded-[var(--radius-lg)]",
            elevated: "bg-surface shadow-md rounded-[var(--radius-lg)]",
            filled: "bg-surface-container-highest rounded-[var(--radius-lg)]",
            outlined: "bg-surface border border-outline-variant rounded-[var(--radius-lg)]",
            bento: "m3-bento-card",
        };

        const interactiveStyles = interactive
            ? {
                  default: "cursor-pointer transition-all duration-300 hover:shadow-md",
                  elevated: "cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-on-surface/10",
                  filled: "cursor-pointer transition-all duration-300 hover:brightness-95 dark:hover:brightness-110 hover:shadow-sm",
                  outlined: "cursor-pointer transition-all duration-300 hover:bg-surface-container-low",
                  bento: "cursor-pointer transition-all duration-300 hover:shadow-md",
              }
            : {};

        return (
            <div
                ref={ref}
                className={cn(
                    variants[variant],
                    interactive && interactiveStyles[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={cn("text-2xl font-bold leading-none tracking-tight text-on-surface", className)} {...props} />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn("text-sm text-on-surface-variant font-medium", className)} {...props} />
    )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
