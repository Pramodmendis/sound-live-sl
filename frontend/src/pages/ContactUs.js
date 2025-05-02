import { motion } from "framer-motion";
import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white font-poppins bg-gradient-to-b from-gray-900 to-black">
      <header className="min-h-[60vh] flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="mb-4 text-5xl font-extrabold text-green-400 md:text-7xl drop-shadow-md">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 md:text-xl">
            Have questions or want to book your next event? We're ready to help.
          </p>
        </motion.div>
      </header>

      <footer className="w-full p-10 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-green-400">Address</h2>
          <p className="mb-6 text-gray-300">20/1, Gangabada Road, Wawela, Piliyandala</p>

          <h2 className="mt-8 mb-4 text-3xl font-bold text-green-400">Contact Info</h2>
          <p className="text-gray-300">Phone: +94 777 796 834</p>
          <p className="mb-6 text-gray-300">Email: soundliveofficialsl@gmail.com</p>

          <h2 className="mt-8 mb-4 text-3xl font-bold text-green-400">Get in Touch</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 font-bold transition duration-300 bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              SUBMIT
            </button>

            {status && (
              <p className="mt-4 text-green-300">{status}</p>
            )}
          </form>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
