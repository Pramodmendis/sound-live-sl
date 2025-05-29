import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Mic2, Music } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import DirectorPhoto from "../assets/director.jpg";
import heroImage from "../assets/Hero.jpg";
import usePageTitle from "../hooks/usePageTitle";


// Weddings
import W1 from "../assets/W1.jpg";
import W2 from "../assets/W2.jpg";
import W3 from "../assets/W3.jpg";
import W4 from "../assets/W4.jpg";
import W5 from "../assets/W5.jpg";

// Concerts
import C1 from "../assets/C1.jpg";
import C2 from "../assets/C2.jpg";
import C3 from "../assets/C3.jpg";
import C4 from "../assets/C4.jpg";
import C5 from "../assets/C5.jpg";

// Corporate
import Corp1 from "../assets/S1.jpg";
import Corp2 from "../assets/S2.jpg";
import Corp3 from "../assets/S3.jpg";
import Corp4 from "../assets/S4.jpg";
import Corp5 from "../assets/S5.jpg";

// Parties
import P1 from "../assets/1.jpg";
import P2 from "../assets/2.jpg";
import P3 from "../assets/3.jpg";
import P4 from "../assets/4.jpg";
import P5 from "../assets/5.jpg";

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      setCount(Math.floor(percent * end));
      if (percent < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return count;
};


