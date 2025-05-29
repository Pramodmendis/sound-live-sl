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
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const AdminSubscribers = () => {
  usePageTitle("Admin Subscribers");
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
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
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetch("http://localhost:5000/api/subscribe")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  const handleExport = () => {
    window.open("http://localhost:5000/api/subscribe/export", "_blank");
  };

  const handleSend = async () => {
    if (!message) {
      setStatus("❌ Enter a message to send.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/subscribe/send-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setStatus(data.message);
    setMessage("");
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
          <Link
            to="/admin/AdminSubscribers"
            className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
              isActive("/admin/AdminSubscribers")
                ? "bg-green-600 text-white font-semibold"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <Mail className="w-5 h-5" />
            Subscribers
          </Link>
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

        <h2 className="mb-6 text-3xl font-bold text-green-400">📧 Subscribers</h2>

        <button
          onClick={handleExport}
          className="block px-4 py-2 mb-6 ml-auto text-black bg-green-500 rounded hover:bg-green-600"
        >
          Export CSV
        </button>

        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold text-green-300">✉️ Send Newsletter</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Enter newsletter message..."
            className="w-full p-3 mb-3 text-white bg-gray-800 border border-gray-600 rounded"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Send to All Subscribers
          </button>
          {status && <p className="mt-2 text-sm text-gray-300">{status}</p>}
        </div>

        <table className="w-full overflow-hidden text-left border border-gray-700 rounded">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-green-300">Email</th>
              <th className="p-3 text-green-300">Subscribed On</th>
            </tr>
          </thead>
          <tbody>
            {list.map((sub, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="p-3">{sub.email}</td>
                <td className="p-3">{new Date(sub.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminSubscribers;
