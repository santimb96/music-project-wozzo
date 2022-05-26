import React from "react";
import "./index.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
          <h5>Santiago Martínez, {new Date().getFullYear()}.</h5>
        <div className="social-links">
          <div>
            <a href="https://github.com/santimb96"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.linkedin.com/in/santi-martinez-bota/"><i className="fa-brands fa-linkedin"></i></a>
            <a href="mailto:santiagomartinezbota@gmail.com"><i className="fa-solid fa-envelope"></i></a>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-text="Incréible reproductor de música!" data-url="https://music-project-wozzo-santimb96.vercel.app" data-via="@santimb96" data-hashtags="#SpotiClone" data-show-count="false"><i className="fa-brands fa-twitter"></i></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
