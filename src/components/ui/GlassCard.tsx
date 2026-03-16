import { forwardRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover, fadeInUp } from "@/lib/animations";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "elevated" | "gradient" | "bordered" | "spotlight";
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
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const baseClasses = cn(
      "rounded-2xl overflow-hidden",
      "backdrop-blur-xl",
      "transition-all duration-500 ease-out"
    );

    const variantClasses = {
      default: cn("bg-[#020b06]/60 backdrop-blur-2xl border border-[#FCD34D]/20 shadow-[inset_0_0_80px_rgba(14,85,47,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"),
      elevated: cn("bg-[#051a0f]/80 backdrop-blur-3xl border border-[#FCD34D]/30 shadow-[inset_0_0_100px_rgba(14,85,47,0.4)] shadow-[0_30px_60px_rgba(0,0,0,0.6)]"),
      gradient: cn("bg-gradient-to-br from-[#0E552F]/40 to-[#020b06]/80 backdrop-blur-2xl border border-[#FCD34D]/20"),
      bordered: cn("bg-black/40 backdrop-blur-xl border-2 border-[#FCD34D]/30"),
      spotlight: cn("spotlight-card relative bg-[#020b06]/80 backdrop-blur-2xl border border-[#FCD34D]/20 overflow-hidden shadow-[inset_0_0_100px_rgba(14,85,47,0.2)]"),
    };

    const interactiveClasses = interactive
      ? "cursor-pointer hover:shadow-xl hover:border-accent/40"
      : "";

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (variant !== 'spotlight') return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });

      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], interactiveClasses, className)}
        variants={interactive ? cardHover : animate ? fadeInUp : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        whileHover={interactive ? "hover" : undefined}
        whileTap={interactive ? "tap" : undefined}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {variant === 'spotlight' && (
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(252, 211, 77, 0.08), transparent 40%)`, // Gold spotlight
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
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
