import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Step definitions
export interface SubStep {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  data: Record<string, unknown>;
  isVisible?: boolean; // New: Controls visibility based on wizard selection
  isWizard?: boolean;  // New: Identifies this as a selection step
}

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
  subSteps: SubStep[];
  subSteps: SubStep[];
  completed: boolean;
  isVisible?: boolean;
}

export interface TaxFilingState {
  currentStepIndex: number;
  currentSubStepIndex: number;
  steps: Step[];
  startedAt: string | null;
  lastUpdated: string | null;
  submitted: boolean;
}

// Initial step structure matching the requirements
const createInitialSteps = (): Step[] => [
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Basic details about you',
    icon: 'User',
    completed: false,
    subSteps: [
      { id: 'basic-info', title: 'Basic Information', completed: false, data: {}, isVisible: true },
    ],
  },
  {
    id: 'income',
    title: 'Income Categories',
    description: 'All sources of income',
    icon: 'Banknote',
    completed: false,
    subSteps: [
      { id: 'income-wizard', title: 'Income Selection', completed: false, data: {}, isVisible: true, isWizard: true, description: "Select your income sources for the year" },
      { id: 'salary', title: 'Salary Income', completed: false, data: {}, isVisible: false },
      { id: 'pension', title: 'Pension Income', completed: false, data: {}, isVisible: false },
      { id: 'agriculture', title: 'Agriculture Income', completed: false, data: {}, isVisible: false },
      { id: 'commission', title: 'Commission/Services Income', completed: false, data: {}, isVisible: false },
      { id: 'rent-property', title: 'Rent/Property Sale Income', completed: false, data: {}, isVisible: false },
      { id: 'profit-savings', title: 'Profit on Savings Income', completed: false, data: {}, isVisible: false },
      { id: 'dividend', title: 'Dividend/Gain Income', completed: false, data: {}, isVisible: false },
      { id: 'bonus', title: 'Bonus', completed: false, data: {}, isVisible: false },
      { id: 'other-income', title: 'Other Income', completed: false, data: {}, isVisible: false },
    ],
  },
  {
    id: 'tax-credit',
    title: 'Tax Credit',
    description: 'Applicable tax credits',
    icon: 'BadgePercent',
    completed: false,
    subSteps: [
      { id: 'user-credits', title: 'User Tax Credits', completed: false, data: {}, isVisible: true },
    ],
  },
  {
    id: 'tax-deducted',
    title: 'Tax Deducted',
    description: 'Tax already deducted at source',
    icon: 'Receipt',
    completed: false,
    subSteps: [
      { id: 'bank-deduction', title: 'Bank Tax Deduction', completed: false, data: {}, isVisible: true },
      { id: 'vehicle-tax', title: 'Vehicle Details', completed: false, data: {}, isVisible: true },
      { id: 'utilities', title: 'Utilities Details', completed: false, data: {}, isVisible: true },
      { id: 'other-deductions', title: 'Other Tax Deductions', completed: false, data: {}, isVisible: true },
    ],
  },
  {
    id: 'wealth',
    title: 'Wealth Statement',
    description: 'Assets and liabilities',
    icon: 'Landmark',
    completed: false,
    subSteps: [
      { id: 'wealth-wizard', title: 'Wealth Selection', completed: false, data: {}, isVisible: true, isWizard: true, description: "Select your assets and liabilities" },
      { id: 'net-worth', title: 'Net Worth Summary', completed: false, data: {}, isVisible: false },
      { id: 'property', title: 'Property Details', completed: false, data: {}, isVisible: false },
      { id: 'vehicles', title: 'Vehicle Details', completed: false, data: {}, isVisible: false },
      { id: 'bank-accounts', title: 'Bank Account Details', completed: false, data: {}, isVisible: false },
      { id: 'insurance', title: 'Insurance Details', completed: false, data: {}, isVisible: false },
      { id: 'other-assets', title: 'Other Assets', completed: false, data: {}, isVisible: false },
      { id: 'cash-balance', title: 'Cash Balance', completed: false, data: {}, isVisible: false },
      { id: 'foreign-assets', title: 'Foreign Assets Details', completed: false, data: {}, isVisible: false },
      { id: 'possessions', title: 'Possessions Details', completed: false, data: {}, isVisible: false },
      { id: 'bank-loan', title: 'Bank Loan', completed: false, data: {}, isVisible: false },
      { id: 'other-liabilities', title: 'Other Liabilities', completed: false, data: {}, isVisible: false },
    ],
  },
  {
    id: 'expense',
    title: 'Expense',
    description: 'Your annual expenses',
    icon: 'CreditCard',
    completed: false,
    subSteps: [
      { id: 'expense-info', title: 'Expense Information', completed: false, data: {}, isVisible: true },
    ],
  },
  {
    id: 'summary',
    title: 'Summary',
    description: 'Review all information',
    icon: 'FileCheck',
    completed: false,
    subSteps: [
      { id: 'personal-summary', title: 'Personal Information Summary', completed: false, data: {}, isVisible: true },
      { id: 'income-summary', title: 'Income Information Summary', completed: false, data: {}, isVisible: true },
      { id: 'credit-summary', title: 'Tax Credit Summary', completed: false, data: {}, isVisible: true },
      { id: 'deducted-summary', title: 'Tax Deducted Summary', completed: false, data: {}, isVisible: true },
      { id: 'wealth-summary', title: 'Wealth Statement Summary', completed: false, data: {}, isVisible: true },
      { id: 'expense-summary', title: 'Expense Summary', completed: false, data: {}, isVisible: true },
    ],
  },
  {
    id: 'submission',
    title: 'FBR Submission',
    description: 'Submit to FBR/IRIS',
    icon: 'Send',
    completed: false,
    subSteps: [
      { id: 'fbr-login', title: 'FBR/IRIS Portal Login', completed: false, data: {}, isVisible: true },
    ],
  },
];

