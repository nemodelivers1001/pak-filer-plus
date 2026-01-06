import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UnifiedBackgroundProps {
    watermark?: string;
    variant?: "light" | "dark";
}

export const UnifiedBackground = ({ watermark = "PAK FILER", variant = "light" }: UnifiedBackgroundProps) => {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none bg-[#052e16]">
            {/* 1. Base Gradient */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br transition-colors duration-500",
                variant === "dark"
                    ? "from-[#052e16] via-[#0E552F] to-[#052e16]"
                    : "from-[#f8fcfa] via-[#f0f7f3] to-[#e8f0eb]"
            )} />

            {/* 2. Global Texture */}
            <div className="noise-bg absolute inset-0 opacity-30" />

            {/* 3. Topographic Pattern */}
            <div className="topographic-bg absolute inset-0 opacity-[0.4]" />

            {/* 4. Ambient Orbs - The "Emerald Mist" System */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[#0E552F]/10 rounded-full blur-[120px]"
            />

            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-[#F59E0B]/5 rounded-full blur-[100px]"
            />

            <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-[#45745B]/10 rounded-full blur-[80px]" />

            {/* 5. Giant Watermark */}
            <div className="absolute top-20 right-0 -mr-20 lg:text-[200px] text-[100px] font-black text-[#0E552F]/[0.02] leading-none select-none pointer-events-none overflow-hidden hidden md:block">
                {watermark}
            </div>
        </div>
    );
};
