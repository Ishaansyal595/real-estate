import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/30  w-screen overflow-hidden backdrop-blur-md text-orange-400 mt-10 sm:mt-12 py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Social */}
        <div className="flex flex-col items-start gap-3">
          <div className="font-bold text-2xl flex items-center gap-1">
            <span className="text-blue-500">Real</span> Estate
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">
            Your trusted partner in finding the best properties.
          </p>
          <div className="flex gap-3 sm:gap-4 text-blue-500">
            <a href="#">
              <FaFacebookF
                size={18}
                className="hover:text-blue-700 transition"
              />
            </a>
            <a href="#">
              <FaTwitter size={18} className="hover:text-blue-700 transition" />
            </a>
            <a href="#">
              <FaInstagram
                size={18}
                className="hover:text-blue-700 transition"
              />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-blue-500 mb-1 text-base sm:text-lg">
            Quick Links
          </h4>
          <NavLink to="/" className="hover:text-blue-500 transition">
            Home
          </NavLink>
          <NavLink to="/properties" className="hover:text-blue-500 transition">
            Properties
          </NavLink>
          <NavLink to="/contact-us" className="hover:text-blue-500 transition">
            Contact Us
          </NavLink>
          <NavLink to="/login" className="hover:text-blue-500 transition">
            Login
          </NavLink>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-blue-500 mb-1 text-base sm:text-lg">
            Contact
          </h4>
          <span className="text-sm">Phone: 8234678223</span>
          <span className="text-sm">Email: yourEmail@mail.com</span>
          <span className="text-sm">Address: 123 Real Estate St, City</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 sm:mt-6 text-center text-gray-600 text-xs sm:text-sm border-t border-gray-300/30 pt-2 sm:pt-3">
        © {new Date().getFullYear()} Real Estate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
