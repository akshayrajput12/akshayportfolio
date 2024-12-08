import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, MousePointerClick, ArrowDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text } from '@react-three/drei';
import { useRef, useEffect } from 'react';

const Hero = () => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  // New hook to trigger animations when section is in view
  const isInView = useInView(containerRef, {
    once: false,  // Allow repeated animations
    amount: 0.1   // Trigger when at least 10% of the section is visible
  });

  const roles = ["Frontend Developer", "UI/UX Designer", "Creative Developer"];
  
  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a] pt-20 md:pt-24 lg:pt-32"
    >
      {/* Animated Background Sphere */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ opacity }}
      >
        <Canvas>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#2a0845"
              attach="material"
              distort={0.5}
              speed={1.5}
              roughness={0.5}
              metalness={0.8}
            />
          </Sphere>
        </Canvas>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full"
        style={{ y }}
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-xl md:text-2xl text-purple-400 font-light">Hi, I Am</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          ref={nameRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-2 relative"
        >
          <div className="flex flex-wrap justify-center items-center gap-2">
            {["AKSHAY", "PRATAP", "SINGH"].map((word, wordIndex) => (
              <div key={word} className="flex">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${word}-${letter}-${letterIndex}`}
                    className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text animate-gradient"
                    initial={{ 
                      opacity: 0, 
                      scale: 0.5,
                      rotate: -180,
                      y: 50 
                    }}
                    animate={isInView ? { 
                      opacity: 1, 
                      scale: 1,
                      rotate: 0,
                      y: 0 
                    } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + (wordIndex * 0.3) + (letterIndex * 0.1),
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }}
                    whileHover={{
                      scale: 1.2,
                      color: '#06b6d4',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
          <motion.span
            className="absolute -top-4 -right-4 text-pink-500 text-4xl"
            animate={{
              rotate: [0, 14, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ✦
          </motion.span>
        </motion.h1>

        {/* Animated Role Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-20 mb-8"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role}
              className="absolute w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [20, 0, 0, -20],
              }}
              transition={{
                duration: 4,
                delay: index * 4,
                repeat: Infinity,
                repeatDelay: roles.length * 4 - 4,
              }}
            >
              <h2 className="text-2xl md:text-4xl font-light text-gray-300">
                {role}
              </h2>
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto"
        >
          An enthusiastic and dedicated frontend developer with a passion for crafting seamless, 
          user-centric digital experiences. I thrive on turning creative ideas into visually 
          appealing and functional websites that leave a lasting impression.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 rounded-full text-white font-semibold flex items-center gap-2 group transition-transform"
          >
            <span>Let's Talk</span>
            <MousePointerClick className="group-hover:rotate-12 transition-transform" size={20} />
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-purple-500 rounded-full text-purple-400 font-semibold hover:bg-purple-500/10 transition-colors"
          >
            View Projects
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-6"
        >
          {[
            { Icon: Github, href: "#", label: "GitHub" },
            { Icon: Linkedin, href: "#", label: "LinkedIn" },
            { Icon: Twitter, href: "#", label: "Twitter" },
            { Icon: Mail, href: "#", label: "Email" }
          ].map(({ Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ 
                scale: 1.2,
                color: ["#ec4899", "#8b5cf6", "#06b6d4"][index % 3]
              }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors p-2 relative group"
            >
              <Icon size={24} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-gray-400"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;