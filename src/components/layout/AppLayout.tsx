import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FloatingDock } from "@/components/layout/FloatingDock"; // Updated import

const AppLayout = () => {
  return (
    <div className="min-h-screen w-full relative">

      {/* Main Content Area - Natural Flow */}
      <main className="relative w-full pb-32">
        <Outlet />
      </main>

      {/* New Mac-style Floating Dock */}
      <FloatingDock />
    </div>
  );
};

export default AppLayout;
