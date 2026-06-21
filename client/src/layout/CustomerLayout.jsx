import Customerbar from "../components/customerbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <>
      <Customerbar />
      <Outlet />
      <Footer />
    </>
  );
}