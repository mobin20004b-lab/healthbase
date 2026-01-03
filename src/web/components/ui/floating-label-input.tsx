import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "filled" | "outlined";
  error?: boolean | string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, variant = "filled", error, type, id, ...props }, ref) => {
    // Generate a unique ID if one isn't provided, to link label and input
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const isError = !!error;

    // Base styles for both variants
    const baseInputStyles = "peer block w-full appearance-none focus:outline-none focus:ring-0";
    const baseLabelStyles = "absolute cursor-text duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-placeholder-shown:translate-x-0 rtl:origin-[100%_0%]";

    const variants = {
      filled: {
        container: "relative bg-surface-container-highest rounded-t-lg border-b border-on-surface-variant hover:bg-surface-container-high focus-within:border-primary transition-colors",
        input: cn(baseInputStyles, "bg-transparent px-2.5 pb-2.5 pt-5 text-on-surface border-0"),
        label: cn(baseLabelStyles, "start-2.5 text-on-surface-variant peer-focus:text-primary"),
      },
      outlined: {
        container: "relative bg-transparent rounded-lg border border-outline hover:border-on-surface focus-within:border-primary focus-within:border-2 transition-colors",
        input: cn(baseInputStyles, "bg-transparent px-2.5 pb-2.5 pt-4 text-on-surface border-0"),
        // Added -top-2 to position label on the border
        label: cn(baseLabelStyles, "-top-2 bg-surface start-1 px-1 text-xs text-on-surface-variant peer-focus:text-primary peer-focus:bg-surface peer-focus:px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2"),
      },
    };

    const variantStyles = variants[variant];

    // Error styling overrides
    const errorContainerStyles = isError
        ? variant === "filled"
            ? "border-error focus-within:border-error"
            : "border-error focus-within:border-error"
        : "";

    const errorLabelStyles = isError ? "text-error peer-focus:text-error" : "";

    return (
      <div className={cn(variantStyles.container, errorContainerStyles, className)}>
        <input
          type={type}
          id={inputId}
          className={cn(variantStyles.input)}
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(variantStyles.label, errorLabelStyles)}
        >
          {label}
        </label>
        {/* Optional helper text or error message could go here, but keeping it simple for now as per spec */}
      </div>
    );
  }
);
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
