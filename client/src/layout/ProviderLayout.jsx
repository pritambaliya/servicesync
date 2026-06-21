import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import Providerbar from "../components/Providerbar.jsx";

export default function ProviderLayout() {
  return (
    <>
      <Providerbar />
      <Outlet />
      <Footer />
    </>
  );
}