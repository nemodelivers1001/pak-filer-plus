import { motion } from "framer-motion";
import { CheckCircle2, PartyPopper, Trophy, Star, Rocket } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";

interface MilestoneCelebrationProps {
  milestone: 25 | 50 | 75 | 100;
  onContinue: () => void;
}

const milestoneConfig = {
  25: {
    icon: Star,
    title: "Great Start! 🌟",
    message: "You've completed 25% of your tax filing. Keep up the momentum!",
    color: "text-amber-500",
    bgColor: "bg-amber-500/20",
  },
  50: {
    icon: Trophy,
    title: "Halfway There! 🏆",
    message: "Amazing progress! You're 50% done with your tax return.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  75: {
    icon: Rocket,
    title: "Almost Done! 🚀",
    message: "Incredible! Just a bit more to complete your filing.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
  },
  100: {
    icon: PartyPopper,
    title: "Congratulations! 🎉",
    message: "You've completed all sections! Ready to submit to FBR.",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
};

export function MilestoneCelebration({ milestone, onContinue }: MilestoneCelebrationProps) {
  const config = milestoneConfig[milestone];
  const Icon = config.icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Confetti-like particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#0E552F', '#45745B', '#82A492', '#C5DACF', '#FFD700'][i % 5],
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
              y: '100vh',
              opacity: 0,
              rotate: Math.random() * 720 - 360,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative max-w-md w-full mx-4 bg-card border border-border rounded-2xl p-8 shadow-2xl text-center"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
      >
        {/* Icon */}
        <motion.div
          className={`w-20 h-20 mx-auto mb-6 rounded-full ${config.bgColor} flex items-center justify-center`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Icon className={`w-10 h-10 ${config.color}`} />
          </motion.div>
        </motion.div>

        {/* Progress Ring */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={251.2}
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * milestone) / 100 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{milestone}%</span>
          </div>
        </motion.div>

        {/* Title & Message */}
        <motion.h2
          className="text-2xl font-bold text-foreground mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {config.title}
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {config.message}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GradientButton
            variant="primary"
            size="lg"
            onClick={onContinue}
            icon={milestone === 100 ? <CheckCircle2 className="h-5 w-5" /> : undefined}
          >
            {milestone === 100 ? 'Proceed to Submit' : 'Continue Filing'}
          </GradientButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default MilestoneCelebration;
