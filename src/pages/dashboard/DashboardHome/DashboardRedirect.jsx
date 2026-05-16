import { Navigate } from "react-router";
import { use } from "react";
import { AuthContext } from "../../../contexts/AuthContext";


const DashboardRedirect = () => {
  const {  role, loading } = use(AuthContext);

  if (loading) return null;

  if (role === "admin") {
    return <Navigate to="/dashboard/admin-home" replace />;
  }

  if (role === "volunteer") {
    return <Navigate to="/dashboard/volunteer-home" replace />;
  }

  // default donor
  return <Navigate to="/dashboard/home" replace />;
};

export default DashboardRedirect;
