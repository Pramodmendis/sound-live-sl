import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBookNow = () => {
    navigate("/bookingintro");
  };

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-[#0b1120] fixed top-0 left-0 w-full z-50 shadow-md text-white">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
          SOUND <span className="text-green-400">LIVE</span>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </button>

        {/* Nav Links */}
        <nav
          className={`md:flex items-center space-x-8 text-lg ${
            menuOpen ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-[#0b1120] md:bg-transparent p-5 md:p-0`}
        >
          {navLinks.map(({ path, label }) => (
            <a
              key={path}
              href={path}
              className={`block md:inline-block py-2 border-b-2 transition-all ${
                location.pathname === path
                  ? "text-green-400 border-green-400"
                  : "text-gray-300 hover:text-white hover:border-white border-transparent"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA + Avatar */}
        <div className="relative flex items-center space-x-4">
          <button
            className="px-5 py-2 font-medium transition bg-gray-700 rounded hover:bg-green-600"
            onClick={handleBookNow}
          >
            Book Now
          </button>

          <div className="relative" ref={dropdownRef}>
  <button
    className="flex items-center justify-center w-10 h-10 transition duration-200 bg-gray-700 rounded-full hover:ring-2 hover:ring-green-400"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {user?.profilePicture ? (
      <img
        src={`http://localhost:5000/uploads/${user.profilePicture}`}
        alt="Profile"
        className="object-cover w-10 h-10 rounded-full"
      />
    ) : user?.username ? (
      <span className="font-semibold text-white">
        {user.username.charAt(0).toUpperCase()}
      </span>
    ) : (
      <FontAwesomeIcon icon={faUser} className="text-white" />
    )}
  </button>

  {dropdownOpen && (
    <div className="absolute right-0 z-50 mt-2 bg-gray-800 border border-gray-700 shadow-lg w-44 rounded-xl">
      <ul className="py-2 text-sm font-medium text-white">
        {user ? (
          <>
            <li
              onClick={() => navigate("/client/profile")}
              className="px-4 py-2 transition cursor-pointer hover:bg-green-600 hover:text-white rounded-t-md"
            >
              My Profile
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 transition cursor-pointer hover:bg-green-600 hover:text-white rounded-b-md"
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => navigate("/admin/login")}
              className="px-4 py-2 transition cursor-pointer hover:bg-green-600 hover:text-white rounded-t-md"
            >
              Admin
            </li>
            <li
              onClick={() => navigate("/login")}
              className="px-4 py-2 transition cursor-pointer hover:bg-green-600 hover:text-white rounded-b-md"
            >
              Client
            </li>
          </>
        )}
      </ul>
    </div>
  )}
</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
