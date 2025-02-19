import React from "react";

const Services = () => {
  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-8">
      <h1 className="text-5xl font-bold text-indigo-400 text-center mb-10">Our Services</h1>
      
      {/* Services Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {[
          { title: "Professional Sound", description: "Crystal-clear sound for concerts, corporate events, and private parties.", icon: "🎤" },
          { title: "Dynamic Lighting", description: "Set the mood with stunning lights and effects for any event.", icon: "💡" },
          { title: "LED Wall Rentals", description: "High-definition LED walls to enhance visuals at your event.", icon: "📺" },
          { title: "Stage Setup", description: "Custom stage setups for concerts, conferences, and performances.", icon: "🎭" },
          { title: "Event Production", description: "Complete event production from planning to execution.", icon: "🎬" },
          { title: "Studio Booking", description: "Professional studio spaces for recording and rehearsals.", icon: "🎶" }
        ].map((service, index) => (
          <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
            <p className="text-6xl mb-4">{service.icon}</p>
            <h3 className="text-2xl font-semibold text-indigo-300">{service.title}</h3>
            <p className="mt-2 text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <section className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-indigo-400 mb-6">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { plan: "Basic", price: "$299", features: ["Basic Sound System", "Standard Lighting", "1 LED Wall"] },
            { plan: "Premium", price: "$599", features: ["Advanced Sound System", "Dynamic Lighting Effects", "2 LED Walls"] },
            { plan: "Elite", price: "$999", features: ["Concert-Level Sound", "Custom Lighting Designs", "Large LED Walls"] }
          ].map((pkg, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-indigo-300">{pkg.plan}</h3>
              <p className="text-3xl font-bold text-indigo-400 my-4">{pkg.price}</p>
              <ul className="text-gray-300">
                {pkg.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-indigo-400 mb-6">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto text-left">
          {[
            { question: "Do you offer custom packages?", answer: "Yes! Contact us for tailored solutions to fit your event." },
            { question: "Can I book a studio session online?", answer: "Yes, visit our Studio Booking page to reserve your slot." },
            { question: "What locations do you serve?", answer: "We provide services nationwide and internationally upon request." }
          ].map((faq, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-300">{faq.question}</h3>
              <p className="text-gray-300 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-indigo-400 mb-4">Ready to Elevate Your Event?</h2>
        <p className="text-lg text-gray-300 mb-6">Contact us today to get started on your next big event.</p>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg">Get a Quote</button>
      </div>
    </div>
  );
};

export default Services;