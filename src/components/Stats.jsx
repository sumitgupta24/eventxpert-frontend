import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, CalendarCheck, ShieldCheck } from "lucide-react";

// Updated stats data with Lucide icons
const statsData = [
  {
    Icon: Users,
    value: 50000, // Use numbers for animation
    label: "Active Students",
    suffix: "K+",
  },
  {
    Icon: CalendarCheck,
    value: 1000,
    label: "Events Hosted",
    suffix: "+",
  },
  {
    Icon: ShieldCheck,
    value: 99.9,
    label: "Uptime Guarantee",
    suffix: "%",
  },
];

// Reusable component for the animated number
function AnimatedNumber({ to, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(0, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(decimals);
          }
        },
      });
    }
  }, [isInView, to, decimals]);

  return (
    <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
      <span ref={ref}>0</span>{suffix}
    </h2>
  );
}

export default function Stats() {
  return (
    <section className="bg-slate-900 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row justify-around items-center text-center">
          {statsData.map((stat, index) => (
            <>
              <div key={stat.label} className="flex flex-col items-center py-8 md:py-0">
                <AnimatedNumber 
                    to={stat.value} 
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 1 : 0} // Add decimals for numbers like 99.9
                />
                <p className="mt-2 flex items-center gap-2 text-lg text-slate-400">
                  <stat.Icon className="h-5 w-5 text-cyan-500" />
                  {stat.label}
                </p>
              </div>

              {/* Fading gradient divider */}
              {index < statsData.length - 1 && (
                <div className="w-full h-px md:w-px md:h-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent md:bg-gradient-to-b"></div>
              )}
            </>
          ))}
        </div>
      </motion.div>
    </section>
  );
}