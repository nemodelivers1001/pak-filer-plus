import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glareColor?: string;
}

export const TiltCard = ({
    children,
    className,
    glareColor = "rgba(255, 255, 255, 0.4)"
}: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Glare effect movement
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
    const glareOpacity = useTransform(mouseX, [-0.5, 0.5], [0, 0.6]); // Only show glare when interacting

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn("relative transition-transform duration-200 ease-out will-change-transform", className)}
        >
            {/* Content */}
            <div
                style={{ transform: "translateZ(30px)" }}
                className="h-full"
            >
                {children}
            </div>

            {/* Holo/Glare Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-[inherit] z-20"
                style={{
                    background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 50%)`,
                    opacity: glareOpacity,
                    mixBlendMode: "overlay",
                }}
            />
        </motion.div>
    );
};
