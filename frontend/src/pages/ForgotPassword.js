import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        localStorage.setItem('reset_email', email);
        navigate('/reset-password');
      } else {
        setError(data.message || 'Request failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-gradient-to-b from-gray-900 to-black font-poppins">
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-xl rounded-2xl">
        <h2 className="mb-4 text-3xl font-bold text-center text-green-400">
          Forgot Password
        </h2>
        <p className="mb-6 text-sm text-center text-gray-300">
          Enter your registered email. We’ll send you a reset code.
        </p>

        {message && <p className="mb-4 text-center text-green-400">{message}</p>}
        {error && <p className="mb-4 text-center text-red-400">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
