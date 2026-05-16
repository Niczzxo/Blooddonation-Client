import { GiftIcon } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../contexts/AuthContext';

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [totalFunding, setTotalFunding] = useState(0);

  useEffect(() => {
    axiosSecure.get("/payments/history")
      .then(res => {
        const payments = res.data || [];
        setHistory(payments);
        const total = payments.reduce((sum, p) => sum + p.amount, 0);
        setTotalFunding(total);
        setHistoryLoading(false);
      })
      .catch(() => {
        setHistory([]);
        setHistoryLoading(false);
      });
  }, [axiosSecure]);

  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;

    if (!donateAmount || donateAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const formData = {
      donateAmount,
      donorEmail: user?.email,
      donorName: user?.displayName || "Anonymous"
    };

    axiosSecure.post('/create-payment-checkout', formData)
      .then(res => {
        window.location.href = res.data.url;
      })
      .catch(() => toast.error("Payment failed"));
  };

  return (
    <div className="mt-10 py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-red-500 mb-8">
            Support Our Mission
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Your generous donation helps us save more lives through timely blood donations.
          </p>

          <form onSubmit={handleCheckout} className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <input
                type="number"
                name="donateAmount"
                placeholder="Enter amount (USD)"
                min="1"
                required
                className="input input-lg w-80 bg-white border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xl text-center rounded-full shadow-xl"
              />
              <button type="submit" className="btn btn-lg bg-red-600 hover:bg-red-700 text-white rounded-full px-12 shadow-2xl text-xl font-bold flex items-center gap-3">
                <GiftIcon size={32} />
                Donate Now
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 p-8 text-center">
            <h2 className="text-4xl font-bold text-white">Funding History</h2>
            <p className="text-xl text-white/90 mt-3">Thank you to all our generous donors ❤️</p>
          </div>

          {historyLoading ? (
            <div className="p-20"><Loading /></div>
          ) : history.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th>#</th>
                      <th>Donor</th>
                      <th>Amount</th>
                      <th>Transaction ID</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((payment, idx) => (
                      <tr key={payment._id} className="hover:bg-red-50">
                        <td>{idx + 1}</td>
                        <td className="font-medium">{payment.donorEmail}</td>
                        <td className="font-bold text-green-600 text-xl">${payment.amount}</td>
                        <td className="text-sm text-gray-600 font-mono">{payment.transactionId}</td>
                        <td>{new Date(payment.paidAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-10 text-center">
                <h3 className="text-3xl font-bold">Total Funding Received</h3>
                <p className="text-6xl font-black mt-6">${totalFunding.toFixed(2)}</p>
                <p className="text-xl mt-4 opacity-90">Thank you for making a difference!</p>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <GiftIcon size={64} className="text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No Donations Yet</h3>
              <p className="text-xl text-gray-600">Be the first to contribute and help save lives!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Funding;