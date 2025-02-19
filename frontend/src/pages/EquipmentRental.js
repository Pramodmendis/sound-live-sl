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

  const toggleEquipment = (item) => {
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const labourCost = selectedEquipment.length * 1800;
  const transportCost = selectedEquipment.length > 0 ? 5000 : 0;
  const equipmentTotal = selectedEquipment.reduce((sum, item) => sum + item.price, 0);
  const totalCost = equipmentTotal + labourCost + transportCost;

  const handleBooking = () => {
    if (!eventType || !eventLocation || !eventDescription) {
      alert("Please fill in all event details before booking.");
      return;
    }

    if (selectedEquipment.length === 0) {
      alert("Please select at least one item before booking.");
      return;
    }

    alert(`Booking confirmed for ${eventType} at ${eventLocation}!\nTotal cost: Rs. ${totalCost.toLocaleString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Equipment Rental (Sri Lanka 🇱🇰)</h2>

      {/* Event Details Form */}
      <div className="mb-6 p-4 bg-white rounded-lg border">
        <h3 className="text-lg font-bold text-black mb-3">Event Details</h3>
        <input
          type="text"
          placeholder="Event Type (e.g. Wedding, Concert)"
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
          placeholder="Brief Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="w-full border p-2 rounded-lg"
          rows="3"
        />
      </div>

      {/* Equipment Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipmentCategories.map((category, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border">
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
      </div>

      {/* Selected Items */}
      <div className="mt-6 p-4 bg-white rounded-lg border">
        <h3 className="text-lg font-bold text-black">Selected Equipment</h3>
        {selectedEquipment.length > 0 ? (
          <ul className="list-disc ml-6 mt-2 text-black">
            {selectedEquipment.map((item) => (
              <li key={item.id}>{item.name} - Rs. {item.price.toLocaleString()}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No equipment selected.</p>
        )}
      </div>

      {/* Cost Breakdown */}
      <div className="mt-6 p-4 bg-white rounded-lg border">
        <h3 className="text-lg font-bold text-black">Cost Breakdown</h3>
        <p className="text-black mt-2">Equipment Total: <strong>Rs. {equipmentTotal.toLocaleString()}</strong></p>
        <p className="text-black">Labour Cost: <strong>Rs. {labourCost.toLocaleString()}</strong></p>
        <p className="text-black">Transport Cost: <strong>Rs. {transportCost.toLocaleString()}</strong></p>
      </div>

      {/* Total Cost */}
      <div className="p-4 mt-6 bg-white rounded-lg text-center border">
        <h3 className="text-xl font-bold text-black">Total Cost: Rs. {totalCost.toLocaleString()}</h3>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
      >
        Book Now
      </button>
    </div>
  );
};

export default EquipmentRental;
