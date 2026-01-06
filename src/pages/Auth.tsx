import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Globe, ShieldCheck, FileText, ChevronLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/pf-logo.png";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

// --- THE GLOBAL NEXUS (LEFT SIDE) ---
// A rotating wireframe globe representing connection to FBR/Finance
const GlobeVisual = () => {
  return (
    <div className="relative w-full h-full bg-[#052e16] overflow-hidden flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#0E552F_0%,#020617_80%)] opacity-80" />

      {/* 3D Globe Container */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center perspective-1000">

        {/* The Globe */}
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="relative w-96 h-96 transform-style-3d cursor-grab active:cursor-grabbing"
          style={{ rotateX: 15 }}
        >
          {/* Longitude Lines */}
          {[...Array(8)].map((_, i) => (
            <div key={`long-${i}`}
              className="absolute inset-0 rounded-full border border-emerald-500/30"
              style={{ transform: `rotateY(${i * 22.5}deg)` }}
            />
          ))}
          {/* Latitude Lines */}
          {[...Array(6)].map((_, i) => (
            <div key={`lat-${i}`}
              className="absolute inset-0 rounded-full border border-emerald-500/30"
              style={{ transform: `rotateX(${90}deg) scale(${Math.cos((i - 2.5) * 0.5)}) translateY(${(i - 2.5) * 40}px)` }} // Rough approx
            // Actually, simple CSS distinct circles are easier for lat lines
            />
          ))}

          {/* Glowing Core */}
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />

          {/* Floating Icons (Simulating Satellites/Nodes) */}
          <motion.div
            animate={{ rotate: -360 }} // Counter rotate to keep upright? No, just orbit
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 bg-[#052e16] border border-emerald-500 p-3 rounded-xl shadow-[0_0_20px_#10b981]"
          >
            <ShieldCheck className="w-8 h-8 text-[#FCD34D]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-24 left-12 z-20">
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter shadow-black drop-shadow-lg">
          Verify.<br />
          File.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCD34D] to-amber-500">Relax.</span>
        </h1>
        <p className="text-emerald-100/70 font-light max-w-sm text-lg backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/5">
          The most advanced tax filing system in Pakistan.
          Directly integrated with FBR IRIS.
        </p>
      </div>
    </div>
  )
}

// --- AUTH FORM ---
export default function Auth() {
  const navigate = useNavigate();
  const { isAuthenticated, signIn, signUp } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Spotlight State
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = mode === "signup" ? signUp(email, password, name) : signIn(email, password);
    if (!result.success) { setError(result.error || "Error"); setLoading(false); }
    else { navigate("/dashboard", { replace: true }); }
  };

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Helper for input classes based on focus state
  const getInputContainerClass = (fieldId: string) => cn(
    "relative transition-all duration-300",
    focusedField && focusedField !== fieldId ? "opacity-30 blur-[2px] scale-95" : "opacity-100 blur-0 scale-100"
  );

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#020617]">

      {/* LEFT COLUMN */}
      <div className="hidden lg:block h-screen sticky top-0 overflow-hidden">
        <GlobeVisual />
      </div>

      {/* RIGHT COLUMN */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen p-6 md:p-12 overflow-hidden bg-[#052e16]"
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight Background */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: useMotionTemplate`
                            radial-gradient(
                                800px circle at ${mouseX}px ${mouseY}px,
                                rgba(16, 185, 129, 0.15),
                                transparent 80%
                            )
                        `,
          }}
        />

        <div
          className="w-full max-w-md relative z-20"
          onMouseLeave={() => setFocusedField(null)}
        >
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-100/50 hover:text-[#FCD34D] transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* LOGO & BRANDING (Centered Above Form) */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <img src={logo} alt="PF" className="w-16 h-16 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
            <span className="text-white font-black tracking-tighter text-3xl">PAK FILER</span>
          </div>
          <TiltCard className="w-full" glareColor="rgba(252, 211, 77, 0.1)">
            <div className="relative bg-[#052e16]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-950/50">

              <div className="mb-8 pl-2">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {mode === "signin" ? "Access Portal" : "Registration"}
                </h2>
                <p className="text-emerald-100/50">
                  {mode === "signin" ? "Verify your identity to proceed." : "Initialize your tax profile."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {mode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-2">
                        <div
                          className={getInputContainerClass("name")}
                          onMouseEnter={() => setFocusedField("name")}
                        >
                          <div className="relative group/input">
                            <User className="absolute left-4 top-4 w-5 h-5 text-emerald-500/50 group-focus-within/input:text-[#FCD34D] transition-colors" />
                            <input
                              value={name} onChange={e => setName(e.target.value)} required
                              className="w-full bg-[#022c22]/50 border border-emerald-500/20 rounded-2xl py-4 pl-12 text-white placeholder:text-emerald-100/20 focus:border-[#FCD34D]/50 focus:bg-[#022c22] focus:ring-1 focus:ring-[#FCD34D]/50 transition-all outline-none"
                              placeholder="Full Identification"
                              onFocus={() => setFocusedField("name")}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <div
                    className={getInputContainerClass("email")}
                    onMouseEnter={() => setFocusedField("email")}
                  >
                    <div className="relative group/input">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-emerald-500/50 group-focus-within/input:text-[#FCD34D] transition-colors" />
                      <input
                        type="email" value={email} onChange={e => setEmail(e.target.value)} required
                        className="w-full bg-[#022c22]/50 border border-emerald-500/20 rounded-2xl py-4 pl-12 text-white placeholder:text-emerald-100/20 focus:border-[#FCD34D]/50 focus:bg-[#022c22] focus:ring-1 focus:ring-[#FCD34D]/50 transition-all outline-none"
                        placeholder="Secure Email Link"
                        onFocus={() => setFocusedField("email")}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div
                    className={getInputContainerClass("password")}
                    onMouseEnter={() => setFocusedField("password")}
                  >
                    <div className="relative group/input">
                      <Lock className="absolute left-4 top-4 w-5 h-5 text-emerald-500/50 group-focus-within/input:text-[#FCD34D] transition-colors" />
                      <input
                        type="password" value={password} onChange={e => setPassword(e.target.value)} required
                        className="w-full bg-[#022c22]/50 border border-emerald-500/20 rounded-2xl py-4 pl-12 text-white placeholder:text-emerald-100/20 focus:border-[#FCD34D]/50 focus:bg-[#022c22] focus:ring-1 focus:ring-[#FCD34D]/50 transition-all outline-none"
                        placeholder="Access Key"
                        onFocus={() => setFocusedField("password")}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit" disabled={loading}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-[#FCD34D] to-[#F59E0B] text-[#052e16] rounded-2xl py-4 font-black text-lg shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    <span className="tracking-wider uppercase">{mode === "signin" ? "Authenticate" : "Initialize"}</span>
                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </div>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }}
                  className="text-emerald-100/60 hover:text-[#FCD34D] transition-colors text-sm font-medium"
                >
                  {mode === "signin" ? "Need a new clearance?" : "Already verified?"}
                  <span className="ml-2 underline decoration-[#FCD34D]/50 underline-offset-4">
                    {mode === "signin" ? "Apply Now" : "Login"}
                  </span>
                </button>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
