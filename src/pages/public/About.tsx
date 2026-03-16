import { Award, Globe, Shield, Users } from "lucide-react";
import SEOHead from "@/components/layout/SEOHead";
import FinalCTA from "@/components/layout/FinalCTA";
import { FadeIn } from "@/components/layout/ServicePageLayout";
import TeamMember from "@/components/landing/TeamMember";

const teamMembers = [
  {
    name: "Omer Zaheer Meer",
    role: "CEO",
    credentials: "FCA | CFA | FCCA",
    image: "",
    social: {
      linkedin: "https://www.linkedin.com/in/omerzaheermeer",
    },
  },
  {
    name: "Usman Zaheer Meer",
    role: "CTO",
    credentials: "Tech Leadership",
    image: "",
    social: {
      linkedin: "https://www.linkedin.com/in/usmanzaheermeer",
    },
  },
  {
    name: "Ali Zaheer Meer",
    role: "COO",
    credentials: "FCCA | ACA",
    image: "",
    social: {
      linkedin: "https://www.linkedin.com/in/alizaheermeer",
    },
  },
  {
    name: "Sana Malik",
    role: "Head of Client Success",
    credentials: "Chartered Accountant",
    image: "",
    social: {
      linkedin: "https://www.linkedin.com/in/sanamalik",
    },
  },
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We never compromise on accuracy or compliance. Every filing we submit is legally correct and in full compliance with FBR regulations. We never advise clients to evade or understate taxes.",
  },
  {
    icon: Award,
    title: "Transparency",
    description: "What you see in our pricing is what you pay. We communicate all fees, timelines, and service details clearly and upfront. No hidden charges, ever.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "We believe every Pakistani deserves access to professional tax services at a fair price. Our services are priced to be affordable for salaried individuals, small businesses, and large enterprises alike.",
  },
  {
    icon: Users,
    title: "Excellence",
    description: "We hold ourselves to the highest professional standards. Our CA team reviews every filing, our processes are continuously improved, and we stay current with every change in Pakistan's tax laws.",
  },
];

const stats = [
  { label: "Tax Returns Filed", value: "10,000+" },
  { label: "NTNs Registered", value: "5,000+" },
  { label: "Businesses Incorporated", value: "500+" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Pakistan-wide Coverage", value: "Nationwide" },
  { label: "CA-Certified Every Return", value: "Always" },
];

export default function About() {
  return (
    <div className="bg-white">
      <SEOHead
        title="About Pak Filer | Pakistan's Trusted Tax Filing Platform | Our Story"
        description="Learn about Pak Filer — Pakistan's leading online tax filing and compliance platform. Our mission, our team, our values, and why thousands of Pakistanis trust us with their taxes."
        canonical="https://pakfiler.com/about"
      />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A8549] to-[#146B3A]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/></svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3 block">ABOUT US</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Pakistan's Most Trusted Online Tax Filing Platform
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            We started Pak Filer with a simple mission: to make Pakistan's complex tax system accessible, understandable, and manageable for every citizen — from first-time filers to established businesses.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Who We Are</h2>
          </div>
          <div className="space-y-8 text-[#4A5A5A] leading-relaxed">
            <p>
              Pak Filer is Pakistan's premier online tax filing and business compliance platform, serving thousands of individuals and businesses across the country. We are a team of qualified Chartered Accountants, tax lawyers, and technology professionals dedicated to simplifying Pakistan's tax and regulatory landscape.
            </p>
            <p>
              We operate as a fully digital platform — meaning you never need to visit a physical office. All services are provided remotely through our secure online portal, with expert support available via WhatsApp, email, and phone throughout the process.
            </p>
            <p>
              Our team is registered with the Institute of Chartered Accountants of Pakistan (ICAP) and maintains active compliance with all FBR, SECP, and relevant regulatory requirements. Every return we file is reviewed by a qualified CA before submission.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-[#1F2A2A] mb-4">Our Mission & Vision</h2>
              <div className="rounded-3xl border border-[#E0EAE4] bg-white p-8 shadow-sm">
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#146B3A]">OUR MISSION</span>
                  <h3 className="text-xl font-bold text-[#1F2A2A] mt-3 mb-3">To democratise tax compliance in Pakistan</h3>
                  <p className="text-[#4A5A5A] leading-relaxed">
                    By providing affordable, accurate, and accessible tax and business services to every Pakistani — regardless of their financial literacy or location.
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#146B3A]">OUR VISION</span>
                  <h3 className="text-xl font-bold text-[#1F2A2A] mt-3 mb-3">To become Pakistan's most trusted financial compliance platform</h3>
                  <p className="text-[#4A5A5A] leading-relaxed">
                    The first name every Pakistani thinks of when it comes to taxes, registrations, and business formalisation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1F2A2A] mb-6">Why We Built Pak Filer</h2>
              <div className="space-y-6 text-[#4A5A5A] leading-relaxed">
                <p>
                  Pakistan has millions of taxpayers who are either unaware of their filing obligations, unable to navigate FBR's complex systems, or forced to pay excessive CA fees for straightforward filings. We saw this gap — and decided to fill it.
                </p>
                <p>
                  By combining professional CA expertise with technology, we created a platform that makes tax filing as simple as ordering food online. You submit your information, we handle the complexity, and you receive your filing confirmation — without ever leaving your home.
                </p>
                <p>
                  Since launch, we have helped thousands of Pakistanis become active tax filers, registered hundreds of businesses, and saved our clients significant time and money. And we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">The Values That Drive Us</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-3xl border border-[#E0EAE4] bg-white p-8 shadow-sm hover:shadow-lg transition">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#0E552F] mb-5">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#1F2A2A] mb-3">{value.title}</h3>
                <p className="text-[#4A5A5A] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFAF9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Professional Credentials</h2>
            <p className="text-[#4A5A5A] mt-2">Our certifications and security standards that give you confidence.</p>
          </div>
          <ul className="mx-auto grid max-w-2xl gap-4 text-[#4A5A5A] sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#1A8549]" />
              Chartered Accountants registered with the Institute of Chartered Accountants of Pakistan (ICAP)
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#1A8549]" />
              FBR Registered Tax Practitioners
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#1A8549]" />
              SECP Authorized Intermediaries (for company incorporation services)
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#1A8549]" />
              256-bit SSL encrypted data protection
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#1A8549]" />
              Compliant with Pakistan's Personal Data Protection Bill
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2A2A]">Pak Filer in Numbers</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-[#E0EAE4] bg-[#FAFAF9] p-10 text-center shadow-sm">
                <div className="text-5xl font-bold text-[#1A8549] mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-[#4A5A5A] uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F7FAF8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Leadership</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#052e16]">Meet the team</h2>
            </div>
            <p className="text-gray-500 max-w-md text-right hidden md:block">
              Experts in tax, compliance, and technology — working together to create a simpler filing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <TeamMember key={member.name} index={i} {...member} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
