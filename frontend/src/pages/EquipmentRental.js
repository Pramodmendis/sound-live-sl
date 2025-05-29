import { useEffect, useState } from "react";
import usePageTitle from "../hooks/usePageTitle";

const EquipmentRental = () => {
  usePageTitle("Equipment Rental Booking");
  const [form, setForm] = useState({
    eventType: "",
    eventLocation: "",
    eventDescription: "",
    selectedEquipment: [],
    phone: "",
    email: "",
    date: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const clientUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sandbox.payhere.lk/pay/checkout";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/slots/equipment");
        const data = await res.json();
        setAvailableSlots(data);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      }
    };
    fetchSlots();
  }, []);

  const handleCheckboxChange = (item) => {
    setForm((prev) => {
      const updated = prev.selectedEquipment.some((i) => i.id === item.id)
        ? prev.selectedEquipment.filter((i) => i.id !== item.id)
        : [...prev.selectedEquipment, item];
      return { ...prev, selectedEquipment: updated };
    });
  };

  useEffect(() => {
    const total = form.selectedEquipment.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [form.selectedEquipment]);

  const handlePay = async () => {
  if (!form.eventType || !form.eventLocation || !form.phone || !form.email || !form.date || form.selectedEquipment.length === 0) {
    alert("Please fill all fields and select equipment.");
    return;
  }

  if (!clientUser || !localStorage.getItem("clientToken")) {
    alert("You must be logged in to book equipment.");
    return;
  }

  // Save booking
  const res = await fetch("http://localhost:5000/api/equipment-bookings/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
    },
    body: JSON.stringify({ ...form, totalPrice }),
  });

  const data = await res.json();
  if (!res.ok || !data.booking || !data.booking._id) {
    alert(data.message || "Booking failed");
    return;
  }

  const booking = data.booking;

  const paymentPayload = {
  sandbox: true,
  merchant_id: "1230386",
  return_url: "http://localhost:3000/payment-success?bookingType=Equipment",
  cancel_url: "http://localhost:3000/payment-cancelled",
  notify_url: "http://localhost:5000/api/payments/payhere-callback",
  order_id: `Equipment_${booking._id}`,
  items: "Equipment Rental",
  amount: totalPrice,
  currency: "LKR",
  first_name: clientUser?.username?.split(" ")[0] || "User",
  last_name: clientUser?.username?.split(" ")[1] || "",
  email: form.email,
  phone: form.phone,
  address: "Colombo, Sri Lanka",
  city: "Colombo",
  country: "Sri Lanka",
};

  console.log("🎯 Sending to PayHere:", paymentPayload);

  const paymentRes = await fetch("http://localhost:5000/api/equipment-bookings/equipment/initiate-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
    },
    body: JSON.stringify(paymentPayload),
  });

  const paymentData = await paymentRes.json();

  if (!window.payhere || typeof window.payhere.startPayment !== "function") {
    alert("PayHere is not loaded. Please refresh and try again.");
    return;
  }

  if (paymentRes.ok && paymentData.payload) {
    window.payhere.onCompleted = async function () {
      await fetch(`http://localhost:5000/api/equipment-bookings/confirm/${booking._id}`, {
        method: "PATCH",
      });
      window.location.href = `/payment-success?bookingId=${booking._id}&bookingType=Equipment`;
    };

    window.payhere.onDismissed = function () {
      alert("Payment dismissed.");
    };

    window.payhere.onError = function (error) {
      alert("Payment error: " + error);
    };

    window.payhere.startPayment(paymentData.payload);
  } else {
    alert(paymentData.message || "Unable to initialize payment.");
  }
};

  const equipmentCategories = [
  {
    category: "🎤 Sound System (Line Arrays & PA)",
    items: [
      { id: 1, name: "JBL VRX Line Array (per side)", price: 95000 },
      { id: 2, name: "Yamaha CL5 Digital Mixer", price: 120000 },
      { id: 3, name: "Shure Wireless Microphones (set of 2)", price: 18000 },
      { id: 4, name: "Stage Monitors (Yamaha/RCF) – per unit", price: 14000 },
      { id: 5, name: "Subwoofers (Dual 18”) – per unit", price: 30000 },
      { id: 6, name: "Drum Mic Kit (7-piece)", price: 25000 },
      { id: 7, name: "Audio Multicore Snake (24 channel)", price: 20000 },
    ],
  },
  {
    category: "💡 Stage Lighting (DMX Controlled)",
    items: [
      { id: 8, name: "Moving Head Beam Lights (per unit)", price: 22000 },
      { id: 9, name: "LED Par Can Lights (RGBW) – 8 pack", price: 28000 },
      { id: 10, name: "DMX Lighting Controller (Avolites/Pearl)", price: 55000 },
      { id: 11, name: "Fog Machine (with fluid)", price: 12000 },
      { id: 12, name: "Stage Truss Lighting Frame (10ft)", price: 40000 },
      { id: 13, name: "Follow Spot Light", price: 30000 },
    ],
  },
  {
    category: "📺 LED Walls & Visuals",
    items: [
      { id: 14, name: "P3 LED Wall – 10ft x 6ft", price: 160000 },
      { id: 15, name: "P3 LED Wall – 12ft x 9ft", price: 200000 },
      { id: 16, name: "HD Projector with 10ft Screen", price: 75000 },
      { id: 17, name: "Video Switcher (ATEM Mini Pro)", price: 45000 },
      { id: 18, name: "Media Server (Resolume Arena)", price: 90000 },
    ],
  },
  {
    category: "🎸 Backline & Acoustic Gear",
    items: [
      { id: 19, name: "Yamaha Stage Custom Drum Kit (5-piece + hardware)", price: 35000 },
      { id: 20, name: "Bass Guitar Amp (Ampeg/Markbass)", price: 25000 },
      { id: 21, name: "Guitar Amp (Marshall/Fender)", price: 20000 },
      { id: 22, name: "Keyboard (Yamaha MX88 / Roland XPS-10)", price: 30000 },
      { id: 23, name: "DJ Console (Pioneer DDJ Series)", price: 50000 },
    ],
  },
  {
    category: "🔌 Power & Stage Infrastructure",
    items: [
      { id: 24, name: "Silent Generator (40kVA)", price: 85000 },
      { id: 25, name: "Power Distribution Board", price: 20000 },
      { id: 26, name: "Stage Risers – 8x4ft (per panel)", price: 18000 },
      { id: 27, name: "Backdrop & Branding Frame (10ft)", price: 25000 },
      { id: 28, name: "Truss Arch (Aluminium) – 12ft", price: 35000 },
    ],
  },
];


  return (
    <div className="min-h-screen px-4 py-8 pt-24 text-white bg-gradient-to-b from-gray-900 to-black md:px-8">
      <div className="max-w-5xl p-8 mx-auto shadow-xl rounded-xl bg-gradient-to-b from-gray-800 to-gray-900">
        <h2 className="mb-6 text-4xl font-extrabold tracking-wide text-center text-green-400 drop-shadow-md">
          Equipment Rental Booking
        </h2>

        <div className="mb-6">
          <label className="block mb-1 text-sm text-white">Select Booking Date</label>
          <select
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 text-white bg-gray-900 border border-green-600 rounded-md"
          >
            <option value="">-- Select a Date --</option>
            {[...new Set(availableSlots.map((s) => s.date))].map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          <input type="text" placeholder="Event Type" value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            className="w-full p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"/>
          <input type="text" placeholder="Event Location" value={form.eventLocation}
            onChange={(e) => setForm({ ...form, eventLocation: e.target.value })}
            className="w-full p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"/>
          <input type="text" placeholder="Contact Number" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"/>
          <input type="email" placeholder="Email Address" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"/>
          <textarea placeholder="Event Description" value={form.eventDescription}
            onChange={(e) => setForm({ ...form, eventDescription: e.target.value })}
            className="col-span-1 p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md md:col-span-2"/>
        </div>

        {equipmentCategories.map((category) => (
          <div key={category.category} className="mb-8">
            <h3 className="mb-3 text-xl font-semibold text-green-400">{category.category}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {category.items.map((item) => (
                <label key={item.id} className="flex items-center p-3 space-x-3 transition bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 hover:shadow-lg">
                  <input type="checkbox" className="accent-green-500"
                    checked={form.selectedEquipment.some((i) => i.id === item.id)}
                    onChange={() => handleCheckboxChange(item)} />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-sm text-green-300">Rs {item.price.toLocaleString()}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-10 mb-6 text-2xl font-bold text-right text-green-400">
          Total: Rs {totalPrice.toLocaleString()}
        </div>

        <div className="flex justify-center">
          <button onClick={handlePay}
            className="px-8 py-3 text-lg font-semibold text-white transition bg-green-600 rounded-xl hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400">
            Pay & Book Equipment
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentRental;
