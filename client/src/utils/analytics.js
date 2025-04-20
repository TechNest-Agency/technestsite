export const initializeAnalytics = (trackingId) => {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', trackingId);

    // Initialize page view tracking
    trackPageView(window.location.pathname);
};

export const trackPageView = (path) => {
    if (window.gtag) {
        window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
            page_path: path
        });
    }
};

export const trackEvent = (category, action, label = null, value = null) => {
    if (window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
};

export const trackUserAction = (action, metadata = {}) => {
    if (window.gtag) {
        window.gtag('event', action, {
            ...metadata,
            timestamp: new Date().toISOString()
        });
    }
};

export const trackError = (error, componentStack) => {
    if (window.gtag) {
        window.gtag('event', 'error', {
            error_message: error.message,
            error_stack: error.stack,
            component_stack: componentStack,
            timestamp: new Date().toISOString()
        });
    }
};

export const trackAPICall = (endpoint, success, responseTime) => {
    if (window.gtag) {
        window.gtag('event', 'api_call', {
            endpoint,
            success,
            response_time: responseTime,
            timestamp: new Date().toISOString()
        });
    }
};