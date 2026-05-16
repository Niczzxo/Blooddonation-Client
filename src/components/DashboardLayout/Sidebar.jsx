import { Link, NavLink } from "react-router";
import { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
    Users,
    FileText,
    UserCircle,
    LogOut,
    PlusCircle,
    ListOrdered,
    Home,
    Menu,
    X,
    LayoutDashboard,
    ChevronRight,
    Droplets
} from "lucide-react";
import toast from "react-hot-toast";
import { motion as Motion, AnimatePresence } from "motion/react";

const Sidebar = () => {
    const { role, logOut } = use(AuthContext)
    const [open, setOpen] = useState(false);
    
    const navLinkStyles = ({ isActive }) =>
        `group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
            ? "bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-none font-bold scale-[1.02]"
            : "text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 font-medium"
        }`;

    const closeSidebar = () => setOpen(false);

    const handleLogOut = () => {
        logOut()
            .then(() => toast.success("Logout Successfully"))
            .catch(() => { });
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all text-gray-900 dark:text-white"
            >
                <Menu size={24} strokeWidth={2.5} />
            </button>

            <AnimatePresence>
                {open && (
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <div
                className={`h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col p-6 fixed lg:sticky top-0 left-0 z-50 transform transition-all duration-500 ease-out ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 shadow-2xl lg:shadow-none`}
            >
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 dark:shadow-none animate-pulse">
                            <Droplets className="text-white" size={24} />
                        </div>
                        <Link to="/" className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                            RED<span className="text-red-500">PULSE</span>
                        </Link>
                    </div>

                    <button onClick={closeSidebar} className="lg:hidden text-gray-400 hover:text-red-500 transition-colors">
                        <X size={24} strokeWidth={3} />
                    </button>
                </div>

                <nav className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">Main Dashboard</p>
                    <NavLink to={
                        role === "admin" ? "/dashboard/admin-home" :
                            role === "volunteer" ? "/dashboard/volunteer-home" :
                                "/dashboard/home"
                    } end className={navLinkStyles} onClick={closeSidebar}>
                        <div className="flex items-center gap-3">
                            <LayoutDashboard size={20} />
                            Overview
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>

                    {role === "admin" && (
                        <>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-8 mb-4 px-2">Administration</p>
                            <NavLink
                                to="/dashboard/all-users"
                                className={navLinkStyles}
                                onClick={closeSidebar}
                            >
                                <div className="flex items-center gap-3">
                                    <Users size={20} />
                                    User Management
                                </div>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </NavLink>
                        </>
                    )}

                    {(role === "admin" || role === "volunteer") && (
                        <NavLink
                            to="/dashboard/all-blood-donation-request"
                            className={navLinkStyles}
                            onClick={closeSidebar}
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={20} />
                                All Requests
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </NavLink>
                    )}

                    {role === "donor" && (
                        <>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-8 mb-4 px-2">Manage Donation</p>
                            <NavLink
                                to="/dashboard/my-donation-requests"
                                className={navLinkStyles}
                                onClick={closeSidebar}
                            >
                                <div className="flex items-center gap-3">
                                    <ListOrdered size={20} />
                                    My Requests
                                </div>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </NavLink>

                            <NavLink
                                to="/dashboard/create-donation-request"
                                className={navLinkStyles}
                                onClick={closeSidebar}
                            >
                                <div className="flex items-center gap-3">
                                    <PlusCircle size={20} />
                                    Create Request
                                </div>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </NavLink>
                        </>
                    )}
                    
                    <NavLink to="/" className={navLinkStyles} onClick={closeSidebar}>
                        <div className="flex items-center gap-3">
                            <Home size={20} />
                            Back to Home
                        </div>
                    </NavLink>
                </nav>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                    <NavLink
                        to="/dashboard/profile"
                        className={navLinkStyles}
                        onClick={closeSidebar}
                    >
                        <div className="flex items-center gap-3">
                            <UserCircle size={20} />
                            Account Profile
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>

                    <button 
                        onClick={handleLogOut} 
                        className="w-full group flex items-center justify-between px-4 py-3 text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-2xl transition-all duration-300 font-black tracking-tight"
                    >
                        <div className="flex items-center gap-3">
                            <LogOut size={20} />
                            Sign Out
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
