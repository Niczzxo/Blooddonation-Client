import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DonationRequests from "../pages/donation/DonationRequests";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import Profile from "../pages/dashboard/profile/Profile";
import CreateDonationRequest from "../pages/dashboard/donor/CreateDonationRequest";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AllDonationRequests from "../pages/dashboard/admin/AllDonationRequests";
import DashboardHome from "../pages/dashboard/DashboardHome/DashboardRedirect";
import SearchDonors from "../pages/search/SearchDonors";
import MyDonationRequests from "../pages/dashboard/donor/MyDonationRequests";
import Funding from "../pages/funding/Funding";
import PrivateRoute from "./PrivateRoute";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import DonationDetails from "../pages/donation/DonationDetails";
import EditDonationRequest from "../pages/dashboard/donor/EditDonationRequest";
import DonorHome from "../pages/dashboard/donor/DonorHome";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import VolunteerHome from "../pages/dashboard/volunteer/VolunteerHome";
import DashboardRedirect from "../pages/dashboard/DashboardHome/DashboardRedirect";
import NotFound from "../pages/ErrorPage/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "search",
        element: <SearchDonors />
      },
      {
        path: "donation-requests",
        element: <DonationRequests />
      },
      {
        path: "donation-requests/:id",
        element: <DonationDetails />
      },
      {
        path: "funding",
        element: <Funding />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardRedirect />
      },
      {
        path: "home",
        element: <DonorHome />
      },
      {
        path: "admin-home",
        element: <AdminHome />
      },
      {
        path: "volunteer-home",
        element: <VolunteerHome />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "edit-request/:id",
        element: <EditDonationRequest />
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />,
      }
    ]
  },
  {
  path: "*",
  element: <NotFound />
}
]);