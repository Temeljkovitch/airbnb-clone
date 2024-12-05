import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import AccountNavbar from "../components/AccountNavbar";
import Loading from "../components/Loading";

const Account = () => {
  const { user, setUser, isLoading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [user]);

  const fetchLogout = async () => {
    await customFetch.post("/api/v1/auth/logout");
    setUser(null);
    toast.info("Goodbye! Hope to see you again soon.");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserUpdate = async () => {
    const { name, email, oldPassword, newPassword } = formData;
    if (!name || !email || !oldPassword || !newPassword) {
      toast.error("Please, fill in all fields!");
      return;
    }
    try {
      await customFetch.patch("/api/v1/user", formData);
      toast.success("All changes have been saved!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <Loading />;

  if (!isLoading && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section>
      <AccountNavbar />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleUserUpdate();
        }}
        className="grid items-center justify-center"
      >
        <div className="w-80">
          <label className="capitalize">name</label>
          <input
            onChange={handleChange}
            className="text-slate-700"
            name="name"
            type="text"
            value={formData.name}
          />
          <label className="capitalize">email</label>
          <input
            onChange={handleChange}
            className="text-slate-700"
            name="email"
            type="text"
            value={formData.email}
            autoComplete="email"
          />
          <label className="capitalize">Current password</label>
          <input
            onChange={handleChange}
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            autoComplete="oldPassword"
          />
          <label className="capitalize">new password</label>
          <input
            onChange={handleChange}
            name="newPassword"
            type="password"
            value={formData.newPassword}
            autoComplete="newPassword"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            type="submit"
            className="bg-cyan-600 py-2 px-6 mt-2 text-white rounded-2xl hover:bg-cyan-700 duration-200 capitalize"
          >
            update
          </button>
          <button
            type="button"
            onClick={fetchLogout}
            className="bg-rose-700 py-2 px-6 mt-2 text-white rounded-2xl hover:bg-rose-900 duration-200 capitalize"
          >
            logout
          </button>
        </div>
      </form>
    </section>
  );
};

export default Account;
