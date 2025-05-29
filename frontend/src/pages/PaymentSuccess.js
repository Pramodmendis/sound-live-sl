import { Link, useLocation } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const PaymentSuccess = () => {
  usePageTitle("Payment Success");
  const query = new URLSearchParams(useLocation().search);
  const bookingId = query.get("bookingId");
  const bookingType = query.get("bookingType") || "Studio";

  const getInvoiceRoute = (type) => {
    switch (type) {
      case "Studio":
        return "studio-bookings";
      case "Equipment":
        return "equipment-bookings";
      case "Band":
        return "band-bookings";
      default:
        return "studio-bookings";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-xl text-center text-white">
        <h1 className="mb-6 text-4xl font-extrabold text-green-400 md:text-5xl">
          Payment Successful 🎉
        </h1>
        <p className="mb-6 text-lg text-gray-300 md:text-xl">
          Thank you for your booking! We’ve received your payment and your order is now confirmed.
        </p>

        <div className="flex justify-center gap-4">
          {bookingId && (
            <a
              href={`http://localhost:5000/api/${getInvoiceRoute(bookingType)}/invoice/${bookingId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 font-semibold text-black transition bg-green-400 rounded-lg hover:bg-green-500"
            >
              Download Invoice
            </a>
          )}

          <Link
            to="/"
            className="px-6 py-3 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
