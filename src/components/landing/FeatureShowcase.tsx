import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, FileText, Check, ArrowRight } from "lucide-react";

const features = [
    {
        id: "speed",
        title: "Lightning Fast",
        description: "Auto-filled forms. AI-driven calculations. Finish your filing in under 7 minutes.",
        icon: Zap,
        color: "bg-emerald-500",
        screen: "SpeedScreen"
    },
    {
        id: "security",
        title: "Bank-Grade Security",
        description: "Your data is protected by military-grade AES-256 encryption and biometric locks.",
        icon: Shield,
        color: "bg-emerald-700",
        screen: "SecurityScreen"
    },
    {
        id: "fbr",
        title: "FBR Integrated",
        description: "Direct plugin with IRIS. Instant submission and verification receipt generation.",
        icon: FileText,
        color: "bg-amber-500",
        screen: "IntegrationScreen"
    }
];

export default function FeatureShowcase() {
    const [activeFeature, setActiveFeature] = useState(0);

    // Auto-rotate features
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 bg-[#FAFAF9] overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-gradient-to-b from-emerald-50/50 to-transparent rounded-bl-[200px] z-0" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* LEFT: Feature Navigation */}
                    <div className="lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                One Platform. <br />
                                <span className="text-emerald-700">Infinite Possibilities.</span>
                            </h2>
                            <p className="text-xl text-gray-500 max-w-md leading-relaxed">
                                Experience the most powerful tax filing engine ever built for Pakistan.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    onClick={() => setActiveFeature(index)}
                                    className={`group cursor-pointer p-6 rounded-2xl transition-all duration-500 border-2 ${activeFeature === index
                                            ? "bg-white border-emerald-500/20 shadow-xl shadow-emerald-500/5 scale-102"
                                            : "bg-transparent border-transparent hover:bg-white/50"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-1 p-3 rounded-xl transition-colors duration-200 ${activeFeature === index ? "bg-emerald-100/50" : "bg-gray-100"
                                            }`}>
                                            <feature.icon className={`w-6 h-6 ${activeFeature === index ? "text-emerald-700" : "text-gray-400"
                                                }`} />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 transition-colors duration-200 ${activeFeature === index ? "text-emerald-900" : "text-gray-500"
                                                }`}>
                                                {feature.title}
                                            </h3>
                                            <p className={`text-sm leading-relaxed transition-colors duration-200 ${activeFeature === index ? "text-gray-600" : "text-gray-400"
                                                }`}>
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Progress Bar for Active state */}
                                    {activeFeature === index && (
                                        <motion.div
                                            layoutId="progress"
                                            className="h-1 bg-emerald-500 mt-4 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 5, ease: "linear" }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: 3D Interface Mockup */}
                    <div className="lg:w-1/2 w-full perspective-2000">
                        <motion.div
                            initial={{ rotateX: 5, rotateY: -5, rotateZ: 2 }}
                            animate={{
                                rotateY: [10, -5, 10],
                                y: [-10, 10, -10]
                            }}
                            transition={{
                                rotateY: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative w-full max-w-[500px] mx-auto aspect-[4/5] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Phone Frame Details */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-50"></div>

                            {/* Screen Content */}
                            <div className="absolute inset-0 bg-[#F5F7F6] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {activeFeature === 0 && (
                                        <SpeedScreen key="speed" />
                                    )}
                                    {activeFeature === 1 && (
                                        <SecurityScreen key="security" />
                                    )}
                                    {activeFeature === 2 && (
                                        <IntegrationScreen key="integration" />
                                    )}
                                </AnimatePresence>

                                {/* Static Phone UI Elements */}
                                <div className="absolute bottom-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-around">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                    <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating elements behind phone */}
                        <div className="absolute top-20 -right-10 w-24 h-24 bg-emerald-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-20 -left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* --- Sub-Components for Screens --- */

const SpeedScreen = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="h-full p-8 flex flex-col justify-center"
    >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <Zap className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-center text-2xl font-bold text-gray-800 mb-2">Turbo Filing</h3>
        <p className="text-center text-gray-500 mb-8">Importing salary data...</p>

        <div className="space-y-4">
            <div className="h-16 bg-white rounded-2xl shadow-sm border border-emerald-100 p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">1</div>
                <div className="flex-1 h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-emerald-500"
                    />
                </div>
            </div>
            <div className="h-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">2</div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full"></div>
            </div>
        </div>
    </motion.div>
);

const SecurityScreen = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="h-full bg-emerald-900 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden"
    >
        {/* Radar effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
        >
            <div className="w-[300px] h-[300px] border border-emerald-500/30 rounded-full border-t-emerald-400"></div>
        </motion.div>

        <Shield className="w-24 h-24 text-emerald-400 mb-6 relative z-10" />
        <h3 className="text-2xl font-bold mb-2 relative z-10">System Secure</h3>
        <div className="flex items-center gap-2 text-emerald-300 text-sm relative z-10">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            AES-256 Active
        </div>
    </motion.div>
);

const IntegrationScreen = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="h-full bg-white p-8 pt-32"
    >
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-amber-50 to-white border-b border-gray-100"></div>

        <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900">Submission Receipt</h3>
            <p className="text-sm text-gray-500">Ref: FBR-2025-X99</p>
        </div>

        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-6 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                <Check className="w-6 h-6 text-white" />
            </div>

            <div className="mt-6 flex justify-between items-center text-sm mb-4">
                <span className="text-gray-500">Status</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">Verified</span>
            </div>
            <div className="h-px bg-gray-100 my-4"></div>
            <div className="space-y-3">
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                <div className="h-3 bg-gray-50 rounded w-full"></div>
                <div className="h-3 bg-gray-50 rounded w-1/2"></div>
            </div>
        </div>
    </motion.div>
);
