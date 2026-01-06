import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Star, Trophy, PartyPopper } from "lucide-react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
}

interface CelebrationProps {
  show: boolean;
  type?: "confetti" | "checkmark" | "trophy" | "stars";
  message?: string;
  subMessage?: string;
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

const CONFETTI_COLORS = [
  "hsl(150, 71%, 19%)",  // Primary
  "hsl(150, 25%, 36%)",  // Secondary
  "hsl(150, 17%, 58%)",  // Accent
  "hsl(150, 25%, 81%)",  // Soft
  "hsl(45, 93%, 58%)",   // Gold
  "hsl(200, 80%, 50%)",  // Blue
];

export function Celebration({
  show,
  type = "confetti",
  message,
  subMessage,
  duration = 3000,
  onComplete,
  className,
}: CelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show && type === "confetti") {
      const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));
      setConfetti(pieces);
    }
  }, [show, type]);

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  const renderIcon = () => {
    const iconProps = { className: "w-16 h-16 text-primary" };
    
    switch (type) {
      case "checkmark":
        return <Check {...iconProps} />;
      case "trophy":
        return <Trophy {...iconProps} />;
      case "stars":
        return <Star {...iconProps} />;
      default:
        return <PartyPopper {...iconProps} />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti */}
          {type === "confetti" && (
            <div className="absolute inset-0 overflow-hidden">
              {confetti.map((piece) => (
                <motion.div
                  key={piece.id}
                  className="absolute top-0 w-3 h-3 rounded-sm"
                  style={{
                    left: `${piece.x}%`,
                    backgroundColor: piece.color,
                    rotate: piece.rotation,
                  }}
                  initial={{ y: -20, opacity: 1 }}
                  animate={{
                    y: "100vh",
                    opacity: 0,
                    rotate: piece.rotation + 720,
                  }}
                  transition={{
                    duration: 3,
                    delay: piece.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Center content */}
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {/* Icon with glow */}
            <motion.div
              className="relative mb-4"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: 2,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150" />
              <div className="relative bg-soft/80 rounded-full p-6 backdrop-blur-sm">
                {renderIcon()}
              </div>
            </motion.div>

            {/* Message */}
            {message && (
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.h2>
            )}

            {subMessage && (
              <motion.p
                className="text-muted-foreground"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {subMessage}
              </motion.p>
            )}
          </motion.div>

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Celebration;
