import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'Projects', icon: '🚀' },
    { name: 'Education', icon: '🎓' },
    { name: 'Skills', icon: '💻' },
    { name: 'About', icon: '👤' },
    { name: 'Contact', icon: '📞' }
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      rotate: -10
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 font-orbitron overflow-x-hidden">
      {/* Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text"
          >
            Akshay
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group"
                >
                  <motion.span
                    className="text-gray-300 text-sm font-medium relative z-10 
                      transition-colors duration-300 group-hover:text-white"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.name}
                  </motion.span>
                  
                  {/* Underline Effect */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ 
                      width: '100%',
                      transition: { 
                        duration: 0.3,
                        type: "tween"
                      }
                    }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 origin-left"
                  />
                  
                  {/* Hover Glow Effect */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ 
                      opacity: 0.5, 
                      scale: 1,
                      transition: { 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300
                      }
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-teal-500/20 
                      rounded-md blur-lg -z-10 group-hover:opacity-100 opacity-0 transition-all duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
          >
            <motion.div 
              className="absolute top-6 right-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <motion.button 
                onClick={() => setIsOpen(false)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 15 }}
                className="text-white"
              >
                <X size={32} />
              </motion.button>
            </motion.div>

            <motion.div 
              className="text-center space-y-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  variants={itemVariants}
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                >
                  <span className="mr-4 inline-block">{item.icon}</span>
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;