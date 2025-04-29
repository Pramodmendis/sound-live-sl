import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPageFormImage from '../assets/Signup.jpg';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
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
        navigate('/login'); // ✅ Go to login, no auto-login
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl md:flex">
        
        {/* Left Image */}
        <div className="hidden w-1/2 overflow-hidden md:block rounded-l-2xl">
          <img src={SignupPageFormImage} alt="Signup Background" className="object-cover w-full h-full" />
        </div>

        {/* Signup Form */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-6 text-2xl font-bold text-center text-blue-900">
            Create an Account
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Join Sound Live and elevate your event experience.
          </p>

          {error && (
            <p className="mb-4 text-center text-red-500">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-lg hover:bg-zinc-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
