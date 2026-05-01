import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
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