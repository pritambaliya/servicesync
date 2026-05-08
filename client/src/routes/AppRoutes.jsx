import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";

import CustomerDashboard from "../pages/customer/CustomerDashboard";

import About from "../pages/About";
import RegisterRole from "../pages/auth/RegisterRole";
import RegisterCustomer from "../pages/customer/RegisterCustomer";
import RegisterProvider from "../pages/provider/RegisterProvider";

import AdminDashboard from "../pages/admin/AdminDashboard";
import PendingProviders from "../pages/admin/PendingProviders";
import Footer from "../components/Footer";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/customerLayout";
import ServiceProviderList from "../pages/customer/ServiceProviderList";
import Profile from "../pages/customer/Profile";
import BookingPage from "../pages/customer/BookingPage";
import Logout from "../pages/auth/Logout";
import View from "../pages/customer/View";
import EditBooking from "../pages/customer/EditBooking";
import Review from "../pages/customer/Review";

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
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/providers" element={<PendingProviders />} />
        </Route>

        <Route element={<CustomerLayout />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/service/:type" element={<ServiceProviderList />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/service/booking/:providerid" element={<BookingPage />} />
          <Route path="/customer/bookings" element={<View />} />
          <Route path="/customer/bookings/edit/:id" element={<EditBooking />} />
          <Route path="/customer/bookings/review" element={<Review />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}