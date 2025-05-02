import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { usePerformance } from '../context/PerformanceContext';
import { useAnalytics } from '../context/AnalyticsContext';

const ITEMS_PER_PAGE = 6;

const Courses = () => {
    const { isDarkMode } = useTheme();
    const { backgroundTaskManager } = usePerformance();
    const { trackDetailedEvent } = useAnalytics();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isBackgroundUpdate, setIsBackgroundUpdate] = useState(false);

    // Memoized axios instance with caching
    const axiosInstance = useMemo(() => {
        const instance = axios.create();
        
        // Add caching interceptor
        instance.interceptors.response.use(response => {
            if (response.config.method === 'get') {
                const cacheKey = `course_${response.config.url}`;
                localStorage.setItem(cacheKey, JSON.stringify({
                    data: response.data,
                    timestamp: Date.now()
                }));
            }
            return response;
        });

        return instance;
    }, []);

    const fetchCourses = useCallback(async (pageNum, background = false) => {
        try {
            if (!background) {
                setIsLoading(true);
            }

            // Try to get from cache first
            const cacheKey = `course_/api/courses?page=${pageNum}`;
            const cached = localStorage.getItem(cacheKey);
            
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                const isCacheValid = Date.now() - timestamp < 5 * 60 * 1000; // 5 minutes cache
                
                if (isCacheValid && !background) {
                    setCourses(prev => [...prev, ...data]);
                    setHasMore(data.length === ITEMS_PER_PAGE);
                    setIsLoading(false);
                    return;
                }
            }

            const response = await axiosInstance.get('/api/courses', {
                params: {
                    page: pageNum,
                    limit: ITEMS_PER_PAGE
                }
            });

            if (!background) {
                setCourses(prev => [...prev, ...response.data]);
                setHasMore(response.data.length === ITEMS_PER_PAGE);
            } else {
                // If background update finds changes, mark for update
                const currentCourses = courses.slice((pageNum - 1) * ITEMS_PER_PAGE, pageNum * ITEMS_PER_PAGE);
                const hasChanges = JSON.stringify(currentCourses) !== JSON.stringify(response.data);
                
                if (hasChanges) {
                    setIsBackgroundUpdate(true);
                }
            }

            trackDetailedEvent('courses', background ? 'background_fetch' : 'fetch', null, null, {
                page: pageNum,
                items_count: response.data.length
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
            trackDetailedEvent('courses', 'fetch_error', error.message);
        } finally {
            if (!background) {
                setIsLoading(false);
            }
        }
    }, [axiosInstance, courses, trackDetailedEvent]);

    // Initial load and scroll handling
    useEffect(() => {
        fetchCourses(1);

        // Set up intersection observer for infinite scroll
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.5 }
        );

        const sentinel = document.getElementById('scroll-sentinel');
        if (sentinel) {
            observer.observe(sentinel);
        }

        return () => observer.disconnect();
    }, [fetchCourses, hasMore, isLoading]);

    // Background updates
    useEffect(() => {
        // Register background update task
        backgroundTaskManager.registerTask(
            'courses-update',
            async () => {
                // Check for updates on current pages
                for (let i = 1; i <= page; i++) {
                    await fetchCourses(i, true);
                }
            },
            300000, // 5 minutes
            'low'
        );

        return () => {
            backgroundTaskManager.unregisterTask('courses-update');
        };
    }, [backgroundTaskManager, fetchCourses, page]);

    // Load more courses when page changes
    useEffect(() => {
        if (page > 1) {
            fetchCourses(page);
        }
    }, [page, fetchCourses]);

    const courseGrid = useMemo(() => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
                <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-lg overflow-hidden shadow-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                >
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {course.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Duration: {course.duration}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Instructor: {course.instructor}
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ${course.price}
                            </span>
                            <button 
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                onClick={() => {
                                    trackDetailedEvent('courses', 'enroll_click', course.title, course.price);
                                }}
                            >
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    ), [courses, isDarkMode, trackDetailedEvent]);

    return (
        <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Explore our comprehensive range of courses designed to help you master new skills and advance your career.
                    </p>
                </motion.div>

                {isBackgroundUpdate && (
                    <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            New updates available! 
                            <button 
                                className="ml-2 underline"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Refresh to see the latest courses
                            </button>
                        </p>
                    </div>
                )}

                {courseGrid}

                {isLoading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {!isLoading && hasMore && (
                    <div id="scroll-sentinel" className="h-20" />
                )}
            </div>
        </div>
    );
};

export default React.memo(Courses);