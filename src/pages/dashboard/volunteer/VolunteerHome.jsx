import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaHandHoldingHeart, FaDonate } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthContext';


const VolunteerHome = () => {
    const [stats, setStats] = useState({ users: 0, requests: 0, funding: 0 });
    const axiosSecure = useAxiosSecure();
    const {user} = use(AuthContext)

    useEffect(() => {
        axiosSecure.get("/admin-stats")
            .then(res => setStats(res.data))
            .catch(() => { });
    }, [axiosSecure]);

    return (
        <div className="min-h-screen mt-10 p-6 md:p-10">

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase">
                    Welcome Back <br /> <span className="text-red-600">{user.displayName}</span>
                </h1>
                <p className="text-md md:text-xl text-gray-600 dark:text-gray-400 font-medium">Managing lives with love and responsibility</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                <div className="bg-red-50/50 dark:bg-gray-900 rounded-3xl shadow-2xl border border-red-100 dark:border-gray-800 overflow-hidden transform hover:scale-105 transition-all duration-300 group">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                        <FaUsers className="text-5xl mx-auto" />
                    </div>
                    <div className="p-10 text-center">
                        <h3 className="text-6xl font-black text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                            {stats.users.toLocaleString()}
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 font-bold">
                            Registered Donors
                        </p>
                    </div>
                    <div className="bg-red-50 dark:bg-gray-800 px-6 py-4 border-t border-red-100 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-bold">Growing Community</p>
                    </div>
                </div>

                <div className="bg-red-50/50 dark:bg-gray-900 rounded-3xl shadow-2xl border border-red-100 dark:border-gray-800 overflow-hidden transform hover:scale-105 transition-all duration-300 group">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                        <FaDonate className="text-5xl mx-auto" />
                    </div>
                    <div className="p-10 text-center">
                        <h3 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                            ${stats.funding.toLocaleString()}
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 font-bold">
                            Total Funding
                        </p>
                    </div>
                    <div className="bg-red-50 dark:bg-gray-800 px-6 py-4 border-t border-red-100 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-bold">Generous Hearts</p>
                    </div>
                </div>

                <div className="bg-red-50/50 dark:bg-gray-900 rounded-3xl shadow-2xl border border-red-100 dark:border-gray-800 overflow-hidden transform hover:scale-105 transition-all duration-300 group">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                        <FaHandHoldingHeart className="text-5xl mx-auto" />
                    </div>
                    <div className="p-10 text-center">
                        <h3 className="text-6xl font-black text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                            {stats.requests}
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 font-bold">
                            Active Requests
                        </p>
                    </div>
                    <div className="bg-red-50 dark:bg-gray-800 px-6 py-4 border-t border-red-100 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-bold">Needs Action</p>
                    </div>
                </div>

            </div>

            <div className="text-center mt-20">
                <p className="text-2xl md:text-4xl font-black text-gray-700 dark:text-gray-300 uppercase tracking-tighter">
                    Every number here represents a <span className="text-red-600">saved life</span>
                </p>
            </div>
        </div>
    );
};

export default VolunteerHome;