const STORAGE_KEY = 'pakfiler_tax_filing';

const initialState: TaxFilingState = {
  currentStepIndex: 0,
  currentSubStepIndex: 0,
  steps: createInitialSteps(),
  startedAt: null,
  lastUpdated: null,
  submitted: false,
};

export function useTaxFiling() {
  const [state, setState, resetState] = useLocalStorage<TaxFilingState>(STORAGE_KEY, initialState);

  // Current step and sub-step
  const currentStep = state.steps[state.currentStepIndex];
  const currentSubStep = currentStep?.subSteps[state.currentSubStepIndex];

  // Calculate total progress (only count visible steps)
  const totalSubSteps = useMemo(() => 
    state.steps.reduce((acc, step) => acc + step.subSteps.filter(s => s.isVisible !== false).length, 0),
    [state.steps]
  );

  const completedSubSteps = useMemo(() => 
    state.steps.reduce((acc, step) => 
      acc + step.subSteps.filter(sub => sub.completed).length, 0
    ),
    [state.steps]
  );

  const progressPercentage = Math.round((completedSubSteps / totalSubSteps) * 100);

  // Milestone checks
  const milestones = useMemo(() => ({
    reached25: progressPercentage >= 25,
    reached50: progressPercentage >= 50,
    reached75: progressPercentage >= 75,
    reached100: progressPercentage >= 100,
  }), [progressPercentage]);

  // Get flat index for current position
  const getCurrentFlatIndex = useCallback(() => {
    let index = 0;
    for (let i = 0; i < state.currentStepIndex; i++) {
      index += state.steps[i].subSteps.length;
    }
    return index + state.currentSubStepIndex;
  }, [state.currentStepIndex, state.currentSubStepIndex, state.steps]);

  // Update sub-step data
  const updateSubStepData = useCallback((data: Record<string, unknown>) => {
    setState((prev) => {
      const newSteps = [...prev.steps];
      const step = { ...newSteps[prev.currentStepIndex] };
      const subSteps = [...step.subSteps];
      subSteps[prev.currentSubStepIndex] = {
        ...subSteps[prev.currentSubStepIndex],
        data: { ...subSteps[prev.currentSubStepIndex].data, ...data },
      };
      step.subSteps = subSteps;
      newSteps[prev.currentStepIndex] = step;
      
      return {
        ...prev,
        steps: newSteps,
        lastUpdated: new Date().toISOString(),
        startedAt: prev.startedAt || new Date().toISOString(),
      };
    });
  }, [setState]);

  // Mark current sub-step as complete and move to next
  const completeSubStep = useCallback(() => {
    setState((prev) => {
      const newSteps = [...prev.steps];
      const step = { ...newSteps[prev.currentStepIndex] };
      const subSteps = [...step.subSteps];
      
      const currentSubStep = subSteps[prev.currentSubStepIndex];
      
      // Mark as complete
      subSteps[prev.currentSubStepIndex] = {
        ...currentSubStep,
        completed: true,
      };

      // Wizard Logic: If this was a wizard step, update visibility of other steps
      if (currentSubStep.isWizard && currentSubStep.data.selectedCategories) {
        const selectedIds = currentSubStep.data.selectedCategories as string[];
        
        // Update visibility for all OTHER substeps in this step
        step.subSteps = subSteps.map((sub, index) => {
          if (index === prev.currentSubStepIndex) return sub; // Don't change the wizard itself
          
          // Enable transparency/visibility for selected items
          return {
            ...sub,
            isVisible: selectedIds.includes(sub.id)
          };
        });
      } else {
        step.subSteps = subSteps;
      }
      
      // Check if all sub-steps in this step are complete
      const allSubStepsComplete = step.subSteps
        .filter(s => s.isVisible !== false)
        .every(s => s.completed);
        
      step.completed = allSubStepsComplete;
      newSteps[prev.currentStepIndex] = step;

      return {
        ...prev,
        steps: newSteps,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, [setState]);

  // Navigate to next sub-step or step
  const goToNext = useCallback(() => {
    setState((prev) => {
      const currentStep = prev.steps[prev.currentStepIndex];
      const currentSubStep = currentStep.subSteps[prev.currentSubStepIndex];
      
      // Find next visible sub-step index
      let nextSubStepIndex = prev.currentSubStepIndex + 1;
      while (
        nextSubStepIndex < currentStep.subSteps.length && 
        currentStep.subSteps[nextSubStepIndex].isVisible === false
      ) {
        nextSubStepIndex++;
      }

      const isLastSubStep = nextSubStepIndex >= currentStep.subSteps.length;
      const isLastStep = prev.currentStepIndex >= prev.steps.length - 1;

      if (isLastSubStep && isLastStep) {
        return prev; // Already at the end
      }

      if (isLastSubStep) {
        // Move to next step
        return {
          ...prev,
          currentStepIndex: prev.currentStepIndex + 1,
          currentSubStepIndex: 0,
          lastUpdated: new Date().toISOString(),
        };
      }

      // Move to next sub-step
      return {
        ...prev,
        currentSubStepIndex: nextSubStepIndex,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, [setState]);

  // Navigate to previous sub-step or step
  const goToPrevious = useCallback(() => {
    setState((prev) => {
      const isFirstSubStep = prev.currentSubStepIndex === 0;
      const isFirstStep = prev.currentStepIndex === 0;

      if (isFirstSubStep && isFirstStep) {
        return prev; // Already at the beginning
      }

      if (isFirstSubStep) {
        // Move to previous step's last visible sub-step
        const prevStep = prev.steps[prev.currentStepIndex - 1];
        let prevSubStepIndex = prevStep.subSteps.length - 1;
        
        // Find last visible substep
        while (prevSubStepIndex >= 0 && prevStep.subSteps[prevSubStepIndex].isVisible === false) {
          prevSubStepIndex--;
        }

        return {
          ...prev,
          currentStepIndex: prev.currentStepIndex - 1,
          currentSubStepIndex: prevSubStepIndex,
          lastUpdated: new Date().toISOString(),
        };
      }

      // Move to previous visible sub-step
      let prevSubStepIndex = prev.currentSubStepIndex - 1;
      const currentStep = prev.steps[prev.currentStepIndex];
      
      while (prevSubStepIndex >= 0 && currentStep.subSteps[prevSubStepIndex].isVisible === false) {
        prevSubStepIndex--;
      }

      return {
        ...prev,
        currentSubStepIndex: prevSubStepIndex,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, [setState]);

  // Jump to specific step/sub-step
  const goToStep = useCallback((stepIndex: number, subStepIndex: number = 0) => {
    setState((prev) => ({
      ...prev,
      currentStepIndex: stepIndex,
      currentSubStepIndex: subStepIndex,
      lastUpdated: new Date().toISOString(),
    }));
  }, [setState]);

  // Submit filing
  const submitFiling = useCallback(() => {
    setState((prev) => ({
      ...prev,
      submitted: true,
      lastUpdated: new Date().toISOString(),
    }));
  }, [setState]);

  // Reset filing
  const resetFiling = useCallback(() => {
    resetState();
  }, [resetState]);

  // Check if can navigate
  const canGoNext = state.currentStepIndex < state.steps.length - 1 || 
    state.currentSubStepIndex < (state.steps[state.currentStepIndex]?.subSteps.length || 0) - 1;
  
  const canGoPrevious = state.currentStepIndex > 0 || state.currentSubStepIndex > 0;

  // Update the progress stored for dashboard
  const updateDashboardProgress = useCallback(() => {
    localStorage.setItem('pakfiler_tax_progress', JSON.stringify({
      currentStep: state.currentStepIndex + 1,
      totalSteps: state.steps.length,
      lastUpdated: new Date().toISOString(),
    }));
  }, [state.currentStepIndex, state.steps.length]);

  return {
    // State
    state,
    currentStep,
    currentSubStep,
    currentStepIndex: state.currentStepIndex,
    currentSubStepIndex: state.currentSubStepIndex,
    
    // Progress
    progressPercentage,
    completedSubSteps,
    totalSubSteps,
    milestones,
    getCurrentFlatIndex,
    
    // Actions
    updateSubStepData,
    completeSubStep,
    goToNext,
    goToPrevious,
    goToStep,
    submitFiling,
    resetFiling,
    updateDashboardProgress,
    
    // Navigation state
    canGoNext,
    canGoPrevious,
    isFirstStep: state.currentStepIndex === 0 && state.currentSubStepIndex === 0,
    isLastStep: state.currentStepIndex === state.steps.length - 1 && 
      state.currentSubStepIndex === currentStep?.subSteps.length - 1,
    isSubmitted: state.submitted,
  };
}

export default useTaxFiling;
