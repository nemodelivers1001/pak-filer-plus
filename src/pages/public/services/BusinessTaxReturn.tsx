import ServicePageLayout, { FadeIn } from "@/components/layout/ServicePageLayout";
import { Building2, Users, Briefcase, Shield, FileText } from "lucide-react";

const entities = [
  { icon: Briefcase, title: "Sole Proprietor", desc: "Individual business owners operating under their own name or a trade name. Includes shopkeepers, traders, consultants, freelancers, and independent professionals." },
  { icon: Users, title: "Partnership / AOP", desc: "Partnership firms and Associations of Persons (AOPs) operating under a partnership deed. Includes law firms, medical practices, and family businesses." },
  { icon: Building2, title: "Private Limited Company", desc: "Companies incorporated under SECP — including Pvt Ltd companies, SMCs (Single Member Companies), and holding companies with regulatory compliance obligations." },
  { icon: Shield, title: "Non-Profit Organization (NPO)", desc: "Trusts, foundations, welfare organisations, and charities registered under relevant laws with specific FBR compliance and exemption management requirements." },
];

const pricing = [
  { category: "Individual / Sole Proprietor", online: "Rs 3,000", ca: "+ Rs 2,000", upload: "Rs 5,000" },
  { category: "Partnership / AOP", online: "Rs 4,500", ca: "+ Rs 3,000", upload: "Rs 7,500" },
  { category: "Private Limited Company", online: "Rs 6,000", ca: "+ Rs 4,000", upload: "Rs 10,000" },
  { category: "Non-Profit Organization", online: "Rs 9,000", ca: "+ Rs 4,000", upload: "Rs 13,000" },
];

const docs = [
  "Business NTN and STRN (if GST registered)", "Financial statements: Balance Sheet and Profit & Loss for the tax year",
  "Bank statements for all business accounts", "Sales and purchase register / ledger",
  "Fixed asset schedule with acquisition dates and costs", "Withholding tax deduction details (received and deducted)",
  "Utility bills and major expense receipts", "Loan agreements and interest schedules (if applicable)",
  "SECP annual return (for Private Limited Companies)", "Partnership deed (for partnerships/AOPs)",
];

export default function BusinessTaxReturn() {
  return (
    <ServicePageLayout
      seo={{ title: "Business Tax Return Filing Pakistan | Sole Proprietor, AOP, Pvt Ltd | Pak Filer", description: "Expert CA-certified business income tax return for sole proprietors, AOPs, Pvt Ltd, and NPOs in Pakistan. From Rs 3,000.", canonical: "https://pakfiler.com/services/business-tax-return" }}
      eyebrow="BUSINESS TAX RETURN"
      title="Business Tax Return Filing — Expert CA-Certified Compliance"
      subtitle="Pakistan's tax compliance requirements for businesses are complex and constantly evolving. Pak Filer's CA-certified business tax return service ensures your company meets all FBR obligations accurately and on time — every year."
      ctaPrimary={{ label: "File My Business Return", href: "/auth" }}
      ctaSecondary={{ label: "View Business Pricing", href: "/pricing" }}
      badges={["From Rs 3,000", "2–5 Working Days", "CA Certified", "All Entity Types"]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Business Tax Return" }]}
      faqs={[
        { q: "What is the tax return deadline for a Private Limited Company in Pakistan?", a: "For companies with a tax year ending June 30, the filing deadline is typically December 31. For companies with different accounting year ends, the deadline is 6 months after the year end. We monitor all deadlines and alert our clients in advance." },
        { q: "What happens if my business doesn't file a return?", a: "Failure to file results in automatic penalties, back taxes with interest, and potential audit proceedings. Non-filer businesses also face higher withholding tax rates on transactions. Pak Filer helps you stay compliant and avoid these costly consequences." },
        { q: "Do you handle businesses that have been inactive?", a: "Yes. Even inactive or dormant companies may be required to file a 'nil return' with FBR. We handle nil returns as well as returns for businesses with complex multi-year activity." },
      ]}
    >
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Which Business Entities Do We Serve?</h2></FadeIn>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {entities.map((e, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-[#F7FAF8] rounded-xl p-6 border border-[#E0EAE4] h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F5EE] flex items-center justify-center mb-3"><e.icon className="w-5 h-5 text-[#1A8549]" /></div>
                  <h3 className="font-display font-semibold text-[#1F2A2A] mb-2">{e.title}</h3>
                  <p className="text-sm text-[#4A5A5A]">{e.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Business Tax Return Pricing</h2></FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-[#E0EAE4] overflow-hidden">
              <thead><tr className="bg-gradient-to-r from-[#1A8549] to-[#146B3A] text-white">
                <th className="text-left p-4 text-sm font-semibold">Category</th>
                <th className="text-center p-4 text-sm font-semibold">Online Filing</th>
                <th className="text-center p-4 text-sm font-semibold">CA Review Add-on</th>
                <th className="text-center p-4 text-sm font-semibold">Document Upload</th>
              </tr></thead>
              <tbody>
                {pricing.map((p, i) => (
                  <tr key={i} className={`border-t border-[#E0EAE4] ${i === 0 ? "bg-[#E8F5EE]" : ""}`}>
                    <td className="p-4 text-sm font-medium text-[#1F2A2A]">{p.category}</td>
                    <td className="p-4 text-center font-bold text-[#146B3A]">{p.online}</td>
                    <td className="p-4 text-center text-[#4A5A5A]">{p.ca}</td>
                    <td className="p-4 text-center font-bold text-[#146B3A]">{p.upload}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Required Documents for Business Tax Return</h2></FadeIn>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {docs.map((d, i) => (
              <FadeIn key={i} delay={i * 0.04}><div className="flex items-start gap-3 bg-[#F7FAF8] rounded-lg p-4 border border-[#E0EAE4]"><FileText className="w-4 h-4 text-[#1A8549] mt-0.5 flex-shrink-0" /><p className="text-sm text-[#4A5A5A]">{d}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
