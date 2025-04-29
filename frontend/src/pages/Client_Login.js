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
  
        window.location.href = '/';
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl md:flex">
        
        {/* Left Image */}
        <div className="hidden w-1/2 overflow-hidden md:block rounded-l-2xl">
          <img src={LoginFormImage} alt="Login Form Background" className="object-cover w-full h-full" />
        </div>

        {/* Login Form */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-6 text-2xl font-bold text-center text-blue-900">
            LOGIN TO SOUND LIVE!
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Access your account to book services and manage your preferences.
          </p>

          {error && (
            <p className="mb-4 text-center text-red-500">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-700">Enter your email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-700">Enter your password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-lg hover:bg-zinc-700"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-between mt-4">
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
