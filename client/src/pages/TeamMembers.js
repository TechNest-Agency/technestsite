import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TeamMembers = () => {
  const { isDarkMode } = useTheme();

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
        behance: 'https://www.behance.net/nazathossain'
      }
    },
    {
      name: 'Momota Akter',
      role: 'Frontend Developer',
      bio: 'Creative frontend developer with a passion for building user-friendly interfaces.',
      image: '/momota.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/mikejohnson',
        facebook: 'https://facebook.com/momotaakter',
        github: 'https://github.com/mikejohnson',
        behance: 'https://www.behance.net/momotaakter'
      }
    },
    {
      name: 'Halima Khatun',
      role: 'UI/UX Designer',
      bio: 'Skilled designer focused on enhancing user experience through innovative design.',
      image: '/halima.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/halima-khatun-a8b831256/',
        facebook: 'https://facebook.com/halimakhatun',
        github: '',
        behance: 'https://www.behance.net/halimakhatun'
      }
    },
    {
      name: 'Khadiza Samia',
      role: 'MERN Stack Developer',
      bio: 'Full-stack developer with expertise in MongoDB, Express, React, and Node.js.',
      image: '/khadiza.png',
      social: {
        linkedin: 'https://linkedin.com/in/alexrodriguez',
        facebook: 'https://facebook.com/khadizasamia',
        github: 'https://github.com/KhadizaSamiha',
        behance: 'https://www.behance.net/khadizasamia'
      }
    },
    {
      name: 'Soraiya Akter',
      role: 'MERN Stack Developer',
      bio: 'Full-stack developer with expertise in MongoDB, Express, React, and Node.js.',
      image: '/soraiya.png',
      social: {
        linkedin: 'https://linkedin.com/in/alexrodriguez',
        facebook: 'https://facebook.com/soraiyaakter',
        github: 'https://github.com/Soraiya11-7',
        behance: 'https://www.behance.net/soraiyaakter'
      }
    },
    {
      name: 'Sumaiya Amin Prova',
      role: 'MERN Stack Developer',
      bio: 'Full-stack developer with expertise in MongoDB, Express, React, and Node.js.',
      image: '/sumaiya.png',
      social: {
        linkedin: 'https://linkedin.com/in/alexrodriguez',
        facebook: 'https://facebook.com/sumaiyaamin',
        github: 'https://github.com/sumaiyaamin',
        behance: 'https://www.behance.net/sumaiyaamin'
      }   
    }
  ];
  return (
    <div className={`pt-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isDarkMode 
            ? 'from-primary-900/20 to-secondary-900/20' 
            : 'from-primary-50 to-secondary-50'
        } -z-10`} />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading mb-6">Our Team</h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Meet the passionate professionals behind TechNest's success. Our diverse team brings together expertise from various domains to deliver exceptional solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                } rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300`}
              >
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className={`${isDarkMode ? 'text-primary-400' : 'text-primary-600'} mb-3`}>{member.role}</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                    </svg>
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={member.social.behance} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="heading mb-6">Join Our Team</h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              We're always looking for talented individuals who share our passion for innovation and excellence. If you think you'd be a great fit, we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamMembers;