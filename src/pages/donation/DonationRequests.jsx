import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/common/Loading";
import { MapPin, Hospital, Calendar, Heart, ArrowRight } from "lucide-react";
import { motion as Motion } from "motion/react";

const DonationRequests = () => {
    const axiosPublic = useAxios();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get("/requests/pending")
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [axiosPublic]);

    return (
        <div className="max-w-7xl mx-auto py-20 px-4 min-h-screen">
            <div className="text-center mb-20">
                <Motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase"
                >
                    URGENT <span className="text-rose-600">REQUESTS</span>
                </Motion.h2>
                <div className="h-2 w-32 bg-rose-600 mx-auto rounded-full mb-8"></div>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
                    Humanity's greatest strength is our willingness to help one another. <br className="hidden md:block" /> Every second counts in saving a life.
                </p>
            </div>

            {loading ? (
                <Loading />
            ) : requests.length === 0 ? (
                <Motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-24 bg-rose-50/50 dark:bg-gray-900 rounded-[4rem] border border-dashed border-rose-200 dark:border-gray-800 shadow-2xl"
                >
                    <div className="bg-rose-50 dark:bg-rose-900/10 rounded-full w-32 h-32 mx-auto mb-10 flex items-center justify-center text-rose-600 shadow-inner">
                      <Heart size={56} className="animate-pulse" />
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">At Peace for Now</h3>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-12 font-medium">
                        There are currently no urgent pending requests. Thank you for checking in on our community.
                    </p>
                    <Link
                        to="/dashboard/create-donation-request"
                        className="btn h-auto px-12 py-5 bg-rose-600 hover:bg-rose-700 text-white border-none rounded-[2rem] font-black text-xl shadow-xl shadow-rose-200 dark:shadow-none transition-transform hover:scale-105 active:scale-95"
                    >
                        Need Help? Create Request
                    </Link>
                </Motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {requests.map((req, idx) => (
                        <Motion.div 
                            key={req._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-rose-50/50 dark:bg-gray-900 rounded-[3rem] shadow-xl border border-rose-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02]"
                        >
                            <div className="bg-rose-600 p-10 text-center relative overflow-hidden h-48 flex flex-col items-center justify-center">
                                <Motion.div 
                                    className="absolute -top-10 -right-10 text-white/10 group-hover:scale-125 transition-transform duration-700"
                                    initial={{ rotate: -15 }}
                                >
                                  <Heart size={200} fill="currentColor" />
                                </Motion.div>
                                <p className="text-7xl font-black text-white relative z-10 tracking-tighter">{req.blood_group}</p>
                                <p className="text-[10px] text-white/80 uppercase tracking-[0.3em] font-black mt-3 relative z-10">Live Request</p>
                            </div>
                            
                            <div className="p-10">
                                <h3 className="font-black text-3xl text-gray-900 dark:text-white mb-8 group-hover:text-rose-600 transition-colors uppercase tracking-tight">
                                  {req.recipient_name}
                                </h3>
                                
                                <div className="space-y-6 mb-10">
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                      <div className="w-12 h-12 bg-rose-50 dark:bg-gray-800 rounded-2xl text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-500 shadow-sm"><MapPin size={22} /></div>
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Location</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-200">{req.recipient_district}, {req.recipient_upazila}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                      <div className="w-12 h-12 bg-rose-50 dark:bg-gray-800 rounded-2xl text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-500 shadow-sm"><Hospital size={22} /></div>
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Hospital</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-200 truncate max-w-[200px]">{req.hospital_name || "Private"}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                      <div className="w-12 h-12 bg-rose-50 dark:bg-gray-800 rounded-2xl text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-500 shadow-sm"><Calendar size={22} /></div>
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Schedule</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-200">{req.donation_date} at {req.donation_time}</span>
                                      </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/donation-requests/${req._id}`}
                                    className="w-full btn h-auto py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white border-none rounded-2xl shadow-xl font-black text-xl flex items-center justify-center gap-4 transition-all group/btn"
                                >
                                    View Details
                                    <ArrowRight className="transition-transform group-hover/btn:translate-x-2" size={24} />
                                </Link>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationRequests;
