export const handlePayHereCallback = async (req, res) => {
  try {
    const {
      order_id,
      status_code,
      payment_id,
      payhere_amount,
      method,
    } = req.body;

    console.log("✅ PayHere Callback Received:");
    console.log("Order ID:", order_id);
    console.log("Status Code:", status_code);
    console.log("Payment ID:", payment_id);
    console.log("Amount:", payhere_amount);
    console.log("Method:", method);

    res.status(200).send("Callback received");
  } catch (error) {
    console.error("❌ PayHere callback error:", error);
    res.status(500).json({ message: "Error processing callback" });
  }
};
