import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTools, FaBrain, FaRegHandshake } from 'react-icons/fa';
import '../styles/Skills.css';

const Skills = () => {
  const skills = {
    programming: ['Python', 'JavaScript', 'Flask', 'React'],
    tools: ['Git & GitHub', 'PCham', 'ML models', 'YOLOv8', 'CNN', 'Transformer', 'Agentic AI Frameworks'],
    ai: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Generative AI', 'GPT', 'Gemini', 'Gamma', 'LLAMA3'],
    soft: ['Teamwork', 'Innovation', 'Responsibility', 'Problem Solving']
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2 
          className="heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>

        <div className="skills-container">
          <motion.div 
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="skill-header">
              <FaCode className="skill-icon" />
              <h3>Programming Languages</h3>
            </div>
            <div className="skill-list">
              {skills.programming.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="skill-header">
              <FaTools className="skill-icon" />
              <h3>Tools & Platforms</h3>
            </div>
            <div className="skill-list">
              {skills.tools.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="skill-header">
              <FaBrain className="skill-icon" />
              <h3>Machine Learning & AI</h3>
            </div>
            <div className="skill-list">
              {skills.ai.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="skill-header">
              <FaRegHandshake className="skill-icon" />
              <h3>Soft Skills</h3>
            </div>
            <div className="skill-list">
              {skills.soft.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;