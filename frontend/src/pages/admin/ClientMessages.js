import { motion } from "framer-motion";
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

const ClientMessages = () => {
  usePageTitle("Client Messages");
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return alert("Reply cannot be empty");

    try {
      const res = await fetch(`http://localhost:5000/api/contact/reply/${selectedMessage._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ reply }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Reply sent");
        setIsModalOpen(false);
        setReply("");
        setSelectedMessage(null);
        fetchMessages();
      } else {
        alert(data.error || "❌ Failed to send reply");
      }
    } catch (err) {
      console.error("Reply error", err);
      alert("❌ Something went wrong");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Sidebar */}
      <aside className={`fixed z-40 inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out bg-gray-800 w-64 p-6`}>
        <h2 className="mb-8 text-2xl font-bold text-green-400">Sound Live</h2>
        <nav className="space-y-3">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
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

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64">
        <button
          className="mb-4 text-white md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="mb-6 text-3xl font-bold text-green-400">Client Messages</h1>

        {messages.length === 0 ? (
          <p className="text-gray-400">No messages available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-5 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-green-300">{msg.name}</p>
                  <p className="text-sm text-gray-400">{msg.email}</p>
                  <p className="text-sm text-gray-400">📞 {msg.phone || "N/A"}</p>
                  <p className="mt-2 text-gray-200">{msg.message}</p>
                </div>

                {msg.isReplied ? (
                  <span className="absolute px-2 py-1 text-xs bg-green-600 rounded top-2 right-2">Replied</span>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedMessage(msg);
                      setIsModalOpen(true);
                    }}
                    className="px-3 py-1 mt-4 text-sm bg-green-600 rounded hover:bg-green-700"
                  >
                    Reply
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          >
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-black">
                Reply to {selectedMessage.name}
              </h2>
              <textarea
                className="w-full p-3 text-black border rounded-lg"
                rows="5"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply here..."
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setReply("");
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ClientMessages;
