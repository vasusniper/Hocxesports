// AboutPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import TeamSection from "../Miscellaneous/teamSection";
import "./aboutPage.css";

function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-container">
        <section className="about-intro">
          <h1 className="about-title">About HocxGaming</h1>
          <div className="divider"></div>
          
          <div className="about-content">
            <p className="about-text">
              HocxGaming is a community-driven esports organization dedicated to
              bringing the most exciting and competitive BGMI (Battlegrounds
              Mobile India) tournaments to the gaming world. We nurture new talent
              and provide a platform for beginners to showcase their skills.
            </p>

            <p className="about-text">
              Our goal is to create an inclusive environment where players of all
              levels can compete, learn, and grow. Whether you're a beginner or a
              pro, HocxGaming helps take your skills to the next level.
            </p>

            <p className="about-text">
              From beginner series to professional tournaments, we provide fair
              and fun opportunities with thrilling gameplay and rewards for the
              best teams.
            </p>
          </div>
        </section>

        <section className="vision-section">
          <h2 className="section-heading">Our Vision</h2>
          <div className="divider"></div>
          <p className="vision-text">
            We aim to become a leading esports platform for BGMI players,
            offering opportunities for growth, skill development, and
            recognition in a passionate gaming community.
          </p>
        </section>

        <TeamSection />

        <section className="join-section">
          <h2 className="section-heading">Join Us</h2>
          <div className="divider"></div>
          <p className="join-text">
            Ready to take your gaming career to the next level? Join our
            community, participate in our tournaments, and become part of the
            HocxGaming family.
          </p>
          <Link to="/contact" className="Globle-button-style">
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;