import { Link, useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')

    const axiosInstancce = useAxios();

    useEffect(()=>{
        axiosInstancce.post(`/success-payment?session_id=${sessionId}`)
        .then(res => {
            console.log(res.data);
        })
    },[axiosInstancce, sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">

        <h1 className="text-6xl font-black mb-4">
          Payment <span className="text-red-500">Successful</span>
        </h1>
        <p className="text-2xl text-gray-500 dark:text-gray-400 mb-10">
          Thank you for saving a life
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-lg rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-red-100 dark:border-gray-700 hover:bg-gray-50 font-bold"
          >
            Back to Home
          </Link>
          <Link
            to="/funding"
            className="btn btn-lg rounded-full bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Donate Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;