
export const initiatePayHerePayment = (booking, user, serviceType) => {
  return {
    sandbox: true,
    merchant_id: process.env.PAYHERE_MERCHANT_ID,
    return_url: process.env.PAYHERE_RETURN_URL,
    cancel_url: process.env.PAYHERE_CANCEL_URL,
    notify_url: process.env.PAYHERE_NOTIFY_URL,
    order_id: `${serviceType}_${booking._id}`,
    items: `${serviceType} Booking`,
    amount: booking.totalPrice,
    currency: "LKR",
    first_name: user.username.split(" ")[0],
    last_name: user.username.split(" ")[1] || "",
    email: booking.email,
    phone: booking.phone,
    address: "Colombo, Sri Lanka",
    city: "Colombo",
    country: "Sri Lanka",
  };
};
