import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = ["Accuracy", "Confidence", "Speed", "Security"];

export default function TextRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative inline-block h-[1.1em] overflow-hidden align-bottom min-w-[5ch]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: "100%", filter: "blur(10px)", opacity: 0 }}
                    animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                    exit={{ y: "-100%", filter: "blur(10px)", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-0 top-0 block bg-gradient-to-r from-[#C5DACF] to-white bg-clip-text text-transparent"
                >
                    {words[index]}.
                </motion.span>
            </AnimatePresence>
            <span className="invisible">{words[0]}.</span> {/* Spacer */}
        </div>
    );
}
