import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/auth/Login.jsx";

import CustomerDashboard from "../pages/customer/CustomerDashboard.jsx";

import About from "../pages/About.jsx";
import RegisterRole from "../pages/auth/RegisterRole.jsx";
import RegisterCustomer from "../pages/customer/RegisterCustomer.jsx";
import RegisterProvider from "../pages/provider/RegisterProvider.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import PendingProviders from "../pages/admin/PendingProviders.jsx";
import Footer from "../components/Footer.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import CustomerLayout from "../layout/CustomerLayout.jsx";
import ServiceProviderList from "../pages/customer/ServiceProviderList.jsx";
import Profile from "../pages/customer/Profile.jsx";
import BookingPage from "../pages/customer/BookingPage.jsx";
import Logout from "../pages/auth/Logout.jsx";
import View from "../pages/customer/View.jsx";
import EditBooking from "../pages/customer/EditBooking.jsx";
import Review from "../pages/customer/Review.jsx";
import ContactSupportPage from "../pages/customer/ContactSupportPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import ProviderLayout from "../layout/ProviderLayout.jsx";
import ProviderBookings from "../pages/provider/ProviderBookings.jsx";
import ProviderProfile from "../pages/provider/ProviderProfile.jsx";
import Chat from "../pages/Chat.jsx";
import EditProfile from "../pages/customer/EditProfile.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import EditProviderProfile from "../pages/provider/EditProviderProfile.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterRole />} />
          <Route path="/register/customer" element={<RegisterCustomer />} />
          <Route path="/register/provider" element={<RegisterProvider />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contactsupport" element={<ContactSupportPage />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/providers" element={<PendingProviders />} />
        </Route>

        <Route element={<CustomerLayout />}>
          <Route path="/customer" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/customer/service/:type" element={<ProtectedRoute><ServiceProviderList /></ProtectedRoute>} />
          <Route path="/customer/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/customer/service/booking/:providerid" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/customer/bookings" element={<ProtectedRoute><View /></ProtectedRoute>} />
          <Route path="/customer/bookings/edit/:id" element={<ProtectedRoute><EditBooking /></ProtectedRoute>} />
          <Route path="/customer/bookings/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
          <Route path="/customer/chat/:bookingId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/customer/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        </Route>

        <Route element={<ProviderLayout />}>
          <Route path="/provider/bookings" element={<ProtectedRoute><ProviderBookings /></ProtectedRoute>} />
          <Route path="/provider/profile" element={<ProtectedRoute><ProviderProfile /></ProtectedRoute>} />
          <Route path="/provider/chat/:bookingId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/provider/profile/edit" element={<ProtectedRoute><EditProviderProfile /></ProtectedRoute>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
