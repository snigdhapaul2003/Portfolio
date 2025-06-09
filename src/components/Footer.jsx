import React from 'react';
import { FaGithub, FaLinkedin, FaGoogle } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <span className="logo-text">SP</span>
          </div>
          
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#publications">Publications</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="footer-socials">
            <a href="https://github.com/snigdhapaul2003" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/snigdhapaul2003" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://scholar.google.com//citations?user=vf8el2sAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
              <FaGoogle />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            Designed & Built by Snigdha Paul © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;