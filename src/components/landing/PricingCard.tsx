import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PricingCardProps {
    name: string;
    description: string;
    basePrice: string;
    features: string[];
    popular?: boolean;
    action?: {
        label: string;
        href: string;
    };
    index?: number;
}

export default function PricingCard({
    name,
    description,
    basePrice,
    features,
    popular = false,
    action = { label: "Get Started", href: "/auth" },
    index = 0,
}: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-3xl p-1 shadow-lg ${popular
                ? "bg-gradient-to-br from-primary via-secondary to-primary shadow-[0_0_30px_rgba(14,85,47,0.3)] scale-[1.02]"
                : "bg-transparent border-prism"
                }`}
        >
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold shadow-lg"
                    >
                        <Sparkles className="w-4 h-4" />
                        Most Popular
                    </motion.div>
                </div>
            )}

            <div
                className={`relative rounded-[22px] p-8 h-full ${popular ? "bg-white dark:bg-card" : "bg-white dark:bg-card"
                    }`}
            >
                {/* Header */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-gradient-brand">
                            {basePrice}
                        </span>
                        <span className="text-muted-foreground mb-1">starting</span>
                    </div>
                </div>

                {/* CTA Button */}
                <Link to={action.href} className="block mb-8">
                    <Button
                        className={`w-full py-6 text-lg ${popular
                            ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                    >
                        {action.label}
                    </Button>
                </Link>

                {/* Features */}
                <ul className="space-y-4">
                    {features.map((feature, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-foreground/80">{feature}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
