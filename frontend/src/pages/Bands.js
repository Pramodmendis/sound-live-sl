import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const Bands = () => {
  usePageTitle("Bands");
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
    <div className="min-h-screen px-4 py-24 text-white bg-gradient-to-b from-gray-900 to-black md:px-12">
      <h2 className="mb-4 text-4xl font-extrabold text-center text-green-400 drop-shadow">
        Available Bands
      </h2>
      <p className="max-w-3xl mx-auto mb-12 text-lg text-center text-gray-300">
        Discover talented bands ready to perform at your event. Choose from indoor or outdoor setups and enjoy live music tailored to your vibe.
      </p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {bands.map((band) => (
          <div
            key={band._id}
            className="flex flex-col overflow-hidden transition duration-300 border border-gray-700 rounded-xl shadow-md bg-gradient-to-b from-gray-800 to-gray-900 hover:shadow-lg hover:scale-[1.02]"
          >
            <img
              src={band.image}
              alt={band.name}
              className="object-cover w-full aspect-[4/3] rounded-t-xl"
            />
            <div className="flex flex-col justify-between flex-grow p-5">
              <div>
                <h3 className="text-2xl font-bold text-white">{band.name}</h3>
                <p className="mt-1 text-sm font-medium tracking-wide text-green-400 uppercase">
                  {band.genre}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  {band.bio?.length > 100 ? band.bio.slice(0, 100) + "..." : band.bio}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-200">
                  <p> <span className="text-white">Indoor Show:</span> <span className="text-green-300">Rs. {band.priceIndoor?.toLocaleString()}/hr</span></p>
                  <p> <span className="text-white">Outdoor Show:</span> <span className="text-green-300">Rs. {band.priceOutdoor?.toLocaleString()}/hr</span></p>
                </div>
              </div>

              <div className="mt-6">
                <Link to={`/bandbooking?bandId=${band._id}`}>
                  <button className="w-full py-2 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105">
                    📅 Book Now
                  </button>
                </Link>
                {band.videoUrl && (
                  <a
                    href={band.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-sm text-center text-blue-400 hover:underline"
                  >
                    🎥 View Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {bands.length === 0 && (
          <p className="mt-12 text-center text-gray-400 col-span-full">
            No bands available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bands;
