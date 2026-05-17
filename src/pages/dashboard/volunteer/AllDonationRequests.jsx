import React, { useEffect, useState, use, useCallback } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
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
        <div className="min-h-screen bg-gray-50 p-4 md:p-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-4">
                    ALL BLOOD <span className="text-red-600">REQUESTS</span>
                </h1>
                <p className="text-lg text-gray-600">Manage all donation requests</p>
            </div>
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
                {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => {
                            setFilter(status);
                            setPage(1);
                        }}
                        className={`btn btn-md md:btn-lg rounded-full ${filter === status
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-white border border-gray-300"
                            } shadow-md`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            <div className="hidden md:block bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-red-600 to-red-700">
                    <h2 className="text-3xl font-bold text-white text-center">
                        Donation Requests Management
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-800 text-left text-sm uppercase tracking-wider">
                                <th className="p-6">Recipient</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Blood Group</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr
                                    key={req._id}
                                    className="hover:bg-gray-50 transition-all border-b border-gray-100"
                                >
                                    <td className="p-6">
                                        <div>
                                            <div className="font-bold text-gray-900">
                                                {req.recipient_name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Requester: {req.requester_name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-gray-700">
                                        {req.recipient_district}, {req.recipient_upazila}
                                        <br />
                                        <span className="text-sm text-gray-500">
                                            {req.hospital_name}
                                        </span>
                                    </td>
                                    <td className="text-gray-700">
                                        {new Date(req.donation_date).toLocaleDateString()}
                                        <br />
                                        <span className="text-sm">{req.donation_time}</span>
                                    </td>
                                    <td>
                                        <span className="badge bg-red-600 text-white">
                                            {req.blood_group}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${req.donation_status === "pending"
                                                ? "bg-orange-500"
                                                : req.donation_status === "inprogress"
                                                    ? "bg-blue-600"
                                                    : req.donation_status === "done"
                                                        ? "bg-green-600"
                                                        : "bg-gray-600"
                                                } text-white`}
                                        >
                                            {req.donation_status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-3">
                                            <Link to={`/donation-requests/${req._id}`} className="btn btn-ghost btn-sm text-info">
                                                <FaEye />
                                            </Link>
                                            {role === "admin" && (
                                                <>
                                                    {req.donation_status === "pending" && (
                                                        <Link to={`/dashboard/edit-request/${req._id}`} className="btn btn-ghost btn-sm text-warning">
                                                            <FaEdit />
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(req._id)}
                                                        className="btn btn-ghost btn-sm text-error"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </>
                                            )}
                                            <div className="dropdown dropdown-end">
                                                <label tabIndex={0} className="btn btn-ghost btn-sm">
                                                    <FaEllipsisVertical />
                                                </label>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                                >
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(req._id, "pending")
                                                            }
                                                        >
                                                            Pending
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(req._id, "inprogress")
                                                            }
                                                        >
                                                            In Progress
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => handleStatusChange(req._id, "done")}
                                                        >
                                                            <FaCheck /> Done
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(req._id, "canceled")
                                                            }
                                                        >
                                                            <FaTimes /> Cancel
                                                        </button>
                                                    </li>
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

            <div className="md:hidden space-y-6">
                {requests.map((req) => (
                    <div
                        key={req._id}
                        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-xl text-gray-900">
                                    {req.recipient_name}
                                </h3>
                                <p className="text-gray-600">
                                    Requester: {req.requester_name}
                                </p>
                            </div>
                            <span
                                className={`badge ${req.donation_status === "pending"
                                    ? "bg-orange-500"
                                    : req.donation_status === "inprogress"
                                        ? "bg-blue-600"
                                        : req.donation_status === "done"
                                            ? "bg-green-600"
                                            : "bg-gray-600"
                                    } text-white`}
                            >
                                {req.donation_status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                                <p className="text-gray-500">Location</p>
                                <p className="font-medium">
                                    {req.recipient_district}, {req.recipient_upazila}
                                </p>
                                <p className="text-gray-600">{req.hospital_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Date & Time</p>
                                <p className="font-medium">
                                    {new Date(req.donation_date).toLocaleDateString()}
                                </p>
                                <p>{req.donation_time}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Blood Group</p>
                                <p className="badge bg-red-600 text-white">{req.blood_group}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <button className="btn btn-sm btn-ghost text-info">
                                    <FaEye />
                                </button>
                                {role === "admin" && (
                                    <>
                                        <button className="btn btn-sm btn-ghost text-warning">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(req._id)}
                                            className="btn btn-sm btn-ghost text-error"
                                        >
                                            <FaTrash />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-sm">
                                    Change Status
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <button
                                            onClick={() => handleStatusChange(req._id, "pending")}
                                        >
                                            Pending
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleStatusChange(req._id, "inprogress")}
                                        >
                                            In Progress
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleStatusChange(req._id, "done")}>
                                            Done
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleStatusChange(req._id, "canceled")}
                                        >
                                            Canceled
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-10">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="btn btn-outline"
                >
                    Previous
                </button>
                <span className="btn btn-ghost">Page {page}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    className="btn btn-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllDonationRequests;