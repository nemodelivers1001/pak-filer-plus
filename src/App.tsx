import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import PublicLayout from "@/components/layout/PublicLayout";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Public Pages - Lazy loaded
const Home = lazy(() => import("@/pages/public/Home"));
const Services = lazy(() => import("@/pages/public/Services"));
const Pricing = lazy(() => import("@/pages/public/Pricing"));
const About = lazy(() => import("@/pages/public/About"));
const FAQ = lazy(() => import("@/pages/public/FAQ"));
const Contact = lazy(() => import("@/pages/public/Contact"));

// Service Detail Pages
const PersonalTaxFiling = lazy(() => import("@/pages/public/services/PersonalTaxFiling"));
const FamilyTaxFiling = lazy(() => import("@/pages/public/services/FamilyTaxFiling"));
const BusinessTaxReturn = lazy(() => import("@/pages/public/services/BusinessTaxReturn"));
const NTNRegistration = lazy(() => import("@/pages/public/services/NTNRegistration"));
const IRISProfileUpdate = lazy(() => import("@/pages/public/services/IRISProfileUpdate"));
const GSTRegistration = lazy(() => import("@/pages/public/services/GSTRegistration"));
const BusinessIncorporation = lazy(() => import("@/pages/public/services/BusinessIncorporation"));
const SalaryTaxCalculator = lazy(() => import("@/pages/public/services/SalaryTaxCalculator"));

// Auth & Protected Pages
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const TaxFiling = lazy(() => import("@/pages/TaxFiling"));
const TrackFiling = lazy(() => import("@/pages/TrackFiling"));
const Profile = lazy(() => import("@/pages/Profile"));
const Help = lazy(() => import("@/pages/Help"));
const TaxCalculator = lazy(() => import("@/pages/TaxCalculator"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[#1A8549]/30 border-t-[#1A8549] rounded-full animate-spin" />
      <p className="text-[#7A8A8A] text-sm">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/personal-tax-filing" element={<PersonalTaxFiling />} />
              <Route path="/services/family-tax-filing" element={<FamilyTaxFiling />} />
              <Route path="/services/business-tax-return" element={<BusinessTaxReturn />} />
              <Route path="/services/ntn-registration" element={<NTNRegistration />} />
              <Route path="/services/iris-profile-update" element={<IRISProfileUpdate />} />
              <Route path="/services/gst-registration" element={<GSTRegistration />} />
              <Route path="/services/business-incorporation" element={<BusinessIncorporation />} />
              <Route path="/services/salary-tax-calculator" element={<SalaryTaxCalculator />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Auth */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tax-filing" element={<TaxFiling />} />
              <Route path="/track" element={<TrackFiling />} />
              <Route path="/calculator" element={<TaxCalculator />} />
              <Route path="/iris-update" element={<div className="p-10"><h1 className="text-2xl font-bold">IRIS Profile Update - Coming Soon</h1></div>} />
              <Route path="/ntn-registration" element={<div className="p-10"><h1 className="text-2xl font-bold">NTN Registration - Coming Soon</h1></div>} />
              <Route path="/gst-registration" element={<div className="p-10"><h1 className="text-2xl font-bold">GST Registration - Coming Soon</h1></div>} />
              <Route path="/business" element={<div className="p-10"><h1 className="text-2xl font-bold">Business Incorporation - Coming Soon</h1></div>} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
