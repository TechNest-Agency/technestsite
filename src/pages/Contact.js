// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import PageLayout from '../components/PageLayout';
// import {
//   PhoneIcon,
//   EnvelopeIcon,
//   MapPinIcon,
//   ClockIcon,
//   ChatBubbleLeftRightIcon,
//   PaperAirplaneIcon
// } from '@heroicons/react/24/outline';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setSubmitStatus('success');
//       setIsSubmitting(false);
//     }, 2000);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const contactInfo = [
//     {
//       icon: PhoneIcon,
//       title: 'Call Us',
//       content: '+1 (555) 123-4567',
//       link: 'tel:+15551234567'
//     },
//     {
//       icon: EnvelopeIcon,
//       title: 'Email Us',
//       content: 'contact@technest.com',
//       link: 'mailto:contact@technest.com'
//     },
//     {
//       icon: MapPinIcon,
//       title: 'Visit Us',
//       content: '123 Innovation Street, Tech City, TC 12345',
//       link: 'https://maps.google.com'
//     },
//     {
//       icon: ClockIcon,
//       title: 'Business Hours',
//       content: 'Mon - Fri: 9:00 AM - 6:00 PM',
//       link: null
//     }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   return (
//     <PageLayout
//       title="Contact Us"
//       subtitle="Let's Start a Conversation"
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Contact Information */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {contactInfo.map((info, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02 }}
//                 className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
//               >
//                 <info.icon className="h-8 w-8 text-primary-400 mb-4" />
//                 <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
//                 {info.link ? (
//                   <a
//                     href={info.link}
//                     className="text-gray-300 hover:text-primary-400 transition-colors"
//                   >
//                     {info.content}
//                   </a>
//                 ) : (
//                   <p className="text-gray-300">{info.content}</p>
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           {/* Additional Information */}
//           <motion.div
//             variants={itemVariants}
//             className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl"
//           >
//             <h3 className="text-2xl font-bold text-white mb-4">
//               Why Choose Direct Contact?
//             </h3>
//             <ul className="space-y-4">
//               <li className="flex items-start">
//                 <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-400 mt-1 mr-3" />
//                 <p className="text-gray-300">Get personalized solutions tailored to your needs</p>
//               </li>
//               <li className="flex items-start">
//                 <ClockIcon className="h-6 w-6 text-primary-400 mt-1 mr-3" />
//                 <p className="text-gray-300">Quick response time with dedicated support</p>
//               </li>
//             </ul>
//           </motion.div>
//         </motion.div>

//         {/* Contact Form */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//           className="relative"
//         >
//           <motion.form
//             variants={itemVariants}
//             onSubmit={handleSubmit}
//             className="p-8 bg-white/5 backdrop-blur-md rounded-2xl relative overflow-hidden"
//           >
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-white mb-2" htmlFor="name">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-white mb-2" htmlFor="email">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   placeholder="john@example.com"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-white mb-2" htmlFor="subject">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   placeholder="How can we help?"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-white mb-2" htmlFor="message">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows="4"
//                   className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   placeholder="Tell us about your project..."
//                   required
//                 />
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full py-4 rounded-lg flex items-center justify-center text-white transition-all duration-300
//                   ${isSubmitting
//                     ? 'bg-gray-500 cursor-not-allowed'
//                     : 'bg-primary-500 hover:bg-primary-600'
//                   }`}
//               >
//                 {isSubmitting ? (
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
//                   />
//                 ) : (
//                   <>
//                     Send Message
//                     <PaperAirplaneIcon className="w-5 h-5 ml-2" />
//                   </>
//                 )}
//               </motion.button>
//             </div>

//             {/* Success Message */}
//             {submitStatus === 'success' && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-4 p-4 bg-green-500/20 text-green-400 rounded-lg"
//               >
//                 Thank you for your message! We'll get back to you soon.
//               </motion.div>
//             )}

//             {/* Background Gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10" />
//           </motion.form>

//           {/* Decorative Elements */}
//           <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary-500/30 rounded-full blur-2xl" />
//           <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-500/30 rounded-full blur-2xl" />
//         </motion.div>
//       </div>
//     </PageLayout>
//   );
// };

// export default Contact;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Smooth scroll to top on page load
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      content: 'contact@technest.com',
      link: 'mailto:contact@technest.com'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      content: '123 Innovation Street, Tech City, TC 12345',
      link: 'https://maps.google.com'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: null
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <PageLayout
      title="Contact Us"
      subtitle="Let's Start a Conversation"
      className={`min-h-screen ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-gray-900' 
          : 'bg-gradient-to-b from-blue-50 to-purple-50'
      }`}
    >
      <motion.section
        id="contact"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div variants={containerVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50'
                  } shadow-md`}
                >
                  <info.icon className={`h-8 w-8 ${
                    isDarkMode ? 'text-primary-400' : 'text-blue-600'
                  } mb-4`} />
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  } mb-2`}>{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className={`${
                        isDarkMode ? 'text-gray-300 hover:text-primary-300' : 'text-gray-600 hover:text-blue-400'
                      } transition-colors duration-300`}
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{info.content}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              variants={itemVariants}
              className={`mt-12 p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              } shadow-md`}
            >
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-4`}>
                Why Choose Direct Contact?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ChatBubbleLeftRightIcon className={`h-6 ${
                    isDarkMode ? 'text-primary-400' : 'text-blue-600'
                  } mt-1 mr-3 w-6`} />
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Get personalized solutions tailored to your needs
                  </p>
                </li>
                <li className="flex items-start">
                  <ClockIcon className={`h-6 ${
                    isDarkMode ? 'text-primary-400' : 'text-blue-600'
                  } mt-1 mr-3 w-6`} />
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Quick response time with dedicated support
                  </p>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="relative" variants={containerVariants}>
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className={`p-8 rounded-2xl relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
                  : 'bg-gradient-to-r from-white to-gray-50'
              } shadow-md`}
            >
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  } mb-2`} htmlFor="name">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDarkMode ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  } mb-2`} htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDarkMode ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  } mb-2`} htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDarkMode ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  } mb-2`} htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDarkMode ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg flex items-center justify-center text-white transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : isDarkMode
                        ? 'bg-primary-600 hover:bg-primary-700'
                        : 'bg-primary-500 hover:bg-primary-600'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Send Message
                      <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg ${
                    isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}
                >
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 -z-10 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20' 
                  : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
              }`} />
            </motion.form>

            {/* Decorative Elements */}
            <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl ${
              isDarkMode ? 'bg-primary-500/30' : 'bg-blue-400/30'
            }`} />
            <div className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-2xl ${
              isDarkMode ? 'bg-secondary-500/30' : 'bg-purple-400/30'
            }`} />
          </motion.div>
        </div>
      </motion.section>
    </PageLayout>
  );
};

export default Contact;