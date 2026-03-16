import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ChevronRight, FileText, Users, Building2, Receipt,
  RefreshCw, Calculator, Briefcase, CreditCard, Shield, Clock,
  Award, Headphones, Globe, Lock, Star, Quote, CheckCircle
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/layout/SEOHead";
import FinalCTA from "@/components/layout/FinalCTA";

// Animated counter component
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Fade-in wrapper
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  { icon: FileText, title: "Personal Tax Filing", desc: "File your FBR income tax return as a salaried employee, teacher, researcher, or individual with multiple income sources.", link: "/services/personal-tax-filing" },
  { icon: Users, title: "Family Tax Filing", desc: "Manage and file tax returns for all your family members under one platform with ease.", link: "/services/family-tax-filing" },
  { icon: Building2, title: "Business Tax Return", desc: "Expert tax return filing for sole proprietors, partnerships, private limited companies, and NPOs.", link: "/services/business-tax-return" },
  { icon: Receipt, title: "NTN Registration", desc: "Get your National Tax Number registered quickly — for salaried individuals, businesses, partnerships, and companies.", link: "/services/ntn-registration" },
  { icon: RefreshCw, title: "IRIS Profile Update", desc: "Update your FBR IRIS profile for salary or business income changes with our fast, hassle-free service.", link: "/services/iris-profile-update" },
  { icon: CreditCard, title: "GST Registration", desc: "Register your business for General Sales Tax (GST) with FBR — handled by our compliance experts.", link: "/services/gst-registration" },
  { icon: Briefcase, title: "Business Incorporation", desc: "Incorporate your company, register an NPO, set up employee benefit funds, and more.", link: "/services/business-incorporation" },
  { icon: Calculator, title: "Salary Tax Calculator", desc: "Use our free salary tax calculator to instantly estimate your payable income tax under Pakistan's tax slabs.", link: "/services/salary-tax-calculator" },
];

const steps = [
  { num: "1", title: "Choose Your Service", desc: "Select the service that fits your needs — personal filing, business return, NTN registration, or any other compliance requirement." },
  { num: "2", title: "Submit Your Information", desc: "Fill in your details online or upload your documents. Our secure platform guides you at every step with clear instructions." },
  { num: "3", title: "We Handle the Rest", desc: "Our CA-certified experts review and file your return with FBR. You receive confirmation once your filing is complete." },
];

const features = [
  { icon: Award, title: "CA-Certified Expertise", desc: "Every return is reviewed by qualified Chartered Accountants registered with ICAP, ensuring 100% accuracy and compliance with FBR regulations." },
  { icon: Lock, title: "Bank-Grade Security", desc: "Your data is protected with 256-bit SSL encryption. We never share your personal or financial information with third parties." },
  { icon: Clock, title: "Fast Turnaround Times", desc: "Most services are completed within 1–3 working days. NTN registrations and IRIS updates are typically done within 24 hours." },
  { icon: CreditCard, title: "Affordable Pricing", desc: "Transparent, flat-fee pricing with no hidden charges. Personal tax filing starts from just Rs 999 — the most competitive rate in Pakistan." },
  { icon: Headphones, title: "Dedicated Support", desc: "Get real-time support via WhatsApp, email, or phone. Our tax experts are available Monday to Saturday, 9 AM–6 PM PKT." },
  { icon: Globe, title: "100% Online Process", desc: "File from anywhere in Pakistan or abroad. No physical documents needed — everything is handled digitally through our secure platform." },
];

const testimonials = [
  { name: "Ahmed Raza", role: "Software Engineer, Lahore", text: "I had no idea how to file taxes. Pak Filer made it incredibly simple — I submitted my documents and they handled everything within 2 days. Highly recommended!" },
  { name: "Sara Khan", role: "Government Teacher, Islamabad", text: "As a government teacher, I was confused about my tax obligations. Pak Filer not only filed my return but also helped me understand my tax benefits. Excellent service." },
  { name: "Bilal Traders (SME)", role: "Sole Proprietor, Karachi", text: "We've been using Pak Filer for our business tax returns for 2 years. Affordable, professional, and always on time. Their CA review add-on is worth every rupee." },
];

