import fs from "fs";
import PDFDocument from "pdfkit";

export const generateInvoice = (booking, filePath, type = "Studio") => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc
      .fontSize(20)
      .fillColor("#10B981")
      .text("🎵 SOUND LIVE – INVOICE", { align: "center" })
      .moveDown(0.5)
      .fillColor("black")
      .fontSize(10)
      .text("Crafting Exceptional Events with Cutting-Edge Sound & Light", { align: "center" })
      .text("Colombo, Sri Lanka | www.soundlive.lk", { align: "center" })
      .text("Phone: +94 XXX XXX XXX", { align: "center" })
      .moveDown();

    // Client Info
    doc
      .fontSize(12)
      .text(`Invoice No: SLINV-${booking._id}`)
      .text(`Date: ${new Date().toLocaleDateString()}`)
      .moveDown()
      .text(`Client Name: ${booking.clientName || booking.username}`)
      .text(`Email: ${booking.email}`)
      .text(`Phone: ${booking.phone || "N/A"}`)
      .moveDown();

    // Table
    doc
      .font("Helvetica-Bold")
      .text("Item", 50)
      .text("Qty", 250)
      .text("Unit Price", 300)
      .text("Total", 400)
      .moveDown()
      .font("Helvetica");

    const price = booking.price || booking.amount;
    const label = type;
    doc.text(label, 50);
    doc.text("1", 250);
    doc.text(`Rs. ${price}`, 300);
    doc.text(`Rs. ${price}`, 400);
    doc.moveDown(2);

    const tax = Math.round(price * 0.1);
    const total = price + tax;

    doc
      .font("Helvetica-Bold")
      .text(`Subtotal: Rs. ${price}`, { align: "right" })
      .text(`Tax (10%): Rs. ${tax}`, { align: "right" })
      .text(`Total Amount: Rs. ${total}`, { align: "right" })
      .moveDown();

    doc
      .font("Helvetica")
      .text(`Payment Method: ${booking.paymentMethod || "PayHere"}`)
      .text(`Status: ${booking.status}`)
      .text(`Transaction ID: ${booking.transactionId || "N/A"}`)
      .moveDown();

    doc
      .fontSize(10)
      .text("Thank you for your business.", { align: "center" })
      .text("Keep this invoice for your records.", { align: "center" });

    doc.end();
    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });
};
