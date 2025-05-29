import { motion } from "framer-motion";
import {
  BarChart,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MonitorSpeaker,
  Music,
  ShieldCheck,
  UserPlus,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import usePageTitle from "../../hooks/usePageTitle";

const AdminDashboard = () => {
  usePageTitle("Admin Dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalStudioBookings: 0,
    totalEquipmentBookings: 0,
    totalBandBookings: 0,
    totalSubscribers: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin-dashboard/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

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

  const chartData = [
    { name: "Studio", count: stats.totalStudioBookings },
    { name: "Equipment", count: stats.totalEquipmentBookings },
    { name: "Band", count: stats.totalBandBookings },
    { name: "Subscribers", count: stats.totalSubscribers },
  ];

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Sidebar */}
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
          {/* eslint-disable-next-line no-restricted-globals */}
          <button
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure you want to log out?")) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");
                navigate("/home");
              }
            }}
            className="flex items-center w-full gap-2 px-4 py-2 mt-8 text-left text-gray-300 rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        <button
          className="mb-4 text-white md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {admin && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-between mb-8 sm:flex-row"
          >
            <div>
              <h2 className="text-3xl font-bold text-green-400">
                Welcome, {admin.username}
              </h2>
              <p className="text-sm text-gray-400">{admin.email}</p>
              <p className="text-xs text-gray-500">({admin.role})</p>
            </div>
            <div className="flex items-center justify-center text-xl font-bold uppercase bg-green-600 rounded-full w-14 h-14">
  {admin.username?.charAt(0)}
</div>

          </motion.div>
        )}

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Total Users" value={stats.totalUsers} Icon={Users} color="blue-400" />
          <StatCard label="Total Admins" value={stats.totalAdmins} Icon={ShieldCheck} color="yellow-400" />
          <StatCard label="Studio Bookings" value={stats.totalStudioBookings} Icon={MonitorSpeaker} color="pink-400" />
          <StatCard label="Equipment Bookings" value={stats.totalEquipmentBookings} Icon={Music} color="red-400" />
          <StatCard label="Band Bookings" value={stats.totalBandBookings} Icon={Music} color="purple-400" />
          <StatCard label="Subscribers" value={stats.totalSubscribers} Icon={Users} color="green-300" />
        </div>

        {/* Booking Summary Chart */}
        <div className="mt-12">
          <h3 className="mb-4 text-xl font-semibold text-green-400">Booking Overview</h3>
          <div className="w-full p-4 bg-gray-800 rounded-lg h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="name" stroke="#E5E7EB" />
                <YAxis stroke="#E5E7EB" />
                <Tooltip />
                <Bar dataKey="count" fill="#22C55E" barSize={40} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, Icon, color }) => (
  <div className="p-6 transition bg-gray-800 shadow-lg rounded-xl hover:shadow-xl">
    <div className="flex items-center justify-between">
      <h3 className="text-sm text-gray-400">{label}</h3>
      <Icon className={`w-5 h-5 text-${color}`} />
    </div>
    <p className="mt-2 text-3xl font-bold text-green-400">{value}</p>
  </div>
);

export default AdminDashboard;
