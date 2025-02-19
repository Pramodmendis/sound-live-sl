import React from "react";

const bookings = [
  {
    id: 1,
    studio: "Sunset Sound Studio",
    date: "Feb 20, 2025",
    time: "10:00 AM - 2:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    studio: "Echo Chamber",
    date: "Feb 22, 2025",
    time: "3:00 PM - 6:00 PM",
    status: "Pending",
  },
  {
    id: 3,
    studio: "Neon Beats Studio",
    date: "Feb 25, 2025",
    time: "1:00 PM - 4:00 PM",
    status: "Canceled",
  },
];

const statusColors = {
  Confirmed: "bg-green-500 text-white",
  Pending: "bg-yellow-500 text-white",
  Canceled: "bg-red-500 text-white",
};

const StudioBookingList = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Studio Booking List</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-xl font-semibold text-white">{booking.studio}</h3>
            <p className="text-gray-400 text-sm">{booking.date} | {booking.time}</p>
            <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded ${statusColors[booking.status]}`}>
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudioBookingList;
