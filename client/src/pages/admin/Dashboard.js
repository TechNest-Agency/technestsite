import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    DocumentTextIcon,
    UserGroupIcon,
    EnvelopeIcon,
    CogIcon,
    PencilIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const AdminDashboard = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('overview');

    // Temporary data - will be replaced with API calls
    const stats = {
        totalPosts: 24,
        totalServices: 3,
        totalUsers: 156,
        totalMessages: 42
    };

    const recentPosts = [
        { id: 1, title: 'Getting Started with React', date: '2024-04-18', status: 'published' },
        { id: 2, title: 'Advanced CSS Techniques', date: '2024-04-17', status: 'draft' }
    ];

    const recentMessages = [
        { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', date: '2024-04-18' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Service Request', date: '2024-04-17' }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
        >
            <div className="flex">
                {/* Sidebar */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-64 min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    activeTab === 'overview'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('posts')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    activeTab === 'posts'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Blog Posts
                            </button>
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    activeTab === 'services'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Services
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    activeTab === 'users'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Users
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    activeTab === 'messages'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Messages
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    activeTab === 'settings'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Settings
                            </button>
                        </nav>
                    </div>
                </motion.div>

                {/* Main Content */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 p-8"
                >
                    {activeTab === 'overview' && (
                        <div>
                            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                    <div className="flex items-center">
                                        <DocumentTextIcon className="h-8 w-8 text-blue-500 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Posts</p>
                                            <p className="text-2xl font-bold">{stats.totalPosts}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                    <div className="flex items-center">
                                        <CogIcon className="h-8 w-8 text-green-500 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Services</p>
                                            <p className="text-2xl font-bold">{stats.totalServices}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                    <div className="flex items-center">
                                        <UserGroupIcon className="h-8 w-8 text-purple-500 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Users</p>
                                            <p className="text-2xl font-bold">{stats.totalUsers}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                    <div className="flex items-center">
                                        <EnvelopeIcon className="h-8 w-8 text-yellow-500 mr-4" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Messages</p>
                                            <p className="text-2xl font-bold">{stats.totalMessages}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Posts */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}
                            >
                                <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-left py-2">Title</th>
                                                <th className="text-left py-2">Date</th>
                                                <th className="text-left py-2">Status</th>
                                                <th className="text-left py-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentPosts.map(post => (
                                                <tr key={post.id}>
                                                    <td className="py-2">{post.title}</td>
                                                    <td className="py-2">{post.date}</td>
                                                    <td className="py-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            post.status === 'published'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {post.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2">
                                                        <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                                                        <button className="text-red-500 hover:text-red-700">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>

                            {/* Recent Messages */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                            >
                                <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-left py-2">Name</th>
                                                <th className="text-left py-2">Email</th>
                                                <th className="text-left py-2">Subject</th>
                                                <th className="text-left py-2">Date</th>
                                                <th className="text-left py-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentMessages.map(message => (
                                                <tr key={message.id}>
                                                    <td className="py-2">{message.name}</td>
                                                    <td className="py-2">{message.email}</td>
                                                    <td className="py-2">{message.subject}</td>
                                                    <td className="py-2">{message.date}</td>
                                                    <td className="py-2">
                                                        <button className="text-blue-500 hover:text-blue-700">View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Other tabs will be implemented later */}
                    {activeTab !== 'overview' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-12"
                        >
                            <p className="text-gray-500">This section is under development</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard; 