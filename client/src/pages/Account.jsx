import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import AccountNavbar from "../components/AccountNavbar";

const Account = () => {
  const { user, setUser, loading } = useContext(UserContext);

  const fetchLogout = async () => {
    await customFetch.post("/api/v1/auth/logout");
    setUser(null);
    toast.info("Goodbye! Hope to see you again soon.");
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

  return (
    <section>
      <AccountNavbar />

      <div className="text-center">
        Logged in as {user.name} ({user.email})<br />
        <button onClick={fetchLogout} className="primary max-w-sm mt-2">
          logout
        </button>
      </div>
    </section>
  );
};

export default Account;
