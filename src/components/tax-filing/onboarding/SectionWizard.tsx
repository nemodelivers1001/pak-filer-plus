import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { SubStep } from '@/hooks/useTaxFiling';
import { GradientButton } from '@/components/ui/GradientButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import {
    Banknote,
    Building,
    Briefcase,
    Tractor,
    Home,
    TrendingUp,
    Percent,
    Gift,
    MoreHorizontal,
    Car,
    PiggyBank,
    Plane,
    Coins,
    CreditCard,
    Landmark,
    Shield,
    Smartphone
} from 'lucide-react';

interface SectionWizardProps {
    title: string;
    description?: string;
    options: SubStep[];
    onComplete: (selectedIds: string[]) => void;
    onPrevious?: () => void;
    canGoPrevious?: boolean;
}

// Map IDs to specific icons for visual flair
const iconMap: Record<string, React.ElementType> = {
    // Income
    'salary': Briefcase,
    'pension': PiggyBank,
    'agriculture': Tractor,
    'commission': TrendingUp,
    'rent-property': Home,
    'profit-savings': Percent,
    'dividend': Banknote,
    'bonus': Gift,
    'other-income': MoreHorizontal,

    // Wealth
    'net-worth': Landmark,
    'property': Building,
    'vehicles': Car,
    'bank-accounts': CreditCard,
    'insurance': Shield,
    'other-assets': Coins,
    'cash-balance': Banknote,
    'foreign-assets': Plane,
    'possessions': Smartphone,
    'bank-loan': Landmark,
    'other-liabilities': MoreHorizontal,
};

export function SectionWizard({ title, description, options, onComplete, ...props }: SectionWizardProps) {
    // Filter out the wizard itself from options if somehow passed
    const selectableOptions = options.filter(opt => !opt.isWizard);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleOption = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleContinue = () => {
        onComplete(selectedIds);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                    {title}
                </motion.h1>
                {description && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/50 max-w-lg mx-auto leading-relaxed"
                    >
                        {description}
                    </motion.p>
                )}
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2"
            >
                {selectableOptions.map((option) => {
                    const Icon = iconMap[option.id] || Banknote; // Fallback icon
                    const isSelected = selectedIds.includes(option.id);

                    return (
                        <motion.div
                            key={option.id}
                            variants={item}
                            onClick={() => toggleOption(option.id)}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "relative group cursor-pointer overflow-hidden rounded-2xl border p-6 flex flex-col items-center justify-center transition-all duration-500",
                                "backdrop-blur-sm min-h-[160px]", // Added min-height constraint
                                isSelected
                                    ? "bg-[#FCD34D]/10 border-[#FCD34D] shadow-[0_0_30px_-10px_rgba(252,211,77,0.3)]"
                                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                            )}
                        >
                            {/* Selection Glow Gradient */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-b from-[#FCD34D]/10 to-transparent opacity-50" />
                            )}

                            {/* Icon Container - Reduced Size */}
                            <div className={cn(
                                "mb-4 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 relative z-10",
                                isSelected
                                    ? "bg-[#FCD34D] text-[#0E552F] shadow-[0_0_15px_rgba(252,211,77,0.5)] rotate-3 scale-110"
                                    : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110"
                            )}>
                                <Icon className="w-7 h-7" strokeWidth={1.5} />
                            </div>

                            {/* Label - Reduced Size */}
                            <h3 className={cn(
                                "text-lg font-bold text-center tracking-wide transition-colors duration-300 relative z-10 leading-tight",
                                isSelected ? "text-[#FCD34D]" : "text-white/80 group-hover:text-white"
                            )}>
                                {option.title}
                            </h3>

                            {/* Selection Badge - Adjusted */}
                            <div className={cn(
                                "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500",
                                isSelected
                                    ? "bg-[#FCD34D] scale-100 rotate-0 opacity-100"
                                    : "bg-white/10 scale-50 rotate-90 opacity-0"
                            )}>
                                <Check className="w-4 h-4 text-[#0E552F]" strokeWidth={3} />
                            </div>

                            {/* Hover Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                        </motion.div>
                    );
                })}
            </motion.div >

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4 pt-8"
            >
                {/* Previous Button */}
                <GradientButton
                    variant="ghost"
                    onClick={props.onPrevious}
                    disabled={!props.canGoPrevious}
                    className="px-8 py-6 text-lg rounded-full"
                    icon={<ArrowLeft className="w-6 h-6 mr-2" />}
                >
                    Back
                </GradientButton>

                <GradientButton
                    size="lg"
                    onClick={handleContinue}
                    className="px-12 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    icon={<ArrowRight className="w-6 h-6 ml-2" />}
                    iconPosition="right"
                >
                    Continue Journey
                </GradientButton>
            </motion.div>
        </div >
    );
}
