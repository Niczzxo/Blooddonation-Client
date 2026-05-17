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
            <div className="text-center mb-16">
                <Motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter"
                >
                    URGENT <span className="text-red-600">REQUESTS</span>
                </Motion.h2>
                <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full mb-6"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                    Every second counts. Browse active blood donation requests below and see how you can help today.
                </p>
            </div>

            {loading ? (
                <Loading />
            ) : requests.length === 0 ? (
                <Motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-red-50/50 dark:bg-gray-900 rounded-[3rem] p-12 border border-dashed border-red-200/50 dark:border-gray-800 shadow-xl"
                >
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center text-red-600">
                      <Heart size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Steady as a Breath</h3>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-10">
                        There are no urgent requests at this moment. You can still prepare for the next one.
                    </p>
                    <Link
                        to="/dashboard/create-donation-request"
                        className="btn h-auto px-10 py-4 bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl font-bold text-xl shadow-xl shadow-red-100 dark:shadow-none"
                    >
                        Create Your Request
                    </Link>
                </Motion.div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {requests.map((req, idx) => (
                        <Motion.div 
                            key={req._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group bg-red-50/50 dark:bg-gray-900 rounded-[2rem] shadow-xl border border-red-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
                        >
                            <div className="bg-red-600 p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                  <Heart size={80} strokeWidth={3} className="text-white" />
                                </div>
                                <p className="text-5xl font-black text-white relative z-10">{req.blood_group}</p>
                                <p className="text-sm text-red-100 uppercase tracking-widest font-black mt-2 relative z-10">Urgent Requirement</p>
                            </div>
                            <div className="p-8">
                                <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-6 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                                  {req.recipient_name}
                                </h3>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                      <div className="p-2 bg-red-50 dark:bg-gray-800 rounded-lg text-red-600"><MapPin size={18} /></div>
                                      <span className="font-medium">{req.recipient_district}, {req.recipient_upazila}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                      <div className="p-2 bg-red-50 dark:bg-gray-800 rounded-lg text-red-600"><Hospital size={18} /></div>
                                      <span className="font-medium truncate">{req.hospital_name || "Private Location"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                      <div className="p-2 bg-red-50 dark:bg-gray-800 rounded-lg text-red-600"><Calendar size={18} /></div>
                                      <span className="font-medium">{req.donation_date}</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/donation-requests/${req._id}`}
                                    className="btn btn-block h-auto py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white border-none rounded-2xl shadow-lg font-bold text-lg transition-all group/btn"
                                >

                                    Details 
                                    <ArrowRight className="transition-transform group-hover/btn:translate-x-2" />
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
