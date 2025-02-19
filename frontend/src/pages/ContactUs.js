import React from "react";
import Contactus from "../assets/Upbackground.jpg";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between font-poppins bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="relative bg-cover bg-center h-screen flex items-center justify-center text-center">
        <img
          src={Contactus}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-60"
        />
        <div className="z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-400 drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </header>

      <div className="flex-grow"></div>

      <footer className="bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl p-10 w-full text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-400 mb-4">Address:</h2>
          <p className="mb-2 text-gray-300">20/1, Gangabada road, Wawela, Piliyandala.</p>

          <h2 className="text-3xl font-bold text-indigo-400 mt-8 mb-4">Contact Us:</h2>
          <p className="mb-2 text-gray-300">+94 777 796 834</p>
          <p className="mb-4 text-gray-300">soundliveofficials@gmail.com</p>

          <h2 className="text-3xl font-bold text-indigo-400 mt-8 mb-4">Get in Touch:</h2>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;