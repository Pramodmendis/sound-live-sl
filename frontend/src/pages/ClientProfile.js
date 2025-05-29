import { useEffect, useState } from 'react';
import usePageTitle from '../hooks/usePageTitle';

const ClientProfile = () => {
  usePageTitle('Client Profile');
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

  const [studioBookings, setStudioBookings] = useState([]);
  const [bandBookings, setBandBookings] = useState([]);
  const [equipmentBookings, setEquipmentBookings] = useState([]);

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

  useEffect(() => {
    if (user) {
      const fetchAllBookings = async () => {
        try {
          const [studioRes, bandRes, equipmentRes] = await Promise.all([
            fetch(`http://localhost:5000/api/studio-bookings/client?email=${user.email}`),
            fetch(`http://localhost:5000/api/band-bookings/client?email=${user.email}`),
            fetch(`http://localhost:5000/api/equipment-bookings/client?email=${user.email}`),
          ]);

          const [studioData, bandData, equipmentData] = await Promise.all([
            studioRes.json(),
            bandRes.json(),
            equipmentRes.json(),
          ]);

          setStudioBookings(studioData);
          setBandBookings(bandData);
          setEquipmentBookings(equipmentData);
        } catch (err) {
          console.error('Error fetching bookings');
        }
      };

      fetchAllBookings();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setProfilePicture(e.target.files[0]);

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
    <div className="min-h-screen px-4 py-10 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-green-400">Client Profile</h2>

        {/* Profile*/}
        <div className="flex items-center gap-4 p-6 mb-8 bg-gray-800 shadow-md rounded-xl">
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
            <p className="text-sm text-gray-300">{user.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-6 mb-10 bg-gray-800 shadow-md rounded-xl">
          <h4 className="mb-4 text-2xl font-semibold text-green-400">Update Profile</h4>
          {message && <p className="mb-4 text-green-400">{message}</p>}
          {error && <p className="mb-4 text-red-400">{error}</p>}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">New Password (optional)</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <button type="submit" className="w-full py-2 font-semibold text-white transition bg-green-600 rounded hover:bg-green-700">
              Update Profile
            </button>
          </form>
        </div>

        {/* Booking Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['studio', 'band', 'equipment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                activeTab === tab
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Bookings
            </button>
          ))}
        </div>

        {/* Booking Sections */}
        <div className="space-y-4">
          {activeTab === 'studio' &&
            (studioBookings.length === 0 ? (
              <p className="text-sm text-gray-400">No studio bookings found.</p>
            ) : (
              studioBookings.map((booking) => (
                <div key={booking._id} className="p-4 bg-gray-800 rounded-lg shadow-md">
                  <h3 className="mb-2 text-lg font-bold text-green-400">Studio Booking</h3>
                  <p className="text-sm text-gray-300">Date: {booking.date}</p>
                  <p className="text-sm text-gray-300">Time: {booking.time}</p>
                  <p className="text-xs text-gray-400">Status: {booking.status}</p>
                </div>
              ))
            ))}

          {activeTab === 'band' &&
            (bandBookings.length === 0 ? (
              <p className="text-sm text-gray-400">No band bookings found.</p>
            ) : (
              bandBookings.map((booking) => (
                <div key={booking._id} className="p-4 bg-gray-800 rounded-lg shadow-md">
                  <h3 className="mb-2 text-lg font-bold text-green-400">Band Booking</h3>
                  <p className="text-sm text-gray-300">Event: {booking.eventType}</p>
                  <p className="text-sm text-gray-300">Date: {booking.date}</p>
                  <p className="text-xs text-gray-400">Status: {booking.status}</p>
                </div>
              ))
            ))}

          {activeTab === 'equipment' &&
            (equipmentBookings.length === 0 ? (
              <p className="text-sm text-gray-400">No equipment bookings found.</p>
            ) : (
              equipmentBookings.map((booking) => (
                <div key={booking._id} className="p-4 bg-gray-800 rounded-lg shadow-md">
                  <h3 className="mb-2 text-lg font-bold text-green-400">Equipment Rental</h3>
                  <p className="text-sm text-gray-300">Items: {booking.items?.join(', ')}</p>
                  <p className="text-sm text-gray-300">Rental Date: {booking.date}</p>
                  <p className="text-xs text-gray-400">Status: {booking.status}</p>
                </div>
              ))
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
