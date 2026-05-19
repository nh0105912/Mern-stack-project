import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [userData, setuserData] = useState();
  const handleLogin = async () => {
    let url = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "Application/json",
      },
    });
    url = await url.json();
    if (url) {
      console.log(userData);
      document.cookie = "token=" + url.token;
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="  gap-4 shadow-2xl rounded-xl p-8 ">
        <h1 className="text-2xl font-bold text-blue-600 mb-3">
          Login account
        </h1>
        <div className="flex flex-col w-full">
          <label htmlFor="" className="text-xl font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter email"
            className="border outline-none p-2 rounded-md w-[250px] mb-2 "
            onChange={(e) =>
              setuserData({ ...userData, email: e.target.value })
            }
          />
          <label htmlFor="" className="text-xl font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id=""
            className="border outline-none p-2 rounded-md w-[250px] mb-2 "
            onChange={(e) =>
              setuserData({ ...userData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 p-2 rounded-md font-bold text-white"
            onClick={handleLogin}
          >
            Submit
          </button>
        </div>
        <p className="mt-3 text-center ">
          if you've not account{" "}
          <Link
            to="/signup"
            className="underline text-blue-600 active:text-purple-600"
          >
            register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
