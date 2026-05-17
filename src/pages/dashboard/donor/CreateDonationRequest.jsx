import { Link } from "react-router";
import { FaUser, FaTint, FaMapMarkerAlt, FaHospital, FaCalendarAlt, FaClock, FaCommentDots } from "react-icons/fa";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CreateDonationRequest = () => {
    const { user, userStatus } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
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

    if (userStatus === "blocked") {
        return (
            <div className="container mx-auto mt-40 text-center">
                <div className="max-w-md mx-auto  rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
                    <p className="text-xl text-gray-700">
                        Your account has been <span className="font-bold text-red-600">blocked</span> by the admin.
                    </p>
                    <p className="mt-4 text-gray-600">
                        You cannot create donation requests until your account is unblocked.
                    </p>
                    <Link to="/dashboard" className="btn btn-outline btn-error mt-6">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target
        const recipient_name = form.recipient_name.value;
        const recipient_district = district
        const recipient_upazila = upazila;
        const hospital_name = form.hospital_name.value;
        const full_address = form.full_address.value;
        const blood_group = form.blood_group.value;
        const request_message = form.message.value;
        const donation_date = form.date.value
        const donation_time = form.time.value


        const formData = {
            requester_name: user.displayName,
            requester_email: user.email,
            recipient_name,
            recipient_district,
            recipient_upazila,
            hospital_name,
            full_address,
            request_message,
            blood_group,
            donation_date,
            donation_time,
            donation_status: 'pending'
        }
        axiosSecure.post('/requests', formData)
            .then(() => {
                toast.success('Your donation request successfull')
            }).catch(err => console.log(err))

        // console.log(formData)
    }
    return (
        <div className="min-h-screen my-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="m-8 text-center">
                    <h1 className="text-2xl md:text-5xl font-bold text-gray-900">Create Blood Request</h1>
                    <p className="text-gray-600 mt-2">Your request can save a life</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">

                    <form onSubmit={handleRequest} className="space-y-6">

                        <div className="bg-gray-50 rounded-xl p-6 border">
                            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                <FaUser className="text-red-600" /> Requester Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-semibold text-gray-800">{user?.displayName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-semibold text-gray-800">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Patient Name <span className="text-red-500">*</span></span>
                                </label>
                                <input
                                    type="text"
                                    name="recipient_name"
                                    placeholder="Enter patient name"
                                    className="input input-bordered w-full focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Blood Group <span className="text-red-500">*</span></span>
                                </label>
                                <div className="relative">
                                    <FaTint className="absolute left-4 top-4 text-red-600 text-xl" />
                                    <select name="blood_group" className="select select-bordered w-full" required>
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
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">District <span className="text-red-500">*</span></span>
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-4 text-red-600" />
                                    <select
                                        value={district}
                                        name="recipient_district"
                                        onChange={(e) => setDistrict(e.target.value)}
                                        className="select select-bordered w-full pl-10 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                        required
                                    >
                                        <option value="">Select Your District</option>
                                        {
                                            districts?.map(d => <option value={d.name} key={d.id} >{d.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Upazila <span className="text-red-500">*</span></span>
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-4 text-red-600" />
                                    <select value={upazila} name="recipient_upazila" onChange={(e) => setUpazila(e.target.value)} className="select select-bordered w-full pl-10 focus:border-red-500 focus:ring-2 focus:ring-red-100" required>
                                        <option value="">Select Your Upazila</option>
                                        {
                                            upazilas?.map(upazila => <option value={upazila.name} key={upazila.id} >{upazila?.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Hospital Name <span className="text-red-500">*</span></span>
                                </label>
                                <div className="relative">
                                    <FaHospital className="absolute left-4 top-4 text-red-600" />
                                    <input
                                        type="text"
                                        name="hospital_name"
                                        placeholder="e.g. Dhaka Medical College"
                                        className="input input-bordered w-full pl-10 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Full Address <span className="text-red-500">*</span></span>
                                </label>
                                <input
                                    type="text"
                                    name="full_address"
                                    placeholder="Road, Area"
                                    className="input input-bordered w-full focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Donation Date <span className="text-red-500">*</span></span>
                                </label>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-4 top-4 text-red-600" />
                                    <input name="date" type="date" className="input input-bordered w-full pl-10 focus:border-red-500 focus:ring-2 focus:ring-red-100" required />
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Donation Time <span className="text-red-500">*</span></span>
                                </label>
                                <div className="relative">
                                    <FaClock className="absolute left-4 top-4 text-red-600" />
                                    <input name="time" type="text" placeholder="Enter donation time" className="input input-bordered w-full pl-10 focus:border-red-500 focus:ring-2 focus:ring-red-100" required />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Request Message <span className="text-red-500">*</span></span>
                            </label>
                            <div className="relative">
                                <FaCommentDots className="absolute left-4 top-4 text-red-600" />
                                <textarea
                                    rows="4"
                                    name="message"
                                    placeholder="Why blood is needed urgently..."
                                    className="textarea textarea-bordered w-full pl-10 focus:border-red-500 focus:ring-2 focus:ring-red-100 resize-none"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-lg w-full bg-red-600 hover:bg-red-700 text-white border-none rounded-full shadow-lg text-lg font-semibold"
                        >
                            Create Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDonationRequest;