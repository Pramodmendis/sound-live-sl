import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import usePageTitle from "../hooks/usePageTitle";

const BlogPage = () => {
  usePageTitle("Blog");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleSubscribe = async () => {
    if (!subscriberEmail) {
      setSubscribeMessage("❌ Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscriberEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubscribeMessage("✅ Subscribed! Check your email.");
        setSubscriberEmail("");
      } else {
        setSubscribeMessage(`❌ ${data.message || "Subscription failed."}`);
      }
    } catch (err) {
      setSubscribeMessage("❌ Server error. Try again.");
    }
  };

  const featured = blogs.find((b) => b.isFeatured);
  const trending = blogs.filter((b) => b.isTrending);
  const categories = [...new Set(blogs.map((b) => b.category).filter(Boolean))];

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen px-6 pt-32 pb-20 text-white bg-gradient-to-b from-gray-900 to-black md:px-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-4xl font-extrabold text-green-400 md:text-5xl drop-shadow">
          Our Blog
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-300">
          Stay updated with the latest trends, tips, and insights from the events world.
        </p>
      </motion.header>

      {/* Featured */}
      {featured && (
        <section className="p-6 mb-16 border border-gray-700 rounded-lg bg-gray-800 shadow-md hover:shadow-green-400/20 hover:scale-[1.02] transition">
          <h2 className="text-2xl font-bold text-green-300">🌟 Featured Post</h2>
          <p className="mt-2 text-gray-300">{featured.title}</p>
          <button
            onClick={() => openModal(featured)}
            className="px-4 py-2 mt-4 font-bold text-black transition bg-green-500 rounded-lg hover:bg-green-600"
          >
            Read More
          </button>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-green-400">📚 Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() =>
                  openModal({
                    title: `${category} Insights`,
                    content: blogs
                      .filter((b) => b.category === category)
                      .map((b) => `• ${b.title}`)
                      .join("\n"),
                  })
                }
                className="p-5 text-center border border-gray-700 bg-gray-800 rounded-lg cursor-pointer transition hover:scale-[1.02] hover:shadow-green-400/20"
              >
                <p className="text-lg font-semibold text-gray-200">{category}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-green-400">🔥 Trending Posts</h2>
          <ul className="space-y-4">
            {trending.map((post) => (
              <li
                key={post._id}
                onClick={() => openModal(post)}
                className="p-4 border border-gray-700 rounded-lg bg-gray-800 cursor-pointer transition hover:scale-[1.02] hover:shadow-green-400/20"
              >
                <p className="text-lg font-semibold text-gray-200">{post.title}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Newsletter */}
      <section className="p-6 text-center bg-gray-800 border border-gray-700 shadow-md rounded-xl">
        <h2 className="mb-4 text-3xl font-bold text-green-400">📩 Stay Updated</h2>
        <p className="mb-4 text-gray-300">
          Subscribe to our newsletter for the latest trends, blogs, and updates.
        </p>

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <input
            type="email"
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md md:w-96"
          />
          <button
            onClick={handleSubscribe}
            className="px-5 py-3 font-bold text-black transition bg-green-500 rounded-md hover:bg-green-600"
          >
            Subscribe
          </button>
        </div>

        {subscribeMessage && (
          <p className="mt-3 text-sm text-gray-300">{subscribeMessage}</p>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && selectedBlog && (
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
              <button
                className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
              <div className="overflow-y-auto p-2 max-h-[70vh] whitespace-pre-line">
                <h3 className="mb-3 text-2xl font-bold text-green-400">
                  {selectedBlog.title}
                </h3>
                <p className="text-sm">{selectedBlog.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
