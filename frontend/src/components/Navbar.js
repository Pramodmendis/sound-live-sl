import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const handleNavigate = (path) => {
    setDropdownOpen(false); // Close dropdown when navigating
    navigate(path);
  };

  return (
    <header className="bg-[#0b1120] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="font-bold text-2xl">SOUND LIVE</div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-10 text-lg">
          <a href="/home" className="hover:text-gray-400" >Home</a>
          <a href="/services" className="hover:text-gray-400">Services</a>
          <a href="/projects" className="hover:text-gray-400">Projects</a>
          <a href="/blog" className="hover:text-gray-400">Blog</a>
          <a href="/about" className="hover:text-gray-400">About</a>
          <a href="/contact" className="hover:text-gray-400">Contact Us</a>
        </nav>

        {/* Call to Action & Login Icon */}
        <div className="flex items-center space-x-6 relative">
          <button className="bg-gray-700 text-white px-5 py-2 hover:bg-gray-600"
           onClick={() => handleNavigate("/bookingintro")}>
            Book Now
          </button>
          
          {/* User Icon Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FontAwesomeIcon icon={faUser} className="text-white" />
            </button>

            {/* Dropdown Box */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleNavigate("/admin/login")}
                >
                  Admin
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleNavigate("/Login")}
                >
                  Client
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
