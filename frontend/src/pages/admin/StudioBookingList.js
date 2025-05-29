import {
  BarChart,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MonitorSpeaker,
  Music,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import usePageTitle from "../../hooks/usePageTitle";

const StudioBookingList = () => {
  usePageTitle("Studio Bookings");
  const location = useLocation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/studioBookings/all");
        const data = await res.json();
        setBookings(data);
        setFilteredBookings(data);
      } catch (error) {
        console.error("Failed to fetch studio bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/studioBookings/cancel/${id}`, {
        method: "PATCH",
      });
      toast.success("Booking cancelled");
      const updated = bookings.filter((b) => b._id !== id);
      setBookings(updated);
      setFilteredBookings(updated);
    } catch (err) {
      toast.error("Cancel failed");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = bookings.filter((b) =>
      (b.bandName || "").toLowerCase().includes(value) ||
      (b.email || "").toLowerCase().includes(value) ||
      (b.contactNumber || "").toLowerCase().includes(value)
    );
    setFilteredBookings(filtered);
  };

  const exportToCSV = () => {
    const headers = ["Band Name", "Email", "Contact No", "Date", "Start", "End", "Duration", "Price", "Payment"];
    const rows = filteredBookings.map((b) => [
      b.bandName,
      b.email,
      b.contactNumber,
      new Date(b.date).toLocaleDateString(),
      b.startTime,
      b.endTime,
      b.duration,
      b.totalPrice,
      b.paymentStatus
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "studio_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Studio Bookings", path: "/admin/StudioBookings", icon: CalendarClock },
    { name: "Equipment Bookings", path: "/admin/EquipmentBookings", icon: MonitorSpeaker },
    { name: "Band Bookings", path: "/admin/BandBookings", icon: Music },
    { name: "Add Booking Slot", path: "/admin/AddBookingSlot", icon: CalendarClock },
    { name: "All Bands", path: "/admin/AllBands", icon: Music },
    { name: "Users", path: "/admin/Users", icon: Users },
    { name: "Admins", path: "/admin/Admins", icon: UserPlus },
    { name: "Client Messages", path: "/admin/ClientMessages", icon: Mail },
    { name: "Blog Management", path: "/admin/BlogManage", icon: BarChart },
    { name: "Subscribers", path: "/admin/AdminSubscribers", icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      <aside className={`fixed z-40 inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out bg-gray-800 w-64 p-6 md:block`}>
        <h2 className="mb-8 text-2xl font-bold text-green-400">Sound Live</h2>
        <nav className="space-y-4">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
                isActive(path)
                  ? "bg-green-600 text-white font-semibold"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("admin");
              navigate("/home");
            }}
            className="flex items-center w-full gap-2 px-4 py-2 mt-8 text-left text-gray-300 rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:ml-64">
        <button className="mb-4 text-white md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-green-400">Studio Bookings</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="px-4 py-2 text-black rounded"
            />
            <button
              onClick={exportToCSV}
              className="px-4 py-2 text-sm font-semibold text-black bg-green-400 rounded hover:bg-green-500"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="p-4 overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="text-left text-green-300 bg-gray-700">
                <th className="p-3">Band Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Contact No</th>
                <th className="p-3">Date</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Price</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b._id} className="border-t border-gray-600 hover:bg-gray-700">
                  <td className="p-3">{b.bandName}</td>
                  <td className="p-3">{b.email}</td>
                  <td className="p-3">{b.contactNumber}</td>
                  <td className="p-3">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="p-3">{b.startTime}</td>
                  <td className="p-3">{b.endTime}</td>
                  <td className="p-3">{b.duration} hrs</td>
                  <td className="p-3">Rs {b.totalPrice.toLocaleString()}</td>
                  <td className="p-3">
                    {b.paymentStatus === "completed" ? (
                      <span className="px-2 py-1 text-sm font-semibold text-green-400 bg-green-800 rounded">Paid</span>
                    ) : (
                      <span className="px-2 py-1 text-sm font-semibold text-yellow-400 bg-yellow-800 rounded">Pending</span>
                    )}
                  </td>
                  <td className="p-3">
                    {b.paymentStatus !== "completed" ? (
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="px-3 py-1 text-sm font-semibold text-red-400 bg-red-800 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="10" className="p-4 text-center text-gray-400">
                    No studio bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StudioBookingList;