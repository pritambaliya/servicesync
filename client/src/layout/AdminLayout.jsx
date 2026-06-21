import AdminNavbar from "../components/AdminNavbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </>
  );
}