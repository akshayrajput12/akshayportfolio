import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AllProjects from './components/AllProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const HomePage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />
      <Projects />
      <Journey />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </motion.div>
  );

  return (
    <Router>
      <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
        <AnimatePresence>
          {loading ? (
            <Loader />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-projects" element={<AllProjects />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;