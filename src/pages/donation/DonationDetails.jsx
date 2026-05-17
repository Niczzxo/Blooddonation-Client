import { use, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/common/Loading";
import { Heart, MapPin, Hospital, Calendar, Clock, MessageSquare, Droplets, ArrowLeft, Check } from "lucide-react";

const DonationDetails = () => {
    const { user, loading: authLoading } = use(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
            return;
        }
        axiosSecure.get(`/requests/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to load request");
                setLoading(false);
            });
    }, [id, user, axiosSecure, authLoading, navigate]);

    const handleDonate = () => {
        axiosSecure.patch(`/requests/${id}/donate`, {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: "inprogress"
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setRequest({
                        ...request,
                        donation_status: "inprogress",
                        donorName: user.displayName,
                        donorEmail: user.email
                    });
                    setShowModal(false);
                    toast.success("Thank you! Your donation is confirmed.");
                }
            })
            .catch(() => {
                toast.error("Failed to confirm donation");
            });
    };

    if (loading) return <Loading />;
    if (!request) return <div className="text-center py-24 text-rose-600 font-black text-3xl">Request not found!</div>;

    return (
        <div className="min-h-screen p-4 md:p-10 pb-24">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                   <button 
                        onClick={() => navigate(-1)} 
                        className="group flex items-center gap-3 text-gray-500 hover:text-rose-600 font-black uppercase tracking-widest text-xs transition-all"
                    >
                        <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-gray-900 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                            <ArrowLeft />
                        </div>
                        Go Back
                    </button>
                </div>

                <div className="bg-rose-50/50 dark:bg-gray-900 rounded-[3rem] shadow-2xl border border-rose-100 dark:border-gray-800 p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative Background Icon */}
                    <Heart className="absolute -top-10 -right-10 text-rose-100 dark:text-gray-800 text-[15rem] -rotate-12 opacity-50" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-4">
                                    DONATION <span className="text-rose-600">DETAILS</span>
                                </h1>
                                <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                                    request.donation_status === "pending" ? "bg-amber-100 text-amber-700" :
                                    request.donation_status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                    request.donation_status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                }`}>
                                    {request.donation_status} Status
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 bg-rose-600 rounded-[2.5rem] shadow-2xl shadow-rose-200 dark:shadow-none text-white ring-8 ring-rose-50 dark:ring-gray-800">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Blood Group</span>
                                <span className="text-4xl md:text-5xl font-black">{request.blood_group}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Left Column */}
                            <div className="space-y-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 mb-4">Patient Information</p>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{request.recipient_name}</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-gray-800 flex items-center justify-center text-rose-600 flex-shrink-0">
                                            <MapPin />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Location</p>
                                            <p className="font-bold text-gray-800 dark:text-gray-200">{request.recipient_district}, {request.recipient_upazila}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-gray-800 flex items-center justify-center text-rose-600 flex-shrink-0">
                                            <Hospital />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Hospital</p>
                                            <p className="font-bold text-gray-800 dark:text-gray-200">{request.hospital_name}</p>
                                            <p className="text-xs text-gray-500 font-medium mt-1">{request.full_address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 mb-4">Donation Schedule</p>
                                    <div className="flex flex-wrap gap-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-gray-800 flex items-center justify-center text-rose-600 flex-shrink-0">
                                                <Calendar />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Date</p>
                                                <p className="font-bold text-gray-800 dark:text-gray-200">{request.donation_date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-gray-800 flex items-center justify-center text-rose-600 flex-shrink-0">
                                                <Clock />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Time</p>
                                                <p className="font-bold text-gray-800 dark:text-gray-200">{request.donation_time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 mb-4">Request Message</p>
                                    <div className="p-6 bg-rose-50 dark:bg-gray-950 rounded-[2rem] border border-rose-100 dark:border-gray-800 italic text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                        &ldquo;{request.request_message}&rdquo;
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 pt-10 border-t border-rose-100 dark:border-gray-800 flex justify-center">
                            {request.donation_status === "pending" && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn h-auto py-5 px-12 bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl shadow-xl shadow-rose-200 dark:shadow-none font-black text-xl flex items-center gap-4 transition-all hover:scale-110"
                                >
                                    <Droplets size={24} />
                                    I want to save this life
                                </button>
                            )}

                            {request.donation_status === "inprogress" && (
                                <div className="w-full max-w-xl bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/20 text-center">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-200 dark:shadow-none">
                                        <Clock size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-blue-900 dark:text-blue-100 uppercase tracking-tighter mb-2">Donation In Progress</h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-bold mb-6 italic">&ldquo;Heroic act by {request.donorName}&rdquo;</p>
                                    <p className="text-blue-500/80 text-sm font-medium">Contact: {request.donorEmail}</p>
                                </div>
                            )}

                            {request.donation_status === "done" && (
                                <div className="w-full max-w-xl bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/20 text-center">
                                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-emerald-200 dark:shadow-none">
                                        <Check size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-tighter mb-2">Life Saved!</h3>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-bold italic">This request has been successfully fulfilled.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 bg-gray-950/40 backdrop-blur-md">
                    <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-3xl p-10 max-w-md w-full border border-rose-100 dark:border-gray-800 scale-100 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-[1.5rem] flex items-center justify-center text-rose-600 mb-8 mx-auto shadow-inner">
                            <Heart size={40} className="animate-pulse" />
                        </div>
                        <h3 className="text-3xl font-black text-center mb-4 text-gray-900 dark:text-white uppercase tracking-tighter">Are you sure?</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-10 leading-relaxed">
                            You are about to commit to helping <span className="text-rose-600 font-black tracking-normal uppercase">{request.recipient_name}</span>. This is a life-saving action.
                        </p>
                        
                        <div className="space-y-4">
                            <button
                                onClick={handleDonate}
                                className="w-full btn h-auto py-5 bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl shadow-xl shadow-rose-200 dark:shadow-none font-black text-xl transition-all h-20"
                            >
                                Confirm Donation
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full btn h-auto py-5 bg-rose-50 dark:bg-gray-800 hover:bg-rose-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-none rounded-2xl font-black text-xl h-20"
                            >
                                I'll do it later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationDetails;
