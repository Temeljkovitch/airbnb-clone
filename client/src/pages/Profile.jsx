import { useContext } from "react";
import { UserContext } from "../UserContext";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const fetchLogout = async () => {
    await customFetch.post("/api/v1/auth/logout");
    setUser(null);
    toast.info("Goodbye! Hope to see you again soon.");
  };

  return (
    <div className="text-center">
      Logged in as {user.name} ({user.email})<br />
      <button onClick={fetchLogout} className="primary max-w-sm mt-2">
        logout
      </button>
    </div>
  );
};

export default Profile;
