import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          access_key: '33894473-ad86-4416-a997-c1893ff8082b'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "akshay@example.com",
      link: "mailto:akshay@example.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 234 567 890",
      link: "tel:+1234567890"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "New Delhi, India",
      link: "#"
    }
  ];

  return (
    <section 
      id="contact" 
      className="min-h-screen py-20 px-4 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-transparent bg-clip-text"
        >
          Contact Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8 bg-gray-900/50 p-8 rounded-3xl backdrop-blur-lg"
            style={{
              transform: 'perspective(1000px) rotateY(10deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <p className="text-gray-300 text-lg">
              I'm always open to new opportunities and interesting projects. 
              Feel free to reach out if you'd like to collaborate or just say hello!
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                  className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <div 
                    className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <item.icon size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-6 bg-gray-900/50 p-8 rounded-3xl backdrop-blur-lg"
            style={{
              transform: 'perspective(1000px) rotateY(-10deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Name and Email Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                             focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                             transition-all"
                  style={{ transform: 'translateZ(20px)' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                             focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                             transition-all"
                  style={{ transform: 'translateZ(20px)' }}
                />
              </motion.div>
            </div>

            {/* Phone and Subject Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                             focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                             transition-all"
                  style={{ transform: 'translateZ(20px)' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                             focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                             transition-all"
                  style={{ transform: 'translateZ(20px)' }}
                />
              </motion.div>
            </div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                           transition-all"
                style={{ transform: 'translateZ(20px)' }}
              />
            </motion.div>

            {/* Submit Button with Status */}
            <motion.button
              type="submit"
              disabled={formStatus === 'submitting'}
              whileHover={{ scale: formStatus === 'submitting' ? 1 : 1.02 }}
              whileTap={{ scale: formStatus === 'submitting' ? 1 : 0.98 }}
              className={`
                w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2
                transition-all duration-300
                ${formStatus === 'submitting' 
                  ? 'bg-purple-700 text-white cursor-wait' 
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-white hover:opacity-90'
                }
              `}
              style={{ transform: 'translateZ(40px)' }}
            >
              {formStatus === 'submitting' ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <Send size={20} className="mr-2" />
              )}
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </motion.button>

            {/* Form Status Feedback */}
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="text-center text-green-500 mt-4"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="text-center text-red-500 mt-4"
                >
                  Oops! Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;