import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

function StudioBooking() {
  usePageTitle("Studio Booking");
  const [form, setForm] = useState({
    eventType: "",
    eventDescription: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [payHereLoaded, setPayHereLoaded] = useState(false);
  const clientUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const hourlyRate = 2000;

  useEffect(() => {
  const script = document.createElement("script");
  script.src = "/payhere.js";
  script.async = true;
  script.onload = () => setPayHereLoaded(true);
  script.onerror = () => console.error("❌ Failed to load PayHere script");
  document.body.appendChild(script);

  return () => {

    document.body.removeChild(script);
  };
}, []);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/slots/studio");
        const data = await res.json();
        setAvailableSlots(data);
      } catch (err) {
        console.error("Failed to fetch studio slots", err);
      }
    };
    fetchSlots();
  }, []);

  useEffect(() => {
    const selectedSlot = availableSlots.find(
      (s) => s.date === form.date && `${s.startTime}-${s.endTime}` === form.time
    );
    if (selectedSlot) {
      const [startH, startM] = selectedSlot.startTime.split(":").map(Number);
      const [endH, endM] = selectedSlot.endTime.split(":").map(Number);
      const hours = (endH + endM / 60) - (startH + startM / 60);
      setTotalPrice(Math.ceil(hours) * hourlyRate);
    } else {
      setTotalPrice(0);
    }
  }, [form.date, form.time, availableSlots]);

  const uniqueDates = [...new Set(availableSlots.map((s) => s.date))];
  const timesForDate = availableSlots.filter((s) => s.date === form.date);

  const validateForm = () => {
    if (!form.eventType || !form.phone || !form.email || !form.date || !form.time) {
      alert("Please fill all required fields");
      return false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!clientUser || !localStorage.getItem("clientToken")) {
      alert("You must be logged in to book");
      return false;
    }

    return true;
  };

  const handlePay = async () => {
  if (!validateForm()) return;

  if (!payHereLoaded || typeof window.payhere === "undefined") {
    alert("PayHere payment system is not ready. Please wait a moment and try again.");
    return;
  }

  setIsLoading(true);

  try {
    const [startTime, endTime] = form.time.split("-");
    const [startH, startM] = startTime.trim().split(":").map(Number);
    const [endH, endM] = endTime.trim().split(":").map(Number);
    const duration = (endH + endM / 60) - (startH + startM / 60);

    // Create booking in backend
    const res = await fetch("http://localhost:5000/api/studioBookings/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
      },
      body: JSON.stringify({
        bandName: form.eventType,
        email: form.email,
        contactNumber: form.phone,
        date: form.date,
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        duration: Math.round(duration * 100) / 100,
        totalPrice,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Booking failed");

    const bookingId = data.booking._id;
    const payhereOrderId = data.booking.payhereOrderId;

    window.payhere.onCompleted = async function (orderId) {
      try {
        await fetch(`http://localhost:5000/api/studioBookings/confirm/${bookingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          },
          body: JSON.stringify({ paymentId: orderId }),
        });
        navigate(`/payment-success?bookingId=${bookingId}&bookingType=Studio`);
      } catch (err) {
        console.error("Confirmation failed:", err);
        alert("Payment succeeded, but confirmation failed. Please contact support.");
      }
    };

    window.payhere.onDismissed = function () {
      alert("Payment was cancelled. Your booking is still pending.");
    };

    window.payhere.onError = function (error) {
      console.error("Payment error:", error);
      alert(`Payment error: ${error}`);
    };

    // Start PayHere payment
    const payment = {
  sandbox: true,
  merchant_id: "1230386",
  return_url: "http://localhost:3000/payment-success",
  cancel_url: "http://localhost:3000/payment-cancel",
  notify_url: "http://localhost:5000/api/payments/payhere-callback",
  order_id: payhereOrderId,
  items: `Studio Booking for ${form.eventType}`,
  amount: totalPrice.toFixed(2),
  currency: "LKR",
  first_name: clientUser.username.split(" ")[0] || "Client",
  last_name: clientUser.username.split(" ")[1] || "User",
  email: form.email,
  phone: form.phone,
  address: "Studio Booking",
  city: "Colombo",
  country: "Sri Lanka",
  custom_1: bookingId,
  custom_2: "studio_booking",
};

    window.payhere.startPayment(payment);
  } catch (error) {
    console.error("Booking error:", error);
    alert(error.message || "An error occurred during booking");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen px-4 py-20 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl p-6 mx-auto bg-gray-800 rounded-xl">
        <h2 className="mb-6 text-3xl font-extrabold text-center text-green-400">
          Book Your Studio Session
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="Band Name *"
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value })}
              className="w-full p-3 text-white bg-gray-900 border border-green-500 rounded-md"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact Number *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 text-white bg-gray-900 border border-green-500 rounded-md"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 text-white bg-gray-900 border border-green-500 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <textarea
            placeholder="Event Description (Optional)"
            value={form.eventDescription}
            onChange={(e) => setForm({ ...form, eventDescription: e.target.value })}
            className="w-full p-3 text-white bg-gray-900 border border-green-500 rounded-md"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
          <div className="relative">
            <input
              value={form.date}
              readOnly
              placeholder="Select Date *"
              onClick={() => setShowDateDropdown((prev) => !prev)}
              className="w-full p-3 text-white bg-gray-900 border border-green-500 rounded-md cursor-pointer"
              required
            />
            {showDateDropdown && (
              <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-gray-800 border border-green-500 rounded shadow max-h-60">
                {uniqueDates.map((date, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setForm({ ...form, date, time: "" });
                      setShowDateDropdown(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-green-600"
                  >
                    {date}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative">
            <input
              value={form.time}
              readOnly
              placeholder={form.date ? "Select Time *" : "Please select date first"}
              onClick={() => form.date && setShowTimeDropdown((prev) => !prev)}
              disabled={!form.date}
              className={`w-full p-3 text-white bg-gray-900 border rounded-md cursor-pointer ${
                form.date ? "border-green-500" : "border-gray-600"
              }`}
              required
            />
            {showTimeDropdown && form.date && (
              <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-gray-800 border border-green-500 rounded shadow max-h-60">
                {timesForDate.map((slot, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setForm({ ...form, time: `${slot.startTime}-${slot.endTime}` });
                      setShowTimeDropdown(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-green-600"
                  >
                    {slot.startTime} to {slot.endTime}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            * Required fields
          </div>
          <div className="text-xl font-bold text-green-400">
            Total: Rs {totalPrice.toLocaleString()}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handlePay}
            disabled={isLoading || totalPrice === 0}
            className={`px-6 py-3 text-lg font-semibold text-white rounded-xl ${
              isLoading || totalPrice === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Processing..." : "Pay & Book Studio"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudioBooking;