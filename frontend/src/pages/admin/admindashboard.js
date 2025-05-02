import {
  MonitorSpeaker,
  Music,
  ShieldCheck,
  Users,
} from "lucide-react"; // optional icons
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalStudioBookings: 0,
    totalEquipmentBookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin-dashboard/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

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

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Sidebar */}
      <aside className="hidden w-64 p-6 bg-gray-800 md:block">
        <h2 className="mb-8 text-2xl font-bold text-green-400">Sound Live</h2>
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
              localStorage.removeItem("adminToken");
              localStorage.removeItem("admin");
              navigate("/home");
            }}
            className="block w-full px-4 py-2 mt-8 text-left text-gray-300 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {admin && (
          <div className="flex flex-col items-center justify-between mb-8 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold text-green-400">
                Welcome, {admin.username}
              </h2>
              <p className="text-sm text-gray-400">{admin.email}</p>
              <p className="text-xs text-gray-500">({admin.role})</p>
            </div>
            <div className="flex items-center justify-center mt-4 text-xl font-bold uppercase bg-green-600 rounded-full sm:mt-0 w-14 h-14">
              {admin.username?.charAt(0)}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="p-6 transition bg-gray-800 shadow-lg rounded-xl hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Total Users</h3>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-green-400">{stats.totalUsers}</p>
          </div>

          <div className="p-6 transition bg-gray-800 shadow-lg rounded-xl hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Total Admins</h3>
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-green-400">{stats.totalAdmins}</p>
          </div>

          <div className="p-6 transition bg-gray-800 shadow-lg rounded-xl hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Studio Bookings</h3>
              <MonitorSpeaker className="w-5 h-5 text-pink-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-green-400">{stats.totalStudioBookings}</p>
          </div>

          <div className="p-6 transition bg-gray-800 shadow-lg rounded-xl hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Equipment Bookings</h3>
              <Music className="w-5 h-5 text-red-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-green-400">{stats.totalEquipmentBookings}</p>
          </div>
        </div>

        {/* Quick Actions - Optional */}
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          <button
            onClick={() => navigate("/admin/StudioBookings")}
            className="p-5 text-center transition bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
          >
            📅 View Studio Bookings
          </button>
          <button
            onClick={() => navigate("/admin/Users")}
            className="p-5 text-center transition bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
          >
            👥 Manage Users
          </button>
          <button
            onClick={() => navigate("/admin/Admins")}
            className="p-5 text-center transition bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700"
          >
            ➕ Add Admin
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
