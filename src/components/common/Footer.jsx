import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Droplets, ArrowRight } from "lucide-react";
import { motion as Motion } from "motion/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 pt-24 pb-12 overflow-hidden border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 dark:shadow-none transition-transform group-hover:scale-110">
                  <Droplets className="text-white" size={28} />
                </div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                    RED<span className="text-rose-500">PULSE</span>
                </h1>
            </Link>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Empowering heroes through a seamless blood donation network. Every drop you share is a pulse that keeps someone's heart beating.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <Motion.a 
                    key={idx}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="#" 
                    className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all shadow-sm"
                >
                    <Icon size={20} />
                </Motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8 px-1">Navigation</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Requests", path: "/donation-requests" },
                { name: "Donors", path: "/search" },
                { name: "Funding", path: "/funding" },
                { name: "Dashboard", path: "/dashboard" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-rose-600 font-bold transition-all"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8 px-1">Headquarters</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-xl text-rose-600">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">Emergency 24/7</p>
                  <p className="text-gray-900 dark:text-white font-black text-lg">+880 1234 567890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl text-blue-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">Support Email</p>
                  <p className="text-gray-900 dark:text-white font-black">hello@redpulse.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl text-emerald-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">Location</p>
                  <p className="text-gray-900 dark:text-white font-black">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-rose-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Become a Hero Today</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Join over 10,000 donors who are making a difference every single day.</p>
              </div>
              <Link 
                to="/register" 
                className="w-full btn h-auto py-4 bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl font-black text-lg shadow-lg shadow-rose-200 dark:shadow-none flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95"
              >
                Join Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            © {currentYear} <span className="text-rose-500 font-black tracking-tighter">REDPULSE</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
