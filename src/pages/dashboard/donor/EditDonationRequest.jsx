import { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading";
import { User, Droplets, MapPin, Hospital, Calendar, Clock, MessageSquare } from "lucide-react";
import axios from "axios";

const EditDonationRequest = () => {
    const { user, role } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");

    useEffect(() => {
        axios.get("/districts.json").then(res => setDistricts(res.data.districts || []));
        axios.get("/upazilas.json").then(res => setUpazilas(res.data.upazilas || []));
    }, []);

    useEffect(() => {
        if (!user) return;
        axiosSecure.get(`/requests/${id}`)
            .then(res => {
                const data = res.data;
                if (data.requester_email !== user.email && role !== "admin") {
                    toast.error("You are not allowed to edit this request");
                    navigate(role === "admin"
                        ? "/dashboard/all-donation-requests"
                        : "/dashboard/my-donation-requests"
                    );
                    return;
                }

                setRequest(data);
                setDistrict(data.recipient_district || "");
                setUpazila(data.recipient_upazila || "");
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load request");
                navigate("/dashboard/my-donation-requests");
            });
    }, [id, user, axiosSecure, navigate, role]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            recipient_name: form.recipient_name.value,
            hospital_name: form.hospital_name.value,
            full_address: form.full_address.value,
            recipient_district: district,
            recipient_upazila: upazila,
            donation_date: form.date.value,
            donation_time: form.time.value,
            request_message: form.message.value,
            blood_group: form.blood_group.value,
        };

        axiosSecure.patch(`/requests/${id}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Request updated successfully!");
                    navigate(role === "admin"
                        ? "/dashboard/all-donation-requests"
                        : "/dashboard/my-donation-requests");
                } else {
                    toast.error("No changes detected or update failed");
                }
            })
            .catch(err => {
                console.error("Update error:", err);
                toast.error("Update failed");
            });
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen p-4 md:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase text-center w-full">
                        EDIT <span className="text-rose-600">REQUEST</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium tracking-tight">Update your life-saving request details</p>
                    <div className="h-1.5 w-24 bg-rose-600 mx-auto rounded-full mt-6"></div>
                </div>

                <div className="bg-rose-50/50 dark:bg-gray-900 rounded-[3rem] shadow-2xl border border-rose-100 dark:border-gray-800 p-8 md:p-12">
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Requester Info Section */}
                        <div className="md:col-span-2 bg-rose-100/30 dark:bg-gray-950 rounded-[2rem] p-8 border border-rose-100 dark:border-gray-800">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 dark:shadow-none">
                                    <User className="text-white" />
                                </div>
                                <h3 className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tighter">Requester Info</h3>
                             </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">Full Name</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">{user?.displayName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">Email Address</p>
                                    <p className="font-bold text-gray-900 dark:text-white truncate">{user?.email}</p>
                                </div>
                             </div>
                        </div>

                        {/* Recipient Name */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Recipient Name</label>
                            <input
                                name="recipient_name"
                                defaultValue={request?.recipient_name}
                                required
                                className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                placeholder="Patient Full Name"
                            />
                        </div>

                        {/* Blood Group */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Blood Group</label>
                            <div className="relative group">
                                <Droplets className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-600 text-xl group-focus-within:scale-110 transition-transform" />
                                <select
                                    name="blood_group"
                                    defaultValue={request?.blood_group}
                                    className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 pl-16 font-black text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                    required
                                >
                                    <option value="" disabled className="bg-white dark:bg-gray-900">Select blood group</option>
                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                        <option key={bg} value={bg} className="bg-white dark:bg-gray-900 font-bold">{bg}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* District Selection */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">District</label>
                            <div className="relative group">
                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-600 text-xl group-focus-within:scale-110 transition-transform" />
                                <select
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 pl-16 font-black text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                    required
                                >
                                    <option value="" disabled className="bg-white dark:bg-gray-900 tracking-normal">Select District</option>
                                    {districts.map(d => <option key={d.id} value={d.name} className="bg-white dark:bg-gray-900 font-bold">{d.name}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Upazila Selection */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Upazila</label>
                            <div className="relative group">
                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-600 text-xl group-focus-within:scale-110 transition-transform" />
                                <select
                                    value={upazila}
                                    onChange={(e) => setUpazila(e.target.value)}
                                    className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 pl-16 font-black text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                    required
                                >
                                    <option value="" disabled className="bg-white dark:bg-gray-900">Select Upazila</option>
                                    {upazilas.map(u => <option key={u.id} value={u.name} className="bg-white dark:bg-gray-900 font-bold">{u.name}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Hospital Name */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Hospital Name</label>
                            <div className="relative group">
                                <Hospital className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-600 text-xl group-focus-within:scale-110 transition-transform" />
                                <input
                                    name="hospital_name"
                                    defaultValue={request?.hospital_name}
                                    required
                                    className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 pl-16 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                    placeholder="Medical Center Name"
                                />
                            </div>
                        </div>

                        {/* Full Address */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Full Address</label>
                            <input
                                name="full_address"
                                defaultValue={request?.full_address}
                                required
                                className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                placeholder="Street, Building, Flat"
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Donation Date</label>
                            <div className="relative group">
                                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-600 text-xl group-focus-within:scale-110 transition-transform" />
                                <input
                                    name="date"
                                    type="date"
                                    defaultValue={request?.donation_date}
                                    required
                                    className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 pl-16 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Donation Time</label>
                            <div className="relative group">
                                <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-600 text-xl group-focus-within:scale-110 transition-transform" />
                                <input
                                    name="time"
                                    type="time"
                                    defaultValue={request?.donation_time}
                                    required
                                    className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-2xl p-4 pl-16 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all h-16"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Request Message</label>
                            <div className="relative group">
                                <MessageSquare className="absolute left-6 top-6 text-rose-600 text-xl group-focus-within:scale-110 transition-transform" />
                                <textarea
                                    name="message"
                                    rows="5"
                                    defaultValue={request?.request_message}
                                    required
                                    className="w-full bg-rose-50/20 dark:bg-gray-950 border border-rose-100 dark:border-gray-800 rounded-[2rem] p-8 pl-16 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none"
                                    placeholder="Explain why blood is needed..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-8">
                            <button 
                                type="submit" 
                                className="flex-1 btn h-auto py-5 bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl shadow-xl shadow-rose-200 dark:shadow-none font-black text-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Update Request
                            </button>
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)} 
                                className="sm:w-1/3 btn h-auto py-5 bg-rose-50 dark:bg-gray-800 hover:bg-rose-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-none rounded-2xl font-black text-xl transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDonationRequest;
