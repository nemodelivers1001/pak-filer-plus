import { motion, useScroll, useSpring } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { TiltCard } from "@/components/ui/TiltCard";
import { FileText, Shield, User, Smartphone, Mail, MapPin, Edit2, AlertCircle, CheckCircle, Calendar, ArrowRight, Copy } from "lucide-react";
import { UnifiedBackground } from "@/components/layout/UnifiedBackground";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function Profile() {
    const { user } = useAuth();

    // Scroll tracking for Timeline
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 md:px-10 max-w-7xl mx-auto relative">
            <UnifiedBackground watermark="IDENTITY" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">

                {/* ════════════════════════════════════════════════════════════════
            LEFT COLUMN (STICKY) - IDENTITY ANCHOR
            ════════════════════════════════════════════════════════════════ */}
                <div className="lg:col-span-5 relative">
                    <div className="lg:sticky lg:top-32 space-y-10">

                        {/* Header Block */}
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants} className="mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E552F]/5 backdrop-blur-md text-[#0E552F] font-bold border border-[#0E552F]/10 shadow-sm relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                    <Shield className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10 text-xs tracking-wider uppercase">Active Status Verified</span>
                                </span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-[#0E552F] tracking-tighter leading-[0.9] mb-4">
                                MY<br />IDENTITY
                            </motion.h1>
                            <motion.p variants={itemVariants} className="text-lg text-[#45745B] max-w-xs font-medium">
                                Your unified filer profile, verified and secured on the blockchain.
                            </motion.p>
                        </motion.div>

                        {/* The 3D ID Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="w-full aspect-[1.58/1]"
                        >
                            <TiltCard className="h-full w-full" glareColor="rgba(255,255,255,0.3)">
                                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-[#0E552F]/30 group border border-white/10">
                                    {/* Backgrounds */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0E552F] via-[#052e16] to-black" />
                                    <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                                    {/* Holographic Scanner */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent z-20 opacity-50"
                                        animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#4ade80]/20 to-transparent" />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between text-white">
                                        <div className="flex justify-between items-start">
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                                                <User className="w-7 h-7 text-white/90" />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">PAK FILER ID</p>
                                                <p className="text-xl font-mono tracking-wider font-bold">8921-XJ</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">{user?.name || "Muhammad Moaiz"}</h3>
                                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                                <span>Software Engineer</span>
                                                <span className="w-1 h-1 rounded-full bg-white/40" />
                                                <span>Lahore, PK</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>

                    </div>
                </div>

                {/* ════════════════════════════════════════════════════════════════
            RIGHT COLUMN (SCROLL) - DATA FEED
            ════════════════════════════════════════════════════════════════ */}
                <div className="lg:col-span-7 pb-32 space-y-16 pt-10 lg:pt-32">

                    {/* 1. HERO METRIC - Compliance Score */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-8xl font-black text-[#0E552F] tracking-tighter leading-none">92</span>
                            <span className="text-3xl font-bold text-[#45745B] mb-2">%</span>
                        </div>
                        <div className="h-2 w-full bg-[#0E552F]/10 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "92%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-[#0E552F]"
                            />
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold text-[#0E552F]">Compliance Score</h3>
                                <p className="text-[#45745B]">Excellent standing for Tax Year 2026</p>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-[#0E552F] hover:gap-3 transition-all">
                                View Detailed Report <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>

                    {/* 2. ACTION ROW */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="bg-[#FFFBEB]/60 backdrop-blur-sm border border-[#FCD34D]/40 rounded-3xl p-6 hover:bg-[#FFFBEB] transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between mb-4">
                                <AlertCircle className="w-6 h-6 text-[#D97706]" />
                                <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
                            </div>
                            <p className="text-[#92400E] text-xs font-bold uppercase tracking-wider mb-1">Attention Needed</p>
                            <p className="text-[#78350F] font-bold text-lg group-hover:translate-x-1 transition-transform">Verify Phone</p>
                        </div>

                        <div className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-3xl p-6 hover:bg-white/60 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between mb-4">
                                <FileText className="w-6 h-6 text-[#0E552F]" />
                            </div>
                            <p className="text-[#45745B] text-xs font-bold uppercase tracking-wider mb-1">Documents</p>
                            <p className="text-[#0E552F] font-bold text-lg group-hover:translate-x-1 transition-transform">Tax History</p>
                        </div>
                    </motion.div>

                    {/* 3. PERSONAL DATA STRIPS */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] flex-1 bg-[#0E552F]/10" />
                            <h3 className="text-sm font-bold text-[#0E552F]/40 uppercase tracking-widest">Personal Data</h3>
                            <div className="h-[1px] flex-1 bg-[#0E552F]/10" />
                        </div>

                        <DataStrip icon={Mail} label="Email Address" value={user?.email || "nemo@routerradiant.com"} />
                        <DataStrip icon={Smartphone} label="Phone Number" value="+92 321 1234567" />
                        <DataStrip icon={MapPin} label="Mailing Address" value="House 123, Street 45, DHA Phase 6, Lahore" />
                    </motion.div>

                    {/* 4. LIVING TIMELINE */}
                    <div ref={timelineRef} className="pt-8">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-[1px] flex-1 bg-[#0E552F]/10" />
                            <h3 className="text-sm font-bold text-[#0E552F]/40 uppercase tracking-widest">Journey</h3>
                            <div className="h-[1px] flex-1 bg-[#0E552F]/10" />
                        </div>

                        <div className="relative pl-4">
                            {/* The Drawing Line */}
                            <div className="absolute left-[27px] top-4 bottom-0 w-0.5 bg-[#0E552F]/10" />
                            <motion.div
                                style={{ scaleY: scaleY, originY: 0 }}
                                className="absolute left-[27px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-[#0E552F] to-[#4ade80]"
                            />

                            <div className="space-y-12">
                                <TimelineItem
                                    date="JAN 2026"
                                    title="Filing Initiated"
                                    desc="Tax Year 2026 process started."
                                    icon={CheckCircle}
                                    active
                                />
                                <TimelineItem
                                    date="DEC 2025"
                                    title="Status Renewed"
                                    desc="FBR ATL List updated."
                                    icon={Shield}
                                    active
                                />
                                <TimelineItem
                                    date="NOV 2024"
                                    title="Joined Platform"
                                    desc="Account created successfully."
                                    icon={User}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function DataStrip({ icon: Icon, label, value }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.01, x: 4 }}
            className="group flex items-center gap-6 p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 hover:bg-white/80 hover:shadow-lg hover:shadow-[#0E552F]/5 transition-all cursor-pointer relative overflow-hidden"
        >
            <div className="w-12 h-12 rounded-xl bg-[#F0F7F3] text-[#0E552F] flex items-center justify-center shrink-0 group-hover:bg-[#0E552F] group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#45745B] uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-base font-semibold text-[#0E552F] truncate">{value}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit2 className="w-4 h-4 text-[#0E552F]" />
            </div>
        </motion.div>
    )
}

function TimelineItem({ date, title, desc, icon: Icon, active }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-50px" }}
            className="relative flex gap-8 group"
        >
            <div className={cn(
                "relative z-10 w-14 h-14 rounded-full border-[6px] shadow-sm flex items-center justify-center shrink-0 transition-all duration-500",
                active
                    ? "bg-[#E8F5EF] border-[#f8fcfa] text-[#0E552F] group-hover:scale-110 group-hover:border-white"
                    : "bg-white border-[#f8fcfa] text-gray-300"
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="pt-2">
                <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block tracking-wider",
                    active ? "bg-[#0E552F]/5 text-[#0E552F]" : "bg-gray-100 text-gray-400"
                )}>
                    {date}
                </span>
                <h4 className={cn("text-xl font-bold", active ? "text-[#0E552F]" : "text-gray-400")}>{title}</h4>
                <p className={cn("text-sm", active ? "text-[#45745B]" : "text-gray-400")}>{desc}</p>
            </div>
        </motion.div>
    )
}
