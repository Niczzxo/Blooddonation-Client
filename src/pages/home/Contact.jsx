import { useState } from "react";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from '../../assets/icons/logo.png'
import { Link } from "react-router";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: ""
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! We will contact you soon.");
  };

  return (
    <section className="w-11/12 mx-auto my-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Get in <span className="text-rose-500">Touch</span>
          </h2>
          <p className="text-2xl text-gray-600">
            Need blood urgently? Or want to organize a camp? We’re here 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className=" bg-gradient-to-br from-rose-100 to-rose-300 rounded-3xl shadow-2xl p-8 border border-rose-100 dark:border-rose-900">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="input border-none w-full rounded-xl border-rose-200 focus:border-rose-500"
                  placeholder="Your Name"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full rounded-xl border-rose-200 focus:border-rose-500"
                  placeholder="your@email.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  className="input input-bordered w-full rounded-xl border-rose-200 focus:border-rose-500"
                  placeholder="+880 1XXX-XXXXXX"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Message</label>
                <textarea
                  rows="5"
                  required
                  className="textarea textarea-bordered w-full rounded-xl border-rose-200 focus:border-rose-500"
                  placeholder="How can we help you?"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-lg w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white border-none shadow-xl hover:shadow-rose-600/50 text-xl font-semibold">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-10">
            <div className="rounded-3xl shadow-2xl p-10 text-center border bg-gradient-to-br from-rose-200 to-rose-500">
              <img className="w-28 mx-auto m-3" src={logo} alt="" />
              <h3 className="text-[28px] md:text-4xl text-white font-extrabold m-7">Emergency Hotline</h3>
              <div className="space-y-4">
                <a className="btn btn-lg rounded-full bg-white text-rose-500 hover:bg-rose-50 border-none shadow-xl px-10 text- font-bold hover:scale-105 transition-all">
                  <FaPhoneAlt className="text-rose-500"/>
                  <span>+ 96 78 00 11 34</span>
                </a>
                <p className="text-xl text-white font-semibold">24/7 Emergency Blood Request</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className=" border bg-gradient-to-br from-rose-200 to-rose-500 rounded-2xl p-6 text-center shadow-xl">
                <FaEnvelope className="text-4xl text-rose-800 mx-auto mb-3" />
                <p className="text-xl text-white font-semibold">blood@gmail.com</p>
              </div>
              <div className="bg-gradient-to-br from-rose-200 to-rose-500 border rounded-2xl p-6 text-center shadow-xl">
                <FaMapMarkerAlt className="text-4xl text-rose-800 mx-auto mb-3" />
                <p className="text-xl text-white font-semibold">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;