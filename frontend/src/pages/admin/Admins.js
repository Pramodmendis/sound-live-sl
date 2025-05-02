import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Admins = () => {
  const location = useLocation();
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const currentAdmin = JSON.parse(localStorage.getItem("admin") || "null");

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

  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Failed to fetch admins", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Sub-admin added");
        setForm({ username: "", email: "", password: "" });
        fetchAdmins();
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Add admin error", err);
      alert("❌ Failed to add sub-admin.");
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (res.ok) {
        alert("✅ Admin deleted");
        fetchAdmins();
      } else {
        const data = await res.json();
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Delete admin error:", err);
    }
  };

  const handleToggleRole = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/toggle-role/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (res.ok) {
        alert("✅ Role updated");
        fetchAdmins();
      } else {
        const data = await res.json();
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Toggle role error:", err);
    }
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
        <h2 className="mb-6 text-3xl font-bold">Admins</h2>

        {currentAdmin?.role === "super" && (
          <div className="p-6 mb-10 bg-gray-800 rounded-lg shadow">
            <h3 className="mb-4 text-xl font-semibold">➕ Add New Admin</h3>
            <form onSubmit={handleAddAdmin} className="grid gap-4 md:grid-cols-3">
              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="p-3 text-white bg-gray-900 border border-gray-700 rounded"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="p-3 text-white bg-gray-900 border border-gray-700 rounded"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="p-3 text-white bg-gray-900 border border-gray-700 rounded"
              />
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full px-6 py-3 font-semibold bg-green-600 rounded-lg md:w-auto hover:bg-green-700"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Admin List */}
        <div className="p-6 bg-gray-800 rounded-lg shadow">
          <h3 className="mb-4 text-xl font-semibold">🧑‍💼 Admin List</h3>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                {currentAdmin?.role === "super" && <th className="p-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-t border-gray-600 hover:bg-gray-700"
                >
                  <td className="p-3">{admin.username}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        admin.role === "super"
                          ? "bg-purple-600"
                          : "bg-green-600"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  {currentAdmin?.role === "super" && (
                    <td className="p-3 space-x-2">
                      {admin.role !== "super" ? (
                        <>
                          <button
                            onClick={() => handleToggleRole(admin._id)}
                            className="px-3 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-700"
                          >
                            Promote
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(admin._id)}
                            className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">No Action</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-400">
                    No admins found.
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

export default Admins;
