import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  variant?: "default" | "gradient" | "striped";
}

export function ProgressBar({
  progress,
  className,
  showLabel = false,
  size = "md",
  animated = true,
  variant = "gradient",
}: ProgressBarProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const variantClasses = {
    default: "bg-primary",
    gradient: "bg-gradient-to-r from-primary via-secondary to-accent",
    striped: cn(
      "bg-gradient-to-r from-primary via-secondary to-primary",
      "bg-[length:20px_100%] animate-[shimmer_1s_linear_infinite]"
    ),
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(normalizedProgress)}%
          </span>
        </div>
      )}
      
      <div className={cn("w-full bg-muted/50 rounded-full overflow-hidden", sizeClasses[size])}>
        <motion.div
          className={cn("h-full rounded-full", variantClasses[variant])}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${normalizedProgress}%` }}
          transition={{ 
            duration: animated ? 0.8 : 0, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
