import ServicePageLayout, { FadeIn } from "@/components/layout/ServicePageLayout";
import { Users, FileText, Shield, Heart } from "lucide-react";

const benefits = [
  { icon: Users, title: "Single Point of Contact", desc: "One dedicated expert handles all your family's filings. No need to coordinate with multiple accountants." },
  { icon: Heart, title: "Discounted Family Rates", desc: "Filing for multiple family members unlocks volume discounts on our standard personal tax filing fees." },
  { icon: FileText, title: "Centralised Document Management", desc: "Submit all documents through one secure channel. We organise and track each family member's filing separately." },
  { icon: Shield, title: "Consistent Compliance", desc: "We ensure every family member's return is filed on time, keeping your entire household legally compliant." },
];

const docs = [
  "CNIC of each family member to be filed for",
  "Income proofs (salary slips, bank statements, rent agreements) for each member",
  "Zakat certificates and investment details (if applicable) for each member",
  "Asset details: property and vehicle ownership documents",
];

export default function FamilyTaxFiling() {
  return (
    <ServicePageLayout
      seo={{ title: "Family Tax Filing Service Pakistan | File for Spouse & Dependents | Pak Filer", description: "File income tax returns for all family members online. CA-certified family tax filing in Pakistan — convenient and affordable.", canonical: "https://pakfiler.com/services/family-tax-filing" }}
      eyebrow="FAMILY TAX FILING"
      title="Family Tax Filing — File for Your Loved Ones with Confidence"
      subtitle="Managing tax returns for multiple family members can be overwhelming. Pak Filer's family tax filing service lets you file for your spouse, children, parents, and other dependents — all from one account, with one expert team handling everything."
      ctaPrimary={{ label: "File for My Family", href: "/contact" }}
      ctaSecondary={{ label: "Contact Us for Pricing", href: "/contact" }}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Family Tax Filing" }]}
      faqs={[
        { q: "Can I file for a family member who lives abroad?", a: "Yes. If a family member is an overseas Pakistani with assets, property, or income in Pakistan, they are still required to file a tax return in Pakistan. We handle overseas Pakistani filings remotely." },
        { q: "Does a housewife need to file a tax return?", a: "A housewife with no personal income is typically not required to file. However, if they own property, a vehicle, or have any investment income or bank deposits in their name, they may be required to file. We recommend consulting with us for a free assessment." },
      ]}
    >
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">Who Can Use Family Tax Filing?</h2></FadeIn>
          <FadeIn><p className="text-[#4A5A5A] mb-8 max-w-3xl">If you're the primary breadwinner or financial manager of your household, Pak Filer's family filing service gives you a single point of contact to manage all your family members' FBR compliance obligations.</p></FadeIn>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {["Spouse with salary, rental, or investment income", "Adult children who are salaried or have business income", "Parents who own property or receive pension income", "Any family member required to file under FBR regulations"].map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}><div className="flex items-start gap-3 bg-[#F7FAF8] rounded-lg p-4 border border-[#E0EAE4]"><span className="text-[#1A8549]">✓</span><p className="text-sm text-[#4A5A5A]">{item}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Why File as a Family Through Pak Filer?</h2></FadeIn>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {benefits.map((b, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6 border border-[#E0EAE4] h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F5EE] flex items-center justify-center mb-3"><b.icon className="w-5 h-5 text-[#1A8549]" /></div>
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-2">{b.title}</h3>
                  <p className="text-sm text-[#4A5A5A]">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Documents Needed per Family Member</h2></FadeIn>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {docs.map((d, i) => (<FadeIn key={i} delay={i * 0.05}><div className="flex items-start gap-3 bg-[#F7FAF8] rounded-lg p-4 border border-[#E0EAE4]"><FileText className="w-5 h-5 text-[#1A8549] mt-0.5 flex-shrink-0" /><p className="text-sm text-[#4A5A5A]">{d}</p></div></FadeIn>))}
          </div>
          <FadeIn className="mt-6"><p className="text-sm text-[#7A8A8A]">Our team will provide a specific checklist once you contact us with your family size and income structure.</p></FadeIn>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">Process & Pricing</h2></FadeIn>
          <FadeIn><p className="text-[#4A5A5A] mb-6">Family tax filing is priced per individual, based on their income complexity, using the same pricing structure as Personal Tax Filing. Volume discounts are available for 3 or more family members.</p></FadeIn>
          <div className="bg-white rounded-xl p-6 border border-[#E0EAE4] space-y-4">
            <div className="flex justify-between"><span className="text-sm text-[#4A5A5A]">Base Rate per Family Member</span><span className="font-bold text-[#146B3A]">From Rs 999</span></div>
            <div className="flex justify-between"><span className="text-sm text-[#4A5A5A]">Volume Discount (3+ members)</span><span className="font-bold text-[#146B3A]">Contact Us</span></div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
