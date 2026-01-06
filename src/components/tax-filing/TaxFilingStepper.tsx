import { motion, Variants } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Step } from "@/hooks/useTaxFiling";
import { useState } from "react";

const stepItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

const subStepVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};
interface TaxFilingStepperProps {
  steps: Step[];
  currentStepIndex: number;
  currentSubStepIndex: number;
  onStepClick: (stepIndex: number, subStepIndex?: number) => void;
  progressPercentage: number;
}

export function TaxFilingStepper({
  steps,
  currentStepIndex,
  currentSubStepIndex,
  onStepClick,
  progressPercentage,
}: TaxFilingStepperProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(currentStepIndex);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent || Icons.Circle;
  };

  const getStepStatus = (stepIndex: number) => {
    if (steps[stepIndex].completed) return "completed";
    if (stepIndex === currentStepIndex) return "current";
    if (stepIndex < currentStepIndex) return "passed";
    return "upcoming";
  };

  const getSubStepStatus = (stepIndex: number, subStepIndex: number) => {
    const subStep = steps[stepIndex].subSteps[subStepIndex];
    if (subStep.completed) return "completed";
    if (stepIndex === currentStepIndex && subStepIndex === currentSubStepIndex) return "current";
    if (stepIndex < currentStepIndex || (stepIndex === currentStepIndex && subStepIndex < currentSubStepIndex)) {
      return "passed";
    }
    return "upcoming";
  };

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium text-foreground">{progressPercentage}%</span>
        </div>
        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Steps */}
      <motion.div 
        className="space-y-2"
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, stepIndex) => {
          const Icon = getIcon(step.icon);
          const status = getStepStatus(stepIndex);
          const isExpanded = expandedStep === stepIndex;
          const hasSubSteps = step.subSteps.length > 1;

          return (
            <motion.div 
              key={step.id} 
              className="rounded-lg overflow-hidden"
              custom={stepIndex}
              variants={stepItemVariants}
            >
              {/* Step Header */}
              <motion.button
                className={cn(
                  "w-full flex items-center gap-3 p-3 text-left transition-all",
                  "rounded-lg border",
                  status === "current" && "bg-primary/5 border-primary/30",
                  status === "completed" && "bg-primary/5 border-primary/20",
                  status === "passed" && "bg-muted/30 border-border",
                  status === "upcoming" && "bg-background border-border opacity-60"
                )}
                onClick={() => {
                  if (hasSubSteps) {
                    setExpandedStep(isExpanded ? null : stepIndex);
                  }
                  if (status !== "upcoming") {
                    onStepClick(stepIndex, 0);
                  }
                }}
                whileHover={{ scale: status !== "upcoming" ? 1.01 : 1 }}
                whileTap={{ scale: status !== "upcoming" ? 0.99 : 1 }}
              >
                {/* Step Number/Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                  status === "completed" && "bg-primary text-primary-foreground",
                  status === "current" && "bg-primary/20 text-primary border-2 border-primary",
                  status === "passed" && "bg-muted text-muted-foreground",
                  status === "upcoming" && "bg-muted/50 text-muted-foreground"
                )}>
                  {status === "completed" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-medium text-sm",
                      status === "current" && "text-primary",
                      status === "completed" && "text-foreground",
                      status === "passed" && "text-foreground",
                      status === "upcoming" && "text-muted-foreground"
                    )}>
                      {step.title}
                    </span>
                    {status === "current" && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{step.description}</p>
                </div>

                {/* Sub-steps indicator */}
                {hasSubSteps && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {step.subSteps.filter(s => s.completed).length}/{step.subSteps.length}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                )}
              </motion.button>

              {/* Sub-steps */}
              {hasSubSteps && (
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-8 pr-3 py-2 space-y-1">
                    {step.subSteps.map((subStep, subStepIndex) => {
                      const subStatus = getSubStepStatus(stepIndex, subStepIndex);
                      
                      return (
                        <motion.button
                          key={subStep.id}
                          className={cn(
                            "w-full flex items-center gap-3 p-2 rounded-md text-left transition-all",
                            subStatus === "current" && "bg-primary/10",
                            subStatus !== "upcoming" && "hover:bg-muted/50"
                          )}
                          onClick={() => {
                            if (subStatus !== "upcoming") {
                              onStepClick(stepIndex, subStepIndex);
                            }
                          }}
                          disabled={subStatus === "upcoming"}
                        >
                          {/* Sub-step indicator */}
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                            subStatus === "completed" && "bg-primary border-primary",
                            subStatus === "current" && "border-primary bg-primary/10",
                            subStatus === "passed" && "bg-muted border-muted-foreground/30",
                            subStatus === "upcoming" && "border-muted-foreground/20"
                          )}>
                            {subStatus === "completed" && (
                              <Check className="h-3 w-3 text-primary-foreground" />
                            )}
                            {subStatus === "current" && (
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>

                          <span className={cn(
                            "text-sm",
                            subStatus === "current" && "text-primary font-medium",
                            subStatus === "completed" && "text-foreground",
                            subStatus === "passed" && "text-muted-foreground",
                            subStatus === "upcoming" && "text-muted-foreground/50"
                          )}>
                            {subStep.title}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default TaxFilingStepper;
