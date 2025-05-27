import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  PhoneIcon
} from '@heroicons/react/24/outline';

const About = () => {

  const milestones = [
    {
      year: '2024',
      title: 'Company Founded',
      description: 'TechNest Solutions was established with a vision to revolutionize digital transformation.'
    },
    {
      year: '2024 Q2',
      title: 'First Major Project',
      description: 'Successfully completed our first enterprise-level project, setting new industry standards.'
    },
    {
      year: '2024 Q3',
      title: 'Team Expansion',
      description: 'Expanded our team to 20+ professionals, bringing diverse expertise onboard.'
    },
    {
      year: '2024 Q4',
      title: 'Global Recognition',
      description: 'Received international recognition for innovation in digital solutions.'
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
      year: '2024'
    },
    {
      title: 'Excellence in Digital Solutions',
      organization: 'Global Tech Forum',
      year: '2024'
    },
    {
      title: 'Innovation in Web Development',
      organization: 'Web Development Association',
      year: '2024'
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

  const services = [
    {
      title: 'Website Design & Development',
      icon: CodeBracketIcon,
      items: [
        'MERN Stack Website',
        'Personal Portfolio',
        'Business/Agency Website',
        'E-commerce Website',
        'Landing Page Design',
        'Blog Website'
      ]
    },
    {
      title: 'UI/UX Design',
      icon: PaintBrushIcon,
      items: [
        'Figma Web & App UI Design',
        'Wireframe to UI',
        'Dark/Light Theme Design',
        'Dashboard UI'
      ]
    },
    {
      title: 'Web App Development',
      icon: CubeTransparentIcon,
      items: [
        'Admin Dashboard',
        'CRM System',
        'SaaS Tools',
        'Booking App',
        'Blood Donor Management',
        'Resume Builder'
      ]
    },
    {
      title: 'Maintenance & Bug Fixing',
      icon: WrenchScrewdriverIcon,
      items: [
        'Speed Optimization',
        'Mobile Responsiveness Fix',
        'Bug Fixing & Code Refactor',
        'SEO Optimization'
      ]
    },
    {
      title: 'Custom CMS & Dashboard',
      icon: ServerIcon,
      items: [
        'React Admin Panel',
        'Firebase Dashboard',
        'Node.js + MongoDB CMS',
        'Content Management System'
      ]
    },
    {
      title: 'Template Design & Sale',
      icon: CommandLineIcon,
      items: [
        'HTML/CSS Templates',
        'React Templates',
        'Tailwind UI Kits',
        'Gumroad Template Setup'
      ]
    },
    {
      title: 'API Integration & Backend',
      icon: CloudArrowUpIcon,
      items: [
        'Third-party API Integration',
        'Authentication (JWT, Firebase)',
        'REST API / GraphQL Setup',
        'Admin CRUD Operations'
      ]
    },
    {
      title: 'Conversion Services',
      icon: ChatBubbleBottomCenterTextIcon,
      items: [
        'PSD/Figma/XD to HTML',
        'HTML to React',
        'Static Site to Dynamic'
      ]
    },
    {
      title: 'Hosting & Deployment',
      icon: CloudArrowUpIcon,
      items: [
        'Domain/Hosting Setup',
        'Firebase / Vercel / Netlify Deployment',
        'Email Setup'
      ]
    },
    {
      title: 'Additional Services',
      icon: DevicePhoneMobileIcon,
      items: [
        'Mobile App Development (React Native)',
        'WordPress Development',
        'Graphics Design',
        'Social Media Management'
      ]
    }
  ];

  const showFloatingContact = true;

  return (
    <div className="pt-0 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading mb-6">Our Story</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Founded in 2024, TechNest Solutions emerged from a shared vision to revolutionize the digital landscape. 
              We believe in the power of technology to transform businesses and create meaningful impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To empower businesses with innovative digital solutions that drive growth, efficiency, and success in the modern world.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We combine cutting-edge technology with creative thinking to deliver exceptional results for our clients.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl"
            >
              <h2 className="heading mb-6">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300">
                To be the leading digital transformation partner for businesses worldwide, known for our innovation, 
                reliability, and commitment to excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="subheading mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A diverse group of passionate professionals dedicated to delivering excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="subheading mb-1">{member.name}</h3>
                <p className="text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/team"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Meet the Full Team
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A timeline of our growth and achievements since our inception.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-900/30"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`mb-8 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2 px-4">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-1/2 px-4 text-center">
                  <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg">
                    {milestone.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Culture Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Our Office Culture</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We believe in creating an environment where everyone can thrive and grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeCulture.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Awards & Recognition</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrophyIcon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{award.organization}</p>
                <p className="text-primary-600">{award.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Community Involvement</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We believe in giving back to the community and making a positive impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <initiative.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {showFloatingContact && (
        <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50">
          <a
            href="/contact"
            className="flex items-center gap-2 bg-primary-600/90 backdrop-blur-sm hover:bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-colors text-sm sm:text-base"
            style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
          >
            <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Contact Us</span>
            <span className="sm:hidden">Chat</span>
          </a>
        </div>
      )}
    </div>
  );
};

// Temporary data - will be replaced with API calls
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

const teamMembers = [
  {
    name: 'Nazat Hossain',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 4+ years of experience in technology and business strategy.',
    image: '/ceo.png',
  },
  {
    name: 'Liza Akter',
    role: 'Project Manager',
    bio: 'Experienced project manager with a knack for delivering projects on time and within budget.',
    image: '/liza.png',
  },
  {
    name: 'Halima Khatun',
    role: 'UI/UX Designer',
    bio: 'Creative designer with a passion for crafting intuitive and engaging user experiences.',  
    image: '/halima.png',
  }
];

export default About;