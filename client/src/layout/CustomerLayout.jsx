import Customerbar from "../components/Customerbar.jsx";
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
