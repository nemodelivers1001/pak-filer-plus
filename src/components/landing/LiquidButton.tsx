import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function LiquidButton({ children, ...props }: LiquidButtonProps) {
    return (
        <button className="relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-emerald-950 bg-white hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 group border border-white/80 isolate focus:outline-none focus:ring-2 focus:ring-white/50" {...props}>
            <span className="relative z-50 flex items-center gap-2 mix-blend-normal">{children}</span>
            <div className="absolute inset-0 z-10 bg-emerald-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-t-[50%] w-[150%] h-[200%] left-[-25%] group-hover:bg-emerald-800"></div>
        </button>
    );
}
