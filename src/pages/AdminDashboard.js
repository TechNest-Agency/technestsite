import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  UserGroupIcon,
  EnvelopeIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'The Future of Web Development in 2024',
      category: 'Web Development',
      content: 'The web development landscape is constantly evolving...',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      status: 'Published',
      date: '2024-03-15',
      tags: ['Web Development', 'AI', 'PWAs']
    },
    {
      id: 2,
      title: 'Building Scalable Mobile Applications',
      category: 'Mobile Apps',
      content: 'Mobile app development requires careful planning...',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
      status: 'Draft',
      date: '2024-03-10',
      tags: ['Mobile Apps', 'Scalability', 'Performance']
    }
  ]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
    status: 'Draft',
    tags: ''
  });

  // Temporary data - will be replaced with API calls
  const stats = {
    totalPosts: 24,
    totalServices: 8,
    totalUsers: 156,
    totalMessages: 42
  };

  const recentPosts = [
    {
      id: 1,
      title: 'The Future of Web Development in 2024',
      category: 'Web Development',
      date: '2024-03-15',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Building Scalable Mobile Applications',
      category: 'Mobile Apps',
      date: '2024-03-10',
      status: 'Draft'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      date: '2024-03-16',
      status: 'New'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      subject: 'Service Information',
      date: '2024-03-15',
      status: 'Read'
    }
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...formData, tags: formData.tags.split(',').map(tag => tag.trim()) }
          : post
      ));
    } else {
      // Create new post
      const newPost = {
        id: posts.length + 1,
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([...posts, newPost]);
    }
    setIsPostModalOpen(false);
    setEditingPost(null);
    setFormData({
      title: '',
      category: '',
      content: '',
      image: '',
      status: 'Draft',
      tags: ''
    });
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setFormData({
      ...post,
      tags: post.tags.join(', ')
    });
    setIsPostModalOpen(true);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const showFloatingContact = true;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'posts'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'services'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BriefcaseIcon className="h-5 w-5 mr-3" />
              Services
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <UserGroupIcon className="h-5 w-5 mr-3" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'messages'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <EnvelopeIcon className="h-5 w-5 mr-3" />
              Messages
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <CogIcon className="h-5 w-5 mr-3" />
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg mr-4">
                    <DocumentTextIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Posts</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalPosts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg mr-4">
                    <BriefcaseIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Services</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalServices}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg mr-4">
                    <UserGroupIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg mr-4">
                    <EnvelopeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Messages</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalMessages}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Posts</h3>
                <button className="btn btn-primary flex items-center">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Post
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                      <th className="pb-4">Title</th>
                      <th className="pb-4">Category</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map((post) => (
                      <tr key={post.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="py-4 text-gray-900 dark:text-white">{post.title}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-300">{post.category}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-300">{post.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.status === 'Published'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Messages</h3>
                <button className="btn btn-primary">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Email</th>
                      <th className="pb-4">Subject</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMessages.map((message) => (
                      <tr key={message.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="py-4 text-gray-900 dark:text-white">{message.name}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-300">{message.email}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-300">{message.subject}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-300">{message.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            message.status === 'New'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                          }`}>
                            {message.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts Management</h2>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setFormData({
                    title: '',
                    category: '',
                    content: '',
                    image: '',
                    status: 'Draft',
                    tags: ''
                  });
                  setIsPostModalOpen(true);
                }}
                className="btn btn-primary flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Post
              </button>
            </div>

            {/* Posts Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                      <th className="pb-4">Title</th>
                      <th className="pb-4">Category</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="py-4 text-gray-900 dark:text-white">{post.title}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-300">{post.category}</td>
                        <td className="py-4 text-gray-600 dark:text-gray-300">{post.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.status === 'Published'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Post Modal */}
            {isPostModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h3>
                  <form onSubmit={handlePostSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="AI Solutions">AI Solutions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows="6"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Web Development, AI, PWAs"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsPostModalOpen(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editingPost ? 'Update Post' : 'Create Post'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Services Management</h2>
            {/* Services management content will go here */}
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Users Management</h2>
            {/* Users management content will go here */}
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Messages Management</h2>
            {/* Messages management content will go here */}
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h2>
            {/* Settings content will go here */}
          </motion.div>
        )}

        {showFloatingContact && (
          <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50">
            <a
              href="/contact"
              className="flex items-center gap-2 bg-primary-600/90 backdrop-blur-sm hover:bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-colors text-sm sm:text-base"
              style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
            >
              <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Contact Us</span>
              <span className="sm:hidden">Chat</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;