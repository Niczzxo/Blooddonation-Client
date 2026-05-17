import { use, useEffect, useState } from "react";
import { Camera, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { motion as Motion } from "motion/react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const { createUser, setUser, updateInfo } = use(AuthContext)
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    useEffect(() => {
        axios.get('/upazilas.json')
            .then(res => {
                setUpazilas(res.data.upazilas);
            })
    }, [])
    useEffect(() => {
        axios.get('/districts.json')
            .then(res => {
                setDistricts(res.data.districts);
            })
    }, [])

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const form = e.target;
        const photo = form.photo;
        const file = photo.files[0];
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const blood = e.target.blood.value

        const lengthPattern = /.{6,}/;
        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;

        if (!uppercasePattern.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }

        if (!lowercasePattern.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }

        if (!lengthPattern.test(password)) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!file) {
            toast.error("Please select a profile photo");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            const mainPhotoUrl = res.data.data.display_url;

            const userData = {
                name,
                email,
                password,
                mainPhotoUrl,
                blood,
                district,
                upazila,
                status: "active"
            }

            const result = await createUser(email, password);
            await updateInfo({
                displayName: name,
                photoURL: mainPhotoUrl,
            });

            setUser({
                ...result.user,
                displayName: name,
                photoURL: mainPhotoUrl
            });

            await axios.post('https://blood-donation-server-lilac.vercel.app/users', userData);
            toast.success("Account created successfully!");
            navigate("/");

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex items-center justify-center px-4 py-20 min-h-screen">
            <Motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-rose-50/50 dark:bg-gray-900 rounded-[3rem] shadow-2xl border border-rose-100 dark:border-gray-800 overflow-hidden"
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

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">
                            JOIN OUR <span className="text-rose-500 uppercase">Mission</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                            Create an account to become a part of our life-saving community.
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-8">
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                    id="profile-photo"
                                />
                                <div className="w-32 h-32 rounded-full bg-gray-50 dark:bg-gray-900 border-4 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-inner transition-all group-hover:border-rose-400">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Camera size={40} className="text-gray-300 group-hover:text-rose-400 transition-colors" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white p-3 rounded-full shadow-lg pointer-events-none group-hover:scale-110 transition-transform">
                                    <Camera size={16} strokeWidth={3} />
                                </div>
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mt-4 px-1">Profile Photo</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className="input input-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-semibold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="hero@bloodcare.com"
                                    className="input input-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-semibold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Blood Group</label>
                            <select 
                                name="blood" 
                                required
                                className="select select-bordered w-full h-14 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-bold"
                            >
                                <option value="">Select blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">District</label>
                                <select 
                                    value={district} 
                                    onChange={(e) => setDistrict(e.target.value)} 
                                    name="district" 
                                    required
                                    className="select select-bordered w-full h-14 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-bold"
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => <option value={d.name} key={d.id} >{d.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Upazila</label>
                                <select 
                                    value={upazila} 
                                    onChange={(e) => setUpazila(e.target.value)} 
                                    name="upazila" 
                                    required
                                    className="select select-bordered w-full h-14 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-bold"
                                >
                                    <option value="">Select Upazila</option>
                                    {upazilas.map(upazila => <option value={upazila.name} key={upazila.id} >{upazila.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 relative">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Password</label>
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
                                    className="absolute right-4 top-11 text-gray-400 hover:text-rose-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Confirm</label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    required
                                    placeholder="••••••••••"
                                    className="input input-bordered w-full h-14 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all font-semibold"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-11 text-gray-400 hover:text-rose-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="btn btn-lg w-full bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl shadow-xl shadow-rose-200 dark:shadow-none transition-all h-14 font-black text-lg"
                        >
                            Create Account
                        </Motion.button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-rose-100 dark:border-gray-800 text-center">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Already a hero? 
                            <Link
                                to="/login"
                                className="ml-2 font-black text-rose-600 hover:text-rose-700 underline underline-offset-4 transition"
                            >
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </Motion.div>
        </div>
    );
};

export default Register;
