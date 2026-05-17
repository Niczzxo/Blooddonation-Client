import { Link } from "react-router";
import { use, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import MyLink from "./MyLink";
import toast from "react-hot-toast";
import { 
    LogOut, 
    LayoutDashboard, 
    User, 
    Menu, 
    X, 
    Sun, 
    Moon,
    Droplets
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";

const Navbar = () => {
    const { user, logOut, role } = use(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfully");
                setMenuOpen(false);
            })
            .catch(() => { });
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className={`flex items-center justify-between py-2 px-4 md:px-6 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full shadow-lg border border-red-100 dark:border-white/10 transition-all ${scrolled ? "shadow-xl" : ""}`}>
                    
                    {/* Left Section: Mobile Menu Trigger & Desktop Logo */}
                    <div className="flex items-center flex-1 lg:flex-none">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-3 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all text-red-600"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
                        </button>

                        <Link to="/" onClick={closeMenu} className="hidden lg:flex items-center gap-2 group transition-all">
                            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 dark:shadow-none transition-transform group-hover:scale-110">
                                <Droplets className="text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                                Blood<span className="text-red-500">Sync</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Center Section: Mobile Logo & Desktop Links */}
                    <div className="flex justify-center items-center flex-1 lg:flex-none">
                        {/* Mobile Logo Only */}
                        <Link to="/" onClick={closeMenu} className="lg:hidden flex items-center gap-2 group">
                            <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 dark:shadow-none">
                                <Droplets className="text-white" size={20} />
                            </div>
                            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">
                                Blood<span className="text-red-500">Sync</span>
                            </h1>
                        </Link>

                        {/* Desktop Links Only */}
                        <div className="hidden lg:flex items-center">
                            <ul className="flex items-center gap-2 xl:gap-8">
                                <li onClick={closeMenu}>
                                    <MyLink to="/">Home</MyLink>
                                </li>
                                <li onClick={closeMenu}>
                                    <MyLink to="/donation-requests">Donation Requests</MyLink>
                                </li>
                                <li onClick={closeMenu}>
                                    <MyLink to="/search">Search Donors</MyLink>
                                </li>
                                {user && (
                                    <li onClick={closeMenu}>
                                        <MyLink to="/funding">Funding</MyLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Section: Toggle & Profile */}
                    <div className="flex items-center justify-end flex-1 lg:flex-none gap-1 md:gap-4">
                        <Motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 md:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all text-gray-600 dark:text-gray-400"
                        >
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </Motion.button>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-red-50 dark:hover:bg-gray-800 rounded-full p-1 transition-all"
                                >
                                    <div className="avatar">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-red-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                                            <img
                                                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                                alt={user.displayName}
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex flex-col text-left pr-2">
                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 max-w-24 truncate">
                                            {user.displayName?.split(' ')[0] || "User"}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider text-red-600 font-bold leading-none">
                                            {role}
                                        </span>
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-56 border border-gray-100 dark:border-gray-700 mt-4 z-50 overflow-hidden"
                                >
                                    <li className="menu-title px-4 py-2 text-xs font-bold uppercase text-gray-400">Account</li>
                                    <li>
                                        <Link to="/dashboard" className="flex items-center gap-3 py-3 px-4 hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-700 dark:text-gray-300 rounded-xl">
                                            <LayoutDashboard size={18} className="text-red-500" />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="flex items-center gap-3 py-3 px-4 hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-700 dark:text-gray-300 rounded-xl">
                                            <User size={18} className="text-red-500" />
                                            Profile
                                        </Link>
                                    </li>
                                    <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="flex items-center gap-3 py-3 px-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl font-bold"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="hidden lg:block">
                                <Link
                                    to="/login"
                                    className="btn btn-sm md:btn-md bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-4 md:px-8 font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {menuOpen && (
                        <Motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden mt-3 overflow-hidden"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-red-50 dark:border-gray-800 p-4">
                                <ul className="flex flex-col gap-2">
                                    <li onClick={closeMenu}><MyLink to="/">Home</MyLink></li>
                                    <li onClick={closeMenu}><MyLink to="/donation-requests">Donation Requests</MyLink></li>
                                    <li onClick={closeMenu}><MyLink to="/search">Search Donors</MyLink></li>
                                    {user && <li onClick={closeMenu}><MyLink to="/funding">Funding</MyLink></li>}
                                    {!user && (
                                        <li className="mt-2 block" onClick={closeMenu}>
                                            <Link to="/login" className="btn btn-block bg-red-600 text-white rounded-2xl">Login</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </Motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
