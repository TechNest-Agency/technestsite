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
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalServices: 0,
        totalUsers: 0,
        totalMessages: 0
    });

    // Posts state
    const [posts, setPosts] = useState([]);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        category: '',
        status: 'draft',
        tags: '',
        image: ''
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
        blogTitle: '',
        blogDescription: '',
        contactTitle: '',
        contactDescription: '',
        contactAddress: '',
        contactPhone: ''
    });

    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        duration: '',
        instructor: '',
        image: ''
    });

    const navigate = useNavigate();

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [dashboardRes, postsRes, servicesRes, usersRes, messagesRes, settingsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/admin/dashboard'),
                    fetch('http://localhost:5000/api/admin/posts'),
                    fetch('http://localhost:5000/api/admin/services'),
                    fetch('http://localhost:5000/api/admin/users'),
                    fetch('http://localhost:5000/api/admin/messages'),
                    fetch('http://localhost:5000/api/admin/settings')
                ]);

                const dashboardData = await dashboardRes.json();
                const postsData = await postsRes.json();
                const servicesData = await servicesRes.json();
                const usersData = await usersRes.json();
                const messagesData = await messagesRes.json();
                const settingsData = await settingsRes.json();

                setStats(dashboardData.stats);
                setPosts(postsData.posts);
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

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingPost 
                ? `http://localhost:5000/api/admin/posts/${editingPost.id}`
                : 'http://localhost:5000/api/admin/posts';
            const method = editingPost ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postForm),
            });

            if (response.ok) {
                const updatedPost = await response.json();
                if (editingPost) {
                    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
                } else {
                    setPosts([...posts, updatedPost]);
                }
                setIsPostModalOpen(false);
                setEditingPost(null);
                setPostForm({
                    title: '',
                    content: '',
                    category: '',
                    status: 'draft',
                    tags: '',
                    image: ''
                });
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/posts/${postId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setPosts(posts.filter(p => p.id !== postId));
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

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

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingUser 
                ? `http://localhost:5000/api/admin/users/${editingUser._id}`
                : 'http://localhost:5000/api/admin/users';
            const method = editingUser ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userForm),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                if (editingUser) {
                    setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
                } else {
                    setUsers([...users, updatedUser]);
                }
                setIsUserModalOpen(false);
                setEditingUser(null);
                setUserForm({
                    username: '',
                    email: '',
                    role: 'user',
                    isEmailVerified: false
                });
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setUsers(users.filter(u => u._id !== userId));
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedMessage 
                ? `http://localhost:5000/api/admin/messages/${selectedMessage._id}`
                : 'http://localhost:5000/api/admin/messages';
            const method = selectedMessage ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    status: selectedMessage ? 'read' : 'new'
                }),
            });

            if (response.ok) {
                const updatedMessage = await response.json();
                if (selectedMessage) {
                    setMessages(messages.map(m => m._id === updatedMessage._id ? updatedMessage : m));
                } else {
                    setMessages([...messages, updatedMessage]);
                }
                setSelectedMessage(null);
                setIsMessageModalOpen(false);
            }
        } catch (error) {
            console.error('Error updating message:', error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/messages/${messageId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setMessages(messages.filter(m => m._id !== messageId));
                }
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    };

    const handleSaveSettings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                alert('Settings updated successfully');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/api/courses/${editingId}`, formData);
            } else {
                await axios.post('/api/courses', formData);
            }
            const response = await axios.get('/api/courses');
            setCourses(response.data);
            resetForm();
        } catch (error) {
            console.error('Error submitting course:', error);
        }
    };

    const handleEdit = (course) => {
        setEditingId(course._id);
        setFormData({
            title: course.title,
            description: course.description,
            price: course.price,
            duration: course.duration,
            instructor: course.instructor,
            image: course.image
        });
    };

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`/api/courses/${courseId}`);
                setCourses(courses.filter(course => course._id !== courseId));
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            price: '',
            duration: '',
            instructor: '',
            image: ''
        });
    };

    const renderLoadingSpinner = () => (
        <div className="flex justify-center items-center h-64">
            <ArrowPathIcon className="h-8 w-8 animate-spin text-primary-500" />
        </div>
    );

    const renderOverview = () => (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Quick Actions */}
            <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <QuickActions />
            </div>
        </div>
    );

    const QuickActions = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
                onClick={() => navigate('/admin/posts/new')}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
                <PlusIcon className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Create New Post</span>
            </button>
            <button
                onClick={() => navigate('/admin/users/new')}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
                <UserPlusIcon className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Add New User</span>
            </button>
            <button
                onClick={() => navigate('/admin/settings')}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
                <CogIcon className="h-6 w-6 text-purple-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Access Settings</span>
            </button>
        </div>
    );

    const renderPosts = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <button
                    onClick={() => {
                        setEditingPost(null);
                        setPostForm({
                            title: '',
                            content: '',
                            category: '',
                            status: 'draft',
                            tags: '',
                            image: ''
                        });
                        setIsPostModalOpen(true);
                    }}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Post
                </button>
            </div>

            {/* Posts Table */}
            <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {posts.map(post => (
                            <tr key={post.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {post.title}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{post.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        post.status === 'published'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingPost(post);
                                                setPostForm({
                                                    ...post,
                                                    tags: post.tags.join(', ')
                                                });
                                                setIsPostModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                        >
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Post Modal */}
            {isPostModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className={`w-full max-w-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6`}>
                        <h2 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'New Post'}</h2>
                        <form onSubmit={handlePostSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                <input
                                    type="text"
                                    value={postForm.title}
                                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                                <textarea
                                    value={postForm.content}
                                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                                    rows="6"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <select
                                        value={postForm.category}
                                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile Apps">Mobile Apps</option>
                                        <option value="AI Solutions">AI Solutions</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                    <select
                                        value={postForm.status}
                                        onChange={(e) => setPostForm({ ...postForm, status: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={postForm.tags}
                                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={postForm.image}
                                    onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsPostModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                >
                                    {editingPost ? 'Update Post' : 'Create Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

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

    const renderUsers = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Users Management</h1>
                <button
                    onClick={() => {
                        setEditingUser(null);
                        setUserForm({
                            username: '',
                            email: '',
                            role: 'user',
                            isEmailVerified: false
                        });
                        setIsUserModalOpen(true);
                    }}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add User
                </button>
            </div>

            {/* Users Table */}
            <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.username}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.isEmailVerified
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}>
                                        {user.isEmailVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingUser(user);
                                                setUserForm(user);
                                                setIsUserModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
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

            {/* User Modal */}
            {isUserModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className={`w-full max-w-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6`}>
                        <h2 className="text-xl font-bold mb-4">{editingUser ? 'Edit User' : 'New User'}</h2>
                        <form onSubmit={handleUserSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                                <input
                                    type="text"
                                    value={userForm.username}
                                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={userForm.email}
                                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                <select
                                    value={userForm.role}
                                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={userForm.isEmailVerified}
                                    onChange={(e) => setUserForm({ ...userForm, isEmailVerified: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Email Verified</label>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsUserModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                >
                                    {editingUser ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    const renderMessages = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Messages Management</h1>
            </div>

            {/* Messages Table */}
            <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {messages.map(message => (
                            <tr key={message.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {message.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{message.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 dark:text-white">{message.subject}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        message.status === 'new'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            : message.status === 'read'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                    }`}>
                                        {message.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(message.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setSelectedMessage(message);
                                                setIsMessageModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMessage(message.id)}
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

            {/* Message Modal */}
            {isMessageModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className={`w-full max-w-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6`}>
                        <h2 className="text-xl font-bold mb-4">Message Details</h2>
                        {selectedMessage && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <p className="mt-1 text-gray-900 dark:text-white">{selectedMessage.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <p className="mt-1 text-gray-900 dark:text-white">{selectedMessage.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                    <p className="mt-1 text-gray-900 dark:text-white">{selectedMessage.subject}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                    <select
                                        value={selectedMessage.status}
                                        onChange={(e) => setSelectedMessage({ ...selectedMessage, status: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="new">New</option>
                                        <option value="read">Read</option>
                                        <option value="replied">Replied</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsMessageModalOpen(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleMessageSubmit}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                    >
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const renderSettings = () => (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Settings</h1>
            
            {/* Website Content Management */}
            <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4">Website Content Management</h2>
                <div className="space-y-6">
                    {/* Hero Section */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-medium mb-3">Hero Section</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Title</label>
                                <input
                                    type="text"
                                    value={settings.heroTitle}
                                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Description</label>
                                <textarea
                                    value={settings.heroDescription}
                                    onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    label="Hero Image"
                                    onImageUpload={(file) => {
                                        if (file) {
                                            // Create a FormData object
                                            const formData = new FormData();
                                            formData.append('image', file);
                                            
                                            // Upload the image
                                            fetch('http://localhost:5000/api/admin/upload', {
                                                method: 'POST',
                                                body: formData,
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                setSettings({ ...settings, heroImage: data.imageUrl });
                                            })
                                            .catch(error => {
                                                console.error('Error uploading image:', error);
                                            });
                                        }
                                    }}
                                />
                                {settings.heroImage && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Current Image URL:</p>
                                        <input
                                            type="text"
                                            value={settings.heroImage}
                                            onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-medium mb-3">About Section</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About Title</label>
                                <input
                                    type="text"
                                    value={settings.aboutTitle}
                                    onChange={(e) => setSettings({ ...settings, aboutTitle: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About Description</label>
                                <textarea
                                    value={settings.aboutDescription}
                                    onChange={(e) => setSettings({ ...settings, aboutDescription: e.target.value })}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    label="About Image"
                                    onImageUpload={(file) => {
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append('image', file);
                                            
                                            fetch('http://localhost:5000/api/admin/upload', {
                                                method: 'POST',
                                                body: formData,
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                setSettings({ ...settings, aboutImage: data.imageUrl });
                                            })
                                            .catch(error => {
                                                console.error('Error uploading image:', error);
                                            });
                                        }
                                    }}
                                />
                                {settings.aboutImage && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Current Image URL:</p>
                                        <input
                                            type="text"
                                            value={settings.aboutImage}
                                            onChange={(e) => setSettings({ ...settings, aboutImage: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-medium mb-3">Services Section</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Services Title</label>
                                <input
                                    type="text"
                                    value={settings.servicesTitle}
                                    onChange={(e) => setSettings({ ...settings, servicesTitle: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Services Description</label>
                                <textarea
                                    value={settings.servicesDescription}
                                    onChange={(e) => setSettings({ ...settings, servicesDescription: e.target.value })}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Blog Section */}
                    <div className="border-b pb-4">
                        <h3 className="text-lg font-medium mb-3">Blog Section</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Blog Title</label>
                                <input
                                    type="text"
                                    value={settings.blogTitle}
                                    onChange={(e) => setSettings({ ...settings, blogTitle: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Blog Description</label>
                                <textarea
                                    value={settings.blogDescription}
                                    onChange={(e) => setSettings({ ...settings, blogDescription: e.target.value })}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-medium mb-3">Contact Section</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Title</label>
                                <input
                                    type="text"
                                    value={settings.contactTitle}
                                    onChange={(e) => setSettings({ ...settings, contactTitle: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Description</label>
                                <textarea
                                    value={settings.contactDescription}
                                    onChange={(e) => setSettings({ ...settings, contactDescription: e.target.value })}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Address</label>
                                <textarea
                                    value={settings.contactAddress}
                                    onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                                    rows="2"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Phone</label>
                                <input
                                    type="text"
                                    value={settings.contactPhone}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* General Settings */}
            <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Title</label>
                        <input
                            type="text"
                            value={settings.siteTitle}
                            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Description</label>
                        <textarea
                            value={settings.siteDescription}
                            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                        <input
                            type="email"
                            value={settings.contactEmail}
                            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Email Settings */}
            <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Host</label>
                        <input
                            type="text"
                            value={settings.smtpHost}
                            onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Port</label>
                        <input
                            type="number"
                            value={settings.smtpPort}
                            onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Username</label>
                        <input
                            type="text"
                            value={settings.smtpUsername}
                            onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Password</label>
                        <input
                            type="password"
                            value={settings.smtpPassword}
                            onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSaveSettings}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );

    const renderCourses = () => (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Course Management</h1>
            
            {/* Course Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    {editingId ? 'Edit Course' : 'Add New Course'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Price ($)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Duration</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Instructor</label>
                        <input
                            type="text"
                            value={formData.instructor}
                            onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Image URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {editingId ? 'Update Course' : 'Add Course'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Courses List */}
            <div className="bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold p-4 border-b">All Courses</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Price</th>
                                <th className="px-6 py-3 text-left">Duration</th>
                                <th className="px-6 py-3 text-left">Instructor</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {courses.map((course) => (
                                <tr key={course._id}>
                                    <td className="px-6 py-4">{course.title}</td>
                                    <td className="px-6 py-4">${course.price}</td>
                                    <td className="px-6 py-4">{course.duration}</td>
                                    <td className="px-6 py-4">{course.instructor}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEdit(course)}
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

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
                    className={`w-64 min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed`}
                >
                    <div className="p-4">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold">{user?.username}</p>
                                <p className="text-sm text-gray-500">Admin</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                                    activeTab === 'overview'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <ChartBarIcon className="h-5 w-5 mr-2" />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('posts')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                                    activeTab === 'posts'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <DocumentTextIcon className="h-5 w-5 mr-2" />
                                Blog Posts
                            </button>
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                                    activeTab === 'services'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <CogIcon className="h-5 w-5 mr-2" />
                                Services
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                                    activeTab === 'users'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                Users
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                                    activeTab === 'messages'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <EnvelopeIcon className="h-5 w-5 mr-2" />
                                Messages
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                                    activeTab === 'settings'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <CogIcon className="h-5 w-5 mr-2" />
                                Settings
                            </button>
                            <button
                                onClick={() => setActiveTab('courses')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                                    activeTab === 'courses'
                                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <DocumentTextIcon className="h-5 w-5 mr-2" />
                                Courses
                            </button>
                        </nav>
                    </div>
                </motion.div>

                {/* Main Content */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 ml-64 p-8"
                >
                    {isLoading ? renderLoadingSpinner() : (
                        activeTab === 'overview' ? renderOverview() :
                        activeTab === 'posts' ? renderPosts() :
                        activeTab === 'services' ? renderServices() :
                        activeTab === 'users' ? renderUsers() :
                        activeTab === 'messages' ? renderMessages() :
                        activeTab === 'settings' ? renderSettings() :
                        activeTab === 'courses' ? renderCourses() :
                        <div className="text-center py-12">
                            <p className="text-gray-500">This section is under development</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;