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
            elevated: "bg-surface shadow-md text-on-surface rounded-[var(--radius-lg)]",
            filled: "bg-surface-container-highest rounded-[var(--radius-lg)]",
            outlined: "bg-surface border border-outline-variant rounded-[var(--radius-lg)]",
            bento: "m3-bento-card",
        };

        // Specific interactive overrides per variant if needed
        const variantInteractiveStyles = {
            default: interactive ? "hover:shadow-md" : "",
            elevated: interactive ? "hover:shadow-lg" : "",
            filled: interactive ? "hover:bg-surface-container-high" : "",
            outlined: interactive ? "hover:bg-surface-container-highest/10" : "",
            bento: interactive ? "hover:scale-[1.01] hover:shadow-md" : "",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    variants[variant],
                    interactive && "m3-motion cursor-pointer",
                    variantInteractiveStyles[variant],
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
