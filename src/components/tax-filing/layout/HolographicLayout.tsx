import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/animations";
import logo from "@/assets/pf-logo.png";

interface HolographicLayoutProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    genie?: React.ReactNode;
    title: string;
    progress: number;
    activeStepId?: string; // Trigger for scrolling
}

export function HolographicLayout({
    children,
    sidebar,
    genie,
    title,
    progress,
    activeStepId,
}: HolographicLayoutProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to top when step changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [activeStepId]);

    return (
        <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-[#020b06] font-sans text-white selection:bg-[#FCD34D] selection:text-[#0E552F]">
            {/* 1. Deep Emerald Brand Background (Tax Calculator Style) - Fixed Coverage */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0E552F] via-[#09331c] to-[#051a0f]">
                {/* Animated Radial Orbs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.15)_0%,transparent_70%)] opacity-80 pointer-events-none" />

                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
            </div>

            {/* 2. Glass Overlay for depth - Adjusted for Dark Mode Contrast */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black/10 via-transparent to-white/5 pointer-events-none" />

            {/* 3. Main Content Grid */}
            <div className="relative z-10 flex h-full w-full p-4 gap-6">

                {/* Left Console: Navigation & Genie - Floating & Open */}
                <motion.aside
                    className="hidden lg:flex w-72 flex-col gap-6 relative z-20"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    {/* Brand / Header - Floating Emblem */}
                    <div className="h-16 flex items-center px-2">
                        <div className="relative group cursor-pointer flex items-center gap-3">
                            <img
                                src={logo}
                                alt="PakFiler Logo"
                                className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">PakFiler<span className="text-[#FCD34D] text-3xl">.</span></span>
                        </div>
                    </div>

                    {/* Navigation Map - Open Timeline */}
                    <div className="flex-1 relative flex flex-col overflow-hidden">
                        {/* Subtle track line backing */}
                        <div className="absolute left-[42px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent z-0" />

                        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10 pt-4">
                            {sidebar}
                        </div>
                    </div>


                </motion.aside>

                {/* Center Console: Main Workspace */}
                <main className="flex-1 flex flex-col min-w-0">
                    {/* Top Bar: Cinematic HUD Header */}
                    <motion.header
                        className="mb-8 flex items-end justify-between px-2 relative py-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Title Section - Big & Bold */}
                        <div className="flex flex-col">
                            <h1 className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                                {title}
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="h-1 w-12 bg-[#FCD34D] rounded-full" />
                                <span className="text-sm font-medium text-[#FCD34D] uppercase tracking-[0.2em]">Secure Tax Filing</span>
                            </div>
                        </div>

                        {/* Floating Progress: The Orbital Gauge */}
                        <div className="absolute top-2 right-2 flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <span className="block text-[10px] font-bold text-[#FCD34D] uppercase tracking-widest mb-1">Status</span>
                                <span className="block text-xs font-medium text-white/60 tracking-wider">In Progress</span>
                            </div>

                            {/* Circular Progress SVG */}
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                {/* Glow Container */}
                                <div className="absolute inset-0 bg-[#FCD34D]/20 blur-xl rounded-full opacity-50" />

                                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                                    {/* Track */}
                                    <path
                                        className="text-white/10"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    {/* Progress */}
                                    <motion.path
                                        className="text-[#FCD34D] drop-shadow-[0_0_4px_rgba(252,211,77,0.8)]"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeDasharray="100, 100"
                                        initial={{ strokeDashoffset: 100 }}
                                        animate={{ strokeDashoffset: 100 - progress }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        strokeLinecap="round"
                                    />
                                </svg>

                                {/* Percentage Text */}
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-sm font-black text-white">{Math.round(progress)}<span className="text-[10px]">%</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative HUD Line */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#FCD34D] via-white/20 to-transparent opacity-50" />
                    </motion.header>

                    {/* Form Workspace - Floating & Spacious */}
                    <div className="flex-1 relative min-h-0 group/workspace"> {/* min-h-0 is crucial for flex child scrolling! */}

                        {/* 2. Tech Grid Atmosphere */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020b06] via-transparent to-[#020b06] opacity-80 pointer-events-none z-0" />

                        <div className="h-full rounded-2xl border border-white/5 shadow-inner bg-transparent overflow-hidden flex flex-col relative z-10">
                            {/* Scroll Container - Takes full width so scrollbar is on the edge */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto w-full scrollbar-premium"
                            >
                                {/* Centered Content Wrapper */}
                                <div className="p-4 lg:p-8 pb-32 max-w-6xl mx-auto">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}
