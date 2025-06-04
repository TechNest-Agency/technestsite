// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Typewriter from 'typewriter-effect';
// import { 
//   ArrowRightIcon,
//   CodeBracketIcon,
//   UserGroupIcon,
//   TrophyIcon,
//   CloudArrowUpIcon,
//   CpuChipIcon,
//   BeakerIcon,
//   PhoneIcon
// } from '@heroicons/react/24/outline';
// import { useTheme } from '../context/ThemeContext';

// const Home = () => {
//   const { isDarkMode } = useTheme();

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const technologies = [
//     { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
//     { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
//     { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
//     { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
//     { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
//     { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
//   ];

//   const featuredProjects = [
//     {
//       title: "E-Commerce Platform",
//       category: "Web Development",
//       image: "https://plus.unsplash.com/premium_photo-1683141240629-2fa67d924190",
//       description: "Modern e-commerce solution with headless CMS"
//     },
//     {
//       title: "Finance Dashboard",
//       category: "UI/UX Design",
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
//       description: "User-friendly financial analytics platform"
//     },
//     {
//       title: "Healthcare App",
//       category: "Mobile Development",
//       image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
//       description: "Patient management system for clinics"
//     }
//   ];

//   const stats = [
//     { number: '100+', label: 'Projects Completed', icon: CodeBracketIcon },
//     { number: '50+', label: 'Happy Clients', icon: UserGroupIcon },
//     { number: '15+', label: 'Awards Won', icon: TrophyIcon },
//   ];
// // Stats data

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
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-primary-900 to-secondary-900">
//       {isLoading ? (
//         <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               rotate: [0, 180, 360]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
//           />
//         </div>
//       ) : (
//         <>
//           {/* Hero Section */}
//           <motion.section
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
//           >
//             <div className="absolute inset-0 overflow-hidden">
//               <video
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="w-full h-full object-cover opacity-20"
//               >
//                 <source src="/path/to/your/video.mp4" type="video/mp4" />
//               </video>
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto text-center">
//               <motion.h1 
//                 variants={itemVariants}
//                 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
//                   Transforming Ideas into
//                 </span>
//                 <Typewriter
//                   options={{
//                     strings: ['Digital Reality', 'Innovation', 'Success'],
//                     autoStart: true,
//                     loop: true,
//                   }}
//                 />
//               </motion.h1>

//               <motion.p 
//                 variants={itemVariants}
//                 className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto px-4"
//               >
//                 We create cutting-edge digital solutions that help businesses thrive in the modern world.
//               </motion.p>

//               <motion.div 
//                 variants={itemVariants}
//                 className="flex flex-col sm:flex-row gap-4 justify-center"
//               >
//                 <Link
//             to="/contact"
//             className={`inline-flex items-center px-8 py-4 rounded-lg transform transition hover:scale-105 shadow-lg ${
//               isDarkMode 
//                 ? 'bg-primary-600 hover:bg-primary-700 text-white' 
//                 : 'bg-primary-500 hover:bg-primary-600 text-white'
//             }`}
//           >
//             Get In Touch
//             <ArrowRightIcon className="w-5 h-5 ml-2" />
//           </Link>
//                 <Link
//                   to="/portfolio"
//                   className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transform transition hover:scale-105 shadow-lg"
//                 >
//                   View Our Work
//                 </Link>
//               </motion.div>
//             </div>

//             {/* Floating Tech Badges */}
//             <div className="absolute bottom-10 left-0 right-0 overflow-hidden">
//               <motion.div 
//                 initial={{ x: -1000 }}
//                 animate={{ x: 1000 }}
//                 transition={{
//                   duration: 20,
//                   repeat: Infinity,
//                   ease: "linear"
//                 }}
//                 className="flex gap-8"
//               >
//                 {technologies.map((tech, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2"
//                   >
//                     <img src={tech.logo} alt={tech.name} className="w-6 h-6 mr-2" />
//                     <span className="text-white text-sm">{tech.name}</span>
//                   </div>
//                 ))}
//               </motion.div>
//             </div>
//           </motion.section>

//           {/* Stats Section */}
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={containerVariants}
//             className="py-16 px-4 sm:px-6 lg:px-8"
//           >
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {stats.map((stat, index) => (
//                   <motion.div
//                     key={index}
//                     variants={itemVariants}
//                     className="relative group p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
//                   >
//                     <stat.icon className="h-12 w-12 text-primary-400 mb-4" />
//                     <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
//                     <p className="text-gray-400">{stat.label}</p>
//                     <div className="absolute inset-0 bg-primary-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.section>

//           {/* Services Grid */}
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={containerVariants}
//             className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50"
//           >
//             <div className="max-w-7xl mx-auto">
//               <motion.h2 
//                 variants={itemVariants}
//                 className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
//               >
//                 Our Services
//               </motion.h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 <motion.div
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.05 }}
//                   className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
//                 >
//                   <CloudArrowUpIcon className="h-12 w-12 text-primary-400 mb-4" />
//                   <h3 className="text-xl font-semibold text-white mb-2">Cloud Solutions</h3>
//                   <p className="text-gray-400">Scalable cloud infrastructure and deployment</p>
//                 </motion.div>

//                 <motion.div
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.05 }}
//                   className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
//                 >
//                   <CpuChipIcon className="h-12 w-12 text-primary-400 mb-4" />
//                   <h3 className="text-xl font-semibold text-white mb-2">AI & Machine Learning</h3>
//                   <p className="text-gray-400">Intelligent solutions for your business</p>
//                 </motion.div>

