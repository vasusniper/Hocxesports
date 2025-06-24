import React from "react";
import "./YouTubeEmbed.css";

const YouTubeEmbed = () => {
  return (
    <section className="youtube-section">
      <h2 className="section-title">Latest Stream</h2>
      <div className="divider"></div>
      
      <div className="video-container">
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube-nocookie.com/embed/lrFcKNniqZY?si=5yAT-pI58nIhHoUN"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="youtube-iframe"
          />
        </div>
      </div>
    </section>
  );
};

export default YouTubeEmbed;