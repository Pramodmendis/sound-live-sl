import React from "react";

const bookings = [
  {
    id: 1,
    equipment: "Line Array Speaker System",
    category: "Sound",
    bookedDate: "Feb 20, 2025",
    returnDate: "Feb 25, 2025",
    status: "Confirmed",
  },
  {
    id: 2,
    equipment: "Moving Head Stage Lights",
    category: "Lighting",
    bookedDate: "Feb 22, 2025",
    returnDate: "Feb 26, 2025",
    status: "Pending",
  },
  {
    id: 3,
    equipment: "LED Video Wall 4K",
    category: "LED Wall",
    bookedDate: "Feb 25, 2025",
    returnDate: "Feb 27, 2025",
    status: "Returned",
  },
];

const statusColors = {
  Confirmed: "bg-green-600 text-white",
  Pending: "bg-yellow-600 text-white",
  Returned: "bg-blue-600 text-white",
};

const categoryColors = {
  Sound: "bg-purple-600 text-white",
  Lighting: "bg-orange-600 text-white",
  "LED Wall": "bg-indigo-600 text-white",
};

const EquipmentBooking = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-gradient-to-b from-gray-900 to-black text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Equipment Booking List</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{booking.equipment}</h3>
              <span className={`px-3 py-1 text-sm font-semibold rounded ${categoryColors[booking.category]}`}>
                {booking.category}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              <strong>Booked:</strong> {booking.bookedDate} | <strong>Return:</strong> {booking.returnDate}
            </p>
            <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded ${statusColors[booking.status]}`}>
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentBooking;
