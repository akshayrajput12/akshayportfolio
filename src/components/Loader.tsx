import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-64 h-64">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, #6366f1 ${progress}%, transparent ${progress}%)`,
            borderRadius: '50%',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-2 bg-[#0a0a0a] rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span 
            className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      </div>
      <motion.div 
        className="mt-8 space-y-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text">
          Akshay Pratap Singh
        </h2>
        <p className="text-gray-400">Loading Experience...</p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;