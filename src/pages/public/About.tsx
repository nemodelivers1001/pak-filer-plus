import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import {
    Target,
    Eye,
    Shield,
    Users,
    Award,
    Briefcase,
    Globe,
    Minus,
    ArrowRight,
    Star,
    Sparkles
} from "lucide-react";
import FinalCTA from "@/components/layout/FinalCTA";
import { useRef, useEffect } from "react";

// --- 3D Hero Components ---
function AboutHero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#052e16] text-white isolate">
            {/* Panoramic Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[#052e16]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0E552F20_1px,transparent_1px),linear-gradient(to_bottom,#0E552F20_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] opacity-40" />
            </div>

            <motion.div
                style={{ y: y1, opacity }}
                className="container mx-auto px-4 text-center z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-widest uppercase text-emerald-300 mb-8"
                >
                    <Sparkles className="w-3 h-3" />
                    <span>Est. 2004</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-7xl md:text-9xl font-bold tracking-tighter mb-8"
                >
                    The Architects<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-200">
                        of Trust.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl text-emerald-100/60 font-light max-w-3xl mx-auto leading-relaxed"
                >
                    For two decades, we have been the silent force behind Pakistan's financial compliance, empowering over 50,000 entities to operate with confidence.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
            >
                <div className="w-px h-12 bg-white" />
                <span className="text-[10px] uppercase tracking-widest">Our Legacy</span>
            </motion.div>
        </section>
    );
}

// --- Team Card with Holographic Effect ---
const TeamCard = ({ member, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative h-[450px] rounded-[2rem] overflow-hidden bg-white hover:bg-[#FAFAF9] transition-colors border border-gray-100 hover:border-emerald-500/20 shadow-xl shadow-gray-100/20"
        >
            {/* Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: useTransform(
                        [x, y],
                        ([latestX, latestY]) => `radial-gradient(600px circle at ${latestX}px ${latestY}px, rgba(14,85,47,0.05), transparent 40%)`
                    ),
                }}
            />

            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <div className="mb-auto">
                    {/* Role Tag */}
                    <span className="inline-block px-3 py-1 bg-[#052e16] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg mb-4">
                        {member.role}
                    </span>
                </div>

                <h3 className="text-3xl font-bold text-[#052e16] mb-2 leading-tight">{member.name}</h3>
                <p className="text-emerald-700 font-medium text-sm mb-4">{member.credentials}</p>
                <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-emerald-500/20 pl-4">
                    {member.bio}
                </p>
            </div>

            {/* Abstract Avatar Placeholder */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
            <div className="absolute top-8 right-8 text-9xl font-bold text-gray-50 opacity-10 select-none pointer-events-none">
                {member.initials}
            </div>
        </motion.div>
    );
};

// --- Values Section ---
const ValueItem = ({ icon: Icon, title, desc, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-start gap-6 group"
    >
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:border-emerald-500 transition-colors">
            <Icon className="w-6 h-6 text-[#0E552F]" />
        </div>
        <div>
            <h4 className="text-xl font-bold text-[#052e16] mb-2 group-hover:text-emerald-700 transition-colors">{title}</h4>
            <p className="text-gray-500 leading-relaxed font-light">{desc}</p>
        </div>
    </motion.div>
);

// --- DATA ---
const teamMembers = [
    {
        name: "Zaheer Ahmad Meer",
        role: "Chairman",
        credentials: "Corporate Lawyer",
        initials: "ZM",
        bio: "A visionary constitutional expert laying the foundation of legal integrity."
    },
    {
        name: "Omer Zaheer Meer",
        role: "CEO",
        credentials: "FCA | CFA | FCCA",
        initials: "OZ",
        bio: "20 years of financial leadership, bridging the gap between complexity and user experience."
    },
    {
        name: "Usman Zaheer Meer",
        role: "CTO",
        credentials: "Tech Leadership",
        initials: "UZ",
        bio: "The architect behind our military-grade security infrastructure."
    },
    {
        name: "Ali Zaheer Meer",
        role: "COO",
        credentials: "FCCA | ACA",
        initials: "AZ",
        bio: "Ensuring operational excellence and seamless client delivery across all verticals."
    },
];

const stats = [
    { label: "Years of Service", value: "20+" },
    { label: "Active Filers", value: "50k+" },
    { label: "Success Rate", value: "99.9%" },
    { label: "Tax Saved (PKR)", value: "5B+" },
];

export default function About() {
    return (
        <div className="bg-[#FAFAF9] min-h-screen">
            <AboutHero />

            {/* --- STORY SECTION --- */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">The Origin</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#052e16] mb-8 leading-tight">
                                Making the complex,<br />
                                <span className="text-emerald-600">invisible.</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                                <p>
                                    PAK Filer was born from a singular frustration: Why must tax compliance be an ordeal? In 2004, we saw a landscape cluttered with bureaucracy and confusion.
                                </p>
                                <p>
                                    We decided to change the narrative. By combining elite chartered accountancy with cutting-edge technology, we created a sanctuary for taxpayers.
                                </p>
                                <p>
                                    Today, we are not just a service provider; we are the standard-bearers of financial digital transformation in Pakistan.
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-emerald-50 hover:border-emerald-200 transition-colors text-center"
                                >
                                    <div className="text-4xl font-bold text-[#052e16] mb-2">{stat.value}</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VALUES PROTOCOL --- */}
            <section className="py-32 bg-[#052e16] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-emerald-300">Core Protocol</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Operating System</h2>
                        <p className="text-emerald-100/50 max-w-2xl mx-auto text-lg">
                            The fundamental principles that govern every decision, line of code, and client interaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                <Shield className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Uncompromising Security</h3>
                                <p className="text-emerald-100/60 leading-relaxed">
                                    We treat financial data with the same rigor as national secrets. Encryption and privacy are not features; they are the baseline.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                <Target className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Precision Engineering</h3>
                                <p className="text-emerald-100/60 leading-relaxed">
                                    Tax laws allow no margin for error. our automated systems and human review processes ensure distinct accuracy.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                <Globe className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Democratized Access</h3>
                                <p className="text-emerald-100/60 leading-relaxed">
                                    Elite financial advice shouldn't be reserved for corporations. We bring FCA-level expertise to the individual filer.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                <Briefcase className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Client Obsession</h3>
                                <p className="text-emerald-100/60 leading-relaxed">
                                    We don't just file forms; we defend your wealth. Your long-term financial health is our primary metric of success.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TEAM SECTION --- */}
            <section className="py-32 bg-[#FAFAF9]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Leadership</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#052e16]">The Architects</h2>
                        </div>
                        <p className="text-gray-500 max-w-md text-right hidden md:block">
                            Led by industry veterans with over 80 years of combined experience in law, finance, and technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, i) => (
                            <TeamCard key={member.name} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <FinalCTA />
        </div>
    );
}
