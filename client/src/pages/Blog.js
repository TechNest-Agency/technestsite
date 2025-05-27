import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchPosts = useCallback(async () => {
        try {
            const url = `/api/blog?page=${currentPage}${selectedCategory ? `&category=${selectedCategory}` : ''}`;
            const response = await axios.get(url);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            setLoading(false);
        }
    }, [currentPage, selectedCategory]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('/api/blog/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, [fetchPosts, fetchCategories]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            const response = await axios.get(`/api/blog/search/${searchQuery}`);
            setPosts(response.data);
            setTotalPages(1);
            setCurrentPage(1);
            setLoading(false);
        } catch (error) {
            console.error('Error searching blog posts:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>

            {/* Search and Filter */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search blog posts..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {post.featuredImage && (
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="text-gray-900 hover:text-blue-600"
                                >
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>By {post.author.name}</span>
                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded ${
                                currentPage === page
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;
