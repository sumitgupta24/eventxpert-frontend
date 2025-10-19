import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };


  return (
    <section className="relative w-full min-h-screen flex items-center bg-slate-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 -left-40 w-[30rem] h-[30rem] bg-purple-900/40 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-40 w-[30rem] h-[30rem] bg-cyan-900/40 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-0" 
        >
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              Elevate Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mt-2">
                Campus Experience.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
              The all-in-one platform to manage, discover, and engage with every event at your college. From tech fests to cultural nights, never miss a moment.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/events">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 30px rgba(34, 211, 238, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-slate-900 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
                >
                  Explore Events
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-lg font-medium text-lg"
                >
                  For Organizers
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={imageVariants}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="absolute w-full h-full bg-gradient-to-tr from-purple-600/30 to-cyan-600/30 rounded-full filter blur-2xl"></div>

            <img
              src="/hero.png"
              alt="Students engaging at a campus event"
              className="relative z-10 w-full max-w-lg mx-auto object-cover opacity-90
                   [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
                   [filter:saturate(1.1)contrast(1.1)]"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}