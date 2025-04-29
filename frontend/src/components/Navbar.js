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
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBookNow = () => {
    const token = localStorage.getItem("clientToken");
    if (!token) {
      navigate("/bookingintro");
    } else {
      navigate("/bookingintro");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-[#0b1120] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          SOUND LIVE
        </div>

        <button className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </button>

        <nav className={`md:flex space-x-10 text-lg ${menuOpen ? "block" : "hidden"} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-[#0b1120] md:bg-transparent p-5 md:p-0`}>
          {[
            { path: "/home", label: "Home" },
            { path: "/services", label: "Services" },
            { path: "/projects", label: "Projects" },
            { path: "/blog", label: "Blog" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact Us" },
          ].map(({ path, label }) => (
            <a key={path} href={path} className={`block md:inline-block py-2 ${location.pathname === path ? "text-gray-300 border-b-2 border-gray-300" : "hover:text-gray-400"}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="relative flex items-center space-x-6">
          <button className="hidden px-5 py-2 text-white bg-gray-700 md:block hover:bg-gray-600" onClick={handleBookNow}>
            Book Now
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user?.profilePicture ? (
                <img
                  src={`http://localhost:5000/uploads/${user.profilePicture}`}
                  alt="Profile"
                  className="object-cover w-10 h-10 rounded-full"
                />
              ) : user?.username ? (
                <span className="font-semibold text-white">{user.username.charAt(0).toUpperCase()}</span>
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-white" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-50 w-48 mt-2 text-black bg-white rounded-md shadow-lg">
                {user ? (
                  <>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={() => navigate("/client/profile")}
                    >
                      My Profile
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={() => navigate("/admin/login")}
                    >
                      Admin
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={() => navigate("/login")}
                    >
                      Client
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
