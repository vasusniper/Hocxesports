import React, { useState, useEffect, useRef } from "react";
import { Snackbar, Alert } from "@mui/material";
import "./TournamentList.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const tournaments = [
  {
    title: "BGMI Beginner Series – June 2025",
    date: "June, 2025",
    description:
      "Gear up for an intense BGMI beginner showdown! 25 rising squads. Free entry.",
    status: "open",
    image: "../src/assets/bgmi1.jpg",
  },
  {
    title: "BGMI Intermediate Challenge",
    date: "July, 2025",
    description:
      "For players ready to take the next step. Competitive matches.",
    status: "open",
    image: "../src/assets/bgmi2.jpg",
  },
  {
    title: "HocxGaming Champions Cup",
    date: "August 5, 2025",
    description:
      "Battle for glory! Open for all BGMI players — register your squad now.",
    status: "coming",
    image: "../src/assets/bgmi3.jpg",
  },
  {
    title: "HocxGaming Legacy Cup",
    date: "November 2025",
    description:
      "Exclusive tournament for rising BGMI stars to showcase their skills.",
    status: "coming",
    image: "../src/assets/bgmi4.jpg",
  },
].sort((a, b) => (a.status === "open" ? -1 : 1));

function TournamentList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const firstOpenIndex = tournaments.findIndex((t) => t.status === "open");
    setCurrentIndex(Math.max(firstOpenIndex, 0));

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tournaments.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, tournaments.length, isPaused]);

  const handleNext = () => {
    setIsPaused(true); // Pause slider on manual navigation
    setCurrentIndex((prev) => (prev + 1) % tournaments.length);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const handlePrev = () => {
    setIsPaused(true); // Pause slider on manual navigation
    setCurrentIndex(
      (prev) => (prev - 1 + tournaments.length) % tournaments.length
    );
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const handleClick = (status, e) => {
    if (status === "coming") {
      e.preventDefault();
      setOpenAlert(true);
      setIsPaused(true); // Pause slider when alert is shown
      setTimeout(() => {
        setOpenAlert(false);
        setIsPaused(false); // Resume after alert is closed
      }, 3000);
    } else {
      // For "open" tournaments, proceed to registration
      // (No need to pause unless explicitly required)
    }
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    setIsPaused(true); // Pause slider on touch
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const threshold = 50;
    const diff = touchStart - touchEnd;

    if (diff > threshold) {
      handleNext(); // Swipe left
    } else if (diff < -threshold) {
      handlePrev(); // Swipe right
    }

    setTouchStart(null);
    setTouchEnd(null);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  return (
    <div className="tournament-slider">
      <h2 className="slider-heading">UPCOMING TOURNAMENTS</h2>
      <div className="divider"></div>

      {isMobile ? (
        <div className="mobile-view">
          <div
            className="slider-container"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {tournaments.map((tournament, index) => (
              <div
                key={index}
                className={`slider-card ${
                  index === currentIndex ? "active" : ""
                }`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                  opacity: index === currentIndex ? 1 : 0.7,
                }}
              >
                <div className="card-image-container">
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x225";
                    }}
                  />
                </div>
                <div className="card-content">
                  <h3>{tournament.title}</h3>
                  <p className="tournament-date">{tournament.date}</p>
                  <p className="tournament-desc">{tournament.description}</p>
                  <a target="main"
                    href={
                      tournament.status === "coming"
                        ? "#"
                        : "https://docs.google.com/forms/d/1DIdZBRvNw9CEtglT6UJN8cGU4flpgXQQKHbuXUNjOtU/edit"
                    }
                    className={`register-btn ${tournament.status}`}
                    onClick={(e) => handleClick(tournament.status, e)}
                  >
                    {tournament.status === "coming"
                      ? "COMING SOON"
                      : "REGISTER NOW"}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button className="slider-arrow" onClick={handlePrev}>
              <FaChevronLeft />
            </button>

            <div className="slider-dots">
              {tournaments.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => {
                    setIsPaused(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsPaused(false), 5000);
                  }}
                />
              ))}
            </div>

            <button className="slider-arrow" onClick={handleNext}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="desktop-view">
          <div className="tournament-grid">
            {tournaments.map((tournament, index) => (
              <div key={index} className="tournament-card">
                <div className="card-image-container">
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x225";
                    }}
                  />
                </div>
                <div className="card-content">
                  <h3>{tournament.title}</h3>
                  <p className="tournament-date">{tournament.date}</p>
                  <p className="tournament-desc">{tournament.description}</p>
                  <a
                    target="main"
                    href={
                      tournament.status === "coming"
                        ? "#"
                        : "https://docs.google.com/forms/d/1DIdZBRvNw9CEtglT6UJN8cGU4flpgXQQKHbuXUNjOtU/edit"
                    }
                    className={`register-btn ${tournament.status}`}
                    onClick={(e) => handleClick(tournament.status, e)}
                  >
                    {tournament.status === "coming"
                      ? "COMING SOON"
                      : "REGISTER NOW"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity="info">
          Tournament registration will open soon! Stay tuned.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TournamentList;
