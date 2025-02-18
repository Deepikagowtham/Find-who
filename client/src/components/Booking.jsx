import React, { useState } from "react";
import "./Booking.css"; // Import the CSS file
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const [bookingMessage, setBookingMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedDate = new Date(`${formData.date} ${formData.time}`);
    const currentDate = new Date();
  
    if (selectedDate < currentDate) {
      setBookingMessage("Invalid date/time! Please select a future time.");
      return;
    }
  
    try {
      const response = await fetch("https://zenglow-spa.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setBookingMessage("Your service has been booked successfully!");
        
        setTimeout(() => setBookingMessage(""), 10000);
  
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
        });
      } else {
        setBookingMessage(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setBookingMessage("Something went wrong.");
    }
  };
  

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <div className="booking-container">
        <h2>Choose the service</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="tel"
            name="phone"
            placeholder="Phone no"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <br />
          <select name="service" value={formData.service} onChange={handleChange} required>
            <option value="">Choose the service</option>
            <option value="Massage">Massage</option>
            <option value="Facial">Facial</option>
            <option value="Body Scrub">Body Scrub</option>
            <option value="Sauna">Sauna</option>
          </select>
          <br />
          <div className="dropdowns">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select name="time" value={formData.time} onChange={handleChange} required>
              <option value="">Time</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
          </div>
          <br />
          <button type="submit">Book Now</button>
        </form>

        {bookingMessage && <div className="booking-message">{bookingMessage}</div>}
      </div>
      <br />
      <Footer />
    </>
  );
};

export default BookingForm;
