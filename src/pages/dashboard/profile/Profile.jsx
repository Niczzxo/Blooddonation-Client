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
      <div className="max-w-5xl mx-auto bg-red-50/50 dark:bg-white/[0.03] rounded-3xl shadow-2xl border border-red-100 dark:border-white/10 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">My Profile</h1>
          <p className="text-lg mt-3 opacity-90 font-medium">Update your hero information</p>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <div className="relative group mb-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-red-500 shadow-2xl ring-8 ring-red-100 dark:ring-white/10">
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
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
                <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{profile.name}</h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium mt-2">{user?.email}</p>
                <p className="badge badge-lg bg-red-600 text-white border-none mt-4 py-6 px-8 text-2xl font-black shadow-lg shadow-red-200 dark:shadow-none">{profile.blood}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  readOnly={!editing}
                  className="input input-bordered w-full text-lg h-14 bg-red-50/20 dark:bg-white/5 border-red-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 transition-all font-bold"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Email (Cannot be changed)</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full text-lg h-14 bg-gray-100 dark:bg-white/[0.02] border-gray-200 dark:border-white/5 rounded-2xl font-bold opacity-60"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Blood Group</label>
                <select
                  value={profile.blood}
                  onChange={(e) => setProfile({ ...profile, blood: e.target.value })}
                  disabled={!editing}
                  className="select select-bordered w-full text-lg h-14 bg-red-50/20 dark:bg-white/5 border-red-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 transition-all font-bold"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">District</label>
                  <select
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    disabled={!editing}
                    className="select select-bordered w-full text-lg h-14 bg-red-50/20 dark:bg-white/5 border-red-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 transition-all font-bold"
                  >
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Upazila</label>
                  <select
                    value={profile.upazila}
                    onChange={(e) => setProfile({ ...profile, upazila: e.target.value })}
                    disabled={!editing}
                    className="select select-bordered w-full text-lg h-14 bg-red-50/20 dark:bg-white/5 border-red-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 transition-all font-bold"
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="text-center pt-8">
                {!editing ? (
                  <button type="button" onClick={() => setEditing(true)} className="btn btn-lg bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl px-16 font-black shadow-xl shadow-red-200 dark:shadow-none transition-all hover:scale-105">
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-4 justify-center">
                    <button type="submit" className="btn btn-lg bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl px-12 font-black shadow-xl shadow-red-200 dark:shadow-none">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setEditing(false)} className="btn btn-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border-none rounded-2xl px-12 font-black">
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