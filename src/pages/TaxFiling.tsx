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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Milestone Celebration Modal */}
      <AnimatePresence>
        {showMilestone && (
          <MilestoneCelebration 
            milestone={showMilestone} 
            onContinue={handleMilestoneContinue} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed lg:sticky top-0 left-0 h-screen w-80 bg-card border-r border-border z-40 flex flex-col"
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Logo */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-3">
                <img src={logo} alt="PAK Filer" className="h-10 w-10 object-contain" />
                <span className="font-bold text-lg text-foreground">PAK Filer</span>
              </Link>
            </div>

            {/* Stepper */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-custom">
              <TaxFilingStepper
                steps={state.steps}
                currentStepIndex={currentStepIndex}
                currentSubStepIndex={currentSubStepIndex}
                onStepClick={handleStepClick}
                progressPercentage={progressPercentage}
              />
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-border space-y-2">
              <GradientButton
                variant="ghost"
                className="w-full justify-start"
                icon={<Save className="h-4 w-4" />}
              >
                Save & Exit
              </GradientButton>
              <GradientButton
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                icon={<RotateCcw className="h-4 w-4" />}
                onClick={resetFiling}
              >
                Reset Filing
              </GradientButton>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Sticky Progress Bar */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="font-semibold text-foreground">Personal Tax Filing</h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {state.steps.length}: {currentStep?.title}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary">{progressPercentage}%</span>
                <GradientButton
                  variant="ghost"
                  size="sm"
                  icon={<HelpCircle className="h-4 w-4" />}
                >
                  Help
                </GradientButton>
              </div>
            </div>
            <ProgressBar progress={progressPercentage} size="sm" variant="gradient" />
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto p-6 lg:p-10">
          <motion.div
            key={`${currentStepIndex}-${currentSubStepIndex}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
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
              />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
