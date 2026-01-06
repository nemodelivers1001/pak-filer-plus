import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, FileText, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";
import TextRotator from "./TextRotator";
import LiquidButton from "./LiquidButton";

/* --- 3D Tilt Card Component --- */
function TiltCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set((mouseX - width / 2) / 2); // dampening
        y.set((mouseY - height / 2) / 2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-sm mx-auto perspective-1000 cursor-pointer"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#82A492] to-[#45745B] rounded-3xl blur-[60px] opacity-40 animate-pulse pointer-events-none" />

            {/* Main Glass Card */}
            <div className="relative z-20 bg-white/5 backdrop-blur-2xl border-prism p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[320px] flex flex-col justify-between overflow-hidden group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-shadow duration-500">

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between mb-8 pointer-events-none">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0E552F] flex items-center justify-center shadow-lg border border-white/10">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-white/60 font-medium">Income Tax Return</p>
                            <p className="text-sm text-white font-bold">2024 - 2025</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[#0E552F]/80 border border-[#82A492]/30 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-bold text-white tracking-wide uppercase">Active</span>
                    </div>
                </div>

                {/* Dynamic Content Simulation */}
                <div className="space-y-4 pointer-events-none">
                    {/* Progress Item 1 */}
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-white/70">Source of Income</span>
                            <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-green-400 to-[#82A492]"
                            />
                        </div>
                    </div>

                    {/* Progress Item 2 */}
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-white/70">Tax Calculation</span>
                            <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-green-400 to-[#82A492]"
                            />
                        </div>
                    </div>
                </div>

                {/* Card Footer - Status */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between pointer-events-none">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50">Filing Status</span>
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                            Verified & Compliant <Shield className="w-3 h-3 text-green-400" />
                        </span>
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-8 h-8 rounded-full bg-[#0E552F] flex items-center justify-center border border-white/20"
                    >
                        <Check className="w-4 h-4 text-white" />
                    </motion.div>
                </div>
            </div>

            {/* Floating Elements behind card */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-30 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 pointer-events-none"
            >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#0E552F]">
                    <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 font-bold">Tax Saved</p>
                    <p className="text-sm font-bold text-[#0E552F]">Rs 25,000</p>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 z-30 bg-[#0E552F] p-3 rounded-2xl shadow-xl border border-white/20 text-white pointer-events-none"
            >
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold">FBR Submitted</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* --- Main Hero Section --- */
export default function HeroSection() {
    const { scrollY } = useScroll();
    const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            // Set CSS variables for spotlight effect
            const hero = document.getElementById('hero-section');
            if (hero) {
                const rect = hero.getBoundingClientRect();
                const x = ((clientX - rect.left) / rect.width) * 100;
                const y = ((clientY - rect.top) / rect.height) * 100;
                hero.style.setProperty('--mouse-x', `${x}%`);
                hero.style.setProperty('--mouse-y', `${y}%`);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            id="hero-section"
            className="relative min-h-[110vh] w-full overflow-hidden bg-[#0a3f23] text-white isolate bg-noise spotlight-hero group"
        >
            {/* 1. Cinematic Background Layers */}
            <motion.div style={{ y: yBackground }} className="absolute inset-0 -z-10 bg-gradient-to-b from-[#052e16] via-[#0E552F] to-[#052e16]">

                {/* 3D Grid Floor - Fades into horizon */}
                <div className="absolute inset-0 opacity-30 grid-floor mix-blend-overlay pointer-events-none" />

                {/* Ambient Aurora Orbs (Subtle) */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#45745B] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#82A492] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />

                {/* Floating Particles (Fireflies) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/40 rounded-full animate-particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                '--duration': `${15 + Math.random() * 20}s`,
                                '--delay': `${Math.random() * 5}s`
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            </motion.div>

            {/* 2. Main Content */}
            <motion.div
                style={{ opacity: opacityHero }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20 lg:pt-48"
            >
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Editorial Content */}
                    <div className="text-center lg:text-left">
                        {/* Elite Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-widest uppercase text-green-300 mb-8 mx-auto lg:mx-0 shadow-[0_0_20px_rgba(130,164,146,0.3)]"
                        >
                            <Star className="w-3 h-3 fill-green-300" />
                            <span>Premium Tax Suite</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-glow"
                        >
                            <span className="block text-white/40 font-light tracking-normal text-5xl lg:text-6xl mb-2">Master Your</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-100 to-green-300">
                                Finances.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl text-green-50/70 mb-12 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
                        >
                            The most authoritative platform for tax filing in Pakistan.
                            Engineered for precision, security, and absolute peace of mind.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                        >
                            <Link to="/auth">
                                <LiquidButton>
                                    Start Premium Filing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </LiquidButton>
                            </Link>
                            <Link to="/how-it-works" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                                <span className="border-b border-transparent group-hover:border-white/40 pb-0.5">View Documentation</span>
                            </Link>
                        </motion.div>

                        {/* Social Proof Mini */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-white/30 uppercase tracking-widest"
                        >
                            <span>FBR Integrated</span>
                            <span>AES-256 Encryption</span>
                            <span>ISO 27001 Certified</span>
                        </motion.div>
                    </div>

                    {/* Right: The Artifact (Card) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.3 }}
                        className="relative hidden lg:block perspective-1000"
                    >
                        {/* Ambient Glow behind card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-500/20 to-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

                        <TiltCard />
                    </motion.div>

                </div>
            </motion.div>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,30,20,0.8)_100%)] mix-blend-multiply" />
        </div>
    );
}
