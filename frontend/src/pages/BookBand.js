import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const BookBand = () => {
  usePageTitle("Book a Band");
  const [bands, setBands] = useState([]);
  const [eventType, setEventType] = useState("Indoor");
  const [form, setForm] = useState({
    bandId: "",
    eventDate: "",
    eventTime: "",
    location: "",
    hours: 1,
    phone: "",
    email: "",
  });

  const [selectedBand, setSelectedBand] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotMap, setSlotMap] = useState({});
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lockedBandId = searchParams.get("bandId");

  const clientUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bands/all");
        const data = await res.json();
        setBands(data);

        if (lockedBandId) {
          const lockedBand = data.find((b) => b._id === lockedBandId);
          if (lockedBand) {
            setSelectedBand(lockedBand);
            setForm((prev) => ({ ...prev, bandId: lockedBand._id }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch bands", err);
      }
    };

    fetchBands();
  }, [lockedBandId]);

  useEffect(() => {
    const selected = bands.find((b) => b._id === form.bandId);
    if (selected) {
      const rate =
        eventType === "Indoor" ? selected.priceIndoor : selected.priceOutdoor;
      setPrice(rate * form.hours);
    }
  }, [form.bandId, form.hours, eventType, bands]);

  useEffect(() => {
    const fetchBandSlots = async () => {
      if (!form.bandId) return;

      try {
        const res = await fetch(`http://localhost:5000/api/slots/get-band-slots/${form.bandId}`);
        const data = await res.json();

        const grouped = {};
        data.forEach((slot) => {
          if (!slot.date || !slot.startTime || !slot.endTime) return;
          if (!grouped[slot.date]) grouped[slot.date] = [];
          grouped[slot.date].push(`${slot.startTime} - ${slot.endTime}`);
        });

        setSlotMap(grouped);
        setAvailableDates(Object.keys(grouped));
      } catch (err) {
        console.error("Failed to fetch band slots", err);
      }
    };

    fetchBandSlots();
  }, [form.bandId]);

  useEffect(() => {
    if (form.eventDate && slotMap[form.eventDate]) {
      setAvailableSlots(slotMap[form.eventDate]);
    } else {
      setAvailableSlots([]);
    }
  }, [form.eventDate, slotMap]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (
      !form.bandId ||
      !form.eventDate ||
      !form.eventTime ||
      !form.location ||
      form.hours <= 0 ||
      !form.phone ||
      !form.email
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    const validTime = slotMap[form.eventDate]?.includes(form.eventTime);
    if (!validTime) {
      alert("Please select a valid time for the selected date.");
      return;
    }

    if (!clientUser || !clientUser.username) {
      alert("You must be logged in to book a band.");
      return;
    }

    const selectedBand = bands.find((b) => b._id === form.bandId);
    const orderId = "Band_" + Date.now();

    const res = await fetch("http://localhost:5000/api/bandBookings/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
      },
      body: JSON.stringify({
        bandId: form.bandId,
        eventDate: form.eventDate,
        eventTime: form.eventTime,
        location: form.location,
        hours: form.hours,
        phone: form.phone,
        email: form.email,
        totalPrice: price,
      }),
    });

    const data = await res.json();

    const paymentDetails = {
      sandbox: true,
      merchant_id: "1230386",
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

    if (!window.payhere) {
      alert("PayHere is not initialized.");
      return;
    }

    window.payhere.onCompleted = async function () {
      await fetch(
        `http://localhost:5000/api/bandBookings/confirm/${data.booking._id}`,
        { method: "PATCH" }
      );
      navigate(`/payment-success?bookingId=${data.booking._id}&bookingType=Band`);
    };

    window.payhere.onDismissed = () => alert("Payment dismissed.");
    window.payhere.onError = (e) => alert("Payment error: " + e);

    window.payhere.startPayment(paymentDetails);
  };

  return (
    <div className="min-h-screen px-4 py-24 text-white bg-gradient-to-b from-gray-900 to-black md:px-8">
      <div className="max-w-3xl p-8 mx-auto shadow-xl rounded-xl bg-gradient-to-b from-gray-800 to-gray-900">
        <h2 className="mb-8 text-4xl font-extrabold text-center text-green-400 drop-shadow">
          Book a Band
        </h2>

        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          {!selectedBand ? (
            <select
              name="bandId"
              value={form.bandId}
              onChange={(e) => {
                handleChange(e);
                const band = bands.find((b) => b._id === e.target.value);
                if (band) setSelectedBand(band);
              }}
              className="p-3 text-white bg-gray-900 border border-green-600 rounded-md"
            >
              <option value="">Select a Band</option>
              {bands.map((band) => (
                <option key={band._id} value={band._id}>
                  {band.name}
                </option>
              ))}
            </select>
          ) : lockedBandId ? (
            <div className="p-3 font-semibold text-green-400 bg-gray-800 border border-green-600 rounded-md">
              Booking: {selectedBand.name}
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gray-800 border border-green-600 rounded-md">
              <div>
                <p className="font-semibold text-green-400">{selectedBand.name}</p>
                <p className="text-sm text-gray-300">
                  Indoor: Rs.{selectedBand.priceIndoor?.toLocaleString()} | Outdoor: Rs.
                  {selectedBand.priceOutdoor?.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedBand(null);
                  setForm({ ...form, bandId: "" });
                }}
                className="px-3 py-1 text-sm font-medium text-black bg-green-400 rounded hover:bg-green-500"
              >
                Change
              </button>
            </div>
          )}

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="p-3 text-white bg-gray-900 border border-green-600 rounded-md"
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>

          <select
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-green-600 rounded-md"
          >
            <option value="">Select Date</option>
            {availableDates.map((date, idx) => (
              <option key={idx} value={date}>
                {date}
              </option>
            ))}
          </select>

          <select
            name="eventTime"
            value={form.eventTime}
            onChange={handleChange}
            className="p-3 text-white bg-gray-900 border border-green-600 rounded-md"
          >
            <option value="">Select Time</option>
            {availableSlots.map((time, idx) => (
              <option key={idx} value={time}>
                {time}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={form.location}
            onChange={handleChange}
            className="p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"
          />

          <input
            type="number"
            name="hours"
            placeholder="Hours"
            value={form.hours}
            onChange={handleChange}
            className="p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 text-white placeholder-gray-400 bg-gray-900 border border-green-600 rounded-md"
          />
        </div>

        <div className="mb-6 text-xl font-semibold text-right text-green-400">
          Total: Rs. {isNaN(price) ? "0" : price.toLocaleString()}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePay}
            className="px-8 py-3 text-lg font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Pay & Book Band
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookBand;
