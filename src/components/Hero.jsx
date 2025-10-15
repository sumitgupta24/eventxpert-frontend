import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    // FIX: Use min-h-screen to prevent overflow and add padding for spacing.
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white pt-32 pb-20">
      {/* Background Gradient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-cyan-900 via-slate-900 to-purple-900 rounded-full filter blur-3xl opacity-50"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        {/* Main Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
        >
          <span className="block">Your Campus, Your Events,</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mt-2">
            <Typewriter
              words={[
                "One Smart Platform",
                "AI-Powered Events",
                "Seamless Collaboration",
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } },
          }}
          className="mt-6 text-lg text-slate-400 max-w-2xl"
        >
          Revolutionize college event management with AI-powered registration,
          real-time analytics, and seamless QR code integration.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } },
          }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px rgba(34, 211, 238, 0.6)", // Cyan glow
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-lg font-bold text-lg"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-8 py-3 bg-transparent border border-slate-700 text-slate-300 rounded-lg font-medium text-lg"
          >
            Request a Demo
          </motion.button>
        </motion.div>

        {/* Image with Glow */}
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.6 } },
            }}
            className="mt-16 w-full max-w-4xl"
        >
            <div className="relative [filter:drop-shadow(0_0_2rem_rgba(34,211,238,0.3))]">
                 <img
                    src="/hero.png" // Replace with a screenshot of your app, preferably with a dark theme
                    alt="Smart Events Platform"
                    className="rounded-xl w-full border border-slate-700/50"
                />
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
}