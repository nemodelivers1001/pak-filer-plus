import { motion } from "framer-motion";
import { 
  FileText, 
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
  Bell,
  Calendar,
  ChevronRight,
  Zap,
  Shield,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { AnimatedList, AnimatedGrid } from "@/components/ui/AnimatedList";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  gradient: string;
  popular?: boolean;
}

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  disabled?: boolean;
}

interface ActivityItem {
  id: string;
  type: "filing" | "update" | "payment" | "info";
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  prefix?: string;
  change?: string | null;
}

const quickActions: QuickAction[] = [
  {
    title: "File Your Taxes",
    description: "Start or continue your personal tax filing",
    icon: FileText,
    href: "/tax-filing",
    gradient: "from-primary to-secondary",
    popular: true,
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
    description: "Calculate your tax liability instantly",
    icon: Calculator,
    href: "/calculator",
    gradient: "from-accent to-soft",
  },
];

const services: ServiceCard[] = [
  {
    title: "IRIS Profile Update",
    description: "Update your FBR IRIS profile information",
    icon: User,
    href: "/iris-update",
  },
  {
    title: "NTN Registration",
    description: "Get your National Tax Number",
    icon: Receipt,
    href: "/ntn-registration",
  },
  {
    title: "GST Registration",
    description: "Register for sales tax",
    icon: Receipt,
    href: "/gst-registration",
  },
  {
    title: "Business Incorporation",
    description: "Register your company in Pakistan",
    icon: Building2,
    href: "/business",
    badge: "Coming Soon",
    disabled: true,
  },
];

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "info",
    title: "Welcome to PAK Filer!",
    description: "Start your tax filing journey today",
    time: "Just now",
    icon: Sparkles,
  },
  {
    id: "2",
    type: "info",
    title: "Tax Year 2024",
    description: "Filing deadline approaching - File before September 30",
    time: "Reminder",
    icon: Calendar,
  },
];

