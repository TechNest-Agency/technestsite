import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../context/AnalyticsContext';
import { usePerformance } from '../context/PerformanceContext';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Memoized cart total
    const cartTotal = useMemo(() => getCartTotal(), [getCartTotal]);

    // Memoized cart items rendering
    const cartItemsList = useMemo(() => (
        <ul className="divide-y divide-gray-200">
            <AnimatePresence>
                {cartItems.map(item => (
                    <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="py-4 flex items-center"
                    >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover object-center"
                                loading="lazy"
                            />
                        </div>

                        <div className="ml-4 flex-1">
                            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">${parseFloat(item.price).toFixed(2)}</p>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    type="button"
                                    className="p-1.5 text-gray-500 hover:text-gray-700"
                                    onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                >
                                    <MinusIcon className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <span className="px-2 text-sm">{item.quantity}</span>
                                <button
                                    type="button"
                                    className="p-1.5 text-gray-500 hover:text-gray-700"
                                    onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                >
                                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>

                            <button
                                type="button"
                                className="ml-4 text-gray-400 hover:text-gray-500"
                                onClick={() => handleRemoveItem(item)}
                            >
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    ), [cartItems, handleRemoveItem, handleUpdateQuantity]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Cart panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900 flex items-center">
                                <ShoppingBagIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                Your Cart
                                <span className="ml-2 text-sm text-gray-500">({cartItems.length} items)</span>
                            </h2>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 p-2 rounded-md"
                                onClick={() => setIsCartOpen(false)}
                            >
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-2">
                            {cartItems.length === 0 ? (
                                <div className="py-12 text-center">
                                    <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                                    <p className="mt-1 text-sm text-gray-500">Start adding items to your cart</p>
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => handleNavigate('/products')}
                                        >
                                            Browse Products
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                cartItemsList
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                    <p>Subtotal</p>
                                    <p>${cartTotal.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleNavigate('/checkout')}
                                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Checkout
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleNavigate('/products')}
                                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                                {isLowPowerMode && (
                                    <p className="mt-3 text-xs text-amber-600">
                                        Low power mode active: Some features may sync less frequently
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