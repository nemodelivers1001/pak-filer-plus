import ServicePageLayout, { FadeIn } from "@/components/layout/ServicePageLayout";
import { RefreshCw, FileText } from "lucide-react";

const reasons = [
  "Change of employer or addition of a new employer",
  "Addition of business income to your existing salary income profile",
  "Change in business address or registered office address",
  "Change in directors, partners, or authorised representatives for a company or AOP",
  "Change in bank account details",
  "Addition of new income sources (rental, foreign, investment)",
  "Correction of errors in existing profile data",
  "Reactivation of a dormant or inactive IRIS account",
];

export default function IRISProfileUpdate() {
  return (
    <ServicePageLayout
      seo={{ title: "FBR IRIS Profile Update Pakistan | Salary & Business Income | Pak Filer", description: "Update your FBR IRIS profile for salary or business income changes. Fast, expert IRIS profile update service. From Rs 100.", canonical: "https://pakfiler.com/services/iris-profile-update" }}
      eyebrow="IRIS PROFILE UPDATE"
      title="FBR IRIS Profile Update — Keep Your Tax Record Accurate"
      subtitle="Your FBR IRIS profile is your official tax identity on Pakistan's tax portal. Any changes in your employment, business income, or personal details must be reflected accurately. Pak Filer handles your IRIS profile updates quickly and correctly."
      ctaPrimary={{ label: "Update My IRIS Profile", href: "/contact" }}
      badges={["From Rs 100", "1–3 Working Days", "FBR Compliant", "Expert Handled"]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "IRIS Profile Update" }]}
      faqs={[
        { q: "What happens if I don't update my IRIS profile?", a: "An outdated IRIS profile can cause your tax return to be rejected, result in mismatched withholding tax credits, and create compliance issues during FBR audits. It is important to keep your profile current, especially after any employment or business change." },
        { q: "Can I update my IRIS profile myself?", a: "Yes, you can log into your IRIS account and update it directly. However, incorrectly updating your profile can create legal complications. For Rs 100, our experts ensure the update is done accurately and in full compliance with FBR requirements." },
      ]}
    >
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">What is FBR IRIS?</h2></FadeIn>
          <FadeIn><p className="text-[#4A5A5A] leading-relaxed">IRIS (Inland Revenue Information System) is the FBR's official online tax portal where all taxpayers in Pakistan are registered. It is the system through which tax returns are filed, NTNs are managed, and taxpayer profiles are maintained. Keeping your IRIS profile current and accurate is a legal requirement and ensures your tax filings are processed without issues.</p></FadeIn>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">Common Reasons to Update Your IRIS Profile</h2></FadeIn>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {reasons.map((r, i) => (
              <FadeIn key={i} delay={i * 0.04}><div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[#E0EAE4]"><RefreshCw className="w-4 h-4 text-[#1A8549] mt-0.5 flex-shrink-0" /><p className="text-sm text-[#4A5A5A]">{r}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">IRIS Profile Update Categories</h2></FadeIn>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { title: "Salary Income Update", desc: "Update your IRIS profile to reflect changes in your salary income — including employer change, new employer addition, or salary income adjustments.", fee: "Rs 100", time: "1–3 Working Days" },
              { title: "Business Income Update", desc: "Update your IRIS profile for business income additions, changes to business details, director/partner changes, or address updates for your business entity.", fee: "Rs 800", time: "1–3 Working Days" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`rounded-xl p-6 border h-full ${i === 0 ? "bg-gradient-to-br from-[#1A8549] to-[#146B3A] text-white border-transparent" : "bg-white border-[#E0EAE4]"}`}>
                  <h3 className={`text-xl font-display font-semibold mb-2 ${i === 0 ? "text-white" : "text-[#1F2A2A]"}`}>{c.title}</h3>
                  <p className={`text-sm mb-4 ${i === 0 ? "text-white/70" : "text-[#4A5A5A]"}`}>{c.desc}</p>
                  <p className={`text-3xl font-display font-bold ${i === 0 ? "text-white" : "text-[#146B3A]"}`}>{c.fee}</p>
                  <p className={`text-xs mt-1 ${i === 0 ? "text-white/60" : "text-[#7A8A8A]"}`}>{c.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-2xl">
          <FadeIn><h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-8">How the IRIS Update Process Works</h2></FadeIn>
          <div className="space-y-4">
            {["Place your order and select your update category (Salary or Business)", "Submit your CNIC, current IRIS login details, and supporting documents", "Our team accesses FBR IRIS and makes the required updates", "Updated profile is confirmed and screenshot sent to you for records"].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}><div className="flex items-start gap-4"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A8549] to-[#146B3A] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">{i + 1}</div><p className="text-[#4A5A5A] pt-1">{s}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
