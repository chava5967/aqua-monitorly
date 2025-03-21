
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropletIcon,
  HomeIcon,
  BellIcon,
  SettingsIcon,
  LayoutDashboardIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    {
      name: "Alerts",
      href: "/alerts",
      icon: <BellIcon className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
    },
  ];

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMobile]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled || location.pathname !== "/"
          ? "bg-white bg-opacity-80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-aqua-500 rounded-lg p-1.5">
            <DropletIcon className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">Aqua-Alert</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg flex items-center space-x-1 transition-all",
                  isActive
                    ? "bg-aqua-50 text-aqua-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-aqua-500 mx-3 rounded-t-md"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-white z-30 md:hidden overflow-y-auto"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 p-4 rounded-lg transition-all",
                      isActive
                        ? "bg-aqua-50 text-aqua-700 font-medium"
                        : "hover:bg-gray-50"
                    )}
                    onClick={closeMenu}
                  >
                    {item.icon}
                    <span className="text-lg">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
