import { use, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";;
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/common/Loading";

const DonationDetails = () => {
    const { user, loading: authLoading } = use(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
            return;
        }
        axiosSecure.get(`/requests/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to load request");
                setLoading(false);
            });
    }, [id, user, axiosSecure, authLoading, navigate]);

    const handleDonate = () => {
        axiosSecure.patch(`/requests/${id}/donate`, {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: "inprogress"
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setRequest({
                        ...request,
                        donation_status: "inprogress",
                        donorName: user.displayName,
                        donorEmail: user.email
                    });
                    setShowModal(false);
                    toast.success("Thank you! Your donation is confirmed.");
                }
            })
            .catch(() => {
                toast.error("Failed to confirm donation");
            });
    };

    if (loading) return <Loading />;
    if (!request) return <div className="text-center py-20 text-red-600">Request not found!</div>;

    return (
        <div className="container mx-auto mt-20 py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-red-100 p-8">
                <div>
                    <Link onClick={() => navigate(-1)} className=" text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 text-lg">
                        ← Go Back
                    </Link>
                </div>
                <h2 className="text-xl md:text-4xl font-bold text-center pb-3 my-5 text-red-600">Blood Donation Request</h2>

                <div className="space-y-6 text-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600">Recipient Name</p>
                            <p className="font-bold text-xl">{request.recipient_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Blood Group</p>
                            <p className="font-bold text-2xl text-red-600">{request.blood_group}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600">Location</p>
                            <p className="font-semibold">{request.recipient_district}, {request.recipient_upazila}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Hospital</p>
                            <p className="font-semibold">{request.hospital_name}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-600">Full Address</p>
                        <p className="font-semibold">{request.full_address}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600">Donation Date</p>
                            <p className="font-bold">{request.donation_date}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Donation Time</p>
                            <p className="font-bold">{request.donation_time}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-600">Request Message</p>
                        <p className="bg-gray-50 p-4 rounded-xl border">{request.request_message}</p>
                    </div>

                    <div className="text-center pt-6">
                        {request.donation_status === "pending" && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn btn-lg bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl text-xl font-bold px-12"
                            >
                                Donate Now
                            </button>
                        )}

                        {request.donation_status === "inprogress" && (
                            <div className="bg-green-100 text-green-800 p-6 rounded-xl border-2 border-green-300">
                                <p className="text-2xl font-bold">Donation Confirmed!</p>
                                <p className="mt-2">Donor: <span className="font-bold">{request.donorName}</span></p>
                                <p>Email: {request.donorEmail}</p>
                            </div>
                        )}

                        {request.donation_status === "done" && (
                            <div className="bg-blue-100 text-blue-800 p-6 rounded-xl border-2 border-blue-300">
                                <p className="text-2xl font-bold">Blood Donated Successfully</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold text-center mb-6">Confirm Your Donation</h3>
                        <div className="space-y-4 text-center">
                            <p className="text-lg">You are about to help save a life</p>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="font-semibold">{user?.displayName}</p>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                            <div className="flex gap-4 justify-center mt-6">
                                <button
                                    onClick={handleDonate}
                                    className="btn bg-green-600 hover:bg-green-700 text-white font-bold"
                                >
                                    Yes, I Want to Donate
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn bg-gray-500 hover:bg-gray-600 text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationDetails;