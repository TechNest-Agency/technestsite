import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
    ChartBarIcon,
    DocumentTextIcon,
    UserGroupIcon,
    EnvelopeIcon,
    CogIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    ArrowPathIcon,
    EyeIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import axios from 'axios';

const AdminDashboard = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalServices: 0,
        totalUsers: 0,
        totalMessages: 0
    });

    // Services state
    const [services, setServices] = useState([]);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [serviceForm, setServiceForm] = useState({
        title: '',
        description: '',
        shortDescription: '',
        icon: '',
        image: '',
        category: '',
        features: [],
        pricing: [],
        technologies: [],
        status: 'active',
        order: 0
    });

    // Users state
    const [users, setUsers] = useState([]);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        role: 'user',
        isEmailVerified: false
    });

    // Messages state
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    // Settings state
    const [settings, setSettings] = useState({
        siteTitle: '',
        siteDescription: '',
        contactEmail: '',
        smtpHost: '',
        smtpPort: '',
        smtpUsername: '',
        smtpPassword: '',
        siteLogo: '',
        favicon: '',
        facebookUrl: '',
        twitterUrl: '',
        linkedinUrl: '',
        instagramUrl: '',
        metaKeywords: '',
        googleAnalyticsId: '',
        googleSiteVerification: '',
        heroTitle: '',
        heroDescription: '',
        heroImage: '',
        aboutTitle: '',
        aboutDescription: '',
        aboutImage: '',
        servicesTitle: '',
        servicesDescription: '',
        contactTitle: '',
        contactDescription: '',
        contactAddress: '',
        contactPhone: ''
    });

    const navigate = useNavigate();

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [dashboardRes, servicesRes, usersRes, messagesRes, settingsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/admin/dashboard'),
                    fetch('http://localhost:5000/api/admin/services'),
                    fetch('http://localhost:5000/api/admin/users'),
                    fetch('http://localhost:5000/api/admin/messages'),
                    fetch('http://localhost:5000/api/admin/settings')
                ]);

                const dashboardData = await dashboardRes.json();
                const servicesData = await servicesRes.json();
                const usersData = await usersRes.json();
                const messagesData = await messagesRes.json();
                const settingsData = await settingsRes.json();

                setStats(dashboardData.stats);
                setServices(servicesData.services);
                setUsers(usersData.users);
                setMessages(messagesData.messages);
                setSettings(settingsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false);
        };

        fetchDashboardData();
    }, []);

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingService 
                ? `http://localhost:5000/api/admin/services/${editingService._id}`
                : 'http://localhost:5000/api/admin/services';
            const method = editingService ? 'PUT' : 'POST';

            if (!serviceForm.title || !serviceForm.description || !serviceForm.shortDescription || 
                !serviceForm.icon || !serviceForm.image || !serviceForm.category) {
                alert('Please fill in all required fields');
                return;
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(serviceForm),
            });

            if (response.ok) {
                const updatedService = await response.json();
                if (editingService) {
                    setServices(services.map(s => s._id === updatedService._id ? updatedService : s));
                } else {
                    setServices([...services, updatedService]);
                }
                setIsServiceModalOpen(false);
                setEditingService(null);
                setServiceForm({
                    title: '',
                    description: '',
                    shortDescription: '',
                    icon: '',
                    image: '',
                    category: '',
                    features: [],
                    pricing: [],
                    technologies: [],
                    status: 'active',
                    order: 0
                });
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error saving service');
            }
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service. Please try again.');
        }
    };

    const handleDeleteService = async (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/services/${serviceId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setServices(services.filter(s => s._id !== serviceId));
                }
            } catch (error) {
                console.error('Error deleting service:', error);
            }
        }
    };

    const renderServices = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Services Management</h1>
                <button
                    onClick={() => {
                        setEditingService(null);
                        setServiceForm({
                            title: '',
                            description: '',
                            shortDescription: '',
                            icon: '',
                            image: '',
                            category: '',
                            features: [],
                            pricing: [],
                            technologies: [],
                            status: 'active',
                            order: 0
                        });
                        setIsServiceModalOpen(true);
                    }}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Service
                </button>
            </div>

            {/* Services Table */}
            <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.map(service => (
                            <tr key={service.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {service.title}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{service.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        service.status === 'published'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}>
                                        {service.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingService(service);
                                                setServiceForm(service);
                                                setIsServiceModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteService(service.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Service Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className={`w-full max-w-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6`}>
                        <h2 className="text-xl font-bold mb-4">{editingService ? 'Edit Service' : 'New Service'}</h2>
                        <form onSubmit={handleServiceSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                <input
                                    type="text"
                                    value={serviceForm.title}
                                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                                <input
                                    type="text"
                                    value={serviceForm.shortDescription}
                                    onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    value={serviceForm.description}
                                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
                                <input
                                    type="text"
                                    value={serviceForm.icon}
                                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                                <input
                                    type="text"
                                    value={serviceForm.image}
                                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                <select
                                    value={serviceForm.category}
                                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="web">Web Development</option>
                                    <option value="app">Mobile Apps</option>
                                    <option value="ai">AI Solutions</option>
                                    <option value="cybersecurity">Cybersecurity</option>
                                    <option value="marketing">Digital Marketing</option>
                                    <option value="cloud">Cloud Services</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features (one per line)</label>
                                <textarea
                                    value={serviceForm.features.join('\n')}
                                    onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value.split('\n') })}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Technologies (comma separated)</label>
                                <input
                                    type="text"
                                    value={serviceForm.technologies.join(', ')}
                                    onChange={(e) => setServiceForm({ ...serviceForm, technologies: e.target.value.split(',').map(t => t.trim()) })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsServiceModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                >
                                    {editingService ? 'Update Service' : 'Create Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    // Update the return statement to use the renderServices component
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg ${
                            activeTab === 'overview'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                        }`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <ChartBarIcon className="h-5 w-5 mr-2" />
                        Overview
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg ${
                            activeTab === 'services'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                        }`}
                        onClick={() => setActiveTab('services')}
                    >
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        Services
                    </button>
                    {/* Add other tabs as needed */}
                </div>

                {/* Content Sections */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <ArrowPathIcon className="h-8 w-8 animate-spin text-primary-500" />
                        </div>
                    ) : (
                        <>
                            {activeTab === 'services' && renderServices()}
                            {/* Add other section renders as needed */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
