import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/layout/SEOHead";
import FinalCTA from "@/components/layout/FinalCTA";
import { useRef } from "react";

export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

interface ServicePageProps {
  seo: { title: string; description: string; canonical: string };
  eyebrow: string;
  title: string;
  subtitle: string;
  badges?: string[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  breadcrumbs: { label: string; href?: string }[];
  children: ReactNode;
  faqs?: { q: string; a: string }[];
}

export default function ServicePageLayout({ seo, eyebrow, title, subtitle, badges, ctaPrimary, ctaSecondary, breadcrumbs, children, faqs }: ServicePageProps) {
  return (
    <div className="bg-white">
      <SEOHead title={seo.title} description={seo.description} canonical={seo.canonical} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A8549] to-[#146B3A]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/></svg></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                {b.href ? <Link to={b.href} className="hover:text-white transition-colors">{b.label}</Link> : <span className="text-white">{b.label}</span>}
              </span>
            ))}
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3 block">{eyebrow}</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-6 max-w-4xl">{title}</h1>
          <p className="text-lg text-white/80 max-w-3xl mb-8">{subtitle}</p>

          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-wrap gap-4 mb-8">
              {ctaPrimary && <Link to={ctaPrimary.href}><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="px-7 py-3.5 bg-white text-[#146B3A] font-bold rounded-xl shadow-xl flex items-center gap-2">{ctaPrimary.label} <ArrowRight className="w-4 h-4" /></motion.button></Link>}
              {ctaSecondary && <Link to={ctaSecondary.href}><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="px-7 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm">{ctaSecondary.label}</motion.button></Link>}
            </div>
          )}

          {badges && (
            <div className="flex flex-wrap gap-3">
              {badges.map(b => <span key={b} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-white/80">{b}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      {children}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <FadeIn className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-[#1F2A2A]">Frequently Asked Questions</h2>
            </FadeIn>
            <FadeIn>
              <Accordion type="single" collapsible defaultValue="faq-0">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E0EAE4]">
                    <AccordionTrigger className="text-left text-[#1F2A2A] font-semibold hover:text-[#1A8549] py-5">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-[#4A5A5A] leading-relaxed pb-5">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>
      )}

      <FinalCTA />
    </div>
  );
}
