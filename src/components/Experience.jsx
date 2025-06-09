import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaExternalLinkAlt, FaMapMarkerAlt, FaClock, FaBuilding } from 'react-icons/fa';
import '../styles/Experience.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const experiences = [
    {
      id: 1,
      company: 'Space Application Center - ISRO',
      role: 'Research Intern',
      duration: 'September, 2024 - November, 2024',
      location: 'Ahmedabad, India',
      description: [
        'Working under the mentorship of ISRO scientists Dr. Aditya Dagar, Dr. Phani Rajasekhar and Dr. Rohit Nagori.',
        'Selenoregistration and image matching based automated detection/identification of OHRC, TMC and HRS images.',
        'Employing a shadow-based technique (SHAKTI) to distinguish craters from boulders using azimuth angle.',
      ],
      link: 'https://drive.google.com/file/d/16V38HC0qTiJYni4hQRiOT0MjyyI4wozT/view',
      color: '#64ffda'
    },
    {
      id: 2,
      company: 'Indian Institute of Technology, Kharagpur',
      role: 'Academic Research Assistant',
      duration: 'January, 2024 - June, 2024',
      location: 'Remote',
      description: [
        'Worked on accident risk analysis using the Kolkata Police Traffic dataset (2017-2023).',
        'Implemented Geocoding and employed classification, regression, and clustering algorithms for accident count prediction.',
        'Built an user interface with Grafik for user to predict accident count in a specific location.'
      ],
      link: 'https://drive.google.com/file/d/18IsHsrQU8HArKRYk27ghCjJ1oUoMX79W/view',
      color: '#eaa043'
    },
    {
      id: 3,
      company: 'Innoverv Global Solutions Pvt Ltd',
      role: 'AI Intern',
      duration: 'March, 2024 - June, 2024',
      location: 'Remote',
      description: [
        'Developed an AI-based masking and demasking tool for protecting sensitive data in Excel files.',
        'Implemented masking and demasking algorithms using Gen AI techniques for effective sensitive data protection.'
      ],
      link: 'https://drive.google.com/file/d/1ccq1yivWfz3iRXCqhybsb2p2ZclpK-A9/view',
      color: '#e14e4e'
    }
  ];

  return (
    <section id="experience" className="experience">
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h2>
        
        <div className="experiences-container">
          <div className="experience-tabs">
            {experiences.map((exp, index) => (
              <motion.button 
                key={exp.id} 
                className={`experience-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
                style={{
                  '--tab-color': exp.color
                }}
                whileHover={{ 
                  scale: activeTab === index ? 1 : 1.05,
                  backgroundColor: activeTab === index ? '' : `rgba(${hexToRgb(exp.color)}, 0.1)`
                }}
              >
                <div className="tab-content">
                  <span className="company-name">{exp.company.split(' - ')[0]}</span>
                  <span className="role-name">{exp.role}</span>
                </div>
                {activeTab === index && (
                  <motion.div 
                    className="tab-indicator"
                    layoutId="tab-indicator"
                    style={{ backgroundColor: exp.color }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          <div className="experience-details">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                className="experience-detail-card"
                style={{
                  '--card-color': experiences[activeTab].color
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-header">
                  <motion.div 
                    className="experience-icon-wrapper"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <FaBuilding className="experience-icon" />
                  </motion.div>
                  
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {experiences[activeTab].role}
                    </motion.h3>
                    <motion.h4 
                      className="company-title"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {experiences[activeTab].company}
                    </motion.h4>
                  </div>
                </div>
                
                <div className="experience-meta">
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <span>{experiences[activeTab].duration}</span>
                  </div>
                  <div className="meta-item">
                    <FaMapMarkerAlt className="meta-icon" />
                    <span>{experiences[activeTab].location}</span>
                  </div>
                </div>
                
                <ul className="experience-responsibilities">
                  {experiences[activeTab].description.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.a 
                  href={experiences[activeTab].link} 
                  className="certificate-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  View Certificate <FaExternalLinkAlt />
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Utility function to convert hex to RGB for hover effects
function hexToRgb(hex) {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export default Experience;