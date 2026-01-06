import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StatsSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={containerRef} className="bg-[#021f0e] py-40 text-white relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0E552F] via-[#052e16] to-black opacity-40" />
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    style={{ y: yParallax }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-[15px] md:text-xl font-medium tracking-[0.2em] uppercase text-emerald-400 mb-8 border border-emerald-500/20 inline-block px-6 py-2 rounded-full backdrop-blur-md">
                            Trusted Across Pakistan
                        </h2>
                    </motion.div>

                    <div className="relative">
                        <motion.h3
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 0.1, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="text-[20vw] font-bold leading-none text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none"
                        >
                            TRUSTED
                        </motion.h3>

                        <div className="relative z-10 py-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", duration: 1.5, bounce: 0.3 }}
                                className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-emerald-100 to-emerald-900 tracking-tighter"
                            >
                                50k+
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-2xl md:text-3xl text-emerald-100/60 font-light mt-4"
                            >
                                Active Filers & Businesses
                            </motion.p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/10 pt-16">
                        {[
                            { label: "Tax Info Secured", value: "100%" },
                            { label: "Cities Covered", value: "125+" },
                            { label: "Support Rating", value: "4.9/5" },
                            { label: "Data Encryption", value: "256-bit" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-emerald-100/40 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
