import { forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonPress } from "@/lib/animations";

interface GradientButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: ReactNode;
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      type = "button",
      onClick,
    },
    ref
  ) => {
    const baseClasses = cn(
      "relative inline-flex items-center justify-center gap-2 font-medium",
      "rounded-lg transition-all duration-300 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50"
    );

    const variantClasses = {
      primary: cn(
        "text-primary-foreground",
        "bg-gradient-to-r from-primary to-secondary",
        "hover:shadow-glow hover:brightness-110",
        "active:brightness-95"
      ),
      secondary: cn(
        "text-primary",
        "bg-gradient-to-r from-soft to-accent/50",
        "hover:from-accent/60 hover:to-soft",
        "border border-accent/30"
      ),
      outline: cn(
        "text-primary bg-transparent",
        "border-2 border-primary/80",
        "hover:bg-primary/5 hover:border-primary"
      ),
      ghost: cn(
        "text-primary bg-transparent",
        "hover:bg-primary/10",
        "active:bg-primary/15"
      ),
    };

    const sizeClasses = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        variants={buttonPress}
        initial="rest"
        whileHover={disabled || loading ? undefined : "hover"}
        whileTap={disabled || loading ? undefined : "tap"}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}

        <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
