import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="py-4 lg:px-16 md:px-14 sm:px-8 flex flex-col min-h-screen">
      <ToastContainer position="top-center" />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
