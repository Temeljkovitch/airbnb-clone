import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import AccountNavbar from "../components/AccountNavbar";
import Loading from "../components/Loading";

const Account = () => {
  const { user, setUser, isLoading } = useContext(UserContext);

  const fetchLogout = async () => {
    await customFetch.post("/api/v1/auth/logout");
    setUser(null);
    toast.info("Goodbye! Hope to see you again soon.");
  };

  if (isLoading) return <Loading />;

  if (!isLoading && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section>
      <AccountNavbar />

      <div className="text-center">
        Logged in as {user.name} ({user.email})<br />
        <button
          onClick={fetchLogout}
          className="bg-cyan-600 mx-auto w-max py-2 px-6 mt-2 text-white rounded-2xl hover:bg-cyan-700 duration-200 capitalize"
        >
          logout
        </button>
      </div>
    </section>
  );
};

export default Account;
