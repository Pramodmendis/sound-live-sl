import { useEffect, useState } from "react";

const equipmentCategories = [
  {
    category: "Sound System",
    items: [
      { id: 1, name: "Microphones (Wired/Wireless)", price: 1800 },
      { id: 2, name: "Mixing Console (Digital/Analog)", price: 75000 },
      { id: 3, name: "Speakers (Main, Subs, Monitors)", price: 110000 },
      { id: 4, name: "Amplifiers", price: 55000 },
      { id: 5, name: "Audio Processors (EQ, Compressors)", price: 35000 },
      { id: 6, name: "Stage Monitors", price: 45000 },
      { id: 7, name: "In-Ear Monitors (IEMs)", price: 65000 },
      { id: 8, name: "Cables & Connectors (XLR, TRS)", price: 11000 },
      { id: 9, name: "DI Boxes (for instruments)", price: 20000 },
    ],
  },
  {
    category: "Stage Lighting",
    items: [
      { id: 10, name: "Spotlights", price: 55000 },
      { id: 11, name: "LED Par Cans", price: 35000 },
      { id: 12, name: "Moving Head Lights", price: 88000 },
      { id: 13, name: "Strobe Lights", price: 28000 },
      { id: 14, name: "Fog Machines", price: 32000 },
      { id: 15, name: "DMX Controllers", price: 42000 },
      { id: 16, name: "Follow Spots", price: 60000 },
    ],
  },
  {
    category: "LED Walls & Visual Effects",
    items: [
      { id: 17, name: "LED Wall Panels", price: 180000 },
      { id: 18, name: "Projectors & Screens", price: 110000 },
      { id: 19, name: "Media Servers", price: 130000 },
      { id: 20, name: "Video Switchers", price: 80000 },
      { id: 21, name: "Cameras & Live Feed Equipment", price: 145000 },
    ],
  },
  {
    category: "Stage & Rigging",
    items: [
      { id: 22, name: "Portable Stage Platforms", price: 220000 },
      { id: 23, name: "Trusses & Rigging Systems", price: 170000 },
      { id: 24, name: "Backdrop & Banners", price: 75000 },
      { id: 25, name: "Stage Skirting", price: 35000 },
    ],
  },
  {
    category: "Power & Safety Equipment",
    items: [
      { id: 26, name: "Generators & Power Distribution", price: 180000 },
      { id: 27, name: "Uninterruptible Power Supply (UPS)", price: 90000 },
      { id: 28, name: "Extension Cords & Surge Protectors", price: 28000 },
      { id: 29, name: "Weatherproof Covers & Tents", price: 50000 },
    ],
  },
  {
    category: "Miscellaneous Essentials",
    items: [
      { id: 30, name: "Instrument Stands", price: 18000 },
      { id: 31, name: "Road Cases", price: 35000 },
      { id: 32, name: "Communication System", price: 65000 },
    ],
  },

];

function EquipmentRental() {
  const [form, setForm] = useState({
    eventType: "",
    eventLocation: "",
    eventDescription: "",
    selectedEquipment: [],
  });

  const clientUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCheckboxChange = (item) => {
    setForm((prev) => {
      const updated = prev.selectedEquipment.some((i) => i.id === item.id)
        ? prev.selectedEquipment.filter((i) => i.id !== item.id)
        : [...prev.selectedEquipment, item];
      return { ...prev, selectedEquipment: updated };
    });
  };

  const calculateTotal = () => {
    return form.selectedEquipment.reduce((sum, item) => sum + item.price, 0);
  };

  const handlePayHere = () => {
    const orderId = "Equipment_" + Date.now();
    const totalAmount = calculateTotal();

    if (totalAmount === 0) {
      alert("Please select at least one equipment item.");
      return;
    }

    const payment = {
      sandbox: true,
      merchant_id: "4OVxzCfLv8q4JFnJVGYa9b3HB",
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
      notify_url: "http://localhost:5000/api/payments/payhere-callback",

      order_id: orderId,
      items: "Equipment Booking",
      amount: totalAmount.toFixed(2),
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
        const res = await fetch("http://localhost:5000/api/equipmentBookings/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          },
          body: JSON.stringify({
            ...form,
            paymentMethod: "payhere",
            paymentType: "full",
            payhereOrderId: completedOrderId,
          }),
        });

        if (res.ok) alert("\u2705 Booking successful after payment!");
        else alert("\u274C Booking failed.");
      } catch (err) {
        console.error(err);
        alert("\u274C Booking error.");
      }
    };

    window.payhere.onDismissed = function () {
      alert("Payment dismissed by user.");
    };

    window.payhere.onError = function (error) {
      alert("Payment error: " + error);
    };

    window.payhere.startPayment(payment);
  };

  return (
    <div className="min-h-screen px-4 py-8 pt-24 text-white bg-gradient-to-b from-gray-900 to-black md:px-8">
      <div className="max-w-5xl p-8 mx-auto rounded-lg shadow-lg bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold tracking-wide text-white">Equipment Rental Booking</h2>
          <p className="mt-2 text-gray-300">Fill in the event details and select your equipment below.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <input
            type="text"
            placeholder="Event Type"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            className="w-full p-3 text-white bg-gray-900 border border-gray-500 rounded-md"
          />
          <input
            type="text"
            placeholder="Event Location"
            value={form.eventLocation}
            onChange={(e) => setForm({ ...form, eventLocation: e.target.value })}
            className="w-full p-3 text-white bg-gray-900 border border-gray-500 rounded-md"
          />
          <textarea
            placeholder="Event Description"
            value={form.eventDescription}
            onChange={(e) => setForm({ ...form, eventDescription: e.target.value })}
            className="col-span-1 p-3 text-white bg-gray-900 border border-gray-500 rounded-md md:col-span-2"
          />
        </div>

        {equipmentCategories.map((category) => (
          <div key={category.category} className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-white">{category.category}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {category.items.map((item) => (
                <label key={item.id} className="flex items-center p-3 space-x-2 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700">
                  <input
                    type="checkbox"
                    className="accent-green-500"
                    checked={form.selectedEquipment.some((i) => i.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  <span className="flex-1 text-white">{item.name}</span>
                  <span className="text-sm text-gray-300">Rs {item.price.toLocaleString()}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 mb-4 text-xl font-bold text-right text-green-400">
          Total: Rs {calculateTotal().toLocaleString()}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePayHere}
            className="px-8 py-3 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Pay & Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentRental;