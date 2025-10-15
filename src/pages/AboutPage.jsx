import { motion } from "framer-motion";
import Footer from "../components/Footer"; // Assuming Footer is in the components folder
import { Target, Rocket, Lightbulb } from "lucide-react"; // Using professional icons

const coreValues = [
  {
    Icon: Target,
    title: "Our Mission",
    text: "To revolutionize how colleges organize, manage, and experience events through cutting-edge technology and intuitive design.",
  },
  {
    Icon: Rocket,
    title: "Our Vision",
    text: "A world where every college event is seamlessly organized, highly engaging, and accessible to all students.",
  },
  {
    Icon: Lightbulb,
    title: "Our Values",
    text: "Innovation, accessibility, community building, and empowering students to create memorable experiences.",
  },
];

const timelineData = [
  {
    year: "2021",
    title: "Vision Born",
    description: "Conceived the idea of a centralized, intelligent platform to solve the chaos of college event management.",
  },
  {
    year: "2022",
    title: "Platform Development",
    description: "Assembled a passionate team and built the core infrastructure with a focus on scalability and user experience.",
  },
  {
    year: "2023",
    title: "Beta Launch",
    description: "Launched with 10,000+ students across 50+ colleges, gathering crucial feedback and iterating rapidly.",
  },
  {
    year: "2025",
    title: "Nationwide Expansion",
    description: "Today, we're scaling to 100+ colleges, fostering a connected and vibrant student community across India.",
  },
];

export default function AboutPage() {
  // Animation variant for fading in elements on scroll
  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <div className="bg-slate-900 text-white pt-28">
      {/* Page Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 sm:px-6 md:px-16"
      >
        <motion.h1
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
        >
          About SmartEvents
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          className="mt-6 max-w-3xl mx-auto text-lg text-slate-400"
        >
          We're a team of innovators, thinkers, and creators, passionate about transforming the future of college events through technology.
        </motion.p>
      </motion.header>

      {/* Mission, Vision, Values Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                className="relative p-8 bg-slate-900/50 border border-slate-800 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500">
                    <item.Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-slate-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline Section */}
      <section className="relative overflow-hidden py-24">
         {/* Decorative Background Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 rounded-full filter blur-3xl opacity-30"></div>

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <motion.h2 variants={fadeUp} initial="initial" whileInView="whileInView" className="text-4xl sm:text-5xl font-extrabold text-center mb-20 text-white">
                Our Journey
            </motion.h2>
            
            {/* Timeline */}
            <div className="relative">
                {/* Center Line */}
                <div className="absolute left-4 md:left-1/2 top-2 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>

                <div className="space-y-16">
                    {timelineData.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        initial="initial"
                        whileInView="whileInView"
                        className={`relative flex items-start gap-6 md:gap-12 ${
                            index % 2 !== 0 ? "md:flex-row-reverse" : ""
                        }`}
                    >
                        {/* Dot */}
                        <div className="absolute left-4 md:left-1/2 top-2 w-4 h-4 -translate-x-1/2 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.7)] z-10"></div>
                        
                        {/* Card */}
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl w-full md:w-[calc(50%-2rem)] hover:border-cyan-500/50 transition-colors duration-300">
                            <p className="text-2xl font-bold text-cyan-400">{item.year}</p>
                            <h4 className="text-xl font-semibold mt-1 text-white">{item.title}</h4>
                            <p className="mt-2 text-slate-400">{item.description}</p>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}