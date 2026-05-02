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
import Logout from "../pages/auth/Logout";
import Footer from "../components/Footer";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/customerLayout";
import ServiceProviderList from "../pages/customer/ServiceProviderList";
import Profile from "../pages/customer/Profile";

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
          <Route path="/service/:type" element={<ServiceProviderList />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}