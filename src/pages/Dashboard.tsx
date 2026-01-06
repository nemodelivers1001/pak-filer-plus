import { motion } from "framer-motion";
import { 
  FileText, 
  Calculator, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  gradient: string;
}

const quickActions: QuickAction[] = [
  {
    title: "File Your Taxes",
    description: "Start or continue your personal tax filing",
    icon: FileText,
    href: "/tax-filing",
    gradient: "from-primary to-secondary",
  },
  {
    title: "Track Filing",
    description: "Check the status of your submissions",
    icon: MapPin,
    href: "/track",
    gradient: "from-secondary to-accent",
  },
  {
    title: "Salary Calculator",
    description: "Calculate your tax liability",
    icon: Calculator,
    href: "/calculator",
    gradient: "from-accent to-soft",
  },
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

  return (
    <div className="min-h-screen">
      {/* Hero Section with Mesh */}
      <MeshBackground variant="hero" animated className="px-6 py-12 md:px-10 md:py-16">
        <motion.div
          className="max-w-4xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary-foreground/80" />
            <span className="text-primary-foreground/80 text-sm font-medium">
              Welcome back
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3"
            variants={fadeInUp}
          >
            Hello, {user?.name || "there"}! 👋
          </motion.h1>
          
          <motion.p 
            className="text-primary-foreground/80 text-lg max-w-2xl"
            variants={fadeInUp}
          >
            Ready to file your taxes? Let's make it quick, easy, and stress-free.
          </motion.p>

          {/* Resume Filing CTA */}
          {hasInProgressFiling && (
            <motion.div variants={fadeInUp} className="mt-8">
              <GlassCard variant="elevated" className="p-6 max-w-lg bg-white/10 backdrop-blur-xl border-white/20">
                <div className="flex items-center gap-6">
                  <ProgressRing 
                    progress={progressPercentage} 
                    size={80} 
                    strokeWidth={6}
                    showPercentage
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Continue Your Filing</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Step {taxFilingProgress.currentStep} of {taxFilingProgress.totalSteps}
                    </p>
                    <Link to="/tax-filing">
                      <GradientButton size="sm" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                        Resume
                      </GradientButton>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </motion.div>
      </MeshBackground>

      {/* Main Content */}
      <div className="px-6 py-10 md:px-10">
        {/* Quick Actions */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.h2 
            className="text-xl font-semibold text-foreground mb-6"
            variants={fadeInUp}
          >
            Quick Actions
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                variants={fadeInUp}
                custom={index}
              >
                <Link to={action.href}>
                  <motion.div
                    className="group"
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <GlassCard 
                      variant="gradient" 
                      interactive 
                      animate={false}
                      className="p-6 h-full"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Get Started <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </GlassCard>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Overview */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.h2 
            className="text-xl font-semibold text-foreground mb-6"
            variants={fadeInUp}
          >
            Your Overview
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "In Progress", value: hasInProgressFiling ? "1" : "0", icon: Clock, color: "text-amber-500" },
              { label: "Completed", value: "0", icon: CheckCircle2, color: "text-primary" },
              { label: "This Year", value: "2024", icon: TrendingUp, color: "text-secondary" },
              { label: "Savings", value: "—", icon: Sparkles, color: "text-accent" },
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={fadeInUp} custom={index}>
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Getting Started Guide */}
        {!hasInProgressFiling && (
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard variant="bordered" className="p-8">
              <GlassCardHeader className="p-0 mb-6">
                <GlassCardTitle>Ready to file your taxes?</GlassCardTitle>
                <GlassCardDescription>
                  Our step-by-step process makes tax filing simple and stress-free.
                </GlassCardDescription>
              </GlassCardHeader>
              <GlassCardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/tax-filing">
                    <GradientButton 
                      variant="primary" 
                      size="lg"
                      icon={<FileText className="h-5 w-5" />}
                    >
                      Start Tax Filing
                    </GradientButton>
                  </Link>
                  <Link to="/calculator">
                    <GradientButton 
                      variant="outline"
                      size="lg"
                      icon={<Calculator className="h-5 w-5" />}
                    >
                      Calculate First
                    </GradientButton>
                  </Link>
                </div>
              </GlassCardContent>
            </GlassCard>
          </motion.section>
        )}
      </div>
    </div>
  );
}
