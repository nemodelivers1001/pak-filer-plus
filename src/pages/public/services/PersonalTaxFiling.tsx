import ServicePageLayout, { FadeIn } from "@/components/layout/ServicePageLayout";
import { Link } from "react-router-dom";
import { FileText, Users, Building2, Briefcase, Globe, Shield } from "lucide-react";

const categories = [
  { icon: Shield, title: "Salaried Employees (Government Sector)", desc: "Federal & provincial government servants, armed forces personnel, and civil servants" },
  { icon: Building2, title: "Salaried Employees (Private Sector)", desc: "Corporate employees, multinational workers, bank employees, and professionals" },
  { icon: FileText, title: "Teachers & Researchers", desc: "School, college, and university teachers including those in government educational institutions" },
  { icon: Users, title: "Multiple Income Sources", desc: "Individuals with salary plus rental income, freelance income, commission, or investment returns" },
  { icon: Globe, title: "Overseas Pakistanis", desc: "Pakistanis working abroad who have assets or income sources in Pakistan" },
  { icon: Briefcase, title: "Freelancers", desc: "Independent contractors and digital freelancers registered on platforms like Upwork, Fiverr, or Toptal" },
];

const included = [
  "Preparation and submission of your annual income tax return (ITR) on FBR IRIS portal",
  "Calculation of your total taxable income from all sources",
  "Application of all eligible deductions, allowances, and tax credits under Pakistan's Income Tax Ordinance 2001",
  "Zakat deductions, charitable contributions, and investment allowance claims where applicable",
  "Pension contribution deductions for government and private sector employees",
  "Filing confirmation and acknowledgment receipt from FBR",
  "Basic post-filing support for any FBR queries within 30 days",
];

const pricing = [
  { label: "Online Filing — Base Fee (1 income source)", price: "Rs 999", popular: true },
  { label: "Online Filing — More than 1 income source", price: "Rs 1,500" },
  { label: "Online Filing — CA Review Add-on", price: "+ Rs 1,000" },
  { label: "Document Upload — Base Fee", price: "Rs 3,500" },
  { label: "Document Upload — CA Review Add-on", price: "+ Rs 1,000" },
];

const docs = [
  "CNIC (front and back)",
  "Latest salary slips (last 3–6 months) or salary certificate from employer",
  "Bank account statements for the entire tax year (July–June)",
  "Employment certificate or letter from your employer",
];

const processSteps = [
  "Place your order and make payment on Pak Filer",
  "Submit your documents via our secure portal or WhatsApp",
  "Our team reviews your documents and prepares your return (1–2 days)",
  "CA reviews and approves the return (same day or next day)",
  "Return is submitted to FBR IRIS portal",
  "You receive FBR acknowledgment receipt via email/WhatsApp",
];

const faqs = [
  { q: "What is the last date to file income tax return in Pakistan?", a: "The standard deadline is September 30th for the previous tax year. However, FBR frequently extends this deadline. We recommend filing as early as possible to avoid the penalty of Rs 1,000 per month for late filing." },
  { q: "Can I file my taxes myself on FBR's website?", a: "Yes, you can file directly on FBR's IRIS portal. However, the process is complex and errors can lead to legal complications, missed deductions, or audit notices. Using Pak Filer ensures accuracy, maximised deductions, and CA certification for just Rs 999." },
  { q: "What if I have salary from two different employers in one year?", a: "This falls under 'more than one income source' and is priced at Rs 1,500. Our team will consolidate both salary records and calculate the correct combined tax liability." },
  { q: "Do I need to pay any tax after filing?", a: "If your employer has already deducted withholding tax (WHT) from your salary, you may owe nothing or may even be eligible for a refund. Our CA will calculate your exact tax position during the filing process." },
];

export default function PersonalTaxFiling() {
  return (
    <ServicePageLayout
      seo={{ title: "Personal Income Tax Filing Pakistan | Salaried Employees | Pak Filer", description: "File personal income tax return in Pakistan. CA-certified for salaried employees, teachers, researchers & more. From Rs 999.", canonical: "https://pakfiler.com/services/personal-tax-filing" }}
      eyebrow="PERSONAL TAX FILING"
      title="Personal Income Tax Filing — Fast, Accurate & CA-Certified"
      subtitle="File your annual FBR income tax return online without visiting any office. Our qualified Chartered Accountants handle your personal tax filing accurately, ensuring you stay compliant and take advantage of all eligible deductions."
      ctaPrimary={{ label: "Start Personal Tax Filing", href: "/auth" }}
      ctaSecondary={{ label: "View Pricing", href: "/pricing" }}
      badges={["Rs 999 Starting Price", "1–3 Working Days", "CA Reviewed", "100% Online"]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Personal Tax Filing" }]}
      faqs={faqs}
    >
      {/* Who Is This For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-10">
            <h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">Who Should File a Personal Tax Return?</h2>
            <p className="text-[#4A5A5A] max-w-3xl">Pakistan's tax law requires every individual earning above Rs 600,000 annually to file a tax return. Even if you're below this threshold, filing as an active tax filer offers significant financial benefits — including lower withholding tax rates on bank transactions, property, and vehicle registration.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-[#F7FAF8] rounded-xl p-6 border border-[#E0EAE4] h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F5EE] flex items-center justify-center mb-3"><c.icon className="w-5 h-5 text-[#1A8549]" /></div>
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-1">{c.title}</h3>
                  <p className="text-sm text-[#4A5A5A]">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">What's Included in Your Personal Tax Filing</h2></FadeIn>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {included.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[#E0EAE4]">
                  <div className="w-6 h-6 rounded-full bg-[#1A8549] flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs">✓</span></div>
                  <p className="text-sm text-[#4A5A5A]">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Simple, Transparent Pricing</h2></FadeIn>
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#E0EAE4] overflow-hidden shadow-sm">
            {pricing.map((p, i) => (
              <FadeIn key={i}>
                <div className={`flex items-center justify-between p-5 ${i < pricing.length - 1 ? "border-b border-[#E0EAE4]" : ""} ${p.popular ? "bg-gradient-to-r from-[#1A8549] to-[#146B3A] text-white" : ""}`}>
                  <span className={`text-sm font-medium ${p.popular ? "text-white" : "text-[#1F2A2A]"}`}>{p.label}</span>
                  <span className={`font-display font-bold text-lg ${p.popular ? "text-white" : "text-[#146B3A]"}`}>{p.price}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-center text-xs text-[#7A8A8A] mt-4">All prices are inclusive of FBR filing fees. No hidden charges. GST may apply.</p>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Documents You Will Need</h2></FadeIn>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {docs.map((d, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[#E0EAE4]">
                  <FileText className="w-5 h-5 text-[#1A8549] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#4A5A5A]">{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">How the Filing Process Works</h2></FadeIn>
          <div className="max-w-2xl mx-auto space-y-4">
            {processSteps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A8549] to-[#146B3A] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">{i + 1}</div>
                  <p className="text-[#4A5A5A] pt-1">{s}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-6"><p className="text-sm text-[#7A8A8A] max-w-2xl mx-auto">Timeline: 1–3 working days after document submission</p></FadeIn>
        </div>
      </section>
    </ServicePageLayout>
  );
}
