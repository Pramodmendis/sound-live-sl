import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePageTitle from '../hooks/usePageTitle';

const ResetPasswordPage = () => {
  usePageTitle('Reset Password');
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('reset_email');

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetCode, password }),
      });

      const data = await res.json();

      if (res.ok) {
        notifySuccess(data.message);
        localStorage.removeItem('reset_email');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        notifyError(data.message || 'Reset failed.');
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
        <h2 className="mb-4 text-3xl font-bold text-center text-green-400">Reset Password</h2>
        <p className="mb-6 text-sm text-center text-gray-300">
          Enter the reset code sent to your email and your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">6-Digit Code</label>
            <input
              type="text"
              placeholder="Enter your reset code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700"
          >
            🔐 Reset Password
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Go back to{' '}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </motion.div>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default ResetPasswordPage;