const features = [
  { icon: Zap, label: "Fast Filing", description: "Complete in 15 minutes" },
  { icon: Shield, label: "100% Secure", description: "Your data is protected" },
  { icon: Award, label: "FBR Compliant", description: "Official standards" },
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

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "filing": return "bg-primary/20 text-primary";
      case "update": return "bg-blue-500/20 text-blue-500";
      case "payment": return "bg-amber-500/20 text-amber-500";
      case "info": return "bg-accent/30 text-secondary";
    }
  };

  const stats: StatItem[] = [
    { 
      label: "Filings In Progress", 
      value: hasInProgressFiling ? 1 : 0, 
      icon: Clock, 
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      change: null
    },
    { 
      label: "Completed Filings", 
      value: 0, 
      icon: CheckCircle2, 
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: null
    },
    { 
      label: "Tax Year", 
      value: 2024, 
      icon: TrendingUp, 
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      change: null
    },
    { 
      label: "Potential Savings", 
      value: 0, 
      icon: Sparkles, 
      color: "text-accent",
      bgColor: "bg-accent/10",
      prefix: "PKR ",
      change: "Calculate now"
    },
  ];

  return (
    <div className="min-h-screen pb-10">
      {/* Hero Section with Mesh */}
      <MeshBackground variant="hero" animated className="px-6 py-10 md:px-10 md:py-14">
        <motion.div
          className="max-w-5xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-3">
            <motion.div 
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-primary-foreground/90 text-sm font-medium">
                Tax Year 2024 Open
              </span>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3"
            variants={fadeInUp}
          >
            Welcome back, {user?.name?.split(' ')[0] || "there"}! 👋
          </motion.h1>
          
          <motion.p 
            className="text-primary-foreground/80 text-lg max-w-2xl mb-8"
            variants={fadeInUp}
          >
            Your trusted partner for hassle-free tax filing in Pakistan.
          </motion.p>

          {/* Features Pills */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-8"
            variants={fadeInUp}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <feature.icon className="h-4 w-4 text-soft" />
                <span className="text-sm text-primary-foreground font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Resume Filing CTA */}
          {hasInProgressFiling ? (
            <motion.div variants={fadeInUp}>
              <GlassCard variant="elevated" className="p-6 max-w-xl bg-white/10 backdrop-blur-xl border-white/20">
                <div className="flex items-center gap-6">
                  <ProgressRing 
                    progress={progressPercentage} 
                    size={90} 
                    strokeWidth={7}
                    showPercentage
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">Continue Your Filing</h3>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-600 font-medium">
                        In Progress
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Step {taxFilingProgress.currentStep} of {taxFilingProgress.totalSteps} — Personal Tax Filing
                    </p>
                    <ProgressBar progress={progressPercentage} size="sm" className="mb-3" />
                    <Link to="/tax-filing">
                      <GradientButton size="sm" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                        Resume Filing
                      </GradientButton>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link to="/tax-filing">
                <GradientButton 
                  size="lg" 
                  icon={<FileText className="h-5 w-5" />}
                  className="shadow-xl shadow-primary/20"
                >
                  Start Tax Filing
                </GradientButton>
              </Link>
              <Link to="/calculator">
                <GradientButton 
                  variant="secondary" 
                  size="lg" 
                  icon={<Calculator className="h-5 w-5" />}
                >
                  Calculate Tax First
                </GradientButton>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </MeshBackground>

      {/* Main Content */}
      <div className="px-6 md:px-10 -mt-6">
        {/* Stats Cards */}
        <motion.section
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <AnimatedGrid
            items={stats}
            keyExtractor={(stat) => stat.label}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            staggerDelay={0.06}
            renderItem={(stat) => (
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <GlassCard className="p-5 h-full" interactive animate={false}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <stat.icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                    {stat.change && (
                      <span className="text-xs text-primary font-medium hover:underline cursor-pointer">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.prefix && <span className="text-lg">{stat.prefix}</span>}
                    <AnimatedCounter value={stat.value} />
                  </p>
                </GlassCard>
              </motion.div>
            )}
          />
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Services */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div className="flex items-center justify-between mb-5" variants={fadeInUp}>
                <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
              </motion.div>
              
              <AnimatedGrid
                items={quickActions}
                keyExtractor={(action) => action.title}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                staggerDelay={0.1}
                renderItem={(action) => (
                  <Link to={action.href} className="block h-full">
                    <motion.div
                      className="group h-full"
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <GlassCard 
                        variant="gradient" 
                        interactive 
                        animate={false}
                        className="p-5 h-full relative overflow-hidden"
                      >
                        {action.popular && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground font-medium">
                              Popular
                            </span>
                          </div>
                        )}
                        <div className={cn(
                          "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                          "group-hover:scale-110 transition-transform duration-300",
                          action.gradient
                        )}>
                          <action.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1.5">{action.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{action.description}</p>
                        <div className="mt-3 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Get Started <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </GlassCard>
                    </motion.div>
                  </Link>
                )}
              />
            </motion.section>

            {/* Services Grid */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div className="flex items-center justify-between mb-5" variants={fadeInUp}>
                <h2 className="text-xl font-semibold text-foreground">More Services</h2>
                <Link to="/pricing" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                  View Pricing <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
              
              <AnimatedGrid
                items={services}
                keyExtractor={(service) => service.title}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                staggerDelay={0.08}
                renderItem={(service) => (
                  <Link 
                    to={service.disabled ? "#" : service.href} 
                    className={cn("block", service.disabled && "cursor-not-allowed")}
                    onClick={(e) => service.disabled && e.preventDefault()}
                  >
                    <motion.div
                      className="group"
                      variants={service.disabled ? {} : cardHover}
                      initial="rest"
                      whileHover={service.disabled ? undefined : "hover"}
                    >
                      <GlassCard 
                        className={cn(
                          "p-4 flex items-center gap-4",
                          service.disabled && "opacity-60"
                        )}
                        interactive={!service.disabled}
                        animate={false}
                      >
                        <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                          <service.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground text-sm">{service.title}</h3>
                            {service.badge && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-accent/30 text-secondary font-medium">
                                {service.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{service.description}</p>
                        </div>
                        <ChevronRight className={cn(
                          "h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform",
                          !service.disabled && "group-hover:translate-x-1 group-hover:text-primary"
                        )} />
                      </GlassCard>
                    </motion.div>
                  </Link>
                )}
              />
            </motion.section>
          </div>

          {/* Right Column - Activity & Tips */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div className="flex items-center justify-between mb-5" variants={fadeInUp}>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  Activity
                </h2>
              </motion.div>

              <GlassCard className="p-4">
                <AnimatedList
                  items={recentActivities}
                  keyExtractor={(activity) => activity.id}
                  staggerDelay={0.1}
                  showGradients={recentActivities.length > 3}
                  className="max-h-64"
                  itemClassName="mb-4 last:mb-0"
                  renderItem={(activity) => (
                    <div className="flex gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                        getActivityIcon(activity.type)
                      )}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )}
                />

                {recentActivities.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </GlassCard>
            </motion.section>

            {/* Tips Card */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GlassCard variant="bordered" className="p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Pro Tip</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use our Salary Calculator to estimate your tax liability before filing. This helps you prepare documents in advance!
                  </p>
                  <Link to="/calculator">
                    <GradientButton variant="ghost" size="sm" className="w-full justify-center">
                      Try Calculator <ArrowRight className="h-4 w-4 ml-1" />
                    </GradientButton>
                  </Link>
                </div>
              </GlassCard>
            </motion.section>

            {/* Help Card */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GlassCard className="p-5">
                <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is ready to assist you with any questions.
                </p>
                <Link to="/help">
                  <GradientButton variant="outline" size="sm" className="w-full justify-center">
                    View Help Center
                  </GradientButton>
                </Link>
              </GlassCard>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
