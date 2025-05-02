import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useBlog } from '../context/BlogContext';
import { Helmet } from 'react-helmet-async';
import { 
    MagnifyingGlassIcon, 
    CalendarIcon, 
    UserIcon,
    TagIcon,
    ArrowRightIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
    const { isDarkMode } = useTheme();
    const { 
        posts,
        categories,
        isLoading,
        hasMore,
        needsUpdate,
        lastSync,
        loadMore,
        refreshPosts
    } = useBlog();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const observerTarget = useRef(null);

    // Set up intersection observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.5 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    // Filter posts based on search query and selected category
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [posts, searchQuery, selectedCategory]);

    // Get popular posts
    const popularPosts = useMemo(() => {
        return [...posts]
            .sort((a, b) => b.stats.views - a.stats.views)
            .slice(0, 5);
    }, [posts]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
            <Helmet>
                <title>Blog | TechNest</title>
                <meta name="description" content="Explore our latest articles on web development, mobile apps, AI solutions, cloud computing, and cybersecurity." />
                <meta name="keywords" content="blog, technology, web development, mobile apps, AI, cloud computing, cybersecurity" />
            </Helmet>

            {/* Hero Section */}
            <div className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            TechNest Blog
                        </h1>
                        <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Stay updated with the latest trends and insights in technology
                        </p>
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full px-4 py-3 pl-12 rounded-lg border ${
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            <MagnifyingGlassIcon className={`h-5 w-5 absolute left-4 top-3.5 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {needsUpdate && (
                    <div className="mb-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900 flex items-center justify-between">
                        <p className="text-blue-700 dark:text-blue-200">
                            New content available! Last synced: {new Date(lastSync).toLocaleTimeString()}
                        </p>
                        <button
                            onClick={refreshPosts}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <ArrowPathIcon className="h-5 w-5" />
                            Refresh
                        </button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Blog Posts */}
                    <div className="lg:w-2/3">
                        {/* Categories */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? isDarkMode
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-blue-500 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Blog Posts Grid */}
                        <div className="grid gap-8">
                            {filteredPosts.map((post) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className={`rounded-lg overflow-hidden shadow-lg ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
                                >
                                    <Link to={`/blog/${post.slug}`}>
                                        <div className="relative h-64">
                                            <img
                                                src={post.featuredImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            {post.stats.views > 1000 && (
                                                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    Popular
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {post.category}
                                                </span>
                                                <div className={`flex items-center gap-2 text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <CalendarIcon className="h-4 w-4" />
                                                    {new Date(post.publishedAt).toLocaleDateString()}
                                                </div>
                                                <div className={`flex items-center gap-2 text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <UserIcon className="h-4 w-4" />
                                                    {post.author.name}
                                                </div>
                                            </div>
                                            <h2 className={`text-2xl font-bold mb-3 ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {post.title}
                                            </h2>
                                            <p className={`mb-4 ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <TagIcon className={`h-4 w-4 ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`} />
                                                    <div className="flex flex-wrap gap-2">
                                                        {post.tags.slice(0, 3).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className={`text-sm ${
                                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                                }`}
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-2 text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <span>{post.readingTime} min read</span>
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Loading and Load More */}
                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : hasMore ? (
                            <div ref={observerTarget} className="h-20" />
                        ) : (
                            <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                                No more posts to load
                            </p>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Popular Posts */}
                        <div className={`rounded-lg p-6 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}>
                            <h3 className={`text-xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Popular Posts
                            </h3>
                            <div className="space-y-4">
                                {popularPosts.map((post) => (
                                    <Link
                                        key={post._id}
                                        to={`/blog/${post.slug}`}
                                        className="block group"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <img
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover rounded"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-medium mb-1 group-hover:text-blue-500 ${
                                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                    {post.title}
                                                </h4>
                                                <div className={`flex items-center gap-2 text-xs ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <CalendarIcon className="h-3 w-3" />
                                                    {new Date(post.publishedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className={`rounded-lg p-6 mb-8 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}>
                            <h3 className={`text-xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.filter(cat => cat !== 'All').map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                            selectedCategory === category
                                                ? isDarkMode
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-500 text-white'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className={`rounded-lg p-6 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}>
                            <h3 className={`text-xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Popular Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(posts.flatMap(post => post.tags)))
                                    .slice(0, 10)
                                    .map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => setSearchQuery(tag)}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                isDarkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(Blog);