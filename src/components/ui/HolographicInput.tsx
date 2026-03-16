import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

interface HolographicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    success?: boolean;
    containerClassName?: string;
    icon?: React.ReactNode;
}

export const HolographicInput = React.forwardRef<HTMLInputElement, HolographicInputProps>(
    ({ className, label, error, success, containerClassName, icon, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            props.onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            // Prevent negative values for number inputs
            if (props.type === 'number' && parseFloat(value) < 0) {
                return;
            }

            setHasValue(!!value);
            props.onChange?.(e);
        };

        return (
            <div className={cn("relative group mb-6", containerClassName)}>
                {/* Holographic Container - Tall Capsule Design */}
                <motion.div
                    className={cn(
                        "relative flex items-center w-full transition-all duration-300 group/input h-20", // Tall Capsule
                        "bg-[#020b06]/60 backdrop-blur-md", // Deep Emerald/Black Tint - Stronger contrast
                        "border-2",
                        "rounded-[2rem]", // Capsule shape
                        "shadow-[0_4px_20px_rgba(0,0,0,0.2)]", // Floating shadow
                        isFocused ? "border-[#FCD34D] shadow-[0_0_25px_rgba(252,211,77,0.25)] bg-black/80 z-50" : "border-white/10 hover:border-[#FCD34D]/50 hover:bg-black/50 hover:shadow-lg z-0", // Gold focus + Z-index boost
                        hasValue ? "border-[#FCD34D]/50 bg-black/50" : "", // Gold tint if filled
                        error ? "border-red-500/50" : "",
                        success ? "border-[#4ade80]/50 bg-[#4ade80]/5" : ""
                    )}
                    initial={false}
                    animate={isFocused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
                >
                    <div className="flex items-center px-6 h-full">
                        {/* Icon - Render directly to avoid cloneElement crashes */}
                        {icon && (
                            <div className={cn(
                                "mr-4 transition-colors duration-300 [&>svg]:w-6 [&>svg]:h-6", // Force size via CSS
                                isFocused ? "text-[#FCD34D]" : "text-white/30"
                            )}>
                                {icon}
                            </div>
                        )}

                        {/* Text Container (Column: Label Top, Input Bottom) */}
                        <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
                            {/* Label - Always visible, small, gold when active */}
                            <label
                                className={cn(
                                    "text-xs font-bold tracking-widest uppercase transition-colors duration-300 truncate",
                                    isFocused ? "text-[#FCD34D]" : "text-white/40"
                                )}
                            >
                                {label}
                            </label>

                            {/* Input Field - Large, Clear */}
                            <input
                                ref={ref}
                                {...props}
                                className={cn(
                                    "w-full bg-transparent border-none outline-none text-white placeholder-white/10 min-w-0",
                                    "text-lg font-medium font-sans h-8 p-0 m-0", // Adjusted for compact spacing
                                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", // Remove spinners
                                    className
                                )}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Status Icons */}
                        <AnimatePresence>
                            {(success || error) && (
                                <div className="ml-3 flex items-center justify-center shrink-0">
                                    {success && !error && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            className="bg-[#4ade80]/20 p-1.5 rounded-full"
                                        >
                                            <Check className="w-4 h-4 text-[#4ade80]" strokeWidth={3} />
                                        </motion.div>
                                    )}
                                    {error && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            className="bg-red-500/20 p-1.5 rounded-full"
                                        >
                                            <AlertCircle className="w-4 h-4 text-red-500" strokeWidth={3} />
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Active Indicator Bar (Bottom) */}
                    <div className={cn(
                        "absolute bottom-0 left-0 w-full h-[3px] transition-all duration-500",
                        isFocused ? "bg-gradient-to-r from-transparent via-[#FCD34D] to-transparent opacity-100" : "opacity-0"
                    )} />
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute -bottom-6 left-6 text-xs text-red-400 font-medium"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);
HolographicInput.displayName = "HolographicInput";
