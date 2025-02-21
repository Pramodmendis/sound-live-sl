import React from "react";

const BlogPage = () => {
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
        <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg">
          Read More
        </button>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Categories</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {['Sound Setup', 'Lighting Design', 'Event Planning', 'LED Walls', 'Tech Innovations', 'Industry News'].map((category, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform">
              <p className="text-lg text-gray-300 font-semibold">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Posts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Trending Posts</h2>
        <ul className="space-y-4">
          {["Top 10 Sound Systems for Events", "How to Set Up LED Walls", "Essential Lighting Tips for DJs"].map((post, index) => (
            <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <p className="text-lg text-gray-300 font-semibold">{post}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Meet Our Authors */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Meet Our Authors</h2>
        <p className="text-gray-300">Our team of industry experts shares their insights to help you make informed decisions.</p>
      </section>

      {/* Newsletter Signup */}
      <section className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4">Stay Updated</h2>
        <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest articles and industry trends.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input type="email" placeholder="Enter your email" className="p-2 rounded-lg text-black w-full md:w-auto" />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;