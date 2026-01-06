import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpLeft, Hexagon, ShieldCheck, Banknote } from "lucide-react";
import { useRef } from "react";

export default function FinalCTA() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#FAFAF9] isolate">
            {/* Background Architecture - Matches FeatureShowcase */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Light Ambient Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-[#FAFAF9]" />

                {/* 3D Grid Floor Effect - Subtle Light Theme */}
                <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-[linear-gradient(to_right,#0E552F08_1px,transparent_1px),linear-gradient(to_bottom,#0E552F08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_top,black,transparent)] perspective-[1000px] rotate-x-60 origin-bottom" />

                {/* Floating Elements - 3D Icons instead of simple particles */}
                <motion.div style={{ y: y1, rotate }} className="absolute top-[20%] left-[15%] text-emerald-100 opacity-80">
                    <Hexagon className="w-32 h-32 fill-emerald-50/50" />
                </motion.div>
                <motion.div style={{ y: y2, rotate: useTransform(scrollYProgress, [0, 1], [0, -45]) }} className="absolute bottom-[20%] right-[15%] text-amber-100 opacity-80">
                    <ShieldCheck className="w-40 h-40 fill-amber-50/50" />
                </motion.div>

                {/* Soft Blobs */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-50/40 rounded-full blur-[120px] mix-blend-multiply" />
            </div>

            {/* Content Core */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div className="relative z-10">
                    {/* Parallax Background Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-[-1] pointer-events-none overflow-hidden select-none">
                        <motion.h2
                            style={{ x: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                            className="text-[12rem] md:text-[20rem] font-bold tracking-tighter text-emerald-900/[0.03] whitespace-nowrap"
                        >
                            MAKE IT COUNT
                        </motion.h2>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#0E552F] mb-8 leading-[0.9]">
                                Your financial legacy <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E552F] via-emerald-600 to-amber-600">
                                    starts here.
                                </span>
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                                Join over 50,000 Pakistanis who found peace of mind with the country's most intelligent tax engine.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <Link to="/auth" className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#0E552F] rounded-full overflow-hidden hover:scale-105 hover:shadow-[0_20px_40px_rgba(14,85,47,0.3)] transition-all duration-300">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative flex items-center gap-3">
                                    Start Filing Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <Link to="/pricing" className="text-[#0E552F] hover:text-emerald-700 transition-colors flex items-center gap-2 text-lg font-medium group">
                                View Pricing Plans
                                <div className="w-10 h-10 rounded-full bg-emerald-100/50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                                    <ArrowUpLeft className="w-5 h-5 rotate-45 text-[#0E552F]" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
