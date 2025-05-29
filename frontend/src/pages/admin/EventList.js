import usePageTitle from "../../hooks/usePageTitle";

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
  usePageTitle("Upcoming Events");
  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500">{event.date}</p>
            <p className="mt-2 text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
