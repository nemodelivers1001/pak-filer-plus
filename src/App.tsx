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

// Auth & Protected Pages - Lazy loaded
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const TaxFiling = lazy(() => import("@/pages/TaxFiling"));
const TrackFiling = lazy(() => import("@/pages/TrackFiling"));
const Profile = lazy(() => import("@/pages/Profile"));
const Help = lazy(() => import("@/pages/Help"));
const TaxCalculator = lazy(() => import("@/pages/TaxCalculator"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
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
            {/* Public Marketing Pages with PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>

            {/* Auth route (no layout) */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected routes with App Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tax-filing" element={<TaxFiling />} />
              <Route path="/track" element={<TrackFiling />} />
              {/* Placeholder routes - will be built in next phases */}
              <Route path="/track" element={<TrackFiling />} />
              <Route path="/calculator" element={<TaxCalculator />} />
              <Route path="/iris-update" element={<div className="p-10"><h1 className="text-2xl font-bold">IRIS Profile Update - Coming Soon</h1></div>} />
              <Route path="/ntn-registration" element={<div className="p-10"><h1 className="text-2xl font-bold">NTN Registration - Coming Soon</h1></div>} />
              <Route path="/gst-registration" element={<div className="p-10"><h1 className="text-2xl font-bold">GST Registration - Coming Soon</h1></div>} />
              <Route path="/business" element={<div className="p-10"><h1 className="text-2xl font-bold">Business Incorporation - Coming Soon</h1></div>} />
              <Route path="/help" element={<Help />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

