import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div >
        <h1 className="text-4xl text-center mb-4">Log in</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary capitalize hover:bg-[#c42d4a] duration-300">
            login
          </button>
          <div className="text-center py-2 text-slate-500">
            Don't have an account yet?{" "}
            <Link className="underline text-slate-700 hover:text-black duration-200" to={"/register"}>Register now!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
