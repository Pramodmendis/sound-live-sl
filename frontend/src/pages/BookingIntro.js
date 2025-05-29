import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

function BookingIntro() {
  usePageTitle("Booking Intro");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const token = localStorage.getItem("clientToken");
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const cards = [
    {
      title: "Equipment Rental",
      desc: "Rent premium sound systems, lights, mixers, and more.",
      path: "/equipment-rental",
    },
    {
      title: "Studio Booking",
      desc: "Reserve high-end recording and rehearsal spaces.",
      path: "/bookingstudios",
    },
    {
      title: "Band Booking",
      desc: "Hire talented bands for your indoor or outdoor event.",
      path: "/bands",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-12 pt-32 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 text-green-400 drop-shadow-[0_2px_4px_rgba(34,197,94,0.8)]"
        >
          Choose Your Booking
        </motion.h1>

        <p className="max-w-xl mx-auto mb-12 text-lg text-gray-300 md:text-xl">
          Pick the perfect service to match your event — studio time, live band, or gear rental.
        </p>

        <div className="grid items-center justify-center grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              onClick={() => handleNavigation(card.path)}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 text-center transition duration-300 bg-gray-800 border border-gray-700 cursor-pointer hover:border-green-400 hover:shadow-green-500/30 rounded-xl hover:shadow-xl"
            >
              <h2 className="mb-2 text-2xl font-semibold text-green-300">{card.title}</h2>
              <p className="mb-4 text-sm text-gray-300">{card.desc}</p>
              <button className="px-4 py-2 mt-2 text-black transition bg-green-500 rounded hover:bg-green-600">
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingIntro;
