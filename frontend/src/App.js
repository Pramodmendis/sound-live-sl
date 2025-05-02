
import React from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
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
import PaymentSuccess from "./pages/PaymentSuccess";
import Projects from "./pages/Projects";
import ResetPassword from "./pages/ResetPassword";
import Services from "./pages/Services";
import StudioBooking from "./pages/StudioBooking";

// Admin Pages
import AdminDashboard from "./pages/admin/admindashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Admins from "./pages/admin/Admins";
import AllBands from "./pages/admin/AllBands";
import BandBookingList from "./pages/admin/BandBookingList";
import ClientMessagesList from "./pages/admin/ClientMessages";
import CreateBand from "./pages/admin/CreateBand";
import EquipmentBooking from "./pages/admin/EquipmentBookings";
import EventList from "./pages/admin/EventList";
import StudioBookingList from "./pages/admin/StudioBookingList";
import Users from "./pages/admin/Users";


function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hide Navbar on Admin pages */}
      {!isAdminRoute && <Navbar />}

      {/* Page Content */}
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
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/bandbooking" element={<BandBooking />} />
          <Route path="/bands" element={<Bands />} />

          {/* Client Profile */}
          <Route
  path="/client/profile"
  element={
    localStorage.getItem('clientToken') ? <ClientProfile /> : <Login />
  }
/>

          {/* Admin Routes */}
          <Route index element={<AdminDashboard />} />
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

          {/* 404 Page */}

        </Routes>
      </main>

      {/* Hide Footer on Admin pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
      <Router>
        <Layout />
      </Router>
  );
}

export default App;
