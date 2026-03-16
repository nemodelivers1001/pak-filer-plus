import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, User, CreditCard, Calendar, Mail, Phone, MapPin, Building2, Calculator } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { HolographicInput } from "@/components/ui/HolographicInput";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp } from "@/lib/animations";
import { SubStep } from "@/hooks/useTaxFiling";
import { useState, useEffect } from "react";
import { SectionWizard } from "./onboarding/SectionWizard";

interface StepFormProps {
  stepId: string;
  subStep: SubStep;
  onDataChange: (data: Record<string, unknown>) => void;
  onComplete: () => void;
  onNext: () => void;
  currentStepSubSteps?: SubStep[]; // New: Pass all substeps of current step to wizard

  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep: boolean;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  hint?: string;
  icon?: React.ReactNode;
}

// Form field configurations for each sub-step
const formConfigs: Record<string, { fields: FormField[] }> = {
  'basic-info': {
    fields: [
      { name: 'fullName', label: 'Full Name (as per CNIC)', type: 'text', placeholder: 'Enter your full name', required: true, icon: <User /> },
      { name: 'cnic', label: 'CNIC Number', type: 'text', placeholder: '00000-0000000-0', required: true, hint: 'Format: 00000-0000000-0', icon: <CreditCard /> },
      { name: 'ntn', label: 'NTN Number', type: 'text', placeholder: 'Enter NTN if available', icon: <Calculator /> },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', placeholder: '', required: true, icon: <Calendar /> },
      { name: 'fatherName', label: "Father's Name", type: 'text', placeholder: "Enter father's name", required: true, icon: <User /> },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true, icon: <Mail /> },
      { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '+92 300 0000000', required: true, icon: <Phone /> },
      { name: 'address', label: 'Residential Address', type: 'text', placeholder: 'Enter your complete address', required: true, icon: <MapPin /> },
      { name: 'city', label: 'City', type: 'text', placeholder: 'Enter city', required: true, icon: <Building2 /> },
    ],
  },
  'salary': {
    fields: [
      { name: 'employerName', label: 'Employer Name', type: 'text', placeholder: 'Company/Organization name' },
      { name: 'annualSalary', label: 'Annual Gross Salary (PKR)', type: 'number', placeholder: '0', hint: 'Total salary before deductions' },
      { name: 'taxDeducted', label: 'Tax Deducted by Employer (PKR)', type: 'number', placeholder: '0' },
      { name: 'bonusReceived', label: 'Bonus Received (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'pension': {
    fields: [
      { name: 'pensionSource', label: 'Pension Source', type: 'text', placeholder: 'e.g., Government, Private' },
      { name: 'annualPension', label: 'Annual Pension Amount (PKR)', type: 'number', placeholder: '0' },
      { name: 'taxDeducted', label: 'Tax Deducted (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'agriculture': {
    fields: [
      { name: 'landArea', label: 'Agricultural Land Area (Acres)', type: 'number', placeholder: '0' },
      { name: 'incomeAmount', label: 'Agricultural Income (PKR)', type: 'number', placeholder: '0' },
      { name: 'location', label: 'Land Location', type: 'text', placeholder: 'District, Province' },
    ],
  },
  'commission': {
    fields: [
      { name: 'serviceType', label: 'Type of Service/Commission', type: 'text', placeholder: 'e.g., Sales, Consulting' },
      { name: 'grossAmount', label: 'Gross Commission/Service Income (PKR)', type: 'number', placeholder: '0' },
      { name: 'expenses', label: 'Related Expenses (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'rent-property': {
    fields: [
      { name: 'propertyAddress', label: 'Property Address', type: 'text', placeholder: 'Complete property address' },
      { name: 'monthlyRent', label: 'Monthly Rent Received (PKR)', type: 'number', placeholder: '0' },
      { name: 'annualRent', label: 'Annual Rent Income (PKR)', type: 'number', placeholder: '0' },
      { name: 'propertyTax', label: 'Property Tax Paid (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'profit-savings': {
    fields: [
      { name: 'bankName', label: 'Bank Name', type: 'text', placeholder: 'Enter bank name' },
      { name: 'profitAmount', label: 'Annual Profit on Deposits (PKR)', type: 'number', placeholder: '0' },
      { name: 'withholdingTax', label: 'Withholding Tax Deducted (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'dividend': {
    fields: [
      { name: 'companyName', label: 'Company/Fund Name', type: 'text', placeholder: 'Enter company or mutual fund name' },
      { name: 'dividendAmount', label: 'Dividend/Capital Gain (PKR)', type: 'number', placeholder: '0' },
      { name: 'taxDeducted', label: 'Tax Deducted at Source (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'bonus': {
    fields: [
      { name: 'bonusType', label: 'Bonus Type', type: 'text', placeholder: 'e.g., Performance, Annual' },
      { name: 'bonusAmount', label: 'Bonus Amount (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'other-income': {
    fields: [
      { name: 'incomeSource', label: 'Income Source', type: 'text', placeholder: 'Describe the income source' },
      { name: 'incomeAmount', label: 'Income Amount (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'user-credits': {
    fields: [
      { name: 'charitableDonation', label: 'Charitable Donations (PKR)', type: 'number', placeholder: '0', hint: 'Donations to approved institutions' },
      { name: 'investmentInShares', label: 'Investment in Shares (PKR)', type: 'number', placeholder: '0' },
      { name: 'healthInsurance', label: 'Health Insurance Premium (PKR)', type: 'number', placeholder: '0' },
      { name: 'pensionContribution', label: 'Voluntary Pension Contribution (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'bank-deduction': {
    fields: [
      { name: 'bankName', label: 'Bank Name', type: 'text', placeholder: 'Enter bank name' },
      { name: 'withholdingTax', label: 'Withholding Tax on Transactions (PKR)', type: 'number', placeholder: '0' },
      { name: 'profitTax', label: 'Tax on Bank Profit (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'vehicle-tax': {
    fields: [
      { name: 'vehicleType', label: 'Vehicle Type', type: 'text', placeholder: 'e.g., Car, Motorcycle' },
      { name: 'registrationNumber', label: 'Registration Number', type: 'text', placeholder: 'ABC-1234' },
      { name: 'tokenTax', label: 'Token Tax Paid (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'utilities': {
    fields: [
      { name: 'electricityTax', label: 'Electricity Bill Tax (PKR)', type: 'number', placeholder: '0' },
      { name: 'gasTax', label: 'Gas Bill Tax (PKR)', type: 'number', placeholder: '0' },
      { name: 'phoneTax', label: 'Phone Bill Tax (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'other-deductions': {
    fields: [
      { name: 'description', label: 'Description', type: 'text', placeholder: 'Describe the deduction' },
      { name: 'amount', label: 'Amount (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'net-worth': {
    fields: [
      { name: 'openingNetWorth', label: 'Opening Net Worth (Start of Year) (PKR)', type: 'number', placeholder: '0', hint: 'Your wealth at the beginning of tax year' },
      { name: 'closingNetWorth', label: 'Closing Net Worth (End of Year) (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'property': {
    fields: [
      { name: 'propertyType', label: 'Property Type', type: 'text', placeholder: 'e.g., House, Plot, Commercial' },
      { name: 'propertyAddress', label: 'Property Address', type: 'text', placeholder: 'Complete address' },
      { name: 'purchaseValue', label: 'Purchase Value (PKR)', type: 'number', placeholder: '0' },
      { name: 'currentValue', label: 'Current Market Value (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'vehicles': {
    fields: [
      { name: 'vehicleMake', label: 'Vehicle Make/Model', type: 'text', placeholder: 'e.g., Toyota Corolla' },
      { name: 'yearOfPurchase', label: 'Year of Purchase', type: 'number', placeholder: '2020' },
      { name: 'purchasePrice', label: 'Purchase Price (PKR)', type: 'number', placeholder: '0' },
      { name: 'currentValue', label: 'Current Value (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'bank-accounts': {
    fields: [
      { name: 'bankName', label: 'Bank Name', type: 'text', placeholder: 'Enter bank name' },
      { name: 'accountType', label: 'Account Type', type: 'text', placeholder: 'e.g., Savings, Current' },
      { name: 'closingBalance', label: 'Closing Balance (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'insurance': {
    fields: [
      { name: 'insuranceType', label: 'Insurance Type', type: 'text', placeholder: 'e.g., Life, Health' },
      { name: 'provider', label: 'Insurance Provider', type: 'text', placeholder: 'Company name' },
      { name: 'sumAssured', label: 'Sum Assured (PKR)', type: 'number', placeholder: '0' },
      { name: 'surrenderValue', label: 'Current Surrender Value (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'other-assets': {
    fields: [
      { name: 'assetDescription', label: 'Asset Description', type: 'text', placeholder: 'e.g., Gold, Jewelry, Electronics' },
      { name: 'assetValue', label: 'Estimated Value (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'cash-balance': {
    fields: [
      { name: 'cashInHand', label: 'Cash in Hand (PKR)', type: 'number', placeholder: '0' },
      { name: 'cashAtBank', label: 'Cash at Bank (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'foreign-assets': {
    fields: [
      { name: 'assetType', label: 'Foreign Asset Type', type: 'text', placeholder: 'e.g., Bank Account, Property' },
      { name: 'country', label: 'Country', type: 'text', placeholder: 'Country name' },
      { name: 'valuePKR', label: 'Value in PKR', type: 'number', placeholder: '0' },
    ],
  },
  'possessions': {
    fields: [
      { name: 'itemDescription', label: 'Item Description', type: 'text', placeholder: 'e.g., Furniture, Appliances' },
      { name: 'estimatedValue', label: 'Estimated Value (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'bank-loan': {
    fields: [
      { name: 'bankName', label: 'Bank/Institution Name', type: 'text', placeholder: 'Lender name' },
      { name: 'loanType', label: 'Loan Type', type: 'text', placeholder: 'e.g., Home, Car, Personal' },
      { name: 'outstandingAmount', label: 'Outstanding Amount (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'other-liabilities': {
    fields: [
      { name: 'liabilityDescription', label: 'Liability Description', type: 'text', placeholder: 'Describe the liability' },
      { name: 'amount', label: 'Amount Owed (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'expense-info': {
    fields: [
      { name: 'householdExpense', label: 'Household Expenses (PKR)', type: 'number', placeholder: '0' },
      { name: 'educationExpense', label: 'Education Expenses (PKR)', type: 'number', placeholder: '0' },
      { name: 'medicalExpense', label: 'Medical Expenses (PKR)', type: 'number', placeholder: '0' },
      { name: 'travelExpense', label: 'Travel Expenses (PKR)', type: 'number', placeholder: '0' },
      { name: 'otherExpenses', label: 'Other Expenses (PKR)', type: 'number', placeholder: '0' },
    ],
  },
  'fbr-login': {
    fields: [
      { name: 'irisUsername', label: 'IRIS Username', type: 'text', placeholder: 'Your IRIS portal username', required: true },
      { name: 'irisPassword', label: 'IRIS Password', type: 'password', placeholder: 'Your IRIS portal password', required: true, hint: 'This is used only for submission' },
    ],
  },
};

// Default config for summary steps and any missing configs
const defaultConfig: { fields: FormField[] } = {
  fields: [
    { name: 'notes', label: 'Additional Notes', type: 'text', placeholder: 'Any additional information...' },
  ],
};

export function StepForm({
  stepId,
  subStep,
  onDataChange,
  onComplete,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastStep,
  currentStepSubSteps = [],
}: StepFormProps) {
  const config = formConfigs[subStep.id] || defaultConfig;
  const [formData, setFormData] = useState<Record<string, string>>(
    (subStep.data as Record<string, string>) || {}
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Sync formData with subStep.data when navigating
  useEffect(() => {
    setFormData((subStep.data as Record<string, string>) || {});
    setTouched({});
  }, [subStep.id]);

  const handleFieldChange = (name: string, value: string) => {
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleFieldBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleContinue = () => {
    onComplete();
    onNext();
  };

  const handleSkip = () => {
    onNext();
  };

  const isSummaryStep = stepId === 'summary';

  // Handle Wizard Completion
  const handleWizardComplete = (selectedIds: string[]) => {
    // Save selected categories to the wizard substep data
    onDataChange({ selectedCategories: selectedIds });
    // Trigger completion logic (which handles visibility updates in useTaxFiling)
    // We need to wait a tick to ensure state updates before completing
    setTimeout(() => {
      onComplete();
      onNext();
    }, 0);
  };

  if (subStep.isWizard) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={subStep.id}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <SectionWizard
            title={subStep.title}
            description={subStep.description}
            options={currentStepSubSteps}
            onComplete={handleWizardComplete}
            onPrevious={onPrevious}
            canGoPrevious={canGoPrevious}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={subStep.id}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-[#FCD34D] drop-shadow-[0_0_10px_rgba(252,211,77,0.3)]">
            {subStep.title}
          </h2>
          {subStep.description && (
            <p className="text-white/80 text-lg">{subStep.description}</p>
          )}
        </div>

        {/* Form Fields - Floating Invisible Container */}
        {!isSummaryStep ? (
          <div className="relative">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 px-4 md:px-0"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {config.fields.map((field) => (
                <motion.div
                  key={field.name}
                  className={field.type === 'text' && field.name.includes('address') ? 'md:col-span-2' : ''}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <HolographicInput
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    onBlur={() => handleFieldBlur(field.name)}
                    error={touched[field.name] && field.required && !formData[field.name] ? 'This field is required' : undefined}
                    className="text-white placeholder:text-white/20"
                    containerClassName="mb-0"
                    icon={field.icon}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Auto-save & Status - Floating */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40 px-4 md:px-0">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#4ade80] animate-pulse"></div>
                <span>Secure Connection • Auto-saving</span>
              </div>
              <div className="font-mono opacity-50">ID: {subStep.id.toUpperCase()}</div>
            </div>
          </div>
        ) : (
          <GlassCard className="p-8 text-center relative overflow-hidden group bg-white/5 border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Review Summary</h3>
              <p className="text-muted-foreground">
                Review your information below. Click on any section in the stepper to make changes.
              </p>
            </div>
          </GlassCard>
        )}

        {/* Action Bar */}
        {/* Action Bar - Premium Static Docker */}
        <div className="mt-12 p-6 rounded-2xl bg-[#020b06]/60 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <GradientButton
              variant="ghost"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              icon={<ArrowLeft className="h-5 w-5" />}
              className="text-white/60 hover:text-white"
            >
              Previous
            </GradientButton>

            <div className="hidden md:flex items-center gap-2 text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <Save className="h-3 w-3 text-[#4ade80]" />
              <span>Auto-saving</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <GradientButton
              variant="primary"
              onClick={handleContinue}
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              className="h-12 px-8 text-lg font-bold shadow-[0_0_20px_rgba(252,211,77,0.3)] hover:shadow-[0_0_30px_rgba(252,211,77,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            >
              {isLastStep ? 'Submit Application' : 'Save & Continue'}
            </GradientButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StepForm;
