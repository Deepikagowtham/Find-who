import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import "./Contact.css";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [rating, setRating] = useState(0); // Track selected rating
  const [messageSent, setMessageSent] = useState(""); // Success/Error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://zenglow-spa.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessageSent("✅ Message has been sent!");
      } else {
        setMessageSent("❌ Failed to send message!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageSent("❌ Something went wrong!");
    }

    // Show pop-up for 10 seconds
    setTimeout(() => {
      setMessageSent("");
    }, 10000);

    // Clear the form after submitting
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />

      {/* Message Popup */}
      {messageSent && (
        <p
          className={`message-popup ${
            messageSent.includes("✅") ? "success" :
            messageSent.includes("❌") ? "error" :
            "warning"
          }`}
        >
          {messageSent}
        </p>
      )}

      <div className="contact-container">
        <div className="contact-form">
          <h2>Contact us</h2>
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
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>

        <div className="contact-info">
          <div className="contact-image">
            <img
              src="https://i.pinimg.com/736x/33/8d/47/338d478b039ee47be012f2a87b007037.jpg"
              alt="Contact"
            />
          </div>
          <br />
          <div className="info">
            <p>
              <FaMapMarkerAlt /> 112, Agrahara Street, Bala Silks Road, Erode - 638001.
            </p>
            <p>
              <FaPhoneAlt /> +91 98765 43210
            </p>
          </div>
          <div className="ratings">
            <h3>Ratings</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star ${star <= rating ? "active" : ""}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Contact;
