import React from "react";
import './sliderSection.css';

const Slider = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide py-5" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/BGMI_1.jpeg" className="d-block w-100 slider-img" alt="First Slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>First Slide Title</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/BGMI_2.jpeg" className="d-block w-100 slider-img" alt="Second Slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second Slide Title</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/BGMI_3.jpeg" className="d-block w-100 slider-img" alt="Third Slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third Slide Title</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
