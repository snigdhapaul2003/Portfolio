import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import '../styles/Education.css';

const Education = () => {
  const education = [
    {
      id: 1,
      institution: 'Heritage Institute of Technology, Kolkata',
      degree: 'B.Tech in Electronics and Communication Engineering',
      duration: 'September, 2021 - Present',
      gpa: 'GPA: 9.91',
    },
    {
      id: 2,
      institution: 'Niva Ananda Vidyalaya, Kolkata',
      degree: 'Class 12 (WBCHSE): 96.6% (PCMB)',
      duration: 'January, 2018 - June, 2021',
    },
    {
      id: 3,
      institution: 'Niva Ananda Vidyalaya, Kolkata',
      degree: 'Class 10 (WBHSE): 95.1%',
      duration: 'January, 2018 - June, 2021',
    },
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <motion.h2 
          className="heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>
        
        <div className="education-timeline">
          {education.map((item, index) => (
            <motion.div 
              className="timeline-item"
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-icon">
                <FaGraduationCap />
              </div>
              <div className="timeline-content">
                <h3>{item.institution}</h3>
                <h4>{item.degree}</h4>
                {item.gpa && <p className="timeline-gpa">{item.gpa}</p>}
                <div className="timeline-date">
                  <FaCalendarAlt />
                  <span>{item.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;