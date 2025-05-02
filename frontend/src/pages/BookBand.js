import React, { useEffect, useState } from "react";

const BookBand = () => {
  const [bands, setBands] = useState([]);
  const [form, setForm] = useState({
    bandId: "",
    eventDate: "",
    eventTime: "",
    location: "",
    hours: 1,
    phone: "",
    email: "",
  });

  const [price, setPrice] = useState(0);
  const clientUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bands/all");
        const data = await res.json();
        setBands(data);
      } catch (err) {
        console.error("Failed to fetch bands", err);
      }
    };

    fetchBands();

    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const selected = bands.find((b) => b._id === form.bandId);
    if (selected) {
      setPrice(selected.pricePerHour * form.hours);
    }
  }, [form.bandId, form.hours, bands]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!form.bandId || !form.eventDate || !form.eventTime || !form.location || form.hours <= 0 || !form.phone || !form.email) {
      alert("Please fill all fields correctly.");
      return;
    }

    const selectedBand = bands.find((b) => b._id === form.bandId);
    const orderId = "Band_" + Date.now();

    const payment = {
      sandbox: true,
      merchant_id: import.meta.env.PAYHERE_MERCHANT_ID,
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
      notify_url: "http://localhost:5000/api/payments/payhere-callback",
      order_id: orderId,
      items: `Band Booking: ${selectedBand.name}`,
      amount: price.toFixed(2),
      currency: "LKR",
      first_name: clientUser?.username || "Client",
      last_name: "User",
      email: form.email,
      phone: form.phone,
      address: form.location,
      city: "Colombo",
      country: "Sri Lanka",
    };

    window.payhere.onCompleted = async function (completedOrderId) {
      try {
        const res = await fetch("http://localhost:5000/api/bandBookings/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          },
          body: JSON.stringify({
            ...form,
            hours: parseFloat(form.hours),
            totalPrice: price,
            payhereOrderId: completedOrderId,
            clientId: clientUser?._id,
          }),
        });

        if (res.ok) alert("✅ Band booking saved!");
        else alert("❌ Failed to save booking.");
      } catch (err) {
        console.error(err);
        alert("❌ Error while saving booking.");
      }
    };

    window.payhere.onDismissed = () => alert("Payment dismissed.");
    window.payhere.onError = (e) => alert("Payment error: " + e);

    window.payhere.startPayment(payment);
  };

  return (
    <div className="min-h-screen px-4 py-8 pt-24 text-white bg-gradient-to-b from-gray-900 to-black md:px-8">
      <div className="max-w-3xl p-6 mx-auto bg-gray-800 rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center">Book a Band</h2>

        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <select name="bandId" value={form.bandId} onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-gray-600 rounded">
            <option value="">Select a Band</option>
            {bands.map((band) => (
              <option key={band._id} value={band._id}>
                {band.name} ({band.genre}) - Rs. {band.pricePerHour}/hr
              </option>
            ))}
          </select>

          <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />

          <input type="time" name="eventTime" value={form.eventTime} onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />

          <input type="text" name="location" placeholder="Event Location" value={form.location} onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />

          <input type="number" name="hours" placeholder="Hours" value={form.hours} onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />

          <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />

          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-gray-600 rounded" />
        </div>

        <div className="mb-4 text-lg text-right text-green-400">
          Total: Rs. {isNaN(price) ? "0" : price.toLocaleString()}
        </div>

        <div className="flex justify-center">
          <button onClick={handlePay}
            className="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
            Pay & Book Band
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookBand;
