import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion as Motion } from "motion/react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { singInUser } = use(AuthContext)

    const handleSignin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        singInUser(email, password)
            .then(() => {
                toast.success("Login Successful")
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                toast.error(error.message)
            });
    };

    return (
        <div className="flex items-center justify-center px-4 min-h-[calc(100vh-200px)]">
            <Motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
                <div className="p-8 md:p-12">
                    <div className="mb-8">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="bg-gray-50 dark:bg-gray-900 p-2 rounded-full text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center w-10 h-10 shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">
                            WELCOME <span className="text-rose-500">BACK</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                            Every login is a step closer to saving a life.
                        </p>
                    </div>

                    <form onSubmit={handleSignin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="hero@bloodcare.com"
                                className="input input-bordered w-full h-14 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-semibold"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
                                <button type="button" className="text-xs font-bold text-rose-600 hover:underline">Forgot?</button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="••••••••••"
                                    className="input input-bordered w-full h-14 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-semibold"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="btn btn-lg w-full bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl shadow-xl shadow-rose-200 dark:shadow-none transition-all h-14 font-black text-lg"
                        >
                            Sign In
                        </Motion.button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-50 dark:border-gray-700 text-center">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            New to our community? 
                            <Link
                                to="/register"
                                className="ml-2 font-black text-rose-600 hover:text-rose-700 underline underline-offset-4 transition"
                            >
                                Register Now
                            </Link>
                        </p>
                    </div>
                </div>
            </Motion.div>
        </div>
    );
};

export default Login;
