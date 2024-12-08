import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/yourusername", 
      label: "GitHub" 
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com/in/yourusername", 
      label: "LinkedIn" 
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/yourusername", 
      label: "Twitter" 
    },
    { 
      icon: Mail, 
      href: "mailto:your.email@example.com", 
      label: "Email" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-12 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-t border-gray-800 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 relative z-10">
        <motion.div 
          variants={itemVariants}
          className="text-center md:text-left w-full md:w-auto"
        >
          <motion.p 
            className="text-gray-300 text-sm flex items-center justify-center md:justify-start"
            variants={itemVariants}
          >
            2024 Akshay Pratap Singh 
            <motion.span 
              className="ml-2 text-red-500"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1 
              }}
            >
              <Heart size={16} />
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex space-x-6 items-center justify-center w-full md:w-auto"
        >
          {socialLinks.map(({ icon: Icon, href, label }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.2,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out group relative"
            >
              <Icon 
                size={24} 
                className="transition-transform duration-300 group-hover:rotate-12" 
              />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Decorative Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl"></div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;