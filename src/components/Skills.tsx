import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import {
  Code, 
  Database, 
  PaintBucket, 
  Wrench, 
  Server, 
  Layers, 
  Cpu, 
  Smartphone, 
  Globe, 
  Zap,
  Braces,
  Terminal, 
  Share2,
  GitBranch 
} from 'lucide-react';

// 3D Skill Cube Component
function SkillCube(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" opacity={0.7} transparent />
    </mesh>
  );
}

// Background Stars Component
function BackgroundStars() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}

const categoryIcons = {
  "Frontend": Code,
  "Backend": Server,
  "Design": PaintBucket,
  "Tools": Wrench,
  "Mobile": Smartphone,
  "Web": Globe,
  "Performance": Zap,
  "Algorithms": Braces,
  "Programming Languages": Terminal,
  "System Design": Share2,
  "Version Control": GitBranch
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = [
    { 
      name: "React.js", 
      level: 90, 
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      category: "Frontend"
    },
    { 
      name: "TypeScript", 
      level: 85, 
      icon: Code,
      color: "from-blue-600 to-indigo-600",
      category: "Programming Languages"
    },
    { 
      name: "UI/UX Design", 
      level: 88, 
      icon: PaintBucket,
      color: "from-purple-500 to-pink-500",
      category: "Design"
    },
    { 
      name: "Node.js", 
      level: 82, 
      icon: Server,
      color: "from-green-500 to-teal-500",
      category: "Backend"
    },
    { 
      name: "Three.js", 
      level: 75, 
      icon: Cpu,
      color: "from-gray-600 to-gray-800",
      category: "Frontend"
    },
    { 
      name: "Figma", 
      level: 85, 
      icon: Wrench,
      color: "from-red-500 to-orange-500",
      category: "Tools"
    },
    { 
      name: "Data Structures", 
      level: 90, 
      icon: Braces,
      color: "from-emerald-500 to-green-600",
      category: "Algorithms"
    },
    { 
      name: "Algorithms", 
      level: 88, 
      icon: Braces,
      color: "from-indigo-500 to-purple-600",
      category: "Algorithms"
    },
    { 
      name: "C++", 
      level: 85, 
      icon: Terminal,
      color: "from-blue-700 to-cyan-700",
      category: "Programming Languages"
    },
    { 
      name: "System Design", 
      level: 80, 
      icon: Share2,
      color: "from-orange-500 to-amber-600",
      category: "System Design"
    },
    { 
      name: "Git & Version Control", 
      level: 90, 
      icon: GitBranch,
      color: "from-red-600 to-pink-600",
      category: "Version Control"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotateX: -20 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 300
      }
    }
  };

  return (
    <section 
      id="skills" 
      className="relative min-h-screen py-12 px-4 bg-[rgb(10 10 10 / var(--tw-bg-opacity))] overflow-hidden"
    >
      {/* 3D Background Stars */}
      <BackgroundStars />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 relative"
        >
          {/* Skills Progress Bars with 3D Effect */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4 perspective-1000"
          >
            {skills.map((skill, index) => {
              const SkillIcon = skill.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03,
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-gray-900/60 p-3 rounded-xl backdrop-blur-lg shadow-xl border border-purple-500/20 transform transition-transform duration-300 hover:shadow-purple-500/50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <SkillIcon 
                        className={`w-5 h-5 bg-gradient-to-r ${skill.color} text-white p-1 rounded-full shadow-lg`} 
                      />
                      <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                    </div>
                    <span className="text-purple-400 font-semibold text-xs">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1,
                        type: "spring",
                        damping: 12
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-md`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Skill Categories with 3D Cubes */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 perspective-1000"
          >
            {[
              {
                title: "Frontend",
                skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
                description: "Crafting interactive and responsive web interfaces"
              },
              {
                title: "Backend",
                skills: ["Node.js", "Express", "MongoDB", "System Design"],
                description: "Building robust and scalable server-side solutions"
              },
              {
                title: "Programming",
                skills: ["C++", "Algorithms", "Data Structures"],
                description: "Strong foundation in computer science principles"
              },
              {
                title: "Tools",
                skills: ["Git", "Figma", "VS Code", "Docker"],
                description: "Leveraging powerful development and design tools"
              }
            ].map((category, index) => {
              const CategoryIcon = categoryIcons[category.title as keyof typeof categoryIcons] || Layers;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03,
                    rotateX: 10,
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="relative bg-gray-900/60 p-4 rounded-xl backdrop-blur-lg 
                    border border-purple-500/20 shadow-xl hover:shadow-purple-500/50 
                    transition-all duration-300 transform h-full"
                >
                  {/* 3D Cube in Background */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-30">
                    <Canvas>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <SkillCube position={[0, 0, 0]} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>

                  <div className="flex items-center mb-2 space-x-2 relative z-10">
                    <CategoryIcon 
                      className="w-6 h-6 text-purple-400 
                        group-hover:rotate-12 transition-transform duration-300" 
                    />
                    <h3 className="text-lg font-semibold text-purple-400">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-2 text-xs relative z-10">
                    {category.description}
                  </p>
                  <ul className="space-y-1 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: skillIndex * 0.1 }}
                        className="text-gray-300 flex items-center space-x-1 
                          group/skill hover:text-purple-300 transition-colors text-xs"
                      >
                        <span className="w-1 h-1 bg-purple-500 
                          group-hover/skill:bg-purple-300 rounded-full" />
                        <span>{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;