import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePageTitle from '../hooks/usePageTitle';

const ForgotPasswordPage = () => {
  usePageTitle('Forgot Password');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        notifySuccess(data.message);
        localStorage.setItem('reset_email', email);
        navigate('/reset-password');
      } else {
        notifyError(data.message || 'Request failed.');
      }
    } catch (err) {
      notifyError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-gradient-to-b from-gray-900 via-black to-gray-900 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-gray-800 shadow-2xl bg-opacity-90 rounded-2xl"
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-green-400">
          Forgot Password
        </h2>
        <p className="mb-6 text-sm text-center text-gray-300">
          Enter your registered email. We’ll send you a reset code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700"
          >
            🔒 Send Reset Code
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Remembered your password?{' '}
          <a href="/login" className="text-green-400 hover:underline">
            Back to login
          </a>
        </p>
      </motion.div>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default ForgotPasswordPage;
