import { motion } from "framer-motion";
import { CalendarCog, Users, QrCode } from "lucide-react";

// Feature data updated with professional icons and descriptions
const features = [
  {
    Icon: CalendarCog,
    title: "AI Event Scheduling",
    description: "Our smart algorithm suggests optimal event times and dates based on campus-wide availability and student traffic patterns.",
  },
  {
    Icon: Users,
    title: "Seamless Collaboration",
    description: "A centralized dashboard for organizers, volunteers, and faculty to manage tasks, budgets, and communication in real-time.",
  },
  {
    Icon: QrCode,
    title: "Digital QR Registration",
    description: "Generate unique QR codes for instant, touchless check-ins, attendance tracking, and secure access control.",
  },
];

// Animation variants for the container and individual cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="relative bg-slate-900 py-24 sm:py-32">
      {/* Decorative Background Gradient */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-slate-900 to-transparent opacity-50"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-base font-semibold leading-7 text-cyan-400"
          >
            Smarter, Faster, Better
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Everything you need for successful events
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-slate-400"
          >
            Our platform is packed with powerful features designed to eliminate hassle and elevate the event experience for everyone.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="relative flex flex-col p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-colors duration-300"
              >
                <dt className="flex-auto text-base leading-7 text-slate-300">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500">
                    <feature.Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-white">{feature.title}</span>
                  <br />
                  {feature.description}
                </dt>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}