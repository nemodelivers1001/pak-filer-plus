import { forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonPress } from "@/lib/animations";

interface GradientButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
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
      "rounded-full transition-all duration-300 ease-out", // Rounded-full for Golden Touch
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50"
    );

    const variantClasses = {
      // Golden Primary Variant
      primary: cn(
        "text-[#0E552F]", // Dark Green Text for contrast on Gold
        "bg-gradient-to-r from-[#FCD34D] to-[#fbbf24]", // Gold Gradient
        "border border-[#FCD34D]/50",
        "hover:shadow-[0_0_20px_rgba(252,211,77,0.5)] hover:brightness-110",
        "active:brightness-95 overflow-hidden group font-bold"
      ),
      secondary: cn(
        "text-white",
        "bg-white/10 hover:bg-white/20",
        "border border-white/20"
      ),
      outline: cn(
        "text-white bg-transparent",
        "border-2 border-white/20",
        "hover:bg-white/5 hover:border-[#FCD34D]/50 hover:text-[#FCD34D]"
      ),
      ghost: cn(
        "text-white/70 bg-transparent",
        "hover:bg-white/5 hover:text-[#FCD34D]"
      ),
      danger: cn(
        "text-white",
        "bg-gradient-to-r from-red-500 to-red-600",
        "hover:shadow-lg hover:shadow-red-500/25"
      )
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

        <span className={cn("flex items-center gap-2 relative z-10", loading && "opacity-0")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>

        {/* Shine Effect Overlay */}
        {variant === 'primary' && !disabled && !loading && (
          <div className="absolute inset-0 -translate-x-[100%] group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
        )}
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
