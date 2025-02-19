import {
    faBars,
    faCalendarAlt,
    faClock,
    faComment,
    faSignOutAlt,
    faUser,
    faUsers,
    faUserShield
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
  
  const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
  
    return (
      <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Sidebar */}
        <aside
          className={`bg-gradient-to-b from-gray-800 to-black w-64 p-5 space-y-6 transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={faBars}
              className="text-xl cursor-pointer md:hidden"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            />
            <h1 className="text-2xl font-bold">Sound Live</h1>
          </div>
  
          <nav className="mt-10 space-y-2">
            {[
              { icon: faUsers, label: "Users", path: "/admin/users" },
              { icon: faCalendarAlt, label: "Event List", path: "/admin/eventlist" },
              { icon: faUserShield, label: "Admins", path: "/admin/admins" },
              { icon: faClock, label: "Studio Bookings", path: "/admin/studiobookings" },
              { icon: faUserShield, label: "Equipment Bookings", path: "/admin/equipmentbookings" },
              { icon: faComment, label: "Client Messages", path: "/admin/clientmessages" }
            ].map((item, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded w-full"
                onClick={() => navigate(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
            <button className="flex items-center space-x-2 py-2 px-4 hover:bg-red-700 rounded w-full">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Log out</span>
            </button>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Topbar */}
          <div className="flex justify-between items-center p-4 bg-gray-800 rounded shadow">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden">
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} className="text-3xl text-white" />
              <span>vijai@mit.edu</span>
            </div>
          </div>
  
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {[
              { icon: faUser, label: "Total Users", count: 1, color: "text-blue-400" },
              { icon: faUsers, label: "Total Participants", count: 0, color: "text-green-400" },
              { icon: faCalendarAlt, label: "Total Events", count: 0, color: "text-yellow-400" },
              { icon: faUserShield, label: "Total Admins", count: 1, color: "text-red-400" }
            ].map((card, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow flex flex-col items-center">
                <FontAwesomeIcon icon={card.icon} className={`text-3xl ${card.color}`} />
                <h2 className="text-lg font-semibold mt-2">{card.label}</h2>
                <p className="text-3xl font-bold">{card.count}</p>
                <span className="text-sm text-green-500">Up to date</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  };
  
  export default AdminDashboard;