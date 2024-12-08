import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Calendar, GraduationCap, Briefcase, Award } from 'lucide-react';

interface JourneyItem {
  type: 'education' | 'work';
  year: string;
  title: string;
  institution: string;
  description: string[];
  achievements?: string[];
}

const educationData: JourneyItem[] = [
  {
    type: 'education',
    year: '2019 - 2020',
    title: 'Secondary Examination',
    institution: 'Sand Dunes Convent School',
    description: [
      'Passed 10th Standard from State Board of Rajasthan [BSER]',
      'PERCENTAGE: 85.45%',
      'Year of Passing: 2020'
    ],
    achievements: [
      'School Topper in Mathematics',
      'Participated in State-Level Science Exhibition'
    ]
  },
  {
    type: 'education',
    year: '2021 - 2022',
    title: 'Higher Secondary Examination',
    institution: 'A.C.A Academy',
    description: [
      'Passed 12th Standard from State Board of Rajasthan [BSER]',
      'PERCENTAGE: 82.25%',
      'Year of Passing: 2022'
    ],
    achievements: [
      'Computer Science Stream Distinction',
      'Coding Club Coordinator'
    ]
  },
  {
    type: 'education',
    year: '2023 - 2027',
    title: 'Bachelor\'s Degree',
    institution: 'Lovely Professional University',
    description: [
      'Pursuing Bachelor\'s Degree in Computer Science',
      'Expected Graduation: 2027'
    ],
    achievements: [
      'Dean\'s List Scholar',
      'Active Member of Tech Innovation Club'
    ]
  }
];

const workExperienceData: JourneyItem[] = [
  {
    type: 'work',
    year: '2017 - 2018',
    title: 'Web Development Intern',
    institution: 'Bharat Intern',
    description: [
      'Learning and Development in Web Development',
      'Gained hands-on experience in HTML, CSS, JavaScript',
      'Explored various web development frameworks'
    ],
    achievements: [
      'Developed 3 responsive web projects',
      'Received Best Intern Award'
    ]
  },
  {
    type: 'work',
    year: '2023 - 2024',
    title: 'Frontend Development Intern',
    institution: 'Prodigy Infotech',
    description: [
      'Collaborated with design team on web interfaces',
      'Developed responsive web applications',
      'Implemented HTML, CSS, and JavaScript solutions',
      'Bug fixing and troubleshooting'
    ],
    achievements: [
      'Optimized website performance by 40%',
      'Implemented responsive design patterns'
    ]
  },
  {
    type: 'work',
    year: '2023 - 2024',
    title: 'Freelance Web Developer',
    institution: 'Freelance',
    description: [
      'Designed and maintained websites for various clients',
      'Worked remotely on contract-based projects',
      'Flexible project selection and working hours'
    ],
    achievements: [
      '5+ satisfied clients',
      'Delivered 10+ web development projects'
    ]
  }
];

const RotatingStars = () => {
  const meshRef = useRef<any>();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Stars 
      ref={meshRef}
      radius={100} 
      depth={50} 
      count={1000} 
      factor={4} 
      saturation={0} 
      color="#6b21a8"
    />
  );
};

const JourneySection: React.FC<{ 
  title: string, 
  data: JourneyItem[], 
  iconColor: string 
}> = ({ title, data, iconColor }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id='education' className="relative py-16 bg-[rgb(17,24,39,0.3)]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"
        >
          {title}
        </motion.h2>
        
        <div className="relative">
          {/* Vertical Timeline Line for Desktop */}
          {!isMobile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-800 to-pink-600 h-full opacity-50"></div>
          )}
          
          {data.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -100 : 100) }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100 
              }}
              className={`flex items-center mb-12 
                ${isMobile 
                  ? 'flex-col' 
                  : (index % 2 === 0 ? 'flex-row-reverse' : 'flex-row')
                }`}
            >
              {/* Timeline Dot */}
              <div className={`w-10 h-10 rounded-full 
                ${isMobile 
                  ? 'mb-4 self-start' 
                  : 'absolute left-1/2 transform -translate-x-1/2'
                } 
                flex items-center justify-center shadow-2xl
                ${iconColor}`}>
                {item.type === 'education' ? <GraduationCap /> : <Briefcase />}
              </div>
              
              {/* Journey Card */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: isMobile ? 0 : (index % 2 === 0 ? -2 : 2) }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`
                  ${isMobile 
                    ? 'w-full' 
                    : 'w-[calc(50%-60px)]'
                  } 
                  p-6 rounded-2xl shadow-2xl backdrop-blur-sm 
                  border border-opacity-20 border-purple-800
                  ${isMobile 
                    ? 'mb-4' 
                    : (index % 2 === 0 
                      ? 'mr-auto' 
                      : 'ml-auto')
                  }
                  bg-gradient-to-br from-purple-900/30 to-black/30`}
              >
                <div className="flex items-center mb-3 text-gray-300">
                  <Calendar className="mr-2" />
                  <span className="font-semibold">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-3">{item.institution}</p>
                <ul className="list-disc list-inside text-gray-300 mb-3">
                  {item.description.map((desc, descIndex) => (
                    <li key={descIndex} className="mb-1">{desc}</li>
                  ))}
                </ul>
                {item.achievements && (
                  <div className="mt-3 border-t border-purple-800 pt-3">
                    <h4 className="text-md font-semibold mb-2 flex items-center text-yellow-400">
                      <Award className="mr-2 w-5 h-5" /> Achievements
                    </h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {item.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="mb-1">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Journey: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      {isClient && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <RotatingStars />
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
      )}
      <div className="relative z-10">
        <JourneySection 
          title="Educational Journey" 
          data={educationData} 
          iconColor="bg-blue-600 text-blue-100"
        />
        <JourneySection 
          title="Professional Experience" 
          data={workExperienceData} 
          iconColor="bg-green-600 text-green-100"
        />
      </div>
    </div>
  );
};

export default Journey;
