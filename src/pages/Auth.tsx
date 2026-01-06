import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { FormInput } from "@/components/ui/FormInput";
import { useAuth } from "@/hooks/useAuth";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import logo from "@/assets/pf-logo.png";

type AuthMode = "signin" | "signup";

export default function Auth() {
  const navigate = useNavigate();
  const { isAuthenticated, signIn, signUp } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let result;
      if (mode === "signup") {
        result = signUp(email, password, name);
      } else {
        result = signIn(email, password);
      }

      if (!result.success) {
        setError(result.error || "An error occurred");
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setError(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <MeshBackground 
      variant="default" 
      animated 
      className="min-h-screen flex items-center justify-center p-4"
    >
      <motion.div
        className="w-full max-w-md"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Logo & Header */}
        <motion.div 
          className="text-center mb-8"
          variants={fadeInUp}
        >
          <motion.img
            src={logo}
            alt="PAK Filer"
            className="h-16 mx-auto mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === "signin" 
              ? "Sign in to continue your tax filing journey" 
              : "Start your hassle-free tax filing today"}
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div variants={fadeInUp}>
          <GlassCard variant="elevated" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormInput
                      label="Full Name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      icon={<User className="h-4 w-4" />}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <FormInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
                required
              />

              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
                hint={mode === "signup" ? "At least 6 characters" : undefined}
                required
              />

              {/* Error Message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <GradientButton
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                {mode === "signin" ? "Sign In" : "Create Account"}
              </GradientButton>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-1 text-primary font-medium hover:underline focus:outline-none"
                >
                  {mode === "signin" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Features Highlight */}
        <motion.div 
          className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Fast & Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-primary" />
            <span>Affordable</span>
          </div>
        </motion.div>
      </motion.div>
    </MeshBackground>
  );
}
