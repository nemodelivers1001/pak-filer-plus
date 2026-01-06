import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Calculator,
    Upload,
    FileText,
    Building2,
    UserPlus,
    Receipt,
    RefreshCw,
    Check,
    ArrowRight,
    ShieldCheck,
    Star,
    Layers,
    Zap,
    TrendingUp,
    ChevronRight,
    Briefcase
} from "lucide-react";
import FinalCTA from "@/components/layout/FinalCTA";
import { useRef, useEffect } from "react";

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

// --- 3D Components for Hero ---

function ServiceTiltCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) / 2.5);
        y.set((event.clientY - rect.top - rect.height / 2) / 2.5);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="relative w-full max-w-sm aspect-[4/5] mx-auto cursor-pointer perspective-1000 hidden lg:block"
        >
            {/* Holographic Stack Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-amber-500/10 rounded-3xl blur-2xl animate-pulse" />

            {/* Main Surface */}
            <motion.div
                style={{ z: 20 }}
                className="absolute inset-0 bg-[#052e16]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden group"
            >
                {/* Shine Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                            <Layers className="w-7 h-7 text-emerald-400" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
                            Premium
                        </span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Elite Package</h3>
                    <p className="text-white/50 text-base leading-relaxed">
                        Full-spectrum coverage for high-net-worth individuals.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <p className="text-xs text-white/40 mb-1">Coverage</p>
                            <p className="text-sm text-white font-semibold">100% Audit Protection</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <p className="text-xs text-white/40 mb-1">Priority</p>
                            <p className="text-sm text-white font-semibold">24/7 Access</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-emerald-400/80">
                            <span>SYSTEM STATUS</span>
                            <span>OPTIMAL</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-emerald-500"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Elements (Parallax) */}
            <motion.div
                style={{ z: 60, x: useTransform(x, [-50, 50], [20, -20]), y: useTransform(y, [-50, 50], [20, -20]) }}
                className="absolute -right-6 top-12 bg-white text-[#052e16] px-5 py-3 rounded-2xl font-bold text-sm shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-2"
            >
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="tracking-wide">Fast Track</span>
            </motion.div>

            <motion.div
                style={{ z: 40, x: useTransform(x, [-50, 50], [-20, 20]), y: useTransform(y, [-50, 50], [-20, 20]) }}
                className="absolute -left-6 bottom-20 bg-[#0E552F] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-2"
            >
                <TrendingUp className="w-4 h-4" />
                <span className="tracking-wide">+25k Saved</span>
            </motion.div>
        </motion.div>
    );
}

// --- Data Models (Prices Removed) ---
const personalServices = [
    {
        id: "s1",
        title: "Online Filing Wizard",
        desc: "Automated, step-by-step intelligence for salaried individuals. FBR integrated.",
        icon: Calculator,
        features: ["Salary Tax Computation", "Wealth Reconciliation", "Instant FBR Submission", "Tax Credit Optimization"],
        theme: "emerald",
        badge: "Popular"
    },
    {
        id: "s2",
        title: "Document Upload",
        desc: "Drop your files. Our FCA-certified experts handle the entire complexity.",
        icon: Upload,
        features: ["Manual Verification", "Complex Asset Declaration", "Audit Defense", "Foreign Income Handling"],
        theme: "dark",
        badge: "Premium"
    }
];

const businessServices = [
    {
        id: "b1",
        title: "Sole Proprietor",
        desc: "Legacy building for individuals.",
        icon: Briefcase,
        features: ["Expense Claims", "P&L Structuring", "Sales Tax Advisory"],
        theme: "gold"
    },
    {
        id: "b2",
        title: "Private Limited",
        desc: "Corporate compliance engine.",
        icon: Building2,
        features: ["Form 29/A Filing", "SECP Compliance", "Corporate Tax Planning"],
        theme: "emerald"
    },
    {
        id: "b3",
        title: "Partnership / AOP",
        desc: "Structured AOP filing.",
        icon: UserPlus,
        features: ["Partner Share Division", "Joint Asset Management", "Legal Compliance"],
        theme: "dark"
    }
];

const specializedServices = [
    {
        title: "NTN Registration",
        icon: ShieldCheck,
        desc: "FBR Recognition in 24h"
    },
    {
        title: "GST Registration",
        icon: Receipt,
        desc: "Sales Tax Authority Compliance"
    },
    {
        title: "IRIS Profile Update",
        icon: RefreshCw,
        desc: "Rapid Data Correction"
    }
];

