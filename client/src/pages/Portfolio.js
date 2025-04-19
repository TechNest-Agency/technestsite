import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  UserGroupIcon,
  TrophyIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Portfolio = () => {
    const { isDarkMode } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'web', name: 'Web Development' },
        { id: 'mobile', name: 'Mobile Apps' },
        { id: 'ai', name: 'AI Solutions' }
    ];

    const projects = [
        {
            id: 1,
            title: 'E-commerce Platform',
            category: 'web',
            image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49',
            description: 'A modern e-commerce platform with advanced features and seamless user experience.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: '#'
        },
        {
            id: 2,
            title: 'Mobile Banking App',
            category: 'mobile',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
            description: 'Secure and user-friendly mobile banking application.',
            technologies: ['React Native', 'Firebase', 'Redux'],
            link: '#'
        },
        {
            id: 3,
            title: 'AI Analytics Dashboard',
            category: 'ai',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            description: 'Business intelligence platform with AI-powered insights.',
            technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
            link: '#'
        },
        // Add more projects as needed
    ];

    // Add new data for statistics
    const stats = [
        {
            number: '150+',
            label: 'Projects Completed',
            icon: TrophyIcon
        },
        {
            number: '50+',
            label: 'Happy Clients',
            icon: UserGroupIcon
        },
        {
            number: '5+',
            label: 'Years Experience',
            icon: ClockIcon
        }
    ];

    // Add testimonials data
    const testimonials = [
        {
            id: 1,
            name: 'John Smith',
            position: 'CEO, TechCorp',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            text: 'Working with TechNest was a game-changer for our business. Their expertise and attention to detail helped us achieve our digital transformation goals.',
            rating: 5
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            position: 'Marketing Director, InnovateX',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            text: 'The team at TechNest delivered beyond our expectations. Their innovative solutions helped us increase our online presence significantly.',
            rating: 5
        },
        {
            id: 3,
            name: 'Michael Chen',
            position: 'CTO, StartupHub',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            text: "TechNest's technical expertise and problem-solving skills are exceptional. They helped us build a robust platform that scales with our growth.",
            rating: 5
        }
    ];

    // Add technology stack data
    const techStack = [
        {
            category: 'Frontend',
            technologies: ['React', 'Vue.js', 'Angular', 'Next.js', 'Tailwind CSS']
        },
        {
            category: 'Backend',
            technologies: ['Node.js', 'Python', 'Java', 'PHP', 'MongoDB', 'PostgreSQL']
        },
        {
            category: 'Mobile',
            technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
        },
        {
            category: 'AI/ML',
            technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
        }
    ];

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    return (
        <div className="min-h-screen pt-20 pb-12">
            {/* Hero Section */}
            <section className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Explore our latest projects and see how we've helped businesses transform their digital presence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
                            >
                                <stat.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-500 text-white'
                                        : isDarkMode
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-xl shadow-lg ${
                                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                                }`}
                            >
                                <div className="relative h-64">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                                            <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.technologies.map(tech => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 text-xs bg-white/20 text-white rounded"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <a
                                                href={project.link}
                                                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                            >
                                                View Project
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">Our Technology Stack</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            We work with cutting-edge technologies to deliver exceptional results.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {techStack.map((stack, index) => (
                            <motion.div
                                key={stack.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
                            >
                                <h3 className="text-xl font-semibold mb-4">{stack.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {stack.technologies.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Hear what our clients have to say about working with us.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {testimonial.position}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {testimonial.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">Featured Case Studies</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Explore our most impactful projects and their success stories.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.slice(0, 2).map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map(tech => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="text-primary-600 hover:text-primary-700 flex items-center"
                                    >
                                        Read Case Study <ArrowRightIcon className="h-4 w-4 ml-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio; 