import { motion } from "framer-motion";
import React from "react";

const Services = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <div className="min-h-screen px-6 py-16 pt-32 text-white bg-gradient-to-b from-gray-900 to-black md:px-12">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-green-400 text-center mb-14 drop-shadow-[0_2px_4px_rgba(34,197,94,0.7)]"
      >
        Our Services
      </motion.h1>

      {/* Services Section */}
      <div className="grid gap-10 text-center md:grid-cols-3">
        {[
          {
            title: "Professional Sound",
            description: "Crystal-clear sound for concerts, corporate events, and private parties.",
            icon: "🎤",
          },
          {
            title: "Dynamic Lighting",
            description: "Set the mood with stunning lights and effects for any event.",
            icon: "💡",
          },
          {
            title: "LED Wall Rentals",
            description: "High-definition LED walls to enhance visuals at your event.",
            icon: "📺",
          },
          {
            title: "Stage Setup",
            description: "Custom stage setups for concerts, conferences, and performances.",
            icon: "🎭",
          },
          {
            title: "Event Production",
            description: "Complete event production from planning to execution.",
            icon: "🎬",
          },
          {
            title: "Studio Booking",
            description: "Professional studio spaces for recording and rehearsals.",
            icon: "🎶",
          },
        ].map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="p-8 transition transform bg-gray-800 shadow-lg rounded-xl hover:shadow-green-500/20 hover:scale-105"
          >
            <p className="mb-4 text-5xl">{service.icon}</p>
            <h3 className="text-2xl font-semibold text-green-300">{service.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Pricing Plans */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={7}
        className="mt-24 text-center"
      >
        <h2 className="mb-8 text-4xl font-bold text-green-400">Pricing Plans</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              plan: "Basic",
              price: "Rs. 29,900",
              features: ["Basic Sound System", "Standard Lighting", "1 LED Wall"],
            },
            {
              plan: "Premium",
              price: "Rs. 59,900",
              features: ["Advanced Sound System", "Dynamic Lighting Effects", "2 LED Walls"],
            },
            {
              plan: "Elite",
              price: "Rs. 99,900",
              features: ["Concert-Level Sound", "Custom Lighting Designs", "Large LED Walls"],
            },
          ].map((pkg, i) => (
            <motion.div
              key={pkg.plan}
              custom={8 + i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-8 transition bg-gray-800 shadow-md rounded-xl hover:shadow-green-500/20"
            >
              <h3 className="text-2xl font-semibold text-green-300">{pkg.plan}</h3>
              <p className="my-4 text-3xl font-bold text-green-400">{pkg.price}</p>
              <ul className="space-y-1 text-sm text-gray-300">
                {pkg.features.map((f, j) => (
                  <li key={j}>✔ {f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Expanded FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={12}
        className="mt-24 text-center"
      >
        <h2 className="mb-8 text-4xl font-bold text-green-400">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto text-left">
          {[
            {
              question: "Do you offer custom packages?",
              answer: "Yes! Contact us for tailored solutions to fit your event.",
            },
            {
              question: "Can I book a studio session online?",
              answer: "Yes, visit our Studio Booking page to reserve your slot.",
            },
            {
              question: "What locations do you serve?",
              answer: "We provide services nationwide and internationally upon request.",
            },
            {
              question: "Can I cancel or reschedule a booking?",
              answer: "Yes, with advance notice. Our cancellation policy applies.",
            },
            {
              question: "Do you provide on-site technical support?",
              answer: "Yes, we have technicians available to manage the event setup and breakdown.",
            },
            {
              question: "How early should I book my event?",
              answer: "We recommend booking at least 2–4 weeks in advance, especially during peak seasons.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              custom={13 + i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-5 mb-4 bg-gray-800 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-green-300">{faq.question}</h3>
              <p className="mt-2 text-sm text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
