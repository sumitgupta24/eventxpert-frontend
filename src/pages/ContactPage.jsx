import { motion } from "framer-motion";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import OfficeHours from "../components/OfficeHours";

// --- Main Contact Page ---
export default function ContactPage() {
  // Animation variant for fading in elements on scroll
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    viewport: { once: true, amount: 0.3 }
  };

  return (
    <div className="relative bg-slate-900 text-white pt-28 min-h-screen overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Left Column: Contact Form */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp}
          >
            <ContactForm />
          </motion.div>
          
          {/* Right Column: Info and Hours */}
          <div className="flex flex-col gap-8">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp}
            >
              <ContactInfo />
            </motion.div>
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp}
            >
              <OfficeHours />
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}