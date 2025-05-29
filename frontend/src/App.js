import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages
import About from "./pages/About";
import Bands from "./pages/Bands";
import Blog from "./pages/Blog";
import BandBooking from "./pages/BookBand";
import BookingIntro from "./pages/BookingIntro";
import Login from "./pages/Client_Login";
import SignupPage from "./pages/Client_Signup";
import ClientProfile from "./pages/ClientProfile";
import Contact from "./pages/ContactUs";
import EquipmentRental from "./pages/EquipmentRental";
import ForgotPasswordPage from "./pages/ForgotPassword";
import Home from "./pages/Home";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentSuccess from "./pages/PaymentSuccess";
import Projects from "./pages/Projects";
import ResetPassword from "./pages/ResetPassword";
import Services from "./pages/Services";
import StudioBooking from "./pages/StudioBooking";
import Unsubscribe from "./pages/Unsubscribe";


// Admin Pages
import AddBookingSlot from "./pages/admin/AddBookingSlot";
import AdminDashboard from "./pages/admin/admindashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Admins from "./pages/admin/Admins";
import AdminSubscribers from "./pages/admin/AdminSubscribers";
import AllBands from "./pages/admin/AllBands";
import BandBookingList from "./pages/admin/BandBookingList";
import BlogManage from "./pages/admin/BlogManage";
import ClientMessagesList from "./pages/admin/ClientMessages";
import CreateBand from "./pages/admin/CreateBand";
import EquipmentBooking from "./pages/admin/EquipmentBookings";
import EventList from "./pages/admin/EventList";
import StudioBookingList from "./pages/admin/StudioBookingList";
import Users from "./pages/admin/Users";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const scriptId = "tawkScript";
    const existingScript = document.getElementById(scriptId);
    const isAdmin = location.pathname.startsWith("/admin");

    if (isAdmin) {
    document.body.classList.add("admin-page");
  } else {
    document.body.classList.remove("admin-page");
  }

    if (isAdmin) {
      if (existingScript) existingScript.remove();

      const tawkIframe = document.querySelector("iframe[src*='tawk.to']");
      if (tawkIframe && tawkIframe.parentNode) {
        tawkIframe.parentNode.remove();
      }

      const tawkContainer = document.getElementById("tawkchat-container");
      if (tawkContainer) {
        tawkContainer.remove();
      }

      return;
    }

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://embed.tawk.to/68146ff4fc50e9190eb82e49/1iq7talln";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/bookingintro" element={<BookingIntro />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookingstudios" element={<StudioBooking />} />
          <Route path="/equipment-rental" element={<EquipmentRental />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/bandbooking" element={<BandBooking />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />

          <Route
            path="/client/profile"
            element={
              localStorage.getItem('clientToken') ? <ClientProfile /> : <Login />
            }
          />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/eventlist" element={<EventList />} />
          <Route path="/admin/admins" element={<Admins />} />
          <Route path="/admin/studiobookings" element={<StudioBookingList />} />
          <Route path="/admin/equipmentbookings" element={<EquipmentBooking />} />
          <Route path="/admin/clientmessages" element={<ClientMessagesList />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/createband" element={<CreateBand />} />
          <Route path="/admin/bandbookings" element={<BandBookingList />} />
          <Route path="/admin/allbands" element={<AllBands />} />
          <Route path="/admin/addbookingslot" element={<AddBookingSlot />} />
          <Route path="/admin/blogmanage" element={<BlogManage />} />
          <Route path="/admin/AdminSubscribers" element={<AdminSubscribers />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
       <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
