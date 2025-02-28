import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Logo from "../assets/Logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] text-white py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        
        {/* Logo & Description */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-6 text-center md:text-left">
          <img src={Logo} alt="Footer Logo" className="w-32 h-auto rounded-lg" />
          <p className="text-gray-300 max-w-md text-base leading-relaxed mt-4 md:mt-0">
          Your trusted partner for indoor event solutions. Book top-quality sound systems,
            lighting, LED walls, and studio sessions all in one place. Experience seamless service,
            professional-grade equipment, and a user-friendly platform designed to make your events unforgettable.
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-300">Email: soundliveofficials@gmail.com</p>
          <p className="text-gray-300">Phone: +94 777796834</p>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-start space-x-4 mt-5">
            <a
              href="https://www.facebook.com/SoundLiveOfficial"
              className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:bg-gray-600 transition duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://www.instagram.com/yourpage"
              className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:bg-gray-600 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10">
        © 2025 Sound Live. All Rights Reserved | Privacy Policy | Map
      </div>
    </footer>
  );
};

export default Footer;
