import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../../components/common/Loading";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Eye, Edit, Trash2 } from "lucide-react";

const MyDonationRequests = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const itemsPerPage = 10;

    useEffect(() => {
        if (!user) return;

        axiosSecure.get("/my-request", {
            params: { page: currentPage - 1, size: itemsPerPage, status: filter === "all" ? "" : filter }
        })
            .then(res => {
                setRequests(res.data.request);
                setTotal(res.data.totalReqest);
            })
            .catch(() => toast.error("Failed to load"));
    }, [currentPage, filter, axiosSecure, user]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/requests/${id}`);

                    if (res.data.deletedCount === 1) {
                        Swal.fire(
                            "Deleted!",
                            "Your request has been deleted.",
                            "success"
                        );

                        setRequests(prev => prev.filter(r => r._id !== id));
                        setTotal(prev => prev - 1);
                    } else {
                        Swal.fire(
                            "Failed!",
                            "Not authorized or request not found.",
                            "error"
                        );
                    }
                } catch (err) {
                    console.log(err);
                    Swal.fire(
                        "Error!",
                        "Delete failed.",
                        "error"
                    );
                }
            }

        });
    };


    const totalPages = Math.ceil(total / itemsPerPage);

    if (authLoading) return <Loading />;

    return (
        <div className="p-4 md:p-10 my-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-4">My <span className="text-rose-600">Requests</span></h2>
                <div className="h-1.5 w-24 bg-rose-600 mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {["all", "pending", "inprogress", "done", "canceled"].map(status => (
                    <button
                        key={status}
                        onClick={() => { setFilter(status); setCurrentPage(1); }}
                        className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === status
                            ? "bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-none scale-105"
                            : "bg-rose-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-rose-100 dark:hover:bg-gray-800"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="block lg:hidden">
                {requests.length === 0 ? (
                    <div className="text-center py-20 bg-rose-50/50 dark:bg-gray-900 rounded-[2.5rem] border border-dashed border-rose-200 dark:border-gray-800">
                        <p className="text-xl font-bold text-gray-500">No requests found</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {requests.map((req) => (
                            <div key={req._id} className="bg-rose-50/50 dark:bg-gray-900 rounded-[2rem] shadow-xl p-8 border border-rose-100 dark:border-gray-800">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="font-black text-2xl text-gray-900 dark:text-white uppercase tracking-tighter">{req.recipient_name}</h3>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        req.donation_status === "pending" ? "bg-amber-100 text-amber-700" :
                                        req.donation_status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                        req.donation_status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                    }`}>
                                        {req.donation_status}
                                    </span>
                                </div>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                                    <p className="flex items-center gap-3"><span className="text-xs font-black uppercase tracking-widest text-gray-400 w-24 shrink-0">Location:</span> {req.recipient_district}, {req.recipient_upazila}</p>
                                    <p className="flex items-center gap-3"><span className="text-xs font-black uppercase tracking-widest text-gray-400 w-24 shrink-0">Hospital:</span> {req.hospital_name}</p>
                                    <p className="flex items-center gap-3"><span className="text-xs font-black uppercase tracking-widest text-gray-400 w-24 shrink-0">Schedule:</span> {req.donation_date} | {req.donation_time}</p>
                                    <p className="flex items-center gap-3"><span className="text-xs font-black uppercase tracking-widest text-gray-400 w-24 shrink-0">Blood:</span> <span className="text-rose-600 font-black">{req.blood_group}</span></p>
                                </div>
                                <div className="mt-8 flex gap-4">
                                    <Link to={`/donation-requests/${req._id}`} className="btn flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold"><Eye className="text-xl" /> View</Link>
                                    {req.donation_status === "pending" && (
                                        <>
                                            <Link to={`/dashboard/edit-request/${req._id}`} className="btn flex-1 bg-rose-50 dark:bg-gray-800 text-rose-600 border-rose-100 dark:border-gray-700 rounded-xl font-bold"><Edit className="text-lg" /> Edit</Link>
                                            <button onClick={() => handleDelete(req._id)} className="btn bg-rose-100 dark:bg-rose-900/30 text-rose-600 border-none rounded-xl"><Trash2 className="text-2xl" /></button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden lg:block overflow-hidden rounded-[2.5rem] shadow-2xl border border-rose-100 dark:border-gray-800">
                <table className="table w-full">
                    <thead className="bg-rose-600 text-white border-none">
                        <tr className="border-none">
                            <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-left">#</th>
                            <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-left">Recipient</th>
                            <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-left">Location</th>
                            <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-left">Schedule</th>
                            <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-left">Blood</th>
                            <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-left">Status</th>
                            <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-rose-50/30 dark:bg-gray-950">
                        {requests.map((req, idx) => (
                            <tr key={req._id} className="border-rose-100 dark:border-gray-800 hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                                <td className="py-6 px-8 font-bold text-gray-400">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                <td className="py-6 px-8 font-bold text-gray-900 dark:text-white uppercase tracking-tighter">{req.recipient_name}</td>
                                <td className="py-6 px-8 text-gray-600 dark:text-gray-400 font-medium">{req.recipient_district}, {req.recipient_upazila}</td>
                                <td className="py-6 px-8 text-gray-600 dark:text-gray-400 font-medium">{req.donation_date}<br /><span className="text-xs font-bold text-gray-400">{req.donation_time}</span></td>
                                <td className="py-6 px-8"><span className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-black">{req.blood_group}</span></td>
                                <td className="py-6 px-8">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                                        req.donation_status === "pending" ? "bg-amber-100 text-amber-700" :
                                        req.donation_status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                        req.donation_status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                    }`}>
                                        {req.donation_status}
                                    </span>
                                </td>
                                <td className="py-6 px-8">
                                    <div className="flex justify-center gap-4 text-gray-400">
                                        <Link to={`/donation-requests/${req._id}`} className="hover:text-rose-600 transition-colors"><Eye className="text-2xl" /></Link>
                                        {req.donation_status === "pending" && (
                                            <>
                                                <Link to={`/dashboard/edit-request/${req._id}`} className="hover:text-rose-600 transition-colors"><Edit className="text-xl" /></Link>
                                                <button onClick={() => handleDelete(req._id)} className="hover:text-rose-600 transition-colors"><Trash2 className="text-2xl" /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-12">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-circle bg-rose-50 dark:bg-gray-900 border-rose-100 dark:border-gray-800 disabled:opacity-30"
                >
                    ←
                </button>
                {[...Array(totalPages || 1)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-12 h-12 rounded-full font-black transition-all ${currentPage === i + 1 
                            ? "bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-none scale-110" 
                            : "bg-rose-50 dark:bg-gray-900 text-gray-400 hover:text-rose-600"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
                    disabled={currentPage === (totalPages || 1)}
                    className="btn btn-circle bg-rose-50 dark:bg-gray-900 border-rose-100 dark:border-gray-800 disabled:opacity-30"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default MyDonationRequests;