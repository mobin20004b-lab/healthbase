import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-primary text-on-primary shadow-lg shadow-primary/20 hover:opacity-90",
                secondary: "bg-secondary text-on-secondary shadow-lg shadow-secondary/15 hover:opacity-90",
                tertiary: "bg-tertiary text-on-tertiary shadow-lg shadow-tertiary/15 hover:opacity-90",
                outline: "border border-outline-variant bg-background text-on-surface hover:bg-surface-container-low hover:border-primary/30",
                ghost: "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                tonal: "bg-primary-container text-on-primary-container hover:bg-primary-container/80",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-lg px-4",
                lg: "h-14 rounded-2xl px-10 text-base",
                icon: "h-11 w-11 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
