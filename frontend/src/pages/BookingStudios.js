import { useState } from "react";
import Studio from "../assets/StudioN.jpg";

function BookingPage() {
  const [formData, setFormData] = useState({
    bandName: "",
    email: "",
    password: "",
    date: "",
    hour: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div
        className="lg:w-1/2 bg-cover bg-center flex items-center justify-center p-10"
        style={{ backgroundImage: `url(${Studio})` }}
      >
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">SOUND LIVE STUDIOS</h1>
          <p className="mt-2 text-lg">SONIC SOUND of your SOUL</p>
        </div>
      </div>

      {/* Right Side - Booking Form */}
      <div className="lg:w-1/2 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            BOOK YOUR HOUR
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Just you and the Music.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="bandName"
              placeholder="Band Name"
              value={formData.bandName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <div className="flex gap-4">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
        </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition"
            >
              BOOK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
