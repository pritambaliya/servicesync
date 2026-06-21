import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import PublicNavbar from "../components/PublicNavbar.jsx";

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
      <Footer />
    </>
  );
}