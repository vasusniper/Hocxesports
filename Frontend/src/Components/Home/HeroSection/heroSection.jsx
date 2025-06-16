import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css"; // Separate CSS file

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Join the Battle. Rule the Arena.</h1>
        <p className="hero-subtitle">
          HocxGaming organizes top-tier BGMI tournaments and live streams to
          bring out the best in gamers.
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