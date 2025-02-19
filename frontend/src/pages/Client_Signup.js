import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPageFormImage from '../assets/Signup.jpg';

const SignupPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl md:flex">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2 rounded-l-2xl overflow-hidden">
          <img
            src={SignupPageFormImage}
            alt="Signup Form Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Create an Account</h2>
          <p className="text-gray-600 text-center mb-8">Join Sound Live and elevate your event experience.</p>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="example@mail.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Create a Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="********"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-zinc-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <button className="text-sm text-black hover:underline focus:outline-none" 
            onClick={() => navigate('/login')}
            >Log in here.</button>
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100">
              <FontAwesomeIcon icon={faGoogle} className="text-red-500 mr-2" />
              Google
            </button>
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100">
              <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 mr-2" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;