import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Shield, FileText, CheckCircle, Smartphone } from "lucide-react";

/* --- 3D Tilt Wrapper --- */
function TiltCard({ children, className, depth = 1 }: { children: React.ReactNode, className?: string, depth?: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = event.clientX - rect.left;
        const mouseYVal = event.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7 * depth, -7 * depth]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7 * depth, 7 * depth]);

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function BentoGrid() {
    return (
        <section className="py-32 bg-[#FAFAF9] relative overflow-hidden">
            {/* 3D Floating Particles Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-emerald-500/10 rounded-full"
                        style={{
                            width: Math.random() * 200 + 50,
                            height: Math.random() * 200 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-24 relative"
                >
                    <div className="absolute -left-10 -top-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0E552F] mb-8 relative z-10">
                        Tax filing, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E552F] via-emerald-600 to-emerald-400">
                            reimagined in 3D.
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 font-light leading-relaxed max-w-lg">
                        Experience the future of finance. Interactive, secure, and beautifully designed.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 h-auto md:h-[800px] perspective-2000">

                    {/* Card 1: Lightning Fast - Layered Parallax */}
                    <div className="md:col-span-4 md:row-span-2 relative group z-20">
                        <TiltCard className="h-full" depth={2}>
                            <div className="h-full rounded-[2.5rem] bg-white border border-white/40 shadow-xl overflow-hidden relative flex flex-col justify-between p-10 backdrop-blur-sm">
                                {/* Glass Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/20 to-transparent opacity-50 pointer-events-none z-50" />

                                <div className="relative z-10 transform translate-z-20">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0E552F] to-emerald-600 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
                                        <Zap className="w-8 h-8 text-white fill-white" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-[#0E552F] mb-4">Lightning Fast</h3>
                                    <p className="text-gray-500 text-lg max-w-sm">
                                        Intelligent automation that feels like magic.
                                    </p>
                                </div>

                                {/* Floating UI Layers */}
                                <div className="absolute right-[-5%] bottom-[-5%] w-[65%] h-[60%] perspective-1000">
                                    {/* Base Layer */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] to-white rounded-tl-3xl shadow-2xl border border-emerald-100 p-6"
                                        style={{ transform: "translateZ(0px)" }}
                                    >
                                        {/* Layer 2: Floating Elements */}
                                        <motion.div
                                            className="absolute top-10 right-10 left-10 h-24 bg-white rounded-xl shadow-lg border border-emerald-50/50 flex items-center px-4"
                                            style={{ transform: "translateZ(40px)" }}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                                <CheckCircle className="w-5 h-5 text-[#0E552F]" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                                                <div className="h-2 w-1/2 bg-gray-50 rounded-full" />
                                            </div>
                                        </motion.div>

                                        {/* Layer 3: Floating Button */}
                                        <motion.div
                                            className="absolute bottom-10 right-10 w-16 h-16 bg-[#0E552F] rounded-full shadow-2xl flex items-center justify-center"
                                            style={{ transform: "translateZ(80px)" }}
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <Zap className="w-8 h-8 text-white fill-white" />
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                    {/* Card 2: Security - Scanning Effect */}
                    <div className="md:col-span-2 relative group z-10">
                        <TiltCard className="h-full" depth={1.5}>
                            <div className="h-full rounded-[2.5rem] bg-[#0E552F] border border-emerald-400/20 shadow-2xl overflow-hidden relative p-8 flex flex-col justify-center">
                                {/* Grid Layout Background */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                                {/* Scanning Line */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50 z-20"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                />

                                <div className="relative z-30 transform translate-z-30 text-center">
                                    <div className="inline-flex relative mb-6">
                                        <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-40 animate-pulse" />
                                        <Shield className="w-14 h-14 text-white relative z-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Bank-Grade</h3>
                                    <p className="text-emerald-100/70 text-sm">256-bit AES Encryption</p>
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                    {/* Card 3: Integration - Data Flow */}
                    <div className="md:col-span-2 relative group z-10">
                        <TiltCard className="h-full" depth={1.5}>
                            <div className="h-full rounded-[2.5rem] bg-white border border-gray-200 shadow-xl overflow-hidden relative p-8 flex flex-col justify-center group-hover:border-emerald-500/50 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-transparent opacity-50" />

                                <div className="relative z-30 flex flex-col items-center text-center">
                                    {/* Data Flow Animation */}
                                    <div className="flex items-center gap-4 mb-6 relative">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center z-10">
                                            <FileText className="w-6 h-6 text-gray-400" />
                                        </div>

                                        {/* Connection Line with Particles */}
                                        <div className="w-20 h-1 bg-gray-100 rounded-full relative overflow-hidden">
                                            <motion.div
                                                className="absolute top-0 left-0 w-8 h-full bg-emerald-500 rounded-full blur-[2px]"
                                                animate={{ x: [-32, 80] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            />
                                        </div>

                                        <div className="w-12 h-12 bg-[#0E552F] rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center z-10">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#0E552F] mb-2">FBR Sync</h3>
                                    <p className="text-gray-500 text-sm">Real-time Verified</p>
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                </div>
            </div>
        </section>
    );
}
