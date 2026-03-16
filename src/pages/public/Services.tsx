import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Calculator, CreditCard, FileText, Briefcase, Receipt, RefreshCw, Users } from "lucide-react";
import SEOHead from "@/components/layout/SEOHead";
import FinalCTA from "@/components/layout/FinalCTA";

const SERVICES = [
  {
    icon: FileText,
    title: "Personal Tax Filing",
    description: "File your FBR tax return as a salaried individual with step-by-step guidance.",
    link: "/services/personal-tax-filing",
  },
  {
    icon: Users,
    title: "Family Tax Filing",
    description: "Manage and file tax returns for multiple family members in one place.",
    link: "/services/family-tax-filing",
  },
  {
    icon: Building2,
    title: "Business Tax Return",
    description: "Corporate and proprietorship filings with full compliance and CA review.",
    link: "/services/business-tax-return",
  },
  {
    icon: Receipt,
    title: "NTN Registration",
    description: "Get your National Tax Number quickly for business or employment.",
    link: "/services/ntn-registration",
  },
  {
    icon: RefreshCw,
    title: "IRIS Profile Update",
    description: "Update your FBR IRIS profile for salary changes, new bank accounts, and more.",
    link: "/services/iris-profile-update",
  },
  {
    icon: CreditCard,
    title: "GST Registration",
    description: "Register for GST with expert guidance and smooth FBR submission.",
    link: "/services/gst-registration",
  },
  {
    icon: Briefcase,
    title: "Business Incorporation",
    description: "Incorporate your company, register an NPO, or set up a partnership effectively.",
    link: "/services/business-incorporation",
  },
  {
    icon: Calculator,
    title: "Salary Tax Calculator",
    description: "Quickly estimate your tax liability under Pakistan's income tax slabs.",
    link: "/services/salary-tax-calculator",
  },
];

function ServiceCard({ service }: { service: typeof SERVICES[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-[#E0EAE4] shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1"
    >
      <div className="p-8 flex flex-col h-full">
        <div className="w-14 h-14 rounded-2xl bg-[#E8F5EE] text-[#0E552F] flex items-center justify-center mb-6">
          <service.icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#1F2A2A] mb-2">{service.title}</h3>
        <p className="text-[#4A5A5A] mb-6 flex-1">{service.description}</p>
        <Link to={service.link} className="inline-flex items-center justify-between gap-2 text-[#146B3A] font-semibold">
          Learn more <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="bg-white">
      <SEOHead
        title="Pak Filer Services — Tax Filing, Registration & Compliance"
        description="Browse Pak Filer’s full suite of tax filing, NTN/GST registration, and business compliance services. Start online today."
        canonical="https://pakfiler.com/services"
      />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A8549] to-[#146B3A]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 20%, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/></svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3 block">OUR SERVICES</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Everything you need to stay compliant.
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            From personal tax filings to business incorporation, choose the Pak Filer service that matches your needs and get started instantly.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/pricing" className="px-8 py-4 bg-white text-[#146B3A] font-bold rounded-xl shadow-lg hover:bg-white/90 transition">
              View Pricing
            </Link>
            <Link to="/contact" className="px-8 py-4 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition">
              Get Help Selecting
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Explore Our Service Categories</h2>
            <p className="text-[#4A5A5A] max-w-2xl mx-auto mt-4">
              Pick a service below to learn more and start the process in minutes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
