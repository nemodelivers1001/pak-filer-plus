import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { AppSidebar } from "./AppSidebar";
import { pageSlide } from "@/lib/animations";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      {/* Main Content */}
      <motion.main
        className="ml-[72px] md:ml-64 min-h-screen"
        variants={pageSlide}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}

export default AppLayout;
