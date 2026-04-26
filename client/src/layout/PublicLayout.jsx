import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import PublicNavbar from "../components/PublicNavbar";

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
      <Footer />
    </>
  );
}