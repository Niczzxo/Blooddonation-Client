import { Link } from 'react-router';
import { motion as Motion } from "motion/react";
import { Droplets, HandHeart, UserPlus, Search, MessageSquarePlus, Activity, HelpCircle, Send } from "lucide-react";

const ExtraSections = () => {
    return (
        <div className="space-y-32 mb-32">

            {/* Hero Section - Elite Visuals */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-rose-600 dark:bg-rose-900/20 group">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400 rounded-full blur-[120px] opacity-20 animate-pulse duration-700"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
                            DONATE <span className="text-rose-200 decoration-8 underline underline-offset-8">BLOOD</span>
                            <br />
                            SAVE <span className="text-white">LIVES</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-rose-100 dark:text-rose-200/80 mb-12 max-w-3xl mx-auto font-medium leading-relaxed italic">
                            Every drop you share is a pulse that keeps a heart beating. <br className="hidden md:block" /> Be the hero someone is praying for.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link 
                                to="/register" 
                                className="btn h-auto py-5 px-12 bg-white text-rose-700 hover:bg-rose-50 border-none rounded-[2rem] font-black text-xl shadow-2xl shadow-rose-900/40 transition-all hover:scale-110 active:scale-95"
                            >
                                <HandHeart className="text-2xl" />
                                Start Donating
                            </Link>
                            <Link 
                                to="/donation-requests" 
                                className="btn h-auto py-5 px-12 bg-transparent text-white hover:bg-white/10 border-4 border-white/30 rounded-[2rem] font-black text-xl transition-all hover:scale-110 active:scale-95"
                            >
                                <Search className="text-xl" />
                                Search Donors
                            </Link>
                        </div>
                    </Motion.div>
                </div>
            </section>

            {/* Quick Statistics - Glassmorphism */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Total Donors", value: "12,580+", suffix: "Heroic Souls", icon: UserPlus, color: "rose" },
                        { label: "Lives Saved", value: "45,000+", suffix: "Happy Families", icon: HandHeart, color: "blue" },
                        { label: "Requests", value: "8,720+", suffix: "Fulfilled Daily", icon: HandHeart, color: "emerald" },
                        { label: "Campaigns", value: "150+", suffix: "Active Weekly", icon: Activity, color: "amber" },
                    ].map((stat, i) => (
                        <Motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-gray-900/50 rounded-[2.5rem] p-10 border border-rose-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all group"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-rose-100 dark:bg-gray-800 flex items-center justify-center text-rose-600 mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                                <stat.icon size={28} />
                            </div>
                            <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">{stat.value}</h3>
                            <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-4">{stat.label}</p>
                            <p className="text-sm text-gray-500 font-bold">{stat.suffix}</p>
                        </Motion.div>
                    ))}
                </div>
            </section>

            {/* Steps - How It Works */}
            <section className="container mx-auto px-6 overflow-hidden">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 px-4">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
                            SIMPLE <span className="text-rose-600">PROCESS</span>
                        </h2>
                        <p className="text-xl text-gray-500 font-medium italic">Saving a life shouldn't be complicated. Here's how we do it.</p>
                    </div>
                    <div className="h-1 bg-rose-600 w-32 rounded-full mb-4 md:mb-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
                    {[
                        { step: "01", title: "Join Us", desc: "Create your unique donor profile in seconds.", icon: UserPlus },
                        { step: "02", title: "Find Needs", desc: "Search for urgent blood requests nearby.", icon: Search },
                        { step: "03", title: "Connect", desc: "Live chat with recipients and confirm.", icon: HandHeart },
                        { step: "04", title: "Donate", desc: "Make your donation and save a life.", icon: HandHeart },
                    ].map((item, i) => (
                        <Motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group p-10 md:p-12 bg-rose-50/30 dark:bg-gray-900/30 border-b md:border-b-0 md:border-r border-rose-100 dark:border-gray-800 last:border-0 hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-all cursor-default"
                        >
                            <span className="text-8xl font-black text-rose-100 dark:text-gray-800 absolute top-4 right-4 z-0 group-hover:scale-125 transition-transform duration-700 group-hover:text-rose-200 dark:group-hover:text-gray-700">{item.step}</span>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-8 shadow-xl shadow-rose-200 dark:shadow-none">
                                    <item.icon />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            </section>

            {/* Blood Types & Compatibility - Premium Table */}
            <section className="bg-gray-50 dark:bg-gray-950 py-32 border-y border-rose-100 dark:border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 leading-none">
                            BLOOD <span className="text-rose-600">COMPATIBILITY</span>
                        </h2>
                        <div className="h-2 w-32 bg-rose-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="max-w-5xl mx-auto overflow-hidden rounded-[3rem] shadow-3xl border border-rose-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="bg-rose-600 text-white border-none">
                                    <th className="py-10 px-12 text-xl font-black uppercase tracking-[0.2em] text-left">Your Type</th>
                                    <th className="py-10 px-12 text-xl font-black uppercase tracking-[0.2em] text-left">Can Receive From</th>
                                    <th className="py-10 px-12 text-xl font-black uppercase tracking-[0.2em] text-left">Can Donate To</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-rose-50 dark:divide-gray-800">
                                {[
                                    { type: "O-", receive: "O-", donate: "Everyone (Universal Donor)" },
                                    { type: "O+", receive: "O+, O-", donate: "O+, A+, B+, AB+" },
                                    { type: "A-", receive: "A-, O-", donate: "A+, A-, AB+, AB-" },
                                    { type: "A+", receive: "A+, A-, O+, O-", donate: "A+, AB+" },
                                    { type: "B-", receive: "B-, O-", donate: "B+, B-, AB+, AB-" },
                                    { type: "B+", receive: "B+, B-, O+, O-", donate: "B+, AB+" },
                                    { type: "AB-", receive: "AB-, A-, B-, O-", donate: "AB+, AB-" },
                                    { type: "AB+", receive: "Everyone", donate: "AB+ (Universal Recipient)" },
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-rose-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-8 px-12">
                                            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/40 rounded-2xl flex items-center justify-center text-3xl font-black text-rose-600 shadow-inner ring-4 ring-rose-100/20">{item.type}</div>
                                        </td>
                                        <td className="py-8 px-12 font-bold text-gray-800 dark:text-gray-200 text-lg uppercase tracking-tight">{item.receive}</td>
                                        <td className="py-8 px-12 font-bold text-gray-800 dark:text-gray-200 text-lg uppercase tracking-tight">{item.donate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Testimonials - Mosaic Layout */}
            <section className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-20">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-rose-600 mb-6 px-1">Success Stories</span>
                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-8">
                        LIVES WE&apos;VE <span className="text-rose-600 underline decoration-rose-200">CHANGED</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Rakib Hossain", role: "Volunteer Donor", quote: "My first donation was nervous, but knowing it save 2 lives made it the most amazing feeling in the world." },
                        { name: "Fatema Khatun", role: "Mother & Recipient", quote: "We found blood in time through this platform when everything seemed lost. It gave my family a second chance." },
                        { name: "Saiful Islam", role: "Elite Member", quote: "RedPulse has transformed how our community views blood donation. It&apos;s now a way of life for all of us." },
                    ].map((t, i) => (
                        <Motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-12 rounded-[3rem] bg-rose-50/50 dark:bg-gray-900 border border-rose-100 dark:border-gray-800 shadow-xl group"
                        >
                            <div className="flex gap-1 mb-8 text-rose-600">
                                {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                            </div>
                            <p className="text-xl italic font-bold text-gray-800 dark:text-gray-200 mb-10 leading-relaxed font-sans group-hover:text-rose-600 transition-colors">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">{t.name.charAt(0)}</div>
                                <div>
                                    <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{t.name}</h4>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ - Modern Accordion */}
            <section className="bg-rose-600 dark:bg-rose-950 py-32 overflow-hidden relative">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
                    {Array.from({length: 20}).map((_, i) => (
                        <div key={i} className="absolute text-white font-black text-9xl uppercase tracking-tighter opacity-10 whitespace-nowrap" style={{
                            top: `${i * 10}%`,
                            left: `${(i % 2) * -50}%`,
                            animation: `marquee ${20 + i * 5}s linear infinite`
                        }}>QUESTIONS QUESTIONS QUESTIONS QUESTIONS</div>
                    ))}
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                    <div className="text-center mb-16">
                        <HelpCircle className="text-white text-6xl mx-auto mb-8 animate-bounce" />
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">GOT QUESTIONS?</h2>
                        <p className="text-rose-100 font-bold uppercase tracking-widest">Everything you need to know before you donate</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "What are the eligibility criteria for blood donation?", a: "You must be between 18-65 years old, weigh at least 50kg, and be in good general health without recent illnesses." },
                            { q: "How often can I donate blood safely?", a: "Men can donate every 3 months, and women can donate every 4 months to allow the body to replenish iron stores." },
                            { q: "Is the blood donation process painful or unsafe?", a: "Not at all. We use sterile, disposable equipment for every donation, and you'll only feel a quick pinch." },
                        ].map((item, i) => (
                            <div key={i} className="collapse collapse-plus bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl group">
                                <input type="radio" name="faq-accordion" defaultChecked={i === 0} className="peer" />
                                <div className="collapse-title text-2xl font-black uppercase tracking-tight py-8 px-10 group-hover:bg-white/5 transition-colors peer-checked:text-rose-200">
                                    {item.q}
                                </div>
                                <div className="collapse-content px-10 pb-8">
                                    <p className="text-lg font-bold text-rose-100/90 leading-relaxed max-w-2xl">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter - Elite Call to Action */}
            <section className="container mx-auto px-6">
                <div className="bg-rose-50/50 dark:bg-gray-900 rounded-[3rem] p-12 md:p-24 border border-rose-100 dark:border-gray-800 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 p-20 opacity-5 -rotate-12 group-hover:scale-110 transition-transform duration-1000">
                        <HandHeart size={400} />
                    </div>
                    
                    <div className="relative z-10 max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-rose-600 mb-6 block">Stay Informed</span>
                        <h2 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-10">
                            NEVER MISS <br /> <span className="text-rose-600">AN UPDATE</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-500 font-bold mb-16 italic">Join our list for urgent alerts, community campaigns, and expert donation tips.</p>
                        
                        <form className="flex flex-col sm:flex-row gap-6" onSubmit={e => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your elite email"
                                className="flex-1 h-20 bg-white dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-3xl px-10 font-bold text-xl focus:outline-none focus:ring-4 focus:ring-rose-500/20 transition-all shadow-xl dark:shadow-none"
                            />
                            <button className="h-20 px-12 bg-rose-600 hover:bg-rose-700 text-white rounded-3xl font-black uppercase tracking-widest flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-rose-200 dark:shadow-none">
                                Subscribe
                                <Send />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-40 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-50 dark:bg-rose-950/20 blur-[150px] opacity-20 animate-pulse"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-7xl md:text-[10rem] font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-12">
                        EVERY <span className="text-rose-600">DROP</span> <br /> COUNTS
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-500 font-medium mb-20 max-w-2xl mx-auto italic leading-relaxed">
                        Be the reason someone smiles today. Join the REDPULSE community and ignite the chain of life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        <Link 
                            to="/register" 
                            className="btn h-auto py-6 px-16 bg-rose-600 hover:bg-rose-700 text-white border-none rounded-[2.5rem] font-black text-2xl shadow-3xl shadow-rose-200 dark:shadow-none transition-all hover:scale-110 active:scale-95 flex items-center gap-4"
                        >
                            Become a Hero
                            <Motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>❤️</Motion.span>
                        </Link>
                        <Link 
                            to="/donation-requests" 
                            className="btn h-auto py-6 px-16 bg-transparent text-gray-900 dark:text-white hover:bg-rose-50 border-4 border-rose-600 rounded-[2.5rem] font-black text-2xl transition-all hover:scale-110 active:scale-95"
                        >
                            Request Aid
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExtraSections;
