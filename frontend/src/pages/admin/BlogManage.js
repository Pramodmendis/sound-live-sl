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
  Users as UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const BlogManage = () => {
  usePageTitle("Blog Management");
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    isFeatured: false,
    isTrending: false,
    thumbnail: "",
  });

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Studio Bookings", path: "/admin/StudioBookings", icon: CalendarClock },
    { name: "Equipment Bookings", path: "/admin/EquipmentBookings", icon: MonitorSpeaker },
    { name: "Band Bookings", path: "/admin/BandBookings", icon: Music },
    { name: "Add Booking Slot", path: "/admin/AddBookingSlot", icon: CalendarClock },
    { name: "All Bands", path: "/admin/AllBands", icon: Music },
    { name: "Users", path: "/admin/Users", icon: UsersIcon },
    { name: "Admins", path: "/admin/Admins", icon: UserPlus },
    { name: "Client Messages", path: "/admin/ClientMessages", icon: Mail },
    { name: "Blog Management", path: "/admin/BlogManage", icon: BarChart },
    { name: "Subscribers", path: "/admin/AdminSubscribers", icon: UsersIcon },
  ];

  const isActive = (path) => location.pathname === path;

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "thumbnail" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, thumbnail: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = editingId
      ? `http://localhost:5000/api/blogs/${editingId}`
      : "http://localhost:5000/api/blogs/create";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        title: "",
        content: "",
        category: "",
        isFeatured: false,
        isTrending: false,
        thumbnail: "",
      });
      setEditingId(null);
      fetchBlogs();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    await fetch(`http://localhost:5000/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      isFeatured: blog.isFeatured,
      isTrending: blog.isTrending,
      thumbnail: blog.thumbnail || "",
    });
    setEditingId(blog._id);
  };

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

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        <button
          className="mb-4 text-white md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="mb-6 text-3xl font-bold text-green-400">📝 Blog Management</h2>

        {/* Blog Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 mb-10 space-y-5 bg-gray-800 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Blog Title"
            required
            className="w-full p-3 text-sm text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleInputChange}
            placeholder="Write your content here..."
            rows={6}
            required
            className="w-full p-3 text-sm text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleInputChange}
            placeholder="Category (e.g. Lighting, Sound, Tips)"
            className="w-full p-3 text-sm text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 text-sm text-gray-200">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleInputChange}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-200">
              <input
                type="checkbox"
                name="isTrending"
                checked={form.isTrending}
                onChange={handleInputChange}
              />
              Trending
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="thumbnail"
              onChange={handleInputChange}
              className="text-sm text-gray-300 file:bg-gray-600 file:text-white file:rounded file:border-0 file:px-4 file:py-2 file:mr-4 hover:file:bg-green-600"
            />
            {form.thumbnail && (
              <img
                src={form.thumbnail}
                alt="Preview"
                className="object-cover w-40 h-24 mt-2 border border-gray-500 rounded"
              />
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-black transition bg-green-400 rounded-md hover:bg-green-500"
          >
            {editingId ? "✏️ Update Blog" : "➕ Add Blog"}
          </button>
        </form>

        {/* Blog List */}
        <div className="grid gap-4 md:grid-cols-2">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-2">
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt="Thumb"
                    className="object-cover w-16 h-16 border border-gray-600 rounded"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-green-300">{blog.title}</h3>
                  <p className="text-sm text-gray-400">📁 {blog.category}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">{blog.content.slice(0, 120)}...</p>
              <div className="mt-3 space-x-3 text-sm text-gray-400">
                {blog.isFeatured && <span className="text-yellow-400">⭐ Featured</span>}
                {blog.isTrending && <span className="text-pink-400">🔥 Trending</span>}
              </div>
              <div className="mt-4 space-x-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-blue-400 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-400 hover:underline"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogManage;
