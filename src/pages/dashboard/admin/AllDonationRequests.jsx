import React, { useEffect, useState, use, useCallback } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Eye, Check, X, Calendar, MapPin, Hospital, Clock, Droplets, User, MoreVertical } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const AllDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const limit = 10;
    const axiosSecure = useAxiosSecure();
    const { role } = use(AuthContext);

    const fetchRequests = useCallback(async () => {
        try {
            const res = await axiosSecure.get(
                `/requests/all?status=${filter}&page=${page}&limit=${limit}`
            );
            setRequests(res.data.requests);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load requests");
        }
    }, [filter, page, axiosSecure, limit]);

    useEffect(() => {
        const loadRequests = async () => {
            await fetchRequests();
        };
        loadRequests();
    }, [fetchRequests]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/requests/${id}/status`, { status: newStatus });
            toast.success(`Status updated to ${newStatus}`);
            fetchRequests();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

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
                    await axiosSecure.delete(`/requests/${id}`);
                    Swal.fire("Deleted!", "Request has been deleted.", "success");
                    fetchRequests();
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Delete failed.", "error");
                }
            }
        });
    };

    return (
        <div className="min-h-screen p-4 md:p-10">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase text-center w-full">
                    ALL BLOOD <span className="text-rose-600">REQUESTS</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">Manage all donation requests</p>
                <div className="h-1.5 w-24 bg-rose-600 mx-auto rounded-full mt-6"></div>
            </div>

            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
                    <button 
                        key={status}
                        onClick={() => { setFilter(status); setPage(1); }} 
                        className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            filter === status 
                            ? "bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-none scale-105" 
                            : "bg-rose-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-rose-100 dark:border-gray-800"
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="hidden lg:block overflow-hidden rounded-[2.5rem] shadow-2xl border border-rose-100 dark:border-gray-800 bg-rose-50/50 dark:bg-gray-950">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-rose-600 text-white border-none">
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">Recipient</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">Location</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">Schedule</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">Blood</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">Status</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rose-100 dark:divide-gray-800">
                            {requests.map((req) => (
                                <tr key={req._id} className="hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                                    <td className="p-8">
                                        <div>
                                            <div className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tighter">{req.recipient_name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">Requester: {req.requester_name}</div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="font-bold text-gray-900 dark:text-gray-200 uppercase tracking-tight text-sm">
                                            {req.recipient_district}, {req.recipient_upazila}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{req.hospital_name}</div>
                                    </td>
                                    <td className="p-8">
                                        <div className="font-bold text-gray-900 dark:text-gray-200 text-sm">
                                            {new Date(req.donation_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{req.donation_time}</div>
                                    </td>
                                    <td className="p-8">
                                        <span className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-black">{req.blood_group}</span>
                                    </td>
                                    <td className="p-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            req.donation_status === "pending" ? "bg-amber-100 text-amber-700" :
                                            req.donation_status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                            req.donation_status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                        }`}>
                                            {req.donation_status}
                                        </span>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex justify-center gap-4 text-gray-400">
                                            <Link to={`/donation-requests/${req._id}`} className="hover:text-rose-600 transition-colors"><Eye className="text-xl" /></Link>
                                            {role === "admin" && (
                                                <>
                                                    {req.donation_status === "pending" && (
                                                        <Link to={`/dashboard/edit-request/${req._id}`} className="hover:text-rose-600 transition-colors"><Pencil className="text-xl" /></Link>
                                                    )}
                                                    <button onClick={() => handleDelete(req._id)} className="hover:text-rose-600 transition-colors"><Trash2 className="text-xl" /></button>
                                                </>
                                            )}
                                            <div className="dropdown dropdown-end">
                                                <label tabIndex={0} className="hover:text-rose-600 cursor-pointer p-1">
                                                    <MoreVertical className="text-xl" />
                                                </label>
                                                <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl w-56 border border-rose-100 dark:border-gray-800 z-50">
                                                    <li className="menu-title text-xs font-black uppercase tracking-[0.2em] mb-2 px-4 py-2 border-b border-rose-50 dark:border-gray-800">Update Status</li>
                                                    <li><button onClick={() => handleStatusChange(req._id, "pending")} className="font-bold flex items-center justify-between">Pending <div className="w-2 h-2 rounded-full bg-amber-400"></div></button></li>
                                                    <li><button onClick={() => handleStatusChange(req._id, "inprogress")} className="font-bold flex items-center justify-between">In Progress <div className="w-2 h-2 rounded-full bg-blue-400"></div></button></li>
                                                    <li><button onClick={() => handleStatusChange(req._id, "done")} className="font-bold flex items-center justify-between">Done <div className="w-2 h-2 rounded-full bg-emerald-400"></div></button></li>
                                                    <li><button onClick={() => handleStatusChange(req._id, "canceled")} className="font-bold flex items-center justify-between text-rose-600">Canceled <div className="w-2 h-2 rounded-full bg-rose-600"></div></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden grid gap-8">
                {requests.map((req) => (
                    <div key={req._id} className="bg-rose-50/50 dark:bg-gray-900 rounded-[2rem] shadow-xl border border-rose-100 dark:border-gray-800 overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="font-black text-2xl text-gray-900 dark:text-white uppercase tracking-tighter mb-1">{req.recipient_name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold tracking-tight">Requester: {req.requester_name}</p>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    req.donation_status === "pending" ? "bg-amber-100 text-amber-700" :
                                    req.donation_status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                    req.donation_status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                }`}>
                                    {req.donation_status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-rose-50/50 dark:bg-gray-800 rounded-xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Location</p>
                                    <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">{req.recipient_district}, {req.recipient_upazila}</p>
                                    <p className="text-[10px] text-gray-500 font-bold mt-1 truncate">{req.hospital_name}</p>
                                </div>
                                <div className="p-4 bg-rose-50/50 dark:bg-gray-800 rounded-xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Schedule</p>
                                    <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">{new Date(req.donation_date).toLocaleDateString()}</p>
                                    <p className="text-[10px] text-gray-500 font-bold mt-1">{req.donation_time}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Blood</p>
                                    <span className="px-3 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-black">{req.blood_group}</span>
                                </div>
                                <div className="flex gap-4 text-gray-400">
                                    <Link to={`/donation-requests/${req._id}`} className="hover:text-rose-600 transition-colors"><Eye size={22} /></Link>
                                    {role === "admin" && (
                                        <>
                                            <Link to={`/dashboard/edit-request/${req._id}`} className="hover:text-rose-600 transition-colors"><Pencil size={22} /></Link>
                                            <button onClick={() => handleDelete(req._id)} className="hover:text-rose-600 transition-colors"><Trash2 size={22} /></button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="dropdown dropdown-top w-full">
                                <label tabIndex={0} className="btn btn-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-none rounded-xl font-bold">Change Status</label>
                                <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl w-full border border-rose-100 dark:border-gray-800 z-50 mb-4">
                                    <li><button onClick={() => handleStatusChange(req._id, "pending")} className="font-bold mb-2">Pending</button></li>
                                    <li><button onClick={() => handleStatusChange(req._id, "inprogress")} className="font-bold mb-2">In Progress</button></li>
                                    <li><button onClick={() => handleStatusChange(req._id, "done")} className="font-bold mb-2">Done</button></li>
                                    <li><button onClick={() => handleStatusChange(req._id, "canceled")} className="text-rose-600 font-bold">Canceled</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-12 text-center items-center">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="btn btn-circle bg-rose-50 dark:bg-gray-900 border-rose-100 dark:border-gray-800 disabled:opacity-30"
                >
                    ←
                </button>
                <div className="flex items-center px-6 bg-rose-50 dark:bg-gray-900 rounded-full font-black text-gray-500 uppercase tracking-widest text-xs h-12">
                    Page {page}
                </div>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={requests.length < limit}
                    className="btn btn-circle bg-rose-50 dark:bg-gray-900 border-rose-100 dark:border-gray-800 disabled:opacity-30"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default AllDonationRequests;
