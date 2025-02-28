import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleNavigate = (path) => {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-[#0b1120] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-2xl">SOUND LIVE</div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </button>

        <nav className={`md:flex space-x-10 text-lg ${menuOpen ? "block" : "hidden"} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-[#0b1120] md:bg-transparent p-5 md:p-0`}>
          {[
            { path: "/home", label: "Home" },
            { path: "/services", label: "Services" },
            { path: "/projects", label: "Projects" },
            { path: "/blog", label: "Blog" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact Us" }
          ].map(({ path, label }) => (
            <a
              key={path}
              href={path}
              className={`block md:inline-block py-2 ${location.pathname === path ? "text-gray-300 border-b-2 border-gray-300" : "hover:text-gray-400"}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-6 relative">
          <button className="hidden md:block bg-gray-700 text-white px-5 py-2 hover:bg-gray-600" onClick={() => handleNavigate("/bookingintro")}>
            Book Now
          </button>

          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user ? (
                <span className="text-white font-semibold">{user.username.charAt(0)}</span>
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-white" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
                {user ? (
                  <>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                      {user.username}
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleNavigate("/admin/login")}>
                      Admin
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleNavigate("/login")}>
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