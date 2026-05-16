import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-red-600 mb-8">404</h1>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn btn-lg bg-red-600 hover:bg-red-700 text-white rounded-full px-12 shadow-xl"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;