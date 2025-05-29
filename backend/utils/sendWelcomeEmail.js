import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (clientEmail, clientName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Sound Live" <${process.env.EMAIL_USER}>`,
    to: clientEmail,
    subject: "🎉 Welcome to Sound Live!",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #0f172a; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #1e293b; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.4);">
          <h2 style="color: #22c55e; text-align: center; font-size: 26px;">
            🎉 Welcome to Sound Live, ${clientName}!
          </h2>

          <p style="color: #e2e8f0; font-size: 16px; margin-top: 20px;">
            We're thrilled to have you on board.
          </p>

          <ul style="color: #94a3b8; font-size: 15px; line-height: 1.7;">
            <li>📆 Book premium studios at your convenience</li>
            <li>🎛️ Hire cutting-edge sound and lighting equipment</li>
            <li>🎤 Find the perfect band for your event</li>
          </ul>

          <p style="color: #cbd5e1; font-size: 14px; margin-top: 20px;">
            You’re officially ready to make your next event unforgettable with Sound Live!
          </p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://www.soundlive.lk" style="background-color: #22c55e; color: #0f172a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              🚀 Get Started
            </a>
          </div>

          <hr style="border-color: #334155; margin: 30px 0;" />

          <p style="color: #64748b; font-size: 12px; text-align: center;">
            Need help? Just reply to this email. <br/>
            This message was sent by Sound Live – Colombo, Sri Lanka
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
