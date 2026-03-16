import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Save, RotateCcw, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TaxFilingStepper } from "@/components/tax-filing/TaxFilingStepper";
import { StepForm } from "@/components/tax-filing/StepForm";
import { MilestoneCelebration } from "@/components/tax-filing/MilestoneCelebration";
import { SubmissionSuccess } from "@/components/tax-filing/SubmissionSuccess";
import { useTaxFiling } from "@/hooks/useTaxFiling";
import { fadeInUp } from "@/lib/animations";
import { HolographicLayout } from "@/components/tax-filing/layout/HolographicLayout";
import { HolographicJourneyMap } from "@/components/tax-filing/HolographicJourneyMap";
import { TaxGenie } from "@/components/tax-filing/gamification/TaxGenie";
import logo from "@/assets/pf-logo.png";

export default function TaxFiling() {
  const {
    state,
    currentStep,
    currentSubStep,
    currentStepIndex,
    currentSubStepIndex,
    progressPercentage,
    milestones,
    updateSubStepData,
    completeSubStep,
    goToNext,
    goToPrevious,
    goToStep,
    submitFiling,
    resetFiling,
    updateDashboardProgress,
    canGoNext,
    canGoPrevious,
    isLastStep,
    isSubmitted,
  } = useTaxFiling();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showMilestone, setShowMilestone] = useState<25 | 50 | 75 | 100 | null>(null);
  const [celebratedMilestones, setCelebratedMilestones] = useState<Set<number>>(new Set());

  // Update dashboard progress on step change
  useEffect(() => {
    updateDashboardProgress();
  }, [currentStepIndex, updateDashboardProgress]);

  // Check for milestone celebrations
  useEffect(() => {
    const checkMilestone = (milestone: 25 | 50 | 75 | 100) => {
      if (progressPercentage >= milestone && !celebratedMilestones.has(milestone)) {
        setShowMilestone(milestone);
        setCelebratedMilestones(prev => new Set([...prev, milestone]));
      }
    };

    if (progressPercentage >= 100 && !celebratedMilestones.has(100)) {
      checkMilestone(100);
    } else if (progressPercentage >= 75 && !celebratedMilestones.has(75)) {
      checkMilestone(75);
    } else if (progressPercentage >= 50 && !celebratedMilestones.has(50)) {
      checkMilestone(50);
    } else if (progressPercentage >= 25 && !celebratedMilestones.has(25)) {
      checkMilestone(25);
    }
  }, [progressPercentage, celebratedMilestones]);

  const handleMilestoneContinue = useCallback(() => {
    setShowMilestone(null);
  }, []);

  const handleSubmit = useCallback(() => {
    submitFiling();
  }, [submitFiling]);

  const handleStepClick = useCallback((stepIndex: number, subStepIndex: number = 0) => {
    goToStep(stepIndex, subStepIndex);
  }, [goToStep]);

  // If submitted, show success screen
  if (isSubmitted) {
    return <SubmissionSuccess onStartNew={resetFiling} />;
  }


  // New Focus Mode Layout
  return (
    <HolographicLayout
      title={currentStep?.title || 'Tax Filing'}
      progress={progressPercentage}
      activeStepId={currentSubStep?.id}
      sidebar={
        <HolographicJourneyMap
          steps={state.steps}
          currentStepIndex={currentStepIndex}
          onStepClick={(stepIndex) => goToStep(stepIndex, 0)}
        />
      }
      genie={
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
          <TaxGenie
            message={`You are on ${currentStep?.title}. Let's get this done!`}
            variant="idle"
          />
        </div>
      }
    >
      <motion.div
        key={`${currentStepIndex}-${currentSubStepIndex}`}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto"
      >
        {currentStep && currentSubStep && (
          <StepForm
            stepId={currentStep.id}
            subStep={currentSubStep}
            onDataChange={updateSubStepData}
            onComplete={completeSubStep}
            onNext={isLastStep ? handleSubmit : goToNext}
            onPrevious={goToPrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            isLastStep={isLastStep}
            currentStepSubSteps={currentStep.subSteps}
          />
        )}
      </motion.div>
    </HolographicLayout>
  );
}
