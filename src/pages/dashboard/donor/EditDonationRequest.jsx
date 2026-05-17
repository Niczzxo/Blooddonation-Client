import { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading";
import { FaUser, FaTint, FaMapMarkerAlt, FaHospital, FaCalendarAlt, FaClock, FaCommentDots } from "react-icons/fa";
import axios from "axios";

const EditDonationRequest = () => {
  const { user, role } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  useEffect(() => {
    axios.get("/districts.json").then(res => setDistricts(res.data.districts || []));
    axios.get("/upazilas.json").then(res => setUpazilas(res.data.upazilas || []));
  }, []);

  useEffect(() => {
    if (!user) return;
    axiosSecure.get(`/requests/${id}`)
      .then(res => {
        const data = res.data;
        if (data.requester_email !== user.email && role !== "admin") {
          toast.error("You are not allowed to edit this request");
          navigate(role === "admin"
            ? "/dashboard/all-donation-requests"
            : "/dashboard/my-donation-requests"
          );
          return;
        }

        setRequest(data);
        setDistrict(data.recipient_district || "");
        setUpazila(data.recipient_upazila || "");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load request");
        navigate("/dashboard/my-donation-requests");
      });
  }, [id, user, axiosSecure, navigate, role]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      recipient_name: form.recipient_name.value,
      hospital_name: form.hospital_name.value,
      full_address: form.full_address.value,
      recipient_district: district,
      recipient_upazila: upazila,
      donation_date: form.date.value,
      donation_time: form.time.value,
      request_message: form.message.value,
      blood_group: form.blood_group.value,
    };

    axiosSecure.patch(`/requests/${id}`, updatedData)
      .then(res => {
        console.log("Update response:", res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("Request updated successfully!");
          navigate(role === "admin"
            ? "/dashboard/all-blood-donation-request"
            : "/dashboard/my-donation-requests");
        } else {
          toast.error("No changes detected or update failed");
        }
      })
      .catch(err => {
        console.error("Update error:", err);
        toast.error("Update failed");
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen my-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="m-8 text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900">Edit Blood Request</h1>
          <p className="text-gray-600 mt-2">Update your donation request details</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
          <form onSubmit={handleUpdate} className="space-y-6">
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
              <input
                name="recipient_name"
                defaultValue={request?.recipient_name}
                required
                className="input input-bordered w-full"
                placeholder="Patient Name"
              />
              <div className="relative">
                <FaTint className="absolute left-4 top-4 text-red-600 text-xl" />
                <select
                  name="blood_group"
                  defaultValue={request?.blood_group}
                  className="select select-bordered w-full pl-12"
                  required
                >
                  <option value="">Select blood group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-red-600" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="select select-bordered w-full pl-10"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-red-600" />
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="select select-bordered w-full pl-10"
                  required
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <FaHospital className="absolute left-4 top-4 text-red-600" />
                <input
                  name="hospital_name"
                  defaultValue={request?.hospital_name}
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="Hospital Name"
                />
              </div>
              <input
                name="full_address"
                defaultValue={request?.full_address}
                required
                className="input input-bordered w-full"
                placeholder="Full Address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-4 text-red-600" />
                <input
                  name="date"
                  type="date"
                  defaultValue={request?.donation_date}
                  required
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="relative">
                <FaClock className="absolute left-4 top-4 text-red-600" />
                <input
                  name="time"
                  type="time"
                  defaultValue={request?.donation_time}
                  required
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            <div className="relative">
              <FaCommentDots className="absolute left-4 top-4 text-red-600" />
              <textarea
                name="message"
                rows="4"
                defaultValue={request?.request_message}
                required
                className="textarea textarea-bordered w-full pl-10 resize-none"
                placeholder="Request message"
              ></textarea>
            </div>

            <div className="text-center space-x-4">
              <button type="submit" className="btn btn-lg bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg px-12">
                Update Request
              </button>
              <button type="button" onClick={() => navigate(-1)} className="btn btn-outline btn-error rounded-full px-8">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDonationRequest;