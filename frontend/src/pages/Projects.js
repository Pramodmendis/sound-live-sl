import React from "react";

const projects = [
  { title: "Concert Sound & Lighting", description: "Delivered high-quality sound and dynamic lighting for a sold-out music concert.", category: "Concerts" },
  { title: "Corporate Event Production", description: "Handled audio-visual needs for a major corporate conference.", category: "Corporate Events" },
  { title: "Wedding Sound & LED Walls", description: "Enhanced a grand wedding with immersive sound and LED wall displays.", category: "Weddings" },
  { title: "Nightclub Lighting & Effects", description: "Installed cutting-edge lighting effects for an exclusive nightclub event.", category: "Nightclubs" },
  { title: "Festival Stage Setup", description: "Provided complete sound, lighting, and stage setup for a large outdoor festival.", category: "Festivals" },
  { title: "Trade Show AV Solutions", description: "Supplied advanced AV solutions for an international trade show.", category: "Trade Shows" },
];

const Projects = () => {
  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section */}
      <header className="text-center py-16 px-8 bg-black">
        <h1 className="text-5xl font-bold text-indigo-400 mb-4 mt-10">Our Projects</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our diverse portfolio of successful events, from concerts to corporate functions.
        </p>
      </header>

      {/* Projects Grid */}
      <section className="py-16 px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-indigo-300">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <span className="mt-4 inline-block text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg">
                {project.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-8 bg-gray-800">
        <h2 className="text-4xl font-bold text-indigo-400 mb-4">Want to Collaborate?</h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6">
          We bring expertise and innovation to every event. Let's create something spectacular together!
        </p>
        <button className="bg-indigo-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-indigo-700 transition">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Projects;
