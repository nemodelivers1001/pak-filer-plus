import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, SkipForward } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FormInput } from "@/components/ui/FormInput";
import { fadeInUp } from "@/lib/animations";
import { SubStep } from "@/hooks/useTaxFiling";
import { useState, useEffect } from "react";

interface StepFormProps {
  stepId: string;
  subStep: SubStep;
  onDataChange: (data: Record<string, unknown>) => void;
  onComplete: () => void;
  onNext: () => void;
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
}

// Form field configurations for each sub-step
const formConfigs: Record<string, { fields: FormField[] }> = {
  'basic-info': {
    fields: [
      { name: 'fullName', label: 'Full Name (as per CNIC)', type: 'text', placeholder: 'Enter your full name', required: true },
      { name: 'cnic', label: 'CNIC Number', type: 'text', placeholder: '00000-0000000-0', required: true, hint: 'Format: 00000-0000000-0' },
      { name: 'ntn', label: 'NTN Number', type: 'text', placeholder: 'Enter NTN if available' },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', placeholder: '', required: true },
      { name: 'fatherName', label: "Father's Name", type: 'text', placeholder: "Enter father's name", required: true },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
      { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '+92 300 0000000', required: true },
      { name: 'address', label: 'Residential Address', type: 'text', placeholder: 'Enter your complete address', required: true },
      { name: 'city', label: 'City', type: 'text', placeholder: 'Enter city', required: true },
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{subStep.title}</h2>
          {subStep.description && (
            <p className="text-muted-foreground">{subStep.description}</p>
          )}
        </div>

        {/* Form Fields */}
        {!isSummaryStep ? (
          <GlassCard className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {config.fields.map((field) => (
                <div key={field.name} className={field.type === 'text' && field.name.includes('address') ? 'md:col-span-2' : ''}>
                  <FormInput
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    onBlur={() => handleFieldBlur(field.name)}
                    hint={field.hint}
                    error={touched[field.name] && field.required && !formData[field.name] ? 'This field is required' : undefined}
                  />
                </div>
              ))}
            </div>

            {/* Auto-save indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Save className="h-3 w-3" />
              <span>Auto-saved</span>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Review your information in the summary. Click on any section in the stepper to make changes.
              </p>
            </div>
          </GlassCard>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4">
          <GradientButton
            variant="ghost"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Previous
          </GradientButton>

          <div className="flex items-center gap-3">
            {!isLastStep && !isSummaryStep && (
              <GradientButton
                variant="outline"
                onClick={handleSkip}
                icon={<SkipForward className="h-4 w-4" />}
              >
                Skip for now
              </GradientButton>
            )}

            <GradientButton
              variant="primary"
              onClick={handleContinue}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              {isLastStep ? 'Submit' : 'Save & Continue'}
            </GradientButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StepForm;
