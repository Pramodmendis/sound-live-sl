import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Logo from "../assets/Logo.jpg";

const Footer = () => {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <footer className="bg-[#0b1120] text-white pt-12 pb-6 relative">
      <div className="grid items-start grid-cols-1 gap-12 px-6 mx-auto max-w-7xl md:grid-cols-3">

        {/* Logo + Description */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <img src={Logo} alt="Sound Live Logo" className="h-auto mb-4 rounded-lg w-28" />
          <p className="max-w-xs text-sm leading-relaxed text-gray-400">
            Your trusted partner for event sound, lighting, LED walls, and studio bookings. We make every event unforgettable with pro-grade service and seamless experiences.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="mb-4 text-lg font-bold text-green-400">Contact Us</h3>
          <p className="text-sm text-gray-300">📧 soundliveofficials@gmail.com</p>
          <p className="mt-1 text-sm text-gray-300">📞 +94 777 796 834</p>

          <div className="flex justify-center mt-5 space-x-4 md:justify-start">
            <a
              href="https://www.facebook.com/profile.php?id=61576198444037"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-white transition border border-gray-600 rounded-full w-9 h-9 hover:border-green-400 hover:bg-green-400 hover:text-black"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://www.instagram.com/sound.livesl?igsh=MWNhM2h3emc4MWF2Mw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-white transition border border-gray-600 rounded-full w-9 h-9 hover:border-green-400 hover:bg-green-400 hover:text-black"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="text-center md:text-left">
          <h3 className="mb-4 text-lg font-bold text-green-400">Location</h3>
          <p className="text-sm text-gray-300">
            20/1, Gangabada road, Wawela, Piliyandala. <br />
            Available Island-wide for events
          </p>
        </div>
      </div>

      {/* Divider + Footer Links */}
      <div className="px-6 pt-4 mt-12 text-sm text-center text-gray-500 border-t border-gray-700">
        © 2025 Sound Live. All Rights Reserved.
        <span className="mx-2">|</span>
        <button
          onClick={() => setShowPolicy(true)}
          className="underline hover:text-green-400"
        >
          Privacy Policy
        </button>
        <span className="mx-2">|</span>
        <button
          onClick={() => setShowMap(true)}
          className="underline hover:text-green-400"
        >
          View Map
        </button>
      </div>

      {/* Privacy Policy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-60">
          <div className="bg-gray-900 text-white max-w-2xl w-full rounded-lg p-6 overflow-y-auto max-h-[80vh] shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-green-400">Privacy Policy</h2>
            <p className="mb-2 text-sm text-gray-300">Last updated: May 2, 2025</p>
            <p className="mb-4 text-gray-300">
              At Sound Live, we respect your privacy and are committed to protecting your personal information. This policy explains how we handle your data.
            </p>
            <h3 className="mb-1 font-semibold text-green-300">1. Information We Collect</h3>
            <ul className="pl-5 mb-4 space-y-1 text-sm text-gray-300 list-disc">
              <li>Full name, email address, phone number during bookings</li>
              <li>Payment data (via secure gateways)</li>
              <li>Site usage for analytics and improvements</li>
            </ul>

            <h3 className="mb-1 font-semibold text-green-300">2. Usage</h3>
            <ul className="pl-5 mb-4 space-y-1 text-sm text-gray-300 list-disc">
              <li>To manage and confirm your bookings</li>
              <li>To send updates and event-related info</li>
              <li>To enhance our site and services</li>
            </ul>

            <h3 className="mb-1 font-semibold text-green-300">3. Data Protection</h3>
            <p className="mb-4 text-sm text-gray-300">
              We use secure systems and never share your data. All transactions are encrypted.
            </p>

            <h3 className="mb-1 font-semibold text-green-300">4. Contact Us</h3>
            <p className="mb-6 text-sm text-gray-300">
              For questions, email us at <span className="text-green-400">soundliveofficials@gmail.com</span>
            </p>

            <div className="text-right">
              <button
                onClick={() => setShowPolicy(false)}
                className="px-4 py-2 text-black transition bg-green-400 rounded hover:bg-green-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-60">
          <div className="w-full max-w-3xl p-4 overflow-hidden text-white bg-gray-900 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-green-400">Our Location</h2>
            <iframe
              title="Sound Live Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d416.42620393791486!2d79.90843934852762!3d6.801932863836606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1746170967809!5m2!1sen!2slk"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>

            <div className="mt-4 text-right">
              <button
                onClick={() => setShowMap(false)}
                className="px-4 py-2 text-black transition bg-green-400 rounded hover:bg-green-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
