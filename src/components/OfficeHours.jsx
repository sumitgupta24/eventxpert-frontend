import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function OfficeHours() {
  // Animation variant for fading in on scroll
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    viewport: { once: true, amount: 0.3 }
  };

  // Data for office hours for easier maintenance
  const hoursData = [
    { day: "Monday - Friday", time: "9am - 5pm", isOpen: true },
    { day: "Saturday", time: "10am - 2pm", isOpen: true },
    { day: "Sunday", time: "Closed", isOpen: false },
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 h-full"
    >
      <h3 className="text-2xl font-bold text-white mb-8">Office Hours</h3>
      <div className="space-y-4">
        {hoursData.map((item) => (
          <div key={item.day} className="flex justify-between items-center text-slate-300">
            <div className="flex items-center gap-3">
              <Clock className={item.isOpen ? "text-cyan-400" : "text-slate-600"} size={18} />
              <span>{item.day}</span>
            </div>
            <span className={`font-medium ${item.isOpen ? 'text-white' : 'text-red-400/90'}`}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}