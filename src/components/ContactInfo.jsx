import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    viewport: { once: true, amount: 0.3 }
  };

  const contactItems = [
    {
      Icon: Mail,
      label: "Email",
      value: "eventxpertbusiness@gmail.com",
      href: "mailto:eventxpertbusiness@gmail.com"
    },
    {
      Icon: Phone,
      label: "Call Us",
      value: "+91 7061935850",
      href: "tel:+917061935850"
    },
    {
      Icon: MapPin,
      label: "Visit Us",
      value: "Vellore, Tamil Nadu, India",
    }
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 h-full"
    >
      <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
      <div className="space-y-6">
        {contactItems.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <item.Icon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="font-semibold text-white">{item.label}</p>
              {item.href ? (
                 <a href={item.href} className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {item.value}
                </a>
              ) : (
                <p className="text-slate-300">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}