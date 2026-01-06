import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    MapPin,
    HelpCircle,
    User,
    LogOut,
    LayoutDashboard,
    DollarSign,
    MessageCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const FloatingDock = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const mouseX = useMotionValue(Infinity);

    const handleLogout = () => {
        signOut();
        navigate("/auth");
    };

    const links = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: MapPin, label: "Track", href: "/track" },
        { icon: User, label: "Profile", href: "/profile" },
        { icon: HelpCircle, label: "Help", href: "/help" },
        { icon: DollarSign, label: "Pricing", href: "/pricing" },

    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div
                className="flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-[#0E552F]/15 pointer-events-auto"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
            >
                {links.map((link) => (
                    <DockIcon
                        key={link.label}
                        mouseX={mouseX}
                        {...link}
                        isActive={pathname === link.href}
                    />
                ))}

                <div className="w-[1px] h-8 bg-[#0E552F]/10 mx-1" />

                <DockIcon
                    icon={LogOut}
                    label="Logout"
                    onClick={handleLogout}
                    mouseX={mouseX}
                    isDanger
                />
            </div>
        </div>
    );
};

function DockIcon({
    mouseX,
    icon: Icon,
    href,
    label,
    isActive,
    onClick,
    isDanger
}: any) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const content = (
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className={cn(
                "flex aspect-square items-center justify-center rounded-xl transition-colors",
                isActive ? "bg-[#0E552F] text-white shadow-lg shadow-[#0E552F]/30" : "bg-transparent text-[#45745B] hover:bg-[#0E552F]/5",
                isDanger && "text-red-500 hover:bg-red-50"
            )}
        >
            <Icon className="w-5 h-5" />
        </motion.div>
    );

    return (
        <div className="group relative">
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#0E552F] text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {label}
            </div>

            {href ? (
                <Link to={href}>
                    {content}
                </Link>
            ) : (
                <button onClick={onClick}>
                    {content}
                </button>
            )}
        </div>
    );
}