const faqs = [
  { q: "Who needs to file a tax return in Pakistan?", a: "In Pakistan, any individual whose annual income exceeds Rs 600,000 is required to file an income tax return with the FBR. Additionally, individuals who own property, vehicles, or have foreign income must also file, regardless of their income level. Becoming an active tax filer also has significant benefits, including lower tax rates on banking transactions, property purchases, and vehicle registration." },
  { q: "What is the deadline for filing income tax returns in Pakistan?", a: "The standard deadline for filing individual income tax returns in Pakistan is September 30th of each year for the previous tax year (July 1 – June 30). FBR occasionally extends this deadline. Business entities and companies may have different deadlines based on their accounting year. We recommend filing early to avoid last-minute penalties." },
  { q: "What is NTN and why do I need it?", a: "NTN stands for National Tax Number — it is your unique identification number with the Federal Board of Revenue (FBR). Every individual and business entity that pays taxes or conducts formal financial transactions in Pakistan requires an NTN. It is mandatory for opening business bank accounts, registering a company, entering into contracts, and benefiting from lower withholding tax rates." },
  { q: "How long does it take to file my tax return through Pak Filer?", a: "Once you submit all required documents, our team typically completes personal tax filings within 1–3 working days. Business tax returns may take 2–5 working days depending on complexity. NTN registrations are usually completed within 1–2 working days. We always keep you informed of progress via WhatsApp or email." },
  { q: "Is my information safe with Pak Filer?", a: "Absolutely. We use 256-bit SSL encryption on all data transmission and storage. Your personal, financial, and identity documents are stored in a secure, encrypted environment. We have a strict zero-sharing policy — your information is never shared with any third party without your explicit consent." },
];

const stats = [
  { value: 10000, suffix: "+", label: "Tax Returns Filed" },
  { value: 5000, suffix: "+", label: "NTNs Registered" },
  { value: 98, suffix: "%", label: "Client Satisfaction Rate" },
  { value: 0, label: "CA Certified", text: "CA Certified" },
  { value: 100, suffix: "%", label: "Secure & Encrypted" },
];

