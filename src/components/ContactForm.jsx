import { motion } from "framer-motion";
import { User, Mail, MessageSquare } from "lucide-react";

export default function ContactForm() {
  // Helper for consistent input styling
  const inputClasses = "w-full py-3 px-4 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition";

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    viewport: { once: true, amount: 0.3 }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 h-full"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
      <form className="space-y-5">
        <div className="relative">
          <User className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Full Name" 
            className={`${inputClasses} pl-12`} 
            required 
          />
        </div>
        <div className="relative">
          <Mail className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-500" size={18} />
          <input 
            type="email" 
            placeholder="Email Address" 
            className={`${inputClasses} pl-12`} 
            required 
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute top-5 left-4 text-slate-500" size={18} />
          <textarea 
            placeholder="Your Message..." 
            rows="5" 
            className={`${inputClasses} pl-12 pt-4`} 
            required
          ></textarea>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.4)" }} 
          whileTap={{ scale: 0.98 }} 
          type="submit" 
          className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white text-lg transition-all"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
};