import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
const Login = () => {
  const [userData, setuserData] = useState();
  const [showpassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
  });
  const handleLogin = async () => {
    let url = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "Application/json",
      },
    });
    url = await url.json();
    if (url.success) {
      document.cookie = "token=" + url.token;
      localStorage.setItem("login", userData.email);
      window.dispatchEvent(new Event("localstorage-change"));
      navigate("/");
    } else {
      alert("invalid email and password");
    }
  };
  return (
    <div className="w-full h-[89vh] flex justify-center items-center bg-gradient-to-r from-blue-900 to-teal-600 ">
      <div className=" lg:w-[500px] shadow-2xl rounded-2xl p-8 bg-transparent  ">
        <h1 className="text-2xl font-bold text-slate-200 mb-3">
          Login account
        </h1>
        <div className="flex flex-col w-full">
          <label
            htmlFor=""
            className="text-xl font-semibold mb-2 text-slate-200"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter email"
            className="border-gray-400 border shadow-xl bg-transparent outline-none p-2 rounded-md w-full mb-2 "
            onChange={(e) =>
              setuserData({ ...userData, email: e.target.value })
            }
          />
          <label
            htmlFor=""
            className="text-xl font-semibold mb-2 text-slate-200"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              className="border-gray-400 border shadow-xl bg-transparent outline-none p-2 rounded-md w-full mb-2 pr-10"
              onChange={(e) =>
                setuserData({ ...userData, password: e.target.value })
              }
              placeholder="password"
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setshowPassword(!showpassword)}
            >
              {showpassword ? (
                <IoEyeOff size={20} className="text-white" />
              ) : (
                <IoEye size={20} className="text-white" />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 p-2 rounded-md font-bold text-white"
            onClick={handleLogin}
          >
            Submit
          </button>
        </div>
        <p className="mt-4 text-center text-gray-200">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="underline text-blue-400 hover:text-blue-500 transition-all"
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