// --- HOLOGRAPHIC CARD COMPONENT ---
const ServiceCard = ({ service }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    // Theme Styles
    const styles = {
        emerald: {
            bg: "bg-white",
            border: "border-emerald-100",
            hoverBorder: "group-hover:border-emerald-500/50",
            iconBg: "bg-emerald-50",
            iconColor: "text-[#0E552F]",
            badge: "bg-emerald-100 text-emerald-800",
            button: "bg-[#0E552F] text-white hover:bg-[#052e16]",
            accent: "from-emerald-500/10 to-transparent"
        },
        dark: {
            bg: "bg-[#052e16]",
            border: "border-white/10",
            hoverBorder: "group-hover:border-emerald-400/50",
            iconBg: "bg-white/10",
            iconColor: "text-white",
            badge: "bg-white/20 text-white",
            button: "bg-white text-[#0E552F] hover:bg-emerald-50",
            accent: "from-white/5 to-transparent"
        },
        gold: {
            bg: "bg-white",
            border: "border-amber-100",
            hoverBorder: "group-hover:border-amber-500/50",
            iconBg: "bg-amber-50",
            iconColor: "text-amber-700",
            badge: "bg-amber-100 text-amber-800",
            button: "bg-amber-500 text-white hover:bg-amber-600",
            accent: "from-amber-500/10 to-transparent"
        }
    };

    const s = styles[service.theme];
    const isDark = service.theme === 'dark';

    return (
        <motion.div
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            className={`group relative rounded-[2.5rem] p-10 overflow-hidden transition-all duration-500 ${s.bg} border ${s.border} ${s.hoverBorder} hover:shadow-2xl hover:shadow-emerald-900/5 flex flex-col h-full hover:-translate-y-2`}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: useTransform(
                        [x, y],
                        ([latestX, latestY]) => `radial-gradient(600px circle at ${latestX}px ${latestY}px, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(14,85,47,0.04)'}, transparent 40%)`
                    ),
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${s.iconBg} ${s.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                        <service.icon className="w-8 h-8" />
                    </div>
                    {service.badge && (
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${s.badge}`}>
                            {service.badge}
                        </span>
                    )}
                </div>

                <div className="mb-8">
                    <h3 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#052e16]'}`}>
                        {service.title}
                    </h3>
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-emerald-100/60' : 'text-gray-500'}`}>
                        {service.desc}
                    </p>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-10 mb-8" />

                <ul className="space-y-4 mb-10 flex-1">
                    {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <div className={`mt-1 flex items-center justify-center w-5 h-5 rounded-full ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100/50 text-[#0E552F]'}`}>
                                <Check className="w-3 h-3" />
                            </div>
                            <span className={`text-sm font-medium ${isDark ? 'text-emerald-50' : 'text-gray-700'}`}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <Link to="/auth" className="block">
                        <button className={`w-full py-5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn ${s.button}`}>
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default function Services() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const lineRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                heroRef.current.style.setProperty('--mouse-x', `${x}%`);
                heroRef.current.style.setProperty('--mouse-y', `${y}%`);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="bg-[#FAFAF9] min-h-screen">

            {/* --- HERO SECTION --- */}
            <section
                ref={heroRef}
                id="services-hero"
                className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#052e16] text-white isolate cursor-default pt-20"
            >
                {/* 1. Cinematic Background Layers */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#052e16] via-[#0E552F] to-[#052e16]">
                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] mix-blend-overlay pointer-events-none perspective-[2000px] rotate-x-12" />
                    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#45745B] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#82A492] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />
                    <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-soft-light transition-opacity duration-300" style={{ background: `radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15), transparent)` }} />

                    {/* Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: Math.random() * 100 }}
                                animate={{ opacity: [0, 0.8, 0], y: [Math.random() * 100, Math.random() * -100] }}
                                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                                className="absolute w-1 h-1 bg-white/40 rounded-full"
                                style={{ left: `${Math.random() * 100}%` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center h-full">
                    <div className="text-center lg:text-left flex flex-col justify-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-widest uppercase text-green-300 mb-8 shadow-glow self-center lg:self-start">
                            <Star className="w-3 h-3 fill-green-300" />
                            <span>Service Catalog v2.0</span>
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                            Choose <span className="text-white/30 font-light">Your</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Path.</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl text-emerald-100/70 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                            From individual filings to complex corporate structures, select the package that defines your financial freedom.
                        </motion.p>
                    </div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="flex items-center justify-center h-full pb-20 lg:pb-0">
                        <ServiceTiltCard />
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 1, duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                </motion.div>
            </section>

            {/* --- CONNECTING LINE --- */}
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full pointer-events-none hidden lg:block overflow-hidden" ref={lineRef}>
                <motion.div
                    style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    className="w-full bg-gradient-to-b from-[#0E552F] via-emerald-400 to-[#0E552F] opacity-20"
                />
            </div>

            {/* --- PERSONAL SERVICES --- */}
            <section className="relative z-20 pb-40">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
                    >
                        {personalServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- BUSINESS VAULT SECTION --- */}
            <section className="py-32 bg-[#052e16] relative z-20 overflow-hidden">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[linear-gradient(to_right,#0E552F10_1px,transparent_1px),linear-gradient(to_bottom,#0E552F10_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"
                />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-amber-500 font-bold tracking-widest uppercase text-sm mb-2">
                                <Briefcase className="w-4 h-4" />
                                <span>Corporate Sector</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">Business Solutions</h2>
                        </div>
                        <p className="text-emerald-100/50 max-w-md text-lg text-right">
                            Scalable compliance infrastructure for enterprises and distinct legal entities.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {businessServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- SPECIALIZED ADD-ONS --- */}
            <section className="py-32 bg-white relative z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/50 text-[#0E552F] font-semibold text-sm mb-6">
                            Essential Extras
                        </span>
                        <h2 className="text-4xl font-bold text-[#052e16] mb-6">Specialized Registrations</h2>
                        <p className="text-xl text-gray-500 font-light">Standalone services for your specific compliance needs.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {specializedServices.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group bg-[#FAFAF9] rounded-[2rem] p-8 border border-gray-100 hover:border-emerald-500/30 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[4rem] transition-all group-hover:bg-emerald-500/10" />

                                <div className="w-14 h-14 bg-white rounded-2xl border border-gray-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <service.icon className="w-7 h-7 text-[#052e16]" />
                                </div>

                                <h4 className="font-bold text-[#052e16] text-xl mb-2">{service.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6 h-10">{service.desc}</p>

                                <div className="flex items-center justify-end pt-6 border-t border-gray-200">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100/50 flex items-center justify-center group-hover:bg-[#0E552F] group-hover:text-white transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- REUSED FOOTER CTA --- */}
            <FinalCTA />
        </div>
    );
}