export default function Home() {
  return (
    <div className="bg-white">
      <SEOHead
        title="Pak Filer | Pakistan's #1 Online Tax Filing Platform | FBR Tax Returns"
        description="File your FBR tax return online with Pak Filer. CA-certified tax filing for salaried employees, businesses, NTN registration, GST registration & more. Starting from Rs 999."
        ogTitle="Pak Filer — File Your Taxes Online in Pakistan"
        canonical="https://pakfiler.com/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pak Filer",
          url: "https://pakfiler.com",
          description: "Pakistan's premier online tax filing and business compliance platform",
        }}
      />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A8549] to-[#146B3A]" />
        {/* SVG Wave overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H0Z" fill="white"/></svg>
        </div>
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm mb-6">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-semibold uppercase tracking-wider">Pakistan's Most Trusted Tax Filing Platform</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                File Your Taxes Online — Fast, Easy & CA-Certified
              </h1>

              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                From salaried employees to business owners — Pak Filer handles your FBR tax returns, NTN registration, GST registration, and business compliance with expert precision. Starting from just Rs 999.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/services/personal-tax-filing">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white text-[#146B3A] font-bold rounded-xl shadow-xl flex items-center gap-2 text-lg">
                    Start Filing Your Tax Return <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/services">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm flex items-center gap-2 text-lg">
                    Explore All Services
                  </motion.button>
                </Link>
              </div>

              {/* Trust Row */}
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                {["🔒 256-bit SSL Encrypted", "✅ CA Certified", "🇵🇰 FBR Registered Platform", "⭐ 4.9/5 Rating"].map(b => (
                  <span key={b} className="px-3 py-1 rounded-full bg-white/10 border border-white/10">{b}</span>
                ))}
              </div>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs text-[#7A8A8A] ml-2">Pak Filer Dashboard</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#E8F5EE] rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-[#1A8549]" />
                        <div>
                          <p className="text-sm font-semibold text-[#1F2A2A]">Tax Return 2024-25</p>
                          <p className="text-xs text-[#7A8A8A]">Filed Successfully</p>
                        </div>
                      </div>
                      <span className="text-xs bg-[#1A8549] text-white px-3 py-1 rounded-full font-semibold">Complete</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-[#F7FAF8] rounded-xl">
                        <p className="text-xs text-[#7A8A8A] mb-1">Tax Saved</p>
                        <p className="text-lg font-bold text-[#146B3A]">Rs 45,200</p>
                      </div>
                      <div className="p-4 bg-[#F7FAF8] rounded-xl">
                        <p className="text-xs text-[#7A8A8A] mb-1">Filing Time</p>
                        <p className="text-lg font-bold text-[#146B3A]">15 min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS STRIP ══════════════ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-4">
                  <p className="text-3xl md:text-4xl font-display font-bold text-[#146B3A]">
                    {s.text ? s.text : <Counter target={s.value} suffix={s.suffix || ""} />}
                  </p>
                  <p className="text-sm text-[#7A8A8A] mt-1">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1A8549] mb-3 block">WHAT WE OFFER</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1F2A2A] mb-4">Everything You Need for Tax Compliance in Pakistan</h2>
            <p className="text-lg text-[#4A5A5A] max-w-3xl mx-auto">From individual tax filing to full business incorporation — explore our comprehensive suite of tax and compliance services designed specifically for Pakistan's tax system.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Link to={s.link} className="block h-full">
                  <div className="bg-white rounded-xl border border-[#E0EAE4] p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A8549] to-[#146B3A] flex items-center justify-center mb-4 shadow-md">
                      <s.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-[#1F2A2A] mb-2">{s.title}</h3>
                    <p className="text-sm text-[#4A5A5A] leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-sm font-semibold text-[#1A8549] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1F2A2A] mb-4">File Your Taxes in 3 Simple Steps</h2>
            <p className="text-lg text-[#4A5A5A] max-w-2xl mx-auto">No complicated paperwork. No office visits. Just a fast, guided online process that gets your taxes filed correctly — every time.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#1A8549] via-[#1A8549]/50 to-[#1A8549]" />

            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="text-center relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1A8549] to-[#146B3A] flex items-center justify-center mx-auto mb-6 text-white font-display font-bold text-xl shadow-lg relative z-10">
                    {s.num}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-[#1F2A2A] mb-3">{s.title}</h3>
                  <p className="text-[#4A5A5A] leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE US ══════════════ */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1F2A2A] mb-4">Tax Filing Made Simple, Secure & Certified</h2>
            <p className="text-lg text-[#4A5A5A] max-w-3xl mx-auto">We combine technology with professional expertise to deliver Pakistan's most reliable online tax filing experience.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6 border-l-4 border-[#1A8549] shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="w-11 h-11 rounded-lg bg-[#E8F5EE] flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-[#1A8549]" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-[#1F2A2A] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#4A5A5A] leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING SNAPSHOT ══════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1A8549] mb-3 block">TRANSPARENT PRICING</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1F2A2A] mb-4">Honest, Affordable Tax Filing Fees</h2>
            <p className="text-lg text-[#4A5A5A]">No surprise fees. No hidden charges. Just straightforward pricing for every service we offer.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Personal Tax Filing", price: "Rs 999", label: "Starting from" },
              { title: "Business Tax Return", price: "Rs 3,000", label: "Starting from" },
              { title: "NTN Registration", price: "Rs 500", label: "Starting from" },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`rounded-xl p-8 text-center border transition-shadow hover:shadow-xl ${i === 0 ? "bg-gradient-to-br from-[#1A8549] to-[#146B3A] text-white border-transparent" : "bg-white border-[#E0EAE4]"}`}>
                  {i === 0 && <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">POPULAR</span>}
                  <h3 className={`text-lg font-display font-semibold mb-2 ${i === 0 ? "text-white" : "text-[#1F2A2A]"}`}>{p.title}</h3>
                  <p className={`text-xs mb-1 ${i === 0 ? "text-white/70" : "text-[#7A8A8A]"}`}>{p.label}</p>
                  <p className={`text-3xl font-display font-bold mb-6 ${i === 0 ? "text-white" : "text-[#146B3A]"}`}>{p.price}</p>
                  <Link to="/pricing" className={`inline-flex items-center gap-1 text-sm font-semibold ${i === 0 ? "text-white underline" : "text-[#1A8549]"}`}>
                    View Full Pricing <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-8">
            <Link to="/pricing" className="inline-flex items-center gap-2 text-[#1A8549] font-semibold hover:underline">
              See All Service Prices <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1A8549] mb-3 block">CLIENT STORIES</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1F2A2A] mb-4">Trusted by Thousands of Pakistanis</h2>
            <p className="text-lg text-[#4A5A5A]">From first-time filers to established businesses — here's what our clients say about filing with Pak Filer.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-[#E0EAE4] shadow-sm h-full flex flex-col">
                  <Quote className="w-8 h-8 text-[#1A8549]/20 mb-4" />
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />)}</div>
                  <p className="text-sm text-[#4A5A5A] leading-relaxed flex-1 mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E0EAE4]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A8549] to-[#146B3A] flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1F2A2A]">{t.name}</p>
                      <p className="text-xs text-[#7A8A8A]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1A8549] mb-3 block">COMMON QUESTIONS</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1F2A2A] mb-4">Answers to Your Most Asked Tax Questions</h2>
          </FadeIn>

          <FadeIn>
            <Accordion type="single" collapsible defaultValue="faq-0">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E0EAE4]">
                  <AccordionTrigger className="text-left text-[#1F2A2A] font-semibold hover:text-[#1A8549] py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4A5A5A] leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>

          <FadeIn className="text-center mt-8">
            <Link to="/faq" className="inline-flex items-center gap-2 text-[#1A8549] font-semibold hover:underline">
              View All Frequently Asked Questions <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ GLOBAL CTA ══════════════ */}
      <FinalCTA />
    </div>
  );
}
