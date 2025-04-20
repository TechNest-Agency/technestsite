import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import {
    UserCircleIcon,
    EnvelopeIcon,
    KeyIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Validate passwords match if changing password
            if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
                setMessage({ type: 'error', text: 'New passwords do not match' });
                return;
            }

            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    ...(formData.currentPassword && formData.newPassword ? {
                        currentPassword: formData.currentPassword,
                        newPassword: formData.newPassword
                    } : {})
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error updating profile');
            }

            updateUser(data.user);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            
            // Reset password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRequestVerification = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/verify-email/request', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error requesting verification');
            }

            setMessage({ type: 'success', text: 'Verification email sent successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Error deleting account');
                }

                await logout();
                navigate('/');
            } catch (error) {
                setMessage({ type: 'error', text: error.message });
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-3xl mx-auto">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

                        {message.text && (
                            <div className={`p-4 rounded-md mb-6 ${
                                message.type === 'success'
                                    ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                                <div className="flex">
                                    {message.type === 'success' ? (
                                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                                    ) : (
                                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                                    )}
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <UserCircleIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <EnvelopeIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                        {!user?.isEmailVerified && (
                                            <div className="mt-2 flex items-center">
                                                <ExclamationCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                                                <span className="text-sm text-yellow-500">
                                                    Email not verified.{' '}
                                                    <button
                                                        type="button"
                                                        onClick={handleRequestVerification}
                                                        className="text-primary-600 hover:text-primary-500 font-medium"
                                                    >
                                                        Resend verification email
                                                    </button>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Change Password */}
                            <div>
                                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <KeyIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="password"
                                                value={formData.currentPassword}
                                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <KeyIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="password"
                                                value={formData.newPassword}
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <KeyIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-6">
                                <button
                                    type="button"
                                    onClick={handleDeleteAccount}
                                    className="text-red-600 hover:text-red-500"
                                >
                                    Delete Account
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                                >
                                    {isLoading && <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;