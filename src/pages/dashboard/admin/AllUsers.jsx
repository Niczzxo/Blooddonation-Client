import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaEllipsisV, FaUserShield, FaUserCheck, FaBan, FaUnlock } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("all");
    const axiosSecure = useAxiosSecure();

    const fetchUsers = useCallback(async () => {
        try {
            const res = await axiosSecure.get("/users");
            setUsers(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load users");
        }
    }, [axiosSecure]);

    useEffect(() => {
        const loadUsers = async () => {
            await fetchUsers();
        };
        loadUsers();
    }, [fetchUsers]);

    const handleStatusChange = async (email, newStatus) => {
        try {
            await axiosSecure.patch(`/update/user/status?email=${email}&status=${newStatus}`);
            toast.success(`User ${newStatus === "active" ? "unblocked" : "blocked"}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Failed!");
        }
    };

    const handleRoleChange = async (email, newRole) => {
        try {
            await axiosSecure.patch(`/update/user/role?email=${email}&role=${newRole}`);
            toast.success(`User is now ${newRole}!`);
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role");
        }
    };

    const filteredUsers = users.filter((user) => {
        if (filter === "all") return true;
        return user.status?.toLowerCase() === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-4">
                    ALL <span className="text-red-600">USERS</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600">Manage donors, volunteers & admins</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
                <button onClick={() => setFilter("all")} className={`btn btn-md md:btn-lg rounded-full ${filter === "all" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white border border-gray-300"} shadow-md`}>
                    All ({users.length})
                </button>
                <button onClick={() => setFilter("active")} className={`btn btn-md md:btn-lg rounded-full ${filter === "active" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-white border border-gray-300"} shadow-md`}>
                    Active
                </button>
                <button onClick={() => setFilter("blocked")} className={`btn btn-md md:btn-lg rounded-full ${filter === "blocked" ? "bg-gray-800 hover:bg-gray-900 text-white" : "bg-white border border-gray-300"} shadow-md`}>
                    Blocked
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-red-600 to-rose-600">
                    <h2 className="text-3xl font-bold text-white text-center">User Management</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-800 text-left text-sm uppercase tracking-wider">
                                <th className="p-6">User</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-all border-b border-gray-100">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-14 h-14 rounded-full ring-4 ring-red-600 ring-offset-2">
                                                    <img
                                                        src={user?.mainPhotoUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=ef4444&color=fff`}
                                                        alt="avatar"
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{user?.name || "N/A"}</div>
                                                <div className="text-sm text-gray-500">{user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-gray-700 font-medium">{user?.name || "N/A"}</td>
                                    <td>
                                        <span className={`badge ${user.role === "admin" ? "bg-yellow-500 text-white" : user.role === "volunteer" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${user.status === "active" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-gray-100">
                                                <FaEllipsisV size={20} />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-white rounded-2xl w-64 border border-gray-200 z-50">
                                                {user.role === "donor" && (
                                                    <li><button onClick={() => handleRoleChange(user.email, "volunteer")} className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white w-full"><FaUserCheck /> Make Volunteer</button></li>
                                                )}
                                                {(user.role === "donor" || user.role === "volunteer") && (
                                                    <li><button onClick={() => handleRoleChange(user.email, "admin")} className="btn btn-sm bg-yellow-600 hover:bg-yellow-700 text-white w-full"><FaUserShield /> Make Admin</button></li>
                                                )}
                                                {user.status === "active" ? (
                                                    <li><button onClick={() => handleStatusChange(user.email, "blocked")} className="btn btn-sm bg-red-600 hover:bg-red-700 text-white w-full"><FaBan /> Block User</button></li>
                                                ) : (
                                                    <li><button onClick={() => handleStatusChange(user.email, "active")} className="btn btn-sm bg-green-600 hover:bg-green-700 text-white w-full"><FaUnlock /> Unblock User</button></li>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-4">
                            <h3 className="text-xl font-bold text-white text-center">User Profile</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="avatar">
                                        <div className="w-20 h-20 rounded-full ring-4 ring-red-600 ring-offset-2">
                                            <img
                                                src={user?.mainPhotoUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=ef4444&color=fff`}
                                                alt="avatar"
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl text-gray-900">{user?.name || "N/A"}</div>
                                        <div className="text-gray-600">{user?.email}</div>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-left w-full">
                                    <label tabIndex={0} className="text-end w-full">
                                        <FaEllipsisV size={20} />
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-white rounded-2xl w-full border border-gray-200 z-50">
                                        {user.role === "donor" && (
                                            <li><button onClick={() => handleRoleChange(user.email, "volunteer")} className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white w-full mb-2"><FaUserCheck /> Make Volunteer</button></li>
                                        )}
                                        {(user.role === "donor" || user.role === "volunteer") && (
                                            <li><button onClick={() => handleRoleChange(user.email, "admin")} className="btn btn-sm bg-yellow-600 hover:bg-yellow-700 text-white w-full mb-2"><FaUserShield /> Make Admin</button></li>
                                        )}
                                        {user.status === "active" ? (
                                            <li><button onClick={() => handleStatusChange(user.email, "blocked")} className="btn btn-sm bg-red-600 hover:bg-red-700 text-white w-full mb-2"><FaBan /> Block User</button></li>
                                        ) : (
                                            <li><button onClick={() => handleStatusChange(user.email, "active")} className="btn btn-sm bg-green-600 hover:bg-green-700 text-white w-full mb-2"><FaUnlock /> Unblock User</button></li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <span className={`badge ${user.role === "admin" ? "bg-yellow-500 text-white" : user.role === "volunteer" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"}`}>
                                        {user.role}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className={`badge ${user.status === "active" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;