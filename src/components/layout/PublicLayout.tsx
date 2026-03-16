import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronRight, ChevronDown, FileText, Users, Building2, Receipt, RefreshCw, Calculator, Briefcase, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import pfLogo from "@/assets/pf-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: true },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const megaServices = [
  { icon: FileText, label: "Personal Tax Filing", desc: "File your FBR income tax return online", href: "/services/personal-tax-filing" },
  { icon: Users, label: "Family Tax Filing", desc: "File for your entire family in one place", href: "/services/family-tax-filing" },
  { icon: Building2, label: "Business Tax Return", desc: "Expert filing for all business entities", href: "/services/business-tax-return" },
  { icon: Receipt, label: "NTN Registration", desc: "Get your National Tax Number from FBR", href: "/services/ntn-registration" },
  { icon: RefreshCw, label: "IRIS Profile Update", desc: "Update your FBR IRIS profile accurately", href: "/services/iris-profile-update" },
  { icon: CreditCard, label: "GST Registration", desc: "Register for Sales Tax with FBR", href: "/services/gst-registration" },
  { icon: Briefcase, label: "Business Incorporation", desc: "Register your company with SECP", href: "/services/business-incorporation" },
  { icon: Calculator, label: "Salary Tax Calculator", desc: "Free instant salary tax estimator", href: "/services/salary-tax-calculator" },
];

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isHeroPage = ["/", "/services", "/about", "/faq", "/pricing", "/contact"].includes(location.pathname) || location.pathname.startsWith("/services/");
  const isTransparent = isHeroPage && !isScrolled;

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-pak-border" : "bg-transparent"}`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src={pfLogo} alt="Pak Filer" className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl shadow-md bg-white p-0.5" />
              <span className={`text-lg font-display font-bold ${isTransparent ? "text-white" : "text-[#146B3A]"}`}>
                Pak Filer
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <div key={link.href} className="relative" ref={link.mega ? megaRef : undefined}>
                  {link.mega ? (
                    <button
                      onClick={() => setMegaOpen(!megaOpen)}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors ${isTransparent ? "text-white hover:text-white/80" : "text-[#1F2A2A] hover:text-[#1A8549]"}`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`text-sm font-medium transition-colors ${isTransparent ? "text-white hover:text-white/80" : "text-[#1F2A2A] hover:text-[#1A8549]"}`}
                    >
                      {link.label}
                      {location.pathname === link.href && (
                        <motion.div layoutId="nav-active" className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${isTransparent ? "bg-white" : "bg-[#1A8549]"}`} />
                      )}
                    </Link>
                  )}

                  {/* Mega Dropdown */}
                  {link.mega && (
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-2xl shadow-2xl border border-[#E0EAE4] p-6 grid grid-cols-2 gap-3"
                        >
                          {megaServices.map((s) => (
                            <Link
                              key={s.href}
                              to={s.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F7FAF8] transition-colors group"
                            >
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1A8549] to-[#146B3A] flex items-center justify-center flex-shrink-0">
                                <s.icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#1F2A2A] group-hover:text-[#1A8549] transition-colors">{s.label}</p>
                                <p className="text-xs text-[#7A8A8A] mt-0.5">{s.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link to="/services/personal-tax-filing">
                <Button className="bg-gradient-to-r from-[#1A8549] to-[#146B3A] text-white font-semibold shadow-lg hover:brightness-110 transition-all px-6">
                  File Your Taxes Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className={isTransparent ? "text-white" : "text-foreground"}>
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full bg-white">
                  <div className="p-6 border-b border-[#E0EAE4]">
                    <div className="flex items-center gap-3">
                      <img src={pfLogo} alt="Pak Filer" className="w-10 h-10 rounded-xl" />
                      <span className="text-lg font-display font-bold text-[#146B3A]">Pak Filer</span>
                    </div>
                  </div>
                  <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
                    {navLinks.map((link) => (
                      <div key={link.href}>
                        <Link
                          to={link.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            location.pathname === link.href
                              ? "bg-[#E8F5EE] text-[#146B3A]"
                              : "text-[#4A5A5A] hover:bg-[#F7FAF8]"
                          }`}
                        >
                          {link.label}
                        </Link>
                        {link.mega && (
                          <div className="ml-4 mt-1 space-y-0.5">
                            {megaServices.map((s) => (
                              <Link key={s.href} to={s.href} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-[#7A8A8A] hover:text-[#1A8549] hover:bg-[#F7FAF8]">
                                <s.icon className="w-3.5 h-3.5" />
                                {s.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="p-6 border-t border-[#E0EAE4]">
                    <Link to="/services/personal-tax-filing" className="block">
                      <Button className="w-full bg-gradient-to-r from-[#1A8549] to-[#146B3A] text-white font-semibold">
                        File Your Taxes Now
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
