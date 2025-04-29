import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const BlogPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-400 text-center mb-6 mt-10">
          Our Blog
        </h1>
        <p className="text-lg text-gray-300 mt-2">
          Stay updated with the latest trends, tips, and insights.
        </p>
      </header>

      {/* Featured Blog */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <h2 className="text-3xl font-bold text-indigo-300">Featured Post</h2>
        <p className="mt-2 text-gray-300">
          Discover our latest article on event lighting trends for 2025.
        </p>
        <button
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          Read More
        </button>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Categories</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            "Sound Setup",
            "Lighting Design",
            "Event Planning",
            "LED Walls",
            "Tech Innovations",
            "Industry News",
          ].map((category, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform"
            >
              <p className="text-lg text-gray-300 font-semibold">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Posts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Trending Posts</h2>
        <ul className="space-y-4">
          {[
            "Top 10 Sound Systems for Events",
            "How to Set Up LED Walls",
            "Essential Lighting Tips for DJs",
          ].map((post, index) => (
            <li
              key={index}
              className="p-4 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <p className="text-lg text-gray-300 font-semibold">{post}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Meet Our Authors */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Meet Our Authors</h2>
        <p className="text-gray-300">
          Our team of industry experts shares their insights to help you make informed decisions.
        </p>
      </section>

      {/* Newsletter Signup */}
      <section className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Stay Updated</h2>
        <p className="text-gray-300 mb-4">
          Subscribe to our newsletter for the latest articles and industry trends.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-lg text-black w-full md:w-auto"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">
            Subscribe
          </button>
        </div>
      </section>

      {/* Animated Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg max-w-lg w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              {/* Article Content */}
              <div className="overflow-y-auto p-2" style={{ maxHeight: "70vh" }}>
              <h3 className="text-2xl font-bold text-indigo-400">
                Event Lighting Trends for 2025
              </h3>
              <p className="mt-2">
                Lighting plays a crucial role in setting the mood of an event. In 2025, lighting
                trends are evolving with smart LEDs, projection mapping, and sustainable solutions.
                Whether for concerts, weddings, or corporate events, staying ahead of these trends
                can create unforgettable experiences.
              </p>
              <ul className="mt-3 list-disc list-inside">
                <li>
                  <strong>Smart & Interactive LED Lighting:</strong> LED technology continues to dominate, but in 2025, smart LEDs take it further. These lighting systems can be controlled via apps, allowing real-time adjustments in color, brightness, and patterns. Some advanced LED setups even sync with music or audience interactions, creating a more dynamic experience.
                </li>
                <li>
                  <strong>Sustainable & Eco-Friendly Options:</strong> With a growing focus on sustainability, event planners are shifting to energy-efficient solutions such as:
✅ Solar-powered lights for outdoor events
✅ Low-energy LED fixtures to reduce power consumption
✅ Biodegradable glow effects instead of plastic-based decor
                </li>
                <li>
                  <strong>3D Projection Mapping:</strong> Projection mapping transforms event spaces by projecting stunning visuals onto surfaces like walls, floors, and even objects. In 2025, we’ll see AI-powered projection mapping that adapts dynamically to live performances and audience movements.
                </li>
                <li>
                  <strong>Wireless & Portable Lighting:</strong> Gone are the days of tangled cables! Battery-powered and wireless lighting solutions are making setups more flexible and reducing tripping hazards. This is especially useful for outdoor or pop-up events where mobility is key.
                </li>
                <li>
                  <strong>Holographic & AR Effects:</strong> One of the most futuristic trends is holographic and AR-based lighting. These systems can create floating 3D visuals, interactive light shows, and immersive brand activations. Expect to see more holographic performers and augmented reality-enhanced stage designs in 2025.
                </li>
              </ul>
              <p className="mt-3">
              Event lighting is no longer just about illumination—it’s about creating immersive experiences that captivate audiences. Whether through smart LED control, sustainable solutions, or cutting-edge projection mapping, 2025 is set to revolutionize how we think about event lighting.
              Want to incorporate these trends into your next event? Let us help you bring your vision to life!
              </p>
              </div>
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
