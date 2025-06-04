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

// Enhanced user action tracking
export const trackDetailedUserAction = (action, metadata = {}) => {
    if (window.gtag) {
        window.gtag('event', action, {
            ...metadata,
            timestamp: new Date().toISOString(),
            session_id: sessionStorage.getItem('sessionId'),
            user_id: localStorage.getItem('userId'),
            page_location: window.location.pathname,
            device_type: getDeviceType(),
            browser_info: getBrowserInfo()
        });
    }
};

// Enhanced API call tracking
export const trackDetailedAPICall = (endpoint, success, responseTime, requestData = {}) => {
    if (window.gtag) {
        window.gtag('event', 'api_call', {
            endpoint,
            success,
            response_time: responseTime,
            request_data: JSON.stringify(requestData),
            timestamp: new Date().toISOString(),
            session_id: sessionStorage.getItem('sessionId'),
            user_id: localStorage.getItem('userId')
        });
    }
};

// Utility functions
const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    if (ua.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
    } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
        browserName = "Opera";
    } else if (ua.indexOf("Edge") > -1) {
        browserName = "Microsoft Edge";
    } else if (ua.indexOf("Chrome") > -1) {
        browserName = "Google Chrome";
    } else if (ua.indexOf("Safari") > -1) {
        browserName = "Safari";
    }

    return `${browserName} ${browserVersion}`;
};