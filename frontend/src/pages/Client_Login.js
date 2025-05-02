import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormImage from '../assets/Login form.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('clientToken', data.token);
        localStorage.setItem('user', JSON.stringify({
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture,
        }));

        window.location.href = '/home';
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-4xl text-white bg-gray-800 shadow-lg rounded-2xl md:flex">
        
        {/* Left Image */}
        <div className="hidden overflow-hidden md:block md:w-1/2 rounded-l-2xl">
          <img src={LoginFormImage} alt="Login Visual" className="object-cover w-full h-full" />
        </div>

        {/* Login Form */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-center text-green-400">Login to Sound Live</h2>
          <p className="mb-6 text-center text-gray-300">Access your account to book services and manage preferences.</p>

          {error && <p className="mb-4 text-center text-red-400">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-between mt-6 text-sm text-gray-300">
            <button onClick={() => navigate('/forgot-password')} className="hover:underline">
              Forgot Password?
            </button>
            <button onClick={() => navigate('/signup')} className="hover:underline">
              Don’t have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
