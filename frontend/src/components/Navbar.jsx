import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/slice";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  return (
    <div className="fixed top-0 w-full backdrop-blur-md bg-white/30 py-2 sm:py-3 px-4 sm:px-6 md:px-8 flex justify-between items-center z-30 shadow-sm">
      {/* Logo */}
      <div className="font-bold text-2xl md:text-3xl flex items-center gap-1 text-orange-400">
        <span className="text-blue-500">Real</span> Estate
      </div>

      {/* For Desktop */}
      {/* Nav links & login */}
      <div
        className={`${
          show
            ? "absolute bg-black w-[70%] sm:w-60 rounded-lg right-2 top-12 py-5 flex flex-col"
            : "hidden"
        }  md:flex items-center gap-5 text-sm md:text-base text-orange-400`}
      >
        {" "}
        <NavLink
          to="/"
          onClick={() => setShow(false)}
          className="hover:text-blue-700 hover:border-blue-500 hover:border-b hover:border-t py-1 transition"
        >
          Home
        </NavLink>
        <NavLink
          to="/properties"
          onClick={() => setShow(false)}
          className="hover:text-blue-500 hover:border-blue-500 hover:border-b hover:border-t transition py-1"
        >
          Properties
        </NavLink>
        <NavLink
          to="/contact-us"
          onClick={() => setShow(false)}
          className="hover:text-blue-500 hover:border-blue-500 hover:border-b hover:border-t py-1 transition"
        >
          Contact us
        </NavLink>
        {userInfo ? (
          <>
            <NavLink to="/profile">
              <button
                className="text-blue-500 font-semibold"
                onClick={() => setShow(false)}
              >
                Hi, {userInfo.name.split(" ")[0]}
              </button>
            </NavLink>
            <button
              onClick={() => {
                dispatch(logout());
                setShow(false);
              }}
              className="py-1 px-4 bg-red-500 hover:bg-red-700 text-white rounded-full transition"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">
            <button className="py-1 px-4 bg-blue-500 hover:bg-blue-900 text-white rounded-full transition">
              Login
            </button>
          </NavLink>
        )}
      </div>

      {/* Hamburger */}
      <RxHamburgerMenu
        className="block md:hidden text-xl sm:text-2xl cursor-pointer"
        onClick={() => setShow(!show)}
      />
    </div>
  );
};

export default Navbar;
