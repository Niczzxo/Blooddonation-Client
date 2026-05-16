import { Link } from 'react-router';

const ExtraSections = () => {
  return (
    <div className="min-h-screen w-11/12 mx-auto my-20 text-base-content">

      {/* Hero Section - Strong Rose Vibe */}
      <section className="hero min-h-[60vh] md:min-h-[70vh] bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 text-rose-300 text-9xl">🩸</div>
          <div className="absolute bottom-20 right-20 text-rose-400 text-8xl rotate-12">🩸</div>
          <div className="absolute top-1/3 right-1/4 text-rose-300 text-7xl -rotate-6">🩸</div>
        </div>
        <div className="hero-content text-center z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl animate-fade-in-down">
              DONATE <span className="text-rose-200">BLOOD</span>
              <br />
              SAVE <span className="text-rose-200">LIVES</span>
            </h1>
            <p className="text-xl md:text-3xl mb-10 animate-fade-in-up animation-delay-200">
              One drop of blood can save a life — Join us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register" className="btn btn-lg bg-white text-rose-700 hover:bg-gray-100 font-bold shadow-xl hover:shadow-rose-900/50 transition-all animate-fade-in-up animation-delay-300">
                Become a Donor
              </Link>
              <Link to="/donation-requests" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-rose-800 transition-all animate-fade-in-up animation-delay-400">
                Find Blood
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="py-16 bg-rose-50 dark:bg-rose-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-rose-800 dark:text-rose-300 animate-fade-in-down">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stats shadow-lg bg-rose-50/50 dark:bg-gray-900 border border-rose-100 dark:border-gray-800 animate-fade-in-up animation-delay-100">
              <div className="stat place-items-center">
                <div className="stat-title text-rose-600 dark:text-rose-400">Total Donors</div>
                <div className="stat-value text-rose-700 dark:text-rose-300">12,580+</div>
              </div>
            </div>
            <div className="stats shadow-lg bg-rose-50/50 dark:bg-gray-900 border border-rose-100 dark:border-gray-800 animate-fade-in-up animation-delay-200">
              <div className="stat place-items-center">
                <div className="stat-title text-rose-600 dark:text-rose-400">Lives Saved</div>
                <div className="stat-value text-rose-700 dark:text-rose-300">45,000+</div>
              </div>
            </div>
            <div className="stats shadow-lg bg-rose-50/50 dark:bg-gray-900 border border-rose-100 dark:border-gray-800 animate-fade-in-up animation-delay-300">
              <div className="stat place-items-center">
                <div className="stat-title text-rose-600 dark:text-rose-400">Requests Fulfilled</div>
                <div className="stat-value text-rose-700 dark:text-rose-300">8,720+</div>
              </div>
            </div>
            <div className="stats shadow-lg bg-rose-50/50 dark:bg-gray-900 border border-rose-100 dark:border-gray-800 animate-fade-in-up animation-delay-400">
              <div className="stat place-items-center">
                <div className="stat-title text-rose-600 dark:text-rose-400">Active Campaigns</div>
                <div className="stat-value text-rose-700 dark:text-rose-300">150+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-rose-800 dark:text-rose-300 animate-fade-in-down">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Register", desc: "Create your donor profile" },
              { step: 2, title: "Search / Request", desc: "Find donors or post requests" },
              { step: 3, title: "Connect", desc: "Contact the donor/recipient" },
              { step: 4, title: "Save a Life", desc: "Donate and make a difference" },
            ].map((item, index) => (
              <div key={item.step} className="card bg-rose-50/50 dark:bg-gray-900 shadow-xl border border-rose-100 dark:border-gray-800 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="card-body items-center text-center">
                  <div className="badge badge-lg bg-rose-600 text-white mb-4 animate-scale-in">{item.step}</div>
                  <h3 className="card-title text-rose-700 dark:text-rose-300">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Blood Requests Teaser */}
      <section className="py-16 bg-rose-50 dark:bg-rose-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-rose-800 dark:text-rose-300 animate-fade-in-left">Urgent Blood Requests</h2>
            <Link to="/donation-requests" className="btn bg-rose-600 text-white hover:bg-rose-700 animate-fade-in-right">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card bg-rose-50/50 dark:bg-gray-900 shadow-xl border border-rose-100 dark:border-gray-800 animate-fade-in-up" style={{animationDelay: `${(i-1) * 0.15}s`}}>
                <div className="card-body">
                  <div className="badge bg-rose-600 text-white text-xl mb-2">A+</div>
                  <h3 className="card-title text-rose-700 dark:text-rose-300">Urgent A+ Blood Needed</h3>
                  <p className="text-gray-700 dark:text-gray-300">Barishal Medical College Hospital</p>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/request/${i}`} className="btn btn-outline border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Donor CTA */}
      <section className="py-20 bg-rose-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in-down">Become a Donor Today</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Your blood can save someone's life. One donation can make a huge impact!
          </p>
          <Link to="/register" className="btn btn-lg bg-white text-rose-700 hover:bg-gray-100 animate-fade-in-up animation-delay-300">
            Join Now
          </Link>
        </div>
      </section>

      {/* Blood Types & Compatibility */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-rose-600 dark:text-rose-500 uppercase tracking-tighter animate-fade-in-down">
            Blood Types & <span className="text-gray-900 dark:text-white">Compatibility</span>
          </h2>
          <div className="overflow-x-auto rounded-[2.5rem] shadow-2xl border border-rose-100 dark:border-gray-800 animate-fade-in-up">
            <table className="table w-full">
              <thead className="bg-rose-600 text-white border-none">
                <tr className="border-none">
                  <th className="py-8 px-10 text-xl font-black uppercase tracking-widest text-left">Your Blood Type</th>
                  <th className="py-8 px-10 text-xl font-black uppercase tracking-widest text-left">Can Receive From</th>
                  <th className="py-8 px-10 text-xl font-black uppercase tracking-widest text-left">Can Donate To</th>
                </tr>
              </thead>
              <tbody className="bg-rose-50/30 dark:bg-gray-950">
                <tr className="border-rose-100 dark:border-gray-800 hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                  <td className="py-6 px-10 font-black text-2xl text-rose-600">A+</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">A+, A-, O+, O-</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">A+, AB+</td>
                </tr>
                <tr className="bg-rose-50/50 dark:bg-gray-900/50 border-rose-100 dark:border-gray-800 hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                  <td className="py-6 px-10 font-black text-2xl text-rose-600">A-</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">A-, O-</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">A+, A-, AB+, AB-</td>
                </tr>
                <tr className="border-rose-100 dark:border-gray-800 hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                  <td className="py-6 px-10 font-black text-2xl text-rose-600">B+</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">B+, B-, O+, O-</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">B+, AB+</td>
                </tr>
                <tr className="bg-rose-50/50 dark:bg-gray-900/50 border-rose-100 dark:border-gray-800 hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                  <td className="py-6 px-10 font-black text-2xl text-rose-600">O-</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">O-</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">Everyone <span className="text-xs opacity-60 uppercase font-black">(Universal Donor)</span></td>
                </tr>
                <tr className="border-rose-100 dark:border-gray-800 hover:bg-rose-100/50 dark:hover:bg-gray-900 transition-colors">
                  <td className="py-6 px-10 font-black text-2xl text-rose-600">AB+</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">All types</td>
                  <td className="py-6 px-10 font-bold text-lg text-gray-700 dark:text-gray-300">AB+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-rose-50 dark:bg-rose-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-rose-800 dark:text-rose-300 animate-fade-in-down">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rakib Hossain", quote: "My donation saved 2 lives. It feels amazing!" },
              { name: "Fatema Khatun", quote: "We found blood in time — thank you all!" },
              { name: "Saiful Islam", quote: "Regular donation has become part of my life." },
            ].map((t, i) => (
              <div key={i} className="card bg-rose-50/50 dark:bg-gray-900 shadow-xl border border-rose-100 dark:border-gray-800 animate-fade-in-up" style={{animationDelay: `${i * 0.15}s`}}>
                <div className="card-body">
                  <p className="italic text-gray-700 dark:text-gray-300">"{t.quote}"</p>
                  <div className="font-bold mt-4 text-rose-700 dark:text-rose-300">- {t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-rose-800 dark:text-rose-300">Frequently Asked Questions</h2>
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-rose-200 dark:border-rose-700">
              <input type="radio" name="my-accordion-1" defaultChecked />
              <div className="collapse-title text-xl font-medium text-rose-700 dark:text-rose-300">What are the eligibility criteria for blood donation?</div>
              <div className="collapse-content">
                <p>Age 18–65, weight 50kg+, good health, no recent illness...</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-rose-200 dark:border-rose-700">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title text-xl font-medium text-rose-700 dark:text-rose-300">How often can I donate blood?</div>
              <div className="collapse-content">
                <p>Men: every 3 months, Women: every 4 months...</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-rose-200 dark:border-rose-700">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title text-xl font-medium text-rose-700 dark:text-rose-300">Is donating blood safe?</div>
              <div className="collapse-content">
                <p>Yes — new sterile equipment is used every time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8">Get alerts for urgent requests, campaigns, and tips</p>
          <div className="join max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="input input-bordered join-item w-full max-w-xs bg-white text-gray-900"
            />
            <button className="btn bg-rose-800 hover:bg-rose-900 join-item text-white">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 text-center bg-rose-50 dark:bg-rose-950">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6 text-rose-800 dark:text-rose-300">Every Drop Counts</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Be the reason someone smiles today. Join the RedPulse community and help save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="btn btn-lg bg-rose-600 text-white hover:bg-rose-700">Donate Now</Link>
            <Link to="/donation-requests" className="btn btn-lg btn-outline border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white">Request Blood</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;