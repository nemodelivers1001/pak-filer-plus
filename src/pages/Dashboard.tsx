import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Calculator,
  MapPin,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  Receipt,
  User,
  Building2,
  Zap,
  Shield,
  Award,
  Star,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { GradientButton } from "@/components/ui/GradientButton";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard"; // New Tilt Component
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { UnifiedBackground } from "@/components/layout/UnifiedBackground";

// Brand Colors
// Primary: #0E552F (pak-green-600)
// Secondary: #45745B (pak-green-500)
// Accent: #82A492 (pak-green-400)
// Soft: #C5DACF (pak-green-200)

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  popular?: boolean;
  comingSoon?: boolean;
  gridArea: string;
}

// All PAK Filer Services with grid areas
const services: ServiceItem[] = [
  {
    title: "Personal Tax Filing",
    description: "File your individual income tax return with our step-by-step guided process. Quick, easy, and fully FBR compliant.",
    icon: FileText,
    href: "/tax-filing",
    popular: true,
    gridArea: "hero",
  },
  {
    title: "Family Tax Filing",
    description: "File taxes for your entire family in one convenient place",
    icon: Users,
    href: "/tax-filing?type=family",
    gridArea: "family",
  },
  {
    title: "Salary Calculator",
    description: "Calculate your tax liability instantly",
    icon: Calculator,
    href: "/calculator",
    gridArea: "calc",
  },
  {
    title: "Track Filing",
    description: "Check submission status anytime",
    icon: MapPin,
    href: "/track",
    gridArea: "track",
  },
  {
    title: "IRIS Profile Update",
    description: "Update your FBR IRIS profile easily",
    icon: User,
    href: "/iris-update",
    gridArea: "iris",
  },
  {
    title: "NTN Registration",
    description: "Get your National Tax Number from FBR",
    icon: Receipt,
    href: "/ntn-registration",
    gridArea: "ntn",
  },
  {
    title: "GST Registration",
    description: "Register for Sales Tax with FBR",
    icon: Receipt,
    href: "/gst-registration",
    gridArea: "gst",
  },
  {
    title: "Business Incorporation",
    description: "Register your company with SECP",
    icon: Building2,
    href: "/business",
    comingSoon: true,
    gridArea: "business",
  },
];

