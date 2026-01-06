import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index?: number;
    variant?: "default" | "gradient" | "outline";
}

export default function FeatureCard({
    icon: Icon,
    title,
    description,
    index = 0,
    variant = "default",
}: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`group relative p-8 rounded-2xl transition-all duration-300 ${variant === "gradient"
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : variant === "outline"
                        ? "bg-transparent border-2 border-primary/20 hover:border-primary/50"
                        : "bg-white dark:bg-card border border-border/50 shadow-lg hover:shadow-xl"
                }`}
        >
            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] group-hover:left-[150%] transition-all duration-700" />
            </div>

            {/* Glow Effect on Hover */}
            {variant === "default" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300" />
            )}

            <div className="relative">
                {/* Icon */}
                <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${variant === "gradient"
                            ? "bg-white/20"
                            : "bg-gradient-to-br from-primary to-secondary shadow-lg"
                        }`}
                >
                    <Icon
                        className={`w-7 h-7 ${variant === "gradient" ? "text-white" : "text-white"
                            }`}
                    />
                </div>

                {/* Content */}
                <h3
                    className={`text-xl font-semibold mb-3 ${variant === "gradient" ? "text-white" : "text-foreground"
                        }`}
                >
                    {title}
                </h3>
                <p
                    className={`leading-relaxed ${variant === "gradient" ? "text-white/80" : "text-muted-foreground"
                        }`}
                >
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
