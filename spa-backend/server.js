require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing. Check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err));
mongoose.connection.on("connected", () => console.log("✅ MongoDB connected successfully."));

// ✅ Schema & Model for Bookings
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  date: String,
  time: String,
});

const Booking = mongoose.model("booking_details", bookingSchema);

// ✅ Schema & Model for Contact Messages
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Message = mongoose.model("user_messages", contactSchema);

// ✅ Route to handle booking submission
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;

    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const selectedDate = new Date(`${date} ${time}`);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return res.status(400).json({ message: "Invalid date/time! Please select a future time." });
    }

    const existingBooking = await Booking.findOne({ service, date, time });

    if (existingBooking) {
      return res.status(400).json({ message: "This service is already booked for the selected time. Please choose another slot." });
    }

    const newBooking = new Booking({ name, email, phone, service, date, time });
    await newBooking.save();
    console.log("✅ Booking saved to MongoDB:", newBooking);

    sendBookingConfirmation(email, name, service, date, time);

    res.status(201).json({ message: "Booking successful!" });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
});

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // Use App Password
  },
});

function sendBookingConfirmation(email, name, service, date, time) {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Booking Confirmation",
    text: `Hello ${name},\n\nYour booking for ${service} on ${date} at ${time} has been confirmed.\n\nThank you for choosing our spa!\n\nBest regards,\nSPA Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Email error:", error);
    } else {
      console.log("✅ Email sent: " + info.response);
    }
  });
}

// ✅ API Route to Handle Contact Form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    console.log("✅ Message saved to MongoDB:", newMessage);

    const mailOptions = {
      from: email,
      to: EMAIL_USER,
      subject: "New Contact Form Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent & stored!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: "Error processing request" });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
