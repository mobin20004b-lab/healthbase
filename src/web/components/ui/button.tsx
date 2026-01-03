import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 m3-motion",
    {
        variants: {
            variant: {
                // M3 Standard Variants
                filled: "bg-primary text-on-primary shadow-sm hover:shadow-md hover:bg-primary/90 active:scale-95",
                tonal: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 hover:shadow-sm active:scale-95",
                outlined: "border border-outline bg-transparent text-primary hover:bg-primary/10 hover:border-primary active:scale-95",
                text: "bg-transparent text-primary hover:bg-primary/10 active:scale-95",
                elevated: "bg-surface-container-low text-primary shadow-md hover:bg-surface-container hover:shadow-lg active:scale-95",

                // Legacy / Compat Variants
                default: "bg-primary text-on-primary shadow-sm hover:shadow-md hover:bg-primary/90",
                secondary: "bg-secondary text-on-secondary shadow-sm hover:bg-secondary/90",
                tertiary: "bg-tertiary text-on-tertiary shadow-sm hover:bg-tertiary/90",
                outline: "border border-outline bg-transparent text-primary hover:bg-primary/10 hover:border-primary", // Alias for outlined
                ghost: "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                destructive: "bg-error text-on-error hover:bg-error/90",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-14 rounded-2xl px-8 text-base",
                icon: "h-10 w-10 rounded-full",
            },
            morph: {
                true: "hover:[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] active:[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]",
                false: ""
            }
        },
        defaultVariants: {
            variant: "filled",
            size: "default",
            morph: false,
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isMorphing?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isMorphing = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, morph: isMorphing, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
