import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Step } from "@/hooks/useTaxFiling";

interface HolographicJourneyMapProps {
    steps: Step[];
    currentStepIndex: number;
    onStepClick: (stepIndex: number, subStepIndex?: number) => void;
}

export function HolographicJourneyMap({
    steps,
    currentStepIndex,
    onStepClick,
}: HolographicJourneyMapProps) {
    return (
        <div className="relative py-4 pl-4 pr-2">
            {/* Connecting Line - Neon Laser Stream */}
            <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-white/5 -z-10 overflow-hidden">
                <motion.div
                    className="w-full h-full bg-gradient-to-b from-transparent via-[#FCD34D]/50 to-transparent"
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Active Line Progress (Animated) - Golden Beam */}
            <motion.div
                className="absolute left-[26px] top-4 w-[3px] bg-gradient-to-b from-[#FCD34D] via-[#FCD34D] to-transparent -z-10 origin-top shadow-[0_0_15px_#FCD34D]"
                initial={{ height: "0%" }}
                animate={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <div className="absolute bottom-0 -left-1 w-3 h-6 bg-[#FCD34D] blur-md rounded-full" />
            </motion.div>

            <div className="space-y-6">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex || step.completed;
                    const isCurrent = index === currentStepIndex;
                    const isUpcoming = index > currentStepIndex;

                    return (
                        <motion.div
                            key={step.id}
                            className={cn("relative group flex items-center gap-6 cursor-pointer py-2")}
                            onClick={() => onStepClick(index)}
                            initial={false}
                            animate={isCurrent ? { x: 10, scale: 1.05 } : { x: 0, scale: 1 }}
                        >
                            {/* Node */}
                            <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-14 h-14">
                                {/* Active Rotating Ring */}
                                {isCurrent && (
                                    <motion.div
                                        className="absolute inset-0 border-2 border-[#FCD34D] rounded-full border-dashed"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    />
                                )}

                                {/* Core Node */}
                                <motion.div
                                    className={cn(
                                        "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500",
                                        isCompleted ? "bg-[#4ade80] shadow-[0_0_10px_#4ade80]" : "",
                                        isCurrent ? "w-3 h-3 bg-[#FCD34D] shadow-[0_0_15px_#FCD34D]" : "",
                                        isUpcoming ? "w-2 h-2 bg-white/20" : ""
                                    )}
                                >
                                    {isCompleted && <Check className="w-2.5 h-2.5 text-black" strokeWidth={4} />}
                                </motion.div>

                                {/* Ripple for Active */}
                                {isCurrent && (
                                    <div className="absolute inset-0 rounded-full border border-[#FCD34D]/30 animate-ping" />
                                )}
                            </div>

                            {/* Label */}
                            <div className={cn(
                                "transition-all duration-300 flex-1",
                                isCurrent ? "opacity-100" : "opacity-60 group-hover:opacity-90"
                            )}>
                                <p className={cn(
                                    "text-sm leading-none tracking-wide",
                                    isCurrent ? "text-xl font-black text-[#FCD34D] drop-shadow-[0_0_10px_rgba(252,211,77,0.5)]" : "font-medium text-white",
                                    isCompleted ? "text-[#4ade80] font-bold" : ""
                                )}>
                                    {step.title}
                                </p>
                                {isCurrent && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="text-[10px] text-[#FCD34D]/80 mt-1 uppercase tracking-widest font-bold"
                                    >
                                        Processing...
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div >
    );
}
