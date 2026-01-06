import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HeroSectionImp from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import StatsSection from "@/components/landing/StatsSection";
import FinalCTA from "@/components/layout/FinalCTA";

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="bg-white">
            {/* Imported Hero Component will be rendered by the router/page wrapper, 
          but here we define the subsequent sections. 
          Actually, Home.tsx renders everything. */}

            {/* We need to import HeroSection here */}
            <HeroSectionImp />

            {/* Feature Showcase - Premium Interactive 3D */}
            <FeatureShowcase />

            {/* Stats Section with Scroll Reveal */}
            <StatsSection />

            {/* Call to Action - Mind Blowing 3D Tunnel */}
            <FinalCTA />

        </div>
    );
}


