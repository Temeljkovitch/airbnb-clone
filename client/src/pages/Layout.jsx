import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <main className="py-4 px-8 lg:px-56 md:px-16 sm:px-10 flex flex-col min-h-screen">
      <ToastContainer position="top-center" />
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
