// src/pages/dashboard/profile/Profile.jsx

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const { user, updateInfo } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [profile, setProfile] = useState({
    name: "",
    photoURL: "",
    blood_group: "",
    district: "",
    upazila: ""
  });

  useEffect(() => {
    axios.get("/districts.json").then(res => setDistricts(res.data.districts || []));
    axios.get("/upazilas.json").then(res => setUpazilas(res.data.upazilas || []));
  }, []);

  useEffect(() => {
    if (!user) return;

    axiosSecure.get(`/users/profile/${user.email}`)
      .then(res => {
        const data = res.data;
        const updated = {
          name: user.displayName || data.name || "",
          photoURL: user.photoURL || data.photoURL || "",
          blood: data.blood || "",
          district: data.district || "",
          upazila: data.upazila || ""
        };
        setProfile(updated);
        setImagePreview(updated.photoURL);
        setLoading(false);
      })
      .catch(() => {
        setProfile({
          name: user.displayName || "",
          photoURL: user.photoURL || "",
          blood: "",
          district: "",
          upazila: ""
        });
        setImagePreview(user.photoURL || "");
        setLoading(false);
      });
  }, [user, axiosSecure]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let photoURL = profile.photoURL;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );
        photoURL = res.data.data.display_url;
      }

      await updateInfo({ displayName: profile.name, photoURL });

      await axiosSecure.patch(`/users/profile/${user.email}`, {
        name: profile.name,
        photoURL,
        blood: profile.blood,
        district: profile.district,
        upazila: profile.upazila
      });

      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
        console.log(err)
      toast.error("Update failed");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">My Profile</h1>
          <p className="text-lg mt-3 opacity-90">Update your personal information</p>
        </div>

        <div className="p-4 md:p-6">
          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <div className="relative group mb-8">
                <div className="w-45 h-43 rounded-full overflow-hidden border-6 border-red-500 shadow-2xl">
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="w-full h-full"
                  />
                </div>
                {editing && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-xl cursor-pointer transition-all hover:scale-110">
                      <FaCamera className="text-2xl" />
                    </div>
                  </>
                )}
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-xl text-gray-600 mt-2">{user?.email}</p>
                <p className="badge badge-lg badge-error text-white mt-4 py-4 px-6 text-xl">{profile.blood}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="label font-bold text-lg">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  readOnly={!editing}
                  className="input input-bordered w-full text-lg h-14 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="label font-bold text-lg">Email (Cannot be changed)</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full text-lg h-14 bg-gray-100"
                />
              </div>

              <div>
                <label className="label font-bold text-lg">Blood Group</label>
                <select
                  value={profile.blood}
                  onChange={(e) => setProfile({ ...profile, blood: e.target.value })}
                  disabled={!editing}
                  className="select select-bordered w-full text-lg h-14"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label font-bold text-lg">District</label>
                  <select
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    disabled={!editing}
                    className="select select-bordered w-full text-lg h-14"
                  >
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label font-bold text-lg">Upazila</label>
                  <select
                    value={profile.upazila}
                    onChange={(e) => setProfile({ ...profile, upazila: e.target.value })}
                    disabled={!editing}
                    className="select select-bordered w-full text-lg h-14"
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="text-center pt-6">
                {!editing ? (
                  <button type="button" onClick={() => setEditing(true)} className="btn btn-lg bg-red-600 hover:bg-red-700 text-white rounded-full px-16 shadow-xl">
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button type="submit" className="btn  bg-green-600 hover:bg-green-700 text-white rounded-full px-6 shadow-xl">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setEditing(false)} className="btn btn-outline btn-error rounded-full px-6">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;