import React, { useEffect, useState } from "react";

const EquipmentBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/equipmentBookings/all");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch equipment bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/equipmentBookings/update-status/${id}`, {
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
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    if (status === "Accepted") return "bg-green-600";
    if (status === "Cancelled") return "bg-red-600";
    return "bg-yellow-500";
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-b from-gray-900 to-black">
      <h2 className="mb-6 text-3xl font-bold text-center">Equipment Bookings</h2>

      <div className="p-4 overflow-x-auto bg-gray-800 rounded-lg shadow-md">
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-left bg-gray-700">
              <th className="p-3">Client</th>
              <th className="p-3">Event Type</th>
              <th className="p-3">Location</th>
              <th className="p-3">Total (LKR)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t border-gray-600 hover:bg-gray-700">
                <td className="p-3">{booking.clientId?.username || "N/A"}</td>
                <td className="p-3">{booking.eventType}</td>
                <td className="p-3">{booking.eventLocation}</td>
                <td className="p-3">Rs {booking.total.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${getStatusBadgeColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  {booking.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking._id, "Accepted")}
                        className="px-3 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking._id, "Cancelled")}
                        className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">No Action</span>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No equipment bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentBookings;
