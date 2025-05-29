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

const BandBookingList = () => {
  usePageTitle("Band Bookings");
  const location = useLocation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bandBookings/all");
        const data = await res.json();
        setBookings(data);
        setFilteredBookings(data);
      } catch (err) {
        console.error("Failed to fetch band bookings", err);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/bandBookings/cancel/${id}`, {
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
      (b.bandId?.name || "").toLowerCase().includes(value) ||
      (b.email || b.clientId?.email || "").toLowerCase().includes(value) ||
      (b.eventDate || "").toLowerCase().includes(value)
    );
    setFilteredBookings(filtered);
  };

  const exportToCSV = () => {
    const headers = ["Band", "Date", "Time", "Hours", "Email", "Phone", "Location", "Payment"];

    const rows = filteredBookings.map((b) => [
      b.bandId?.name,
      b.eventDate,
      b.eventTime,
      b.hours,
      b.email || b.clientId?.email || "-",
      b.phone || b.clientId?.phone || "-",
      b.location,
      b.paymentStatus || "Pending",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "band_bookings.csv");
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
          <h2 className="text-3xl font-bold text-green-400">Band Bookings</h2>
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
                <th className="p-3">Band</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Hours</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Location</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b._id} className="border-t border-gray-600 hover:bg-gray-700">
                  <td className="p-3">{b.bandId?.name}</td>
                  <td className="p-3">{b.eventDate} @ {b.eventTime}</td>
                  <td className="p-3">{b.hours} hrs</td>
                  <td className="p-3">{b.email || b.clientId?.email || "-"}</td>
                  <td className="p-3">{b.phone || b.clientId?.phone || "-"}</td>
                  <td className="p-3">{b.location}</td>
                  <td className="p-3">
                    {b.paymentStatus === "Paid" ? (
                      <span className="px-2 py-1 text-sm font-semibold text-green-400 bg-green-800 rounded">Paid</span>
                    ) : (
                      <span className="px-2 py-1 text-sm font-semibold text-yellow-400 bg-yellow-800 rounded">Pending</span>
                    )}
                  </td>
                  <td className="p-3">
                    {b.paymentStatus !== "Paid" ? (
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
                  <td colSpan="8" className="p-4 text-center text-gray-400">
                    No band bookings found.
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

export default BandBookingList;
