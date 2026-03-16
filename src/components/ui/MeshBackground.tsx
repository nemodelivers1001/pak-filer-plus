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
    subtle: "bg-gradient-to-br from-[hsl(150,25%,36%)]/10 via-background to-[hsl(150,17%,58%)]/20",
    dark: "bg-gradient-to-br from-[hsl(150,71%,19%)] via-[hsl(150,25%,36%)] to-[hsl(150,71%,19%)]",
    vibrant: "bg-gradient-to-br from-[hsl(150,71%,19%)]/20 via-[hsl(150,17%,58%)]/10 to-[hsl(150,25%,36%)]/20",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {/* Animated gradient orbs */}
      {animated && (
        <>
          <motion.div
            className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[hsl(150,71%,19%)]/30 to-[hsl(150,25%,36%)]/10 blur-[120px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-[hsl(150,17%,58%)]/40 to-[hsl(150,25%,81%)]/20 blur-[100px]"
            animate={{
              x: [0, -70, 0],
              y: [0, -100, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[hsl(150,25%,36%)]/20 to-[hsl(150,71%,19%)]/10 blur-[90px]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 20,
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
