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
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const AllBands = () => {
  usePageTitle("All Bands");
  const location = useLocation();
  const navigate = useNavigate();
  const [bands, setBands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedBand, setEditedBand] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Studio Bookings", path: "/admin/StudioBookings", icon: CalendarClock },
    { name: "Equipment Bookings", path: "/admin/EquipmentBookings", icon: MonitorSpeaker },
    { name: "Band Bookings", path: "/admin/BandBookings", icon: Music },
    { name: "Add Booking Slot", path: "/admin/AddBookingSlot", icon: CalendarClock },
    { name: "All Bands", path: "/admin/AllBands", icon: Music },
    { name: "Users", path: "/admin/Users", icon: Users },
    { name: "Admins", path: "/admin/Admins", icon: UserPlus },
    { name: "Client Messages", path: "/admin/ClientMessages", icon: Mail },
    { name: "Blog Management", path: "/admin/BlogManage", icon: BarChart },
    { name: "Subscribers", path: "/admin/AdminSubscribers", icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  const fetchBands = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bands/all");
      const data = await res.json();
      setBands(data);
    } catch (err) {
      console.error("Failed to fetch bands:", err);
    }
  };

  useEffect(() => {
    fetchBands();
  }, []);

  const handleEdit = (band) => {
    setEditingId(band._id);
    setEditedBand({ ...band });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bands/update/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedBand),
      });
      if (res.ok) {
        alert("✅ Band updated");
        setEditingId(null);
        fetchBands();
      } else {
        alert("❌ Failed to update");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this band?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/bands/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("🗑 Band deleted");
        fetchBands();
      } else {
        alert("❌ Failed to delete");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleChange = (e) => {
    setEditedBand({ ...editedBand, [e.target.name]: e.target.value });
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

      {/* Main */}
      <main className="flex-1 p-6 md:ml-64">
        <button
          className="mb-4 text-white md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-green-400">All Bands</h2>
          <Link
            to="/admin/CreateBand"
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
          >
            ➕ Add New Band
          </Link>
        </div>

        <div className="p-4 overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="text-left bg-gray-700">
                <th className="p-3">Name</th>
                <th className="p-3">Genre</th>
                <th className="p-3">Indoor (LKR)</th>
                <th className="p-3">Outdoor (LKR)</th>
                <th className="p-3">Image</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((band) => (
                <tr key={band._id} className="border-t border-gray-600 hover:bg-gray-700">
                  <td className="p-3">
                    {editingId === band._id ? (
                      <input
                        name="name"
                        value={editedBand.name}
                        onChange={handleChange}
                        className="p-1 text-black rounded"
                      />
                    ) : (
                      band.name
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === band._id ? (
                      <input
                        name="genre"
                        value={editedBand.genre}
                        onChange={handleChange}
                        className="p-1 text-black rounded"
                      />
                    ) : (
                      band.genre
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === band._id ? (
                      <input
                        type="number"
                        name="priceIndoor"
                        value={editedBand.priceIndoor}
                        onChange={handleChange}
                        className="p-1 text-black rounded"
                      />
                    ) : (
                      `Rs. ${band.priceIndoor?.toLocaleString()}`
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === band._id ? (
                      <input
                        type="number"
                        name="priceOutdoor"
                        value={editedBand.priceOutdoor}
                        onChange={handleChange}
                        className="p-1 text-black rounded"
                      />
                    ) : (
                      `Rs. ${band.priceOutdoor?.toLocaleString()}`
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === band._id ? (
                      <input
                        name="image"
                        value={editedBand.image}
                        onChange={handleChange}
                        className="p-1 text-black rounded"
                      />
                    ) : (
                      <img
                        src={band.image}
                        alt={band.name}
                        className="object-cover w-12 h-12 rounded"
                      />
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    {editingId === band._id ? (
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(band)}
                        className="px-3 py-1 text-xs text-white bg-yellow-600 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(band._id)}
                      className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {bands.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    No bands found.
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

export default AllBands;
