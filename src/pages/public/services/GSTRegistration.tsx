import ServicePageLayout, { FadeIn } from "@/components/layout/ServicePageLayout";
import { FileText } from "lucide-react";

const whoMustRegister = [
  "Manufacturers with annual taxable supplies exceeding Rs 10 million",
  "Importers and exporters of taxable goods",
  "Retailers and wholesalers with annual turnover above the prescribed threshold",
  "Service providers registered under provincial revenue authorities for applicable services",
  "Businesses dealing in zero-rated goods (e.g., exporters seeking refund eligibility)",
  "Any business voluntarily wishing to register to claim input tax credits",
];

const included = [
  "Preparation and submission of GST/STRN registration application on FBR IRIS",
  "Category determination: manufacturer, importer, exporter, retailer, service provider",
  "Verification of business address and supporting documentation",
];

const docs = [
  "Business NTN", "CNIC of business owner / directors",
  "Business bank account statement (last 3 months)", "Business address proof: utility bill or lease agreement",
  "Business registration documents (for companies/AOPs)", "Description of business activity and main products/services supplied",
  "Mobile number and email linked to FBR IRIS",
];

export default function GSTRegistration() {
  return (
    <ServicePageLayout
      seo={{ title: "GST Registration Pakistan | Sales Tax FBR Registration | Pak Filer", description: "Register your business for GST/Sales Tax with FBR. Expert GST registration service in Pakistan. Flat fee Rs 9,000.", canonical: "https://pakfiler.com/services/gst-registration" }}
      eyebrow="GST REGISTRATION"
      title="GST Registration in Pakistan — Register for Sales Tax with FBR"
      subtitle="If your business supplies taxable goods or services above the mandatory threshold, GST registration with FBR is a legal requirement. Pak Filer's experts handle the entire registration process — from documentation to STRN issuance."
      ctaPrimary={{ label: "Register for GST Now", href: "/contact" }}
      badges={["Flat Fee Rs 9,000", "Expert Handled", "FBR STRN Issued", "Fully Managed"]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "GST Registration" }]}
      faqs={[
        { q: "What is the difference between NTN and STRN?", a: "NTN (National Tax Number) is for income tax registration. STRN (Sales Tax Registration Number) — also called GST number — is for sales tax registration. Both are issued by FBR but for different tax purposes. Many businesses require both." },
        { q: "Is GST registration mandatory for all businesses?", a: "No. GST registration is mandatory only for businesses that exceed the prescribed taxable supply threshold or fall in specific mandatory registration categories. Small businesses below the threshold may register voluntarily to claim input tax credits. We can assess your specific situation and advise you accordingly." },
        { q: "What are the ongoing obligations after GST registration?", a: "After registration, your business must file monthly sales tax returns (Sales Tax Return) on the FBR portal, maintain proper invoicing and record-keeping, and remit collected tax by the 15th of the following month. Pak Filer also offers ongoing GST return filing services separately." },
      ]}
    >
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">What is General Sales Tax (GST) in Pakistan?</h2></FadeIn>
          <FadeIn><p className="text-[#4A5A5A] leading-relaxed mb-8">General Sales Tax (GST) is an indirect tax levied on the supply of taxable goods and services in Pakistan. It is administered by the Federal Board of Revenue (FBR) at the federal level, and by provincial revenue authorities (SRB, PRA, KPRA, BRA) for services. Businesses registered for GST are required to collect tax from their customers, file monthly or quarterly sales tax returns, and remit the collected tax to the government.</p></FadeIn>
          <FadeIn><h3 className="text-xl font-display font-semibold text-[#1F2A2A] mb-4">Who Must Register for GST?</h3></FadeIn>
          <div className="space-y-3">
            {whoMustRegister.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}><div className="flex items-start gap-3"><span className="text-[#1A8549] font-bold">•</span><p className="text-sm text-[#4A5A5A]">{item}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-xl mx-auto text-center">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">GST Registration Fee</h2></FadeIn>
          <FadeIn>
            <div className="bg-gradient-to-br from-[#1A8549] to-[#146B3A] rounded-2xl p-8 text-white">
              <p className="text-sm text-white/60 mb-2">Registration Fee</p>
              <p className="text-5xl font-display font-bold mb-2">Rs 9,000</p>
              <p className="text-white/60 text-sm">Flat Fee — All-Inclusive</p>
              <p className="text-white/50 text-xs mt-4">Timeline: Typically 5–15 working days based on FBR processing</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Documents Required for GST Registration</h2></FadeIn>
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
