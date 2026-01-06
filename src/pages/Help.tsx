import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, HelpCircle, FileText, Shield, MessageCircle, ArrowUpRight, Sparkles, Mail } from "lucide-react";
import { UnifiedBackground } from "@/components/layout/UnifiedBackground";
import { cn } from "@/lib/utils";

export default function Help() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const categories = [
        { id: "All", label: "All Topics" },
        { id: "Filing", label: "Filing Taxes" },
        { id: "Registration", label: "Registration" },
        { id: "Payments", label: "Payments" },
    ];

    const faqs = [
        {
            id: 1,
            question: "How long does filing take?",
            answer: "Most users complete the process in under 15 minutes. FBR processing typically follows within 24-48 hours.",
            category: "Filing",
            icon: FileText
        },
        {
            id: 2,
            question: "Is my data secure?",
            answer: "Absolutely. We use bank-level 256-bit encryption. Your data is submitted directly to FBR via encrypted channels.",
            category: "Registration",
            icon: Shield
        },
        {
            id: 3,
            question: "What documents do I need?",
            answer: "Strictly just your CNIC. For salaried individuals, a Salary Slip helps with accuracy but isn't mandatory.",
            category: "Filing",
            icon: FileText
        },
        {
            id: 4,
            question: "How do I pay the fee?",
            answer: "We support JazzCash, EasyPaisa, and Direct Bank Transfer (1Link). Payment is verified instantly.",
            category: "Payments",
            icon: MessageCircle
        },
        {
            id: 5,
            question: "Can I file for previous years?",
            answer: "Yes! You can file returns for the past 2 years (2024, 2025) directly through the History tab.",
            category: "Filing",
            icon: FileText
        },
        {
            id: 6,
            question: "How do I update my profile?",
            answer: "Go to your Profile page and click on any detail card (Email, Phone) to edit it. Changes reflect instantly.",
            category: "Registration",
            icon: Sparkles
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        (activeCategory === "All" || faq.category === activeCategory) &&
        (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen pt-32 pb-32 px-6 md:px-10 max-w-7xl mx-auto relative">
            <UnifiedBackground watermark="MATRIX" />

            {/* 1. HERO COMMAND DECK */}
            <div className="text-center mb-20 relative z-10 max-w-3xl mx-auto">

                {/* Removed "Support Matrix" pill as requested */}

                <motion.h1
                    className="text-5xl md:text-7xl font-black text-[#0E552F] tracking-tighter mb-8 leading-tight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    How can we assist?
                </motion.h1>

                {/* Floating Search Orb */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-[#0E552F]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100" />
                    <div className="relative flex items-center bg-white/60 backdrop-blur-2xl border border-white/50 rounded-full px-8 py-5 shadow-2xl shadow-[#0E552F]/10 focus-within:ring-4 focus-within:ring-[#0E552F]/10 transition-all">
                        <Search className="w-6 h-6 text-[#0E552F] mr-4" />
                        <input
                            type="text"
                            placeholder="Search the matrix..."
                            className="w-full bg-transparent border-none outline-none text-xl text-[#0E552F] font-medium placeholder:text-[#0E552F]/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mt-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border",
                                activeCategory === cat.id
                                    ? "bg-[#0E552F] text-white border-[#0E552F]"
                                    : "bg-white/40 text-[#45745B] border-white/60 hover:bg-white/80"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. THE MATRIX GRID */}
            <motion.div
                layout="position"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
            >
                <AnimatePresence>
                    {filteredFaqs.map((faq) => (
                        <MatrixCard
                            key={faq.id}
                            faq={faq}
                            isExpanded={expandedId === faq.id}
                            onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* 3. MIND BLOWING CONTACT SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="mt-32 max-w-4xl mx-auto"
            >
                <div className="relative overflow-hidden rounded-[3rem] bg-[#0E552F] text-white p-12 md:p-16 shadow-2xl shadow-[#0E552F]/30 group">

                    {/* Background Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner shrink-0 group-hover:rotate-12 transition-transform duration-500">
                            <Mail className="w-10 h-10" />
                        </div>

                        <div className="flex-1">
                            <p className="text-[#4ade80] font-bold tracking-widest uppercase text-sm mb-2">Query Unresolved?</p>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Establish a Direct Uplink</h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Still scanning the matrix? Signal our expert command center.
                                We guarantee a priority transmission response within <span className="text-white font-bold decoration-2 underline decoration-[#4ade80]">24 operational hours</span>.
                            </p>
                        </div>

                        <button className="px-8 py-4 rounded-full bg-white text-[#0E552F] font-bold text-lg hover:bg-[#4ade80] hover:text-[#052e16] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 shrink-0">
                            support@pakfiler.com
                        </button>
                    </div>
                </div>
            </motion.div>

            {filteredFaqs.length === 0 && (
                <div className="text-center py-20 text-[#45745B]/60">
                    <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-medium">No signals found in the matrix.</p>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="mt-2 text-[#0E552F] font-bold hover:underline"
                    >
                        Reset & Rescan
                    </button>
                </div>
            )}

        </div>
    );
}

function MatrixCard({ faq, isExpanded, onToggle }: any) {
    const Icon = faq.icon;

    return (
        <motion.div
            layout="position"
            onClick={onToggle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            // Unified smooth transition for layout changes
            transition={{
                layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 },
                opacity: { duration: 0.2 }
            }}
            className={cn(
                "group cursor-pointer relative overflow-hidden rounded-[2rem] border p-6 transition-colors duration-500",
                isExpanded
                    ? "bg-[#0E552F] border-[#0E552F] shadow-2xl shadow-[#0E552F]/30 col-span-1 md:col-span-2 lg:col-span-1 row-span-2 z-10"
                    : "bg-white/40 backdrop-blur-md border-white/60 hover:bg-white/70 hover:border-white hover:shadow-xl hover:shadow-[#0E552F]/5"
            )}
        >
            <motion.div layout="position" className="flex justify-between items-start mb-4">
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300",
                    isExpanded ? "bg-white/10 text-white" : "bg-[#F0F7F3] text-[#0E552F] group-hover:bg-[#0E552F] group-hover:text-white"
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-300",
                    isExpanded ? "bg-white/20 text-white" : "bg-[#0E552F]/5 text-[#45745B]"
                )}>
                    {faq.category}
                </div>
            </motion.div>

            <motion.h3
                layout="position"
                className={cn(
                    "text-xl font-bold mb-2 leading-tight transition-colors duration-300 pr-8",
                    isExpanded ? "text-white" : "text-[#0E552F]"
                )}
            >
                {faq.question}
            </motion.h3>

            <motion.div
                initial={false}
                animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="text-white/80 leading-relaxed mt-4 border-t border-white/10 pt-4 pb-2">
                    {faq.answer}
                </div>
            </motion.div>

            {/* Action Icon */}
            <div className={cn(
                "absolute bottom-6 right-6 transition-transform duration-300",
                isExpanded ? "rotate-180" : "rotate-0"
            )}>
                <ArrowUpRight className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isExpanded ? "text-white/50" : "text-[#0E552F]/30"
                )} />
            </div>

        </motion.div>
    );
}
