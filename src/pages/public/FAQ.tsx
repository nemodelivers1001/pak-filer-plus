import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/layout/SEOHead";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/layout/FinalCTA";

const generalTaxFaqs = [
  {
    question: "Who is required to file an income tax return in Pakistan?",
    answer: "Any individual whose annual income exceeds Rs 600,000 is required to file an income tax return with FBR. Additionally, individuals who own property, a vehicle, or have a foreign bank account must file regardless of income. All companies, AOPs, and partnerships must also file annual returns.",
  },
  {
    question: "What is the difference between a tax filer and non-filer in Pakistan?",
    answer: "A tax filer is someone who has filed their income tax return for the most recent tax year and appears on FBR's Active Taxpayers List (ATL). Non-filers face double or higher withholding tax rates on bank transactions, property purchases, vehicle registrations, and dividends. Becoming a filer can save you thousands of rupees annually.",
  },
  {
    question: "What is Pakistan's tax year?",
    answer: "Pakistan's standard tax year runs from July 1 to June 30. It is referred to as a 'Normal Tax Year'. The filing deadline for individuals is typically September 30. Companies may have different accounting years, subject to FBR approval.",
  },
  {
    question: "Can I file a tax return for previous years?",
    answer: "Yes. FBR allows late filing of previous years' tax returns, subject to late filing penalties. Filing for previous years helps you become an active filer and can clear any compliance notices you may have received. Pak Filer can assist with filing returns for previous tax years.",
  },
];

const taxFilingFaqs = [
  {
    question: "What documents do I need to file my personal tax return?",
    answer: "You'll need: your CNIC, salary slips or employment certificate, bank statements for the full tax year, details of any rental income, investment or savings details, and any charitable donation receipts. Our team provides a complete document checklist after you place your order.",
  },
  {
    question: "What if I made an error in my filed tax return?",
    answer: "FBR allows you to file a revised tax return within 5 years of the original filing date. If Pak Filer made an error in your filing, we will revise it at no additional charge. Errors in self-submitted information may require a revision fee.",
  },
  {
    question: "What is a Wealth Statement and do I need to file it?",
    answer: "A Wealth Statement (also called a Statement of Assets and Liabilities) is a declaration of your total assets and liabilities at the end of the tax year. It is mandatory for all individuals whose last filed return shows taxable income, and it must reconcile with the previous year's statement. Pak Filer prepares the wealth statement as part of your tax return filing.",
  },
  {
    question: "What penalties apply for late tax filing in Pakistan?",
    answer: "FBR imposes a minimum penalty of Rs 1,000 per month for late filing of individual returns, and higher penalties for businesses. Additionally, late filers may face surcharges on unpaid tax and, in severe cases, audit proceedings. Filing on time — or even late with Pak Filer's help — avoids escalating penalties.",
  },
];

const ntnGstFaqs = [
  {
    question: "How can I check if I already have an NTN?",
    answer: "You can verify your NTN status on the FBR website at www.fbr.gov.pk using your CNIC. If you have a CNIC, you may already have an NTN assigned to it. However, having an NTN doesn't automatically make you an active filer — you still need to file returns annually.",
  },
  {
    question: "How long does NTN registration take?",
    answer: "With complete documentation, NTN registration for salaried individuals and sole proprietors is typically completed within 1–2 working days. Partnership, company, and NPO NTNs take 2–3 working days due to additional verification requirements.",
  },
  {
    question: "Is GST registration mandatory for all businesses?",
    answer: "No. GST/Sales Tax registration is mandatory for manufacturers with annual supplies exceeding Rs 10 million, all importers, and certain categories of service providers. Businesses below the threshold may register voluntarily to claim input tax credits. Contact Pak Filer for a free eligibility assessment.",
  },
  {
    question: "What is STRN and how is it different from NTN?",
    answer: "NTN is your Income Tax registration number. STRN (Sales Tax Registration Number) is your Sales Tax/GST registration number. Both are issued by FBR but serve different tax purposes. Businesses that deal in taxable goods or services typically need both.",
  },
];

