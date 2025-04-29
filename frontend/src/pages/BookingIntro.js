import { useNavigate } from "react-router-dom";

function BookingIntro() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black px-4">
      <h1 className="text-4xl font-bold mb-8 text-white">Choose Your Booking</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Equipment Rental Card */}
        <div
          onClick={() => handleNavigation("/equipment-rental")}
          className="w-80 h-48 bg-blue-600 text-white flex flex-col justify-center items-center rounded-xl shadow-lg cursor-pointer hover:bg-blue-700 transition transform hover:scale-105 p-6"
        >
          <h2 className="text-2xl font-semibold">Equipment Rental</h2>
          <p className="text-sm text-gray-200 mt-2 text-center">
            Rent high-quality gear for your sessions.
          </p>
        </div>

        {/* Booking Studios Card */}
        <div
          onClick={() => handleNavigation("/bookingstudios")}
          className="w-80 h-48 bg-green-600 text-white flex flex-col justify-center items-center rounded-xl shadow-lg cursor-pointer hover:bg-green-700 transition transform hover:scale-105 p-6"
        >
          <h2 className="text-2xl font-semibold">Booking Studios</h2>
          <p className="text-sm text-gray-200 mt-2 text-center">
            Reserve our top-tier studios for your recording.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingIntro;
