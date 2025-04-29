import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import directorImage from "../assets/director.jpg";
import S1 from "../assets/S1.jpg";
import S2 from "../assets/S2.jpg";
import S3 from "../assets/S3.jpg";
import S4 from "../assets/S4.jpg";
import S5 from "../assets/S5.jpg";
import S6 from "../assets/S6.jpg";
import S7 from "../assets/S7.jpg";

const Home = () => {
  const images = [S1,S2,S3,S4,S5,S6,S7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="text-white min-h-screen ">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-screen flex items-center justify-center text-center">
        <motion.img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover -z-10 transition-opacity duration-1000 ease-in-out blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        />
        <div className="bg-black bg-opacity-70 p-10 rounded-2xl z-10 shadow-lg">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-indigo-400 drop-shadow-lg">
            Creating Unforgettable Experiences
          </h1>
          <p className="text-lg md:text-2xl text-gray-300">
            We Bring Your Vision to Life with Creativity and Excellence.
          </p>
        </div>
      </header>
      
      <div className="text-white min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <section className="py-16 px-8 text-center ">
        <h2 className="text-4xl font-bold text-indigo-400 mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Professional Sound", icon: "🎤" },
            { title: "Dynamic Lighting", icon: "💡" },
            { title: "LED Wall Rentals", icon: "📺" },
          ].map((service, index) => (
            <div key={index} className="bg-gray-700 p-8 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
              <p className="text-6xl">{service.icon}</p>
              <h3 className="text-2xl font-semibold mt-4 text-indigo-300">{service.title}</h3>
              <p className="mt-2 text-gray-300">High-quality {service.title.toLowerCase()} for any event.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 text-center ">
        <h2 className="text-4xl font-bold text-indigo-400 mb-6">We Cover All Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Concerts", "Corporate Events", "Weddings", "Trade Shows", "Nightclubs", "Private Parties"].map((event, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <p className="text-xl font-semibold text-gray-300">{event}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-16 px-8 text-center ">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">How We Make Your Events Great!</h1>
        <div className="max-w-4xl mx-auto">
          <p className="leading-relaxed mb-4 text-xl text-gray-300">
            Event Sound & Light are truly a diverse company, we pride ourselves in providing the highest quality service regardless of event size or budget. Our clients range from amateur productions, schools & colleges through to professional theatres, festivals, corporate events, and broadcast specialists.
          </p>
          <p className="leading-relaxed mb-4 text-xl text-gray-300">
            Our continuing policy of investment ensures that our hire stock is constantly kept up to date and that we can always offer the widest selection of equipment possible.
          </p>
          <p className="leading-relaxed mb-4 text-xl text-gray-300">
            We supply equipment for all events, large or small, indoors or outside. From the hire of a single microphone through to a complete festival production.
          </p>
        </div>
      

      <section className="py-16 px-8 text-center ">
  <h2 className="text-4xl font-bold text-indigo-400 mb-6">Message from Our Director</h2>
  <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg">
    <img
      src={directorImage}
      alt="Director"
      className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-indigo-400"
    />
    <p className="text-xl italic text-gray-300 leading-relaxed">
      "At Sound Live, we believe in delivering top-tier sound, lighting, and visual experiences
      that transform events into unforgettable moments. Our team is committed to innovation,
      excellence, and customer satisfaction. Thank you for trusting us to bring your vision to life."
    </p>
    <p className="mt-4 text-lg font-semibold text-indigo-300">- Mr. Sampath Mendis</p>
  </div>
</section>



      <section className="py-16 px-8  text-center">
        <h2 className="text-4xl font-bold text-indigo-400 mb-6">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["“Amazing setup & great service!”", "“Best sound quality for our concert!”", "“Reliable & professional team!”"].map((quote, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <p className="text-lg italic text-gray-300">"{quote}"</p>
              <p className="mt-2 font-semibold text-indigo-300">- Client {index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 text-center ">
  <h2 className="text-4xl font-bold text-indigo-400 mb-8">Event Highlights</h2>
  
  <div className="grid md:grid-cols-3 gap-6">

    <div className="rounded-lg shadow-lg overflow-hidden">
      <video controls className="w-full h-64 object-cover">
        <source src="/videos/V1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-2 text-gray-300">Live Concert - 2024</p>
    </div>

    <div className="rounded-lg shadow-lg overflow-hidden">
      <video controls className="w-full h-64 object-cover">
        <source src="/videos/V2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-2 text-gray-300">Corporate Event - 2023</p>
    </div>

    <div className="rounded-lg shadow-lg overflow-hidden">
      <video controls className="w-full h-64 object-cover">
        <source src="/videos/V3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-2 text-gray-300">Corporate Event - 2023</p>
    </div>

    <div className="rounded-lg shadow-lg overflow-hidden">
      <video controls className="w-full h-64 object-cover">
        <source src="/videos/V4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-2 text-gray-300">Corporate Event - 2023</p>
    </div>

    <div className="rounded-lg shadow-lg overflow-hidden">
      <video controls className="w-full h-64 object-cover">
        <source src="/videos/V5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-2 text-gray-300">Corporate Event - 2023</p>
    </div>

    <div className="rounded-lg shadow-lg overflow-hidden">
      <video controls className="w-full h-64 object-cover">
        <source src="/videos/V6.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-2 text-gray-300">Corporate Event - 2023</p>
    </div>
  </div>
</section>

    </div>
    </div>
    </div>
  );
};

export default Home;
