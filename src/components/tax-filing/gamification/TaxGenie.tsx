import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import genieAvatar from '@/assets/pf-logo.png'; // Using logo as base for now, can be replaced

interface TaxGenieProps {
    message?: string;
    variant?: 'idle' | 'speaking' | 'celebrating';
}

export function TaxGenie({ message: propsMessage, variant = 'idle' }: TaxGenieProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [message, setMessage] = useState(propsMessage);

    const [displayedMessage, setDisplayedMessage] = useState("");

    useEffect(() => {
        if (propsMessage) {
            setIsOpen(true);
            setMessage(propsMessage);
            setDisplayedMessage("");

            let i = 0;
            const timer = setInterval(() => {
                if (i < propsMessage.length) {
                    setDisplayedMessage((prev) => prev + propsMessage.charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 30); // Typing speed

            return () => clearInterval(timer);
        }
    }, [propsMessage]);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex items-end flex-col gap-4">
            {/* Speech Bubble */}
            <AnimatePresence>
                {isOpen && message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="bg-white text-black p-4 rounded-2xl rounded-tr-none shadow-xl max-w-xs relative mb-2 dark:bg-zinc-100"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-2 -left-2 bg-muted p-1 rounded-full hover:bg-muted/80"
                        >
                            <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                        <p className="text-sm font-medium leading-relaxed">
                            {displayedMessage}
                            {displayedMessage.length < (message?.length || 0) && <span className="animate-pulse">|</span>}
                        </p>
                        {/* Tail */}
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-zinc-100 transform rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Genie Avatar */}
            <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                animate={variant === 'celebrating' ? {
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                } : {
                    y: [0, -5, 0],
                }}
                transition={variant === 'celebrating' ? {
                    duration: 0.5,
                    repeat: Infinity,
                } : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className={cn(
                    "w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1 shadow-lg shadow-primary/30",
                    variant === 'speaking' && "ring-4 ring-primary/20"
                )}>
                    <div className="w-full h-full rounded-full bg-background overflow-hidden flex items-center justify-center relative">
                        <img src={genieAvatar} alt="Tax Genie" className="w-10 h-10 object-contain" />

                        {/* Sparkles effect */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="absolute top-1 right-2 w-3 h-3 text-yellow-400" />
                        </motion.div>
                    </div>
                </div>

                {/* Status indicator */}
                <div className="absolute -top-1 -right-1">
                    <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
