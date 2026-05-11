import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Providerbar from "../components/Providerbar";

export default function ProviderLayout() {
  return (
    <>
      <Providerbar />
      <Outlet />
      <Footer />
    </>
  );
}