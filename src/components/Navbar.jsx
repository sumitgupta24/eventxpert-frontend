import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User2, LogOut, Menu, X, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardPath = (role) => {
    // Simplified this function for brevity in the example
    if (role === "admin") return "/admin";
    if (role === "organizer") return "/organizer";
    return "/student";
  };
  
  const navLinks = [
    { path: "/events", label: "Events" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // Variants for staggered animation
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const mobileMenuVariants = {
      open: { opacity: 1, x: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
      closed: { opacity: 0, x: "100%" },
  }

  const mobileLinkVariants = {
      open: { y: 0, opacity: 1 },
      closed: { y: 20, opacity: 0 }
  }


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-slate-900/60 backdrop-blur-lg border-b border-slate-800/50"
    >
      <div className="mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            EvenXpert
          </div>
        </Link>

        {/* Desktop Links (Center) */}
        <ul className="hidden md:flex gap-2 items-center">
          {navLinks.map((link, i) => (
            <motion.li key={link.path} custom={i} initial="hidden" animate="visible" variants={navItemVariants}>
              <Link
                to={link.path}
                className="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Auth Buttons / Profile (Right) */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src={user?.profilePicture || `https://avatar.vercel.sh/${user?.email}.png`}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-cyan-500 object-cover"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-lg py-2"
                  >
                    <div className="px-4 py-2 border-b border-slate-700">
                        <p className="font-semibold text-white">{user?.name || "User"}</p>
                        <p className="text-sm text-slate-400">{user?.email}</p>
                    </div>
                    <Link to={getDashboardPath(user?.role)} onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50">
                        <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700/50">
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 h-screen w-full bg-slate-900/80 backdrop-blur-xl z-50 md:hidden"
          >
            <div className="flex justify-end p-5">
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white">
                    <X size={32} />
                </button>
            </div>
            <ul className="flex flex-col items-center justify-center h-full gap-6 -mt-12">
              {navLinks.map((link) => (
                <motion.li key={`mobile-${link.path}`} variants={mobileLinkVariants}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-2xl text-slate-300 hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <div className="w-1/2 h-px bg-slate-700 my-4"></div>
                {isAuthenticated ? (
                     <>
                        <motion.li variants={mobileLinkVariants}><Link to={getDashboardPath(user?.role)} onClick={() => setMobileMenuOpen(false)} className="block text-2xl text-slate-300 hover:text-cyan-400">Dashboard</Link></motion.li>
                        <motion.li variants={mobileLinkVariants}><button onClick={handleLogout} className="text-2xl text-red-400">Logout</button></motion.li>
                     </>
                ) : (
                    <>
                        <motion.li variants={mobileLinkVariants}><Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-2xl text-slate-300 hover:text-cyan-400">Login</Link></motion.li>
                        <motion.li variants={mobileLinkVariants}>
                            <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-lg font-bold text-xl">
                                Sign Up
                            </Link>
                        </motion.li>
                    </>
                )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}