const features = [
  { icon: Zap, label: "15 Min Filing" },
  { icon: Shield, label: "Bank-Level Security" },
  { icon: Award, label: "FBR Certified" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [taxFilingProgress] = useLocalStorage("pakfiler_tax_progress", {
    currentStep: 0,
    totalSteps: 8,
    lastUpdated: null as string | null
  });

  const progressPercentage = taxFilingProgress.totalSteps > 0
    ? Math.round((taxFilingProgress.currentStep / taxFilingProgress.totalSteps) * 100)
    : 0;

  const hasInProgressFiling = taxFilingProgress.currentStep > 0;

  // Stagger animation variant with more dramatic effect
  const dramaticStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const dramaticFadeIn = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-8">
      {/* ════════════════════════════════════════════════════════════════
          BACKGROUND LAYERS (Unified)
          ════════════════════════════════════════════════════════════════ */}
      <UnifiedBackground watermark="PAK FILER" />
      {/* ════════════════════════════════════════════════════════════════
          BACKGROUND LAYERS (Unified)
          ════════════════════════════════════════════════════════════════ */}
      <UnifiedBackground watermark="PAK FILER" />


      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 px-6 pt-8 pb-6 md:px-10 md:pt-12 md:pb-8">
        <motion.div
          className="w-full"
          variants={dramaticStagger}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div variants={dramaticFadeIn} className="mb-6">
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-[#C5DACF]/50 shadow-lg shadow-[#0E552F]/8"
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px rgba(14,85,47,0.18)" }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E552F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-br from-[#0E552F] to-[#45745B]"></span>
              </span>
              <span className="text-[#0E552F] text-sm font-bold tracking-wide">TAX YEAR 2026 OPEN</span>
            </motion.div>
          </motion.div>

          {/* Welcome */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight"
            variants={dramaticFadeIn}
          >
            <span className="text-[#1a1a1a]">Welcome back,</span>
            <br />
            <span className="bg-gradient-to-r from-[#0E552F] via-[#2d7a4a] to-[#45745B] bg-clip-text text-transparent">
              {user?.name?.split(' ')[0] || "there"}!
            </span>
            <span className="text-[#1a1a1a]"> 👋</span>
          </motion.h1>

          <motion.p
            className="text-[#45745B] text-xl max-w-lg mb-8 font-medium"
            variants={dramaticFadeIn}
          >
            Pakistan's most trusted tax filing platform
          </motion.p>

          {/* Feature Pills */}
          <motion.div className="flex flex-wrap gap-3 mb-8" variants={dramaticFadeIn}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#C5DACF]/40 shadow-lg shadow-[#0E552F]/5"
                whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(14,85,47,0.2)" }}
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#0E552F] to-[#45745B] shadow-md shadow-[#0E552F]/30">
                  <feature.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-[#0E552F]">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          {hasInProgressFiling ? (
            <motion.div variants={dramaticFadeIn}>
              <Link to="/tax-filing">
                <Magnetic>
                  <motion.div
                    className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#0E552F] to-[#2d7a4a] text-white shadow-2xl shadow-[#0E552F]/40 cursor-pointer border border-white/20"
                    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -15px rgba(14,85,47,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                      <ProgressRing progress={progressPercentage} size={50} strokeWidth={4} showPercentage />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-white drop-shadow-sm">Continue Filing</p>
                      <p className="text-white/80 text-sm font-medium">Step {taxFilingProgress.currentStep} of {taxFilingProgress.totalSteps}</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </motion.div>
                </Magnetic>
              </Link>
            </motion.div>
          ) : (
            <motion.div variants={dramaticFadeIn} className="flex flex-wrap gap-4">
              <Link to="/tax-filing">
                <Magnetic>
                  <motion.button
                    className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0E552F] via-[#1a6b3d] to-[#45745B] text-white font-bold text-lg shadow-2xl shadow-[#0E552F]/30 flex items-center gap-3 overflow-hidden"
                    whileHover={{ scale: 1.03, boxShadow: "0 30px 60px -15px rgba(14,85,47,0.45)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                    <FileText className="h-5 w-5" />
                    Start Tax Filing
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Magnetic>
              </Link>
              <Link to="/calculator">
                <Magnetic>
                  <motion.button
                    className="px-8 py-4 rounded-2xl bg-white/95 backdrop-blur-xl text-[#0E552F] font-bold text-lg border-2 border-[#C5DACF] shadow-xl shadow-[#0E552F]/10 flex items-center gap-3"
                    whileHover={{ scale: 1.02, borderColor: "#82A492", boxShadow: "0 20px 40px -10px rgba(14,85,47,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calculator className="h-5 w-5" />
                    Calculate First
                  </motion.button>
                </Magnetic>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          STATS ROW - WITH TILT & SPARKLINES
          ════════════════════════════════════════════════════════════════ */}
      <div className="px-6 md:px-10 mb-10">
        <motion.div
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={dramaticStagger}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              label: "Resume Filing",
              value: hasInProgressFiling ? 1 : 0,
              icon: FileText,
              gradient: "from-[#82A492] to-[#45745B]", // Reverted to standard Green
              sparkline: "M0,20 C10,20 15,10 25,10 C35,10 40,25 50,25 C60,25 65,5 75,5 C85,5 90,15 100,15",
              // Removed action: true
            },
            { label: "Completed", value: 0, icon: CheckCircle2, gradient: "from-[#0E552F] to-[#45745B]", sparkline: "M0,25 C15,25 25,25 35,25 C45,25 55,25 65,25 C75,25 85,25 100,25" },
            { label: "Tax Year", value: 2026, icon: TrendingUp, gradient: "from-[#45745B] to-[#82A492]", sparkline: "M0,30 L20,25 L40,28 L60,10 L80,15 L100,0" },
            { label: "Savings", value: 0, icon: Sparkles, gradient: "from-[#0E552F] to-[#2d7a4a]", prefix: "PKR ", sparkline: "M0,25 Q25,25 50,15 T100,5" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={dramaticFadeIn}
              custom={i}
            >
              <TiltCard>
                <div className="relative rounded-2xl p-5 border shadow-lg h-full overflow-hidden transition-all duration-300 bg-white/90 backdrop-blur-xl border-[#C5DACF]/40">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0E552F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Sparkline Visual */}
                  <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <svg width="100" height="40" viewBox="0 0 100 30" fill="none">
                      <motion.path
                        d={stat.sparkline}
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="text-[#0E552F]"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut", delay: 1 + i * 0.2 }}
                      />
                    </svg>
                  </div>

                  <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-lg transition-transform group-hover:scale-110", stat.gradient)}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className={cn(
                        "text-xs font-semibold mb-1 uppercase tracking-wider",
                        stat.action ? "text-[#D97706]" : "text-[#82A492]"
                      )}>{stat.label}</p>
                      <p className={cn(
                        "text-2xl font-extrabold relative z-10",
                        stat.action ? "text-[#B45309]" : "text-[#0E552F]"
                      )}>
                        {stat.prefix}<AnimatedCounter value={stat.value} />
                      </p>
                    </div>

                    {/* Action Arrow */}
                    {stat.action && (
                      <div className="mb-1 p-1.5 rounded-full bg-[#FEF3C7] text-[#D97706] group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          BENTO GRID - WITH TILT & 3D GLARE
          ════════════════════════════════════════════════════════════════ */}
      <div className="px-6 md:px-10">
        <motion.div
          className="w-full"
          variants={dramaticStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div className="flex items-center gap-3 mb-6" variants={dramaticFadeIn}>
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#0E552F] to-[#45745B] shadow-lg shadow-[#0E552F]/25">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#0E552F]">Our Services</h2>
          </motion.div>

          {/* Bento Grid */}
          <div
            className="grid gap-4 spotlight-wrapper"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, minmax(160px, auto))",
              gridTemplateAreas: `
                "hero hero family family"
                "hero hero calc track"
                "iris ntn gst business"
              `,
            }}
          >
            {services.map((service, index) => {
              const isHero = service.gridArea === "hero";

              // Define distinct visual variants to break the "white wall"
              let variantClass = "";
              let textClass = "";
              let iconBgClass = "";
              let glareColor = "";

              switch (service.gridArea) {
                case "hero":
                  variantClass = "bg-gradient-to-br from-[#0E552F] via-[#1a6b3d] to-[#45745B] text-white shadow-2xl shadow-[#0E552F]/35";
                  textClass = "text-white/90";
                  iconBgClass = "bg-white/20 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/25";
                  glareColor = "rgba(255,255,255,0.2)";
                  break;

                case "calc":
                  // "Midnight" Dark Variant (High Contrast)
                  variantClass = "bg-[#1B2B23] backdrop-blur-xl border border-white/10 text-white shadow-xl shadow-black/10";
                  textClass = "text-white/70";
                  iconBgClass = "bg-[#45745B]/30 group-hover:scale-110 group-hover:bg-[#45745B]/50";
                  glareColor = "rgba(130,164,146,0.3)";
                  break;

                case "family":
                case "track":
                  // "Mint Mist" Variant (Subtle Green Tint)
                  variantClass = "bg-[#E8F5EF]/80 backdrop-blur-xl border border-[#C5DACF] shadow-lg hover:shadow-[#0E552F]/10";
                  textClass = "text-[#45745B]";
                  iconBgClass = "bg-white group-hover:scale-110 shadow-sm";
                  glareColor = "rgba(14,85,47,0.1)";
                  break;

                default:
                  // "Crystal" Variant (Translucent Glass)
                  variantClass = "bg-white/60 backdrop-blur-2xl border border-white/60 shadow-lg hover:shadow-[#0E552F]/5";
                  textClass = "text-[#6B8E7B]";
                  iconBgClass = "bg-gradient-to-br from-[#0E552F] to-[#45745B] text-white shadow-md shadow-[#0E552F]/20 group-hover:scale-110";
                  glareColor = "rgba(255,255,255,0.4)";
                  break;
              }

              // Overrides for coming soon
              if (service.comingSoon) {
                variantClass = "bg-gray-50/50 border border-gray-100 opacity-70";
                textClass = "text-gray-400";
                iconBgClass = "bg-gray-200 text-gray-400";
              }

              return (
                <motion.div
                  key={service.title}
                  style={{ gridArea: service.gridArea }}
                  variants={dramaticFadeIn}
                  custom={index}
                >
                  <Link
                    to={service.comingSoon ? "#" : service.href}
                    className={cn("block h-full", service.comingSoon && "cursor-not-allowed")}
                    onClick={(e) => service.comingSoon && e.preventDefault()}
                  >
                    <TiltCard className="h-full" glareColor={glareColor}>
                      <div
                        className={cn(
                          "h-full rounded-3xl p-6 relative overflow-hidden group transition-all duration-500 flex flex-col",
                          variantClass
                        )}
                      >
                        {/* Hero specific decorations */}
                        {isHero && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                            <motion.div
                              className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            />
                            <div
                              className="absolute inset-0 opacity-[0.04]"
                              style={{
                                backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                                backgroundSize: "40px 40px",
                              }}
                            />
                          </>
                        )}

                        {/* Dark Card specific decorations */}
                        {service.gridArea === "calc" && (
                          <div className="absolute right-0 bottom-0 opacity-10">
                            <Calculator className="w-32 h-32 -mb-8 -mr-8" />
                          </div>
                        )}

                        {/* Popular Badge */}
                        {service.popular && (
                          <motion.div
                            className="absolute top-5 right-5"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="px-3 py-1.5 text-xs rounded-full bg-white/25 backdrop-blur-sm text-white font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
                              <Star className="h-3 w-3 fill-current" /> POPULAR
                            </span>
                          </motion.div>
                        )}

                        {/* Coming Soon Badge */}
                        {service.comingSoon && (
                          <div className="absolute top-5 right-5">
                            <span className="px-3 py-1.5 text-xs rounded-full bg-[#C5DACF]/60 text-[#45745B] font-semibold">
                              Coming Soon
                            </span>
                          </div>
                        )}

                        {/* Icon */}
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 relative z-10",
                          iconBgClass
                        )}>
                          <service.icon className={cn("h-6 w-6", service.gridArea === "family" || service.gridArea === "track" ? "text-[#0E552F]" : "text-white")} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className={cn(
                            "font-bold mb-2",
                            isHero || service.gridArea === "calc" ? "text-xl text-white" : "text-lg text-[#0E552F]",
                            service.comingSoon && "text-[#82A492]"
                          )}>
                            {service.title}
                          </h3>
                          <p className={cn(
                            "text-sm leading-relaxed",
                            textClass
                          )}>
                            {service.description}
                          </p>
                        </div>

                        {/* CTA */}
                        {!service.comingSoon && (
                          <div className={cn(
                            "mt-auto flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10",
                            isHero || service.gridArea === "calc" ? "text-white" : "text-[#0E552F]"
                          )}>
                            Get Started <ArrowUpRight className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              );
            })}

          </div>

          {/* Mobile Grid (stacked) */}
          <style>{`
            @media (max-width: 768px) {
              .grid[style] {
                grid-template-columns: 1fr !important;
                grid-template-rows: auto !important;
                grid-template-areas: 
                  "hero"
                  "family"
                  "calc"
                  "track"
                  "iris"
                  "ntn"
                  "gst"
                  "business" !important;
              }
            }
            @media (min-width: 768px) and (max-width: 1024px) {
              .grid[style] {
                grid-template-columns: 1fr 1fr !important;
                grid-template-rows: auto !important;
                grid-template-areas: 
                  "hero hero"
                  "family family"
                  "calc track"
                  "iris ntn"
                  "gst business" !important;
              }
            }
          `}</style>
        </motion.div>
      </div>
    </div >
  );
}
