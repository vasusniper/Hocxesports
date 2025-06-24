import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import "./contactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="contact-page-container mt-5">
      <div className="contact-page-wrapper">
        <h2 className="contact-page-heading">Contact Us</h2>
        <div className="divider"></div>
        <div className="contact-content-grid">
          {/* Contact Form Section */}
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="form-textarea"
                ></textarea>
              </div>

              <button type="submit" className="back-home-button">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="contact-info-section">
            <h3 className="contact-info-heading">Our Location</h3>
            
            <div className="map-container">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5612097448036!2d77.6004975!3d12.9342536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16734f9793c1%3A0x3a18e4b1d5786970!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1626265987819!5m2!1sen!2sus"
                className="map-iframe"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>contact@hocxesports.com</p>
                  <p>support@hocxesports.com</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>+91 1205274906</p>
                  <p>+1 (123) 456-7890</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h4>Address</h4>
                  <p>H456 Gaming Street</p>
                  <p>Bangalore, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/" className="back-home-button">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ContactPage;