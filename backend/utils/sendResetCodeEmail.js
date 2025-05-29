import transporter from "../config/nodemailer.js";

const sendResetCodeEmail = async (email, code) => {
  const mailOptions = {
    from: `"Sound Live" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Sound Live - Password Reset Code",
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
    html: `
      <div style="background-color: #0f172a; color: #f1f5f9; font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: auto;">
        <h2 style="color: #22c55e; text-align: center;">🔐 Reset Your Password</h2>
        <p style="font-size: 15px;">Hello,</p>
        <p style="font-size: 15px;">
          We received a request to reset your <strong>Sound Live</strong> account password.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; padding: 16px 30px; font-size: 28px; font-weight: bold; background-color: #1e293b; color: #22c55e; letter-spacing: 4px; border-radius: 6px;">
            ${code}
          </div>
        </div>
        <p style="font-size: 13px; color: #9ca3af;">
          If you didn’t request this, you can safely ignore this email.
        </p>
        <hr style="border-top: 1px solid #374151; margin: 30px 0;" />
        <p style="font-size: 12px; text-align: center; color: #6b7280;">
          &copy; 2025 Sound Live 
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendResetCodeEmail;
