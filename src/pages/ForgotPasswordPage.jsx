import { useState } from "react";
import { motion } from "framer-motion";
import { AtSign, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { data } = await api.post("/users/forgotpassword", { email });
      setMessage(data.data || "If an account with that email exists, a password reset link has been sent.");
      toast.success("Password reset email sent!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
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
          {/* <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            EventXpert
          </h2> */}
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
            Forgot Your Password?
          </h1>
          <p className="mt-4 text-slate-400">
            No problem. Enter your email address and we'll send you a link to reset your password and get you back on track.
          </p>
        </div>
        
        {/* Right Column: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
                <Mail size={40} className="mx-auto text-cyan-400 mb-4" />
                <h2 className="text-3xl font-bold text-white">Reset Password</h2>
                <p className="text-slate-400 mt-2">We'll send a recovery link to your email.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="relative">
                    <AtSign className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-500" size={18} />
                    <input 
                      type="email" 
                      placeholder="your.email@college.edu" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className={iconInputClasses} 
                      required 
                    />
                </div>
                
                {error && <p className="text-red-400 text-center text-sm">{error}</p>}
                {message && <p className="text-green-400 text-center text-sm">{message}</p>}

                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.4)" }} 
                  whileTap={{ scale: 0.98 }} 
                  type="submit" 
                  disabled={loading} 
                  className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white text-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending Link..." : "Send Reset Link"}
                </motion.button>
            </form>
            
            <div className="mt-8 text-center">
                <Link to="/login" className="text-sm font-semibold text-cyan-400 hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>
            </div>
        </div>
      </motion.div>
    </div>
  );
}