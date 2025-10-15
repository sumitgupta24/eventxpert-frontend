import { motion } from "framer-motion";

const links = [
  { name: "Events", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

const authLinks = [
    { name: "Login", href: "#" },
    { name: "Sign Up", href: "#" },
];

const socialIcons = [
  {
    name: "Twitter",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
    ),
  },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-900"
    >
      {/* Glowing top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo + Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                📅 EventXpert
            </h3>
            <p className="text-sm text-slate-400">
              The all-in-one platform for intelligent campus event management.
            </p>
          </div>
          
          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                    <h3 className="text-sm font-semibold leading-6 text-white">Platform</h3>
                    <ul className="mt-6 space-y-4">
                        {links.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="text-sm leading-6 text-slate-400 hover:text-cyan-400 transition-colors">
                                {link.name}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-10 md:mt-0">
                    <h3 className="text-sm font-semibold leading-6 text-white">Account</h3>
                    <ul className="mt-6 space-y-4">
                        {authLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="text-sm leading-6 text-slate-400 hover:text-cyan-400 transition-colors">
                                {link.name}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                    <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
                     <div className="mt-6 space-y-4 text-sm text-slate-400">
                        <p>+91 7061935850</p>
                        <p>eventxpert@gmail.com</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800 pt-8 sm:mt-20 lg:mt-24 flex items-center justify-between">
            <p className="text-xs leading-5 text-slate-500">
                &copy; 2025 EventXpert. All rights reserved.
            </p>
            <div className="flex space-x-6">
                {socialIcons.map((item) => (
                    <a key={item.name} href={item.href} className="text-slate-500 hover:text-cyan-400 transition-colors">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </motion.footer>
  );
}