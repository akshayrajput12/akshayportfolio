import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import project images
import golff from '../assets/images/golf.png';
import adev from '../assets/images/webdev.png';
import rahul from '../assets/images/rahulpublic.png';
import education from '../assets/images/education.png';
import shoes from '../assets/images/shoes.png';
import bioclin from '../assets/images/bioclin.png';
import buzzevent from '../assets/images/buzzevent.png';
import newconcept from '../assets/images/newconcept.png';

const projectCategories = [
  'Web Development',
  'UI/UX Design',
  'E-commerce',
  'Responsive Design',
  'Educational',
  'Corporate'
];

const allProjects = [
  {
    id: 1,
    title: "Gollfff Portfolio",
    description: "A sleek, modern, and fully responsive personal portfolio website.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    image: golff,
    category: "Web Development",
    githubLink: "#",
    liveLink: "https://gollfff.netlify.app",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Adev Web Agency",
    description: "A highly engaging and animated website for web development services.",
    technologies: ["React", "GSAP", "Locomotive Scroll", "Responsive Design"],
    image: adev,
    category: "UI/UX Design",
    githubLink: "#",
    liveLink: "https://adevweb.netlify.app",
    color: "from-blue-500 to-green-500"
  },
  {
    id: 3,
    title: "Rahul Public School",
    description: "An aesthetic and highly animated modern school website.",
    technologies: ["React", "Tailwind CSS", "Animations"],
    image: rahul,
    category: "Educational",
    githubLink: "#",
    liveLink: "https://rahulpublicschool.vercel.app",
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: 4,
    title: "Education Online",
    description: "A modern, responsive platform for online learning.",
    technologies: ["Bootstrap", "HTML", "CSS", "JavaScript"],
    image: education,
    category: "Educational",
    githubLink: "#",
    liveLink: "https://educationonline1.netlify.app",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 5,
    title: "Shoes Retails",
    description: "A fully responsive and dynamic e-commerce platform for footwear.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: shoes,
    category: "E-commerce",
    githubLink: "#",
    liveLink: "https://shoesreatails.netlify.app",
    color: "from-green-500 to-blue-500"
  },
  {
    id: 6,
    title: "BioClinPharm",
    description: "A comprehensive website for a data science company specializing in clinical trials and research.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: bioclin,
    category: "Corporate",
    githubLink: "#",
    liveLink: "https://www.bioclinpharm.com",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 7,
    title: "Buzz Events Planner",
    description: "A vibrant and highly animated website for event planning services.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Animation Libraries"],
    image: buzzevent,
    category: "UI/UX Design",
    githubLink: "#",
    liveLink: "https://buzzeventss.netlify.app",
    color: "from-pink-500 to-purple-500"
  },
  {
    id: 8,
    title: "New Concept Point",
    description: "A modern website for an educational coaching center with a clean UI/UX design.",
    technologies: ["HTML5", "CSS3", "JavaScript", "UI/UX Design"],
    image: newconcept,
    category: "Educational",
    githubLink: "#",
    liveLink: "https://newconceptpoint.netlify.app",
    color: "from-blue-500 to-green-500"
  }
];

const ProjectCard: React.FC<{ 
  project: typeof allProjects[0], 
  isHovered: boolean, 
  onHoverChange: (hovered: boolean) => void 
}> = ({ project, isHovered, onHoverChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [-15, 15]);
  const rotateY = useTransform(x, [-100, 100], [15, -15]);
  const navigate = useNavigate();

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
    onHoverChange(false);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="project-card-container perspective-1000 cursor-pointer group"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        transition: 'transform 0.1s ease-out'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
      }}
    >
      <div 
        className={`
          relative overflow-hidden rounded-3xl shadow-2xl
          bg-gradient-to-br ${project.color}
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

const AllProjects: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory 
    ? allProjects.filter(project => project.category === selectedCategory)
    : allProjects;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute top-4 left-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button 
          onClick={() => navigate('/')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center"
        >
          <i className='bx bx-arrow-back mr-2'></i> Back to Home
        </button>
      </motion.div>

      <motion.h1 
        className="text-5xl font-bold text-center text-white mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        All <span className="text-purple-500">Projects</span>
      </motion.h1>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-12">
        {[null, ...projectCategories].map((category) => (
          <motion.button
            key={category || 'All'}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-full text-white transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-purple-600 scale-110' 
                : 'bg-gray-800 hover:bg-purple-500'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category || 'All'}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              isHovered={hoveredProject === project.id}
              onHoverChange={(hovered) => 
                setHoveredProject(hovered ? project.id : null)
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          No projects found in this category.
        </div>
      )}
    </motion.div>
  );
};

export default AllProjects;
