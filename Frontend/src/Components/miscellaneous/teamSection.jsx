import React, { useState, useEffect, useRef } from "react";
import MoreTextBtn from "./moreTextBtn";
import Sachin from "../../assets/Sachin.jpg";
import Vasusniper from "../../assets/Vasu-Sniper.png";
import Yas from "../../assets/Yas.jpg";
import "./teamSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TeamSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);
  const teamMembers = [
    {
      img: Sachin,
      name: "Alex Tr",
      position: "CEO & Founder",
      about: "Alex is the visionary behind HocxGaming, leading the team with strategic direction and dedication."
    },
    {
      img: Vasusniper,
      name: "Vasu Sniper",
      position: "Co-Founder",
      about: "Vasu Sniper is the Co-founder of HocxGaming. He leads the entire team with strong leadership."
    },
    {
      img: Yas,
      name: "Yas Sniper",
      position: "Tourn. Manager",
      about: "Yas Sniper oversees all tournaments at HocxGaming, ensuring every match runs smoothly."
    }
  ];

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, teamMembers.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleSlideClick = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
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
      nextSlide(); // Swipe left
    } else if (diff < -threshold) {
      prevSlide(); // Swipe right
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="team-section">
      <div className="container">
        <h2 className="section-heading">Meet the Team</h2>
        <div className="divider"></div>
        
        {isMobile ? (
          <div className="mobile-team-view">
            <div 
              className="team-slider"
              ref={sliderRef}
              onClick={handleSlideClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className={`team-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{
                    transform: `translateX(${100 * (index - currentSlide)}%)`,
                    opacity: index === currentSlide ? 1 : 0.7
                  }}
                >
                  <div className="team-member">
                    <div className="member-image">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                    </div>
                    <h3>{member.name}</h3>
                    <MoreTextBtn Position={member.position} About={member.about} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="slider-controls">
              <button className="slider-arrow" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
              
              <div className="slider-dots">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              
              <button className="slider-arrow" onClick={nextSlide}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <div className="desktop-team-view">
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-image">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <MoreTextBtn Position={member.position} About={member.about} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;