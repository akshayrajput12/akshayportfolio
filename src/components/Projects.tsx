import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import golff from '../assets/images/golf.png';
import adev from '../assets/images/webdev.png';
import rahul from '../assets/images/rahulpublic.png';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const projects = [
    {
      title: "Gollfff Portfolio",
      description: "A sleek, modern, and fully responsive personal portfolio website.",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      image: golff,
      liveLink: "https://gollfff.netlify.app",
      githubLink: "#"
    },
    {
      title: "Adev Web Agency",
      description: "A highly engaging and animated website for web development services.",
      technologies: ["React", "GSAP", "Locomotive Scroll", "Responsive Design"],
      image: adev,
      liveLink: "https://adevweb.netlify.app",
      githubLink: "#"
    },
    {
      title: "Rahul Public School",
      description: "An aesthetic and highly animated modern school website.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Animations"],
      image: rahul,
      liveLink: "https://rahulpublicschool.vercel.app",
      githubLink: "#"
    }
  ];

  const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [-15, 15]);
    const rotateY = useTransform(x, [-100, 100], [15, -15]);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        x.set(deltaX);
        y.set(deltaY);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    return (
      <motion.div 
        ref={cardRef}
        className="project-card-container perspective-1000 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          transition: 'transform 0.1s ease-out'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          scale: inView ? 1 : 0.9 
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
        }}
      >
        <div 
          className={`
            relative overflow-hidden rounded-3xl shadow-2xl
            bg-gradient-to-br from-purple-500 to-pink-500
            transform transition-all duration-500
            ${isHovered ? 'scale-105' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered 
              ? 'translateZ(50px)' 
              : 'translateZ(0)'
          }}
        >
          {/* Background Blurred Overlay */}
          <div 
            className="absolute inset-0 opacity-20 bg-blend-overlay"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(15px)'
            }}
          />

          {/* Project Image */}
          <motion.div 
            className="relative z-10 overflow-hidden"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className={`
                w-full h-64 object-cover transition-all duration-500
                group-hover:scale-110 group-hover:brightness-50
              `}
            />
          </motion.div>

          {/* Project Details Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-20 bg-black bg-opacity-70 
                           flex flex-col justify-center items-center 
                           text-white p-6 text-center"
                style={{ 
                  transform: 'translateZ(80px)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 className="text-2xl font-bold mb-2 tracking-wider">
                  {project.title}
                </h3>
                <p className="text-sm mb-4 opacity-80">
                  {project.description}
                </p>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-white bg-opacity-20 
                                 rounded-full text-xs tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-4">
                  <motion.a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white text-black px-4 py-2 
                               rounded-full text-sm font-semibold 
                               hover:bg-opacity-80 transition-all"
                  >
                    View Project
                  </motion.a>
                  <motion.a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="border border-white text-white 
                               px-4 py-2 rounded-full text-sm 
                               hover:bg-white hover:text-black 
                               transition-all"
                  >
                    GitHub
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.section 
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-wider text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        My <span className="text-purple-500">Projects</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <AnimatePresence>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        className="view-more mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
      >
        <motion.button 
          onClick={() => navigate('/all-projects')}
          className="btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          View All Projects <i className='bx bx-chevron-right ml-2'></i>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Projects;