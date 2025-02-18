import React, { useState } from "react";
import "./Homepage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Homepage = () => {

  return (
    <>
    
    <Header />
      {/* HERO SECTION */}
      <section classNameName="hero">
        <div classNameName="hero-content">
          <h1>Relax, Rejuvenate, Refresh</h1>
          <p>Indulge in a luxurious spa experience designed to revitalize your mind, body, and soul. Experience tranquility like never before.</p>
          <Link to="/booking" classNameName="cta-button">Book an Appointment</Link>
        </div>

        {/* HERO IMAGE WITH CAROUSEL */}
        <div classNameName="hero-image">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            classNameName="hero-carousel"
          >
            <SwiperSlide>
              <img src="https://i.pinimg.com/736x/c7/78/65/c77865b4866ded2d1b66089c8e226697.jpg" alt="Spa Image 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.pinimg.com/736x/b5/6e/2e/b56e2eeb4137b7e134a11f73ff385006.jpg" alt="Spa Image 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.pinimg.com/736x/70/cc/5e/70cc5e23cbb9bbf5a17f34576650aa05.jpg" alt="Spa Image 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.pinimg.com/736x/98/47/56/984756c3631d25b84b9fe1e3e6de555d.jpg" alt="Spa Image 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.pinimg.com/736x/42/3a/d3/423ad32ddfe91dc845d787a39f7099fd.jpg" alt="Spa Image 5" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Available Services (Below Hero Section) */}
      </section>
      <section className="ser-container">
    <h2 className="ser">Our Services <span>Experience Ultimate Relaxation</span></h2>
     <br/><br/>
    <div className="ser-gallery">

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/736x/db/1b/40/db1b4074f45bc20b80bb1e37f7f4d593.jpg" alt="Hot Stone Massage"/>
            <h3 className="ser-title">Mud Thearpy</h3>
        </div>

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/474x/5b/5f/44/5b5f440872b23e990acecf3bf8894300.jpg" alt="Aromatherapy"/>
            <h3 className="ser-title">Aromatherapy</h3>
        </div>

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/736x/8f/77/b9/8f77b929a29f236566cda7a76a254117.jpg" alt="Facial Therapy"/>
            <h3 className="ser-title">Facial Therapy</h3>
        </div>

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/736x/38/b0/71/38b0718ab8877cb2479b2535c0878957.jpg" alt="Deep Tissue Massage"/>
            <h3 className="ser-title">Hair Spa & Treatment</h3>
        </div>

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/736x/9d/fa/5d/9dfa5d7debab07358c38520774de3230.jpg" alt="Body Scrub"/>
            <h3 className="ser-title">Body Scrub</h3>
        </div>

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/736x/67/ca/ac/67caac2f5f1416f80bc0a179338c4a7a.jpg" alt="Reflexology"/>
            <h3 className="ser-title">Reflexology</h3>
        </div>

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/736x/bc/57/2b/bc572b1ea937c37eddcfaf483778aad8.jpg" alt="Body Scrub"/>
            <h3 className="ser-title">Hot Stone Massage</h3>
        </div>

        <div className="ser-item">
            <img className="ser-image" src="https://i.pinimg.com/736x/33/ed/85/33ed85f4e26a55c1a1a723998f5297a3.jpg" alt="Reflexology"/>
            <h3 className="ser-title">Pedicure</h3>
        </div>

    </div>
    <br/><br/>
    <Link to="/services" classNameName="ser-button">Explore More</Link>
</section>


    <Footer />
    </>
  );
};

export default Homepage;
