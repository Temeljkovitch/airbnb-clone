import { useState } from "react";
import { Link } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await customFetch.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      toast.success("Registration successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-4 grow flex items-center justify-around">
      <div>
        <h1 className="text-4xl text-center mb-4">Sign up</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
          <button className="primary">Sign Up</button>
          <div className="text-center py-2 text-slate-500">
            Already have an account?{" "}
            <Link
              className="underline text-slate-700 hover:text-black duration-200"
              to={"/login"}
            >
              Login now!
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
