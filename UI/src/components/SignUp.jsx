import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
const SignUp = () => {
  const [userData, setuserData] = useState();
   const [showpassword, setshowPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate("/")
    }
  })
  const handleSignup = async () => {
    let response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "Application/json",
      },
    });
    const data= await response.json();
    if (data.success) {
      console.log(userData);
      document.cookie = "token=" + data.token;
      localStorage.setItem("login", userData.email)
      navigate("/")
     
    }

    navigate("/login");
  };
  return (
    <div className="w-full h-[89vh] flex justify-center items-center bg-gradient-to-r from-blue-900 to-teal-600">
      <div className=" lg:w-[500px] shadow-2xl rounded-2xl p-8 bg-transparent">
        <h1 className="text-2xl font-bold text-slate-200 mb-3">
          Create the accout
        </h1>
        <div className="flex flex-col w-full">
          <label
            htmlFor=""
            className="text-xl text-slate-200 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="my-2 border shadow-2xl outline-none p-2 rounded-md w-full mb-2  bg-transparent"
            onChange={(e) => setuserData({ ...userData, name: e.target.value })}
          />
          <label
            htmlFor=""
            className="text-xl text-slate-200 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter email"
            className="my-2 border shadow-2xl outline-none p-2 rounded-md w-full mb-2  bg-transparent"
            onChange={(e) =>
              setuserData({ ...userData, email: e.target.value })
            }
          />
          <label
            htmlFor=""
            className="text-xl text-slate-200 font-semibold mb-2"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              className="my-2 border shadow-xl bg-transparent outline-none p-2 rounded-md w-full mb-2 pr-10"
              onChange={(e) =>
                setuserData({ ...userData, password: e.target.value })
              }
              placeholder="password"
            />

            <span
              className="absolute right-3 top-5 cursor-pointer text-gray-600"
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
            onClick={handleSignup}
          >
            SignUp
          </button>
        </div>
        <p className="mt-3 text-center text-gray-200">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-500 transition-all underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
