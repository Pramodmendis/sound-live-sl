import React, { useState } from "react";

const CreateBand = () => {
  const [band, setBand] = useState({
    name: "",
    genre: "",
    bio: "",
    priceIndoor: "",
    priceOutdoor: "",
    image: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    setBand({ ...band, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedBand = {
      ...band,
      priceIndoor: Number(band.priceIndoor),
      priceOutdoor: Number(band.priceOutdoor),
    };

    try {
      const res = await fetch("http://localhost:5000/api/bands/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedBand),
      });

      if (res.ok) {
        alert("✅ Band added successfully!");
        setBand({
          name: "",
          genre: "",
          bio: "",
          priceIndoor: "",
          priceOutdoor: "",
          image: "",
          videoUrl: "",
        });
      } else {
        alert("❌ Failed to add band.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-20 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-2xl p-6 mx-auto bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Add New Band</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Band Name"
            value={band.name}
            onChange={handleChange}
            required
            className="w-full p-3 text-white bg-gray-900 border border-gray-600 rounded"
          />
          <input
            name="genre"
            placeholder="Genre (e.g., Rock, Jazz)"
            value={band.genre}
            onChange={handleChange}
            className="w-full p-3 text-white bg-gray-900 border border-gray-600 rounded"
          />
          <textarea
            name="bio"
            placeholder="Band Description"
            value={band.bio}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 text-white bg-gray-900 border border-gray-600 rounded"
          />
          <input
            name="priceIndoor"
            type="number"
            placeholder="Price for Indoor Show (LKR)"
            value={band.priceIndoor}
            onChange={handleChange}
            required
            className="w-full p-3 text-white bg-gray-900 border border-gray-600 rounded"
          />
          <input
            name="priceOutdoor"
            type="number"
            placeholder="Price for Outdoor Show (LKR)"
            value={band.priceOutdoor}
            onChange={handleChange}
            required
            className="w-full p-3 text-white bg-gray-900 border border-gray-600 rounded"
          />
          <input
            name="image"
            placeholder="Band Image URL"
            value={band.image}
            onChange={handleChange}
            className="w-full p-3 text-white bg-gray-900 border border-gray-600 rounded"
          />
          <input
            name="videoUrl"
            placeholder="Demo Video URL (YouTube)"
            value={band.videoUrl}
            onChange={handleChange}
            className="w-full p-3 text-white bg-gray-900 border border-gray-600 rounded"
          />
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
          >
            Save Band
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBand;
