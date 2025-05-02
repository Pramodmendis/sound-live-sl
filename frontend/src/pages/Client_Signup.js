import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPageFormImage from '../assets/Signup.jpg';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black font-poppins">
      <div className="w-full max-w-5xl overflow-hidden text-white bg-gray-800 shadow-2xl rounded-2xl md:flex">

        {/* Left Visual Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={SignupPageFormImage}
            alt="Signup Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Signup Form */}
        <div className="w-full p-10 md:w-1/2">
          <h2 className="mb-4 text-4xl font-bold text-center text-green-400">Sign Up</h2>
          <p className="mb-8 text-center text-gray-300">
            Create your account to access premium booking features.
          </p>

          {error && <p className="mb-4 text-center text-red-400">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-bold text-white transition duration-300 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span
              className="text-green-400 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Log In here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
