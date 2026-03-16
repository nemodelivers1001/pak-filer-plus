import ServicePageLayout, { FadeIn } from "@/components/layout/ServicePageLayout";
import { Building2, Shield, Users, Globe, Award, Clock } from "lucide-react";

const companyReg = [
  { title: "Private Limited Company Registration", fee: "Rs 25,000 (Minimum)", govt: "SECP fee depends on Authorized Capital", time: "3–10 Working Days", desc: "Register a Private Limited Company with SECP — the most common business structure in Pakistan." },
  { title: "Single Member Company (SMC) Registration", fee: "Rs 25,000 (Minimum)", govt: "SECP fee depends on Authorized Capital", time: "3–10 Working Days", desc: "A Single Member Company is ideal for solo entrepreneurs who want limited liability without multiple shareholders." },
  { title: "Limited Liability Partnership (LLP)", fee: "Rs 45,000", govt: "SECP fees applicable", time: "7–10 Working Days", desc: "An LLP combines partnership flexibility with limited liability — ideal for professional services firms." },
  { title: "Partnership / AOP Registration", fee: "Rs 45,000 (City dependent)", govt: "", time: "7–15 Working Days", desc: "Register your partnership with the relevant local authority for formal legal standing." },
];

const npoServices = [
  { title: "NPO Registration with SECP", fee: "Rs 320,000", govt: "Rs 180,000 (SECP Fee)", time: "3–4 Months" },
  { title: "NPO Registration with Registrar (Provincial)", fee: "Rs 320,000", govt: "Rs 15,500", time: "3–4 Months" },
  { title: "Sindh Charity Commission Registration", fee: "Rs 320,000", govt: "Rs 10,000", time: "3–4 Months" },
  { title: "PCP Certification", fee: "Rs 300,000", govt: "", time: "Case-based" },
  { title: "FBR NPO Approval", fee: "Rs 90,000", govt: "", time: "Depends on approvals" },
];

const psebServices = [
  { title: "PSEB Freelancer Registration (New)", fee: "Rs 15,000", time: "10 Working Days" },
  { title: "PSEB Freelancer Renewal", fee: "Rs 15,000", time: "10 Working Days" },
  { title: "PSEB Company Registration (New)", fee: "Rs 25,000", time: "15 Working Days" },
  { title: "PSEB Company Renewal", fee: "Rs 25,000", time: "15 Working Days" },
  { title: "PSEB Call Center Registration", fee: "Rs 35,000", time: "30 Working Days" },
  { title: "Call Center Renewal", fee: "Rs 30,000", time: "20 Working Days" },
];

const whyChoose = [
  "End-to-End Management: We handle everything from name reservation to final certificate delivery",
  "SECP-Experienced Team: Our incorporation specialists have years of SECP filing experience",
  "Transparent Fees: All government fees communicated upfront — no surprises",
  "Nationwide Coverage: Available for most major cities including Karachi, Lahore, and Islamabad",
  "Post-Incorporation Support: We guide you on NTN, GST, bank account setup, and ongoing compliance",
];

