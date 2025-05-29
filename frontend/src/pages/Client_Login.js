import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginFormImage from '../assets/Login form.jpg';
import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
  usePageTitle('Login');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        toast.success('Login successful! Redirecting...', { theme: 'dark' });
        setTimeout(() => {
          window.location.href = '/home';
        }, 1800);
      } else {
        toast.error(data.message || 'Login failed.', { theme: 'dark' });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', { theme: 'dark' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-b from-gray-900 to-black font-poppins">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl overflow-hidden bg-gray-800 shadow-2xl rounded-2xl md:flex"
      >
        <div className="hidden md:block md:w-1/2">
          <img src={LoginFormImage} alt="Login Visual" className="object-cover w-full h-full rounded-l-2xl" />
        </div>

        <div className="w-full p-10 text-white md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-center text-green-400"
          >
            Log In
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 mb-6 text-sm text-center text-gray-300"
          >
            Access your account to book services and manage preferences.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <label className="block mb-1 text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your account password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700"
            >
              Login
            </motion.button>
          </form>

          <motion.div
            className="flex items-center justify-between mt-6 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button onClick={() => navigate('/forgot-password')} className="hover:underline">
              Forgot Password?
            </button>
            <button onClick={() => navigate('/signup')} className="hover:underline">
              Don’t have an account? Sign Up
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
