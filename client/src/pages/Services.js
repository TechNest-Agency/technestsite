import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  CheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Services = () => {
  const [selectedService, setSelectedService] = useState('web-development');
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (plan) => {
    addToCart({
      id: plan.name,
      title: plan.name,
      price: plan.price,
      type: 'plan'
    });
  };

  return (
    <div className="pt-0">
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
                  <h3 className="subheading mb-6">Service Details</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      {service.detailedDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Pricing Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Pricing Plans</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan that fits your business needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
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
                <div className={`flex-1 bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg transition-all duration-300 flex flex-col ${
                  hoveredPlan === index ? 'transform -translate-y-2 shadow-xl' : ''
                }`}>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400">/project</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                          <CheckIcon className="h-5 w-5 text-primary-600 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3 mt-auto pt-6">
                    <button
                      onClick={() => handleAddToCart(plan)}
                      className="w-full flex items-center justify-center py-3 px-6 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                    >
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => window.location.href = '/contact'}
                      className="w-full py-3 px-6 rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors duration-200"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Need a custom solution? We can tailor a plan specifically for your needs.
            </p>
            <button className="btn btn-outline">
              Contact Us for Custom Plan
            </button>
          </div>
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
      'App store optimization',
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
      'AI-powered chatbots',
    ]
  }
];

// Add pricing plans data
const pricingPlans = [
  {
    name: 'Basic',
    price: '$1,500',
    isPopular: false,
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '1 month support',
    ],
    bonus: 'Free domain for 1 year'
  },
  {
    name: 'Business',
    price: '$3,500',
    isPopular: true,
    features: [
      'Up to 15 pages',
      'Custom design',
      'Advanced SEO',
      'Blog integration',
      '3 months support',
      'Analytics setup',
      'Social media integration'
    ],
    bonus: 'Free SSL certificate'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    isPopular: false,
    features: [
      'Custom features',
      'User authentication',
      'Database integration',
      'API development',
      '6 months support',
      'Performance optimization',
      'Security implementation'
    ],
    bonus: 'Free maintenance for 3 months'
  }
];

export default Services;