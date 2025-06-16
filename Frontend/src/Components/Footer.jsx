import React from "react";
import './Footer.css'; // Import your CSS file for styling
function Footer() {
  return (
    <footer className="footer text-white py-3 w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
            <small>&copy; {new Date().getFullYear()} HocxGaming. All rights reserved.</small>
          </div>
          <div className="col-12 col-md-6 text-center">
            <div className="icons_div">
              <a href="#" target="_blank" >
              <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="#" target="_blank" >
              <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" target="_blank" >
              <i class="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://www.youtube.com/hocxgaming" target="_blank">
              <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
