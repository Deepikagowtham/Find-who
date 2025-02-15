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

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/SPA", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
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

const Message = mongoose.model("user_messages", contactSchema); // ⬅️ Fixed collection name

// ✅ Route to handle booking submission
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;

    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const selectedDate = new Date(`${date} ${time}`);
    const currentDate = new Date();

    // Check if selected date/time is before the current date/time
    if (selectedDate < currentDate) {
      return res.status(400).json({ message: "Invalid date/time! Please select a future time." });
    }

    // Check if the service is already booked at the same date and time
    const existingBooking = await Booking.findOne({ service, date, time });

    if (existingBooking) {
      return res.status(400).json({ message: "This service is already booked for the selected time. Please choose another slot." });
    }

    // Save to MongoDB
    const newBooking = new Booking({ name, email, phone, service, date, time });
    await newBooking.save();
    console.log("✅ Booking saved to MongoDB:", newBooking);

    // Send confirmation email (if applicable)
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
    user: "deepigap.22cse@kongu.edu",
    pass: "rlmj jgdb vddd zdml", // ⬅️ Use Google App Password instead
  },
});

function sendBookingConfirmation(email, name, service, date, time) {
  const mailOptions = {
    from: "deepikagowtham24@gmail.com",
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

    // Save the message in MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    console.log("✅ Message saved to MongoDB:", newMessage);

    // Send Email
    const mailOptions = {
      from: email,
      to: "deepigap.22cse@kongu.edu",
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
