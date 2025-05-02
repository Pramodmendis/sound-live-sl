import React, { useEffect, useState } from 'react';

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('studio');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username,
        email: parsedUser.email,
        currentPassword: '',
        newPassword: '',
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('clientToken');
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('currentPassword', formData.currentPassword);
      formDataToSend.append('newPassword', formData.newPassword);
      if (profilePicture) {
        formDataToSend.append('profilePicture', profilePicture);
      }

      const res = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: data.username,
            email: data.email,
            profilePicture: data.profilePicture,
          })
        );
        setMessage('Profile updated successfully!');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setError(data.message || 'Update failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  if (!user) {
    return <div className="mt-20 text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-green-400">Client Profile</h2>

        <div className="flex items-center p-6 mb-6 space-x-4 bg-gray-800 rounded-lg shadow">
          {user.profilePicture ? (
            <img
              src={`http://localhost:5000/uploads/${user.profilePicture}`}
              alt="Profile"
              className="object-cover w-16 h-16 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold uppercase bg-green-600 rounded-full">
              {user.username.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold">{user.username}</h3>
            <p className="text-gray-300">{user.email}</p>
          </div>
        </div>

        {/* Profile Update Form */}
        <div className="p-6 mb-8 bg-gray-800 rounded-lg shadow">
          <h4 className="mb-4 text-2xl font-semibold text-green-400">Update Profile</h4>
          {message && <p className="mb-4 text-green-400">{message}</p>}
          {error && <p className="mb-4 text-red-400">{error}</p>}

          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 text-white bg-gray-700 rounded focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 text-white bg-gray-700 rounded focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full p-2 text-white bg-gray-700 rounded focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-300">New Password (optional)</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full p-2 text-white bg-gray-700 rounded focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-gray-300">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 text-white bg-gray-700 rounded focus:outline-none"
              />
            </div>

            <button type="submit" className="w-full py-2 font-semibold text-white transition bg-green-600 rounded hover:bg-green-700">
              Update Profile
            </button>
          </form>
        </div>

        {/* Booking Tabs */}
        <div className="flex justify-center gap-4 mb-4">
          {['studio', 'band', 'equipment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                activeTab === tab
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Bookings
            </button>
          ))}
        </div>

        {/* Booking Section */}
        <div className="mt-6 space-y-4">
          {activeTab === 'studio' && (
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="mb-2 text-lg font-bold text-green-400">Studio Booking</h3>
              <p className="text-sm text-gray-300">Date: May 5, 2025</p>
              <p className="text-sm text-gray-300">Time: 2PM – 6PM</p>
              <p className="text-xs text-gray-400">Status: Accepted</p>
            </div>
          )}

          {activeTab === 'band' && (
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="mb-2 text-lg font-bold text-green-400">Band Booking</h3>
              <p className="text-sm text-gray-300">Event: Outdoor Show</p>
              <p className="text-sm text-gray-300">Date: May 10, 2025</p>
              <p className="text-xs text-gray-400">Status: Pending</p>
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="mb-2 text-lg font-bold text-green-400">Equipment Rental</h3>
              <p className="text-sm text-gray-300">Items: Mixer, Lights</p>
              <p className="text-sm text-gray-300">Rental Date: May 12, 2025</p>
              <p className="text-xs text-gray-400">Status: Cancelled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
