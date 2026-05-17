import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin } from "lucide-react";
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
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4 text-gray-900 dark:text-white uppercase tracking-tighter">
            Get in <span className="text-rose-600">Touch</span>
          </h2>
          <div className="h-1.5 w-24 bg-rose-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            Need blood urgently? Or want to organize a camp? We’re here 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-rose-100 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Name</label>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-600 transition-all font-bold mt-2"
                  placeholder="Your Name"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-600 transition-all font-bold mt-2"
                  placeholder="your@email.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Phone</label>
                <input
                  type="tel"
                  required
                  className="input input-bordered w-full h-14 bg-rose-50/20 dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-600 transition-all font-bold mt-2"
                  placeholder="+880 1XXX-XXXXXX"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Message</label>
                <textarea
                  rows="5"
                  required
                  className="textarea textarea-bordered w-full bg-white dark:bg-gray-950 border-rose-100 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-rose-600 transition-all font-bold mt-2 p-4"
                  placeholder="How can we help you?"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-lg w-full h-16 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white border-none shadow-xl shadow-rose-200 dark:shadow-none text-xl font-black transition-all hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2.5rem] shadow-2xl p-10 md:p-14 text-center border border-rose-200 dark:border-rose-700 bg-gradient-to-br from-rose-600 to-rose-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110">
                <Phone size={120} />
              </div>
              <h3 className="text-3xl md:text-5xl text-white font-black uppercase tracking-tighter mb-8 relative z-10">Emergency Hotline</h3>
              <div className="space-y-6 relative z-10">
                <a href="tel:+9678001134" className="btn h-auto py-5 px-10 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 border-none shadow-2xl text-2xl font-black transition-all hover:scale-110 inline-flex items-center gap-4">
                  <Phone />
                  <span>+ 96 78 00 11 34</span>
                </a>
                <p className="text-xl text-rose-100 font-bold uppercase tracking-widest">24/7 Emergency Blood Request</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-rose-50/50 dark:bg-gray-900 border border-rose-100 dark:border-gray-800 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-600">
                  <Mail className="text-3xl" />
                </div>
                <p className="text-lg font-black text-gray-900 dark:text-white">blood@gmail.com</p>
                <p className="text-sm text-gray-500 font-bold mt-1">Official Support</p>
              </div>
              <div className="bg-rose-50/50 dark:bg-gray-900 border border-rose-100 dark:border-gray-800 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-600">
                  <MapPin className="text-3xl" />
                </div>
                <p className="text-lg font-black text-gray-900 dark:text-white">Dhaka, Bangladesh</p>
                <p className="text-sm text-gray-500 font-bold mt-1">Our Location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;