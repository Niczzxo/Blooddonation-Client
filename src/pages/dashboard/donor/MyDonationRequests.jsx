import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../../components/common/Loading";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { MdDeleteForever, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit, FiEdit2, FiEdit3 } from "react-icons/fi";
import { ImEye } from "react-icons/im";
import { FileEdit } from "lucide-react";

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
        <div className="p-4 md:p-8 my-10 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-red-600 font-bold text-center mb-8">My Donation Requests</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["all", "pending", "inprogress", "done", "canceled"].map(status => (
                    <button
                        key={status}
                        onClick={() => { setFilter(status); setCurrentPage(1); }}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === status
                            ? "bg-red-600 text-white shadow-lg"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            <div className="block lg:hidden">
                {requests.length === 0 ? (
                    <p className="text-center py-10 text-gray-500">No requests found</p>
                ) : (
                    <div className="space-y-4">
                        {requests.map((req,) => (
                            <div key={req._id} className="bg-white rounded-xl shadow-md p-5 border">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg">{req.recipient_name}</h3>
                                    <span className={`badge ${req.donation_status === "pending" ? "badge-warning" :
                                        req.donation_status === "inprogress" ? "badge-info" :
                                            req.donation_status === "done" ? "badge-success" : "badge-error"
                                        }`}>
                                        {req.donation_status}
                                    </span>
                                </div>
                                <div className="text-sm space-y-1 text-gray-600">
                                    <p><strong>Location:</strong> {req.recipient_district}, {req.recipient_upazila}</p>
                                    <p><strong>Hospital:</strong> {req.hospital_name}</p>
                                    <p><strong>Date:</strong> {req.donation_date} | <strong>Time:</strong> {req.donation_time}</p>
                                    <p><strong>Blood:</strong> <span className="text-red-600 font-bold">{req.blood_group}</span></p>
                                </div>
                                <div className="mt-4 flex gap-6">
                                    <Link to={`/donation-requests/${req._id}`}><MdOutlineRemoveRedEye className="text-2xl ml-2" />Veiw</Link>
                                    {req.donation_status === "pending" && (
                                        <div className="flex gap-6">
                                            <Link to={`/dashboard/edit-request/${req._id}`}><FileEdit className="text-md ml-1" />Edit</Link>
                                            <button onClick={() => handleDelete(req._id)}><MdDeleteForever className="text-2xl text-red-400 ml-2" />delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* dextop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-red-50">
                        <tr>
                            <th>#</th>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Blood</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, idx) => (
                            <tr key={req._id}>
                                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                <td className="font-medium">{req.recipient_name}</td>
                                <td>{req.recipient_district}, {req.recipient_upazila}</td>
                                <td>{req.donation_date}<br /><small>{req.donation_time}</small></td>
                                <td><span className="badge badge-error text-white">{req.blood_group}</span></td>
                                <td>
                                    <span className={`badge ${req.donation_status === "pending" ? "badge-warning font-bold p-3" :
                                        req.donation_status === "inprogress" ? "badge-info font-bold p-3" :
                                            req.donation_status === "done" ? "badge-success font-bold p-3" : "badge-error font-bold p-3"
                                        }`}>
                                        {req.donation_status}
                                    </span>
                                </td>
                                <td className="space-x-2 flex mt-2 text-center">
                                    <Link to={`/donation-requests/${req._id}`}><MdOutlineRemoveRedEye className="text-2xl" /></Link>
                                    {req.donation_status === "pending" && (
                                        <div className="flex gap-2">
                                            <Link to={`/dashboard/edit-request/${req._id}`}><FileEdit className="text-md" /></Link>
                                            <button onClick={() => handleDelete(req._id)}><MdDeleteForever className="text-2xl text-red-400" /></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`btn btn-outline ${currentPage === 1 ? 'btn-disabled' : ''}`}
                >
                    ← Prev
                </button>
                {[...Array(totalPages || 1)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`btn ${currentPage === i + 1 ? "bg-red-500 text-white font-bold" : "btn-outline"}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
                    disabled={currentPage === (totalPages || 1)}
                    className={`btn btn-outline ${currentPage === totalPages ? 'btn-disabled' : ''}`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default MyDonationRequests;