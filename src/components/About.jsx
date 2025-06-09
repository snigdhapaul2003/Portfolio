import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFileAlt, FaLaptopCode, FaBriefcase, FaAward } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import '../styles/About.css';

const About = () => {
  // Stats to showcase your achievements
  const stats = [
    { icon: <FaFileAlt />, count: 5, title: "Research Publications", color: "#64ffda" },
    { icon: <FaLaptopCode />, count: 11, title: "Projects Completed", color: "#a8b2d1" },
    { icon: <FaBriefcase />, count: 3, title: "Internships", color: "#eaa043" },
    { icon: <FaAward />, count: 1, title: "National Achievement", color: "#e14e4e" },
  ];

  // Using intersection observer to trigger animation
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Using a direct path to the image instead of importing
  const profileImagePath = "/images/profile.jpg";
  
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2 
          className="heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="about-content">
          <div className="about-grid">
            <motion.div 
              className="about-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="about-text-container">
                <p className="about-intro">
                  Hello! I'm <span className="highlight">Snigdha Paul</span>, a B.Tech student in Electronics and Communication Engineering at Heritage Institute of Technology, Kolkata.
                </p>
                
                <p>
                  My passion lies in AI/ML research, particularly in computer vision and deep learning applications. With experience as a Research Intern at ISRO and academic positions at IIT Kharagpur, I've developed skills 
                  in implementing AI solutions for real-world problems.
                </p>
                
                <p>
                  My work spans multiple domains including crater detection algorithms, 
                  traffic accident prediction systems, and healthcare applications. I pride myself on my problem-solving abilities, innovation, and teamwork skills, which have helped me 
                  excel in hackathons and research projects.
                </p>
              </div>
              
              <div className="about-contact-info">
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>snigdha.paul.ece25@heritageit.edu.in</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Kolkata, West Bengal, India</span>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>6289384765</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="image-wrapper">
                <div className="image-container">
                  <img 
                    src={profileImagePath} 
                    alt="Snigdha Paul" 
                    className="profile-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x360/233554/64ffda?text=SP";
                    }} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Stats Section */}
          <motion.div 
            ref={ref}
            className="stats-container"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + (index * 0.1) }}
              >
                <div className="stat-icon-container" style={{ borderColor: stat.color }}>
                  {React.cloneElement(stat.icon, { className: "stat-icon", style: { color: stat.color } })}
                </div>
                <div className="stat-content">
                  <h3 className="stat-count">
                    {inView ? (
                      <CountUp end={stat.count} duration={2.5} />
                    ) : (
                      "0"
                    )}
                  </h3>
                  <p className="stat-title">{stat.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Skills Preview */}
          <motion.div 
            className="skills-preview"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="skills-heading">
              <h3>My Expertise</h3>
              <div className="skills-bar"></div>
            </div>
            
            <div className="skills-tags">
              <span className="skill-tag">Computer Vision</span>
              <span className="skill-tag">Deep Learning</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">TensorFlow</span>
              <span className="skill-tag">PyTorch</span>
              <span className="skill-tag">Generative AI</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;