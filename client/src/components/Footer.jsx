import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {

    return (
        <>
        <header>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
        </header>
        <div className="footer">
  <div className="footer-container">
    <div className="footer-column">
      <h3>About Us</h3>
      <p>Relax and rejuvenate with our premium spa services.</p>
    </div>
    <div className="footer-column">
      <h3>Quick Links</h3>
      <ul className="footer-links">
        <Link to="/" className="">Home</Link><br/>
        <Link to="/services" className="">Service</Link><br/>
        <Link to="/booking" className="">Booking</Link>
      </ul>
    </div>
    <div className="footer-column">
      <h3>Contact Us</h3>
      <p>Email: spa@example.com</p>
      <p>Phone: +91 98765 43210</p>
    </div>
    <div className="footer-column">
      <h3>Follow Us</h3>
      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
      </div>
    </div>
  </div>
  <p className="footer-bottom">&copy; 2025 Your Spa Name. All rights reserved.</p>
</div>

        </>

    );
};

export default Footer;