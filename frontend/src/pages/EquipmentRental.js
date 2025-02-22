import React, { useState } from "react";

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


const EquipmentRental = () => {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "", name: "" });
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [paymentType, setPaymentType] = useState("full");

  const toggleEquipment = (item) => {
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const totalCost = selectedEquipment.reduce((sum, item) => sum + item.price, 0);
  const finalCost = paymentType === "advance" ? totalCost * 0.5 : totalCost;

  const handleBooking = () => {
    if (!eventType || !eventLocation || !eventDescription) {
      alert("Please fill in all event details before booking.");
      return;
    }
    if (selectedEquipment.length === 0) {
      alert("Please select at least one item before booking.");
      return;
    }
    if (paymentMethod === "cash" && !paymentReceipt) {
      alert("Please upload the payment receipt.");
      return;
    }

    console.log("Booking Details:", {
      eventType,
      eventLocation,
      eventDescription,
      selectedEquipment,
      totalCost,
      finalCost,
      paymentMethod,
      cardDetails,
      paymentReceipt,
    });

    alert(`Booking confirmed! Total cost: Rs. ${finalCost.toLocaleString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Equipment Rental</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Event Type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full border p-2 rounded-lg mb-3"
        />
        <input
          type="text"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          className="w-full border p-2 rounded-lg mb-3"
        />
        <textarea
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="w-full border p-2 rounded-lg"
          rows="3"
        />
      </div>

      {equipmentCategories.map((category, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border mb-4">
          <h3 className="text-lg font-bold mb-2 text-black">{category.category}</h3>
          {category.items.map((item) => (
            <label key={item.id} className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                onChange={() => toggleEquipment(item)}
                checked={selectedEquipment.includes(item)}
                className="form-checkbox text-blue-600"
              />
              <span className="text-black">{item.name} - Rs. {item.price.toLocaleString()}</span>
            </label>
          ))}
        </div>
      ))}

      <div className="mt-6">
        <h3 className="text-lg font-bold">Payment Method</h3>
        <select className="border p-2 w-full rounded-lg mb-3" onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">Select Payment Method</option>
          <option value="card">Credit/Debit Card</option>
          <option value="cash">Cash Deposit</option>
        </select>

        {paymentMethod === "card" && (
          <div>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full border p-2 rounded-lg mb-2"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="w-full border p-2 rounded-lg mb-2"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full border p-2 rounded-lg mb-2"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full border p-2 rounded-lg mb-2"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            />
          </div>
        )}

        {paymentMethod === "cash" && (
          <input
            type="file"
            className="w-full border p-2 rounded-lg mb-2"
            onChange={(e) => setPaymentReceipt(e.target.files[0])}
          />
        )}

        <select className="border p-2 w-full rounded-lg mb-3" onChange={(e) => setPaymentType(e.target.value)}>
          <option value="full">Full Payment</option>
          <option value="advance">Advance Payment (50%)</option>
        </select>
      </div>

      <button onClick={handleBooking} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-4">
        Book Now
      </button>
    </div>
  );
};

export default EquipmentRental;
