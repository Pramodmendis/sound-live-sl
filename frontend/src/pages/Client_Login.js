import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormImage from '../assets/Login form.jpg';

const Login = () => {
    const navigate = useNavigate();

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
            <form onSubmit={(e) => {
              e.preventDefault();
              // Handle login logic here
            }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Enter your email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="example@mail.com"
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2">Enter your password</label>
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
                Login
              </button>
            </form>
  
            <div className="flex justify-between items-center mt-4">
              <button className="text-sm text-black hover:underline focus:outline-none" onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
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