import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAnalytics } from './AnalyticsContext';
import { usePerformance } from './PerformanceContext';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const { trackDetailedEvent } = useAnalytics();
    const { backgroundTaskManager } = usePerformance();
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [lastSync, setLastSync] = useState(null);

    const fetchPosts = useCallback(async (pageNum, background = false) => {
        try {
            if (!background) setIsLoading(true);

            const cacheKey = `blog_posts_page_${pageNum}`;
            const cached = localStorage.getItem(cacheKey);
            
            if (cached && !background) {
                const { data, timestamp } = JSON.parse(cached);
                const isCacheValid = Date.now() - timestamp < 5 * 60 * 1000; // 5 minutes cache
                
                if (isCacheValid) {
                    if (pageNum === 1) {
                        setPosts(data);
                    } else {
                        setPosts(prev => [...prev, ...data]);
                    }
                    setHasMore(data.length === 10);
                    setIsLoading(false);
                    return;
                }
            }

            const response = await axios.get('/api/blog/posts', {
                params: {
                    page: pageNum,
                    limit: 10,
                    status: 'published'
                }
            });

            if (background) {
                const currentPosts = posts.slice((pageNum - 1) * 10, pageNum * 10);
                const hasChanges = JSON.stringify(currentPosts) !== JSON.stringify(response.data);
                if (hasChanges) {
                    setNeedsUpdate(true);
                }
            } else {
                if (pageNum === 1) {
                    setPosts(response.data);
                } else {
                    setPosts(prev => [...prev, ...response.data]);
                }
                setHasMore(response.data.length === 10);

                // Cache the response
                localStorage.setItem(cacheKey, JSON.stringify({
                    data: response.data,
                    timestamp: Date.now()
                }));
            }

            trackDetailedEvent('blog', background ? 'background_fetch' : 'fetch', null, null, {
                page: pageNum,
                items_count: response.data.length
            });

            setLastSync(Date.now());
        } catch (error) {
            console.error('Error fetching posts:', error);
            trackDetailedEvent('blog', 'fetch_error', error.message);
        } finally {
            if (!background) setIsLoading(false);
        }
    }, [posts, trackDetailedEvent]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('/api/blog/categories');
            setCategories(['All', ...response.data]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchCategories();
        fetchPosts(1);
    }, [fetchCategories, fetchPosts]);

    // Register background sync
    useEffect(() => {
        const syncPosts = async () => {
            // Only sync loaded pages
            for (let i = 1; i <= page; i++) {
                await fetchPosts(i, true);
            }
        };

        backgroundTaskManager.registerTask(
            'blog-sync',
            syncPosts,
            300000, // 5 minutes
            'low'
        );

        return () => {
            backgroundTaskManager.unregisterTask('blog-sync');
        };
    }, [backgroundTaskManager, fetchPosts, page]);

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [isLoading, hasMore]);

    const refreshPosts = useCallback(() => {
        setPosts([]);
        setPage(1);
        setNeedsUpdate(false);
        fetchPosts(1);
    }, [fetchPosts]);

    const value = {
        posts,
        categories,
        isLoading,
        hasMore,
        needsUpdate,
        lastSync,
        loadMore,
        refreshPosts
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};