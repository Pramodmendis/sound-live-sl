import {
  BarChart,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MonitorSpeaker,
  Music,
  UserPlus,
  Users as UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const Admins = () => {
  usePageTitle("Admins");
  const location = useLocation();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentAdmin = JSON.parse(localStorage.getItem("admin") || "null");

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Studio Bookings", path: "/admin/StudioBookings", icon: CalendarClock },
    { name: "Equipment Bookings", path: "/admin/EquipmentBookings", icon: MonitorSpeaker },
    { name: "Band Bookings", path: "/admin/BandBookings", icon: Music },
    { name: "Add Booking Slot", path: "/admin/AddBookingSlot", icon: CalendarClock },
    { name: "All Bands", path: "/admin/AllBands", icon: Music },
    { name: "Users", path: "/admin/Users", icon: UsersIcon },
    { name: "Admins", path: "/admin/Admins", icon: UserPlus },
    { name: "Client Messages", path: "/admin/ClientMessages", icon: Mail },
    { name: "Blog Management", path: "/admin/BlogManage", icon: BarChart },
    { name: "Subscribers", path: "/admin/AdminSubscribers", icon: UsersIcon },
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
      <aside className={`fixed z-40 inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out bg-gray-800 w-64 p-6 md:block`}>
        <h2 className="mb-8 text-2xl font-bold text-green-400">Sound Live</h2>
        <nav className="space-y-4">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
                isActive(path)
                  ? "bg-green-600 text-white font-semibold"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("admin");
              navigate("/home");
            }}
            className="flex items-center w-full gap-2 px-4 py-2 mt-8 text-left text-gray-300 rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        <button
          className="mb-4 text-white md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="mb-6 text-3xl font-bold text-green-400">Admins</h2>

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
                        admin.role === "super" ? "bg-purple-600" : "bg-green-600"
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
