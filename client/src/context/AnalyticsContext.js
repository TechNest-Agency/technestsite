import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as analytics from '../utils/analytics';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // Initialize analytics when the app loads
        const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
        if (trackingId) {
            analytics.initializeAnalytics(trackingId);
        }
    }, []);

    useEffect(() => {
        // Track page views when route changes
        analytics.trackPageView(location.pathname);
    }, [location]);

    const trackEvent = (category, action, label, value) => {
        analytics.trackEvent(category, action, label, value);
    };

    const trackUserAction = (action, metadata) => {
        analytics.trackUserAction(action, metadata);
    };

    const trackError = (error, componentStack) => {
        analytics.trackError(error, componentStack);
    };

    const trackAPICall = (endpoint, success, responseTime) => {
        analytics.trackAPICall(endpoint, success, responseTime);
    };

    return (
        <AnalyticsContext.Provider value={{
            trackEvent,
            trackUserAction,
            trackError,
            trackAPICall
        }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};