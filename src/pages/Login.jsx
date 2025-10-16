import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, AtSign, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

export default function Login() {
  // All original state and logic is preserved
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

 // src/pages/Login.jsx

const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post("/users/login", { email, password });
      console.log("API Response Data:", data); 

      login(data);
      toast.success("Login Successful!");

      const userRole = data?.user?.role || data?.role;

      if (userRole === "student") {
        navigate("/student");
      } else if (userRole === "organizer") {
        navigate("/organizer");
      } else if (userRole === "admin") {
        navigate("/admin");
      } else {
        console.error("User role not found in API response, navigating to home.");
        navigate("/"); 
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
};

  // Helper for consistent input styling
  const inputClasses = "w-full py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition";
  const iconInputClasses = `${inputClasses} pl-10 pr-4`;

  return (
    <div className="relative flex items-center justify-center bg-slate-900 text-white px-4 py-24 min-h-screen overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Column: Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-slate-900/30 border-r border-slate-800">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                📅 EventXpert
            </h2>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
                Welcome Back.
            </h1>
            <p className="mt-4 text-slate-400">
                Sign in to access your dashboard and continue creating unforgettable campus experiences.
            </p>
            <ul className="mt-8 space-y-4 text-slate-300">
                <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    Manage your events and teams.
                </li>
                <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    Track attendance and analytics.
                </li>
                 <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    Engage with your community.
                </li>
            </ul>
        </div>
        
        {/* Right Column: Form */}
        <div className="p-8 md:p-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Sign In</h2>
                <p className="text-slate-400 mt-2">Enter your credentials to continue.</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
                <div className="relative">
                    <AtSign className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                    <input type="email" placeholder="your.email@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} className={iconInputClasses} required />
                </div>
                
                <div className="relative">
                    <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${iconInputClasses} pr-10`} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                        <AnimatePresence mode="wait">
                            {showPassword ? <motion.div key="eye-off"><EyeOff size={18} /></motion.div> : <motion.div key="eye"><Eye size={18} /></motion.div>}
                        </AnimatePresence>
                    </button>
                </div>

                <div className="text-right">
                    <Link to="/forgot-password" className="text-sm font-semibold text-cyan-400 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                
                {error && <p className="text-red-400 text-center text-sm">{error}</p>}

                <motion.button whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.4)" }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white text-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? "Signing In..." : "Sign In"}
                </motion.button>
            </form>
            
            <p className="mt-8 text-center text-slate-400 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-cyan-400 hover:underline">
                    Sign up now
                </Link>
            </p>
        </div>
      </motion.div>
    </div>
  );
}