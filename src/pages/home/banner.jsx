import { Link } from "react-router";
import slide1 from '../../assets/images/slide1.png';
import { motion as Motion } from "motion/react";
import { ArrowRight, HeartPulse } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative pt-12 pb-20 md:pt-20 md:pb-32 lg:pt-28 lg:pb-40 w-[95%] max-w-7xl mx-auto rounded-[3rem] shadow-2xl overflow-hidden 
    bg-gradient-to-br from-rose-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 border border-rose-100 dark:border-gray-800">

      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 left-10 text-rose-500 text-9xl blur-sm"
        >🩸</Motion.div>
        <Motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 right-20 text-rose-500 text-8xl blur-sm"
        >🩸</Motion.div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-16">

        <Motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 rounded-full text-sm font-bold tracking-widest uppercase mb-8">
            <HeartPulse size={16} />
            Every Drop Counts
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tighter">
            DONATE <span className="text-rose-500">BLOOD</span>
            <br />
            SAVE <span className="text-rose-500">LIVES</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Your single donation can save up to three lives. Join our community of heroes today and make an immediate impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="btn h-auto px-10 py-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white border-none shadow-xl shadow-rose-200 dark:shadow-none text-xl font-bold transition-all flex items-center gap-3"
              >
                Join as a Hero <ArrowRight />
              </Link>
            </Motion.div>

            <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/search"
                className="btn h-auto px-10 py-5 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-700 shadow-lg text-xl font-bold transition-all"
              >
                Find Donors
              </Link>
            </Motion.div>
          </div>
        </Motion.div>

        <Motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-end relative group"
        >
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-3xl group-hover:bg-rose-500/30 transition-colors"></div>
          <img 
            src={slide1} 
            alt="Hero Illustration" 
            className="relative z-10 max-w-full drop-shadow-2xl motion-safe:animate-pulse-slow" 
          />
        </Motion.div>
      </div>
    </div>
  );
};

export default Banner;
