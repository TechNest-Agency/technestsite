import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
    FaTwitter,
    FaLinkedinIn,
    FaGithub,
    FaInstagram
} from 'react-icons/fa';

const Footer = () => {
    const { isDarkMode } = useTheme();

    const footerSections = {
        company: [
            { label: 'About Us', path: '/about' },
            { label: 'Our Team', path: '/team' },
            { label: 'Portfolio', path: '/portfolio' },
            { label: 'Contact', path: '/contact' }
        ],
        services: [
            { label: 'Web Development', path: '/services#web' },
            { label: 'Mobile Apps', path: '/services#mobile' },
            { label: 'AI Solutions', path: '/services#ai' },
            { label: 'Cloud Services', path: '/services#cloud' }
        ],
        resources: [
            { label: 'Blog', path: '/blog' },
            { label: 'Support', path: '/support' },
            { label: 'Documentation', path: '/docs' },
            { label: 'FAQ', path: '/faq' }
        ],
        legal: [
            { label: 'Privacy Policy', path: '/privacy' },
            { label: 'Terms of Service', path: '/terms' },
            { label: 'Cookie Policy', path: '/cookies' }
        ]
    };

    const socialLinks = [
        { icon: FaTwitter, url: 'https://twitter.com/technest', label: 'Twitter' },
        { icon: FaLinkedinIn, url: 'https://linkedin.com/company/technest', label: 'LinkedIn' },
        { icon: FaGithub, url: 'https://github.com/technest', label: 'GitHub' },
        { icon: FaInstagram, url: 'https://instagram.com/technest', label: 'Instagram' }
    ];

    const contactInfo = [
        { icon: PhoneIcon, text: '+1 (555) 123-4567' },
        { icon: EnvelopeIcon, text: 'contact@technest.com' },
        { icon: MapPinIcon, text: '123 Tech Street, Silicon Valley, CA' },
        { icon: GlobeAltIcon, text: 'www.technest.com' }
    ];

    return (
        <footer className={`relative pt-16 pb-6 mt-auto ${
            isDarkMode
                ? 'bg-gray-900 text-gray-300'
                : 'bg-gray-50 text-gray-600'
        }`}>
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute -top-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
                    isDarkMode ? 'bg-blue-600' : 'bg-primary-600'
                }`} />
                <div className={`absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
                    isDarkMode ? 'bg-purple-600' : 'bg-secondary-600'
                }`} />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Company Info Section */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <img src="/logo.png" alt="TechNest Logo" className="h-8 w-auto" />
                        </Link>
                        <p className={`text-sm max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Empowering businesses with innovative technology solutions. We create cutting-edge digital experiences that help businesses thrive in the modern world.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                                            isDarkMode
                                                ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                                        }`}
                                        aria-label={social.label}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Links Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:col-span-2">
                        {/* Company & Services Column */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Company</h4>
                                <ul className="space-y-3">
                                    {footerSections.company.map((link, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`text-sm transition-all duration-300 ${
                                                    isDarkMode
                                                        ? 'hover:text-white'
                                                        : 'hover:text-gray-900'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Services</h4>
                                <ul className="space-y-3">
                                    {footerSections.services.map((link, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`text-sm transition-all duration-300 ${
                                                    isDarkMode
                                                        ? 'hover:text-white'
                                                        : 'hover:text-gray-900'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Resources & Legal Column */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                                <ul className="space-y-3">
                                    {footerSections.resources.map((link, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`text-sm transition-all duration-300 ${
                                                    isDarkMode
                                                        ? 'hover:text-white'
                                                        : 'hover:text-gray-900'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                                <ul className="space-y-3">
                                    {footerSections.legal.map((link, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`text-sm transition-all duration-300 ${
                                                    isDarkMode
                                                        ? 'hover:text-white'
                                                        : 'hover:text-gray-900'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start space-x-3 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <item.icon className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                                        isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'
                                    }`} />
                                    <span className="text-sm">{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className={`border-t ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-200'
                } pt-8 mt-8`}>
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} TechNest Agency. All rights reserved.
                        </p>
                        <motion.div 
                            className="flex flex-wrap justify-center gap-6"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Link 
                                to="/privacy" 
                                className={`text-sm transition-all duration-300 ${
                                    isDarkMode
                                        ? 'hover:text-white'
                                        : 'hover:text-gray-900'
                                }`}
                            >
                                Privacy Policy
                            </Link>
                            <Link 
                                to="/terms" 
                                className={`text-sm transition-all duration-300 ${
                                    isDarkMode
                                        ? 'hover:text-white'
                                        : 'hover:text-gray-900'
                                }`}
                            >
                                Terms of Service
                            </Link>
                            <Link 
                                to="/sitemap" 
                                className={`text-sm transition-all duration-300 ${
                                    isDarkMode
                                        ? 'hover:text-white'
                                        : 'hover:text-gray-900'
                                }`}
                            >
                                Sitemap
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;