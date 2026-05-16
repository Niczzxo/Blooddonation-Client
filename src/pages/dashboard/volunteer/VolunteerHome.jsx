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
        <div className="min-h-screen mt-10 bg-gray-50 p-6 md:p-10">

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                    Welcome Back <br /> <span className="text-red-600">{user.displayName}</span>
                </h1>
                <p className="text-md md:text-xl text-gray-600">Managing lives with love and responsibility</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 text-white">
                        <FaUsers className="text-5xl mx-auto" />
                    </div>
                    <div className="p-10 text-center">
                        <h3 className="text-6xl font-black text-gray-900">
                            {stats.users.toLocaleString()}
                        </h3>
                        <p className="text-xl text-gray-600 mt-4 font-medium">
                            Registered Donors & Heroes
                        </p>
                    </div>
                    <div className="bg-gray-50 px-6 py-4">
                        <p className="text-sm text-gray-500 text-center">Growing Community</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                        <FaDonate className="text-5xl mx-auto" />
                    </div>
                    <div className="p-10 text-center">
                        <h3 className="text-5xl md:text-6xl font-black text-gray-900">
                            ${stats.funding.toLocaleString()}
                        </h3>
                        <p className="text-xl text-gray-600 mt-4 font-medium">
                            Total Funding Collected
                        </p>
                    </div>
                    <div className="bg-gray-50 px-6 py-4">
                        <p className="text-sm text-gray-500 text-center">Thanks to generous hearts</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
                        <FaHandHoldingHeart className="text-5xl mx-auto" />
                    </div>
                    <div className="p-10 text-center">
                        <h3 className="text-6xl font-black text-gray-900">
                            {stats.requests}
                        </h3>
                        <p className="text-xl text-gray-600 mt-4 font-medium">
                            Active Blood Requests
                        </p>
                    </div>
                    <div className="bg-gray-50 px-6 py-4">
                        <p className="text-sm text-gray-500 text-center">Waiting for your action</p>
                    </div>
                </div>

            </div>

            <div className="text-center mt-20">
                <p className="text-2xl md:text-4xl font-bold text-gray-700">
                    Every number here represents a <span className="text-red-600">saved life</span>
                </p>
            </div>
        </div>
    );
};

export default VolunteerHome;