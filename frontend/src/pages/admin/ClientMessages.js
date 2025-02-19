import React from "react";

const messages = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    message: "I would like to book an LED wall for my event. Can you provide pricing?",
    date: "Feb 18, 2025",
    status: "New",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    message: "Do you offer discounts for bulk equipment rentals?",
    date: "Feb 17, 2025",
    status: "Read",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    message: "Thank you for the quick response! I will confirm my booking soon.",
    date: "Feb 16, 2025",
    status: "Replied",
  },
];

const statusColors = {
  New: "bg-blue-500 text-white",
  Read: "bg-yellow-500 text-white",
  Replied: "bg-green-500 text-white",
};

const ClientMessagesList = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Client Messages</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{msg.name}</h3>
              <span className={`px-3 py-1 text-sm font-semibold rounded ${statusColors[msg.status]}`}>
                {msg.status}
              </span>
            </div>
            <p className="text-sm text-gray-400">{msg.email} - {msg.date}</p>
            <p className="mt-2 text-gray-300">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientMessagesList;
