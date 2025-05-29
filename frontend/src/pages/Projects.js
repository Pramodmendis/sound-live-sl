import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const projects = [
  {
    title: "Concert Sound & Lighting",
    description: "Delivered high-quality sound and dynamic lighting for a sold-out music concert.",
    category: "Concerts",
  },
  {
    title: "Corporate Event Production",
    description: "Handled audio-visual needs for a major corporate conference.",
    category: "Corporate Events",
  },
  {
    title: "Wedding Sound & LED Walls",
    description: "Enhanced a grand wedding with immersive sound and LED wall displays.",
    category: "Weddings",
  },
  {
    title: "Nightclub Lighting & Effects",
    description: "Installed cutting-edge lighting effects for an exclusive nightclub event.",
    category: "Nightclubs",
  },
  {
    title: "Festival Stage Setup",
    description: "Provided complete sound, lighting, and stage setup for a large outdoor festival.",
    category: "Festivals",
  },
  {
    title: "Trade Show AV Solutions",
    description: "Supplied advanced AV solutions for an international trade show.",
    category: "Trade Shows",
  },
];

const Projects = () => {
  usePageTitle("Projects");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-6 mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 drop-shadow-[0_2px_4px_rgba(34,197,94,0.7)] mb-4">
          Our Projects
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Explore our diverse portfolio of successful events, from concerts to corporate functions.
        </p>
      </motion.header>

      {/* Projects Grid */}
      <section className="px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 transition transform bg-gray-800 shadow-lg rounded-xl hover:shadow-green-500/20 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-green-300">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{project.description}</p>
              <span className="inline-block px-3 py-1 mt-4 text-xs font-medium text-black bg-green-600 rounded-full">
                {project.category}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 text-center bg-gray-800 rounded-t-3xl"
      >
        <h2 className="mb-4 text-4xl font-bold text-green-400">Want to Collaborate?</h2>
        <p className="max-w-xl mx-auto mb-6 text-lg text-gray-300">
          We bring expertise and innovation to every event. Let's create something spectacular together!
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="px-6 py-3 text-lg font-medium text-black transition bg-green-500 rounded-lg hover:bg-green-600"
        >
          Contact Us
        </button>
      </motion.section>
    </div>
  );
};

export default Projects;
