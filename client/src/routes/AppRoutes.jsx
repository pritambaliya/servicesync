import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import PrivateLayout from "../layout/PrivateLayout";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import ManageBookings from "../pages/provider/ManageBookings";
import About from "../pages/About";
import RegisterRole from "../pages/auth/RegisterRole";
import RegisterCustomer from "../pages/customer/RegisterCustomer";
import RegisterProvider from "../pages/provider/RegisterProvider";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterRole />} />
          <Route path="/register/customer" element={<RegisterCustomer />} />
          <Route path="/register/provider" element={<RegisterProvider />} />
        </Route>


        {/* PRIVATE ROUTES */}
        <Route element={<PrivateLayout />}>

          {/* Customer */}
          <Route path="/customer" element={<CustomerDashboard />} />

          {/* Provider */}
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/bookings" element={<ManageBookings />} />

          {/* Admin */}
          <Route path="/admin" element={<h1>Admin Dashboard</h1>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}