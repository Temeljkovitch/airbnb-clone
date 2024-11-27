import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <main className="py-4 lg:px-60 md:px-16 sm:px-8 flex flex-col min-h-screen">
      <ToastContainer position="top-center" />
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