//                 <motion.div
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.05 }}
//                   className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
//                 >
//                   <BeakerIcon className="h-12 w-12 text-primary-400 mb-4" />
//                   <h3 className="text-xl font-semibold text-white mb-2">R&D Services</h3>
//                   <p className="text-gray-400">Innovative research and development</p>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.section>

//           {/* Featured Projects */}
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={containerVariants}
//             className="py-20 px-4 sm:px-6 lg:px-8"
//           >
//             <div className="max-w-7xl mx-auto">
//               <motion.h2
//                 variants={itemVariants}
//                 className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
//               >
//                 Featured Projects
//               </motion.h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {featuredProjects.map((project, index) => (
//                   <motion.div
//                     key={index}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.05 }}
//                     className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300"
//                   >
//                     <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
//                       <img
//                         src={project.image}
//                         alt={project.title}
//                         className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
//                       />
//                     </div>
//                     <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
//                     <p className="text-gray-400 mb-4">{project.description}</p>
//                     <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
//                       {project.category}
//                     </span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.section>          {/* Newsletter Section */}
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={containerVariants}
//             className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
//           >
//             <div className="max-w-3xl mx-auto text-center relative z-10">
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-2xl"
//               >
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                   Stay Updated
//                 </h2>
//                 <p className="text-gray-300 mb-8">
//                   Subscribe to our newsletter for the latest tech insights and updates.
//                 </p>
//                 <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="flex-1 px-6 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   />
//                   <button
//                     type="submit"
//                     className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transform transition hover:scale-105"
//                   >
//                     Subscribe
//                   </button>
//                 </form>
//               </motion.div>
//             </div>
//             {/* Decorative background elements */}
//             <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10" />
//             <motion.div
//               animate={{
//                 rotate: 360,
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: 20,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//               className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary-500/10 rounded-full blur-3xl"
//             />
//           </motion.section>
//         </>
//       )}
//     </div>
//   );
// };
// hi
// export default Home;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import {
  ArrowRightIcon,
  CodeBracketIcon,
  UserGroupIcon,
  TrophyIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  BeakerIcon,
  SparklesIcon,
  ServerIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  LightBulbIcon,
  CubeIcon,
  RocketLaunchIcon,
  ChatBubbleBottomCenterTextIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

