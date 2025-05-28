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
    FaLinkedinIn,
    FaGithub,
    FaInstagram,
    FaFacebookF
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
    };    const socialLinks = [
        { icon: FaFacebookF, url: 'https://facebook.com/technest.agency', label: 'Facebook' },
        { icon: FaLinkedinIn, url: 'https://linkedin.com/company/technest.agency', label: 'LinkedIn' },
        { icon: FaInstagram, url: 'https://instagram.com/technest.agency', label: 'Instagram' },
        { icon: FaGithub, url: 'https://github.com/technest-agency', label: 'GitHub' }
    ];const contactInfo = [
        { 
            icon: MapPinIcon, 
            text: 'Dhaka, Bangladesh',
            label: 'Location'
        },
        { 
            icon: EnvelopeIcon, 
            text: 'technestagencies@gmail.com',
            label: 'Email'
        },
        { 
            icon: PhoneIcon, 
            text: '+880 132 2695162',
            label: 'Phone/WhatsApp'
        },
        { 
            icon: GlobeAltIcon, 
            text: 'www.technestagency.com',
            label: 'Website'
        }
    ];

    const workingHours = {
        days: 'Sunday–Thursday',
        hours: '10 AM – 7 PM (BST)'
    };

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
                    {/* Company Info Section */}
                    <div className="lg:col-span-3 space-y-6">
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <img src="/logo.png" alt="TechNest Logo" className="h-8 w-auto" />
                        </Link>
                        <p className={`text-sm max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Empowering businesses with innovative technology solutions. We create cutting-edge digital experiences that help businesses thrive in the modern world.
                        </p>
                    </div>
                </div>

                    {/* Navigation Links Section */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                    </div>                    {/* Contact Info Section */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="space-y-2">
                            <h4 className="text-lg font-semibold">📞 Contact Us</h4>
                            <h5 className="text-base font-medium text-primary-600 dark:text-primary-400">TechNest Agency</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Crafting SaaS, UI/UX & Web Solutions</p>
                        </div>
                        
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
                                    <div className="flex-1">
                                        <span className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</span>
                                        <span className="text-sm mt-0.5">{item.text}</span>
                                    </div>
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