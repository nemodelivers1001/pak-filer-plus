import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientButton } from '@/components/ui/GradientButton';
import { cn } from '@/lib/utils';
import logo from '@/assets/pf-logo.png';
import { TaxGenie } from '../gamification/TaxGenie';

interface FilingJourneyLayoutProps {
    children: React.ReactNode;
    currentStepIndex: number;
    totalSteps: number;
    currentStepTitle: string;
    stepId: string; // Used for color theming
    progressPercentage: number;
    onExit: () => void;
    onSave?: () => void;
}

// Brand-aligned color themes (Variations of Primary #0E552F and Secondary #45745B)
const themeMap: Record<string, { from: string; via: string; to: string }> = {
    'personal-info': { from: 'from-[hsl(150,71%,19%)]/20', via: 'via-[hsl(150,25%,36%)]/10', to: 'to-[hsl(150,17%,58%)]/20' },
    'income': { from: 'from-[hsl(150,71%,19%)]/30', via: 'via-[hsl(150,71%,19%)]/10', to: 'to-[hsl(150,25%,36%)]/20' },
    'tax-credit': { from: 'from-[hsl(150,25%,36%)]/20', via: 'via-[hsl(150,17%,58%)]/10', to: 'to-[hsl(150,25%,81%)]/20' },
    'tax-deducted': { from: 'from-[hsl(150,71%,19%)]/25', via: 'via-[hsl(150,25%,36%)]/15', to: 'to-[hsl(150,17%,58%)]/25' },
    'wealth': { from: 'from-[hsl(150,25%,36%)]/30', via: 'via-[hsl(150,71%,19%)]/20', to: 'to-[hsl(150,25%,36%)]/30' },
    'expense': { from: 'from-[hsl(150,17%,58%)]/20', via: 'via-[hsl(150,25%,81%)]/10', to: 'to-[hsl(150,25%,36%)]/20' },
    'summary': { from: 'from-[hsl(150,71%,19%)]/20', via: 'via-[hsl(150,71%,19%)]/10', to: 'to-[hsl(150,71%,19%)]/20' },
    'submission': { from: 'from-[hsl(150,71%,19%)]/40', via: 'via-[hsl(150,25%,36%)]/30', to: 'to-[hsl(150,71%,19%)]/40' },
};

const defaultTheme = { from: 'from-primary/10', via: 'via-background', to: 'to-accent/10' };

export function FilingJourneyLayout({
    children,
    currentStepIndex,
    totalSteps,
    currentStepTitle,
    stepId,
    progressPercentage,
    onExit,
    onSave
}: FilingJourneyLayoutProps) {
    const theme = themeMap[stepId] || defaultTheme;

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col bg-background selection:bg-primary/20">

            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-colors duration-1000 ease-in-out",
                        theme.from, theme.via, theme.to
                    )}
                />

                {/* Floating Orbs */}
                <motion.div
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, 40, -20, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={cn("absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 bg-gradient-to-r", theme.from)}
                />
                <motion.div
                    animate={{
                        x: [0, -40, 30, 0],
                        y: [0, -50, 20, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                    className={cn("absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 bg-gradient-to-l", theme.to)}
                />
            </div>

            {/* Top Navigation Bar */}
            <header className="relative z-50 px-6 py-4 flex items-center justify-between backdrop-blur-sm border-b border-border/10">
                <div className="flex items-center gap-3">
                    <Link to="/dashboard" onClick={onExit} className="flex items-center gap-2 group">
                        <div className="bg-background/80 p-2 rounded-xl border border-border/50 shadow-sm group-hover:scale-105 transition-transform">
                            <img src={logo} alt="PV" className="h-6 w-6 object-contain" />
                        </div>
                        <span className="font-bold text-lg hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Tax Journey
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-background/40 rounded-full border border-border/20 mx-4">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Step {currentStepIndex + 1} of {totalSteps}</span>
                        <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
                        <span className="text-sm font-medium text-foreground">{currentStepTitle}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <GradientButton
                        variant="ghost"
                        size="sm"
                        className="hidden md:flex"
                        icon={<HelpCircle className="w-4 h-4" />}
                    >
                        Help
                    </GradientButton>

                    <GradientButton
                        variant="outline"
                        size="sm"
                        onClick={onSave}
                        icon={<Save className="w-4 h-4" />}
                    >
                        Save
                    </GradientButton>

                    <GradientButton
                        variant="ghost"
                        size="sm"
                        onClick={onExit}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                        <X className="w-5 h-5" />
                    </GradientButton>
                </div>
            </header>

            {/* Progress Line */}
            <div className="relative z-50 h-1 bg-border/20 w-full">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto scrollbar-none">
                <div className="w-full max-w-4xl mx-auto min-h-[60vh] flex flex-col justify-center">
                    {children}
                </div>
            </main>

            {/* Tax Genie Integration */}
            <TaxGenie
                message={stepId === 'income-wizard' ? "This is the Onboarding Wizard! Select only what applies to you." : "I'm here to help you file your taxes accurately!"}
                variant="idle"
            />

        </div>
    );
}
