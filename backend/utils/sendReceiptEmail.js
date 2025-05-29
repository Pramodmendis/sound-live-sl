import nodemailer from "nodemailer";

export const sendReceiptEmail = async (clientEmail, booking, type = "Studio") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subjectMap = {
    Studio: "🎙️ Studio Booking Confirmation",
    Equipment: "🎛️ Equipment Rental Confirmation",
    Band: "🎶 Band Booking Confirmation",
  };

  const mailOptions = {
    from: `"Sound Live" <${process.env.EMAIL_USER}>`,
    to: clientEmail,
    subject: subjectMap[type] || "Booking Confirmation",
    text: `Hi ${booking.clientName || booking.username},

Thank you for your payment of Rs. ${booking.amount || booking.price} for your ${type.toLowerCase()} booking.

Your booking is confirmed and we’ll reach out soon with more details.

Regards,
Sound Live Team`,
  };

  return transporter.sendMail(mailOptions);
};
