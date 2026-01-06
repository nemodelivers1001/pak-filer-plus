import { motion, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { calculateTax, TaxYear } from "@/lib/tax-logic";
import { History, Zap, Briefcase, ArrowRight, Activity, Cpu } from "lucide-react";

// ----------------------------------------------------------------------
// QUANTUM DIAL COMPONENT (Polished & Balanced)
// ----------------------------------------------------------------------

const YEARS: TaxYear[] = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];

function QuantumDial({ value, onChange }: { value: TaxYear, onChange: (y: TaxYear) => void }) {
    const dialRef = useRef<HTMLDivElement>(null);
    const angle = useSpring(0, { stiffness: 400, damping: 40 });
    const currentIndex = YEARS.indexOf(value);

    useEffect(() => {
        angle.set(currentIndex * (360 / YEARS.length));
    }, [currentIndex]);

    const handlePan = (event: any, info: any) => {
        const rect = dialRef.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = info.point.x - centerX;
        const y = info.point.y - centerY;
        let theta = Math.atan2(y, x) * (180 / Math.PI);
        theta += 90;
        if (theta < 0) theta += 360;

        const segmentSize = 360 / YEARS.length;
        const index = Math.round(theta / segmentSize) % YEARS.length;

        if (YEARS[index] !== value) {
            onChange(YEARS[index]);
        }
    };

    return (
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center select-none">
            {/* Energy Ring */}
            <div className="absolute inset-0 rounded-full border border-[#4ade80]/20 shadow-[0_0_40px_rgba(14,85,47,0.1)]" />
            <div className="absolute inset-4 rounded-full border border-[#FCD34D]/10 border-dashed animate-spin-slow" />

            <motion.div
                ref={dialRef}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-[#020b06] to-[#0E552F] shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing border-4 border-[#0E552F]/40 hover:border-[#4ade80]/40 transition-colors"
                style={{ rotate: angle }}
                onPan={handlePan}
            >
                {/* Pointer */}
                <div className="absolute top-2 w-3 h-3 bg-[#FCD34D] rounded-full shadow-[0_0_15px_#FCD34D]" />

                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/40 backdrop-blur-md flex flex-col items-center justify-center border border-white/10 shadow-inner">
                    <span className="text-[8px] font-black tracking-widest text-[#FCD34D]/60">FY_TARGET</span>
                    <motion.div className="text-2xl md:text-3xl font-black" style={{ rotate: useTransform(angle, a => -a) }}>
                        {value}
                    </motion.div>
                </div>
            </motion.div>

            {YEARS.map((year, i) => {
                const deg = i * (360 / YEARS.length);
                const isActive = year === value;
                return (
                    <motion.div
                        key={year}
                        className={cn(
                            "absolute text-[10px] font-black tracking-tighter transition-all duration-500",
                            isActive ? "text-[#FCD34D] scale-150 drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]" : "text-white/20"
                        )}
                        style={{
                            transform: `rotate(${deg}deg) translateY(-115px) rotate(-${deg}deg)`,
                            transformOrigin: "center center"
                        }}
                    >
                        {year}
                    </motion.div>
                )
            })}
        </div>
    )
}

// ----------------------------------------------------------------------
// MAIN CALCULATOR PAGE - FIXED & BALANCED
// ----------------------------------------------------------------------

export default function TaxCalculator() {
    const [year, setYear] = useState<TaxYear>('2025');
    const [income, setIncome] = useState<number>(100000);
    const [mode, setMode] = useState<'monthly' | 'yearly'>('monthly');

    const annualIncome = mode === 'monthly' ? income * 12 : income;
    const taxLiability = calculateTax(year, annualIncome);
    const monthlyTax = Math.floor(taxLiability / 12);
    const netSalary = annualIncome - taxLiability;

    return (
        <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#0E552F] via-[#09331c] to-[#051a0f] text-white overflow-hidden font-sans selection:bg-[#FCD34D] selection:text-[#0E552F] z-0">

            {/* CSS to remove number spinners */}
            <style jsx>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>

            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.15)_0%,transparent_70%)] opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            </div>

            {/* CONTENT GRID */}
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 md:py-20 max-w-[1600px] mx-auto gap-10">

                {/* LEFT: CONTROLS */}
                <div className="w-full md:w-[45%] flex flex-col justify-center gap-8 md:gap-12">

                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#FCD34D] border-l-2 border-[#FCD34D] pl-4">
                            <Activity className="w-5 h-5 animate-pulse" />
                            <span className="text-xs font-black tracking-[0.4em] uppercase">SYSTEM.QUANTUM_ENGINE</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-white drop-shadow-2xl">
                            TAX TIME<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] via-white to-[#FCD34D]">MACHINE</span>
                        </h1>
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                            <History className="w-5 h-5 text-[#4ade80]" />
                            <span className="text-sm font-bold tracking-tight">FY <span className="text-[#4ade80] text-xl font-black ml-1">{year}</span></span>
                        </div>
                    </div>

                    {/* Inputs Area */}
                    <div className="flex flex-col xl:flex-row items-center gap-10">
                        <QuantumDial value={year} onChange={setYear} />

                        <div className="w-full flex-1 space-y-8 bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FCD34D]/5 blur-3xl rounded-full" />

                            <div className="space-y-8 relative z-10">
                                <div className="flex justify-between items-center">
                                    <label className="text-white/40 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-[#FCD34D]" />
                                        CAPITAL_FLOW
                                    </label>
                                    <div className="flex bg-black/40 rounded-xl p-1 border border-white/10 shadow-inner">
                                        <div className="px-5 py-2 rounded-lg text-[10px] font-black bg-[#4ade80] text-black">
                                            MONTHLY
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group/input">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-light text-white/10 group-focus-within/input:text-[#FCD34D] transition-colors">Rs</span>
                                    <input
                                        type="number"
                                        value={income}
                                        onChange={(e) => setIncome(Number(e.target.value))}
                                        className="w-full bg-transparent text-5xl md:text-6xl font-black text-white focus:outline-none pl-12 border-b-2 border-white/10 focus:border-[#FCD34D] transition-all pb-4 tracking-tighter"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FCD34D] group-focus-within/input:w-full transition-all duration-500" />
                                </div>

                                <div className="relative pt-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="5000000"
                                        step="5000"
                                        value={income}
                                        onChange={(e) => setIncome(Number(e.target.value))}
                                        className="w-full appearance-none bg-white/10 h-2 rounded-full cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#FCD34D] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(252,211,77,0.4)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: RESULTS */}
                <div className="w-full md:w-[45%] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-xl relative"
                    >
                        {/* Glow */}
                        <div className="absolute inset-0 bg-[#0E552F] blur-[100px] opacity-20" />

                        <div className="relative bg-[#020b06]/60 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-8 md:p-12 shadow-2xl flex flex-col gap-8 md:gap-10 overflow-hidden">

                            {/* Header */}
                            <div className="flex justify-between items-start border-b border-white/5 pb-6">
                                <div className="space-y-1">
                                    <h3 className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">OUTPUT.ANALYSIS</h3>
                                    <p className="text-white/20 text-[8px] font-mono">RECONCILIATION_STABLE_V4</p>
                                </div>
                                <Cpu className="w-6 h-6 text-[#FCD34D]/50" />
                            </div>

                            {/* Main Display */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">TOTAL_TAX_BURDEN</span>
                                    <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-tighter">DEDUCTION</div>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-2xl text-white/20 font-black italic">PKR</span>
                                    <Counter value={taxLiability} className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]" />
                                </div>
                                <div className="text-[#4ade80]/60 font-mono text-xs bg-[#4ade80]/5 px-4 py-2 rounded-xl border border-[#4ade80]/10 w-fit">
                                    MONTHLY: ≈ <Counter value={monthlyTax} />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                    <div className="text-white/30 text-[9px] font-black uppercase mb-1">Gross_Annual</div>
                                    <div className="text-xl md:text-2xl font-mono font-bold text-white tracking-tight">{annualIncome.toLocaleString()}</div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                                    <div className="text-white/30 text-[9px] font-black uppercase mb-1">Efficiency</div>
                                    <div className="text-xl md:text-2xl font-mono font-bold text-[#FCD34D] tracking-tight">
                                        {annualIncome > 0 ? ((taxLiability / annualIncome) * 100).toFixed(2) : '0.00'}%
                                    </div>
                                </div>
                            </div>

                            {/* Final Bar */}
                            <motion.div
                                className="bg-gradient-to-r from-[#0E552F] to-[#0a2e19] p-8 rounded-[2.5rem] border border-[#4ade80]/30 shadow-xl relative group/net"
                            >
                                <div className="absolute inset-0 bg-[#4ade80]/10 opacity-0 group-hover/net:opacity-100 transition-opacity rounded-[2.5rem]" />
                                <div className="relative z-10 flex justify-between items-center mb-3">
                                    <span className="text-[#4ade80] font-black uppercase tracking-widest text-[10px]">ULTIMATE_REVENUE</span>
                                    <ArrowRight className="w-6 h-6 text-[#4ade80]" />
                                </div>
                                <div className="relative z-10 flex items-baseline gap-3">
                                    <span className="text-2xl font-light text-white/30">Rs</span>
                                    <div className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                        {netSalary.toLocaleString()}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function Counter({ value, className = "" }: { value: number, className?: string }) {
    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className={className}
        >
            {value.toLocaleString()}
        </motion.span>
    )
}
