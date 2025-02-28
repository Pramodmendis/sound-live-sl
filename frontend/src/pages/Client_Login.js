import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormImage from '../assets/Login form.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl md:flex">
        {/* Left Event Section */}
        <div className="hidden md:block w-1/2 rounded-l-2xl overflow-hidden">
          <img
            src={LoginFormImage}
            alt="Login Form Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Login Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">LOGIN TO SOUND LIVE!</h2>
          <p className="text-gray-600 text-center mb-8">Access your account to book services and manage your preferences.</p>

          {/* Display error message if any */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Enter your email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">Enter your password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-zinc-700 transition-all"
            >
              Login
            </button>
          </form>

          <div className="flex justify-between items-center mt-4">
            <button
              className="text-sm text-black hover:underline focus:outline-none"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </button>
            <button
              className="text-sm text-black hover:underline focus:outline-none"
              onClick={() => navigate('/signup')}
            >
              Don't have an account? Sign up here.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;