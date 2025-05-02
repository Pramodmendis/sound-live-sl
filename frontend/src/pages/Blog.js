import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const BlogPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTrendingPost, setSelectedTrendingPost] = useState(null);

  const handleFeaturedClick = () => {
    setIsFeatured(true);
    setSelectedCategory(null);
    setSelectedTrendingPost(null);
    setIsOpen(true);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsFeatured(false);
    setSelectedTrendingPost(null);
    setIsOpen(true);
  };

  const handleTrendingClick = (postTitle) => {
    setSelectedTrendingPost(postTitle);
    setIsFeatured(false);
    setSelectedCategory(null);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen px-6 pt-32 text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4 drop-shadow-[0_2px_4px_rgba(34,197,94,0.7)]">
          Our Blog
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-300">
          Stay updated with the latest trends, tips, and insights.
        </p>
      </motion.header>

      {/* Featured Blog */}
      <section className="p-6 mb-16 transition bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500/20 hover:scale-105">
        <h2 className="text-2xl font-bold text-green-300">Featured Post</h2>
        <p className="mt-2 text-gray-300">
          Discover our latest article on event lighting trends for 2025.
        </p>
        <button
          className="px-4 py-2 mt-4 font-bold text-black transition bg-green-500 rounded-lg hover:bg-green-600"
          onClick={handleFeaturedClick}
        >
          Read More
        </button>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-green-400">Categories</h2>
        <div className="grid gap-6 md:grid-cols-3">
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
              onClick={() => handleCategoryClick(category)}
              className="p-4 text-center transition bg-gray-800 rounded-lg shadow-md cursor-pointer hover:shadow-green-500/20 hover:scale-105"
            >
              <p className="text-lg font-semibold text-gray-200">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Posts */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-green-400">Trending Posts</h2>
        <ul className="space-y-4">
          {[
            "Top 10 Sound Systems for Events",
            "How to Set Up LED Walls",
            "Essential Lighting Tips for DJs",
          ].map((post, index) => (
            <li
              key={index}
              onClick={() => handleTrendingClick(post)}
              className="p-4 transition bg-gray-800 rounded-lg shadow-md cursor-pointer hover:shadow-green-500/20 hover:scale-105"
            >
              <p className="text-lg font-semibold text-gray-200">{post}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter */}
      <section className="p-6 text-center bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-4 text-3xl font-bold text-green-400">Stay Updated</h2>
        <p className="mb-4 text-gray-300">
          Subscribe to our newsletter for the latest articles and industry trends.
        </p>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 text-black rounded-lg md:w-auto"
          />
          <button className="px-4 py-2 font-bold text-black transition bg-green-500 rounded-lg hover:bg-green-600">
            Subscribe
          </button>
        </div>
      </section>

      {/* Modal Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl p-6 text-gray-300 bg-gray-900 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              {/* Modal Content */}
              <div className="overflow-y-auto p-2 max-h-[70vh]">
                {isFeatured && (
                  <>
                    <h3 className="mb-3 text-2xl font-bold text-green-400">
                      Event Lighting Trends for 2025
                    </h3>
                    <p className="mb-2">
                      Lighting plays a crucial role in setting the mood of an event...
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside">
                      <li><strong>Smart LEDs:</strong> Music-synced, interactive lights.</li>
                      <li><strong>Eco-Friendly:</strong> Solar & low-energy options.</li>
                      <li><strong>3D Mapping:</strong> Projection & AR visuals.</li>
                    </ul>
                    <p className="mt-4 text-sm">
                      Want to incorporate these trends into your next event? Contact us today.
                    </p>
                  </>
                )}

                {selectedCategory && (
                  <>
                    <h3 className="mb-3 text-2xl font-bold text-green-400">
                      {selectedCategory} Insights
                    </h3>
                    <p className="text-sm">
                      {selectedCategory === "Sound Setup" &&
                        "Discover professional gear and sound engineering techniques for various venues."}
                      {selectedCategory === "Lighting Design" &&
                        "Master lighting placement and effects for mood setting and transitions."}
                      {selectedCategory === "Event Planning" &&
                        "Plan your event like a pro — timelines, vendors, and client coordination."}
                      {selectedCategory === "LED Walls" &&
                        "Learn how to integrate LED walls for impactful visual storytelling."}
                      {selectedCategory === "Tech Innovations" &&
                        "Explore the latest AV, lighting, and automation tools in the event industry."}
                      {selectedCategory === "Industry News" &&
                        "Get updated with recent launches, upgrades, and event regulations in SL."}
                    </p>
                  </>
                )}

                {selectedTrendingPost && (
                  <>
                    <h3 className="mb-3 text-2xl font-bold text-green-400">
                      {selectedTrendingPost}
                    </h3>
                    <p className="text-sm">
                      {selectedTrendingPost === "Top 10 Sound Systems for Events" &&
                        "Here’s our hand-picked list of the best sound systems for clarity, power, and budget performance."}
                      {selectedTrendingPost === "How to Set Up LED Walls" &&
                        "Step-by-step guidance on how to install and sync LED panels with your show."}
                      {selectedTrendingPost === "Essential Lighting Tips for DJs" &&
                        "Learn key lighting moves, effects, and transitions that sync with your DJ sets."}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
