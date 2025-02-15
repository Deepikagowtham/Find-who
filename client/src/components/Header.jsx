import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    
      const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    return (
        <>
        <header>
                <div className="menu-toggle" id="hamburger" onClick={toggleMenu}>
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
                <div className={`overlay ${menuOpen ? "menu-open" : ""}`}></div>
                <div className="container">
                  <nav className={menuOpen ? "menu-open" : ""}>
                    <h1 className="brand">
                      <a href="/">Zen<span>G</span>low</a>
                    </h1>
                    <ul>
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/booking" onClick={toggleMenu}>Booking</Link></li>
                        <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
                        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                    </ul>
                  </nav>
                </div>
              </header>
        </>
    );
};

export default Header;