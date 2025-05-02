import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ClientMessages = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      console.error("Failed to load messages", err);
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
      console.error("Reply error:", err);
      alert("❌ Something went wrong.");
    }
  };

  useEffect(() => {
    fetchMessages();
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

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-3xl font-bold text-green-400">Client Messages</h1>
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages found.</p>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-gray-800 border border-gray-700 rounded-lg"
              >
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Phone:</strong> {msg.phone || "N/A"}</p>
                <p className="mt-2"><strong>Message:</strong><br />{msg.message}</p>
                {msg.isReplied ? (
                  <p className="mt-4 text-green-400"><strong>Replied:</strong> {msg.reply}</p>
                ) : (
                  <button
                    className="px-4 py-2 mt-4 bg-green-600 rounded hover:bg-green-700"
                    onClick={() => {
                      setSelectedMessage(msg);
                      setIsModalOpen(true);
                    }}
                  >
                    Reply
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Reply Modal */}
        {isModalOpen && selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-black">
                Reply to {selectedMessage.name}
              </h2>
              <textarea
                className="w-full p-3 text-black border rounded-lg"
                rows="5"
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
                  onClick={() => {
                    setIsModalOpen(false);
                    setReply("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  onClick={handleReply}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientMessages;
