import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { isDarkMode } = useTheme();

    return (
        <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">TechNest Solutions</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Empowering businesses with innovative technology solutions.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 active:text-blue-700">Home</Link></li>
                            <li><Link to="/services" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 active:text-blue-700">Services</Link></li>                            <li><Link to="/services#web" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 active:text-blue-700">Web Development</Link></li>
                            <li><Link to="/services#mobile" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 active:text-blue-700">Mobile Apps</Link></li>
                            <li><Link to="/services#ai" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 active:text-blue-700">AI Solutions</Link></li>
                            <li><Link to="/portfolio" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 active:text-blue-700">Portfolio</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link to="/services#web" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Web Development</Link></li>
                            <li><Link to="/services#mobile" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Mobile Apps</Link></li>
                            <li><Link to="/services#ai" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">AI Solutions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-600 dark:text-gray-300">Email: technestsolution@gmail.com</li>
                            <li className="text-gray-600 dark:text-gray-300">Phone: +880 1322-69516</li>
                            <li className="text-gray-600 dark:text-gray-300">Address: Dhaka, Banglaedsh</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                        © {new Date().getFullYear()} TechNest Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;