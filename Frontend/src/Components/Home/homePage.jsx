import React from "react";
import "./homePage.css";

// Component Imports
import HeroSection from "./HeroSection/heroSection";
import YouTubeEmbed from "./YoutubeEmbed/youtubeEmbed";
import Tournament from "../Tournament/tournamentList";
import TeamSection from "../Miscellaneous/teamSection";

export default function HomePage() {
  return (
    <div className="homepage-container">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <HeroSection />
      </section>

      {/* Tournaments Section */}
      <section className="tournaments-section section-spacing">
        <Tournament />
      </section>

      {/* YouTube Embed Section */}
      <section className="youtube-section section-spacing">
        <YouTubeEmbed />
      </section>

      {/* Team Section */}
      <section className="team-section section-spacing">
        <TeamSection />
      </section>
    </div>
  );
}