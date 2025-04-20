import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Courses = () => {
    const { isDarkMode } = useTheme();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/courses');
                setCourses(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

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
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;