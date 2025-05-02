import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Gallery1 from "../assets/1.jpg";
import Gallery2 from "../assets/2.jpg";
import Gallery3 from "../assets/3.jpg";
import Gallery4 from "../assets/4.jpg";

const Home = () => {
  return (
    <div className="font-sans text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section with Background Video */}
      <section className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden text-center">
        <video
          className="absolute top-0 left-0 object-cover w-full h-full -z-10 opacity-30"
          autoPlay
          muted
          loop
          playsInline
          src="https://cdn.coverr.co/videos/coverr-night-life-1552/1080p.mp4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-white"
        >
          <h1 className="mb-6 text-5xl font-extrabold tracking-wide text-green-400 md:text-7xl drop-shadow-xl">
            Experience Sound Like Never Before
          </h1>
          <p className="text-lg text-gray-300 md:text-xl">
            Bringing Sri Lanka's events to life with
            <span className="font-medium text-green-400"> professional sound</span>,{" "}
            <span className="font-medium text-green-400">lighting</span> &{" "}
            <span className="font-medium text-green-400">band solutions</span>.
          </p>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-20 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-12 text-4xl font-bold text-green-400">Featured Projects</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {["Weddings", "Concerts", "Corporate Events"].map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 transition shadow-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl hover:shadow-xl"
              >
                <h3 className="mb-2 text-xl font-semibold text-green-300">{title}</h3>
                <p className="text-sm text-gray-400">
                  High-impact setups tailored to your audience and vibe.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-400 mb-14">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", label: "Browse Services", icon: "🧭" },
              { step: "2", label: "Submit Booking", icon: "📝" },
              { step: "3", label: "Make Payment", icon: "💳" },
              { step: "4", label: "Enjoy the Event", icon: "🎉" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 transition shadow bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl hover:scale-105"
              >
                <div className="mb-3 text-4xl">{item.icon}</div>
                <h3 className="mb-1 text-lg font-semibold text-green-300">{item.label}</h3>
                <p className="text-sm text-gray-400">Step {item.step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="px-6 py-20 text-white bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-12 text-4xl font-bold text-green-400">Gallery Preview</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[Gallery1, Gallery2, Gallery3, Gallery4].map((img, i) => (
  <img
    key={i}
    src={img}
    alt={`Gallery ${i + 1}`}
    className="object-cover w-full h-48 shadow-md rounded-xl"
  />
))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="px-6 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-12 text-4xl font-bold text-green-400">Our Impact</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { number: "100+", label: "Events Completed" },
              { number: "25+", label: "Bands Available" },
              { number: "50+", label: "Studios Booked" },
              { number: "5★", label: "Client Rating" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 transition shadow bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl hover:shadow-lg"
              >
                <h3 className="text-3xl font-bold text-green-300">{item.number}</h3>
                <p className="mt-2 text-sm text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center text-white bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">Ready to Elevate Your Event?</h2>
          <p className="mb-8 text-lg">
            Let Sound Live handle the sound, lights, and music — stress-free and spectacular.
          </p>
          <Link
            to="/bookingintro"
            className="inline-block px-10 py-4 font-semibold transition bg-black hover:bg-gray-900 rounded-xl"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Chat Assistant Button */}
      <div className="fixed z-50 bottom-6 right-6 group">
        <div
          onClick={() => window.Tawk_API?.maximize?.()}
          className="flex items-center justify-center text-black transition transform bg-green-400 rounded-full shadow-xl cursor-pointer w-14 h-14 hover:scale-105"
        >
          💬
        </div>
        <div className="absolute px-4 py-2 text-sm text-white transition-opacity duration-300 bg-gray-800 rounded-lg shadow-lg opacity-0 right-16 bottom-2 group-hover:opacity-100">
          Need help? Chat with us!
        </div>
      </div>
    </div>
  );
};

export default Home;
