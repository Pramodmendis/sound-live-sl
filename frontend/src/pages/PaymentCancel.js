import usePageTitle from "../hooks/usePageTitle";

const PaymentCancel = () => {
  usePageTitle("Payment Cancel");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="text-center text-white">
        <h1 className="text-4xl font-extrabold text-red-400">Payment Canceled</h1>
        <p className="text-lg text-gray-300">It seems you canceled the payment. Please try again.</p>
      </div>
    </div>
  );
};

export default PaymentCancel;
