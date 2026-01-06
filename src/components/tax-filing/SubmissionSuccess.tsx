import { motion } from "framer-motion";
import { PartyPopper, Download, Home, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { GradientButton } from "@/components/ui/GradientButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface SubmissionSuccessProps {
  filingId?: string;
  onStartNew: () => void;
}

export function SubmissionSuccess({ filingId, onStartNew }: SubmissionSuccessProps) {
  const referenceNumber = filingId || `PF-${Date.now().toString(36).toUpperCase()}`;

  return (
    <MeshBackground variant="default" animated className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="max-w-lg w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Success Animation */}
        <motion.div
          className="text-center mb-8"
          variants={fadeInUp}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              animate={{ rotate: [0, -15, 15, -15, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PartyPopper className="w-12 h-12 text-primary" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-foreground mb-3"
            variants={fadeInUp}
          >
            Filing Submitted Successfully! 🎉
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            variants={fadeInUp}
          >
            Your personal tax return has been submitted to FBR.
          </motion.p>
        </motion.div>

        {/* Reference Card */}
        <motion.div variants={fadeInUp}>
          <GlassCard variant="bordered" className="p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Reference Number</p>
              <p className="text-2xl font-mono font-bold text-primary mb-4">
                {referenceNumber}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <FileCheck className="h-4 w-4 text-primary" />
                <span>Save this for your records</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* What's Next */}
        <motion.div variants={fadeInUp}>
          <GlassCard className="p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span>
                <span>FBR will process your tax return within 3-5 working days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span>
                <span>You'll receive an email confirmation with your acknowledgment receipt</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span>
                <span>Track your filing status anytime from the Track page</span>
              </li>
            </ul>
          </GlassCard>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          variants={fadeInUp}
        >
          <GradientButton
            variant="outline"
            className="flex-1"
            icon={<Download className="h-4 w-4" />}
          >
            Download Receipt
          </GradientButton>

          <Link to="/track" className="flex-1">
            <GradientButton
              variant="secondary"
              className="w-full"
              icon={<FileCheck className="h-4 w-4" />}
            >
              Track Filing
            </GradientButton>
          </Link>

          <Link to="/dashboard" className="flex-1">
            <GradientButton
              variant="primary"
              className="w-full"
              icon={<Home className="h-4 w-4" />}
            >
              Go to Dashboard
            </GradientButton>
          </Link>
        </motion.div>
      </motion.div>
    </MeshBackground>
  );
}

export default SubmissionSuccess;
