import React, { useEffect, useRef } from 'react';

const DynamicBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const gradientPointsRef = useRef([]);
  const timeRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create gradient points
      initGradientPoints();
      initParticles();
    };
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Create floating gradient points
    const initGradientPoints = () => {
      gradientPointsRef.current = [];
      const numPoints = 6;
      
      for (let i = 0; i < numPoints; i++) {
        gradientPointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 150 + Math.random() * 200,
          color: i % 2 === 0 ? 'rgba(100, 255, 218, 0.15)' : 'rgba(136, 146, 176, 0.15)',
          speed: {
            x: (Math.random() - 0.5) * 0.3,
            y: (Math.random() - 0.5) * 0.3
          }
        });
      }
    };
    
    // Create particles
    const initParticles = () => {
      particlesRef.current = [];
      const numParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < numParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    // Draw mesh grid
    const drawMesh = () => {
      const gridSize = 100;
      const numX = Math.ceil(canvas.width / gridSize) + 1;
      const numY = Math.ceil(canvas.height / gridSize) + 1;
      
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < numX; x++) {
        for (let y = 0; y < numY; y++) {
          const posX = x * gridSize;
          const posY = y * gridSize;
          
          // Calculate distance from mouse
          const dx = mouseRef.current.x - posX;
          const dy = mouseRef.current.y - posY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 250;
          
          if (distance < maxDistance) {
            const influence = (maxDistance - distance) / maxDistance;
            
            // Draw cross for each grid point
            ctx.beginPath();
            ctx.moveTo(posX - 4, posY);
            ctx.lineTo(posX + 4, posY);
            ctx.moveTo(posX, posY - 4);
            ctx.lineTo(posX, posY + 4);
            
            // Change color based on mouse proximity
            const alpha = 0.1 + influence * 0.3;
            ctx.strokeStyle = `rgba(100, 255, 218, ${alpha})`;
            ctx.stroke();
          } else {
            // Draw subtle dots for each grid point
            ctx.beginPath();
            ctx.arc(posX, posY, 1, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(136, 146, 176, 0.1)';
            ctx.fill();
          }
        }
      }
    };
    
    // Draw flowing lines
    const drawFlowingLines = () => {
      const numLines = 6;
      const amplitude = canvas.height / 8;
      const frequency = Math.PI * 2 / canvas.width;
      
      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 5) {
          const offsetY = i * (canvas.height / (numLines + 1));
          const y = offsetY + Math.sin((x * frequency) + (i * 0.5) + timeRef.current) * amplitude;
          
          // Calculate distance from mouse
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          let lineY = y;
          
          // Distort line based on mouse proximity
          if (distance < maxDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (maxDistance - distance) / maxDistance * 60;
            lineY = y + Math.sin(angle) * force;
          }
          
          if (x === 0) {
            ctx.moveTo(x, lineY);
          } else {
            ctx.lineTo(x, lineY);
          }
        }
        
        ctx.strokeStyle = `rgba(100, 255, 218, ${0.03 + (i * 0.01)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      timeRef.current += 0.005;
      
      // Draw background elements
      drawFlowingLines();
      drawMesh();
      
      // Update and draw gradient points
      gradientPointsRef.current.forEach(point => {
        // Move the point
        point.x += point.speed.x;
        point.y += point.speed.y;
        
        // Bounce off edges
        if (point.x < -point.radius) point.x = canvas.width + point.radius;
        if (point.x > canvas.width + point.radius) point.x = -point.radius;
        if (point.y < -point.radius) point.y = canvas.height + point.radius;
        if (point.y > canvas.height + point.radius) point.y = -point.radius;
        
        // Draw gradient
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius
        );
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(10, 25, 47, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Move the particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        let size = particle.size;
        let opacity = particle.opacity;
        
        // Enlarge particles near the mouse
        if (distance < maxDistance) {
          const influence = (maxDistance - distance) / maxDistance;
          size = particle.size * (1 + influence);
          opacity = particle.opacity * (1 + influence * 2);
        }
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dynamic-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -3,
        pointerEvents: 'none'
      }}
    />
  );
};

export default DynamicBackground;