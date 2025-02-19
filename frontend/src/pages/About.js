import React from "react";
import Aboutusup from "../assets/Upbackground.jpg";
import WhyUsImage from "../assets/Whyus.jpg";

const About = () => {
  return (
    <div className=" text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-screen flex items-center justify-center text-center">
        <img
          src={Aboutusup}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="bg-black bg-opacity-60 p-8 rounded-xl z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Crafting Exceptional Events with Cutting-Edge Sound & Light Solutions
          </h1>
          <p className="text-lg md:text-xl">
            Your go-to destination for premium equipment rental and studio bookings.
          </p>
        </div>
      </header>

      {/* Who We Are Section */}
      <section className="py-16 px-8 text-center bg-gradient-to-b from-gray-900 to-black">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
        <p className="text-lg max-w-2xl mx-auto">
          At Sound Live, we are dedicated to enhancing your events with top-tier sound and lighting solutions. Our mission is to provide accessible and reliable services to create memorable experiences for all our clients.
        </p>
      </section>

      {/* Why Us Section */}
      <section className="py-16 px-8 flex flex-col md:flex-row items-center justify-center bg-black">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Us?</h2>
          <p className="text-lg">
          At Sound Live, we are passionate about transforming ordinary events into extraordinary experiences. Our commitment to delivering unmatched quality and reliability has made us a trusted name in the world of sound and lighting services. We believe that every event deserves a touch of perfection, and that’s exactly what we provide.
Our state-of-the-art equipment ensures that every note, every word, and every visual is delivered with precision and clarity. From immersive sound systems to captivating lighting and LED wall displays, we craft unforgettable moments tailored to your vision. Our team of experienced professionals works tirelessly behind the scenes to bring your ideas to life, ensuring that every detail is flawless.
What sets us apart is our customer-first approach. We don’t just offer services; we build relationships. By understanding your unique needs, we create solutions that align perfectly with your goals. Our intuitive online platform makes booking seamless and stress-free, while our dedicated support team ensures that your experience is smooth and enjoyable from start to finish.
Choosing Sound Live means choosing innovation, expertise, and a partner who genuinely cares about making your event a success. Let us be the spark that elevates your events to new heights. With Sound Live, your vision becomes our mission.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={WhyUsImage}
            alt="Why Us"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 px-8 text-center bg-gradient-to-t from-gray-900 to-black">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg max-w-2xl mx-auto">
          At Sound Live, we believe our people are our greatest asset. Meet the passionate professionals who bring expertise, creativity, and dedication to every project. From AV specialists to event coordinators, our team is committed to making your events unforgettable.
        </p>
      </section>
    </div>
  );
};

export default About;