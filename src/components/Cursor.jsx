import React, { useEffect, useState, useRef } from 'react';
import '../styles/Cursor.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const trailsRef = useRef([]);
  const spotlightRef = useRef(null);
  const maxTrails = 8;
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      
      // Update spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${clientX}px`;
        spotlightRef.current.style.top = `${clientY}px`;
        spotlightRef.current.style.opacity = '1';
        
        // Reset the animation
        spotlightRef.current.classList.remove('animate');
        void spotlightRef.current.offsetWidth; // Trigger reflow
        spotlightRef.current.classList.add('animate');
      }
      
      // Update trail positions with a delay
      if (trailsRef.current.length > 0) {
        // Shift all existing positions
        for (let i = trailsRef.current.length - 1; i > 0; i--) {
          const currentTrail = trailsRef.current[i];
          const prevTrail = trailsRef.current[i-1];
          
          // Add a slight delay by positioning each trail element
          setTimeout(() => {
            if (currentTrail && prevTrail) {
              currentTrail.style.left = prevTrail.style.left;
              currentTrail.style.top = prevTrail.style.top;
              currentTrail.style.opacity = (1 - i / maxTrails).toString();
            }
          }, i * 40);
        }
        
        // Set the first trail to current position
        setTimeout(() => {
          if (trailsRef.current[0]) {
            trailsRef.current[0].style.left = `${clientX}px`;
            trailsRef.current[0].style.top = `${clientY}px`;
          }
        }, 40);
      }
    };

    const handleMouseDown = () => {
      setClicked(true);
      
      // Create a ripple effect on click
      if (spotlightRef.current) {
        spotlightRef.current.classList.add('clicked');
        setTimeout(() => {
          if (spotlightRef.current) {
            spotlightRef.current.classList.remove('clicked');
          }
        }, 800);
      }
      
      setTimeout(() => {
        setClicked(false);
      }, 150);
    };

    const handleMouseLeave = () => {
      setHidden(true);
      
      // Hide spotlight and trails
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
      trailsRef.current.forEach(trail => {
        if (trail) {
          trail.style.opacity = '0';
        }
      });
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverIn = () => {
      setLinkHovered(true);
    };

    const handleLinkHoverOut = () => {
      setLinkHovered(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverIn);
      link.addEventListener('mouseleave', handleLinkHoverOut);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverIn);
        link.removeEventListener('mouseleave', handleLinkHoverOut);
      });
    };
  }, []);

  useEffect(() => {
    // Initialize trail elements reference array
    trailsRef.current = document.querySelectorAll('.cursor-trail');
    spotlightRef.current = document.querySelector('.cursor-spotlight');
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-outline ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${linkHovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      
      {/* Spotlight effect */}
      <div className="cursor-spotlight animate" />
      
      {/* Multiple trail elements */}
      {[...Array(maxTrails)].map((_, index) => (
        <div key={index} className={`cursor-trail trail-${index}`} />
      ))}
    </>
  );
};

export default Cursor;