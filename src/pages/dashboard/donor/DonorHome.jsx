import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { 
    Heart, 
    Calendar, 
    MapPin, 
    ArrowRight, 
    Clock, 
    Activity,
    Plus,
    ClipboardList,
    Droplets
} from "lucide-react";
import { motion as Motion } from "motion/react";

const DonorHome = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [recentRequests, setRecentRequests] = useState([]);

    useEffect(() => {
        axiosSecure.get("/my-request?size=3")
            .then(res => setRecentRequests(res.data.request || []));
    }, [axiosSecure]);

    return (
        <div className="p-4 md:p-10 space-y-10 max-w-6xl mx-auto">
            {/* Hero Welcome */}
            <Motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-red-50/50 dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-red-100 dark:border-gray-800 shadow-2xl shadow-red-100 dark:shadow-none"
            >
                <div className="absolute top-0 right-0 p-12 opacity-5 hidden md:block">
                    <Heart size={200} className="text-red-600" />
                </div>
                
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
                        Welcome back, <span className="text-red-600 uppercase">{user?.displayName}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-xl leading-relaxed">
                        Your commitment to saving lives is truly heroic. Thank you for being a part of our life-saving network.
                    </p>
                    
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link 
                            to="/dashboard/create-donation-request" 
                            className="btn h-auto py-4 px-8 bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl shadow-xl shadow-red-200 dark:shadow-none font-black text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                        >
                            <Plus size={20} strokeWidth={3} />
                            Create Request
                        </Link>
                        <Link 
                            to="/profile" 
                            className="btn h-auto py-4 px-8 bg-red-50 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-none rounded-2xl font-black text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                        >
                            <Activity size={20} className="text-red-600" />
                            View Stats
                        </Link>
                    </div>
                </div>
            </Motion.div>

            {/* Quick Stats Placeholder or Recent Activity */}
            {recentRequests.length > 0 ? (
                <Motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                            <ClipboardList className="text-red-600" />
                            Recent Requests
                        </h2>
                        <Link to="/dashboard/my-donation-requests" className="text-red-600 font-black flex items-center gap-2 hover:underline">
                            View All
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentRequests.map((req, idx) => (
                            <Motion.div 
                                key={req._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="bg-red-50/50 dark:bg-gray-900 rounded-[2.5rem] border border-red-100 dark:border-gray-800 p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600 font-black text-xl shadow-inner">
                                        {req.blood_group}
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                                        req.donation_status === "pending" ? "bg-amber-100 text-amber-700" :
                                        req.donation_status === "inprogress" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                                    }`}>
                                        {req.donation_status}
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 truncate group-hover:text-red-600 transition-colors">
                                    {req.recipient_name}
                                </h3>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-bold text-sm">
                                        <MapPin size={16} className="text-red-500" />
                                        {req.recipient_district}, {req.recipient_upazila}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-bold text-sm">
                                        <Calendar size={16} />
                                        {req.donation_date}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-bold text-sm">
                                        <Clock size={16} />
                                        {req.donation_time}
                                    </div>
                                </div>

                                <Link 
                                    to={`/donation-requests/${req._id}`} 
                                    className="w-full btn h-auto py-3 bg-red-50 dark:bg-gray-950 group-hover:bg-red-600 text-gray-600 dark:text-white group-hover:text-white border-none rounded-xl font-black transition-all flex items-center justify-center gap-2"
                                >
                                    Details
                                    <ArrowRight size={16} />
                                </Link>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>
            ) : (
                <Motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center py-24 bg-red-50/50 dark:bg-gray-900 rounded-[3rem] border border-dashed border-red-200 dark:border-gray-800 shadow-xl"
                >
                    <div className="bg-red-50 dark:bg-red-900/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Droplets size={40} className="text-red-600" />
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Ready to Save Lives?</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 max-w-md mx-auto">You haven&apos;t created any donation requests yet. Start your journey by creating one today.</p>
                    <Link 
                        to="/dashboard/create-donation-request" 
                        className="btn h-auto py-4 px-12 bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl shadow-xl shadow-red-200 dark:shadow-none font-black text-xl inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                    >
                        <Plus size={24} strokeWidth={3} />
                        First Request
                    </Link>
                </Motion.div>
            )
}
        </div>
    );
};

export default DonorHome;
