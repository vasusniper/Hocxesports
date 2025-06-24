// AboutPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import TeamSection from "../miscellaneous/teamSection";
import "./aboutPage.css";

function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-container">
        {/* About Section */}
        <section className="about-intro">
          <h1 className="about-title">About HocxEsports</h1>
          <div className="divider"></div>

          <div className="about-content">
            <p className="about-text">
              HocxEsports is a community-driven esports organization dedicated to
              hosting exciting and competitive BGMI (Battlegrounds Mobile India)
              tournaments. We support new talent and provide a platform for players
              to showcase their skills.
            </p>

            <p className="about-text">
              Our goal is to create an inclusive environment where players of all
              levels can compete, learn, and grow. Whether you're a beginner or a
              pro, HocxEsports helps take your gameplay to the next level.
            </p>

            <p className="about-text">
              From beginner series to professional events, we offer fair
              opportunities, thrilling matches, and rewards for top-performing teams.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <h2 className="section-heading">Our Vision</h2>
          <div className="divider"></div>
          <p className="vision-text">
            We aim to become India’s leading esports platform for BGMI players,
            offering growth, skill development, and national recognition within a
            passionate gaming community.
          </p>
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* Join Us Section */}
        <section className="join-section">
          <h2 className="section-heading">Join HocxEsports</h2>
          <div className="divider"></div>
          <p className="join-text">
            Whether you're a solo BGMI player or part of a full squad, HocxEsports is
            your gateway to competitive gaming. We welcome beginners and experienced
            players to grow, compete, and shine.
          </p>
          <p className="join-text">
            Have questions or want to register your team? We're here to support you —
            just reach out!
          </p>
          <Link to="/contact" className="Globle-button-style">
            Contact HocxEsports
          </Link>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;
