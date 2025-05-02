import React, { createContext, useContext, useEffect } from 'react';
import backgroundTaskManager from '../utils/backgroundTasks';
import { useAnalytics } from './AnalyticsContext';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
    const { trackDetailedEvent } = useAnalytics();

    useEffect(() => {
        // Register performance monitoring task
        backgroundTaskManager.registerTask(
            'performance-monitoring',
            async () => {
                const metrics = await collectPerformanceMetrics();
                trackDetailedEvent('performance', 'metrics_collected', null, null, metrics);
            },
            60000, // Run every minute
            'normal'
        );

        // Register memory cleanup task
        backgroundTaskManager.registerTask(
            'memory-cleanup',
            () => {
                cleanupMemory();
                trackDetailedEvent('performance', 'memory_cleaned');
            },
            300000, // Run every 5 minutes
            'low'
        );

        return () => {
            backgroundTaskManager.unregisterAllTasks();
        };
    }, [trackDetailedEvent]);

    const collectPerformanceMetrics = async () => {
        const metrics = {
            memory: window.performance.memory ? {
                usedJSHeapSize: window.performance.memory.usedJSHeapSize,
                totalJSHeapSize: window.performance.memory.totalJSHeapSize
            } : null,
            navigation: window.performance.timing ? {
                loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
                domReadyTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
            } : null,
            batteryStatus: null
        };

        // Collect battery info if available
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                metrics.batteryStatus = {
                    level: battery.level,
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            } catch (error) {
                console.warn('Battery status not available:', error);
            }
        }

        return metrics;
    };

    const cleanupMemory = () => {
        // Clear old items from localStorage
        try {
            const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
            const now = Date.now();
            
            Object.keys(localStorage).forEach(key => {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (item && item.timestamp && (now - item.timestamp > maxAge)) {
                        localStorage.removeItem(key);
                    }
                } catch (e) {
                    // Skip non-JSON items
                }
            });
        } catch (error) {
            console.warn('Local storage cleanup failed:', error);
        }

        // Clear old service worker caches
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
                const now = Date.now();
                
                cacheNames.forEach(cacheName => {
                    caches.open(cacheName).then(cache => {
                        cache.keys().then(requests => {
                            requests.forEach(request => {
                                cache.match(request).then(response => {
                                    if (response && response.headers.get('date')) {
                                        const date = new Date(response.headers.get('date')).getTime();
                                        if (now - date > maxAge) {
                                            cache.delete(request);
                                        }
                                    }
                                });
                            });
                        });
                    });
                });
            });
        }
    };

    const optimizeResourceLoading = (resources) => {
        // Implement resource hints
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = resource.type; // 'preload', 'prefetch', or 'preconnect'
            link.href = resource.url;
            if (resource.as) link.as = resource.as;
            document.head.appendChild(link);
        });
    };

    return (
        <PerformanceContext.Provider value={{
            optimizeResourceLoading,
            backgroundTaskManager
        }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
};