import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeroProps {
    title: React.ReactNode;
    subtitle: string;
    primaryCTA?: {
        label: string;
        href: string;
    };
    secondaryCTA?: {
        label: string;
        href: string;
    };
}

export default function PageHero({ title, subtitle, primaryCTA, secondaryCTA }: PageHeroProps) {
    const { scrollY } = useScroll();
    const yBackground = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0a3f23] text-white isolate">
            {/* Background Effects */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 -z-10"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0E552F] to-[#08331d]" />

                {/* Simplified Aurora Orbs */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#45745B] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#82A492] rounded-full mix-blend-screen filter blur-[100px] opacity-10" />

                {/* Grain Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay pointer-events-none" />
            </motion.div>

            <motion.div
                style={{ opacity: opacityHero }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
            >
                {/* Content */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg sm:text-xl text-green-50/80 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                {/* CTAs */}
                {(primaryCTA || secondaryCTA) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        {primaryCTA && (
                            <Link to={primaryCTA.href}>
                                <Button size="lg" className="bg-[#45745B] hover:bg-[#3d6650] text-white rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all">
                                    {primaryCTA.label}
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        )}
                        {secondaryCTA && (
                            <Link to={secondaryCTA.href}>
                                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12">
                                    {secondaryCTA.label}
                                </Button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </motion.div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-background to-transparent pointer-events-none z-20" />
        </div>
    );
}
