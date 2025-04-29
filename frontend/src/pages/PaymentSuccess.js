import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-xl text-center text-white">
        <h1 className="mb-6 text-4xl font-extrabold text-green-400 md:text-5xl">
          Payment Successful 🎉
        </h1>
        <p className="mb-6 text-lg text-gray-300 md:text-xl">
          Thank you for your booking! We’ve received your payment and your order is now confirmed.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
