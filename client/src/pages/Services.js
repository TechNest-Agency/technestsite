import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const Services = () => {
  const [selectedService, setSelectedService] = useState('web-development');

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading mb-6">Our Services</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We offer a comprehensive range of digital solutions to help your business thrive in the modern world.
              From web development to AI solutions, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedService === service.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="subheading mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Information */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedService === service.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`${selectedService === service.id ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="heading mb-6">{service.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.detailedDescription}
                  </p>
                  <div className="space-y-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckIcon className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                        <p className="text-gray-600 dark:text-gray-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
                  <h3 className="subheading mb-6">Pricing Plans</h3>
                  <div className="space-y-6">
                    {service.pricingPlans.map((plan, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                      >
                        <h4 className="font-semibold text-lg mb-2">{plan.name}</h4>
                        <p className="text-3xl font-bold mb-4">
                          {plan.price}
                          <span className="text-sm font-normal text-gray-500">/project</span>
                        </p>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                              <CheckIcon className="h-5 w-5 text-primary-600 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-600 rounded-xl p-12 text-center"
          >
            <h2 className="heading text-white mb-6">Ready to Get Started?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and find the perfect solution for your business needs.
            </p>
            <a
              href="/contact"
              className="btn bg-white text-primary-600 hover:bg-gray-100"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Temporary data - will be replaced with API calls
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
      'Performance optimization and SEO',
    ],
    pricingPlans: [
      {
        name: 'Basic Website',
        price: '$1,500',
        features: [
          'Up to 5 pages',
          'Responsive design',
          'Basic SEO setup',
          'Contact form',
          '1 month support',
        ],
      },
      {
        name: 'Business Website',
        price: '$3,500',
        features: [
          'Up to 15 pages',
          'Custom design',
          'Advanced SEO',
          'Blog integration',
          '3 months support',
        ],
      },
      {
        name: 'Web Application',
        price: 'Custom',
        features: [
          'Custom features',
          'User authentication',
          'Database integration',
          'API development',
          '6 months support',
        ],
      },
    ],
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
      'App store optimization',
    ],
    pricingPlans: [
      {
        name: 'Basic App',
        price: '$5,000',
        features: [
          'Single platform (iOS or Android)',
          'Basic features',
          'Simple UI/UX',
          'Basic backend',
          '3 months support',
        ],
      },
      {
        name: 'Business App',
        price: '$10,000',
        features: [
          'Both platforms',
          'Advanced features',
          'Custom UI/UX',
          'API integration',
          '6 months support',
        ],
      },
      {
        name: 'Enterprise App',
        price: 'Custom',
        features: [
          'Custom features',
          'Advanced security',
          'Cloud integration',
          'Analytics dashboard',
          '12 months support',
        ],
      },
    ],
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
      'AI-powered chatbots',
    ],
    pricingPlans: [
      {
        name: 'AI Integration',
        price: '$7,500',
        features: [
          'Basic AI features',
          'Data analysis',
          'Simple automation',
          'Basic reporting',
          '3 months support',
        ],
      },
      {
        name: 'Custom AI Solution',
        price: '$15,000',
        features: [
          'Custom AI models',
          'Advanced analytics',
          'Process automation',
          'Detailed reporting',
          '6 months support',
        ],
      },
      {
        name: 'Enterprise AI',
        price: 'Custom',
        features: [
          'Complex AI systems',
          'Real-time processing',
          'Multiple integrations',
          'Custom dashboards',
          '12 months support',
        ],
      },
    ],
  },
];

export default Services; 