import { FaBars } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, searchQuery, setSearchQuery } = useContext(UserContext);
  const location = useLocation();

  return (
    <nav>
      {/* Logo */}
      <header className="flex justify-between ">
        <Link to={"/"} className="flex gap-x-1 items-center top-0">
          <IoWaterOutline className="w-8 h-8 text-cyan-600" />
          <span className="text-cyan-600 hidden sm:block font-semibold font-montserrat text-2xl">
            waterbnd
          </span>
        </Link>
        {/* Search */}
        <div>
          {location.pathname === "/" && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-slate-300 !rounded-full appearance-none p-2 !w-24 sm:!w-52 focus:outline-none focus:ring focus:ring-cyan-600"
            />
          )}
        </div>
        {/* Login button */}
        <Link
          to={user ? "/account" : "/login"}
          className="flex gap-2 border border-slate-300 rounded-full py-2 px-4 hover:shadow-md duration-200 text-slate-700"
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
