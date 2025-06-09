import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCalendarAlt, 
  FaCode, 
  FaInfoCircle,
  FaArrowRight
} from 'react-icons/fa';
import '../styles/Projects.css';

// Animation variants
const animations = {
  card: {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  },
  header: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  },
  filter: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6, 
        delay: 0.2,
        ease: "easeOut" 
      }
    }
  }
};

// Project data
const projectsData = [
  {
    id: 1,
    title: 'AI Meeting Copilot Agent',
    subtitle: 'Microsoft AI Agent Hackathon',
    description: 'Developed a real-time AI meeting assistant capable of live interaction through both voice and text, designed to enhance collaboration and productivity during meetings. The assistant actively listens to conversations using speech recognition and processes the input through natural language understanding to generate real-time summaries and extract actionable insights. ',
    tech: ['Gemini Live API', 'Real-Time RAG', 'GROQ', 'PyQt5'],
    links: {
      github: 'https://github.com/microsoft/AI_Agents_Hackathon',
      external: ''
    },
    date: '2025',
    categories: ['AI', 'Generative AI'],
    color: '#64ffda',
    image: '/images/project-ai-meeting.jpg',
    highlight: true
  },
  {
    id: 2,
    title: 'RNFL based Glaucoma Detection',
    subtitle: 'Medical AI Research',
    description: 'Developed an integrated pipeline for automatic glaucoma detection using adaptive ellipse-based polar transformation, achieving up to 97% accuracy.',
    tech: ['TensorFlow', 'Image Processing', 'Feature Fusion', 'YOLOv8', 'Machine Learning'],
    links: {
      github: '',
      external: ''
    },
    date: 'December, 2024 - January, 2025',
    categories: ['Medical', 'Computer Vision', 'AI'],
    color: '#eaa043',
    image: '/images/project-glaucoma.jpg'
  },
  {
    id: 3,
    title: 'Skin Disease Detection Website',
    subtitle: 'Medical Web Application',
    description: 'Developed a website enabling users to upload multiple images for analysis by ensemble models(CNN + YoloV8), followed by lesion segmentation, report generation, telemedicine services, and chatbot functionality.',
    tech: ['Flask', 'YOLOv8', 'Python', 'CNN', 'Quantum ML', 'LLAMA2', 'SAM2'],
    links: {
      github: 'https://github.com/snigdhapaul2003/SKIN-O-VIS',
      external: ''
    },
    date: 'September, 2023 - December, 2024',
    categories: ['Medical', 'AI'],
    color: '#e14e4e',
    image: '/images/project-skin.jpg'
  },
  {
    id: 4,
    title: 'AITrendz',
    subtitle: 'Fashion Trend Generation',
    description: 'Developed a cutting-edge AI-powered system that generates highly realistic fashion images from simple text descriptions, hand-drawn sketches, or labeled design inputs. This solution harnesses the capabilities of advanced generative models—including diffusion-based image synthesis and prompt-tuned language models—to translate conceptual ideas into visually compelling fashion outputs.',
    tech: ['Stable Diffusion', 'ControlNet', 'Kandinsky', 'Gemini 1.5 Flash'],
    links: {
      github: 'https://github.com/snigdhapaul2003/AITrendz---Fashion-Trend-Generation',
      external: ''
    },
    date: 'June, 2024 - July, 2024',
    categories: ['AI', 'Generative AI'],
    color: '#a8b2d1',
    image: '/images/project-fashion.jpg',
    highlight: true
  },
  {
    id: 5,
    title: 'AutoAware',
    subtitle: 'Automatic Car Safety Alarm System',
    description: 'Developed a real-time object detection system using a custom YOLOv8 model with 92.5% accuracy on ExDark dataset, integrating live video feed, an alarm system, and a user interface for pedestrian and car detection with visual and auditory alerts.',
    tech: ['OpenCV', 'YOLOv8', 'DeepSort', 'Flask'],
    links: {
      github: 'https://github.com/snigdhapaul2003/SBSPS-Challenge-9890-SafeZone-Real-time-Video-Analytics-for-Industrial-Safety',
      external: ''
    },
    date: 'July, 2023 - August, 2023',
    categories: ['Computer Vision', 'AI'],
    color: '#5d8df7',
    image: '/images/project-auto.jpg'
  },
  {
    id: 6,
    title: ' Autism Spectrum Disorder Classification',
    subtitle: 'Autism Spectrum Disorder Classification: Harnessing the Power of Quantum and Traditional Classification',
    description: 'This study explores the use of sophisticated classifiers, such as LightGBM, XgBoost, Support Vector Classifier, Multilayer Perceptron, and Quantum Support Vector Machine Classifiers, to detect ASD.',
    tech: ['OpenCV', 'YOLOv8', 'DeepSort', 'Flask'],
    links: {
      github: '',
      external: ''
    },
    date: 'Jan, 2023 - April, 2023',
    categories: ['Machine Learning', 'AI'],
    color: '#5d8df7',
    image: '/images/project-auto.jpg'
  },
];

