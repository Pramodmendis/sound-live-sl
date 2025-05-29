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
import usePageTitle from "../../hooks/usePageTitle";

const AddBookingSlot = () => {
  usePageTitle("Add Booking Slot");
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [slots, setSlots] = useState([
    { type: "equipment", date: "", startTime: "", endTime: "", bandId: "" },
  ]);
  const [bulkType, setBulkType] = useState("equipment");
  const [bulkFrom, setBulkFrom] = useState("");
  const [bulkTo, setBulkTo] = useState("");
  const [bulkStartTime, setBulkStartTime] = useState("");
  const [bulkEndTime, setBulkEndTime] = useState("");
  const [bulkBandId, setBulkBandId] = useState("");
  const [message, setMessage] = useState("");
  const [allBands, setAllBands] = useState([]);

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

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bands/all");
        const data = await res.json();
        setAllBands(data);
      } catch (err) {
        console.error("Failed to fetch bands", err);
      }
    };
    fetchBands();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...slots];
    updated[index][field] = value;
    setSlots(updated);
  };

  const addSlot = () => {
    setSlots([...slots, { type: "equipment", date: "", startTime: "", endTime: "", bandId: "" }]);
  };

  const removeSlot = (index) => {
    const updated = [...slots];
    updated.splice(index, 1);
    setSlots(updated);
  };

  const generateBulkSlots = () => {
    if (!bulkFrom || !bulkTo) return setMessage("❌ Please select from and to dates");
    const fromDate = new Date(bulkFrom);
    const toDate = new Date(bulkTo);
    if (fromDate > toDate) return setMessage("❌ From date cannot be after To date");

    const newSlots = [];
    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      const formatted = d.toISOString().split("T")[0];
      const slot = { type: bulkType, date: formatted };
      if (bulkType !== "equipment") {
        slot.startTime = bulkStartTime;
        slot.endTime = bulkEndTime;
      }
      if (bulkType === "band") {
        if (!bulkBandId) return setMessage("❌ Band is required for band slots");
        slot.bandId = bulkBandId;
      }
      newSlots.push(slot);
    }

    setSlots([...slots, ...newSlots]);
    setMessage(`✅ ${newSlots.length} slots generated and added below`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/api/slots/create-multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slots }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Slots added successfully");
        setSlots([{ type: "equipment", date: "", startTime: "", endTime: "", bandId: "" }]);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-b from-gray-900 to-black">
      <aside className={`fixed z-40 inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out bg-gray-800 w-64 p-6 md:block`}>
        <h2 className="mb-8 text-2xl font-bold text-green-400">Sound Live</h2>
        <nav className="space-y-4">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link key={name} to={path} className={`flex items-center gap-2 py-2 px-4 rounded-lg ${isActive(path) ? "bg-green-600 text-white font-semibold" : "hover:bg-gray-700 text-gray-300"}`}>
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
          <button onClick={() => { localStorage.removeItem("adminToken"); localStorage.removeItem("admin"); navigate("/home"); }} className="flex items-center w-full gap-2 px-4 py-2 mt-8 text-left text-gray-300 rounded-lg hover:bg-red-600">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:ml-64">
        <button className="mb-4 text-white md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="mb-6 text-3xl font-bold text-green-400">Add Booking Slots</h2>

        <div className="p-4 mb-6 bg-gray-800 rounded-lg">
          <h3 className="mb-3 text-lg font-semibold">📅 Bulk Add Slots (Date Range)</h3>
          <div className="grid items-end gap-4 md:grid-cols-6">
            <select value={bulkType} onChange={(e) => setBulkType(e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded">
              <option value="equipment">Equipment</option>
              <option value="studio">Studio</option>
              <option value="band">Band</option>
            </select>

            <input type="date" value={bulkFrom} onChange={(e) => setBulkFrom(e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded" />
            <input type="date" value={bulkTo} onChange={(e) => setBulkTo(e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded" />

            {bulkType !== "equipment" && (
              <>
                <input type="time" value={bulkStartTime} onChange={(e) => setBulkStartTime(e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded" />
                <input type="time" value={bulkEndTime} onChange={(e) => setBulkEndTime(e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded" />
              </>
            )}

            {bulkType === "band" && (
              <select value={bulkBandId} onChange={(e) => setBulkBandId(e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded">
                <option value="">Select Band</option>
                {allBands.map((band) => (
                  <option key={band._id} value={band._id}>{band.name}</option>
                ))}
              </select>
            )}

            <button onClick={generateBulkSlots} className="px-4 py-2 text-sm font-semibold bg-blue-600 rounded hover:bg-blue-700 md:col-span-1">
              ➕ Generate Slots
            </button>
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {slots.map((slot, index) => (
              <div key={index} className="grid items-end gap-4 pb-4 border-b border-gray-700 md:grid-cols-5">
                <select value={slot.type} onChange={(e) => handleChange(index, "type", e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded">
                  <option value="equipment">Equipment</option>
                  <option value="studio">Studio</option>
                  <option value="band">Band</option>
                </select>

                <input type="date" value={slot.date} onChange={(e) => handleChange(index, "date", e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded" required />

                {(slot.type === "studio" || slot.type === "band") && (
                  <>
                    <input type="time" value={slot.startTime} onChange={(e) => handleChange(index, "startTime", e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded" required />
                    <input type="time" value={slot.endTime} onChange={(e) => handleChange(index, "endTime", e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded" required />
                  </>
                )}

                {slot.type === "band" && (
                  <select value={slot.bandId} onChange={(e) => handleChange(index, "bandId", e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded">
                    <option value="">Select Band</option>
                    {allBands.map((band) => (
                      <option key={band._id} value={band._id}>{band.name}</option>
                    ))}
                  </select>
                )}

                <button type="button" onClick={() => removeSlot(index)} className="px-3 py-2 mt-2 text-sm text-red-400 hover:text-red-600">
                  Remove
                </button>
              </div>
            ))}

            <div className="flex items-center gap-4">
              <button type="button" onClick={addSlot} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                ➕ Add More Slot
              </button>
              <button type="submit" className="px-6 py-2 font-semibold bg-green-600 rounded-lg hover:bg-green-700">
                Save All Slots
              </button>
            </div>

            {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddBookingSlot;