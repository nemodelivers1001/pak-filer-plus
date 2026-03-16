import { Link } from "react-router-dom";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

const PERSONAL_PRICING = {
  online: { label: "Online Filing", base: 999, multiSource: 1500, popular: true },
  upload: { label: "Document Upload (Fully Managed)", base: 3500 },
  ca: 1000,
};

const BUSINESS_PRICING = {
  online: [
    { label: "Individual / Sole Proprietor", price: 3000, popular: true },
    { label: "Partnership / AOP", price: 4500 },
    { label: "Private Limited Company", price: 6000 },
    { label: "Non-Profit Organization", price: 9000 },
  ],
  upload: [
    { label: "Individual / Sole Proprietor", price: 5000 },
    { label: "Partnership / AOP", price: 7500 },
    { label: "Private Limited Company", price: 10000 },
    { label: "Non-Profit Organization", price: 13000 },
  ],
  ca: [
    { label: "Individual / Sole Proprietor", price: 2000 },
    { label: "Partnership / AOP", price: 3000 },
    { label: "Private Limited Company", price: 4000 },
    { label: "Non-Profit Organization", price: 4000 },
  ],
};

const NTN_PRICING = [
  { label: "Salaried Individual", price: 500, timeline: "1–2 Working Days", popular: true },
  { label: "Sole Proprietor", price: 1500, timeline: "1–2 Working Days" },
  { label: "Partnership / AOP", price: 3500, timeline: "2–3 Working Days" },
  { label: "Company (Pvt Ltd / SMC)", price: 7000, timeline: "2–3 Working Days" },
  { label: "Non-Profit Organization", price: 9000, timeline: "2–3 Working Days" },
];

const OTHER_SERVICES = [
  { label: "GST Registration", price: "Rs 9,000", note: "Flat Fee" },
  { label: "IRIS Profile Update — Salary", price: "Rs 100", note: "1–3 Working Days" },
  { label: "IRIS Profile Update — Business", price: "Rs 800", note: "1–3 Working Days" },
  { label: "Family Tax Filing", price: "See Personal Rates", note: "Contact for bundle discount" },
  { label: "Salary Tax Calculator", price: "FREE", note: "Instant, no charge" },
];

const INCORPORATION = [
  { label: "Private Limited Company", price: "From Rs 25,000", note: "+ SECP Govt Fee; 3–10 days" },
  { label: "Single Member Company (SMC)", price: "From Rs 25,000", note: "+ SECP Govt Fee; 3–10 days" },
  { label: "LLP Registration", price: "Rs 45,000", note: "+ SECP fees; 7–10 days" },
  { label: "Partnership / AOP", price: "Rs 45,000", note: "City-dependent; 7–15 days" },
  { label: "NPO with SECP", price: "Rs 320,000", note: "+ Rs 180,000 Govt Fee; 3–4 months" },
  { label: "NPO Provincial", price: "Rs 320,000", note: "+ Rs 15,500 Govt Fee; 3–4 months" },
  { label: "PSEB Freelancer Registration", price: "Rs 15,000", note: "10 days" },
  { label: "PSEB Company Registration", price: "Rs 25,000", note: "15 days" },
  { label: "Chamber of Commerce (CCI)", price: "Rs 20,000–30,000", note: "Varies" },
  { label: "Annual Compliance (Pvt Ltd / SMC)", price: "Rs 25,000", note: "7–25 days" },
  { label: "Director Change", price: "Rs 35,000", note: "20–30 days" },
];

const FAQS = [
  {
    q: "Are there any hidden fees?",
    a: "No. All our professional service fees are stated upfront. For services with government fees (e.g., SECP incorporation), the government fee is stated separately and communicated before you proceed. You will never receive an unexpected charge.",
  },
  {
    q: "What is the CA Review add-on?",
    a: "The CA Review add-on is an optional service where a qualified Chartered Accountant personally reviews your tax return, verifies all calculations, identifies any missed deductions, and provides a brief advisory on your tax position. We recommend it for business owners and individuals with complex income structures.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a refund if we are unable to complete your service due to a reason on our end. If you have provided incorrect documents that require re-processing, a partial service fee may apply. Please review our full refund policy in our Terms & Conditions.",
  },
  {
    q: "Can I pay in instalments?",
    a: "For large incorporation or NPO registration projects, we can discuss a payment milestone structure. For standard filing services, full payment is required at the time of order. Contact our team to discuss your specific requirements.",
  },
];

