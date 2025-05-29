import nodemailer from "nodemailer";
import ContactMessage from "../models/ContactMessage.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Submit contact message (client)
export const handleContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, Email, and Message are required." });
    }

    const newMessage = new ContactMessage({ name, email, phone, message });
    await newMessage.save();

    res.status(200).json({ success: true, message: "Message received successfully." });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Something went wrong. Try again later." });
  }
};

// Get all messages (for admin)
export const getAllMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
};

// Send reply email (admin)
export const sendReply = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const message = await ContactMessage.findById(id);
    if (!message) return res.status(404).json({ error: "Message not found." });

    const htmlContent = `
      <div style="background-color:#0f172a;padding:20px;border-radius:6px;color:#ffffff;font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#22c55e;margin-bottom:20px;">Sound Live - Customer Support</h2>
        <p style="font-size:16px;line-height:1.5;">Hi <strong>${message.name}</strong>,</p>
        <p style="font-size:16px;line-height:1.5;">${reply}</p>
        <p style="font-size:16px;line-height:1.5;">Thank you for reaching out. If you have any further questions, feel free to contact us again.</p>
        <p style="margin-top:30px;font-size:16px;">Best regards,<br/><strong>Sound Live Team</strong></p>
        <hr style="margin:30px 0;border:0;border-top:1px solid #334155;">
        <p style="font-size:12px;color:#94a3b8;">This is an automated message from <strong>Sound Live</strong> | <a href="https://soundlive.lk" style="color:#22c55e;text-decoration:none;">soundlive.lk</a></p>
      </div>
    `;


    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: "Reply from Sound Live",
      html: htmlContent,
    });

    message.reply = reply;
    message.isReplied = true;
    await message.save();

    res.json({ success: true, message: "Reply sent successfully." });
  } catch (err) {
    console.error("Reply error:", err);
    res.status(500).json({ error: "Failed to send reply." });
  }
};