const Home = () => {
  usePageTitle("Home");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const sectorImages = {
  Weddings: [W1, W2, W3, W4, W5],
  Concerts: [C1, C2, C3, C4, C5],
  "Corporate Events": [Corp1, Corp2, Corp3, Corp4, Corp5],
  "Private Parties": [P1, P2, P3, P4, P5],
};

const [selectedSector, setSelectedSector] = useState(null);
const [slideIndex, setSlideIndex] = useState(0);

const counters = [
    useCounter(100, 2000),
    useCounter(25, 2000),
    useCounter(50, 2000),
    useCounter(5, 2000),
  ];


useEffect(() => {
  let timer;
  if (selectedSector) {
    timer = setInterval(() => {
      setSlideIndex((prev) =>
        (prev + 1) % sectorImages[selectedSector].length
      );
    }, 4000);
  }
  return () => clearInterval(timer);
  // eslint-disable-next-line
}, [selectedSector, slideIndex]);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/comments/home");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchComments();
  }, []);

  

  const handleCommentSubmit = async () => {
    if (!user || !commentInput.trim()) return;

    const res = await fetch("http://localhost:5000/api/comments/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, message: commentInput }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setCommentInput("");
    }
  };

  const handleEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/api/comments/home/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, message: editText }),
    });
    if (res.ok) {
      const updated = await res.json();
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, message: updated.message } : c))
      );
      setEditMode(null);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/comments/home/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });
    if (res.ok) {
      setComments((prev) => prev.filter((c) => c._id !== id));
    }
  };

  const handleReply = async (commentId) => {
    const res = await fetch(`http://localhost:5000/api/comments/home/${commentId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, message: editText }),
    });
    if (res.ok) {
      const updated = await res.json();
      setComments((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
      setEditText("");
      setEditMode(null);
    }
  };

  return (
    <div className="font-sans text-white ">
      <section className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden text-center">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover -z-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Dark overlay */}
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
          <span className="font-medium text-green-400"> professional sound</span>,
          <span className="font-medium text-green-400"> lighting</span> &amp;
          <span className="font-medium text-green-400"> band solutions</span>.
        </p>
      </motion.div>
    </section>

      <section className="px-6 py-20 text-white bg-black">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="mb-12 text-4xl font-bold text-green-400"
    >
      Featured Projects
    </motion.h2>

    <div className="grid gap-8 md:grid-cols-3">
      {[
        {
          title: "Weddings",
          desc: "Elegant sound setups, romantic lighting, and seamless ambiance for your special day.",
          icon: <Music className="w-10 h-10 mb-4 text-green-300" />,
        },
        {
          title: "Concerts",
          desc: "High-energy stage audio, synced lighting effects, and crowd-ready systems for live shows.",
          icon: <Mic2 className="w-10 h-10 mb-4 text-green-300" />,
        },
        {
          title: "Corporate Events",
          desc: "Professional sound and visuals for conferences, product launches, and formal events.",
          icon: <Briefcase className="w-10 h-10 mb-4 text-green-300" />,
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center p-8 text-center transition shadow rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-xl"
        >
          {item.icon}
          <h3 className="mb-2 text-xl font-semibold text-green-300">{item.title}</h3>
          <p className="mb-4 text-sm text-gray-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      
      <section className="px-6 py-20 bg-gray-900">
  <div className="max-w-5xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="mb-8 text-4xl font-bold text-green-400"
    >
      About Sound Live
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="mb-6 text-lg leading-relaxed text-gray-300"
    >
      Sound Live is a full-service event solutions company based in Sri Lanka, dedicated to transforming ordinary events into extraordinary experiences. We specialize in providing high-quality sound systems, dynamic lighting, LED walls, and live band performances tailored to a wide range of events — from weddings and private parties to corporate functions and large-scale concerts.
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="mb-6 text-lg leading-relaxed text-gray-300"
    >
      With a dedicated team of sound engineers, lighting technicians, stage managers, and performers, Sound Live is committed to professionalism, punctuality, and precision. Our services are designed to be fully customizable, ensuring that each event reflects the unique vision of our clients. We handle everything from setup to execution, allowing you to enjoy a seamless and stress-free experience.
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="text-lg leading-relaxed text-gray-300"
    >
      Whether you're planning an intimate gathering or a grand festival, Sound Live is your trusted partner for exceptional event production. We don’t just deliver sound and lights — we deliver atmosphere, energy, and unforgettable memories.
    </motion.p>
  </div>
</section>
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
      <section className="px-6 py-20 bg-black">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="mb-12 text-4xl font-bold text-green-400">Explore Our Sectors</h2>

    <div className="flex flex-col gap-8">
      {["Weddings", "Concerts", "Corporate Events", "Private Parties"].map((sector, i) => (
        <motion.div
          key={sector}
          onClick={() => {
            setSelectedSector(sector);
            setSlideIndex(0);
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className="relative overflow-hidden shadow-lg cursor-pointer rounded-2xl hover:shadow-2xl group"
        >
          <img
            src={sectorImages[sector][0]}
            alt={sector}
            className="object-cover w-full h-64 transition-transform duration-500 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h3 className="text-3xl font-bold text-white">{sector}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  {/* POPUP SLIDESHOW */}
  <AnimatePresence>
    {selectedSector && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedSector(null)}
      >
        <motion.div
          key={slideIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-3xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={sectorImages[selectedSector][slideIndex]}
            alt={`${selectedSector} ${slideIndex + 1}`}
            className="rounded-lg max-h-[80vh] w-full object-contain"
          />

          {/* Close */}
          <button
            onClick={() => setSelectedSector(null)}
            className="absolute px-3 py-1 text-white bg-red-600 rounded-full top-2 right-2 hover:bg-red-700"
          >
            ✕
          </button>

          {/* Prev / Next */}
          <button
            onClick={() =>
              setSlideIndex((prev) =>
                prev === 0
                  ? sectorImages[selectedSector].length - 1
                  : prev - 1
              )
            }
            className="absolute text-4xl text-white transform -translate-y-1/2 left-4 top-1/2 hover:scale-110"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setSlideIndex((prev) => (prev + 1) % sectorImages[selectedSector].length)
            }
            className="absolute text-4xl text-white transform -translate-y-1/2 right-4 top-1/2 hover:scale-110"
          >
            ›
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>

<section className="px-6 py-20 text-white bg-black">
  <div className="grid items-center max-w-6xl gap-10 mx-auto md:grid-cols-2">
    
    {/* Director Photo */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="flex justify-center w-full"
    >
      <img
        src={DirectorPhoto}
        alt="Director"
        className="object-cover shadow-lg rounded-2xl w-80 h-80"
      />
    </motion.div>

    {/* Message */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="mb-6 text-4xl font-bold text-green-400">Message from Our Director</h2>

      <p className="mb-6 text-lg leading-relaxed text-gray-300">
  “At <span className="font-semibold text-green-400">Sound Live</span>, we are driven by one
  purpose — to elevate every event into an unforgettable experience. We understand that music,
  lighting, and ambiance aren't just technical components, but emotional elements that set the
  tone for life's most meaningful moments.”
</p>

<p className="mb-6 text-lg leading-relaxed text-gray-300">
  From weddings and private parties to high-profile corporate events, our commitment to
  excellence has remained unwavering. We invest not only in world-class equipment but in a
  passionate team of professionals who share a vision of quality, creativity, and integrity.
</p>

<p className="mb-8 text-lg leading-relaxed text-gray-300">
  Thank you for choosing Sound Live as your event partner. We are honored to help bring your
  vision to life and promise to deliver more than just sound — we deliver atmosphere, energy,
  and lasting impressions.
</p>

      <div className="mt-6">
        <p className="text-xl font-bold text-green-300">Mr. Sampath Mendis</p>
        <p className="text-sm text-gray-400">Founder & Director, Sound Live</p>
      </div>
    </motion.div>
  </div>
</section>


      <section className="px-6 py-24 text-white bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-green-400 mb-14"
          >
            Our Impact
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { label: "Events Completed", suffix: "+" },
              { label: "Bands Available", suffix: "+" },
              { label: "Studios Booked", suffix: "+" },
              { label: "Client Rating", suffix: "★" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="p-8 transition-transform duration-300 shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl hover:scale-105 hover:shadow-xl"
              >
                <div className="text-5xl font-extrabold text-green-300 drop-shadow-sm">
                  {counters[i]}{item.suffix}
                </div>
                <p className="mt-3 text-sm tracking-wide text-gray-400 uppercase">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 💬 Comments Section */}
      <section className="px-6 py-20 text-white bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-6 text-3xl font-bold text-center text-green-400">Comments & Feedback</h2>

          {user && (
            <div className="mb-6">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full p-4 mb-2 text-black rounded-md resize-none"
                rows={4}
              />
              <button
                onClick={handleCommentSubmit}
                className="px-6 py-2 text-sm font-semibold text-black bg-green-400 rounded hover:bg-green-500"
              >
                Post Comment
              </button>
            </div>
          )}

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-center text-gray-400">No comments yet. Be the first!</p>
            ) : (
              comments.map((comment) => {
                const isUser = user && comment.username === user.username;
                return (
                  <div key={comment._id} className="relative p-4 shadow rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                    <p className="font-semibold text-green-300">{comment.username}</p>
                    {editMode === comment._id ? (
                      <>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={3}
                          className="w-full p-2 mt-1 text-black rounded"
                        />
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => handleEdit(comment._id)} className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded">Save</button>
                          <button onClick={() => setEditMode(null)} className="px-3 py-1 text-sm font-semibold text-white bg-gray-600 rounded">Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mt-1 text-sm text-gray-300">{comment.message}</p>
                        <p className="text-xs text-gray-400">{format(comment.createdAt)}</p>
                      </>
                    )}

                    <div className="absolute flex gap-2 top-2 right-2">
                      <button
                        onClick={() => {
                          setEditMode(`reply-${comment._id}`);
                          setEditText("");
                        }}
                        className="text-xs text-blue-400 hover:underline"
                      >Reply</button>
                      {isUser && editMode !== comment._id && (
                        <>
                          <button onClick={() => { setEditMode(comment._id); setEditText(comment.message); }} className="text-xs text-green-400 hover:underline">Edit</button>
                          <button onClick={() => handleDelete(comment._id)} className="text-xs text-red-400 hover:underline">Delete</button>
                        </>
                      )}
                    </div>

                    {comment.replies?.length > 0 && (
                      <div className="pl-4 mt-4 ml-4 space-y-2 border-l border-gray-700">
                        {comment.replies.map((reply, index) => (
                          <div key={index} className="p-2 text-sm text-gray-300 bg-gray-800 rounded">
                            <p className="font-medium text-green-300">{reply.username}</p>
                            <p>{reply.message}</p>
                            <p className="mt-1 text-xs text-gray-400">{format(reply.createdAt)}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {editMode === `reply-${comment._id}` && user && (
                      <div className="mt-3 ml-4">
                        <input
                          type="text"
                          placeholder="Write a reply..."
                          className="w-full px-3 py-2 mt-1 text-black rounded"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => handleReply(comment._id)} className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded">Reply</button>
                          <button onClick={() => { setEditMode(null); setEditText(""); }} className="px-3 py-1 text-sm font-semibold text-white bg-gray-600 rounded">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
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
