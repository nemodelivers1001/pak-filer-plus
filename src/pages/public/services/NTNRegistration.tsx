import ServicePageLayout, { FadeIn } from "@/components/layout/ServicePageLayout";
import { User, Briefcase, Building2, Users, Shield, Clock } from "lucide-react";

const categories = [
  { icon: User, title: "Salaried Individual", desc: "For individuals earning a salary from any employer — government, private sector, or semi-government organisations.", fee: "Rs 500", time: "1–2 Working Days", docs: "CNIC, salary slip or employment letter, employer NTN" },
  { icon: Briefcase, title: "Sole Proprietor", desc: "For individual business owners operating a business under their own name or a trade name. Includes shopkeepers, traders, contractors, consultants, and freelancers.", fee: "Rs 1,500", time: "1–2 Working Days", docs: "CNIC, business address proof, business bank account details (if any), trade name" },
  { icon: Users, title: "Partnership / AOP", desc: "For partnership firms and Associations of Persons operating under a formal or informal partnership arrangement.", fee: "Rs 3,500", time: "2–3 Working Days", docs: "CNICs of all partners, partnership deed, business address proof, bank account details" },
  { icon: Building2, title: "Company (Pvt Ltd / SMC / LLP)", desc: "For companies incorporated under SECP — Private Limited, Single Member, or Limited Liability Partnership.", fee: "Rs 7,000", time: "2–3 Working Days", docs: "SECP incorporation certificate, CNICs of directors, Memorandum & Articles of Association, registered office address" },
  { icon: Shield, title: "Non-Profit Organization (NPO)", desc: "For registered non-profit organisations, trusts, welfare societies, charities, and foundations.", fee: "Rs 9,000", time: "2–3 Working Days", docs: "Registration certificate (SECP / Registrar), CNICs of trustees/directors, constitution/MOA, registered address" },
];

const steps = [
  "Select your category and place your order on Pak Filer",
  "Submit required documents via our secure portal",
  "Our team verifies documents and prepares your FBR IRIS registration application",
  "Application is submitted to FBR IRIS system",
  "FBR processes and approves the NTN",
  "Your NTN certificate and login credentials are delivered to you",
];

export default function NTNRegistration() {
  return (
    <ServicePageLayout
      seo={{ title: "NTN Registration Pakistan | Get National Tax Number Online | Pak Filer", description: "Register your NTN with FBR online. Fast NTN registration for salaried, sole proprietor, partnership, company & NPO. From Rs 500.", canonical: "https://pakfiler.com/services/ntn-registration" }}
      eyebrow="NTN REGISTRATION"
      title="NTN Registration in Pakistan — Get Registered with FBR Today"
      subtitle="Your National Tax Number (NTN) is your gateway to formal financial participation in Pakistan. Whether you're a salaried employee, business owner, or running a non-profit — Pak Filer registers your NTN with FBR quickly and correctly."
      ctaPrimary={{ label: "Register My NTN Now", href: "/contact" }}
      ctaSecondary={{ label: "Check Pricing by Category", href: "#pricing" }}
      badges={["From Rs 500", "1–3 Working Days", "FBR Registered", "5,000+ NTNs Issued"]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "NTN Registration" }]}
      faqs={[
        { q: "Can I check if I already have an NTN?", a: "Yes — you can check your NTN status on the FBR website using your CNIC number. However, many people have an NTN but are not registered as active filers. Pak Filer can also help you activate your filer status." },
        { q: "Is there a difference between NTN and STRN?", a: "Yes. NTN is your income tax registration number with FBR. STRN (Sales Tax Registration Number) is a separate registration required for businesses that are required to collect and pay General Sales Tax (GST). Pak Filer offers both NTN and STRN/GST registration services." },
        { q: "What if I previously had an NTN but lost access?", a: "We can assist with IRIS password recovery and profile reactivation. Contact our support team for assistance." },
      ]}
    >
      {/* What is NTN */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">What is a National Tax Number (NTN)?</h2></FadeIn>
          <FadeIn><p className="text-[#4A5A5A] mb-6 leading-relaxed">A National Tax Number (NTN) is a unique 7-digit identification number issued by the Federal Board of Revenue (FBR) of Pakistan. It serves as your official tax identity and is required for virtually all formal financial and legal activities in the country.</p></FadeIn>
          <FadeIn><h3 className="text-xl font-display font-semibold text-[#1F2A2A] mb-4">Why You Need an NTN</h3></FadeIn>
          <div className="space-y-3">
            {["Mandatory for opening a business bank account in Pakistan", "Required for property purchase and registration transactions", "Needed to register a company with SECP", "Enables you to become an Active Tax Filer — qualifying for lower withholding tax rates", "Required for government tenders and contracts", "Necessary for registering vehicles above certain thresholds", "Required for foreign remittance above specified limits", "Enables you to claim tax refunds and credits from FBR"].map((item, i) => (
              <FadeIn key={i} delay={i * 0.03}><div className="flex items-start gap-3"><span className="text-[#1A8549] font-bold">•</span><p className="text-sm text-[#4A5A5A]">{item}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Categories */}
      <section id="pricing" className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-10"><h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Choose Your Registration Category</h2></FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`rounded-xl p-6 border h-full flex flex-col ${i === 0 ? "bg-gradient-to-br from-[#1A8549] to-[#146B3A] text-white border-transparent" : "bg-white border-[#E0EAE4]"}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${i === 0 ? "bg-white/20" : "bg-[#E8F5EE]"}`}>
                    <c.icon className={`w-5 h-5 ${i === 0 ? "text-white" : "text-[#1A8549]"}`} />
                  </div>
                  <h3 className={`font-display font-semibold mb-2 ${i === 0 ? "text-white" : "text-[#1F2A2A]"}`}>{c.title}</h3>
                  <p className={`text-xs mb-4 flex-1 ${i === 0 ? "text-white/70" : "text-[#7A8A8A]"}`}>{c.desc}</p>
                  <div className="space-y-2 mt-auto">
                    <p className={`text-2xl font-display font-bold ${i === 0 ? "text-white" : "text-[#146B3A]"}`}>{c.fee}</p>
                    <div className={`flex items-center gap-1 text-xs ${i === 0 ? "text-white/70" : "text-[#7A8A8A]"}`}>
                      <Clock className="w-3 h-3" /> {c.time}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">How NTN Registration Works</h2></FadeIn>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A8549] to-[#146B3A] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">{i + 1}</div>
                  <p className="text-[#4A5A5A] pt-1">{s}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
