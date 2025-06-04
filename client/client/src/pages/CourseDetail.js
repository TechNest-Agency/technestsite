import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        fetchCourse();
    }, [slug]);

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`/api/courses/${slug}`);
            setCourse(response.data);
            
            if (user) {
                const enrollment = response.data.enrolledStudents.find(
                    e => e.student === user._id
                );
                if (enrollment) {
                    setIsEnrolled(true);
                    setProgress(enrollment.progress);
                    setCompletedLessons(enrollment.completedLessons);
                }
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching course:', error);
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login', { state: { from: `/courses/${slug}` } });
            return;
        }

        try {
            await axios.post(`/api/courses/${course._id}/enroll`);
            setIsEnrolled(true);
            fetchCourse(); // Refresh course data
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    };

    const markLessonComplete = async (lessonId) => {
        try {
            const response = await axios.post(`/api/courses/${course._id}/progress`, {
                lessonId
            });
            setProgress(response.data.progress);
            setCompletedLessons(response.data.completedLessons);
        } catch (error) {
            console.error('Error marking lesson as complete:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">Course not found</div>
            </div>
        );
    }

    const currentModule = course.modules[selectedModule];
    const currentLesson = currentModule?.lessons[selectedLesson];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Content */}
                <div className="lg:col-span-2">
                    {/* Course Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                        <div className="flex items-center text-gray-600 mb-4">
                            <span className="mr-4">
                                <span className="font-medium">Instructor:</span> {course.instructor.name}
                            </span>
                            <span className="mr-4">
                                <span className="font-medium">Level:</span> {course.level}
                            </span>
                            <span>
                                <span className="font-medium">Duration:</span>{' '}
                                {Math.floor(course.duration / 60)}h {course.duration % 60}m
                            </span>
                        </div>
                        <p className="text-gray-700">{course.description}</p>
                    </div>

                    {/* Course Progress */}
                    {isEnrolled && (
                        <div className="mb-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                                {Math.round(progress)}% Complete
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                        <div
                                            style={{ width: `${progress}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Course Content */}
                    {isEnrolled ? (
                        <div className="bg-white rounded-lg shadow">
                            {/* Lesson Content */}
                            <div className="p-6">
                                {currentLesson ? (
                                    <>
                                        <h2 className="text-2xl font-semibold mb-4">
                                            {currentLesson.title}
                                        </h2>
                                        {currentLesson.type === 'video' ? (
                                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                                <iframe
                                                    src={currentLesson.content}
                                                    allowFullScreen
                                                    className="rounded-lg"
                                                ></iframe>
                                            </div>
                                        ) : (
                                            <div className="prose max-w-none">
                                                {currentLesson.content}
                                            </div>
                                        )}
                                        {!completedLessons.includes(currentLesson._id) && (
                                            <button
                                                onClick={() => markLessonComplete(currentLesson._id)}
                                                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Mark as Complete
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center text-gray-500">
                                        Select a lesson to begin
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <h2 className="text-2xl font-semibold mb-4">
                                Enroll to access course content
                            </h2>
                            <button
                                onClick={handleEnroll}
                                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Enroll Now - ${course.price}
                            </button>
                        </div>
                    )}
                </div>

                {/* Course Sidebar */}
                <div>
                    <div className="bg-white rounded-lg shadow sticky top-8">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                            <div className="space-y-4">
                                {course.modules.map((module, moduleIndex) => (
                                    <div key={moduleIndex}>
                                        <button
                                            onClick={() => setSelectedModule(moduleIndex)}
                                            className="w-full text-left font-medium p-2 hover:bg-gray-100 rounded"
                                        >
                                            {module.title}
                                        </button>
                                        {selectedModule === moduleIndex && (
                                            <div className="ml-4 space-y-2">
                                                {module.lessons.map((lesson, lessonIndex) => (
                                                    <button
                                                        key={lessonIndex}
                                                        onClick={() => setSelectedLesson(lessonIndex)}
                                                        className={`w-full text-left p-2 text-sm rounded flex items-center ${
                                                            selectedLesson === lessonIndex
                                                                ? 'bg-blue-50 text-blue-600'
                                                                : 'hover:bg-gray-50'
                                                        }`}
                                                        disabled={!isEnrolled}
                                                    >
                                                        {completedLessons.includes(lesson._id) && (
                                                            <svg
                                                                className="w-4 h-4 mr-2 text-green-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                        {lesson.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
