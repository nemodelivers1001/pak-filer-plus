import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MeshBackgroundProps {
  variant?: "default" | "hero" | "subtle" | "dark";
  className?: string;
  animated?: boolean;
  children?: React.ReactNode;
}

export function MeshBackground({ 
  variant = "default", 
  className,
  animated = false,
  children 
}: MeshBackgroundProps) {
  const baseClasses = "relative overflow-hidden";
  
  const variantClasses = {
    default: "mesh-bg",
    hero: "mesh-bg-hero text-primary-foreground",
    subtle: "bg-gradient-to-br from-soft/30 via-background to-accent/20",
    dark: "bg-gradient-to-br from-primary via-secondary to-primary",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {/* Animated gradient orbs */}
      {animated && (
        <>
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-accent/30 to-transparent blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tl from-soft/40 to-transparent blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-gradient-to-br from-secondary/20 to-transparent blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default MeshBackground;
