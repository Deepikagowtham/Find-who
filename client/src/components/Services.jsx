import React, { useState } from "react";
import Footer from "./Footer.jsx";
import "./Services.css"; // Import your CSS file

const services = [
  { name: "Swedish Massage", description: "Relaxing full-body massage", image: "https://i.pinimg.com/736x/62/6b/17/626b173844695fe3acd96f793c661323.jpg" },
  { name: "Brightening Facial", description: "Relieves deep muscle tension", image: "https://i.pinimg.com/736x/1b/ee/ef/1beeeffab24003abebca11a7e315d4b0.jpg" },
  { name: "Hot Stone Massage", description: "Uses heated stones for relaxation", image: "https://i.pinimg.com/736x/bc/57/2b/bc572b1ea937c37eddcfaf483778aad8.jpg" },
  { name: "Aromatherapy Massage", description: "Massage with essential oils", image: "https://i.pinimg.com/474x/5b/5f/44/5b5f440872b23e990acecf3bf8894300.jpg" },
  { name: "Thai Massage", description: "Stretching and deep massage", image: "https://i.pinimg.com/736x/bc/57/2b/bc572b1ea937c37eddcfaf483778aad8.jpg" },
  { name: "Prenatal Massage", description: "Massage for expectant mothers", image: "https://i.pinimg.com/736x/c1/cc/5c/c1cc5c569c7f35f54a47801e441fd5c2.jpg" },
  { name: "Deep Cleansing Facial", description: "Cleanses and exfoliates skin", image: "https://i.pinimg.com/736x/a9/37/41/a937416a1198aeacfb265d8f7c2884ab.jpg" },
  { name: "Hydrating Facial", description: "Boosts moisture and glow", image: "https://i.pinimg.com/736x/51/37/a7/5137a721114d0fdc7022bae00f5ff7ef.jpg" },
  { name: "Anti-Aging Facial", description: "Reduces wrinkles and fine lines", image: "https://i.pinimg.com/736x/94/dc/41/94dc41e5ee6ebe915d4919b8a1a5df52.jpg" },
  { name: "Acne Treatment Facial", description: "Targets breakouts and acne scars", image: "https://i.pinimg.com/736x/64/a6/87/64a687bc8cabc220c68d891bc96f6d5d.jpg" },
  { name: "Body Scrubs", description: "Full-body exfoliation treatment", image: "https://i.pinimg.com/736x/9d/fa/5d/9dfa5d7debab07358c38520774de3230.jpg" },
  { name: "Mud Therapy", description: "Detoxifies and nourishes skin", image: "https://i.pinimg.com/736x/db/1b/40/db1b4074f45bc20b80bb1e37f7f4d593.jpg" },
  { name: "Hair Spa & Treatment", description: "Hair cleansing & slacpe massage", image: "https://i.pinimg.com/736x/38/b0/71/38b0718ab8877cb2479b2535c0878957.jpg" },
  { name: "Reflexology", description: "Relaxing thearpy for feets", image: "https://i.pinimg.com/736x/67/ca/ac/67caac2f5f1416f80bc0a179338c4a7a.jpg" },
  { name: "Waxing", description: "Smooth and flawless skin awaits", image: "https://i.pinimg.com/736x/95/55/e0/9555e062724cc2ca83f0cb3e6b38c586.jpg" },
  { name: "Pedicure", description: "Regaining new foot cells", image: "https://i.pinimg.com/736x/33/ed/85/33ed85f4e26a55c1a1a723998f5297a3.jpg" },
  { name: "Steam Treatment", description: "To speedup skin nutrition absorption", image: "https://i.pinimg.com/736x/05/dc/99/05dc996f78e247210f083ac64afbb03e.jpg" },
  { name: "Japanese Head Thearpy", description: "Promote relaxation, improve scalp health", image: "https://i.pinimg.com/736x/42/45/52/42455262bc6cbe59b29bbd70270a6fc6.jpg" },
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // Show only 6 services initially

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  
    <div className="services-container">
      <br/><br/>
      <br/><br/>
      <br/><br/>
      {/* Title */}
      <h2 className="title">Our Services</h2><br/><br/>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search services..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Services Grid */}
      <div className="services-grid">
        {filteredServices.slice(0, visibleCount).map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.name} className="service-image" />
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
      <br/><br/>
      {/* View More Button */}
      {visibleCount < filteredServices.length && (
        <button className="view-more-btn" onClick={() => setVisibleCount(visibleCount + 6)}>
          View More
        </button>
      )}
      <br/><br/><br/><br/>
      <Footer />
    </div>
  );
};

export default Services;
