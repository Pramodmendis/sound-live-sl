import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bands = () => {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bands/all");
        const data = await res.json();
        setBands(data);
      } catch (error) {
        console.error("Failed to fetch bands:", error);
      }
    };

    fetchBands();
  }, []);

  return (
    <div className="min-h-screen px-4 py-20 text-white bg-gradient-to-b from-gray-900 to-black">
      <h2 className="mb-10 text-3xl font-bold text-center">Available Bands</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bands.map((band) => (
          <div
            key={band._id}
            className="flex flex-col overflow-hidden bg-gray-800 rounded-lg shadow-md"
          >
            <img
              src={band.image}
              alt={band.name}
              className="object-cover w-full h-48"
            />
            <div className="flex flex-col justify-between flex-grow p-4">
              <div>
                <h3 className="mb-1 text-xl font-bold">{band.name}</h3>
                <p className="mb-1 text-sm italic text-green-400">{band.genre}</p>
                <p className="mb-3 text-sm text-gray-300">
                  {band.bio?.length > 100
                    ? band.bio.slice(0, 100) + "..."
                    : band.bio}
                </p>
                <div className="mb-3 text-sm">
                  <p>🎤 <span className="text-white">Indoor Show:</span> Rs. {band.priceIndoor?.toLocaleString()}/hr</p>
                  <p>🎪 <span className="text-white">Outdoor Show:</span> Rs. {band.priceOutdoor?.toLocaleString()}/hr</p>
                </div>
              </div>

              <div className="mt-auto">
                <Link to={`/book-band?bandId=${band._id}`}>
                  <button className="w-full py-2 mt-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700">
                    Book Now
                  </button>
                </Link>
                {band.videoUrl && (
                  <a
                    href={band.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-center text-blue-400 hover:underline"
                  >
                    🎥 View Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {bands.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">No bands available.</p>
        )}
      </div>
    </div>
  );
};

export default Bands;
