import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Portfolio = () => {
    const { isDarkMode } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('all');

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
        </div>
    );
};

export default Portfolio; 