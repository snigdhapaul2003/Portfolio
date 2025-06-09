import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaQuoteLeft, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/Publications.css';

const Publications = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");
  
  const publications = [
    {
      id: 1,
      title: 'Exploring the Efficacy of Partial Denoising Using Bit Plane Slicing for Enhanced Fracture Identification: A Comparative Study of Deep Learning Based Approaches and Handcrafted Feature Extraction Techniques',
      journal: 'IEEE (PUNECON 2023)',
      authors: 'Snigdha Paul, Sambit Mallick, Dr. Anindya Sen',
      date: '2024',
      url: 'https://doi.org/10.1109/PuneCon58714.2023.10450051',
      type: 'co-author',
      abstract: 'This study explores partial denoising with bit plane slicing for improved fracture detection, comparing deep learning approaches with traditional feature extraction methods.',
      keywords: ['Bit Plane Slicing', 'Fracture Detection', 'Deep Learning', 'Feature Extraction']
    },
    {
      id: 2,
      title: 'A Novel Approach to Breast Cancer Histopathological Image Classification Using Cross-Colour Space Feature Fusion and Quantum-Classical Stack Ensemble Method',
      journal: 'Springer (ICADCML 2024)',
      authors: 'Sambit Mallick, Snigdha Paul, Dr. Anindya Sen',
      date: '2024',
      url: 'https://doi.org/10.1007/978-981-97-1841-2',
      type: 'co-author',
      abstract: 'A novel approach combining cross-colour space feature fusion with quantum-classical stack ensemble methods for superior breast cancer histopathological image classification.',
      keywords: ['Quantum Computing', 'Breast Cancer', 'Image Classification', 'Ensemble Methods']
    },
    {
      id: 3,
      title: 'Advanced Descriptor Techniques for Quantum Enhanced Autism Spectrum Disorder Detection',
      journal: 'Springer (ICIIoT 2024)',
      authors: 'Sambit Mallick, Snigdha Paul, Debdeep Mitra, Jacob Vishal, Aniket Das, Rik Das',
      date: '2024',
      note: 'Oral presentation successfully delivered',
      type: 'co-author',
      abstract: 'Utilizes advanced descriptor techniques with quantum enhancement to improve autism spectrum disorder detection methodologies.',
      keywords: ['Quantum Computing', 'Autism Detection', 'Medical Imaging', 'Descriptor Techniques']
    },
    {
      id: 4,
      title: 'Exploring the Benefits of Ensemble Techniques Involving MIDAS and MonoDepth2 Models for Monocular Depth Estimation',
      journal: 'IEEE (C3IT 2024)',
      authors: 'Debdeep Mitra, Sambit Mallick, Snigdha Paul, Dr. Amlan Chakrabarti, Dola Gupta',
      date: '2024',
      url: 'https://doi.org/10.1109/C3IT60531.2024.10829443',
      type: 'co-author',
      abstract: 'This research evaluates and demonstrates the advantages of combining MIDAS and MonoDepth2 models through ensemble techniques to enhance monocular depth estimation accuracy.',
      keywords: ['Depth Estimation', 'Ensemble Learning', 'Computer Vision', 'MIDAS', 'MonoDepth2']
    },
    {
      id: 5,
      title: 'A Comparative Study of Multiple Deep Learning Algorithms for Efficient Localization of Bone Joints in the Upper Limbs of Human Body',
      journal: 'Springer (ICCVBIT)',
      authors: 'Soumalya Bose, Soham Basu, Indranil Bera, Sambit Mallick, Snigdha Paul, Saumodip Das, Swarnendu Sil, Swarnava Ghosh, Dr. Anindya Sen',
      date: '2023',
      url: 'https://doi.org/10.1007/978-981-19-9819-5_46',
      type: 'co-author',
      abstract: 'A comprehensive comparison of various deep learning algorithms for accurately localizing bone joints in the upper limbs of the human body.',
      keywords: ['Deep Learning', 'Bone Joint Localization', 'Medical Imaging', 'Computer Vision']
    }
  ];

  const filteredPublications = filter === "all" 
    ? publications 
    : publications.filter(pub => pub.type === filter);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="publications" className="publications">
      <div className="publications-bg-element"></div>
      <div className="publications-bg-element-2"></div>
      
      <div className="container">
        <div className="publications-header">
          <motion.h2 
            className="heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Research Publications
          </motion.h2>
          
          <motion.div 
            className="publications-filter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

          </motion.div>
        </div>
        
        <motion.div 
          className="publications-count"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Showing <span>{filteredPublications.length}</span> of <span>{publications.length}</span> publications
        </motion.div>
        
        <div className="publications-grid">
          <AnimatePresence>
            {filteredPublications.map((pub, index) => (
              <motion.div 
                key={pub.id}
                className={`publication-card ${expandedId === pub.id ? 'expanded' : ''} ${pub.type === 'first-author' ? 'highlight' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
              >
                <div className="publication-top">
                  <div className="publication-meta">
                    <div className="publication-date">
                      <span>{pub.date}</span>
                      {pub.type === 'first-author' && (
                        <div className="author-badge">First Author</div>
                      )}
                    </div>
                    <div className="publication-journal-badge">
                      {pub.journal.split(' ')[0]}
                    </div>
                  </div>
                  
                  <h3 className="publication-title">
                    {pub.title}
                  </h3>
                  
                  <div className="publication-bottom">
                    <div className="authors-container">
                      <FaQuoteLeft className="quote-icon" />
                      <p className="publication-authors">{pub.authors}</p>
                    </div>
                    
                    <div className="publication-actions">
                      {pub.url && (
                        <a 
                          href={pub.url} 
                          className="publication-link"
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="View publication"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      <button 
                        className="expand-btn"
                        onClick={() => toggleExpand(pub.id)}
                        aria-label={expandedId === pub.id ? "Collapse details" : "Expand details"}
                      >
                        {expandedId === pub.id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedId === pub.id && (
                    <motion.div 
                      className="publication-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="abstract-section">
                        <h4>Abstract</h4>
                        <p>{pub.abstract}</p>
                      </div>
                      
                      <div className="keywords-section">
                        <h4>Keywords</h4>
                        <div className="keywords-list">
                          {pub.keywords.map((keyword, i) => (
                            <span key={i} className="keyword">{keyword}</span>
                          ))}
                        </div>
                      </div>
                      
                      {pub.note && (
                        <div className="note-section">
                          <h4>Note</h4>
                          <p>{pub.note}</p>
                        </div>
                      )}
                      
                      {pub.url && (
                        <a 
                          href={pub.url} 
                          className="full-paper-link"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View Full Paper <FaExternalLinkAlt />
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Publications;