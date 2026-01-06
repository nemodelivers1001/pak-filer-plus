import { motion } from 'framer-motion';
import { Check, Clock, CreditCard, FileCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FilingStatus = 
  | 'pending_payment'
  | 'pending_verification'
  | 'payment_verified'
  | 'in_processing'
  | 'completed';

interface StatusStep {
  id: FilingStatus;
  label: string;
  icon: React.ElementType;
}

const statusSteps: StatusStep[] = [
  { id: 'pending_payment', label: 'Pending Payment', icon: CreditCard },
  { id: 'pending_verification', label: 'Payment Verification', icon: Clock },
  { id: 'payment_verified', label: 'Payment Verified', icon: FileCheck },
  { id: 'in_processing', label: 'In Processing', icon: Loader2 },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
];

interface StatusTimelineProps {
  currentStatus: FilingStatus;
  compact?: boolean;
}

const getStatusIndex = (status: FilingStatus): number => {
  return statusSteps.findIndex(s => s.id === status);
};

export const StatusTimeline = ({ currentStatus, compact = false }: StatusTimelineProps) => {
  const currentIndex = getStatusIndex(currentStatus);

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <motion.div
              key={step.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-300",
                isCompleted && "bg-primary",
                isCurrent && "bg-primary animate-pulse",
                !isCompleted && !isCurrent && "bg-muted-foreground/30"
              )}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-muted" />
      <motion.div 
        className="absolute left-4 top-4 w-0.5 bg-primary origin-top"
        initial={{ height: 0 }}
        animate={{ height: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <div className="space-y-4">
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 relative"
            >
              {/* Icon circle */}
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className={cn("w-4 h-4", isCurrent && step.id === 'in_processing' && "animate-spin")} />
                )}
              </motion.div>

              {/* Label */}
              <span className={cn(
                "text-sm font-medium transition-colors duration-300",
                isCompleted && "text-foreground",
                isCurrent && "text-primary",
                !isCompleted && !isCurrent && "text-muted-foreground"
              )}>
                {step.label}
              </span>

              {/* Current indicator */}
              {isCurrent && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                >
                  Current
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const getStatusLabel = (status: FilingStatus): string => {
  return statusSteps.find(s => s.id === status)?.label || status;
};

export const getStatusColor = (status: FilingStatus): string => {
  switch (status) {
    case 'pending_payment':
      return 'text-amber-500';
    case 'pending_verification':
      return 'text-orange-500';
    case 'payment_verified':
      return 'text-blue-500';
    case 'in_processing':
      return 'text-purple-500';
    case 'completed':
      return 'text-emerald-500';
    default:
      return 'text-muted-foreground';
  }
};

export default StatusTimeline;
