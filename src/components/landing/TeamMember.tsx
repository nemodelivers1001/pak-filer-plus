import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

interface TeamMemberProps {
    name: string;
    role: string;
    credentials: string;
    image?: string;
    social?: {
        linkedin?: string;
        twitter?: string;
    };
    index?: number;
}

export default function TeamMember({
    name,
    role,
    credentials,
    image,
    social,
    index = 0,
}: TeamMemberProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="relative bg-white dark:bg-card rounded-2xl p-6 shadow-lg border border-border/50 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                {/* Avatar with Gradient Ring */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1">
                        <div className="w-full h-full rounded-full bg-white dark:bg-card overflow-hidden">
                            {image ? (
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-soft to-accent flex items-center justify-center">
                                    <span className="text-3xl font-bold text-primary">
                                        {initials}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Animated Ring on Hover */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover:border-primary/30"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-center text-foreground mb-1">
                    {name}
                </h3>

                {/* Role */}
                <p className="text-sm font-medium text-primary text-center mb-2">
                    {role}
                </p>

                {/* Credentials */}
                <p className="text-xs text-muted-foreground text-center leading-relaxed mb-4">
                    {credentials}
                </p>

                {/* Social Links - Appear on Hover */}
                {social && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3"
                    >
                        {social.linkedin && (
                            <a
                                href={social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                        {social.twitter && (
                            <a
                                href={social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
