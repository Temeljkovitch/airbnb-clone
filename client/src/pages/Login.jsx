import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { customFetch } from "../utils";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await customFetch.post("api/v1/auth/login", {
        email,
        password,
      });
      alert("Login successful!");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div>
        <h1 className="text-4xl text-center mb-4">Log in</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary capitalize hover:bg-[#c42d4a] duration-300">
            login
          </button>
          <div className="text-center py-2 text-slate-500">
            Don't have an account yet?{" "}
            <Link
              className="underline text-slate-700 hover:text-black duration-200"
              to={"/register"}
            >
              Register now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