// Import abstract tech background for Newsletter Section
import abstractTechBg from '../../src/Assets/images/abstarct.jpeg';

const Home = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

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
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git.svg' }
  ];

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3",
      description: "Modern e-commerce solution with headless CMS",
      icon: <CubeIcon className="w-6 h-6 text-yellow-500" />
    },
    {
      title: "Finance Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      description: "User-friendly financial analytics platform",
      icon: <ChartBarIcon className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Healthcare App",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      description: "Patient management system for clinics",
      icon: <DevicePhoneMobileIcon className="w-6 h-6 text-green-500" />
    }
  ];

  const stats = [
    { number: '100+', label: 'Projects Completed', icon: CodeBracketIcon, color: 'text-purple-500' },
    { number: '50+', label: 'Happy Clients', icon: UserGroupIcon, color: 'text-blue-500' },
    { number: '15+', label: 'Awards Won', icon: TrophyIcon, color: 'text-yellow-500' },
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technologies.',
      icon: CodeBracketIcon,
      features: ['React/Next.js', 'Node.js/Express', 'REST APIs', 'Database Design'],
      category: 'Development'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure solutions.',
      icon: CloudArrowUpIcon,
      features: ['AWS/Azure', 'Cloud Migration', 'DevOps', 'Serverless'],
      category: 'Infrastructure'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications.',
      icon: DevicePhoneMobileIcon,
      features: ['React Native', 'iOS/Android', 'App Store Publishing', 'Mobile UI/UX'],
      category: 'Development'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by advanced AI.',
      icon: CubeTransparentIcon,
      features: ['Data Analysis', 'Predictive Models', 'Neural Networks', 'Computer Vision'],
      category: 'Technology'
    },
    {
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions for digital assets.',
      icon: ShieldCheckIcon,
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Data Protection'],
      category: 'Security'
    },
    {
      title: 'Digital Transformation',
      description: 'Strategic digital solutions for business growth.',
      icon: RocketLaunchIcon,
      features: ['Process Automation', 'Digital Strategy', 'Innovation', 'Analytics'],
      category: 'Consulting'
    }
  ];

  const whyChooseUs = [
    {
      icon: RocketLaunchIcon,
      title: 'Innovation',
      description: 'Cutting-edge solutions using the latest technologies'
    },
    {
      icon: ChartBarIcon,
      title: 'Scalability',
      description: 'Solutions that grow with your business needs'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Security',
      description: 'Enterprise-grade security in all our solutions'
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Support',
      description: '24/7 dedicated customer support'
    }
  ];

  // Map service titles to Unsplash image URLs with fallback
  const fallbackImage = 'https://images.unsplash.com/photo-1551434678-e076c223a692';
  const serviceImages = {
    'web-development': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    'cloud-solutions': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'mobile-apps': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'ai-machine-learning': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    'cybersecurity': 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f',
    'digital-transformation': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  };

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
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate('/contact');
  };

  // Define the background image URL for the Hero Section
  const heroBgImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {isLoading ? (
        <div className={`fixed inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-16 h-16 border-4 rounded-full ${isDarkMode ? 'border-primary-500 border-t-transparent' : 'border-blue-500 border-t-transparent'}`}
          />
        </div>
      ) : (
        <>
          {/* Hero Section with Banner Image */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
          >
            {/* Banner Background with Parallax Effect */}
            <motion.div 
              className="absolute inset-0"
              style={{ y }}
            >
              <img
                src={heroBgImage}
                alt="Technology background"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/80' : 'bg-gray-800/50'}`} />
            </motion.div>

            {/* Floating Tech Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.random() * 200 - 100],
                    y: [0, Math.random() * 200 - 100],
                    rotate: [0, Math.random() * 360]
                  }}
                  transition={{
                    duration: 20 + Math.random() * 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className={`absolute ${['text-primary-500', 'text-secondary-500', 'text-blue-500', 'text-purple-500'][i % 4]}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${1 + Math.random() * 3}rem`
                  }}
                >
                  {[<ServerIcon />, <CpuChipIcon />, <SparklesIcon />, <CloudArrowUpIcon />][i % 4]}
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <motion.h1
                variants={itemVariants}
                className={`text-4xl md:text-6xl lg:text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8 leading-tight`}
              >
                <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-primary-400 to-secondary-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
                  Innovative Tech Solutions
                </span>
                <br />
                <Typewriter
                  options={{
                    strings: ['For Your Business', 'For The Future', 'For Success'],
                    autoStart: true,
                    loop: true,
                    wrapperClassName: `${isDarkMode ? 'text-white' : 'text-gray-200'} inline-block`,
                    cursorClassName: `${isDarkMode ? 'text-primary-400' : 'text-blue-600'}`
                  }}
                />
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-300'} mb-12 max-w-3xl mx-auto`}
              >
                We craft cutting-edge digital experiences that drive growth and innovation for businesses of all sizes.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Link
                  to="/contact"
                  onClick={handleGetStarted}
                  className={`inline-flex items-center px-8 py-4 rounded-lg transform transition hover:scale-105 shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white'}`}
                >
                  Get Started
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/portfolio"
                  className={`inline-flex items-center px-8 py-4 rounded-lg transform transition hover:scale-105 shadow-lg ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20' : 'hover:bg-gray-800/50 text-gray-300 backdrop-blur-sm border border-gray-300'}`}
                >
                  View Our Work
                </Link>
              </motion.div>
            </div>

            {/* Infinite Scrolling Tech Badges */}
            <div className="absolute bottom-10 left-0 right-0 w-full overflow-hidden">
              <div className="relative w-full">
                <motion.div
                  animate={{ 
                    x: ['0%', '-100%'],
                    transition: {
                      duration: 30,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                  }}
                  className="flex gap-4 sm:gap-6 lg:gap-8 whitespace-nowrap"
                  style={{ display: 'inline-flex', width: 'max-content' }}
                >
                  {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                    <motion.div
                      key={`${tech.name}-${index}`}
                      whileHover={{ scale: 1.1 }}
                      className={`flex items-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 lg:px-4 lg:py-2 ${
                        isDarkMode ? 'bg-white/10 border-white/10' : 'bg-gray-200/50 border-gray-300/50'
                      } backdrop-blur-md shadow-sm border transform transition-all duration-300`}
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 mr-1.5 sm:mr-2"
                      />
                      <span
                        className={`font-medium text-sm sm:text-base ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Rest of your existing code remains the same... */}
          {/* Stats Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className={`py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={itemVariants}
                className="text-center mb-16"
              >
                <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Our <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-primary-400 to-secondary-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>Achievements</span>
                </h2>
                <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Trusted by businesses worldwide, we deliver exceptional results that drive growth and innovation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    className={`relative p-8 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} shadow-lg border ${isDarkMode ? 'border-gray-600/30' : 'border-gray-200'}`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-600/20' : 'bg-gray-200/50'} mb-6`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <h3 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{stat.number}</h3>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</p>
                    <div className={`absolute inset-0 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 ${isDarkMode ? 'bg-primary-500/10' : 'bg-blue-400/10'}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Our Services Grid */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <motion.h2
              variants={itemVariants}
              className={`relative text-3xl md:text-4xl font-bold text-center mb-12 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } after:content-[''] after:block after:w-16 after:h-1 after:mx-auto after:mt-4 after:bg-gradient-to-r after:from-primary-500 after:to-secondary-500`}
            >
              Our Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, boxShadow: isDarkMode ? '0 10px 20px rgba(79, 70, 229, 0.2)' : '0 10px 20px rgba(99, 102, 241, 0.2)' }}
                  className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 border ${
                    isDarkMode
                      ? 'bg-gray-800/90 hover:bg-gray-700/70 border-primary-700/30 backdrop-blur-lg'
                      : 'bg-gray-800/70 hover:bg-gray-800 text-white border-primary-200/30 backdrop-blur-lg'
                  }`}
                  style={{
                    backgroundImage: `url(${serviceImages[service.title.toLowerCase().replace(/\s+/g, '-')] || fallbackImage}), linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.1))`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                  />
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="inline-block"
                  >
                    <service.icon className={`h-16 w-16 mb-6 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                  </motion.div>
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  }`}>
                    {service.category}
                  </span>
                  <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-200 font-bold'}`}>{service.title}</h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                        <SparklesIcon className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-primary-400' : 'text-primary-100'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              variants={itemVariants}
              className="text-center mt-16"
            >
              <Link
                to="/about"
                className={`inline-flex items-center px-6 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition-colors duration-300`}
              >
                View All
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.section>

          {/* Why Choose TechNest */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 relative"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c'), linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.2))`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
            }}
          >
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/70' : 'bg-blue-500/30'}`} />
            <motion.h2
              variants={itemVariants}
              className={`relative text-3xl md:text-4xl font-bold text-center mb-12 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } after:content-[''] after:block after:w-16 after:h-1 after:mx-auto after:mt-4 after:bg-gradient-to-r after:from-primary-500 after:to-secondary-500`}
            >
              Why Choose TechNest
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl transition-all duration-300 text-center border ${
                    isDarkMode
                      ? 'bg-gray-800/30 backdrop-blur-sm border-gray-700/90'
                      : 'bg-gray-800/40 backdrop-blur-sm border-gray-200/50'
                  }`}
                >
                  <div className={`relative mx-auto mb-4 w-16 h-16 rounded-full ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-primary-600/30 to-secondary-600/30'
                      : 'bg-gradient-to-r from-primary-600/50 to-secondary-600/30'
                  }`}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                    >
                      <item.icon className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 ${
                        isDarkMode ? 'text-primary-400' : 'text-gray-200'
                      }`} />
                    </motion.div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-100'}`}>{item.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-200'}`}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Featured Projects */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={itemVariants}
                className="text-center mb-16"
              >
                <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Featured <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-primary-400 to-secondary-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>Projects</span>
                </h2>
                <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Explore our portfolio of successful projects that showcase our expertise.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} shadow-lg border ${isDarkMode ? 'border-gray-600/30' : 'border-gray-200'}`}
                  >
                    <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-t-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-all duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-900/80' : 'from-white/80'} to-transparent`} />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        {project.icon}
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-gray-600/30 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                          {project.category}
                        </span>
                      </div>
                      <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{project.title}</h3>
                      <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                      <button className={`flex items-center text-sm font-medium ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-blue-600 hover:text-blue-700'}`}>
                        View Project
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="text-center mt-16"
              >
                <Link
                  to="/portfolio"
                  className={`inline-flex items-center px-6 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition-colors duration-300`}
                >
                  View All Projects
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Newsletter Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          >
            {/* Background with tech pattern */}
            <div className="absolute inset-0">
              <img
                src={abstractTechBg}
                alt="Abstract technology background"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'}`} />
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <motion.div
                variants={itemVariants}
                className={`p-8 md:p-12 rounded-2xl ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm shadow-lg border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-primary-900/30' : 'bg-blue-100/50'} mb-6 mx-auto`}>
                  <LightBulbIcon className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-blue-600'}`} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Stay Updated
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                  Subscribe to our newsletter for the latest tech insights and updates.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-900 text-white placeholder-gray-400 focus:ring-primary-500' : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-blue-500'}`}
                  />
                  <button
                    type="submit"
                    className={`px-8 py-3 rounded-lg transform transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white'}`}
                  >
                    Subscribe
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.section>
        </>
      )}
    </div>
  );
};

export default Home;