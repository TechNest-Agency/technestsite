import React, { useState, useCallback } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';

const ImageUpload = ({ onImageUpload, label, className = '', maxSizeMB = 10, quality = 0.8 }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { trackDetailedEvent } = useAnalytics();

    // Image compression and optimization
    const optimizeImage = async (file) => {
        if (!file) return null;

        // Track start of image processing
        const startTime = performance.now();
        setIsProcessing(true);

        try {
            // Convert to WebP if browser supports it
            if (file.type !== 'image/webp' && 'createImageBitmap' in window) {
                const bitmap = await createImageBitmap(file);
                const canvas = document.createElement('canvas');
                canvas.width = bitmap.width;
                canvas.height = bitmap.height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(bitmap, 0, 0);

                const blob = await new Promise(resolve => {
                    canvas.toBlob(resolve, 'image/webp', quality);
                });

                file = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                    type: 'image/webp'
                });
            }

            // Check file size
            if (file.size > maxSizeMB * 1024 * 1024) {
                const scale = Math.sqrt((maxSizeMB * 1024 * 1024) / file.size);
                const bitmap = await createImageBitmap(file);
                const canvas = document.createElement('canvas');
                canvas.width = bitmap.width * scale;
                canvas.height = bitmap.height * scale;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

                const blob = await new Promise(resolve => {
                    canvas.toBlob(resolve, file.type, quality);
                });

                file = new File([blob], file.name, { type: file.type });
            }

            // Track image optimization metrics
            const endTime = performance.now();
            trackDetailedEvent('image_upload', 'image_optimization', file.name, file.size, {
                processing_time: endTime - startTime,
                original_size: file.size,
                final_size: file.size,
                format: file.type
            });

            return file;
        } catch (error) {
            console.error('Image optimization failed:', error);
            trackDetailedEvent('image_upload', 'optimization_error', error.message);
            return file;
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFile = useCallback(async (file) => {
        if (!file) {
            setPreviewUrl('');
            onImageUpload(null);
            return;
        }

        // Create preview URL and optimize image
        const reader = new FileReader();
        reader.onloadend = async () => {
            setPreviewUrl(reader.result);
            const optimizedFile = await optimizeImage(file);
            onImageUpload(optimizedFile);
        };
        reader.readAsDataURL(file);
    }, [onImageUpload]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500'}
                    ${isProcessing ? 'opacity-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isProcessing && document.getElementById('file-upload').click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isProcessing}
                />
                {previewUrl ? (
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-48 mx-auto rounded-lg"
                            loading="lazy"
                        />
                        {!isProcessing && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFile(null);
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {isProcessing ? (
                            <div className="animate-pulse">
                                <div className="mx-auto h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="mt-4 text-sm text-gray-500">Processing image...</div>
                            </div>
                        ) : (
                            <>
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                    >
                                        <span>Upload a file</span>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG, GIF up to {maxSizeMB}MB (Will be optimized automatically)
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;