import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Render footer only for the home page
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <h3>Bringing the best to your plate</h3>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91-8008580085</li>
            <li>aniyapplar's resto@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; 2024 aniyapplar's.com. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
