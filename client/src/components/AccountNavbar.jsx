import { Link, useLocation } from "react-router-dom";
import { PiUser, PiHouseLine, PiCalendarBlank } from "react-icons/pi";

const AccountNavbar = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  const linkClassNames = (linkName = null) => {
    let classNames =
      "py-2 px-5 rounded-full capitalize flex gap-2 items-center hover:shadow-md duration-200";
    if (linkName === subpage) {
      classNames += " bg-cyan-600 text-white";
    } else {
      classNames += " bg-slate-200";
    }
    return classNames;
  };
  return (
    <nav className="w-full flex justify-center mt-8 gap-x-8 sm:gap-x-2 mb-8">
      <Link className={linkClassNames("profile")} to={"/account"}>
        <PiUser className="w-5 h-5" />
        <span className="hidden sm:block">My profile</span>
      </Link>
      <Link className={linkClassNames("bookings")} to={"/account/bookings"}>
        <PiCalendarBlank className="w-5 h-5" />
        <span className="hidden sm:block">My bookings</span>
      </Link>
      <Link
        className={linkClassNames("accommodations")}
        to={"/account/accommodations"}
      >
        <PiHouseLine className="w-5 h-5" />
        <span className="hidden sm:block">My accommodations</span>
      </Link>
    </nav>
  );
};

export default AccountNavbar;
