import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        search: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { user } = useAuth();

    const fetchCourses = useCallback(async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage,
                ...filters
            });

            const response = await axios.get(`/api/courses?${params}`);
            setCourses(response.data.courses);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchCourses();
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Online Courses</h1>
                {user?.role === 'admin' && (
                    <Link
                        to="/admin/courses/new"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Create Course
                    </Link>
                )}
            </div>

            {/* Filters and Search */}
            <div className="mb-8">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search courses..."
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-development">Mobile Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="ai-ml">AI & Machine Learning</option>
                        <option value="cybersecurity">Cybersecurity</option>
                    </select>
                    <select
                        name="level"
                        value={filters.level}
                        onChange={handleFilterChange}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <Link
                        key={course._id}
                        to={`/courses/${course.slug}`}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-200 hover:scale-105"
                    >
                        <div className="relative">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 m-2 rounded">
                                {course.level}
                            </div>
                            {course.discount > 0 && (
                                <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 m-2 rounded">
                                    {course.discount}% OFF
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                            <p className="text-gray-600 mb-4">{course.shortDescription}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center">
                                    <img
                                        src={course.instructor.avatar}
                                        alt={course.instructor.name}
                                        className="w-6 h-6 rounded-full mr-2"
                                    />
                                    <span>{course.instructor.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className={`w-4 h-4 ${
                                                    star <= Math.round(course.rating.average)
                                                        ? 'fill-current'
                                                        : 'fill-gray-300'
                                                }`}
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2">({course.rating.count})</span>
                                </div>
                                <div>
                                    {course.discount > 0 ? (
                                        <div className="text-right">
                                            <span className="line-through text-gray-400">${course.price}</span>
                                            <span className="text-xl font-bold text-blue-500 ml-2">
                                                ${(course.price * (1 - course.discount / 100)).toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-xl font-bold text-blue-500">${course.price}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
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

export default Courses;