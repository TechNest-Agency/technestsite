import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  UserGroupIcon,
  TrophyIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Portfolio = () => {
    const { isDarkMode } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'web', name: 'Web Development', icon: CodeBracketIcon },
        { id: 'mobile', name: 'Mobile Apps', icon: DevicePhoneMobileIcon },
        { id: 'ai', name: 'AI Solutions', icon: CpuChipIcon }
    ];

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    return (
        <div className="min-h-screen pt-0">
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
                            Our Portfolio
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Explore our latest projects and see how we've helped businesses transform their digital presence
                            with innovative solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <stat.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                                <h3 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                                    {stat.number}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map(category => (
                            <motion.button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : isDarkMode
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category.icon && <category.icon className="h-5 w-5" />}
                                <span>{category.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="wait">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className={`group relative overflow-hidden rounded-2xl shadow-lg ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
                                >
                                    <div className="relative h-64">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 className="text-white text-xl font-semibold mb-2">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-200 text-sm mb-4">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.technologies.map(tech => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => handleProjectClick(project)}
                                                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                                >
                                                    View Details
                                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Our Technology Stack
                        </h2>
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
                                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                    {stack.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {stack.technologies.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
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

            {/* Testimonials */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Client Testimonials
                        </h2>
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
                                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {testimonial.position}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic">
                                    "{testimonial.text}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Details Modal */}
            <AnimatePresence>
                {isModalOpen && selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        <div className="absolute inset-0 bg-black/70" onClick={() => setIsModalOpen(false)} />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                            </button>

                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-64 object-cover rounded-t-2xl"
                            />

                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                    {selectedProject.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {selectedProject.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                                        Technologies Used
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map(tech => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end mt-8">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                    >
                                        Visit Project
                                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Project data
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
    {
        id: 4,
        title: 'Food Delivery App',
        category: 'mobile',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
        description: 'Real-time food delivery tracking and ordering system.',
        technologies: ['React Native', 'Node.js', 'Socket.io'],
        link: '#'
    },
    {
        id: 5,
        title: 'Smart Home Platform',
        category: 'ai',
        image: 'https://images.unsplash.com/photo-1558002038-76f45789f83d',
        description: 'IoT-based smart home automation system.',
        technologies: ['Python', 'TensorFlow', 'MQTT', 'React'],
        link: '#'
    },
    {
        id: 6,
        title: 'Educational Platform',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
        description: 'Online learning platform with interactive courses.',
        technologies: ['React', 'Django', 'PostgreSQL', 'WebRTC'],
        link: '#'
    }
];

// Stats data
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

// Testimonials data
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

// Technology stack data
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
        technologies: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV']
    }
];

export default Portfolio;