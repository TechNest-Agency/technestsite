import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as analytics from '../utils/analytics';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
    const location = useLocation();
    const [pageLoadTime, setPageLoadTime] = useState(Date.now());

    useEffect(() => {
        // Initialize analytics when the app loads
        const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
        if (trackingId) {
            analytics.initializeAnalytics(trackingId);
            // Track initial page load
            analytics.trackDetailedUserAction('page_load', {
                initial_load: true,
                load_time: Date.now() - window.performance.timing.navigationStart
            });
        }
    }, []);

    useEffect(() => {
        // Track page views and navigation timing when route changes
        const previousPageLoadTime = pageLoadTime;
        const newPageLoadTime = Date.now();
        setPageLoadTime(newPageLoadTime);

        analytics.trackDetailedUserAction('page_view', {
            previous_page: location.state?.from || null,
            time_on_previous_page: newPageLoadTime - previousPageLoadTime,
            path: location.pathname,
            query_params: location.search
        });
    }, [location, pageLoadTime]);

    const trackDetailedEvent = (category, action, label, value, additionalMetadata = {}) => {
        analytics.trackDetailedUserAction(action, {
            event_category: category,
            event_label: label,
            event_value: value,
            ...additionalMetadata
        });
    };

    const trackDetailedAPICall = (endpoint, success, responseTime, requestData) => {
        analytics.trackDetailedAPICall(endpoint, success, responseTime, requestData);
    };

    return (
        <AnalyticsContext.Provider value={{
            trackEvent: analytics.trackEvent,
            trackDetailedEvent,
            trackUserAction: analytics.trackDetailedUserAction,
            trackError: analytics.trackError,
            trackAPICall: analytics.trackDetailedAPICall
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