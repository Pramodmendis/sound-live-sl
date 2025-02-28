import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        const response = await fetch ("http://localhost:5000/api/admin/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            navigate("/admin/login");
        } else {
            alert ("Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-sm w-full text-center text-white">
        <h2 className="text-2xl font-bold mb-6">Admin Signup</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-white">Already have an account?</p>
            <button
              className="text-sm text-white hover:underline focus:outline-none"
              onClick={() => navigate('/admin/login')}
            >
              Log in here.
            </button>
          </div>
      </div>
    </div>
    );
};

export default AdminSignup;