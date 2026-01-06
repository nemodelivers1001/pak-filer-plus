import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover, fadeInUp } from "@/lib/animations";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "elevated" | "gradient" | "bordered";
  interactive?: boolean;
  animate?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { 
      className, 
      variant = "default", 
      interactive = false,
      animate = true,
      children, 
      ...props 
    },
    ref
  ) => {
    const baseClasses = cn(
      "rounded-xl overflow-hidden",
      "backdrop-blur-md",
      "transition-colors duration-300"
    );

    const variantClasses = {
      default: cn(
        "bg-card/80 border border-border/50",
        "shadow-md"
      ),
      elevated: cn(
        "bg-card/90 border border-border/30",
        "shadow-xl"
      ),
      gradient: cn(
        "bg-gradient-to-br from-card via-card/90 to-soft/30",
        "border border-accent/20",
        "shadow-lg"
      ),
      bordered: cn(
        "bg-card/70 gradient-border",
        "shadow-md"
      ),
    };

    const interactiveClasses = interactive
      ? "cursor-pointer hover:shadow-xl hover:border-accent/40"
      : "";

    return (
      <motion.div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], interactiveClasses, className)}
        variants={interactive ? cardHover : animate ? fadeInUp : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        whileHover={interactive ? "hover" : undefined}
        whileTap={interactive ? "tap" : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

// Sub-components for GlassCard
export const GlassCardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
GlassCardHeader.displayName = "GlassCardHeader";

export const GlassCardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  />
));
GlassCardTitle.displayName = "GlassCardTitle";

export const GlassCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
GlassCardDescription.displayName = "GlassCardDescription";

export const GlassCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
GlassCardContent.displayName = "GlassCardContent";

export const GlassCardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
GlassCardFooter.displayName = "GlassCardFooter";

export default GlassCard;
