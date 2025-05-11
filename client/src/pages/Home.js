import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Typewriter from 'typewriter-effect';
import { 
  ArrowRightIcon,
  CodeBracketIcon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  DocumentCheckIcon,
  LightBulbIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const Home = () => {  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isFloatingCtaVisible, setIsFloatingCtaVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 300], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const stats = [
    { number: '100+', label: 'Projects Completed', icon: CodeBracketIcon },
    { number: '50+', label: 'Happy Clients', icon: UserGroupIcon },
    { number: '15+', label: 'Awards Won', icon: TrophyIcon },
  ];

  const testimonials = [
    {
      name: 'Faruq Hasan',
      role: 'CEO, TechStart',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      text: 'TechNest transformed our digital presence. Their team delivered exceptional results and exceeded our expectations.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, InnovateX',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      text: 'Working with TechNest was a game-changer for our business. Their technical expertise and innovative solutions are unmatched.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthHub',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      text: 'The team at TechNest understood our vision perfectly and delivered a solution that perfectly aligned with our goals.'
    }
  ];

  const technologies = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
  ];

  const processSteps = [
    {
      icon: LightBulbIcon,
      title: 'Discovery',
      description: 'We start by understanding your vision, goals, and requirements to create a solid foundation.'
    },
    {
      icon: DocumentCheckIcon,
      title: 'Planning',
      description: 'Our team creates a detailed project plan with milestones, timelines, and deliverables.'
    },
    {
      icon: CodeBracketIcon,
      title: 'Development',
      description: 'We build your solution using the latest technologies and best practices.'
    },
    {
      icon: ArrowPathIcon,
      title: 'Testing',
      description: 'Rigorous testing ensures your solution meets quality standards and performs flawlessly.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Launch',
      description: 'We deploy your solution and provide ongoing support to ensure success.'
    }
  ];

  const faqs = [
    {
      question: 'How long does it take to complete a project?',
      answer: 'Project timelines vary based on complexity and scope. We typically complete small projects in 2-4 weeks, medium projects in 1-3 months, and large projects in 3-6 months.'
    },
    {
      question: 'What is your pricing model?',
      answer: "We offer flexible pricing models including fixed-price, time & materials, and dedicated team options. We'll work with you to find the best fit for your project."
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer various support packages including maintenance, updates, and 24/7 technical support to ensure your solution continues to perform optimally.'
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'We specialize in modern web technologies including React, Node.js, MongoDB, and cloud platforms like AWS. We stay current with the latest trends and best practices.'
    }
  ];

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies.',
      icon: CodeBracketIcon
    },
    {
      id: 'mobile-apps',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: PhoneIcon
    },
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description: 'Artificial Intelligence and Machine Learning solutions for your business.',
      icon: LightBulbIcon
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsFloatingCtaVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="TechNest Hero Banner"
            className="w-full h-screen object-cover object-center brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>
        
        {/* Content Container */}
        <div className="container relative mx-auto px-4 py-12 sm:py-20 z-10">
          <motion.div            
            className="max-w-3xl mx-auto lg:mx-0 lg:ml-16 relative text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-gray-900 drop-shadow-sm"
            >
              <Typewriter
                options={{
                  strings: ['Transforming Ideas', 'Building the Future', 'Creating Solutions'],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-700 mb-8 px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm bg-white/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-lg p-4 lg:p-0"
            >
              We are a team of passionate developers, designers, and strategists dedicated to creating exceptional digital experiences that transform businesses.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6"
            >
              <Link 
                to="/contact" 
                className="w-full sm:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary-600/20 text-base sm:text-lg font-medium"
              >
                Get a Free Quote
              </Link>
              <Link 
                to="/portfolio" 
                className="w-full sm:w-auto px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-900 text-center rounded-lg transition-all transform hover:scale-105 shadow-lg text-base sm:text-lg font-medium flex items-center justify-center group"
              >
                View Our Work
                <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
          >
            <ChevronDownIcon className="h-8 w-8 text-primary-600 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section bg-white dark:bg-gray-900 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              We offer a comprehensive range of digital services to help your business thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)"
                }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">{service.description}</p>
                <Link
                  to={`/services#${service.id}`}
                  className="text-primary-600 hover:text-primary-700 flex items-center group text-sm sm:text-base"
                >
                  Learn More 
                  <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="text-center p-4 sm:p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all"
              >
                <stat.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">{testimonial.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">{testimonial.text}</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              We use cutting-edge technologies to build robust and scalable solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mb-2 sm:mb-3 lg:mb-4"
                />
                <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              We follow a proven methodology to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="bg-primary-100 dark:bg-primary-900/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <>
                    {/* Arrow for desktop */}
                    <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                      <ArrowRightIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    {/* Down arrow for mobile/tablet */}
                    <div className="lg:hidden flex justify-center mt-4">
                      <ArrowRightIcon className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Find answers to common questions about our services and process.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                  className="w-full mb-4 bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg text-left hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start sm:items-center gap-4">
                    <h3 className="text-base sm:text-lg font-semibold flex-1">{faq.question}</h3>
                    <ChevronDownIcon
                      className={`h-5 w-5 text-gray-500 transform transition-transform flex-shrink-0 mt-1 sm:mt-0 ${
                        selectedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {selectedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-20 bg-primary-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Stay Updated</h2>
            <p className="text-white/90 mb-6 sm:mb-8 px-4 sm:px-0">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-lg p-4 text-white mx-4 sm:mx-0"
              >
                Thank you for subscribing! We'll keep you updated.
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 mx-4 sm:mx-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 relative">
                  <EnvelopeIcon className="h-5 w-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm sm:text-base"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full sm:w-auto btn bg-white text-primary-600 hover:bg-gray-100 whitespace-nowrap px-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>    
        {/* Floating Contact Button */}
      <AnimatePresence>
        {isFloatingCtaVisible && (
          <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50">
            {/* Contact Button */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-primary-600/90 backdrop-blur-sm hover:bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-colors text-sm sm:text-base"
              >
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Contact Us</span>
                <span className="sm:hidden">Chat</span>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
