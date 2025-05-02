import React from "react";
import { FaChevronDown } from "react-icons/fa";
import Aboutusup from "../assets/Upbackground.jpg";
import WhyUsImage from "../assets/Whyus.jpg";

import Member1 from "../assets/1.jpg";
import Member2 from "../assets/2.jpg";
import Member3 from "../assets/3.jpg";
import Member4 from "../assets/4.jpg";
import Member5 from "../assets/C1.jpg";
import Member6 from "../assets/C2.jpg";

const team = [
  {
    name: "Pramod Mendis",
    role: "Founder & Sound Engineer",
    image: Member1,
    bio: "Pramod leads the Sound Live team with over a decade of experience in audio engineering, ensuring top-tier sound quality for every event.",
  },
  {
    name: "Samantha Perera",
    role: "Lighting Director",
    image: Member2,
    bio: "Samantha specializes in designing immersive lighting experiences that transform venues and captivate audiences.",
  },
  {
    name: "Tharindu Silva",
    role: "Studio Manager",
    image: Member3,
    bio: "Tharindu oversees all studio operations and coordinates professional sessions with clients and artists.",
  },
  {
    name: "Nimesha Fernando",
    role: "Event Coordinator",
    image: Member4,
    bio: "With a background in event planning, Nimesha ensures every event runs smoothly from setup to finale.",
  },
  {
    name: "Kavindu Jayasooriya",
    role: "Visual Systems Lead",
    image: Member5,
    bio: "Kavindu designs and deploys dynamic LED and projection visuals, blending creativity with cutting-edge tech.",
  },
  {
    name: "Ishara Gunawardena",
    role: "Support & Logistics",
    image: Member6,
    bio: "Ishara ensures timely setup and equipment delivery while supporting client needs onsite.",
  },
];

const About = () => {
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <header className="relative min-h-[60vh] flex items-center justify-center text-center">
        <img src={Aboutusup} alt="Hero" className="absolute inset-0 object-cover w-full h-full -z-10" />
        <div className="z-10 max-w-3xl p-6 mx-auto bg-black bg-opacity-70 md:p-12 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-400 mb-4 drop-shadow-[0_2px_4px_rgba(34,197,94,0.7)]">
            Crafting Exceptional Events with Cutting-Edge Sound & Light
          </h1>
          <p className="text-lg text-gray-300 md:text-xl">
            Your go-to destination for premium equipment rental and studio bookings.
          </p>
        </div>
        <div
          className="absolute text-2xl text-green-400 transform -translate-x-1/2 cursor-pointer bottom-6 left-1/2 animate-bounce"
          onClick={handleScroll}
        >
          <FaChevronDown />
        </div>
      </header>

      {/* Who We Are */}
      <section className="px-6 pt-24 pb-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-green-400 md:text-4xl drop-shadow">Who We Are</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
          At Sound Live, we are dedicated to enhancing your events with top-tier sound and lighting solutions.
          Our mission is to provide accessible and reliable services to create memorable experiences for all our clients.
        </p>
      </section>

      {/* Why Us */}
      <section className="flex flex-col items-center justify-between gap-10 px-6 py-20 bg-black md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-green-400 md:text-4xl drop-shadow">Why Us?</h2>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            At Sound Live, we are passionate about transforming ordinary events into extraordinary experiences.
            Our commitment to unmatched quality and reliability has made us a trusted name in the world of sound and lighting services.
            We believe every event deserves a touch of perfection — and that’s exactly what we deliver.
            <br /><br />
            Our state-of-the-art equipment ensures that every note, word, and visual is delivered with precision and clarity.
            From immersive sound systems to captivating LED wall displays, we craft unforgettable moments tailored to your vision.
            <br /><br />
            What sets us apart is our customer-first approach. We don’t just offer services — we build relationships.
            Our intuitive online platform makes booking seamless, and our support team ensures your experience is smooth from start to finish.
            <br /><br />
            Choosing Sound Live means choosing innovation, expertise, and a partner who genuinely cares about your success.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src={WhyUsImage} alt="Why Us" className="w-full h-auto shadow-lg rounded-xl" />
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="px-6 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-green-400 md:text-4xl drop-shadow">Meet Our Team</h2>
        <p className="max-w-3xl mx-auto mb-10 text-lg leading-relaxed text-gray-300">
          Our passionate professionals bring creativity and precision to every project.
        </p>
        <div className="grid gap-10 mt-10 md:grid-cols-3">
          {team.map((member, index) => (
            <div key={index} className="p-8 text-center transition bg-gray-800 shadow-lg rounded-xl hover:shadow-green-500/20 hover:scale-105">
              <img src={member.image} alt={member.name} className="object-cover w-32 h-32 mx-auto mb-6 border-4 border-green-400 rounded-full" />
              <h4 className="text-2xl font-semibold text-green-300">{member.name}</h4>
              <p className="mt-1 text-base font-medium text-gray-300">{member.role}</p>
              <p className="mt-3 text-sm text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-green-400 md:text-4xl">Our Vision & Mission</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
          At Sound Live, our mission is to revolutionize how events sound and feel.
          We strive to deliver unforgettable experiences through cutting-edge audio-visual solutions.
          Our vision is to become Sri Lanka’s most trusted provider for live sound, lighting, and creative event technologies.
        </p>
      </section>

      {/* Core Values */}
      <section className="px-6 py-16 text-center bg-black">
        <h2 className="mb-4 text-3xl font-bold text-green-400 md:text-4xl">Our Core Values</h2>
        <ul className="max-w-3xl mx-auto space-y-3 text-lg text-left text-gray-300 list-disc list-inside">
          <li><strong>Innovation:</strong> Always evolving with the latest technology.</li>
          <li><strong>Reliability:</strong> You can count on us to deliver every time.</li>
          <li><strong>Passion:</strong> We care deeply about music, performance, and clarity.</li>
          <li><strong>Integrity:</strong> We build long-term relationships based on honesty and trust.</li>
          <li><strong>Customer Focus:</strong> Every decision is made with your satisfaction in mind.</li>
        </ul>
      </section>

      {/* Certifications & Partners */}
      <section className="px-6 py-16 text-center bg-gradient-to-t from-black to-gray-900">
        <h2 className="mb-4 text-3xl font-bold text-green-400 md:text-4xl">Certifications & Partners</h2>
        <p className="max-w-3xl mx-auto mb-6 text-lg leading-relaxed text-gray-300">
          We collaborate with top-tier industry partners and maintain professional certifications
          to ensure excellence in every event. Our team holds accreditations in sound engineering,
          stage safety, and lighting design.
        </p>
        {/* Add logos or icons if available */}
      </section>
    </div>
  );
};

export default About;
