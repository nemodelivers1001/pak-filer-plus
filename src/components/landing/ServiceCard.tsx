import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    price?: string;
    features?: string[];
    index?: number;
}

export default function ServiceCard({
    icon: Icon,
    title,
    description,
    price,
    features,
    index = 0,
}: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -8,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.3 }
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="group relative bg-white dark:bg-card rounded-2xl p-8 shadow-lg border-prism hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow overflow-visible"
        >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500" />

            {/* Shine Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-15deg] group-hover:left-[150%] transition-all duration-700" />
            </div>

            <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                    {description}
                </p>

                {/* Price */}
                {price && (
                    <div className="mb-4">
                        <span className="text-2xl font-bold text-gradient-brand">
                            {price}
                        </span>
                        <span className="text-muted-foreground text-sm ml-2">starting</span>
                    </div>
                )}

                {/* Features */}
                {features && features.length > 0 && (
                    <ul className="space-y-2">
                        {features.map((feature, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
}