// Helper function to convert hex to RGB
function hexToRGB(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

// Helper function to format category name
function formatCategoryName(category) {
  return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
}

// Component for project filters
const ProjectFilters = ({ activeFilter, setActiveFilter, categories }) => (
  <motion.div 
    className="projects-filter"
    initial="hidden"
    animate="visible"
    variants={animations.filter}
  >
    <button 
      className={`filter-btn ${activeFilter === "all" ? "active" : ""}`} 
      onClick={() => setActiveFilter("all")}
    >
      All Projects
    </button>
    
    {categories.map(category => (
      <button 
        key={category}
        className={`filter-btn ${activeFilter === category ? "active" : ""}`} 
        onClick={() => setActiveFilter(category)}
      >
        {formatCategoryName(category)}
      </button>
    ))}
  </motion.div>
);

// Component for project card
const ProjectCard = ({ project, index, isHovered, onHover, onLeave, animateCards }) => (
  <motion.div 
    className={`project-card ${project.highlight ? 'highlight' : ''}`}
    key={project.id}
    custom={index}
    initial="hidden"
    animate={animateCards ? "visible" : "hidden"}
    variants={animations.card}
    onMouseEnter={() => onHover(project.id)}
    onMouseLeave={() => onLeave()}
    style={{
      '--project-color': project.color,
      '--project-color-rgb': hexToRGB(project.color)
    }}
  >
    {/* Default card view */}
    <div className="project-inner">
      <div className="project-top">
        <div className="project-header">
          <div className="project-icon" style={{ backgroundColor: `${project.color}15` }}>
            <FaCode />
          </div>
          <div className="project-links">
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`GitHub link for ${project.title}`}
                className="project-link"
              >
                <FaGithub />
              </a>
            )}
            {project.links.external && (
              <a 
                href={project.links.external} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`External link for ${project.title}`}
                className="project-link"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
        
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-subtitle">{project.subtitle}</div>
          
          <div className="project-description">
            <p>{project.description}</p>
          </div>
        </div>
      </div>
      
      <div className="project-footer">
        <div className="project-meta">
          <div className="project-date">
            <FaCalendarAlt />
            <span>{project.date}</span>
          </div>
          
          <div className="project-info">
            <FaInfoCircle />
            <span>{project.tech.length} Technologies</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Hover overlay */}
    <div 
      className={`project-hover-overlay ${isHovered ? 'active' : ''}`}
      style={{ backgroundImage: `url(${project.image || 'https://via.placeholder.com/400x200'})` }}
    >
      <div className="overlay-gradient"></div>
      
      <div className="overlay-content">
        <div className="overlay-content-inner">
          <h3>{project.title}</h3>
          
          <div className="overlay-categories">
            {project.categories.map((category, i) => (
              <span key={i} className="overlay-category-tag">
                {formatCategoryName(category)}
              </span>
            ))}
          </div>
          
          <div className="overlay-tech">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
            {project.tech.length > 3 && 
              <span className="more-tech">+{project.tech.length - 3}</span>}
          </div>
          
          <div className="overlay-links">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="overlay-link">
                <FaGithub /> View Code
              </a>
            )}
            {project.links.external && (
              <a href={project.links.external} target="_blank" rel="noopener noreferrer" className="overlay-link">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Main Projects component
const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [animateCards, setAnimateCards] = useState(false);
  const projectsRef = useRef(null);

  // Set up intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateCards(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  // Extract unique categories from all projects
  const uniqueCategories = [...new Set(projectsData.flatMap(project => project.categories))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      {/* Background elements */}
      <div className="projects-bg-blur-circle"></div>
      <div className="projects-bg-glow"></div>
      <div className="projects-bg-grid"></div>
      
      <div className="container">
        {/* Section header */}
        <motion.div 
          className="projects-header"
          initial="hidden"
          animate="visible"
          variants={animations.header}
        >
          <div className="heading-wrapper">
            <h2 className="heading">Featured Projects</h2>
            <div className="heading-line"></div>
          </div>
          
          {/* Project filters */}
          <ProjectFilters 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            categories={uniqueCategories}
          />
        </motion.div>
        
        {/* Projects grid */}
        <div className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project} 
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={setHoveredProject}
                onLeave={() => setHoveredProject(null)}
                animateCards={animateCards}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* "See more" button */}
        <motion.div 
          className="more-projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://github.com/snigdhapaul2003" target="_blank" rel="noopener noreferrer" className="more-btn">
            See More on GitHub <FaGithub /> <FaArrowRight className="arrow-icon" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;