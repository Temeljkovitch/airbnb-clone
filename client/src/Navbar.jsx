import { BiSearch } from "react-icons/bi";
import { FaBars, FaWater } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav>
      {/* Logo */}
      <header className="flex justify-between">
        <a href="/" className="flex gap-x-2">
          <FaWater className="w-8 h-8 rotate-1 text-primary" />
          <span className="text-primary font-semibold text-xl">waterbnd</span>
        </a>
        {/* Search */}
        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primary hover:bg-[#c42d4a] duration-300 text-white p-1 rounded-full">
            <BiSearch className="w-4 h-4" />
          </button>
        </div>
        {/* Login button */}
        <Link
          to={"/login"}
          className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-md duration-300 text-slate-700"
        >
          <FaBars className="w-5 h-5 relative top-[0.10rem] " />
          <FaUserCircle className="w-6 h-6 " />
          {!!user && <div className="capitalize ">{user.name}</div>}
        </Link>
      </header>
    </nav>
  );
};

export default Navbar;
