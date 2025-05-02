import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Studio Bookings", path: "/admin/StudioBookings" },
    { name: "Equipment Bookings", path: "/admin/EquipmentBookings" },
    { name: "Band Bookings", path: "/admin/BandBookings" },
    { name: "All Bands", path: "/admin/AllBands" },
    { name: "Users", path: "/admin/Users" },
    { name: "Admins", path: "/admin/Admins" },
    { name: "Client Messages", path: "/admin/ClientMessages" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/clientusers/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
    `${u.username} ${u.email}`.toLowerCase().includes(query.toLowerCase())
  );

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Sidebar */}
      <aside className="hidden w-64 p-6 bg-gray-800 md:block">
        <h2 className="mb-8 text-2xl font-bold text-green-400">Admin Panel</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block py-2 px-4 rounded-lg ${
                isActive(item.path)
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="block w-full px-4 py-2 mt-8 text-left text-gray-300 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="mb-6 text-3xl font-bold">Users</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by username or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 text-white bg-gray-800 border border-gray-600 rounded md:w-1/2"
          />
        </div>

        <div className="p-4 overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Registered On</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={i} className="border-b border-gray-600 hover:bg-gray-700">
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-400">
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Users;
