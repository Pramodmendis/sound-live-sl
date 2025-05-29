import { Parser } from "json2csv";
import transporter from "../config/nodemailer.js";
import Subscriber from "../models/Subscriber.js";

// Subscribe a user
export const subscribeEmail = async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) return res.status(409).json({ message: "Already subscribed." });

    await new Subscriber({ email }).save();

    await transporter.sendMail({
      from: `"Sound Live" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to Sound Live!",
      html: `
  <div style="background-color:#0f172a;padding:20px;border-radius:6px;color:#ffffff;font-family:Arial,sans-serif;max-width:600px;margin:auto;">
    <h2 style="color:#22c55e;margin-bottom:20px;">🎉 Welcome to Sound Live!</h2>
    <p style="font-size:16px;line-height:1.5;">Thanks for subscribing to <strong>Sound Live</strong>.</p>
    <p style="font-size:16px;line-height:1.5;">You'll be the first to hear about our latest updates, exclusive deals, and new features!</p>
    <p style="margin-top:30px;font-size:16px;">Warm regards,<br/><strong>Sound Live Team</strong></p>
    <hr style="margin:30px 0;border:0;border-top:1px solid #334155;">
    <p style="font-size:12px;color:#94a3b8;">If you wish to unsubscribe, click <a href="http://localhost:3000/unsubscribe?email=${encodeURIComponent(email)}" style="color:#f87171;text-decoration:none;">here</a>.</p>
  </div>
`

    });

    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Unsubscribe a user
export const unsubscribeEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).send("Invalid request");

  const removed = await Subscriber.findOneAndDelete({ email });
  if (!removed) return res.status(404).send("Email not found.");

  res.send(`<h2>You’ve been unsubscribed from Sound Live.</h2>`);
};

// Get all subscribers (for admin view)
export const getAllSubscribers = async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  res.json(subscribers);
};

// Export as CSV
export const exportSubscribersCSV = async (req, res) => {
  const data = await Subscriber.find({}, { _id: 0, email: 1, createdAt: 1 });
  const parser = new Parser({ fields: ["email", "createdAt"] });
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("subscribers.csv");
  res.send(csv);
};

// Send newsletter
export const sendNewsletter = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message is required." });

  const subscribers = await Subscriber.find();
  const emails = subscribers.map((s) => s.email);

  await transporter.sendMail({
    from: `"Sound Live" <${process.env.EMAIL_USER}>`,
    bcc: emails,
    subject: " Sound Live Newsletter",
    html: `
  <div style="background-color:#0f172a;padding:20px;border-radius:6px;color:#ffffff;font-family:Arial,sans-serif;max-width:600px;margin:auto;">
    <h2 style="color:#22c55e;margin-bottom:20px;">🔔 Latest Update from Sound Live</h2>
    <p style="font-size:16px;line-height:1.5;">${message}</p>
    <p style="font-size:16px;line-height:1.5;">Thank you for staying with us. More updates coming soon!</p>
    <p style="margin-top:30px;font-size:16px;">Best regards,<br/><strong>Sound Live Team</strong></p>
    <hr style="margin:30px 0;border:0;border-top:1px solid #334155;">
    <p style="font-size:12px;color:#94a3b8;">This is an automated newsletter from <strong>Sound Live</strong> | <a href="https://soundlive.lk" style="color:#22c55e;text-decoration:none;">soundlive.lk</a></p>
  </div>
`

  });

  res.status(200).json({ message: "Newsletter sent!" });
};
