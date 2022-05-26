import React from "react";
import "./index.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
          <h5>Santiago Martínez, {new Date().getFullYear()}.</h5>
        <div className="social-links">
          <div>
            <a href="https://github.com/santimb96"><i class="fa-brands fa-github"></i></a>
            <a href="https://www.linkedin.com/in/santi-martinez-bota/"><i class="fa-brands fa-linkedin"></i></a>
            <a href="mailto:santiagomartinezbota@gmail.com"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
