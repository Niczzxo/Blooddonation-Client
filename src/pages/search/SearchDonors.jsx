import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { Search, MapPin, Mail, Droplets } from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";

const SearchDonors = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const [searchData, setSearchData] = useState({
        blood_group: "",
        district: "",
        upazila: ""
    });

    const axiosPublic = useAxios();

    useEffect(() => {
        axios.get("districts.json").then(res => setDistricts(res.data.districts || []));
        axios.get("upazilas.json").then(res => setUpazilas(res.data.upazilas || []));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setHasSearched(true);

        axiosPublic.get("/users/search", { params: searchData })
            .then(res => {
                setDonors(res.data);
                setLoading(false);
            })
            .catch(() => {
                setDonors([]);
                setLoading(false);
            });
    };

    return (
        <div className="max-w-7xl mx-auto py-20 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <Motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
                        FIND A <span className="text-rose-600">DONOR</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-rose-600 mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                        Search through our heroic community of verified blood donors.
                    </p>
                </Motion.div>

                <Motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50/50 dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-rose-100 dark:shadow-none border border-rose-100 dark:border-gray-800 p-8 md:p-12 mb-20"
                >
                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Blood Group</label>
                                <select
                                    value={searchData.blood_group}
                                    required
                                    onChange={(e) => setSearchData({ ...searchData, blood_group: e.target.value })}
                                    className="select select-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-600 transition-all font-bold"
                                >
                                    <option value="">Select Group</option>
                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">District</label>
                                <select
                                    value={searchData.district}
                                    onChange={(e) => setSearchData({ ...searchData, district: e.target.value })}
                                    className="select select-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-600 transition-all font-bold"
                                >
                                    <option value="">All Districts</option>
                                    {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Upazila</label>
                                <select
                                    value={searchData.upazila}
                                    onChange={(e) => setSearchData({ ...searchData, upazila: e.target.value })}
                                    className="select select-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-600 transition-all font-bold"
                                >
                                    <option value="">All Upazilas</option>
                                    {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit" 
                                className="btn h-auto py-4 px-16 bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl font-black text-xl shadow-xl shadow-rose-200 dark:shadow-none flex items-center gap-3 mx-auto"
                            >
                                <Search size={24} strokeWidth={3} />
                                Start Search
                            </Motion.button>
                        </div>
                    </form>
                </Motion.div>

                <div className="relative">
                    {loading ? (
                        <Loading />
                    ) : donors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {donors.map((donor, idx) => (
                                <Motion.div
                                    key={donor._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group bg-rose-50/50 dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-rose-100 dark:border-gray-800 p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Droplets size={120} className="text-rose-600" />
                                    </div>
                                    
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-rose-600 to-rose-400">
                                            <img
                                                src={donor.mainPhotoUrl || donor.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                                alt={donor.name}
                                                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center font-black text-sm shadow-lg">
                                            {donor.blood || donor.blood_group}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 truncate">
                                        {donor.name}
                                    </h3>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 font-bold">
                                            <MapPin size={16} className="text-rose-600" />
                                            {donor.district}, {donor.upazila}
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-500 text-sm">
                                            <Mail size={14} />
                                            {donor.email}
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="h-1 w-12 bg-rose-100 dark:bg-gray-700 rounded-full group-hover:w-24 group-hover:bg-rose-600 transition-all duration-500" />
                                    </div>
                                </Motion.div>
                            ))}
                        </div>
                    ) : hasSearched && (
                        <AnimatePresence>
                            <Motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center text-gray-400">
                                    <Search size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Donors Found</h3>
                                <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to find more results.</p>
                            </Motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchDonors;
