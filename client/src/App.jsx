import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import BrowserRouter
import Homepage from "./components/Homepage";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Header from "./components/Header"; // ✅ Ensure Header is imported

function App() {
  return (
    <Router> {/* ✅ Wrap everything inside Router */}
      <Header /> {/* ✅ Navbar remains on all pages */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
