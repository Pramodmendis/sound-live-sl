import React, { useEffect, useState } from "react";

const StudioBooking = () => {
  const [form, setForm] = useState({
    bandName: "",
    email: "",
    contactNumber: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [duration, setDuration] = useState(0);
  const [total, setTotal] = useState(0);

  const clientUser = JSON.parse(localStorage.getItem("user") || "null");
  const hourlyRate = 2000;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (form.startTime && form.endTime) {
      const start = new Date(`2000-01-01T${form.startTime}`);
      const end = new Date(`2000-01-01T${form.endTime}`);
      const diff = (end - start) / (1000 * 60 * 60);
      const hours = diff > 0 ? diff : 0;
      setDuration(hours);
      setTotal(hours * hourlyRate);
    }
  }, [form.startTime, form.endTime]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayHere = () => {
    if (!form.bandName || !form.email || !form.contactNumber || !form.date || !form.startTime || !form.endTime) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (duration <= 0) {
      alert("End time must be after start time.");
      return;
    }
  
    if (!clientUser || !localStorage.getItem("clientToken")) {
      alert("⚠️ You must be logged in to book.");
      return;
    }

    const orderId = "Studio_" + Date.now();

    const payment = {
      sandbox: true,
      merchant_id: "1211149",
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
      notify_url: "http://localhost:5000/api/payments/payhere-callback",

      order_id: orderId,
      items: "Studio Booking",
      amount: total.toFixed(2),
      currency: "LKR",
      first_name: clientUser.username,
      last_name: "Client",
      email: clientUser.email,
      phone: "0771234567",
      address: "Colombo",
      city: "Colombo",
      country: "Sri Lanka",
    };

    window.payhere.onCompleted = async function (completedOrderId) {
      try {
        const res = await fetch("http://localhost:5000/api/studioBookings/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          },
          body: JSON.stringify({
            ...form,
            duration,
            totalPrice: total,
            payhereOrderId: completedOrderId,
            paymentMethod: "payhere",
            paymentType: "full",
          }),
        });

        if (res.ok) alert("✅ Studio booking successful!");
        else alert("❌ Failed to save booking.");
      } catch (err) {
        console.error(err);
        alert("❌ Booking error occurred.");
      }
    };

    window.payhere.onDismissed = () => alert("Payment dismissed.");
    window.payhere.onError = (e) => alert("Payment error: " + e);

    window.payhere.startPayment(payment);
  };

  return (
    <div className="min-h-screen px-4 py-8 pt-24 text-white bg-gradient-to-b from-gray-900 to-black md:px-8">
      <div className="max-w-2xl p-6 mx-auto bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center">Studio Booking</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input type="text" name="bandName" placeholder="Band Name" value={form.bandName} onChange={handleChange} className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />
          <input type="text" name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />
        </div>

        <div className="mt-6 text-lg font-semibold text-right text-green-400">
          Duration: {duration} hour(s) <br />
          Total: Rs. {total.toLocaleString()}
        </div>

        <div className="flex justify-center mt-6">
          <button onClick={handlePayHere} className="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
            Pay & Book Studio
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioBooking;
