import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight, Info } from "lucide-react";
import SEOHead from "@/components/layout/SEOHead";
import FinalCTA from "@/components/layout/FinalCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>{children}</motion.div>;
}

const slabs = [
  { min: 0, max: 600000, rate: 0, fixed: 0, label: "0% (Tax Exempt)" },
  { min: 600001, max: 1200000, rate: 5, fixed: 0, label: "5% of amount exceeding Rs 600,000" },
  { min: 1200001, max: 2200000, rate: 15, fixed: 30000, label: "Rs 30,000 + 15% of amount exceeding Rs 1,200,000" },
  { min: 2200001, max: 3200000, rate: 25, fixed: 180000, label: "Rs 180,000 + 25% of amount exceeding Rs 2,200,000" },
  { min: 3200001, max: 4100000, rate: 30, fixed: 430000, label: "Rs 430,000 + 30% of amount exceeding Rs 3,200,000" },
  { min: 4100001, max: Infinity, rate: 35, fixed: 700000, label: "Rs 700,000 + 35% of amount exceeding Rs 4,100,000" },
];

function calculateTax(income: number): number {
  if (income <= 600000) return 0;
  if (income <= 1200000) return (income - 600000) * 0.05;
  if (income <= 2200000) return 30000 + (income - 1200000) * 0.15;
  if (income <= 3200000) return 180000 + (income - 2200000) * 0.25;
  if (income <= 4100000) return 430000 + (income - 3200000) * 0.30;
  return 700000 + (income - 4100000) * 0.35;
}

function getSlabIndex(income: number): number {
  if (income <= 600000) return 0;
  if (income <= 1200000) return 1;
  if (income <= 2200000) return 2;
  if (income <= 3200000) return 3;
  if (income <= 4100000) return 4;
  return 5;
}

function AnimNum({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const step = Math.max(value / 60, 1);
    const timer = setInterval(() => { start += step; if (start >= value) { setDisplay(value); clearInterval(timer); } else setDisplay(Math.floor(start)); }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span ref={ref}>{prefix}{Math.round(display).toLocaleString()}</span>;
}

const faqs = [
  { q: "Are these tax slabs applicable to government employees?", a: "Yes. The same tax slabs generally apply to both government and private sector salaried employees in Pakistan. However, certain allowances (medical, house rent) have different exemption limits for government employees. Our calculator accounts for these differences." },
  { q: "How is this different from the tax deducted by my employer?", a: "Your employer deducts withholding tax (WHT) based on their estimate of your annual salary. If your employer has underestimated or you have other income sources, you may owe additional tax when you file. Our calculator helps you identify any potential shortfall before filing season." },
  { q: "Why should I still file a return if my employer deducts tax?", a: "Filing a tax return makes you an Active Tax Filer, entitling you to lower withholding tax rates on bank transactions (halved from 0.6% to 0.3%), property purchases, and vehicle registration. The savings can far exceed the cost of filing." },
];

export default function SalaryTaxCalculator() {
  const [salary, setSalary] = useState("");
  const [isGovt, setIsGovt] = useState(false);
  const [medical, setMedical] = useState("");
  const [zakat, setZakat] = useState("");
  const [result, setResult] = useState<null | { tax: number; income: number; monthly: number; rate: number; slab: number }>(null);

  const handleCalculate = () => {
    const annualSalary = parseFloat(salary) || 0;
    const medicalAmt = parseFloat(medical) || 0;
    const zakatAmt = parseFloat(zakat) || 0;

    // Medical exemption: 10% of basic salary for private, full for govt
    const medicalExempt = isGovt ? medicalAmt : Math.min(medicalAmt, annualSalary * 0.1);
    const taxableIncome = Math.max(0, annualSalary - medicalExempt - zakatAmt);
    const tax = calculateTax(taxableIncome);
    const slab = getSlabIndex(taxableIncome);

    setResult({
      tax: Math.round(tax),
      income: Math.round(taxableIncome),
      monthly: Math.round(tax / 12),
      rate: taxableIncome > 0 ? parseFloat(((tax / taxableIncome) * 100).toFixed(2)) : 0,
      slab,
    });
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Free Pakistan Salary Tax Calculator 2024-25 | FBR Income Tax | Pak Filer"
        description="Use our free, up-to-date salary tax calculator to instantly estimate your annual income tax liability under Pakistan's FBR tax slabs for Tax Year 2024-25."
        canonical="https://pakfiler.com/services/salary-tax-calculator"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A8549] to-[#146B3A]" />
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/></svg></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3 block">FREE SALARY TAX CALCULATOR</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Pakistan Salary Tax Calculator — Know Your Tax Before You File</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">Use our free, up-to-date salary tax calculator to instantly estimate your annual income tax liability under Pakistan's FBR tax slabs for Tax Year 2024-25. No signup required.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Free to Use", "Tax Year 2024-25", "FBR Tax Slabs", "Instant Results"].map(b => (
              <span key={b} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-white/80">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Calculate Your Salary Tax Instantly</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input */}
            <FadeIn>
              <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#E0EAE4] space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2A2A] mb-2">Annual Gross Salary (Rs)*</label>
                  <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="e.g. 1200000" className="w-full px-4 py-3 rounded-xl border border-[#E0EAE4] bg-white text-[#1F2A2A] focus:ring-2 focus:ring-[#1A8549] focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2A2A] mb-2">Are You a Government Employee?</label>
                  <div className="flex gap-4">
                    <button onClick={() => setIsGovt(false)} className={`px-6 py-2 rounded-lg text-sm font-medium border ${!isGovt ? "bg-[#1A8549] text-white border-[#1A8549]" : "bg-white text-[#4A5A5A] border-[#E0EAE4]"}`}>No</button>
                    <button onClick={() => setIsGovt(true)} className={`px-6 py-2 rounded-lg text-sm font-medium border ${isGovt ? "bg-[#1A8549] text-white border-[#1A8549]" : "bg-white text-[#4A5A5A] border-[#E0EAE4]"}`}>Yes</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2A2A] mb-2">Medical Allowance (Rs) — Optional</label>
                  <input type="number" value={medical} onChange={e => setMedical(e.target.value)} placeholder="0" className="w-full px-4 py-3 rounded-xl border border-[#E0EAE4] bg-white text-[#1F2A2A] focus:ring-2 focus:ring-[#1A8549] focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2A2A] mb-2">Zakat Deducted (Rs) — Optional</label>
                  <input type="number" value={zakat} onChange={e => setZakat(e.target.value)} placeholder="0" className="w-full px-4 py-3 rounded-xl border border-[#E0EAE4] bg-white text-[#1F2A2A] focus:ring-2 focus:ring-[#1A8549] focus:border-transparent outline-none" />
                </div>
                <button onClick={handleCalculate} className="w-full px-6 py-4 bg-gradient-to-r from-[#1A8549] to-[#146B3A] text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  <Calculator className="w-5 h-5" /> Calculate My Tax
                </button>
              </div>
            </FadeIn>

            {/* Results */}
            <FadeIn delay={0.2}>
              {result ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#1A8549] to-[#146B3A] rounded-2xl p-6 text-white">
                    <p className="text-sm text-white/60 mb-1">Annual Tax Payable</p>
                    <p className="text-4xl font-display font-bold"><AnimNum value={result.tax} prefix="Rs " /></p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F7FAF8] rounded-xl p-4 border border-[#E0EAE4]">
                      <p className="text-xs text-[#7A8A8A] mb-1">Annual Taxable Income</p>
                      <p className="text-lg font-bold text-[#146B3A]">Rs {result.income.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#F7FAF8] rounded-xl p-4 border border-[#E0EAE4]">
                      <p className="text-xs text-[#7A8A8A] mb-1">Monthly Tax Deduction</p>
                      <p className="text-lg font-bold text-[#146B3A]">Rs {result.monthly.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#F7FAF8] rounded-xl p-4 border border-[#E0EAE4]">
                      <p className="text-xs text-[#7A8A8A] mb-1">Effective Tax Rate</p>
                      <p className="text-lg font-bold text-[#146B3A]">{result.rate}%</p>
                    </div>
                    <div className="bg-[#F7FAF8] rounded-xl p-4 border border-[#E0EAE4]">
                      <p className="text-xs text-[#7A8A8A] mb-1">Tax Bracket</p>
                      <p className="text-lg font-bold text-[#146B3A]">Slab {result.slab + 1}</p>
                    </div>
                  </div>
                  <Link to="/services/personal-tax-filing" className="flex items-center justify-center gap-2 mt-4 text-[#1A8549] font-semibold hover:underline">
                    Ready to File? Start Your Tax Return from Rs 999 <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-[#F7FAF8] rounded-2xl border border-[#E0EAE4] p-8">
                  <div className="text-center">
                    <Calculator className="w-12 h-12 text-[#1A8549]/30 mx-auto mb-4" />
                    <p className="text-[#7A8A8A]">Enter your salary details and click calculate to see your tax breakdown</p>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tax Slabs Table */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Pakistan's Income Tax Slabs for Salaried Individuals (FY 2024-25)</h2>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto max-w-4xl mx-auto">
              <table className="w-full bg-white rounded-xl border border-[#E0EAE4] overflow-hidden">
                <thead><tr className="bg-gradient-to-r from-[#1A8549] to-[#146B3A] text-white">
                  <th className="p-4 text-left text-sm font-semibold">Slab</th>
                  <th className="p-4 text-left text-sm font-semibold">Income Range</th>
                  <th className="p-4 text-left text-sm font-semibold">Tax Rate</th>
                </tr></thead>
                <tbody>
                  {[
                    { slab: 1, range: "Up to Rs 600,000", rate: "0% (Tax Exempt)" },
                    { slab: 2, range: "Rs 600,001 – Rs 1,200,000", rate: "5% of amount exceeding Rs 600,000" },
                    { slab: 3, range: "Rs 1,200,001 – Rs 2,200,000", rate: "Rs 30,000 + 15% of amount exceeding Rs 1,200,000" },
                    { slab: 4, range: "Rs 2,200,001 – Rs 3,200,000", rate: "Rs 180,000 + 25% of amount exceeding Rs 2,200,000" },
                    { slab: 5, range: "Rs 3,200,001 – Rs 4,100,000", rate: "Rs 430,000 + 30% of amount exceeding Rs 3,200,000" },
                    { slab: 6, range: "Above Rs 4,100,000", rate: "Rs 700,000 + 35% of amount exceeding Rs 4,100,000" },
                  ].map((s, i) => (
                    <tr key={i} className={`border-t border-[#E0EAE4] ${result && result.slab === i ? "bg-[#E8F5EE] font-semibold" : ""}`}>
                      <td className="p-4 text-sm text-[#1F2A2A]">{s.slab}</td>
                      <td className="p-4 text-sm text-[#4A5A5A]">{s.range}</td>
                      <td className="p-4 text-sm text-[#4A5A5A]">{s.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800">This calculator provides an estimate only. Actual tax liability may vary based on specific deductions, credits, and FBR rules. Consult a CA for precise calculations.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn className="text-center mb-10"><h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Frequently Asked Questions</h2></FadeIn>
          <FadeIn>
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E0EAE4]">
                  <AccordionTrigger className="text-left text-[#1F2A2A] font-semibold hover:text-[#1A8549] py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5A5A] leading-relaxed pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
