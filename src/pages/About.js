// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import PageLayout from '../components/PageLayout';
// import { 
//   LightBulbIcon, 
//   UserGroupIcon, 
//   ChartBarIcon,
//   HeartIcon,
//   ShieldCheckIcon,
//   SparklesIcon,
//   TrophyIcon,
//   BuildingOfficeIcon,
//   GlobeAltIcon,
//   CalendarIcon,
//   CodeBracketIcon,
//   PaintBrushIcon,
//   WrenchScrewdriverIcon,
//   ServerIcon,
//   CommandLineIcon,
//   CloudArrowUpIcon,
//   CubeTransparentIcon,
//   ChatBubbleBottomCenterTextIcon,
//   DevicePhoneMobileIcon,
//   PhoneIcon
// } from '@heroicons/react/24/outline';
// import { useTheme } from '../context/ThemeContext';

// const About = () => {
// const { isDarkMode } = useTheme();

//   const milestones = [
//     {
//       year: '2024',
//       title: 'Company Founded',
//       description: 'TechNest Solutions was established with a vision to revolutionize digital transformation.'
//     },
//     {
//       year: '2024 Q2',
//       title: 'First Major Project',
//       description: 'Successfully completed our first enterprise-level project, setting new industry standards.'
//     },
//     {
//       year: '2024 Q3',
//       title: 'Team Expansion',
//       description: 'Expanded our team to 20+ professionals, bringing diverse expertise onboard.'
//     },
//     {
//       year: '2024 Q4',
//       title: 'Global Recognition',
//       description: 'Received international recognition for innovation in digital solutions.'
//     }
//   ];

//   const officeCulture = [
//     {
//       title: 'Work-Life Balance',
//       description: 'Flexible work hours and remote work options to ensure our team maintains a healthy balance.',
//       icon: CalendarIcon
//     },
//     {
//       title: 'Learning & Growth',
//       description: 'Regular training sessions, workshops, and conference sponsorships for continuous learning.',
//       icon: ChartBarIcon
//     },
//     {
//       title: 'Team Building',
//       description: 'Regular team outings, hackathons, and collaborative projects to strengthen bonds.',
//       icon: UserGroupIcon
//     }
//   ];

//   const awards = [
//     {
//       title: 'Best Tech Startup 2024',
//       organization: 'Tech Innovation Awards',
//       year: '2024'
//     },
//     {
//       title: 'Excellence in Digital Solutions',
//       organization: 'Global Tech Forum',
//       year: '2024'
//     },
//     {
//       title: 'Innovation in Web Development',
//       organization: 'Web Development Association',
//       year: '2024'
//     }
//   ];

//   const communityInitiatives = [
//     {
//       title: 'Tech Education',
//       description: 'Providing free coding workshops and mentorship programs for underprivileged students.',
//       icon: GlobeAltIcon
//     },
//     {
//       title: 'Environmental Responsibility',
//       description: 'Implementing green practices in our office and supporting environmental causes.',
//       icon: HeartIcon
//     },
//     {
//       title: 'Local Community Support',
//       description: 'Active participation in local community development and charity programs.',
//       icon: BuildingOfficeIcon
//     }
//   ];

//   const services = [
//     {
//       title: 'Website Design & Development',
//       icon: CodeBracketIcon,
//       items: [
//         'MERN Stack Website',
//         'Personal Portfolio',
//         'Business/Agency Website',
//         'E-commerce Website',
//         'Landing Page Design',
//         'Blog Website'
//       ]
//     },
//     {
//       title: 'UI/UX Design',
//       icon: PaintBrushIcon,
//       items: [
//         'Figma Web & App UI Design',
//         'Wireframe to UI',
//         'Dark/Light Theme Design',
//         'Dashboard UI'
//       ]
//     },
//     {
//       title: 'Web App Development',
//       icon: CubeTransparentIcon,
//       items: [
//         'Admin Dashboard',
//         'CRM System',
//         'SaaS Tools',
//         'Booking App',
//         'Blood Donor Management',
//         'Resume Builder'
//       ]
//     },
//     {
//       title: 'Maintenance & Bug Fixing',
//       icon: WrenchScrewdriverIcon,
//       items: [
//         'Speed Optimization',
//         'Mobile Responsiveness Fix',
//         'Bug Fixing & Code Refactor',
//         'SEO Optimization'
//       ]
//     },
//     {
//       title: 'Custom CMS & Dashboard',
//       icon: ServerIcon,
//       items: [
//         'React Admin Panel',
//         'Firebase Dashboard',
//         'Node.js + MongoDB CMS',
//         'Content Management System'
//       ]
//     },
//     {
//       title: 'Template Design & Sale',
//       icon: CommandLineIcon,
//       items: [
//         'HTML/CSS Templates',
//         'React Templates',
//         'Tailwind UI Kits',
//         'Gumroad Template Setup'
//       ]
//     },
//     {
//       title: 'API Integration & Backend',
//       icon: CloudArrowUpIcon,
//       items: [
//         'Third-party API Integration',
//         'Authentication (JWT, Firebase)',
//         'REST API / GraphQL Setup',
//         'Admin CRUD Operations'
//       ]
//     },
//     {
//       title: 'Conversion Services',
//       icon: ChatBubbleBottomCenterTextIcon,
//       items: [
//         'PSD/Figma/XD to HTML',
//         'HTML to React',
//         'Static Site to Dynamic'
//       ]
//     },
//     {
//       title: 'Hosting & Deployment',
//       icon: CloudArrowUpIcon,
//       items: [
//         'Domain/Hosting Setup',
//         'Firebase / Vercel / Netlify Deployment',
//         'Email Setup'
//       ]
//     },
//     {
//       title: 'Additional Services',
//       icon: DevicePhoneMobileIcon,
//       items: [
//         'Mobile App Development (React Native)',
//         'WordPress Development',
//         'Graphics Design',
//         'Social Media Management'
//       ]
//     }
//   ];

