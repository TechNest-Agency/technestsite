import { useEffect } from 'react';
import { usePerformance } from '../context/PerformanceContext';
import { useLocation } from 'react-router-dom';

const PreloadResources = () => {
    const { optimizeResourceLoading } = usePerformance();
    const location = useLocation();

    useEffect(() => {
        // Define critical resources for each route
        const resourceMap = {
            '/': [
                { type: 'preload', url: '/logo192.png', as: 'image' },
                { type: 'preconnect', url: 'https://fonts.googleapis.com' },
            ],
            '/blog': [
                { type: 'prefetch', url: '/blog/latest' },
                { type: 'preload', url: '/api/blog/categories', as: 'fetch' }
            ],
            '/portfolio': [
                { type: 'preload', url: '/api/portfolio/featured', as: 'fetch' },
                { type: 'prefetch', url: '/portfolio/gallery' }
            ],
            '/checkout': [
                { type: 'preconnect', url: 'https://api.stripe.com' },
                { type: 'preload', url: '/api/payment/config', as: 'fetch' }
            ]
        };

        // Get resources for current route
        const resources = resourceMap[location.pathname] || [];

        // Add common resources
        const commonResources = [
            { type: 'preconnect', url: process.env.REACT_APP_API_URL },
            { type: 'preload', url: '/api/settings', as: 'fetch' }
        ];

        optimizeResourceLoading([...resources, ...commonResources]);
    }, [location.pathname, optimizeResourceLoading]);

    return null;
};

export default PreloadResources;