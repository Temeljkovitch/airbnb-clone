import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { customFetch } from "../utils";

const Account = () => {
  const { user, setUser, loading } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  const fetchLogout = async () => {
    await customFetch.post("/api/v1/auth/logout");
    setUser(null);
  };

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
    let classNames = "py-2 px-6";
    if (linkName === subpage) {
      classNames += " bg-cyan-600 rounded-full text-white";
    }
    return classNames;
  };

  return (
    <section>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClassNames("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClassNames("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClassNames("places")} to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={fetchLogout} className="primary max-w-sm mt-2">
            logout
          </button>
        </div>
      )}
    </section>
  );
};

export default Account;