export default function BusinessIncorporation() {
  return (
    <ServicePageLayout
      seo={{ title: "Business Incorporation Pakistan | Company Registration SECP | Pak Filer", description: "Register your company with SECP. Private Limited, SMC, LLP, NPO, PSEB registration. Professional incorporation service.", canonical: "https://pakfiler.com/services/business-incorporation" }}
      eyebrow="BUSINESS INCORPORATION"
      title="Business Incorporation & Company Registration in Pakistan"
      subtitle="From registering a Private Limited Company with SECP to setting up an NPO or obtaining PSEB certification — Pak Filer's incorporation experts handle the entire process so you can focus on building your business."
      ctaPrimary={{ label: "Start My Business Registration", href: "/contact" }}
      ctaSecondary={{ label: "Explore All Incorporation Services", href: "#services" }}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Business Incorporation" }]}
      faqs={[
        { q: "How long does it take to register a Private Limited Company in Pakistan?", a: "With complete documentation, a Private Limited Company can typically be registered with SECP in 3–10 working days. The timeline depends on name availability, document accuracy, and SECP processing times." },
        { q: "What is the minimum capital required for a Private Limited Company?", a: "There is no minimum paid-up capital requirement for a Private Limited Company in Pakistan under current SECP regulations. You can incorporate with as little as Rs 1 of authorized capital, though SECP fees are structured based on authorized capital amount." },
        { q: "Can a foreigner incorporate a company in Pakistan?", a: "Yes. Foreign nationals and overseas Pakistanis can incorporate companies in Pakistan. The process requires additional documentation such as a valid passport, and may require SECP approval for foreign shareholding above certain thresholds." },
      ]}
    >
      {/* Company Registration */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Company & Entity Registration Services</h2></FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {companyReg.map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-[#F7FAF8] rounded-xl p-6 border border-[#E0EAE4] h-full">
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-2">{c.title}</h3>
                  <p className="text-sm text-[#4A5A5A] mb-4">{c.desc}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#7A8A8A]">Professional Fee:</span><span className="font-bold text-[#146B3A]">{c.fee}</span></div>
                    {c.govt && <div className="flex justify-between"><span className="text-[#7A8A8A]">Government Fee:</span><span className="text-[#4A5A5A]">{c.govt}</span></div>}
                    <div className="flex justify-between"><span className="text-[#7A8A8A]">Timeline:</span><span className="text-[#4A5A5A]">{c.time}</span></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NPO */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">NPO, Trust & Charity Registration Services</h2></FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {npoServices.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-white rounded-xl p-6 border border-[#E0EAE4] h-full">
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-3 text-sm">{s.title}</h3>
                  <p className="text-2xl font-display font-bold text-[#146B3A] mb-1">{s.fee}</p>
                  {s.govt && <p className="text-xs text-[#7A8A8A]">+ {s.govt} (Govt Fee)</p>}
                  <p className="text-xs text-[#7A8A8A] mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> {s.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PSEB */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">PSEB Registrations</h2></FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {psebServices.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-[#F7FAF8] rounded-xl p-6 border border-[#E0EAE4]">
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-3 text-sm">{s.title}</h3>
                  <p className="text-xl font-display font-bold text-[#146B3A]">{s.fee}</p>
                  <p className="text-xs text-[#7A8A8A] mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> {s.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Bodies */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Trade Body & Association Registrations</h2></FadeIn>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            <FadeIn>
              <div className="bg-white rounded-xl p-6 border border-[#E0EAE4]">
                <h3 className="font-display font-semibold text-[#1F2A2A] mb-2">Chamber of Commerce & Industry (CCI)</h3>
                <p className="text-xl font-bold text-[#146B3A]">Rs 20,000 – Rs 30,000</p>
                <p className="text-xs text-[#7A8A8A] mt-1">Karachi: 30 days | Islamabad/Lahore: 10 days</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-xl p-6 border border-[#E0EAE4]">
                <h3 className="font-display font-semibold text-[#1F2A2A] mb-2">P@SHA Registration</h3>
                <p className="text-xl font-bold text-[#146B3A]">Rs 35,000</p>
                <p className="text-xs text-[#7A8A8A] mt-1">Minimum 20 Working Days</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Company Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Ongoing Company Compliance Services</h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {[
              { title: "Pvt Ltd Annual Compliance", fee: "Rs 25,000 (Annual)", time: "15–25 Working Days" },
              { title: "Director Change", fee: "Rs 35,000", time: "20–30 Working Days" },
              { title: "SMC Annual Compliance", fee: "Rs 25,000 (Annual)", time: "7–10 Working Days" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-[#F7FAF8] rounded-xl p-6 border border-[#E0EAE4]">
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-3 text-sm">{s.title}</h3>
                  <p className="text-xl font-bold text-[#146B3A]">{s.fee}</p>
                  <p className="text-xs text-[#7A8A8A] mt-2">{s.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Why Choose Pak Filer for Business Incorporation?</h2></FadeIn>
          <div className="space-y-4">
            {whyChoose.map((w, i) => (
              <FadeIn key={i} delay={i * 0.05}><div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[#E0EAE4]"><Award className="w-5 h-5 text-[#1A8549] mt-0.5 flex-shrink-0" /><p className="text-sm text-[#4A5A5A]">{w}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
