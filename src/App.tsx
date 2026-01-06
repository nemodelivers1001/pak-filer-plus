import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// Pages - Lazy loaded
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
              {/* Placeholder routes - will be built in next phases */}
              <Route path="/tax-filing" element={<div className="p-10"><h1 className="text-2xl font-bold">Tax Filing - Coming in Phase 4</h1></div>} />
              <Route path="/track" element={<div className="p-10"><h1 className="text-2xl font-bold">Track Filing - Coming in Phase 5</h1></div>} />
              <Route path="/calculator" element={<div className="p-10"><h1 className="text-2xl font-bold">Salary Calculator - Coming in Phase 7</h1></div>} />
              <Route path="/iris-update" element={<div className="p-10"><h1 className="text-2xl font-bold">IRIS Profile Update - Coming Soon</h1></div>} />
              <Route path="/ntn-registration" element={<div className="p-10"><h1 className="text-2xl font-bold">NTN Registration - Coming Soon</h1></div>} />
              <Route path="/gst-registration" element={<div className="p-10"><h1 className="text-2xl font-bold">GST Registration - Coming Soon</h1></div>} />
              <Route path="/business" element={<div className="p-10"><h1 className="text-2xl font-bold">Business Incorporation - Coming Soon</h1></div>} />
              <Route path="/pricing" element={<div className="p-10"><h1 className="text-2xl font-bold">Pricing - Coming in Phase 6</h1></div>} />
              <Route path="/help" element={<div className="p-10"><h1 className="text-2xl font-bold">Help - Coming in Phase 7</h1></div>} />
              <Route path="/profile" element={<div className="p-10"><h1 className="text-2xl font-bold">Profile - Coming in Phase 7</h1></div>} />
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
