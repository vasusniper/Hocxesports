import React from "react";
import { Link } from "react-router-dom";
import "./heroSection.css"; // Separate CSS file

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Join the Battle. Rise with HocxEsports.</h1>
        <p className="hero-subtitle">
          HocxEsports is your gateway to BGMI tournaments — built for beginners
          and rising stars. Compete, grow, and showcase your talent in
          live-streamed events.
        </p>
        <div className="hero-buttons">
          <Link to="/tournaments" className="Globle-button-style">
            Join Tournament
          </Link>
          <a
            href="https://www.youtube.com/@Hocxesports"
            target="_blank"
            rel="noopener noreferrer"
            className="Globle-button-style"
          >
            Watch Live
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