export default function Pricing() {
  return (
    <ServicePageLayout
      seo={{
        title: "Tax Filing Pricing in Pakistan | Affordable CA-Certified Services | Pak Filer",
        description: "Transparent, affordable pricing for all Pak Filer tax services. Personal tax filing from Rs 999, NTN registration from Rs 500. View complete pricing for all services.",
        canonical: "https://pakfiler.com/pricing",
      }}
      eyebrow="PRICING"
      title="Simple, Transparent Pricing for Every Tax Service"
      subtitle="No hidden fees. No surprise charges. Just honest, competitive pricing for professional CA-certified tax services in Pakistan."
      badges={["All prices all-inclusive", "CA-reviewed", "No hidden fees"]}
      ctaPrimary={{ label: "Start Filing", href: "/services/personal-tax-filing" }}
      ctaSecondary={{ label: "View All Services", href: "/services" }}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      faqs={FAQS}
    >
      {/* TRUST LINE */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-3xl border border-[#E0EAE4] bg-[#FAFAF9] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#1F2A2A] font-semibold">All prices are all-inclusive. What you see is what you pay.</div>
            <div className="text-xs text-[#4A5A5A]">Government fees (e.g., SECP, FBR) are always itemized separately when applicable.</div>
          </div>
        </div>
      </section>

      {/* PERSONAL TAX FILING */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Personal Tax Filing</h2>
            <p className="text-[#4A5A5A] mt-2">Choose the service that matches your income sources and level of support.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#E0EAE4] bg-white p-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1F2A2A]">Online Filing</h3>
                  <p className="text-sm text-[#4A5A5A] mt-1">Self-guided filing with built-in tax logic.</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F5EE] px-3 py-1 text-xs font-semibold text-[#0E552F]">
                  ⭐ POPULAR
                </span>
              </div>
              <ul className="space-y-3 text-[#4A5A5A]">
                <li className="flex justify-between">
                  <span>Base Fee — 1 Income Source</span>
                  <span className="font-semibold">Rs 999</span>
                </li>
                <li className="flex justify-between">
                  <span>More than 1 Income Source</span>
                  <span className="font-semibold">Rs 1,500</span>
                </li>
                <li className="flex justify-between">
                  <span>CA Review Add-on</span>
                  <span className="font-semibold">+ Rs 1,000</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/services/personal-tax-filing" className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1A8549] px-6 py-4 text-white font-bold shadow-lg hover:bg-[#146B3A] transition">
                  Start Online Filing
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E0EAE4] bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2A2A] mb-2">Document Upload (Fully Managed)</h3>
              <p className="text-sm text-[#4A5A5A] mb-6">Send us your documents and we'll file the entire return for you.</p>
              <ul className="space-y-3 text-[#4A5A5A]">
                <li className="flex justify-between">
                  <span>Base Fee</span>
                  <span className="font-semibold">Rs 3,500</span>
                </li>
                <li className="flex justify-between">
                  <span>CA Review Add-on</span>
                  <span className="font-semibold">+ Rs 1,000</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/services/personal-tax-filing" className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1A8549] px-6 py-4 text-white font-bold shadow-lg hover:bg-[#146B3A] transition">
                  Upload Documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS TAX FILING */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Business Tax Return Filing</h2>
            <p className="text-[#4A5A5A] mt-2">Flexible filing options for proprietors, partnerships, companies, and nonprofits.</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#E0EAE4] bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2A2A] mb-4">Online Filing</h3>
              <table className="w-full text-sm text-left text-[#4A5A5A]">
                <tbody>
                  {BUSINESS_PRICING.online.map((row) => (
                    <tr key={row.label} className="border-b border-[#E0EAE4]">
                      <td className="py-4">{row.label}</td>
                      <td className="py-4 font-semibold">Rs {row.price.toLocaleString()}</td>
                      <td className="py-4 text-right text-xs text-[#7A8A8A]">{row.popular ? "⭐ POPULAR" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8">
                <p className="text-xs font-semibold text-[#4A5A5A]">CA Review Add-on (additional)</p>
                <ul className="mt-3 space-y-2 text-[#4A5A5A]">
                  {BUSINESS_PRICING.ca.map((row) => (
                    <li key={row.label} className="flex justify-between">
                      <span>{row.label}</span>
                      <span className="font-semibold">+ Rs {row.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link to="/services/business-tax-return" className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1A8549] px-6 py-4 text-white font-bold shadow-lg hover:bg-[#146B3A] transition">
                  Start Business Filing
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E0EAE4] bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2A2A] mb-4">Document Upload (Fully Managed)</h3>
              <table className="w-full text-sm text-left text-[#4A5A5A]">
                <tbody>
                  {BUSINESS_PRICING.upload.map((row) => (
                    <tr key={row.label} className="border-b border-[#E0EAE4]">
                      <td className="py-4">{row.label}</td>
                      <td className="py-4 font-semibold">Rs {row.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-8">
                <Link to="/services/business-tax-return" className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1A8549] px-6 py-4 text-white font-bold shadow-lg hover:bg-[#146B3A] transition">
                  Upload Documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NTN PRICING */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">NTN Registration</h2>
            <p className="text-[#4A5A5A] mt-2">Quick registration with guaranteed timelines and dedicated support.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm text-[#4A5A5A]">
              <thead className="text-xs uppercase tracking-wide text-[#7A8A8A]">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Timeline</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {NTN_PRICING.map((row) => (
                  <tr key={row.label} className="border-t border-[#E0EAE4]">
                    <td className="py-4 px-4">{row.label}</td>
                    <td className="py-4 px-4 font-semibold">Rs {row.price.toLocaleString()}</td>
                    <td className="py-4 px-4">{row.timeline}</td>
                    <td className="py-4 px-4">
                      <Link to="/services/ntn-registration" className="inline-flex items-center justify-center rounded-full bg-[#1A8549] px-5 py-2 text-xs font-semibold text-white hover:bg-[#146B3A] transition">
                        Get Started
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Other Services</h2>
            <p className="text-[#4A5A5A] mt-2">One-off services to complete your compliance journey.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {OTHER_SERVICES.map((item) => (
              <div key={item.label} className="rounded-3xl border border-[#E0EAE4] bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2A2A]">{item.label}</h3>
                    <p className="text-sm text-[#4A5A5A] mt-1">{item.note}</p>
                  </div>
                  <div className="text-right font-semibold text-[#1F2A2A]">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS INCORPORATION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Business Incorporation Pricing</h2>
            <p className="text-[#4A5A5A] mt-2">Structured pricing for company registration and ongoing compliance.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm text-[#4A5A5A]">
              <thead className="text-xs uppercase tracking-wide text-[#7A8A8A]">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Starting Price</th>
                  <th className="py-3 px-4">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {INCORPORATION.map((row) => (
                  <tr key={row.label} className="border-t border-[#E0EAE4]">
                    <td className="py-4 px-4">{row.label}</td>
                    <td className="py-4 px-4 font-semibold">{row.price}</td>
                    <td className="py-4 px-4">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING COMPARISON TABLE */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Quick Pricing Comparison</h2>
            <p className="text-[#4A5A5A] mt-2">Compare core services at a glance and start the one that fits your needs.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm text-[#4A5A5A]">
              <thead className="text-xs uppercase tracking-wide text-[#7A8A8A]">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Starting Price</th>
                  <th className="py-3 px-4">Timeline</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: "Personal Tax Filing", price: "From Rs 999", timeline: "1–3 days", href: "/services/personal-tax-filing", popular: true },
                  { service: "Business Tax Return", price: "From Rs 3,000", timeline: "2–5 days", href: "/services/business-tax-return" },
                  { service: "NTN Registration", price: "From Rs 500", timeline: "1–3 days", href: "/services/ntn-registration" },
                  { service: "GST Registration", price: "Rs 9,000", timeline: "3–7 days", href: "/services/gst-registration" },
                  { service: "Business Incorporation", price: "From Rs 25,000", timeline: "3–15 days", href: "/services/business-incorporation" },
                ].map((row) => (
                  <tr key={row.service} className={`border-t border-[#E0EAE4] ${row.popular ? "bg-[#E8F5EE]" : ""}`}>
                    <td className="py-4 px-4 font-semibold text-[#1F2A2A]">{row.service}</td>
                    <td className="py-4 px-4 font-semibold">{row.price}</td>
                    <td className="py-4 px-4">{row.timeline}</td>
                    <td className="py-4 px-4">
                      <Link to={row.href} className="inline-flex items-center justify-center rounded-full bg-[#1A8549] px-5 py-2 text-xs font-semibold text-white hover:bg-[#146B3A] transition">
                        Get Started
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
