import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaLinkedin, FaFacebook, FaGithub, FaBehance, FaPlus } from 'react-icons/fa';

const TeamMembers = () => {
  const { isDarkMode } = useTheme();
  const [selectedMember, setSelectedMember] = useState(null);

  // Define consistent animation variants
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
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Get actual team members data from your original component
  const teamMembers = [
    {
      name: 'Nazat Hossain',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 4+ years of experience in technology and business strategy.',
      image: '/ceo.png',
      social: {
        linkedin: 'https://www.linkedin.com/in/nazat-mern-stack/',
        facebook: 'https://facebook.com/nazathossain',
        github: 'https://github.com/nazathossain',
        // behance: 'https://www.behance.net/nazathossain'
      }
    },
    {
      name: 'Liza Akter',
      role: 'Digital Marketing Manager',
      bio: 'Expert in digital marketing strategies and social media management.',
      image: '/liza.png',
      social: {
        linkedin: 'https://www.linkedin.com/in/nazat-mern-stack/',
        facebook: 'https://facebook.com/nazathossain',
        github: 'https://github.com/nazathossain',
        behance: 'https://www.behance.net/nazathossain'
      }
    },
    {
      name: 'Halima Khatun',
      role: 'UI/UX Designer',
      bio: 'Skilled designer focused on enhancing user experience through innovative design.',
      image: '/halima.png',
      social: {
        linkedin: 'https://www.linkedin.com/in/halima-khatun-a8b831256/',
        facebook: 'https://facebook.com/halimakhatun',
        github: '',
        behance: 'https://www.behance.net/halimakhatun8'
      }
    },
    // New team member added here
    {
      name: 'Marufa Akter',
      role: 'UI/UX Designer',
      bio: 'Skilled designer focused on enhancing user experience through innovative design.',
      // image: '/marufa.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in//',
        facebook: 'https://facebook.com/',
        github: 'https://github.com/',
        behance: ''
      }
    },
    {
      name: 'Nusrat Jahan Mim',
      role: 'Ui/UX Designer',
      bio: 'Experienced full-stack developer with expertise in React, Node.js, and cloud infrastructure. Passionate about building scalable solutions and mentoring junior developers.',
      image: '/mim.png',
      social: {
        linkedin: 'https://www.linkedin.com/in//',
        facebook: 'https://facebook.com/',
        github: 'https://github.com/',
        behance: ''
      }
    },
    {
      name: 'Jasmin Ara Mim',
      role: 'Frontend Developer',
      bio: 'Experienced full-stack developer with expertise in React, Node.js, and cloud infrastructure. Passionate about building scalable solutions and mentoring junior developers.',
      image: '/jasmin.png',
      social: {
        linkedin: 'https://www.linkedin.com/in//',
        facebook: 'https://facebook.com/',
        github: 'https://github.com/',
        behance: ''
      }
    },
    {
      name: 'Alex Johnson',
      role: 'Senior Developer',
      bio: 'Experienced full-stack developer with expertise in React, Node.js, and cloud infrastructure. Passionate about building scalable solutions and mentoring junior developers.',
      image: '/alex.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in//',
        facebook: 'https://facebook.com/',
        github: 'https://github.com/',
        behance: ''
      }
    },    {
      name: 'Alex Johnson',
      role: 'Senior Developer',
      bio: 'Experienced full-stack developer with expertise in React, Node.js, and cloud infrastructure. Passionate about building scalable solutions and mentoring junior developers.',
      image: '/alex.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in//',
        facebook: 'https://facebook.com/',
        github: 'https://github.com/',
        behance: ''
      }
    },    {
      name: 'Khadiza Samiha',
      role: 'Frontend Developer',
      bio: 'Experienced MERN developer with expertise in React, Node.js, and cloud infrastructure. Passionate about building scalable solutions and mentoring junior developers.',
      // image: '/khadiza.png',
      social: {
        linkedin: 'https://www.linkedin.com/in//',
        facebook: 'https://facebook.com/',
        github: 'https://github.com/',
        behance: ''
      }
    },    {
      name: 'Mt. Soraiya Parvin',
      role: 'Frontend Developer',
      bio: 'Experienced Frontend developer with expertise in React, Node.js, and cloud infrastructure. Passionate about building scalable solutions and mentoring junior developers.',
      // image: '/soraiya.png',
      social: {
        linkedin: 'https://www.linkedin.com/in/mt-soraya-parvin-49472b363/',
        facebook: '',
        github: 'https://github.com/Soraiya11-7',
        behance: ''
      }
    },

    // ... more members
  ];

  // Social media icon mapping
  const SocialIcon = ({ platform, url }) => {
    if (!url) return null;

    const icons = {
      linkedin: <FaLinkedin />,
      facebook: <FaFacebook />,
      github: <FaGithub />,
      behance: <FaBehance />
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-125 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          {icons[platform]}
        </a>
    );
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member === selectedMember ? null : member);
  };

  // Function to safely get social media links
  const getSocialLinks = (member) => {
    // Check if social is defined - if not, return an empty object
    // Also handle the case where it might be misspelled as 'sosial'
    return member.social || member.sosial || {};
  };

  return (
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <div className="container mx-auto px-4">
          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Amazing Team</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-lg">
              Meet the talented individuals behind our success. Passionate experts committed to delivering excellence.
            </p>
          </motion.div>

          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {teamMembers.map((member, index) => (
                <motion.div
                    key={`${member.name}-${index}`}
                    variants={itemVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className={`relative overflow-hidden rounded-xl shadow-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } h-full flex flex-col`}
                    onClick={() => handleMemberClick(member)}
                >
                  {/* Responsive image container */}
                  <div className="relative pt-[100%] w-full overflow-hidden">
                    {member.image ? (
                        <img
                            src={member.image}
                            alt={member.name}
                            className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
                        />
                    ) : (
                        <div className={`absolute inset-0 flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <span className="text-4xl font-bold opacity-30">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                      <p className="text-white text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-3">{member.bio}</p>
                      <div className="flex space-x-2 sm:space-x-3">
                        {Object.entries(getSocialLinks(member)).map(([platform, url]) => (
                            url && <SocialIcon key={platform} platform={platform} url={url} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-grow">
                    <h3 className="font-bold text-lg sm:text-xl">{member.name}</h3>
                    <div className="w-10 h-0.5 bg-blue-500 my-2"></div>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {member.role}
                    </p>
                  </div>

                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                            isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                        } flex items-center justify-center cursor-pointer`}
                    >
                      <FaPlus className="text-white text-xs" />
                    </motion.div>
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal for detailed view */}
        <AnimatePresence>
          {selectedMember && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                  onClick={() => setSelectedMember(null)}
              >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className={`relative max-w-2xl w-full rounded-2xl overflow-hidden ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                    onClick={e => e.stopPropagation()}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                      {selectedMember.image ? (
                          <img
                              src={selectedMember.image}
                              alt={selectedMember.name}
                              className="w-full h-full object-cover"
                          />
                      ) : (
                          <div className={`w-full h-full min-h-[200px] flex items-center justify-center ${
                              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <span className="text-6xl font-bold opacity-30">
                              {selectedMember.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                      )}
                    </div>
                    <div className="md:w-3/5 p-6 sm:p-8">
                      <h2 className="text-xl sm:text-2xl font-bold mb-2">{selectedMember.name}</h2>
                      <div className="w-12 h-1 bg-blue-500 mb-4"></div>
                      <p className={`text-xs sm:text-sm mb-4 sm:mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        {selectedMember.role}
                      </p>
                      <p className="text-sm sm:text-base mb-6">{selectedMember.bio}</p>

                      <div className="flex space-x-4">
                        {Object.entries(getSocialLinks(selectedMember)).map(([platform, url]) => (
                            url && <SocialIcon key={platform} platform={platform} url={url} />
                        ))}
                      </div>

                      <button
                          className={`mt-6 sm:mt-8 px-4 sm:px-6 py-2 rounded-full ${
                              isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                          } text-white transition-colors text-sm sm:text-base`}
                          onClick={() => setSelectedMember(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </section>
  );
};

export default TeamMembers;