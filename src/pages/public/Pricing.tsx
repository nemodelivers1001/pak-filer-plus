import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState, useMemo, MouseEvent } from "react";
import { Check, Briefcase, User, Building, Calculator, ShieldCheck } from "lucide-react";
import { UnifiedBackground } from "@/components/layout/UnifiedBackground";
import { cn } from "@/lib/utils";
import FAQSection from "@/components/landing/FAQSection";
import { toast } from "sonner";
import { TiltCard } from "@/components/ui/TiltCard";

// ----------------------------------------------------------------------
// DATA CONFIG
// ----------------------------------------------------------------------

type EntityType = 'sole' | 'partnership' | 'ltd' | 'npo';

const BUSINESS_RATES = {
    sole: { label: "Sole Proprietor", online: 3000, upload: 5000, ca: 2000 },
    partnership: { label: "Partnership / AOP", online: 4500, upload: 7500, ca: 3000 },
    ltd: { label: "Pvt Ltd Company", online: 6000, upload: 10000, ca: 4000 },
    npo: { label: "Non-Profit Org", online: 9000, upload: 13000, ca: 4000 }
};

const OTHER_SERVICES = [
    { name: "NTN Registration (Salaried)", price: "Rs 500" },
    { name: "NTN Registration (Sole Prop)", price: "Rs 1,500" },
    { name: "NTN Registration (Partnership)", price: "Rs 3,500" },
    { name: "NTN Registration (Pvt Ltd)", price: "Rs 7,000" },
    { name: "NTN Registration (NPO)", price: "Rs 9,000" },
    { name: "GST Registration", price: "Rs 9,000" },
    { name: "IRIS Update (Salaried)", price: "Rs 100" },
    { name: "IRIS Update (Business)", price: "Rs 800" }
];

