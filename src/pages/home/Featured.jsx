import { Link } from "react-router";
import { ArrowRight, Heart, Users, Lightbulb } from "lucide-react";
import { motion as Motion } from "motion/react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Support Our Campaigns",
      desc: "Join our ongoing initiatives to raise awareness and funds for critical medical needs in your local community.",
      icon: <Users className="text-red-600" size={32} />,
      image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1616&auto=format&fit=crop",
      link: "/donation-requests",
      primary: false
    },
    {
      title: "Did You Know?",
      desc: "One pint of blood can save up to three lives. Most people between 17 and 65 years old can give blood.",
      icon: <Lightbulb className="text-white" size={32} />,
      image: "https://images.unsplash.com/photo-1668168550143-86c1136b2443?q=80&w=735&auto=format&fit=crop",
      link: "/about",
      primary: true
    },
    {
      title: "Success Stories",
      desc: "Hear from recipients whose lives were transformed by the selfless acts of donors like you. Real people, real impact.",
      icon: <Heart className="text-red-600" size={32} />,
      image: "https://i.pinimg.com/736x/12/ad/4b/12ad4b65d54aa54981a93d60f39c1017.jpg",
      link: "/stories",
      primary: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto mt-32 px-4 mb-32">
      <div className="text-center mb-20">
        <Motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter"
        >
          MAKING AN <span className="text-red-500 underline decoration-red-200 underline-offset-8">IMPACT</span>
        </Motion.h2>
        <Motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium"
        >
          Discover how our platform simplifies the donation process and powers the connection between donors and those in need.
        </Motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <Motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${
              feature.primary 
                ? "bg-red-600 text-white border-red-500 shadow-2xl shadow-red-200 dark:shadow-none" 
                : "bg-red-50/40 dark:bg-gray-900 border-red-100/50 dark:border-gray-800 shadow-xl hover:shadow-2xl"
            }`}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${feature.primary ? "bg-white/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
              </div>

              <p className={`text-lg mb-8 leading-relaxed ${feature.primary ? "text-red-50" : "text-gray-600 dark:text-gray-400"}`}>
                {feature.desc}
              </p>

              <Link
                to={feature.link}
                className={`inline-flex items-center gap-2 font-bold group/link ${
                  feature.primary ? "text-white" : "text-red-600"
                }`}
              >
                Explore Now 
                <ArrowRight className="transition-transform group-hover/link:translate-x-2" size={20} />
              </Link>
            </div>
            
            {feature.primary && (
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                Essential
              </div>
            )}
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
