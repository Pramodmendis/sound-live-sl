import React from "react";

const events = [
  {
    id: 1,
    title: "React Conference 2025",
    date: "March 10, 2025",
    description: "An annual conference covering the latest in React development.",
  },
  {
    id: 2,
    title: "Tailwind CSS Workshop",
    date: "April 15, 2025",
    description: "A hands-on workshop for mastering Tailwind CSS.",
  },
  {
    id: 3,
    title: "JavaScript Meetup",
    date: "May 20, 2025",
    description: "A community meetup for JavaScript enthusiasts.",
  },
];

const EventList = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-500 text-sm">{event.date}</p>
            <p className="text-gray-700 mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
