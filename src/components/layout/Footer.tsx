import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import pfLogo from "@/assets/pf-logo.png";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#052e16] text-white overflow-hidden pt-32 pb-12">
            {/* Monumental Background Text */}
            <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
                <h1 className="text-[15vw] font-bold leading-none whitespace-nowrap text-white">
                    PAK FILER • PAK FILER • PAK
                </h1>
            </div>

            {/* Gradient Mesh overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#011c10] via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={pfLogo} alt="PAK Filer" className="w-14 h-14 rounded-xl bg-white p-1 shadow-lg" />
                            <span className="text-2xl font-bold tracking-tight">PAK Filer</span>
                        </Link>
                        <p className="text-emerald-100/60 text-lg max-w-sm leading-relaxed">
                            Empowering Pakistan's financial future through automated, secure, and intelligent tax compliance systems.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500 hover:text-[#052e16] hover:border-emerald-500 transition-all duration-300 group"
                                >
                                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
                            <ul className="space-y-4">
                                {["Personal Tax", "Business Tax", "NTN Registration", "GST Compliance", "IRIS Updates"].map((item) => (
                                    <li key={item}>
                                        <Link to="#" className="text-emerald-100/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
                            <ul className="space-y-4">
                                {["About Us", "Our Team", "Careers", "Press & Media", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link to="#" className="text-emerald-100/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
                            <ul className="space-y-4">
                                {["Help Center", "Documentation", "API Status", "Privacy Policy", "Terms of Service"].map((item) => (
                                    <li key={item}>
                                        <Link to="#" className="text-emerald-100/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} PAK Filer. Built for the future of Pakistan.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-white transition-colors"
                    >
                        Back to Top
                        <div className="w-8 h-8 rounded-full border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#052e16] transition-all">
                            <ArrowUp className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
}
