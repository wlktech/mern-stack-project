import axios from "../helpers/axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const logout = async () => {
    const res = await axios.post("/logout");
    if(res.status === 200){
      dispatch({type: "LOGOUT"})
      navigate("/login");
    }
  };
  return (
    <>
      <nav className="flex justify-between items-center p-5 shadow-lg">
        <div>
          <h1 className="font-bold text-2xl text-green-500">MERN</h1>
        </div>
        <ul className="flex space-x-10">
          <li>
            <Link className="hover:text-green-500" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-green-500" to={"/about"}>
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-green-500" to={"/contact"}>
              Contact
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link className="hover:text-green-500" to={"/login"}>
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-green-500" to={"/register"}>
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                {user.name}
              </li>
              <li>
                <button onClick={logout} className="hover:text-green-500">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
