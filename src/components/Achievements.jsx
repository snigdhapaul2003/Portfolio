import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTrophy, FaExternalLinkAlt, FaCalendarAlt, FaBuilding, FaMedal } from 'react-icons/fa';
import '../styles/Achievements.css';

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  const achievements = [
    {
      id: 1,
      title: 'Award from Honourable President of India for securing 2nd position at Bharatiya Antariksh Hackathon on 1st National Space Day, 2024',
      organization: 'Indian Space Research Organization - ISRO',
      date: 'August, 2024',
      description: [
        'Developed SHAKTI, a Shadow-based Hybrid Algorithm for Knowledge of Topological Inequalities, designed to identify craters and boulders from Chandrayaan-II OHRC images of the moon\'s surface with 95% accuracy.',
        'Presented our innovative approach, along with the prototype developed during the 36-hours long hackathon, to the Honourable President of India, Smt. Droupadi Murmu at Bharat Mandapam, on National Space Day.'
      ],
      link: '#',
      image: '/images/prize.jpg', // Add your image path here
      color: '#FFC857'
    }
    // Add more achievements here
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="achievements" className="achievements-section" ref={ref}>
      <div className="achievements-bg"></div>
      <div className="achievements-glow"></div>
      
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <div className="heading-wrapper">
            <h2 className="heading">Achievements</h2>
            <div className="heading-line"></div>
          </div>
          <p className="section-subtitle">Recognition for technological innovations and contributions</p>
        </motion.div>
        
        <motion.div 
          className="achievements-list"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {achievements.map((achievement, index) => (
            <motion.div 
              key={achievement.id}
              className="achievement-card"
              variants={cardVariants}
              style={{
                '--card-color': achievement.color || '#64ffda',
              }}
            >
              <div className="achievement-media">
                {achievement.image ? (
                  <div 
                    className="achievement-image"
                    style={{ backgroundImage: `url(${achievement.image})` }}
                  >
                    <div className="achievement-badge">
                      <FaMedal />
                    </div>
                  </div>
                ) : (
                  <div className="achievement-icon-wrapper">
                    <FaTrophy className="achievement-icon" />
                  </div>
                )}
              </div>
              
              <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                
                <div className="achievement-details">
                  <div className="detail-item">
                    <FaBuilding className="detail-icon" />
                    <p className="detail-text">{achievement.organization}</p>
                  </div>
                  
                  <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <p className="detail-text">{achievement.date}</p>
                  </div>
                </div>
                
                <div className="achievement-description">
                  {achievement.description.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
                

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;