//   const showFloatingContact = true;

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
//       title="About TechNest"
//       subtitle="Pioneering Digital Excellence Through Innovation and Expertise"
//     >
//       {/* Mission & Vision */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="mb-20"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <motion.div
//             variants={itemVariants}
//             className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300"
//           >
//             <LightBulbIcon className="h-12 w-12 text-primary-400 mb-4" />
//             <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
//             <p className="text-gray-300">
//               To empower businesses through innovative digital solutions, driving growth and transformation in the modern tech landscape.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300"
//           >
//             <SparklesIcon className="h-12 w-12 text-secondary-400 mb-4" />
//             <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
//             <p className="text-gray-300">
//               To be the leading force in digital innovation, setting new standards in technology solutions globally.
//             </p>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Timeline */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="mb-20"
//       >
//         <motion.h2
//           variants={itemVariants}
//           className="text-3xl font-bold text-white text-center mb-12"
//         >
//           Our Journey
//         </motion.h2>
//         <div className="relative">
//           {/* Timeline line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500" />
          
//           <div className="space-y-16">
//             {milestones.map((milestone, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className={`flex items-center ${
//                   index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
//                 } gap-8`}
//               >
//                 <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
//                   <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
//                     <span className="text-primary-400 font-bold">{milestone.year}</span>
//                     <h3 className="text-xl font-bold text-white mt-2">{milestone.title}</h3>
//                     <p className="text-gray-300 mt-2">{milestone.description}</p>
//                   </div>
//                 </div>
//                 <div className="relative flex items-center justify-center">
//                   <div className="w-8 h-8 bg-primary-500 rounded-full border-4 border-gray-900" />
//                 </div>
//                 <div className="flex-1" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Office Culture */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="mb-20"
//       >
//         <motion.h2
//           variants={itemVariants}
//           className="text-3xl font-bold text-white text-center mb-12"
//         >
//           Our Culture
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {officeCulture.map((item, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
//             >
//               <item.icon className="h-12 w-12 text-primary-400 mb-4" />
//               <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
//               <p className="text-gray-300">{item.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Awards */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="mb-20"
//       >
//         <motion.h2
//           variants={itemVariants}
//           className="text-3xl font-bold text-white text-center mb-12"
//         >
//           Recognition & Awards
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {awards.map((award, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               className="relative group p-6 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
//             >
//               <TrophyIcon className="h-12 w-12 text-primary-400 mb-4" />
//               <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
//               <p className="text-gray-400">{award.organization}</p>
//               <span className="text-primary-400 font-bold">{award.year}</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Community Initiatives */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="mb-20"
//       >
//         <motion.h2
//           variants={itemVariants}
//           className="text-3xl font-bold text-white text-center mb-12"
//         >
//           Community Impact
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {communityInitiatives.map((initiative, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
//             >
//               <initiative.icon className="h-12 w-12 text-secondary-400 mb-4" />
//               <h3 className="text-xl font-bold text-white mb-2">{initiative.title}</h3>
//               <p className="text-gray-300">{initiative.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* CTA Section */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="text-center mb-20"
//       >
//         <motion.div
//           variants={itemVariants}
//           className="p-12 bg-white/5 backdrop-blur-md rounded-2xl relative overflow-hidden"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Ideas?
//           </h2>
//           <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//             Join us in creating innovative solutions that drive business success in the digital age.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transform transition hover:scale-105 shadow-lg"
//           >
//             Get In Touch
//             <PhoneIcon className="w-5 h-5 ml-2" />
//           </Link>
//           <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10" />
//         </motion.div>
//       </motion.section>
//     </PageLayout>
//   );
// };

// // Temporary data - will be replaced with API calls
// const values = [
//   {
//     title: 'Innovation',
//     description: 'We constantly push boundaries and explore new possibilities in technology.',
//     icon: LightBulbIcon,
//   },
//   {
//     title: 'Collaboration',
//     description: 'We believe in the power of teamwork and open communication.',
//     icon: UserGroupIcon,
//   },
//   {
//     title: 'Excellence',
//     description: 'We strive for perfection in everything we do, delivering the highest quality solutions.',
//     icon: SparklesIcon,
//   },
//   {
//     title: 'Integrity',
//     description: 'We maintain the highest ethical standards and transparency in all our dealings.',
//     icon: ShieldCheckIcon,
//   },
//   {
//     title: 'Growth',
//     description: 'We are committed to continuous learning and improvement.',
//     icon: ChartBarIcon,
//   },
//   {
//     title: 'Passion',
//     description: 'We love what we do and are dedicated to making a positive impact.',
//     icon: HeartIcon,
//   },
// ];

// const teamMembers = [
//   {
//     name: 'Nazat Hossain',
//     role: 'CEO & Founder',
//     bio: 'Visionary leader with 4+ years of experience in technology and business strategy.',
//     image: '/ceo.png',
//   },
//   {
//     name: 'Liza Akter',
//     role: 'Project Manager',
//     bio: 'Experienced project manager with a knack for delivering projects on time and within budget.',
//     image: '/liza.png',
//   },
//   {
//     name: 'Halima Khatun',
//     role: 'UI/UX Designer',
//     bio: 'Creative designer with a passion for crafting intuitive and engaging user experiences.',  
//     image: '/halima.png',
//   }
// ];

// export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { 
  LightBulbIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  CalendarIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  ServerIcon,
  CommandLineIcon,
  CloudArrowUpIcon,
  CubeTransparentIcon,
  ChatBubbleBottomCenterTextIcon,
  DevicePhoneMobileIcon,
  PhoneIcon,
  MoonIcon,
  SunIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  PuzzlePieceIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const milestones = [
    {
      year: '2024',
      title: 'Company Founded',
      description: 'TechNest Solutions was established with a vision to revolutionize digital transformation.',
      icon: RocketLaunchIcon
    },
    {
      year: '2024 Q2',
      title: 'First Major Project',
      description: 'Successfully completed our first enterprise-level project, setting new industry standards.',
      icon: PuzzlePieceIcon
    },
    {
      year: '2024 Q3',
      title: 'Team Expansion',
      description: 'Expanded our team to 20+ professionals, bringing diverse expertise onboard.',
      icon: UserGroupIcon
    },
    {
      year: '2024 Q4',
      title: 'Global Recognition',
      description: 'Received international recognition for innovation in digital solutions.',
      icon: TrophyIcon
    }
  ];

  const officeCulture = [
    {
      title: 'Work-Life Balance',
      description: 'Flexible work hours and remote work options to ensure our team maintains a healthy balance.',
      icon: CalendarIcon
    },
    {
      title: 'Learning & Growth',
      description: 'Regular training sessions, workshops, and conference sponsorships for continuous learning.',
      icon: ChartBarIcon
    },
    {
      title: 'Team Building',
      description: 'Regular team outings, hackathons, and collaborative projects to strengthen bonds.',
      icon: UserGroupIcon
    }
  ];

  const awards = [
    {
      title: 'Best Tech Startup 2024',
      organization: 'Tech Innovation Awards',
      year: '2024',
      icon: TrophyIcon
    },
    {
      title: 'Excellence in Digital Solutions',
      organization: 'Global Tech Forum',
      year: '2024',
      icon: HandThumbUpIcon
    },
    {
      title: 'Innovation in Web Development',
      organization: 'Web Development Association',
      year: '2024',
      icon: SparklesIcon
    }
  ];

  const communityInitiatives = [
    {
      title: 'Tech Education',
      description: 'Providing free coding workshops and mentorship programs for underprivileged students.',
      icon: GlobeAltIcon
    },
    {
      title: 'Environmental Responsibility',
      description: 'Implementing green practices in our office and supporting environmental causes.',
      icon: HeartIcon
    },
    {
      title: 'Local Community Support',
      description: 'Active participation in local community development and charity programs.',
      icon: BuildingOfficeIcon
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new possibilities in technology.',
      icon: LightBulbIcon,
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication.',
      icon: UserGroupIcon,
    },
    {
      title: 'Excellence',
      description: 'We strive for perfection in everything we do, delivering the highest quality solutions.',
      icon: SparklesIcon,
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest ethical standards and transparency in all our dealings.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Growth',
      description: 'We are committed to continuous learning and improvement.',
      icon: ChartBarIcon,
    },
    {
      title: 'Passion',
      description: 'We love what we do and are dedicated to making a positive impact.',
      icon: HeartIcon,
    },
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
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <PageLayout
      title="About TechNest"
      subtitle="Pioneering Digital Excellence Through Innovation and Expertise"
    >
     

      {/* Mission & Vision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className={`p-8 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700' 
                : 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200'
            } shadow-xl`}
          >
            <div className={`p-3 rounded-full inline-block ${
              isDarkMode ? 'bg-primary-900/30' : 'bg-primary-100'
            }`}>
              <LightBulbIcon className={`h-10 w-10 ${
                isDarkMode ? 'text-primary-400' : 'text-primary-600'
              }`} />
            </div>
            <h3 className={`text-2xl font-bold mb-4 mt-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Our Mission</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              To empower businesses through innovative digital solutions, driving growth and transformation in the modern tech landscape.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className={`p-8 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700' 
                : 'bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200'
            } shadow-xl`}
          >
            <div className={`p-3 rounded-full inline-block ${
              isDarkMode ? 'bg-secondary-900/30' : 'bg-secondary-100'
            }`}>
              <SparklesIcon className={`h-10 w-10 ${
                isDarkMode ? 'text-secondary-400' : 'text-secondary-600'
              }`} />
            </div>
            <h3 className={`text-2xl font-bold mb-4 mt-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Our Vision</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              To be the leading force in digital innovation, setting new standards in technology solutions globally.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Our Core Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className={`p-6 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'
              } shadow-md`}
            >
              <div className={`p-3 rounded-full inline-flex items-center justify-center ${
                isDarkMode ? 'bg-primary-900/20' : 'bg-primary-100'
              }`}>
                <value.icon className={`h-8 w-8 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                }`} />
              </div>
              <h3 className={`text-xl font-bold mt-4 mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{value.title}</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Our Journey
        </motion.h2>
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
            isDarkMode 
              ? 'bg-gradient-to-b from-primary-500 to-secondary-500' 
              : 'bg-gradient-to-b from-blue-400 to-purple-400'
          }`} />
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className={`flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`p-6 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50'
                  } shadow-md`}>
                    <div className={`inline-flex items-center gap-2 ${
                      isDarkMode ? 'text-primary-400' : 'text-blue-600'
                    } font-bold`}>
                      <milestone.icon className="h-5 w-5" />
                      <span>{milestone.year}</span>
                    </div>
                    <h3 className={`text-xl font-bold mt-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{milestone.title}</h3>
                    <p className={`mt-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{milestone.description}</p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 ${
                    isDarkMode 
                      ? 'bg-primary-500 border-gray-900' 
                      : 'bg-blue-500 border-white'
                  }`} />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Office Culture */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Our Culture
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officeCulture.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className={`p-6 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800' 
                  : 'bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-gray-100'
              } shadow-md`}
            >
              <div className={`p-3 rounded-full inline-flex items-center justify-center ${
                isDarkMode ? 'bg-primary-900/20' : 'bg-primary-100'
              }`}>
                <item.icon className={`h-8 w-8 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                }`} />
              </div>
              <h3 className={`text-xl font-bold mt-4 mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{item.title}</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Awards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Recognition & Awards
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className={`relative group p-6 rounded-xl overflow-hidden transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'
              } shadow-md`}
            >
              <div className={`p-3 rounded-full inline-flex items-center justify-center ${
                isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-100'
              }`}>
                <award.icon className={`h-8 w-8 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`} />
              </div>
              <h3 className={`text-xl font-bold mt-4 mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{award.title}</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {award.organization}
              </p>
              <span className={`font-bold ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>{award.year}</span>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10' 
                  : 'bg-gradient-to-r from-blue-400/10 to-purple-400/10'
              }`} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Community Initiatives */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Community Impact
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityInitiatives.map((initiative, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className={`p-6 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800' 
                  : 'bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-gray-100'
              } shadow-md`}
            >
              <div className={`p-3 rounded-full inline-flex items-center justify-center ${
                isDarkMode ? 'bg-green-900/20' : 'bg-green-100'
              }`}>
                <initiative.icon className={`h-8 w-8 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
              <h3 className={`text-xl font-bold mt-4 mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{initiative.title}</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {initiative.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="text-center mb-20"
      >
        <motion.div
          variants={itemVariants}
          className={`p-12 rounded-2xl relative overflow-hidden shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50'
          }`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Ready to Transform Your Ideas?
          </h2>
          <p className={`mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join us in creating innovative solutions that drive business success in the digital age.
          </p>
          <Link
            to="/contact"
            className={`inline-flex items-center px-8 py-4 rounded-lg transform transition hover:scale-105 shadow-lg ${
              isDarkMode 
                ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            Get In Touch
            <PhoneIcon className="w-5 h-5 ml-2" />
          </Link>
          <div className={`absolute inset-0 -z-10 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20' 
              : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
          }`} />
        </motion.div>
      </motion.section>
    </PageLayout>
  );
};

export default About;