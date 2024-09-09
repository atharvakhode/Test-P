import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TopSlider.css";

function TopSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    width: "50%",
    padding: "10px",
  };

  return (
    <div className='header-container'>
      <div className="header d-flex flex-column flex-md-row align-items-center">
        {/* <img
          src="https://via.placeholder.com/600x300"
          alt="IT hardware"
          className="img-fluid"
        /> */}
        <div className="header-content text-center text-md-start">
          <h2>Revolutionize Your IT Infrastructure</h2>
          <p>Equip your business with the latest in IT hardware. Our comprehensive range includes high-performance servers, cutting-edge hardware, and robust networking solutions. Easy setup and unparalleled support ensure your tech is always up and running.</p>
          <p className="info-text">No setup fee required • 30-day money-back guarantee</p>
        </div>
      </div>
    </div>


  );
}

export default TopSlider;
