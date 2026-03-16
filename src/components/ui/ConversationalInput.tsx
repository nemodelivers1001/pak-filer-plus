import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HelpCircle, AlertCircle } from 'lucide-react';
import { GradientButton } from './GradientButton';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConversationalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    variant?: 'default' | 'ghost';
}

export const ConversationalInput = React.forwardRef<HTMLInputElement, ConversationalInputProps>(
    ({ className, label, error, hint, startAdornment, endAdornment, variant = 'default', ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const hasValue = props.value !== undefined && props.value !== '';

        const wrapperClasses = variant === 'default'
            ? cn(
                "relative rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-background/40 backdrop-blur-md",
                isFocused ? "border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]" : "border-border hover:border-primary/50",
                error ? "border-destructive/50" : ""
            )
            : cn(
                "relative rounded-xl transition-all duration-300 overflow-hidden",
                isFocused ? "" : "",
                error ? "" : ""
            );

        return (
            <div className="w-full relative group">
                <motion.div
                    layout
                    className={wrapperClasses}
                >
                    {/* Label Area */}
                    <div className="px-5 pt-3 pb-1">
                        <label className={cn(
                            "block uppercase tracking-wider text-[10px] font-bold transition-all duration-200 flex items-center gap-2",
                            isFocused ? "text-primary" : "text-muted-foreground/60"
                        )}>
                            {label}
                            {hint && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="h-3 w-3 cursor-help text-muted-foreground/50 hover:text-primary transition-colors" />
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs p-3 font-normal text-sm">
                                            <p>{hint}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </label>
                    </div>

                    {/* Input Area */}
                    <div className="px-5 pb-4 flex items-center gap-3">
                        {startAdornment && <div className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{startAdornment}</div>}

                        <input
                            ref={ref}
                            className={cn(
                                "flex-1 bg-transparent border-none outline-none text-lg sm:text-lg font-medium tracking-tight text-foreground placeholder:text-muted-foreground/30 placeholder:font-normal",
                                className
                            )}
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e);
                            }}
                            {...props}
                        />

                        {endAdornment && <div className="text-sm font-medium text-muted-foreground">{endAdornment}</div>}
                    </div>

                    {/* Animated Highlight Line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: isFocused ? "100%" : "0%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -bottom-6 left-4 flex items-center gap-1 text-xs text-destructive font-medium"
                        >
                            <AlertCircle className="h-3 w-3" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

ConversationalInput.displayName = "ConversationalInput";
