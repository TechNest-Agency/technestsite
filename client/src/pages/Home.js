import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  CodeBracketIcon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  // ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  LightBulbIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Home = () => {
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

  const latestBlogs = [
    {
      title: 'The Future of Web Development in 2024',
      excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      date: 'April 15, 2024'
    },
    {
      title: 'AI Integration: Best Practices for Businesses',
      excerpt: 'Learn how to effectively integrate AI solutions into your business operations.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      date: 'April 10, 2024'
    },
    {
      title: 'Mobile App Development: Key Considerations',
      excerpt: 'Essential factors to consider when planning your mobile app development project.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      date: 'April 5, 2024'
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

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="TechNest Hero Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-900/60 dark:to-secondary-900/60" />
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading mb-6"
            >
              Transforming Ideas into Digital Reality
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              We are a team of passionate developers, designers, and strategists dedicated to creating exceptional digital experiences that drive business growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn btn-primary">
                Get a Free Quote
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section bg-white dark:bg-gray-900">
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
              We offer a comprehensive range of digital services to help your business thrive in the modern world.
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
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="subheading mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <Link to={`/services#${service.id}`} className="text-primary-600 hover:text-primary-700 flex items-center">
                  Learn More <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take a look at some of our recent work and see how we've helped businesses achieve their goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-200 mb-4">{project.description}</p>
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="text-white hover:text-primary-400 flex items-center"
                    >
                      View Project <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
              >
                <stat.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{testimonial.text}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Latest from Our Blog</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest insights and trends in technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog, index) => (
              <motion.div
                key={blog.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{blog.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.excerpt}</p>
                  <Link to="/blog" className="text-primary-600 hover:text-primary-700 flex items-center">
                    Read More <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Our Technology Stack</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We use cutting-edge technologies to build robust and scalable solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-12 w-12 mb-4"
                />
                <span className="text-gray-600 dark:text-gray-300">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Our Process</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We follow a proven methodology to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                    <ArrowRightIcon className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                className="mb-6 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary-600">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="heading text-white mb-6">Stay Updated</h2>
            <p className="text-white/90 mb-8">
              Subscribe to our newsletter for the latest updates, insights, and tech trends.
            </p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-lg p-4 text-white"
              >
                Thank you for subscribing! We'll keep you updated.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <EnvelopeIcon className="h-5 w-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-white text-primary-600 hover:bg-gray-100 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="heading text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and create something amazing together. Our team is ready to help you achieve your goals.
            </p>
            <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Get Started
            </Link>
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
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Artificial Intelligence and Machine Learning solutions for your business.',
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const projects = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with advanced features.',
    image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'project-2',
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly banking application.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'project-3',
    title: 'AI-Powered Analytics',
    description: 'Business intelligence platform with AI capabilities.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default Home; 