const billingFaqs = [
  {
    question: "What payment methods does Pak Filer accept?",
    answer: "We accept all major payment methods available in Pakistan, including bank transfer, JazzCash, EasyPaisa, credit/debit cards, and online banking. Payment details are provided at checkout.",
  },
  {
    question: "What is Pak Filer's refund policy?",
    answer: "We offer a full refund if we are unable to complete your service due to a limitation on our end. If the service cannot be completed due to incorrect or incomplete information provided by the client, a partial fee may be retained for work already completed. Full refund policy is detailed in our Terms & Conditions.",
  },
  {
    question: "Are there any additional government fees on top of Pak Filer's service fee?",
    answer: "For most services (personal tax filing, NTN registration, IRIS update), there are no additional government fees. For business incorporation and GST registration, SECP and FBR may charge government fees — these are always communicated upfront and listed separately from our professional service fee.",
  },
];

const processFaqs = [
  {
    question: "How will I know when my service is complete?",
    answer: "We provide status updates via WhatsApp or email throughout the process. Upon completion, you will receive a confirmation message along with relevant documents — such as your FBR filing acknowledgment, NTN certificate, or SECP incorporation certificate — via WhatsApp or email.",
  },
  {
    question: "What if my service takes longer than the stated timeline?",
    answer: "Our stated timelines are for standard cases with complete documentation. Delays can occasionally occur due to FBR system issues, public holidays, or if additional documentation is required. We always communicate delays proactively and keep you informed.",
  },
  {
    question: "Do I need to come to your office?",
    answer: "No. Pak Filer is a fully online service. You never need to visit any office. All document submission, communication, and service delivery is handled remotely through WhatsApp, email, or our secure online portal.",
  },
];

const allFaqs = [
  ...generalTaxFaqs,
  ...taxFilingFaqs,
  ...ntnGstFaqs,
  ...billingFaqs,
  ...processFaqs,
];

export default function FAQ() {
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allFaqs;

    return allFaqs.filter((faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query));
  }, [search]);

  return (
    <div className="bg-white">
      <SEOHead
        title="Frequently Asked Questions | Pakistan Tax Filing FAQ | Pak Filer"
        description="Find answers to all your questions about income tax filing, NTN registration, GST, business compliance, and Pak Filer's services. Comprehensive Pakistan tax FAQ."
        canonical="https://pakfiler.com/faq"
      />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A8549] to-[#146B3A]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 20%, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/></svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3 block">FAQs</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Your Tax Questions — Answered by Experts
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed mb-10">
            Browse our comprehensive FAQ covering income tax, NTN registration, GST, business compliance, our platform, and pricing. Can't find your answer? Contact us directly.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your question..."
                className="w-full rounded-3xl border border-white/30 bg-white/10 py-4 pl-12 pr-4 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/20 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {search ? (
        <FAQSection
          title={`Search results for “${search}”`}
          subtitle={`Showing ${filteredFaqs.length} result${filteredFaqs.length === 1 ? "" : "s"}.`}
          faqs={filteredFaqs}
        />
      ) : (
        <>
          <FAQSection
            title="General Tax Questions"
            subtitle="Common questions about filing, compliance, and the tax system in Pakistan."
            faqs={generalTaxFaqs}
          />
          <FAQSection
            title="Tax Filing Questions"
            subtitle="Answers to help make your filing process smoother."
            faqs={taxFilingFaqs}
          />
          <FAQSection
            title="NTN & GST Registration Questions"
            subtitle="Key details about NTN, GST, and how registration works."
            faqs={ntnGstFaqs}
          />
          <FAQSection
            title="Billing & Pricing Questions"
            subtitle="Questions about payments, refunds, and government fees."
            faqs={billingFaqs}
          />
          <FAQSection
            title="Process & Timeline Questions"
            subtitle="What to expect while we handle your filing or registration."
            faqs={processFaqs}
          />
        </>
      )}

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-display font-bold text-[#1F2A2A] mb-4">Need Personal Support?</h2>
          <p className="text-[#4A5A5A] mb-8">
            Our team is happy to help you select the right service or answer a question about your filing.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#146B3A] text-white font-bold rounded-xl shadow-lg hover:bg-[#0f5730] transition">
            Contact Support
          </Link>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
