import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, BookOpen, MapPin, Calendar, Star } from 'lucide-react';

// Memoized EducationCard to prevent unnecessary re-renders
const EducationCard = memo(({ item, index }) => {
  const iconColors = {
    GraduationCap: "bg-gradient-to-r from-blue-500 to-cyan-500",
    Award: "bg-gradient-to-r from-purple-500 to-pink-500",
    BookOpen: "bg-gradient-to-r from-yellow-500 to-orange-500"
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: index % 2 === 0 ? -50 : 50 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0 
      }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        relative 
        group 
        bg-gray-800/40 
        backdrop-blur-sm 
        rounded-lg 
        p-3 
        overflow-hidden 
        border-l-3 
        w-full
        ${index % 2 === 0 ? 'border-blue-500' : 'border-purple-500'}
      `}
    >
      <div className="relative z-10 flex items-start space-x-2">
        {/* Icon */}
        <div 
          className={`
            w-10 h-10 
            rounded-full 
            flex items-center 
            justify-center 
            ${iconColors[item.icon.name]} 
            text-white 
            shadow-md
            flex-shrink-0
          `}
        >
          <item.icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-semibold text-white truncate">{item.title}</h3>
            <span className="text-xs text-gray-400 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {item.year}
            </span>
          </div>
          
          <p className="text-gray-300 mb-1 text-xs flex items-center truncate">
            <MapPin className="w-3 h-3 inline-block mr-1 text-purple-400" />
            {item.institution}
          </p>
          
          <p className="text-gray-300 mb-1 text-xs line-clamp-2">{item.description}</p>
          
          {item.achievements && (
            <div className="space-y-1">
              {item.achievements.slice(0, 2).map((achievement, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center text-xs text-gray-300 truncate"
                >
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {achievement}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline = [
    {
      year: "2020 - 2024",
      title: "Bachelor's in Computer Science",
      institution: "University of Technology",
      description: "Specialized in Web Development and UI/UX Design",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      achievements: [
        "Dean's List (2021-2023)",
        "Outstanding Project Award in Web Technologies"
      ]
    },
    {
      year: "2023",
      title: "UI/UX Design Certification",
      institution: "Design Academy",
      description: "Advanced course in user interface and experience design",
      icon: Award,
      color: "from-purple-500 to-pink-500",
      achievements: [
        "Top Performer in Design Thinking Workshop",
        "Advanced Figma and Adobe XD Certification"
      ]
    },
    {
      year: "2022",
      title: "Full Stack Development",
      institution: "Tech Institute",
      description: "Comprehensive training in modern web technologies",
      icon: BookOpen,
      color: "from-yellow-500 to-orange-500",
      achievements: [
        "Completed Advanced React and Node.js Bootcamp",
        "Built Full-Stack Portfolio Project"
      ]
    }
  ];

  return (
    <section 
      id="education" 
      className="min-h-screen py-12 px-4 bg-[#0a0a0a] relative overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text"
        >
          Education Journey
        </motion.h2>

        <div className="space-y-4 sm:space-y-6">
          {timeline.map((item, index) => (
            <EducationCard 
              key={item.title} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;