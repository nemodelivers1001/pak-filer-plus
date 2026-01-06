import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface CTABannerProps {
    title: string;
    subtitle?: string;
    primaryCTA?: {
        label: string;
        href: string;
    };
    secondaryCTA?: {
        label: string;
        href: string;
    };
}

export default function CTABanner({
    title,
    subtitle,
    primaryCTA = { label: "Get Started Free", href: "/auth" },
    secondaryCTA,
}: CTABannerProps) {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary" />

            {/* Decorative Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/30 rounded-full"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/20 rounded-full"
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/25 rounded-full"
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                >
                    {title}
                </motion.h2>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10"
                    >
                        {subtitle}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to={primaryCTA.href}>
                        <Button
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-xl group"
                        >
                            {primaryCTA.label}
                            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    {secondaryCTA && (
                        <Link to={secondaryCTA.href}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/50 text-white hover:bg-white/10 text-lg px-8 py-6"
                            >
                                {secondaryCTA.label}
                            </Button>
                        </Link>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
