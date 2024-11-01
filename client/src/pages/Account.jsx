import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { PiUser, PiHouseLine, PiCalendarBlank } from "react-icons/pi";
import Profile from "./Profile";
import Bookings from "./Bookings";
import Accommodations from "./Accommodations";

const Account = () => {
  const { user, loading } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  if (loading) {
    return (
      <div className="mx-auto flex mt-24">
        <div className="w-24 h-24 border-4 border-slate-400 rounded-full border-t-cyan-600 animate-spin"></div>
      </div>
    );
  }

  if (!loading && !user) {
    return <Navigate to={"/login"} />;
  }

  const linkClassNames = (linkName = null) => {
    let classNames =
      "py-2 px-5 rounded-full capitalize flex gap-2 items-center hover:shadow-md duration-300";
    if (linkName === subpage) {
      classNames += " bg-cyan-600 text-white";
    } else {
      classNames += " bg-slate-200";
    }
    return classNames;
  };

  return (
    <section>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClassNames("profile")} to={"/account"}>
          <PiUser className="w-5 h-5" />
          My profile
        </Link>
        <Link className={linkClassNames("bookings")} to={"/account/bookings"}>
          <PiCalendarBlank className="w-5 h-5" />
          My bookings
        </Link>
        <Link
          className={linkClassNames("accommodations")}
          to={"/account/accommodations"}
        >
          <PiHouseLine className="w-5 h-5" />
          My accommodations
        </Link>
      </nav>
      {/* My profile subpage */}
      {subpage === "profile" && <Profile />}
      {/* My accommodations subpage */}
      {subpage === "accommodations" && <Accommodations />}
      {/* My bookings subpage */}
      {subpage === "bookings" && <Bookings />}
    </section>
  );
};

export default Account;
