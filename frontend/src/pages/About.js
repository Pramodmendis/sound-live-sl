import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Member1 from "../assets/M1.jpg";
import Member2 from "../assets/M2.jpg";
import Member3 from "../assets/M3.jpg";
import Member4 from "../assets/M4.jpg";
import Member5 from "../assets/M5.jpg";
import Member6 from "../assets/M6.jpg";
import photographerImg from "../assets/photographer.jpg";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import videographerImg from "../assets/videographer.jpg";
import WhyUsImage from "../assets/Why.jpg";
import usePageTitle from "../hooks/usePageTitle";

const About = () => {
  usePageTitle("About");
  const slides = [slide1, slide2, slide3];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScroll = () => {
    const section = document.getElementById("who-we-are");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const team = [
    {
      name: "Mr. Sampath Mendis",
      role: "Founder & Sound Engineer",
      image: Member1,
      bio: "Pramod leads the Sound Live team with over a decade of experience in audio engineering, ensuring top-tier sound quality for every event.",
    },
    {
      name: "Mr. Pramod Mendis",
      role: "Lighting Director",
      image: Member2,
      bio: "Samantha specializes in designing immersive lighting experiences that transform venues and captivate audiences.",
    },
    {
      name: "Mr. Tharindu Silva",
      role: "Studio Manager",
      image: Member3,
      bio: "Tharindu oversees all studio operations and coordinates professional sessions with clients and artists.",
    },
    {
      name: "Miss Nimesha Fernando",
      role: "Event Coordinator",
      image: Member4,
      bio: "With a background in event planning, Nimesha ensures every event runs smoothly from setup to finale.",
    },
    {
      name: "Mr. Kavindu Jayasooriya",
      role: "Visual Systems Lead",
      image: Member5,
      bio: "Kavindu designs and deploys dynamic LED and projection visuals, blending creativity with cutting-edge tech.",
    },
    {
      name: "Mr. Ishara Gunawardena",
      role: "Support & Logistics",
      image: Member6,
      bio: "Ishara ensures timely setup and equipment delivery while supporting client needs onsite.",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <section className="relative overflow-hidden text-white">
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: -20 }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-[-10]" />

        <div className="min-h-[60vh] flex items-center justify-center text-center px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="z-10 max-w-3xl p-6 mx-auto md:p-12 rounded-xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-400 mb-4 drop-shadow-[0_2px_4px_rgba(34,197,94,0.7)]">
              Crafting Exceptional Events with Cutting-Edge Sound & Light
            </h1>
            <p className="text-lg text-gray-300 md:text-xl">
              Your go-to destination for premium equipment rental and studio bookings.
            </p>
          </motion.div>
        </div>

        <div
          className="absolute text-2xl text-green-400 transform -translate-x-1/2 cursor-pointer bottom-6 left-1/2 animate-bounce"
          onClick={handleScroll}
        >
          <FaChevronDown />
        </div>

        <div id="who-we-are" className="px-6 pt-16 pb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold text-green-400 md:text-4xl drop-shadow"
          >
            Who We Are
          </motion.h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
            At Sound Live, we are dedicated to enhancing your events with top-tier sound and lighting solutions.
            Our mission is to provide accessible and reliable services to create memorable experiences for all our clients.
          </p>
        </div>
      </section>

      {/* Why Us */}
      <section className="flex flex-col items-center justify-between gap-10 px-6 py-20 bg-black md:flex-row bg-gradient-to-b from-gray-900 to-black">
        <div className="md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold text-green-400 md:text-4xl drop-shadow"
          >
            Why Us?
          </motion.h2>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
             <span className="font-semibold text-green-400">Sound Live</span> is Sri Lanka’s premier sound and event solutions provider, trusted by artists, event organizers, and businesses alike. Our mission is simple — to transform events into unforgettable experiences through world-class sound, lighting, and visual setups. We don’t just deliver equipment; we deliver excellence, emotion, and energy.

  <br /><br />
  We understand that every event is a reflection of your vision, your audience, and your brand. Whether you're planning a high-energy concert, a private celebration, a corporate function, or a studio session, our team is here to bring your ideas to life with technical precision and creative flair. Our experience in both small-scale and large-scale productions gives us the versatility to adapt and deliver — no matter the venue or occasion.

  <br /><br />
  What sets Sound Live apart is our unwavering commitment to quality and customer satisfaction. Our sound systems are finely tuned to ensure crystal-clear audio at any scale — from intimate studio sessions to open-air festivals. Our lighting rigs and LED walls don’t just light the stage — they set the tone, elevate the atmosphere, and engage the audience. Every piece of equipment we use is maintained to professional standards, ensuring reliability and performance you can count on.

  <br /><br />
  But our real strength lies in the team behind the tech. Our crew includes passionate sound engineers, creative designers, event coordinators, and technicians who bring not just skill but heart to every project. We collaborate closely with you, listen to your needs, offer guidance, and execute with precision. You're never just another client — you're a creative partner.

  <br /><br />
  We’ve also made the booking process easier than ever. Through our intuitive online platform, you can explore services, check availability, request quotes, and make bookings all in one place. Whether you're hiring a live band, renting sound and lighting gear, or booking our state-of-the-art studio, the experience is streamlined and stress-free. Need support? Our responsive team is just a message away, ready to assist at any stage of your journey.

  <br /><br />
  At Sound Live, we combine innovation with reliability. We continuously update our equipment and processes to stay at the forefront of audio-visual technology, ensuring your events are powered by the best tools in the industry. And while we embrace modern tech, we never forget the human touch — it’s what makes our service truly exceptional.

  <br /><br />
  Choosing Sound Live means choosing a partner who’s passionate, professional, and committed to delivering outstanding results. From setup to soundcheck, from lights-on to curtain-call — we’re with you every step of the way. Let us help you turn your next event into something extraordinary.

  <br /><br />
  <span className="italic text-gray-400">Sound Live — Where every sound tells a story, and every light brings it to life.</span>
</p>

        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <img src={WhyUsImage} alt="Why Us" className="w-full h-auto shadow-lg rounded-xl" />
        </motion.div>
      </section>

      {/* Meet Our Team */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-gray-900 to-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold text-green-400 md:text-4xl drop-shadow"
        >
          Meet Our Team
        </motion.h2>
        <p className="max-w-3xl mx-auto mb-10 text-lg leading-relaxed text-gray-300">
          Our passionate professionals bring creativity and precision to every project.
        </p>
        <div className="grid gap-10 mt-10 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 text-center transition bg-gray-800 shadow-lg rounded-xl hover:shadow-green-500/20 hover:scale-105"
            >
              <img src={member.image} alt={member.name} className="object-cover w-32 h-32 mx-auto mb-6 border-4 border-green-400 rounded-full" />
              <h4 className="text-2xl font-semibold text-green-300">{member.name}</h4>
              <p className="mt-1 text-base font-medium text-gray-300">{member.role}</p>
              <p className="mt-3 text-sm text-gray-400">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 py-16 text-center bg-gradient-to-b from-gray-900 to-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold text-green-400 md:text-4xl"
        >
          Our Vision & Mission
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
          At Sound Live, our mission is to revolutionize how events sound and feel.
          We strive to deliver unforgettable experiences through cutting-edge audio-visual solutions.
          Our vision is to become Sri Lanka’s most trusted provider for live sound, lighting, and creative event technologies.
        </p>
      </section>

      {/* Core Values */}
      <section className="px-6 py-16 text-center bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold text-green-400 md:text-4xl"
        >
          Our Core Values
        </motion.h2>
        <ul className="max-w-3xl mx-auto space-y-3 text-lg text-left text-gray-300 list-disc list-inside">
          <li><strong>Innovation:</strong> Always evolving with the latest technology.</li>
          <li><strong>Reliability:</strong> You can count on us to deliver every time.</li>
          <li><strong>Passion:</strong> We care deeply about music, performance, and clarity.</li>
          <li><strong>Integrity:</strong> We build long-term relationships based on honesty and trust.</li>
          <li><strong>Customer Focus:</strong> Every decision is made with your satisfaction in mind.</li>
        </ul>
      </section>

      {/* Media Team */}
      <section className="px-6 py-16 text-white bg-black md:px-12">
        <div className="mx-auto text-center max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-extrabold text-green-400 md:text-5xl drop-shadow-md"
          >
            Meet Our Media Team
          </motion.h2>
          <p className="max-w-2xl mx-auto mb-12 text-gray-300">
            Capturing unforgettable moments with precision and creativity — meet the talented individuals behind the lens.
          </p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Photographer */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 overflow-hidden bg-gray-900 shadow-lg rounded-xl"
            >
              <img src={photographerImg} alt="Official Photographer" className="object-cover w-full h-64 mb-4 rounded-lg" />
              <h3 className="text-2xl font-bold text-green-400">📸 Mr. Shenal Mendis</h3>
              <p className="mt-2 text-gray-300">Official Photographer</p>
              <p className="mt-4 text-gray-400">Jane captures timeless moments with creativity and elegance — every shot tells a story.</p>
              <div className="mt-4 space-y-1 text-sm text-gray-400">
                <p>📞 <a href="tel:+94771234567" className="text-green-400 hover:underline">+94 76 421 2393</a></p>
                <p>📸 <a href="https://www.instagram.com/shenal_mendis_photography_?igsh=d204eXVxemN6cHpv" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Instagram</a></p>
                <p>👍 <a href="https://www.facebook.com/share/16BxxizhYX/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Facebook</a></p>
              </div>
            </motion.div>

            {/* Videographer */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 overflow-hidden bg-gray-900 shadow-lg rounded-xl"
            >
              <img src={videographerImg} alt="Official Videographer" className="object-cover w-full h-64 mb-4 rounded-lg" />
              <h3 className="text-2xl font-bold text-green-400">🎥 Mr. Chanula Fernando</h3>
              <p className="mt-2 text-gray-300">Official Videographer</p>
              <p className="mt-4 text-gray-400">John turns events into cinematic experiences — capturing the energy and soul of every show.</p>
              <div className="mt-4 space-y-1 text-sm text-gray-400">
                <p>📞 <a href="tel:+94779876543" className="text-green-400 hover:underline">+94 76 154 7644</a></p>
                <p>📸 <a href="https://www.instagram.com/chanula_fernando_photography?igsh=MTI3OGg0ZGIyejVhMQ==" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Instagram</a></p>
                <p>👍 <a href="https://www.facebook.com/share/1AH8j5eGAb/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Facebook</a></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
