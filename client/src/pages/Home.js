import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { 
  ArrowRightIcon,
  CodeBracketIcon,
  UserGroupIcon,
  TrophyIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const technologies = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
  ];

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://plus.unsplash.com/premium_photo-1683141240629-2fa67d924190",
      description: "Modern e-commerce solution with headless CMS"
    },
    {
      title: "Finance Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      description: "User-friendly financial analytics platform"
    },
    {
      title: "Healthcare App",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      description: "Patient management system for clinics"
    }
  ];

  const stats = [
    { number: '100+', label: 'Projects Completed', icon: CodeBracketIcon },
    { number: '50+', label: 'Happy Clients', icon: UserGroupIcon },
    { number: '15+', label: 'Awards Won', icon: TrophyIcon },
  ];
// Stats data

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-primary-900 to-secondary-900">
      {isLoading ? (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
          >
            <div className="absolute inset-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-20"
              >
                <source src="/path/to/your/video.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                  Transforming Ideas into
                </span>
                <Typewriter
                  options={{
                    strings: ['Digital Reality', 'Innovation', 'Success'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto px-4"
              >
                We create cutting-edge digital solutions that help businesses thrive in the modern world.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transform transition hover:scale-105 shadow-lg"
                >
                  Get Started
                  <ArrowRightIcon className="w-5 h-5 ml-2 inline-block" />
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transform transition hover:scale-105 shadow-lg"
                >
                  View Our Work
                </Link>
              </motion.div>
            </div>

            {/* Floating Tech Badges */}
            <div className="absolute bottom-10 left-0 right-0 overflow-hidden">
              <motion.div 
                initial={{ x: -1000 }}
                animate={{ x: 1000 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex gap-8"
              >
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2"
                  >
                    <img src={tech.logo} alt={tech.name} className="w-6 h-6 mr-2" />
                    <span className="text-white text-sm">{tech.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-16 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <stat.icon className="h-12 w-12 text-primary-400 mb-4" />
                    <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-gray-400">{stat.label}</p>
                    <div className="absolute inset-0 bg-primary-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Services Grid */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50"
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our Services
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <CloudArrowUpIcon className="h-12 w-12 text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Cloud Solutions</h3>
                  <p className="text-gray-400">Scalable cloud infrastructure and deployment</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <CpuChipIcon className="h-12 w-12 text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">AI & Machine Learning</h3>
                  <p className="text-gray-400">Intelligent solutions for your business</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <BeakerIcon className="h-12 w-12 text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">R&D Services</h3>
                  <p className="text-gray-400">Innovative research and development</p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Featured Projects */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Featured Projects
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                      {project.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>          {/* Newsletter Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          >
            <div className="max-w-3xl mx-auto text-center relative z-10">
             
  
    <motion.div
      variants={itemVariants}
      className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-xl border border-white/20"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Stay Updated
      </h2>
      <p className="text-gray-300 mb-8">
        Subscribe to our newsletter for the latest tech insights and updates.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const email = e.target.email.value;

          try {
            const res = await fetch('http://localhost:3000/api/newsletter/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
              toast.success('✅ Subscribed successfully!');
              e.target.reset();
            } else {
              toast.warn(data.message || '⚠️ Subscription failed');
            }
          } catch (err) {
            toast.error('❌ Server error. Please try again later.');
            console.error(err);
          }
        }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="flex-1 px-5 py-3 bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  </div>
  <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} />

          
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10" />
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary-500/10 rounded-full blur-3xl"
            />
          </motion.section>
        </>
      )}
    </div>
  );
};

export default Home;
