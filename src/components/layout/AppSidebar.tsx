import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Calculator,
  Receipt,
  MapPin,
  CreditCard,
  HelpCircle,
  User,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/pf-logo.png";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Personal Tax Filing", url: "/tax-filing", icon: FileText },
  { title: "Track Filing", url: "/track", icon: MapPin },
  { title: "Salary Calculator", url: "/calculator", icon: Calculator },
];

const servicesNavItems: NavItem[] = [
  { title: "IRIS Profile Update", url: "/iris-update", icon: User },
  { title: "NTN Registration", url: "/ntn-registration", icon: Receipt },
  { title: "GST Registration", url: "/gst-registration", icon: Receipt },
  { title: "Business Incorporation", url: "/business", icon: Building2, badge: "Soon" },
];

const bottomNavItems: NavItem[] = [
  { title: "Pricing", url: "/pricing", icon: CreditCard },
  { title: "Help", url: "/help", icon: HelpCircle },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const NavItemComponent = ({ item }: { item: NavItem }) => (
    <NavLink
      to={item.url}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
        "hover:bg-sidebar-accent group relative",
        isActive(item.url) 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-sidebar-foreground"
      )}
      activeClassName="bg-primary/10 text-primary font-medium"
    >
      <item.icon className={cn(
        "h-5 w-5 flex-shrink-0 transition-colors",
        isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )} />
      
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            className="text-sm truncate"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
          >
            {item.title}
          </motion.span>
        )}
      </AnimatePresence>

      {item.badge && !collapsed && (
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
          {item.badge}
        </span>
      )}

      {/* Active indicator */}
      {isActive(item.url) && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </NavLink>
  );

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border",
        "flex flex-col z-40 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <img 
            src={logo} 
            alt="PAK Filer" 
            className="h-10 w-10 object-contain flex-shrink-0" 
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="font-bold text-lg text-foreground whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                PAK Filer
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-custom py-4 px-3">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItemComponent key={item.url} item={item} />
          ))}
        </nav>

        {/* Services Section */}
        <div className="mt-6">
          {!collapsed && (
            <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Services
            </p>
          )}
          <nav className="space-y-1">
            {servicesNavItems.map((item) => (
              <NavItemComponent key={item.url} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border py-4 px-3 space-y-1">
        {bottomNavItems.map((item) => (
          <NavItemComponent key={item.url} item={item} />
        ))}

        {/* User & Logout */}
        <div className="pt-2 mt-2 border-t border-sidebar-border">
          {!collapsed && user && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          
          <button
            onClick={signOut}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-20 p-1.5 rounded-full",
          "bg-background border border-border shadow-md",
          "text-muted-foreground hover:text-foreground hover:bg-accent",
          "transition-colors z-50"
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </motion.aside>
  );
}

export default AppSidebar;
