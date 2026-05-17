import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { MoreVertical, ShieldCheck, UserCheck, Ban, Unlock } from "lucide-react";
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
        <div className="min-h-screen p-4 md:p-10">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase">
                    ALL <span className="text-rose-600">USERS</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">Manage donors, volunteers & admins</p>
                <div className="h-1.5 w-24 bg-rose-600 mx-auto rounded-full mt-6"></div>
            </div>

            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {["all", "active", "blocked"].map(s => (
                    <button 
                        key={s}
                        onClick={() => setFilter(s)} 
                        className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            filter === s 
                            ? "bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-none scale-105" 
                            : "bg-rose-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-rose-100 dark:border-gray-800"
                        }`}
                    >
                        {s} {s === "all" ? `(${users.length})` : ""}
                    </button>
                ))}
            </div>

            <div className="hidden lg:block overflow-hidden rounded-[2.5rem] shadow-2xl border border-rose-100 dark:border-gray-800 bg-rose-50/50 dark:bg-gray-950">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-rose-600 text-white border-none">
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">User Profile</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">Role</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-left">Status</th>
                                <th className="p-8 text-xs font-black uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rose-100 dark:divide-gray-800">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                                    <td className="p-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl ring-4 ring-rose-600/20 ring-offset-4 ring-offset-transparent overflow-hidden">
                                                <img
                                                    src={user?.mainPhotoUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=f43f5e&color=fff`}
                                                    alt="avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tighter">{user?.name || "N/A"}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">{user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            user.role === "admin" ? "bg-amber-100 text-amber-700" : 
                                            user.role === "volunteer" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-8">
                                        <div className="dropdown dropdown-end flex justify-center">
                                            <label tabIndex={0} className="btn btn-circle bg-rose-100/50 dark:bg-gray-800 border-none text-rose-600 hover:scale-110 transition-transform">
                                                <MoreVertical />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl w-64 border border-rose-100 dark:border-gray-800 z-50">
                                                <li className="menu-title text-xs font-black uppercase tracking-[0.2em] mb-2 px-4 py-2 border-b border-rose-50 dark:border-gray-800">Change Role</li>
                                                {user.role === "donor" && (
                                                    <li><button onClick={() => handleRoleChange(user.email, "volunteer")} className="hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 font-bold"><UserCheck /> Make Volunteer</button></li>
                                                )}
                                                {(user.role === "donor" || user.role === "volunteer") && (
                                                    <li><button onClick={() => handleRoleChange(user.email, "admin")} className="hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 font-bold"><ShieldCheck /> Make Admin</button></li>
                                                )}
                                                <li className="menu-title text-xs font-black uppercase tracking-[0.2em] mt-4 mb-2 px-4 py-2 border-b border-rose-50 dark:border-gray-800">Status Control</li>
                                                {user.status === "active" ? (
                                                    <li><button onClick={() => handleStatusChange(user.email, "blocked")} className="hover:bg-rose-100 dark:hover:bg-rose-900/20 text-rose-600 font-bold"><Ban /> Block User</button></li>
                                                ) : (
                                                    <li><button onClick={() => handleStatusChange(user.email, "active")} className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 font-bold"><Unlock /> Unblock User</button></li>
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
            <div className="lg:hidden grid gap-8">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-rose-50/50 dark:bg-gray-900 rounded-[2rem] shadow-xl border border-rose-100 dark:border-gray-800 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl ring-4 ring-rose-600/20 ring-offset-4 ring-offset-transparent overflow-hidden">
                                        <img
                                            src={user?.mainPhotoUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=f43f5e&color=fff`}
                                            alt="avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tighter">{user?.name || "N/A"}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 font-bold truncate max-w-[150px]">{user?.email}</div>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="hover:text-rose-600 p-2">
                                        <MoreVertical size={20} />
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl w-64 border border-rose-100 dark:border-gray-800 z-50">
                                        {user.role === "donor" && (
                                            <li><button onClick={() => handleRoleChange(user.email, "volunteer")} className="font-bold mb-2"><UserCheck /> Make Volunteer</button></li>
                                        )}
                                        {(user.role === "donor" || user.role === "volunteer") && (
                                            <li><button onClick={() => handleRoleChange(user.email, "admin")} className="font-bold mb-2"><ShieldCheck /> Make Admin</button></li>
                                        )}
                                        {user.status === "active" ? (
                                            <li><button onClick={() => handleStatusChange(user.email, "blocked")} className="text-rose-600 font-bold mb-2"><Ban /> Block User</button></li>
                                        ) : (
                                            <li><button onClick={() => handleStatusChange(user.email, "active")} className="text-emerald-600 font-bold mb-2"><Unlock /> Unblock User</button></li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 p-4 bg-rose-50 dark:bg-gray-800 rounded-xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Role</p>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                        user.role === "admin" ? "bg-amber-100 text-amber-700" : 
                                        user.role === "volunteer" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                    }`}>
                                        {user.role}
                                    </span>
                                </div>
                                <div className="flex-1 p-4 bg-rose-50 dark:bg-gray-800 rounded-xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Status</p>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                        user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                    }`}>
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