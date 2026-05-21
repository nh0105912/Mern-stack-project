import {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [login, setlogin] = useState(localStorage.getItem("login"));
  const navigate =useNavigate()
  const handleLogout = () =>{
    setTimeout(()=>{
      
    })
    localStorage.removeItem('login')
    setlogin(null)
    setTimeout(() => {
      navigate("/login")
    }, 0);
    // navigate("/login");
  };

  useEffect(()=>{
    const localChage=()=>{
      setlogin(localStorage.getItem('login'))
    }
    window.addEventListener("localstorage-change", localChage);

    return ()=>{
      window.removeEventListener("localstorage-change", localChage);
    }
  })
  return (
    <nav className="px-6 lg:px-20 py-4 flex items-center justify-between gap-x-2 lg:gap-x-6 bg-gradient-to-b from-blue-600 to-teal-900">
      <h1 className="text-white text-md lg:text-2xl font-bold">
        TODO{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          APP
        </span>
      </h1>
      <ul className="flex justify-between items-center gap-x-8">
        {login ? (
          <>
            <li className="text-white text-base font-medium">
              <Link to="/">List</Link>
            </li>

            <li className="text-white text-base font-medium">
              <Link to="/add-task">Add Task</Link>
            </li>

            <li className="text-white text-base font-medium">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
