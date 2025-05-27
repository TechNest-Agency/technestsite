import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../context/AnalyticsContext';
import { usePerformance } from '../context/PerformanceContext';
import { motion, AnimatePresence } from 'framer-motion';

// Utility function to parse price strings
const parsePrice = (priceString) => {
    if (!priceString) return 0;
    
    // Remove everything except numbers, dots, and dashes
    const cleanPrice = priceString.replace(/[^\d.-]/g, '');
    
    // Handle price ranges (e.g., "100-250" -> take the lower price)
    const prices = cleanPrice.split('-').map(p => parseFloat(p));
    
    // Return the first valid number, or 0 if no valid numbers found
    return prices.find(p => !isNaN(p)) || 0;
};

const Cart = () => {
    const navigate = useNavigate();
    const { trackDetailedEvent } = useAnalytics();
    const { backgroundTaskManager } = usePerformance();
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();
    const [isLowPowerMode, setIsLowPowerMode] = useState(false);

    // Check device battery status with better browser compatibility
    useEffect(() => {
        const checkBattery = async () => {
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();

                    const checkPowerMode = () => {
                        setIsLowPowerMode(battery.level <= 0.2 && !battery.charging);
                    };

                    battery.addEventListener('levelchange', checkPowerMode);
                    battery.addEventListener('chargingchange', checkPowerMode);
                    checkPowerMode();

                    return () => {
                        battery.removeEventListener('levelchange', checkPowerMode);
                        battery.removeEventListener('chargingchange', checkPowerMode);
                    };
                } catch (error) {
                    console.warn('Battery API access failed:', error);
                }
            }
        };

        checkBattery();
    }, []);

    // Register cart sync task with power-aware frequency
    useEffect(() => {
        const syncCart = async () => {
            try {
                // Simulate cart sync with backend
                await new Promise(resolve => setTimeout(resolve, 100));
                trackDetailedEvent('cart', 'sync_completed', null, null, {
                    items_count: cartItems.length,
                    total: getCartTotal()
                });
            } catch (error) {
                console.error('Cart sync failed:', error);
            }
        };

        backgroundTaskManager.registerTask(
            'cart-sync',
            syncCart,
            isLowPowerMode ? 60000 : 30000,
            'normal'
        );

        return () => {
            backgroundTaskManager.unregisterTask('cart-sync');
        };
    }, [isLowPowerMode, cartItems.length, getCartTotal, trackDetailedEvent, backgroundTaskManager]);

    const handleNavigate = useCallback((path) => {
        setIsCartOpen(false);
        trackDetailedEvent('cart', 'navigation', path, null, {
            cart_total: getCartTotal(),
            items_count: cartItems.length,
            low_power_mode: isLowPowerMode
        });
        // Redirect '/products' to '/services' instead
        if (path === '/products') {
            navigate('/services');
        } else {
            navigate(path);
        }
    }, [setIsCartOpen, trackDetailedEvent, getCartTotal, cartItems.length, isLowPowerMode, navigate]);

    const handleRemoveItem = useCallback((item) => {
        trackDetailedEvent('cart', 'remove_item', item.title, item.price, {
            item_id: item.id,
            item_category: item.category,
            cart_total_before: getCartTotal(),
            low_power_mode: isLowPowerMode
        });
        removeFromCart(item.id);
    }, [removeFromCart, trackDetailedEvent, getCartTotal, isLowPowerMode]);

    const handleUpdateQuantity = useCallback((item, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem(item);
            return;
        }

        trackDetailedEvent('cart', 'update_quantity', item.title, newQuantity, {
            item_id: item.id,
            previous_quantity: item.quantity,
            price_impact: (newQuantity - item.quantity) * parseFloat(item.price),
            low_power_mode: isLowPowerMode
        });
        updateQuantity(item.id, newQuantity);
    }, [handleRemoveItem, updateQuantity, trackDetailedEvent, isLowPowerMode]);

    // Update the getCartTotal calculation
    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parsePrice(item.price);
            return total + (itemPrice * (item.quantity || 1));
        }, 0);
    }, [cartItems]);

    // Enhanced animations for cart items
    const cartItemAnimation = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, x: -20, scale: 0.95 },
        transition: { type: "spring", stiffness: 300, damping: 25 }
    };

    // Memoized cart items rendering with enhanced UI
    const cartItemsList = useMemo(() => (
        <ul className="divide-y divide-gray-200/50">
            <AnimatePresence mode="popLayout">
                {cartItems.map(item => (
                    <motion.li
                        key={item.id}
                        {...cartItemAnimation}
                        className="py-6 flex items-center bg-white/50 backdrop-blur-sm rounded-xl my-2 px-4 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover object-center"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    <SparklesIcon className="h-8 w-8" />
                                </div>
                            )}
                        </div>

                        <div className="ml-6 flex-1">
                            <div className="flex justify-between">
                                <h3 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {item.title}
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    onClick={() => handleRemoveItem(item)}
                                >
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                </motion.button>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold text-indigo-600">{item.price}</p>
                                    {item.price.includes('month') && (
                                        <span className="text-xs text-gray-500">(Monthly subscription)</span>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <motion.div 
                                        className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1 border border-gray-100"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            className="p-1 text-gray-500 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-100"
                                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                        </motion.button>
                                        <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity || 1}</span>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            className="p-1 text-gray-500 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-100"
                                            onClick={() => handleUpdateQuantity(item, (item.quantity || 1) + 1)}
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    ), [cartItems, handleRemoveItem, handleUpdateQuantity, cartItemAnimation]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop with enhanced blur effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Modern Cart Panel */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 flex flex-col rounded-l-2xl overflow-hidden border-l border-gray-100"
                    >
                        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <div className="relative">
                                    <ShoppingBagIcon className="h-6 w-6 mr-3 text-indigo-600" aria-hidden="true" />
                                    {cartItems.length > 0 && (
                                        <span className="absolute -top-2 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </div>
                                Your Cart
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                className="text-gray-400 hover:text-gray-500 p-2"
                                onClick={() => setIsCartOpen(false)}
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </motion.button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                            {cartItems.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-24 h-24 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBagIcon className="h-12 w-12 text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500 mb-8">Start adding some amazing services!</p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        className="inline-flex items-center px-6 py-3 rounded-xl shadow-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 transition-all duration-200"
                                        onClick={() => handleNavigate('/services')}
                                    >
                                        Explore Services
                                    </motion.button>
                                </motion.div>
                            ) : (
                                cartItemsList
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-100 px-6 py-6 bg-white/80 backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-base text-gray-600">Subtotal</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
                                        {cartItems.some(item => item.price.includes('month')) && (
                                            <p className="text-xs text-gray-500 mt-1">*Some items are billed monthly</p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="button"
                                        onClick={() => handleNavigate('/checkout')}
                                        className="w-full inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="button"
                                        onClick={() => handleNavigate('/services')}
                                        className="w-full inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                                    >
                                        Continue Shopping
                                    </motion.button>
                                </div>
                                {isLowPowerMode && (
                                    <p className="mt-4 text-xs text-amber-600 flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Low power mode: Syncing less frequently
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;