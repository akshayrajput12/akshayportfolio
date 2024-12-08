import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Lightbulb, 
  ArrowRight, 
  Code, 
  Layers, 
  Server, 
  PaintBucket, 
  Cpu, 
  Wrench, 
  Braces, 
  Terminal, 
  GitBranch, 
  Share2 
} from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Vector3 } from 'three';
import akshay from '../assets/akshay.jpg'
import cv from '../assets/cv.pdf'



const AnimatedLetters = ({ text, className = '' }) => {
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

const CursorTrackingImage = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [perspective, setPerspective] = useState(1000);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const rotationX = (event.clientY - centerY) / (height / 2) * 15;
      const rotationY = (event.clientX - centerX) / (width / 2) * -15;

      setRotation({ x: rotationX, y: rotationY });
      setPerspective(1200 + Math.abs(rotationX + rotationY) * 10);
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
      setPerspective(1000);
    };

    const currentRef = containerRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);
    currentRef?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
      currentRef?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="relative group overflow-hidden"
      style={{
        width: '80%',
        maxWidth: '400px',
        aspectRatio: '1/1',
        margin: '0 auto',
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.9,
        rotateX: 20,
        rotateY: -20
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateX: 0,
        rotateY: 0
      }}
      transition={{ 
        duration: 0.8, 
        type: "spring", 
        stiffness: 100 
      }}
    >
      {/* Background Gradient Layer */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
      />

      {/* Image Container with 3D Rotation Effect */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          transform: `
            perspective(${perspective}px) 
            rotateX(${rotation.x}deg) 
            rotateY(${rotation.y}deg) 
            translateZ(50px)
          `,
          transformStyle: 'preserve-3d',
          borderRadius: '20px',
          overflow: 'hidden'
        }}
      >
        <motion.img 
          src={akshay} 
          alt="Akshay Pratap Singh"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `
              scale(1.1) 
              translateZ(30px)
            `,
            filter: 'brightness(0.9) contrast(1.1)',
            borderRadius: '20px'
          }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.3 }
          }}
        />
      </motion.div>

      {/* Floating Overlay Effect */}
      <motion.div 
        className="absolute inset-0 z-20 border-4 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

const techStacks = [
  { 
    name: "React.js", 
    icon: Layers,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    category: "Frontend"
  },
  { 
    name: "TypeScript", 
    icon: Code,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    category: "Programming Languages"
  },
  { 
    name: "Node.js", 
    icon: Server,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    category: "Backend"
  },
  { 
    name: "Three.js", 
    icon: Cpu,
    color: "text-gray-700",
    bgColor: "bg-gray-700/10",
    category: "Graphics"
  },
  { 
    name: "Tailwind CSS", 
    icon: PaintBucket,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    category: "Styling"
  },
  { 
    name: "Git", 
    icon: GitBranch,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    category: "Version Control"
  },
  { 
    name: "Next.js", 
    icon: Share2,
    color: "text-black",
    bgColor: "bg-black/10",
    category: "Framework"
  },
  { 
    name: "GraphQL", 
    icon: Braces,
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
    category: "API"
  },
  { 
    name: "Docker", 
    icon: Terminal,
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
    category: "DevOps"
  },
  { 
    name: "MongoDB", 
    icon: Layers,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    category: "Database"
  },
  { 
    name: "Redux", 
    icon: Wrench,
    color: "text-purple-700",
    bgColor: "bg-purple-700/10",
    category: "State Management"
  },
  { 
    name: "Framer Motion", 
    icon: Lightbulb,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    category: "Animation"
  }
];

const TechStackIcon = ({ tech }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!iconRef.current) return;

    const rect = iconRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotationX = (e.clientY - centerY) / (rect.height / 2) * 15;
    const rotationY = (e.clientX - centerX) / (rect.width / 2) * -15;

    setRotation({ x: rotationX, y: rotationY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const TechIcon = tech.icon;

  return (
    <motion.div 
      ref={iconRef}
      className={`
        relative group cursor-pointer overflow-hidden 
        w-32 h-32 flex items-center justify-center 
        rounded-2xl transition-all duration-300
        ${tech.bgColor} border border-white/10
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `
          perspective(1000px) 
          rotateX(${rotation.x}deg) 
          rotateY(${rotation.y}deg)
          translateZ(${isHovered ? 20 : 0}px)
        `,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? '0 20px 40px -10px rgba(0, 0, 0, 0.3)' 
          : '0 10px 25px -12px rgba(0, 0, 0, 0.1)'
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.9,
        rotateX: 20,
        rotateY: -20
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateX: 0,
        rotateY: 0
      }}
      transition={{ 
        duration: 0.6, 
        type: "spring", 
        stiffness: 120 
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      {/* Icon Container with 3D Depth */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{
          transform: `translateZ(${isHovered ? 30 : 0}px)`,
          scale: isHovered ? 1.1 : 1,
          transition: 'transform 0.3s ease'
        }}
      >
        <TechIcon 
          className={`
            w-14 h-14 
            ${tech.color}
            transition-all duration-300
          `} 
        />
        <p 
          className={`
            text-xs mt-2 font-medium 
            ${tech.color} 
            opacity-70 group-hover:opacity-100 
            transition-opacity duration-300
          `}
        >
          {tech.name}
        </p>
      </motion.div>

      {/* Hover Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${tech.color}, transparent)`,
          borderRadius: '1rem'
        }}
      />
    </motion.div>
  );
};

const TechStackSection = () => {
  return (
    <motion.div 
      className="w-full py-16 bg-transparent"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
          {techStacks.map((tech, index) => (
            <motion.div 
              key={tech.name}
              initial={{ 
                opacity: 0, 
                y: 50,
                scale: 0.8
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
              className="flex justify-center"
            >
              <TechStackIcon tech={tech} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: false,
    amount: 0.1 
  });

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Simple Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text">
            ABOUT ME
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 relative grid md:grid-cols-2 gap-16 items-center"
        >
          {/* 3D Profile Image */}
          <div className="w-full flex justify-center items-center">
            <CursorTrackingImage />
          </div>

          {/* About Text */}
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              I'm a passionate developer and designer with a keen eye for detail and a love for creating
              beautiful, functional web experiences. My journey in technology is driven by curiosity, 
              innovation, and the desire to solve complex problems through elegant digital solutions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-4"
            >
              <a 
                href="#contact" 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </a>
              <a 
                href={cv} 
                target="_blank" 
                className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Download CV
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <TechStackSection />
      </div>
    </section>
  );
};

export default About;