import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Search, MessageCircle, ChevronDown, Sparkles, HelpCircle, FileText, Wallet, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import FinalCTA from "@/components/layout/FinalCTA";
import { cn } from "@/lib/utils";

// --- DATA ---
const CATEGORIES = [
    { id: "all", label: "All Topics" },
    { id: "general", label: "General", icon: HelpCircle },
    { id: "tax-filing", label: "Tax Filing", icon: FileText },
    { id: "payments", label: "Payments", icon: Wallet },
    { id: "account", label: "Account", icon: UserCircle },
];

const FAQS = [
    { category: "general", question: "What is PAK Filer?", answer: "PAK Filer is Pakistan's leading online tax filing platform (est. 2004). We synthesize complex tax laws into a simple digital workflow, allowing individuals and businesses to file returns in minutes." },
    { category: "general", question: "Is PAK Filer compliant?", answer: "100%. We are a direct bridge to the FBR IRIS system. Every return filed through us is legally binding and recognized by the Federal Board of Revenue." },
    { category: "tax-filing", question: "How long does it take?", answer: "Our 'Filing Wizard' typically takes a salaried individual 10-15 minutes. Complex business returns may take longer but are significantly faster than manual processing." },
    { category: "tax-filing", question: "What is 'Upload Documents'?", answer: "This is our premium white-glove service. You simply drag-and-drop your salary slips and bank statements, and our FCA-certified experts handle the entire filing process for you." },
    { category: "tax-filing", question: "Can I file for previous years?", answer: "Yes. Our system supports retroactive filing for up to 5 preceding tax years. This is crucial for clearing ‘Non-Filer’ status." },
    { category: "payments", question: "Is my payment secure?", answer: "We use bank-grade 256-bit encryption. We accept all major Pakistani payment methods including JazzCash, EasyPaisa, and Direct Bank Transfer (1Link)." },
    { category: "payments", question: "Refund Policy?", answer: "We offer a 'Filing Guarantee'. If we cannot file your return due to a technical error on our end, you receive a 100% refund immediately." },
    { category: "account", question: "Is my data private?", answer: "Your financial data is seen ONLY by our automated engine and (if selected) your assigned Chartered Accountant. We never sell data to third parties." },
];

// --- 3D ORACLE HERO ---
function OracleHero({ searchQuery, setSearchQuery }: any) {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
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
        <section
            ref={heroRef}
            className="relative h-[80vh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-[#052e16] text-white isolate pt-20"
        >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#052e16] via-[#0E552F] to-[#052e16]">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#45745B] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#82A492] rounded-full mix-blend-screen filter blur-[120px] opacity-10" />
                <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-soft-light transition-opacity duration-300" style={{ background: `radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent)` }} />
            </div>

            <motion.div style={{ y: y1 }} className="container mx-auto px-4 relative z-10 flex flex-col items-center max-w-4xl text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-widest uppercase text-emerald-300 mb-8">
                    <Sparkles className="w-3 h-3" />
                    <span>Knowledge Base</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-200">Oracle.</span>
                </motion.h1>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full max-w-2xl relative group">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl group-hover:bg-emerald-400/30 transition-all duration-500" />
                    <div className="relative bg-[#0E552F]/80 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center shadow-2xl">
                        <Search className="w-6 h-6 text-emerald-200 ml-4 shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="How do I file my taxes?"
                            className="w-full bg-transparent border-none text-xl text-white placeholder-white/40 focus:ring-0 px-4 py-4"
                        />
                    </div>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-emerald-100/60 font-light text-lg">
                    Search hundreds of articles or browse by category below.
                </motion.p>
            </motion.div>
        </section>
    );
}

// --- GLASS ACCORDION ITEM ---
const FAQItem = ({ faq, isOpen, toggle }: any) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, marginBottom: -10 }}
            animate={{ opacity: 1, marginBottom: 16 }}
            exit={{ opacity: 0, marginBottom: -10 }}
            className={cn(
                "group rounded-2xl border transition-all duration-300 overflow-hidden",
                isOpen
                    ? "bg-white border-emerald-500/30 shadow-[0_10px_40px_-10px_rgba(5,46,22,0.1)]"
                    : "bg-white/50 border-gray-200 hover:bg-white hover:border-emerald-200"
            )}
        >
            <button onClick={toggle} className="w-full flex items-center justify-between p-6 text-left">
                <span className={cn("text-lg font-bold transition-colors", isOpen ? "text-[#052e16]" : "text-gray-700")}>
                    {faq.question}
                </span>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300", isOpen ? "bg-emerald-100 text-[#0E552F] rotate-180" : "bg-gray-100 text-gray-500 group-hover:bg-emerald-50")}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed font-light border-t border-gray-100 pt-4">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = useMemo(() => {
        return FAQS.filter((faq) => {
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="bg-[#FAFAF9] min-h-screen">
            <OracleHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* --- CONTENT SECTION --- */}
            <section className="-mt-20 relative z-20 pb-32 container mx-auto px-4 max-w-5xl">

                {/* Category Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-12 bg-white/80 backdrop-blur-xl p-2 rounded-[2rem] shadow-xl border border-white/50 w-fit mx-auto"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                            className={cn(
                                "px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                                activeCategory === cat.id
                                    ? "bg-[#0E552F] text-white shadow-lg shadow-emerald-900/10"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-emerald-800"
                            )}
                        >
                            {cat.icon && <cat.icon className="w-4 h-4" />}
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* FAQ Grid */}
                <div className="grid gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    faq={faq}
                                    isOpen={openIndex === index}
                                    toggle={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-400">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-xl">No answers found for "{searchQuery}"</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Support Block */}
                <div className="mt-24 p-1 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-[2.5rem]">
                    <div className="bg-[#052e16] rounded-[2.3rem] p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-4">Still Stumping The Oracle?</h3>
                            <p className="text-emerald-100/60 mb-8 max-w-xl mx-auto">
                                Our human experts are standing by. We answer 95% of queries within 15 minutes during business hours.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link to="mailto:support@pakfiler.com">
                                    <button className="px-8 py-3 bg-white text-[#052e16] font-bold rounded-xl hover:bg-emerald-50 transition-colors">
                                        Email Support
                                    </button>
                                </Link>
                                <button className="px-8 py-3 border border-emerald-500/30 text-emerald-300 font-bold rounded-xl hover:bg-emerald-500/10 transition-colors">
                                    Live Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <FinalCTA />
        </div>
    );
}
