import { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    // Add password reset logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-poppins">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="bg-black w-full text-white hover:bg-zinc-600 py-2 rounded-xl font-medium">
            Submit
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Remembered your password?{' '}
          <a href="/login" className="text-black hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;