import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CubeTransparentIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: '/path/to/ecommerce.jpg',
      description: 'Modern e-commerce solution with headless CMS integration',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
      link: '#',
      icon: GlobeAltIcon,
    },
    {
      title: 'AI Analytics Dashboard',
      category: 'AI & ML',
      image: '/path/to/ai-dashboard.jpg',
      description: 'Intelligent analytics platform with real-time insights',
      tech: ['Python', 'TensorFlow', 'React', 'D3.js'],
      link: '#',
      icon: CubeTransparentIcon,
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile',
      image: '/path/to/banking-app.jpg',
      description: 'Secure and intuitive mobile banking solution',
      tech: ['React Native', 'Node.js', 'PostgreSQL'],
      link: '#',
      icon: DevicePhoneMobileIcon,
    },
    // Add more projects as needed
  ];

  const categories = ['All', 'Web Development', 'Mobile', 'AI & ML'];

  const filteredProjects = projects.filter(
    project => selectedCategory === 'All' || project.category === selectedCategory
  );

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
      title="Our Portfolio"
      subtitle="Showcasing Our Digital Excellence"
    >
      {/* Category Filters */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 
                ${selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              layout
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm mb-4">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary-500/20 text-secondary-300 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <a
                  href={project.link}
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                >
                  View Project
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
                </a>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mt-20 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="p-12 bg-white/5 backdrop-blur-md rounded-2xl relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with cutting-edge technology and innovative solutions.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transform transition shadow-lg"
          >
            Start a Project
          </motion.button>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10" />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Portfolio;