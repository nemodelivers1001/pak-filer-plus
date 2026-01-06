import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Footer from "./Footer";
import pfLogo from "@/assets/pf-logo.png";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
];

export default function PublicLayout() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const isTransparent = (location.pathname === "/" || location.pathname === "/services" || location.pathname === "/about" || location.pathname === "/faq") && !isScrolled;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Premium Navbar */}
            <header
                className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isScrolled
                    ? "top-4 w-[95%] max-w-5xl rounded-full bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-emerald-900/10 py-2.5 px-6"
                    : "top-0 w-full bg-transparent py-6"
                    }`}
            >
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <img src={pfLogo} alt="PAK Filer" className="w-12 h-12 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow border border-white/10 bg-white" />
                            <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isTransparent
                                ? "from-white to-white"
                                : "from-emerald-900 to-emerald-700 dark:from-white dark:to-white/80"
                                }`}>
                                PAK Filer
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`relative text-sm font-medium transition-colors hover:opacity-80 ${isTransparent
                                        ? "text-white"
                                        : "text-emerald-900 dark:text-white"
                                        }`}
                                >
                                    {link.label}
                                    {location.pathname === link.href && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${isTransparent ? "bg-white" : "bg-emerald-900 dark:bg-white"
                                                }`}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link to="/auth">
                                <Button
                                    variant="ghost"
                                    className={`font-medium hover:bg-white/10 ${isTransparent ? "text-white" : "text-emerald-900 dark:text-white"
                                        }`}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/auth">
                                <Button className={`shadow-lg hover:shadow-xl transition-all ${isTransparent
                                    ? "bg-white text-emerald-900 hover:bg-white/90"
                                    : "bg-emerald-900 text-white hover:bg-emerald-800 dark:bg-white dark:text-emerald-900"
                                    }`}>
                                    Get Started Free
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className={isTransparent ? "text-white" : "text-foreground"}>
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 p-0">
                                <div className="flex flex-col h-full bg-white dark:bg-[#0E552F]">
                                    <div className="p-6 border-b border-gray-100 dark:border-white/10">
                                        <div className="flex items-center gap-3">
                                            <img src={pfLogo} alt="PAK Filer" className="w-10 h-10 rounded-xl" />
                                            <span className="text-xl font-bold text-[#0E552F] dark:text-white">
                                                PAK Filer
                                            </span>
                                        </div>
                                    </div>
                                    <nav className="flex-1 p-6 space-y-2">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                to={link.href}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === link.href
                                                    ? "bg-[#0E552F]/10 text-[#0E552F] dark:bg-white/10 dark:text-white font-medium"
                                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </nav>
                                    <div className="p-6 border-t border-gray-100 dark:border-white/10 space-y-3">
                                        <Link to="/auth" className="block">
                                            <Button variant="outline" className="w-full border-[#0E552F] text-[#0E552F] dark:border-white dark:text-white">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/auth" className="block">
                                            <Button className="w-full bg-[#0E552F] text-white hover:bg-[#0E552F]/90 dark:bg-white dark:text-[#0E552F]">
                                                Get Started Free
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </header>

            {/* Main Content with Page Transitions */}
            <main className={`flex-1 ${(location.pathname === "/" || location.pathname === "/services" || location.pathname === "/about" || location.pathname === "/faq") ? "" : "pt-16 lg:pt-20"}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Premium Footer */}
            <Footer />
        </div>
    );
}
