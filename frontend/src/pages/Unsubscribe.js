import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Unsubscribe = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Processing your request...");

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");

    if (!email) {
      setStatus("error");
      setMessage("❌ Invalid unsubscribe request.");
      return;
    }

    fetch(`http://localhost:5000/api/subscribe/unsubscribe?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Unsubscribe failed");
        return res.text();
      })
      .then(() => {
        setStatus("success");
        setMessage("✅ You have been unsubscribed from Sound Live.");
      })
      .catch(() => {
        setStatus("error");
        setMessage("❌ Something went wrong while unsubscribing.");
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-32 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md p-8 text-center bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        {status === "success" && (
          <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
        )}
        {status === "error" && (
          <XCircle size={48} className="mx-auto mb-4 text-red-500" />
        )}
        <h2 className="mb-2 text-2xl font-bold text-green-400">Unsubscribe</h2>
        <p className="text-base text-gray-300">{message}</p>
        <a
          href="/"
          className="inline-block px-5 py-2 mt-6 font-semibold text-black transition bg-green-500 rounded hover:bg-green-600"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Unsubscribe;
