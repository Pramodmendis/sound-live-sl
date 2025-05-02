import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const BandBookingList = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);

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
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bandBookings/all");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch band bookings", err);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bandBookings/update-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? updated : b))
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Accepted") return "bg-green-600";
    if (status === "Cancelled") return "bg-red-600";
    return "bg-yellow-500";
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

      {/* Main */}
      <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
  <h2 className="text-3xl font-bold">Band Bookings</h2>
  <div className="flex gap-2">
  </div>
</div>

        <div className="p-4 overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="text-left bg-gray-700">
                <th className="p-3">Band</th>
                <th className="p-3">Client</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Location</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-gray-600 hover:bg-gray-700">
                  <td className="p-3">{b.bandId?.name}</td>
                  <td className="p-3">{b.clientId?.username || b.clientId?.email}</td>
                  <td className="p-3">
                    {b.eventDate} @ {b.eventTime}
                  </td>
                  <td className="p-3">{b.location}</td>
                  <td className="p-3">{b.hours} hrs</td>
                  <td className="p-3">Rs. {b.totalPrice?.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {b.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(b._id, "Accepted")}
                          className="px-3 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(b._id, "Cancelled")}
                          className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {(b.status === "Accepted" || b.status === "Cancelled") && (
                      <span className="text-xs text-gray-400">No Action</span>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-400">
                    No band bookings found.
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

export default BandBookingList;