const PRICING_FAQS = [
    { question: "What payment methods do you accept?", answer: "We accept JazzCash, EasyPaisa, Direct Bank Transfer (1Link), and Credit/Debit Cards covering all major banks in Pakistan." },
    { question: "Is CA Review necessary?", answer: "It is optional but highly recommended. A Chartered Accountant will personally review your return to ensure maximum tax savings and compliance before it hits the FBR portal." },
    { question: "What is the difference between Online Filing & Upload?", answer: "Online Filing is a DIY wizard where you enter your data. 'Upload Documents' is a Full-Service plan where you just upload files, and our experts do everything." },
    { question: "Can I upgrade later?", answer: "Yes, you can add services like CA Review at any point before the final submission." },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function Pricing() {
    const [clientType, setClientType] = useState<'personal' | 'business'>('personal');
    const [entityType, setEntityType] = useState<EntityType>('sole');
    const [isMultiSource, setIsMultiSource] = useState(false);
    const [addCaReview, setAddCaReview] = useState(false);

    // Spotlight Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Calculate Prices dynamically
    const prices = useMemo(() => {
        if (clientType === 'personal') {
            const baseOnline = isMultiSource ? 1500 : 999;
            const baseUpload = 3500;
            const caFee = 1000;
            return {
                online: baseOnline + (addCaReview ? caFee : 0),
                upload: baseUpload + (addCaReview ? caFee : 0),
                caIncluded: addCaReview
            };
        } else {
            const rates = BUSINESS_RATES[entityType];
            const caFee = rates.ca; // Dynamic CA fee based on entity
            return {
                online: rates.online + (addCaReview ? caFee : 0),
                upload: rates.upload + (addCaReview ? caFee : 0),
                caIncluded: addCaReview
            };
        }
    }, [clientType, entityType, isMultiSource, addCaReview]);

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden" onMouseMove={handleMouseMove}>
            <UnifiedBackground watermark="VALUE" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* HERO HEADER */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E552F]/5 backdrop-blur-md text-[#0E552F] font-bold border border-[#0E552F]/10 mb-6">
                        <Calculator className="w-4 h-4" />
                        <span>The Value Vault</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-7xl font-black text-[#0E552F] tracking-tighter mb-6">
                        Transparent Pricing.<br />No Hidden Math.
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-[#45745B]">
                        Choose the perfect plan for your <span className="font-bold text-[#0E552F]">Tax DNA</span>.
                    </motion.p>
                </div>

                {/* 🎛️ CONTROL CENTER */}
                <div className="flex flex-col items-center gap-8 mb-16">

                    {/* 1. MASTER TOGGLE (Personal / Business) */}
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-1.5 rounded-full flex gap-1 shadow-lg shadow-[#0E552F]/10 relative">
                        <button
                            onClick={() => setClientType('personal')}
                            className={cn("px-8 py-3 rounded-full text-sm font-bold transition-all relative z-10 flex items-center gap-2", clientType === 'personal' ? "text-white" : "text-[#45745B] hover:bg-white/50")}
                        >
                            <User className="w-4 h-4" /> Personal
                        </button>
                        <button
                            onClick={() => setClientType('business')}
                            className={cn("px-8 py-3 rounded-full text-sm font-bold transition-all relative z-10 flex items-center gap-2", clientType === 'business' ? "text-white" : "text-[#45745B] hover:bg-white/50")}
                        >
                            <Briefcase className="w-4 h-4" /> Business
                        </button>

                        <div className={cn(
                            "absolute top-1.5 bottom-1.5 rounded-full bg-[#0E552F] shadow-md transition-all duration-300 ease-out",
                            clientType === 'personal' ? "left-1.5 w-[135px]" : "left-[145px] w-[140px]"
                        )} />
                    </div>

                    {/* 2. SUB CONTROLS (Context Aware) */}
                    <div className="min-h-[80px] w-full flex justify-center items-center">
                        <AnimatePresence mode="wait">
                            {clientType === 'personal' ? (
                                <motion.div
                                    key="personal-controls"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-4 bg-[#E8F5EF] px-6 py-3 rounded-2xl border border-[#0E552F]/10"
                                >
                                    <span className="text-[#0E552F] font-bold text-sm">Income Sources:</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsMultiSource(false)}
                                            className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", !isMultiSource ? "bg-[#0E552F] text-white shadow-md" : "bg-white text-[#45745B]")}
                                        >
                                            Single
                                        </button>
                                        <button
                                            onClick={() => setIsMultiSource(true)}
                                            className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", isMultiSource ? "bg-[#0E552F] text-white shadow-md" : "bg-white text-[#45745B]")}
                                        >
                                            Multiple
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="business-controls"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="w-full max-w-2xl bg-[#E8F5EF] px-2 py-2 rounded-2xl border border-[#0E552F]/10 flex justify-between gap-1 overflow-x-auto"
                                >
                                    {(Object.keys(BUSINESS_RATES) as EntityType[]).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setEntityType(type)}
                                            className={cn(
                                                "flex-1 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
                                                entityType === type
                                                    ? "bg-[#0E552F] text-white shadow-md"
                                                    : "hover:bg-white/60 text-[#45745B]"
                                            )}
                                        >
                                            {BUSINESS_RATES[type].label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3. CA ADD-ON (Global Modifier) */}
                    <label className={cn(
                        "flex items-center gap-3 cursor-pointer group select-none transition-all px-6 py-4 rounded-2xl border",
                        addCaReview ? "bg-[#FFFbeb] border-[#fbbf24] shadow-lg shadow-amber-500/10" : "bg-white/40 border-transparent hover:bg-white/60"
                    )}>
                        <div className={cn(
                            "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                            addCaReview ? "bg-[#f59e0b] border-[#f59e0b]" : "border-[#0E552F]/30 bg-white group-hover:border-[#0E552F]"
                        )}>
                            {addCaReview && <Check className="w-4 h-4 text-white" />}
                            <input type="checkbox" className="hidden" checked={addCaReview} onChange={(e) => setAddCaReview(e.target.checked)} />
                        </div>
                        <span className={cn("font-bold transition-colors", addCaReview ? "text-[#b45309]" : "text-[#0E552F]")}>Include Expert CA Review?</span>
                        {addCaReview && (
                            <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-xs font-bold text-[#b45309] bg-[#fcd34d] px-2 py-0.5 rounded-full ml-2">
                                + Rs {clientType === 'personal' ? 1000 : BUSINESS_RATES[entityType].ca}
                            </motion.span>
                        )}
                    </label>

                </div>

                {/* 💳 DYNAMIC PRICING CARDS - GRID WITH SPOTLIGHT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative group">
                    {/* Spotlight Overlay */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    650px circle at ${mouseX}px ${mouseY}px,
                                    rgba(14, 85, 47, 0.15),
                                    transparent 80%
                                )
                            `,
                        }}
                    />

                    {/* CARD 1: ONLINE FILING (DIY) */}
                    <PricingCard
                        title="Online Filing"
                        subtitle={clientType === 'personal' ? "Self-Service Wizard" : "Business Self-Filing"}
                        price={prices.online}
                        features={[
                            "Direct FBR Integration",
                            "Auto-Calculation Engine",
                            "Wealth Statement Processing",
                            "Real-time Status Tracking",
                            clientType === 'business' ? "Business Expense Claims" : "Tax Reduction Logic"
                        ]}
                        isRecommended={clientType === 'personal' && !isMultiSource}
                        caIncluded={addCaReview}
                    />

                    {/* CARD 2: DOCUMENT UPLOAD (FULL SERVICE) */}
                    <PricingCard
                        title="Upload Documents"
                        subtitle="We Handle Everything"
                        price={prices.upload}
                        features={[
                            "Dedicated Tax Expert",
                            "Complete Document Parsing",
                            "Maximum Refund Identification",
                            "Priority Support Channel",
                            "Audit-Proof Filing",
                            "Complex Wealth Reconciliation"
                        ]}
                        isRecommended={clientType === 'business' || (clientType === 'personal' && isMultiSource)}
                        caIncluded={addCaReview}
                        isDark
                    />
                </div>

                {/* 🧱 OTHER SERVICES GRID */}
                <div className="mb-24">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-[#0E552F]">A La Carte Services</h2>
                        <p className="text-[#45745B]">Specialized registrations and updates</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {OTHER_SERVICES.map((service, i) => (
                            <div key={i} className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <Building className="w-5 h-5 text-[#45745B]" />
                                    <span className="text-[#0E552F] font-black text-lg group-hover:scale-110 transition-transform">{service.price}</span>
                                </div>
                                <h3 className="text-sm font-bold text-[#0E552F] leading-snug">{service.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <FAQSection
                    title="Pricing FAQs"
                    subtitle="Common questions about our fees"
                    faqs={PRICING_FAQS}
                />

            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function PricingCard({ title, subtitle, price, features, isRecommended, caIncluded, isDark }: any) {
    return (
        <TiltCard className="h-full" glareColor={isDark ? "rgba(255,255,255,0.1)" : "rgba(14, 85, 47, 0.05)"}>
            <motion.div
                layout
                className={cn(
                    "relative h-full rounded-[2.5rem] p-8 md:p-10 border-2 transition-all duration-500 overflow-hidden flex flex-col justify-between",
                    isDark
                        ? (caIncluded ? "bg-[#0E552F] border-[#FCD34D] shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)]" : "bg-[#0E552F] border-[#0E552F] shadow-2xl shadow-[#0E552F]/30")
                        : (caIncluded ? "bg-white/70 border-[#FCD34D] shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]" : "bg-white/60 backdrop-blur-xl border-white/60 shadow-xl shadow-[#0E552F]/10 text-[#0E552F]")
                )}
            >
                {isRecommended && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-[#FCD34D] text-[#92400E] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        Recommended
                    </div>
                )}

                <div>
                    <div className="mb-8">
                        <h3 className={cn("text-2xl font-black mb-1", isDark ? "text-white" : "text-[#0E552F]")}>{title}</h3>
                        <p className={cn("text-sm font-medium opacity-80", isDark ? "text-white/70" : "text-[#45745B]")}>{subtitle}</p>
                    </div>

                    <div className="mb-8 flex items-end gap-1">
                        <span className={cn("text-lg font-bold mb-2 opacity-60", isDark ? "text-white" : "text-[#0E552F]")}>Rs</span>
                        <KeyframeCounter value={price} isDark={isDark} />
                    </div>

                    {/* CA Badge */}
                    <AnimatePresence>
                        {caIncluded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 overflow-hidden"
                            >
                                <div className={cn("flex items-center gap-2 p-3 rounded-xl border border-dashed", isDark ? "bg-white/10 border-[#FCD34D]/50" : "bg-[#FFFBEB] border-[#FCD34D]")}>
                                    <ShieldCheck className={cn("w-5 h-5", isDark ? "text-[#FCD34D]" : "text-[#d97706]")} />
                                    <span className={cn("text-xs font-bold", isDark ? "text-[#FCD34D]" : "text-[#d97706]")}>Includes Expert CA Review</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-4 mb-10">
                        {features.map((feat: string, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", isDark ? "bg-white/20 text-white" : "bg-[#E8F5EF] text-[#0E552F]")}>
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className={cn("font-medium text-sm", isDark && "text-white")}>{feat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => toast.success(`Selected ${title} Plan`)}
                    className={cn(
                        "w-full py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]",
                        isDark
                            ? "bg-white text-[#0E552F] hover:bg-[#F0F7F3]"
                            : "bg-[#0E552F] text-white hover:bg-[#093d20] shadow-xl shadow-[#0E552F]/20"
                    )}>
                    Select Plan
                </button>

                {/* Background Noise */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </motion.div>
        </TiltCard>
    )
}

function KeyframeCounter({ value, isDark }: { value: number, isDark: boolean }) {
    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-6xl font-black tracking-tighter", isDark ? "text-white" : "text-[#0E552F]")}
        >
            {value.toLocaleString()}
        </motion.span>
    )
}
