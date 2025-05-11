import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  CheckIcon,
  StarIcon,
  ShoppingCartIcon,
  ArrowLongRightIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Services = () => {
  const [selectedService, setSelectedService] = useState('web-development');
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const { addToCart } = useCart();
  const [selectedTab, setSelectedTab] = useState('features');

  const handleAddToCart = (plan) => {
    addToCart({
      id: plan.name.toLowerCase().replace(/\s+/g, '-'),
      title: plan.name,
      price: plan.price,
      type: 'service-plan',
      description: plan.details,
      category: selectedService,
      features: plan.features
    });
  };  // Handle smooth scrolling to service details
  const scrollToDetails = () => {
    const element = document.getElementById('service-details');
    if (element) {
      const offset = 80; // Account for sticky header or navigation
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              We offer a comprehensive range of digital solutions to help your business thrive in the modern world.
              From web development to AI solutions, we've got you covered.
            </p>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a href="#explore" className="btn-primary">
                Explore Services
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </a>
              <a href="/contact" className="btn-secondary">
                Get in Touch
                <ArrowLongRightIcon className="h-5 w-5 ml-2" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Cards */}
      <section id="explore" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}                className={`group p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  selectedService === service.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 shadow-xl'
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-xl'
                } cursor-pointer`}
              >
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <button                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service.id);
                      scrollToDetails();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedService === service.id
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/10 dark:text-primary-400 dark:hover:bg-primary-900/20'
                    }`}
                  >
                    {selectedService === service.id ? 'Active' : 'Activate'}
                  </button>
                  <div className="flex items-center text-primary-600 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-semibold">Learn More</span>
                    <ChevronRightIcon className="h-5 w-5 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Information */}
      <section id="service-details" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {services.map((service) => (
              service.id === selectedService && (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <motion.h2 
                          className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {service.title}
                        </motion.h2>
                        <motion.p 
                          className="text-gray-600 dark:text-gray-300 mb-8 text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {service.detailedDescription}
                        </motion.p>
                        
                        {/* Tabs */}
                        <div className="mb-8">
                          <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                            {['features', 'technologies', 'process'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`pb-4 px-4 text-lg font-medium capitalize transition-colors ${
                                  selectedTab === tab
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-primary-600'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>
                          
                          <div className="space-y-4">
                            {selectedTab === 'features' && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                              >
                                {service.features.map((feature, index) => (
                                  <div key={index} className="flex items-start">
                                    <CheckIcon className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                                    <p className="text-gray-600 dark:text-gray-300">{feature}</p>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                            
                            {selectedTab === 'technologies' && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap gap-3"
                              >
                                {service.technologies.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm border border-gray-200 dark:border-gray-600"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </motion.div>
                            )}
                            
                            {selectedTab === 'process' && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                              >
                                {service.process.map((step, index) => (
                                  <div key={index} className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 font-bold mr-4">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        {step.title}
                                      </h4>
                                      <p className="text-gray-600 dark:text-gray-300">
                                        {step.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                          Service Highlights
                        </h3>
                        <div className="space-y-6">
                          {service.highlights.map((highlight, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start"
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0 mr-4">
                                <highlight.icon className="h-5 w-5 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {highlight.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {highlight.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                          <a
                            href="/contact"
                            className="block w-full py-3 px-6 text-center text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
                          >
                            Get Started
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Pricing Plans
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan that fits your business needs and budget.
              All plans include our standard features with varying levels of support and customization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col ${plan.isPopular ? 'md:scale-105' : ''}`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <StarIcon className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div 
                  className={`flex-1 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-300 overflow-hidden ${
                    hoveredPlan === index 
                      ? 'transform -translate-y-2 shadow-2xl ring-2 ring-primary-500 ring-opacity-50'
                      : 'shadow-md hover:shadow-xl'
                  }`}
                >
                  <div className="relative">
                    {plan.isPopular && (
                      <div className="absolute -right-12 top-5 transform rotate-45 bg-primary-600 text-white px-12 py-1 text-sm font-semibold">
                        Popular Choice
                      </div>
                    )}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative">
                        {plan.name}
                        {plan.isPopular && (
                          <span className="absolute -top-1 -right-6">
                            <StarIcon className="h-5 w-5 text-yellow-400" />
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center justify-center mb-4">
                        <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                          {plan.price}
                        </span>
                        {plan.price !== 'Custom' && (
                          <span className="text-gray-500 dark:text-gray-400 ml-2 text-lg">/project</span>
                        )}
                      </div>
                      {plan.bonus && (
                        <div className="bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center">
                          <StarIcon className="h-4 w-4 mr-1" />
                          {plan.bonus}
                        </div>
                      )}
                    </div>
                    <ul className="space-y-4 mb-8 relative">
                      {plan.features.map((feature, idx) => (
                        <li 
                          key={idx} 
                          className={`flex items-start transition-all duration-200 ${
                            hoveredPlan === index ? 'transform hover:scale-105' : ''
                          }`}
                        >
                          <div className="mr-3 mt-0.5">
                            <div className={`rounded-full p-1 ${
                              idx < 3 ? 'bg-primary-100 dark:bg-primary-900/20' : 'bg-transparent'
                            }`}>
                              <CheckIcon className={`h-4 w-4 ${
                                idx < 3 
                                  ? 'text-primary-600 dark:text-primary-400'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`} />
                            </div>
                          </div>
                          <div>
                            <span className={`${
                              idx < 3 
                                ? 'text-gray-900 dark:text-white font-medium'
                                : 'text-gray-600 dark:text-gray-300'
                            }`}>
                              {feature}
                            </span>
                            {idx === 0 && plan.isPopular && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Most Popular
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleAddToCart(plan)}
                        className={`w-full group relative flex items-center justify-center py-3 px-6 rounded-lg transition-all duration-300 ${
                          plan.isPopular
                            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-primary-500/25'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <ShoppingCartIcon className={`h-5 w-5 mr-2 transform transition-transform group-hover:scale-110 ${
                          plan.isPopular ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                        }`} />
                        <span className="relative">
                          Choose {plan.name}
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform group-hover:scale-x-100" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Let's discuss your project and find the perfect solution for your business needs.
              Our team is ready to help you succeed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="btn-white"
              >
                Get Started
                <ArrowLongRightIcon className="h-5 w-5 ml-2" />
              </a>
              <a
                href="/portfolio"
                className="btn-outline-white"
              >
                View Our Work
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Updated services data
const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies.',
    detailedDescription: 'We create responsive, user-friendly websites and web applications using the latest technologies. Our team specializes in frontend and backend development, ensuring your digital presence is both beautiful and functional.',
    icon: CodeBracketIcon,
    features: [
      'Responsive design for all devices',
      'Modern frontend frameworks (React, Vue, Angular)',
      'Backend development with Node.js, Python, or PHP',
      'Database integration and optimization',
      'API development and integration',
      'Performance optimization'
    ],
    technologies: [
      'React', 'Vue.js', 'Node.js', 'MongoDB', 'PostgreSQL', 
      'GraphQL', 'TypeScript', 'Next.js', 'Tailwind CSS'
    ],
    process: [
      {
        title: 'Discovery & Planning',
        description: 'We analyze your requirements and create a detailed project roadmap.'
      },
      {
        title: 'Design & Prototyping',
        description: 'Creating wireframes and interactive prototypes for your approval.'
      },
      {
        title: 'Development',
        description: 'Building your solution using modern technologies and best practices.'
      },
      {
        title: 'Testing & Deployment',
        description: 'Rigorous testing and smooth deployment to production.'
      }
    ],
    highlights: [
      {
        title: 'SEO Optimized',
        description: 'Built with search engines in mind to improve your visibility',
        icon: CodeBracketIcon
      },
      {
        title: 'Performance First',
        description: 'Optimized for speed and efficiency across all devices',
        icon: CodeBracketIcon
      },
      {
        title: 'Scalable Architecture',
        description: 'Built to grow with your business needs',
        icon: CodeBracketIcon
      }
    ]
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    detailedDescription: 'We develop high-performance mobile applications that provide seamless user experiences across iOS and Android platforms. Our apps are built with scalability and security in mind.',
    icon: DevicePhoneMobileIcon,
    features: [
      'Native iOS and Android development',
      'Cross-platform solutions with React Native',
      'User-friendly interfaces',
      'Offline functionality',
      'Push notifications',
      'App store optimization'
    ],
    technologies: [
      'React Native', 'Flutter', 'Swift', 'Kotlin', 
      'Firebase', 'Redux', 'GraphQL', 'MongoDB'
    ],
    process: [
      {
        title: 'Requirements Analysis',
        description: 'Understanding your app needs and target audience.'
      },
      {
        title: 'UI/UX Design',
        description: 'Creating intuitive and engaging user interfaces.'
      },
      {
        title: 'Development',
        description: 'Building your app with the chosen technology stack.'
      },
      {
        title: 'Testing & Launch',
        description: 'Comprehensive testing and app store submission.'
      }
    ],
    highlights: [
      {
        title: 'Cross-Platform',
        description: 'One codebase for both iOS and Android platforms',
        icon: DevicePhoneMobileIcon
      },
      {
        title: 'Offline First',
        description: 'Apps work seamlessly with or without internet',
        icon: DevicePhoneMobileIcon
      },
      {
        title: 'Cloud Integration',
        description: 'Seamless integration with cloud services',
        icon: DevicePhoneMobileIcon
      }
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Artificial Intelligence and Machine Learning solutions for your business.',
    detailedDescription: 'We leverage the power of AI and machine learning to create intelligent solutions that automate processes, analyze data, and provide valuable insights for your business.',
    icon: CpuChipIcon,
    features: [
      'Machine learning models',
      'Natural language processing',
      'Computer vision',
      'Predictive analytics',
      'Data processing automation',
      'AI-powered chatbots'
    ],
    technologies: [
      'TensorFlow', 'PyTorch', 'scikit-learn', 'OpenAI', 
      'Python', 'Jupyter', 'Pandas', 'NumPy'
    ],
    process: [
      {
        title: 'Data Collection',
        description: 'Gathering and preprocessing relevant data.'
      },
      {
        title: 'Model Development',
        description: 'Creating and training AI models.'
      },
      {
        title: 'Integration',
        description: 'Implementing AI solutions in your systems.'
      },
      {
        title: 'Monitoring & Optimization',
        description: 'Continuous improvement of AI performance.'
      }
    ],
    highlights: [
      {
        title: 'Custom AI Models',
        description: 'Tailored to your specific business needs',
        icon: CpuChipIcon
      },
      {
        title: 'Data Privacy',
        description: 'Secure handling of sensitive information',
        icon: CpuChipIcon
      },
      {
        title: 'Scalable Solutions',
        description: 'AI systems that grow with your business',
        icon: CpuChipIcon
      }
    ]
  }
];

// Updated pricing plans
const pricingPlans = [
  {
    name: 'Basic',
    price: '$1,500',
    isPopular: false,
    features: [
      'Professional Website (up to 5 pages)',
      'Mobile-First Responsive Design',
      'Essential SEO Optimization',
      'Interactive Contact Form',
      'Basic Analytics Integration',
      '30-Day Priority Support',
      'Weekly Backup System'
    ],
    bonus: '🎁 Free Domain & Basic Hosting for 1 Year'
  },
  {
    name: 'Business',
    price: '$3,500',
    isPopular: true,
    features: [
      'Enhanced Website (up to 15 pages)',
      'Custom Design & Branding',
      'Advanced SEO & Performance',
      'CMS with Blog Integration',
      'E-commerce Ready Setup',
      '90-Day Premium Support',
      'Daily Backup & Security'
    ],
    bonus: '🔥 Free SSL + Premium Hosting + SEO Audit'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    isPopular: false,
    features: [
      'Unlimited Pages & Features',
      'Bespoke Design & Development',
      'Advanced User Authentication',
      'Custom API Development',
      'Database & System Integration',
      '6-Month Dedicated Support',
      'Continuous Optimization'
    ],
    bonus: '⭐ 3 Months Free Maintenance & Updates'
  }
];

export default Services;