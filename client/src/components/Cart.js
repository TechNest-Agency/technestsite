import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    XMarkIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
    SparklesIcon,
    ArrowRightIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../context/AnalyticsContext';

// Utility function to parse price strings
const parsePrice = (priceString) => {
    if (!priceString) return 0;
    const cleanPrice = priceString.replace(/[^\d.-]/g, '');
    const prices = cleanPrice.split('-').map(p => parseFloat(p));
    return prices.find(p => !isNaN(p)) || 0;
};

const Cart = () => {
    const navigate = useNavigate();
    const { trackDetailedEvent } = useAnalytics();
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    const [isAnimating, setIsAnimating] = useState(false);    const cartTotal = useMemo(() => {
        return getCartTotal();
    }, [getCartTotal]);

    const handleNavigate = useCallback((path) => {
        setIsCartOpen(false);
        setTimeout(() => navigate(path), 300);
    }, [navigate, setIsCartOpen]);

    const handleRemoveItem = useCallback((item) => {
        setIsAnimating(true);
        setTimeout(() => {
            removeFromCart(item.id);  // Pass just the id instead of the whole item
            setIsAnimating(false);
            trackDetailedEvent('remove_from_cart', { itemId: item.id });
        }, 300);
    }, [removeFromCart, trackDetailedEvent]);

    const cartAnimation = {
        hidden: { x: '100%' },
        visible: { 
            x: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        },
        exit: { 
            x: '100%',
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        }
    };

    const cartItemAnimation = {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0, x: 20 },
        transition: { type: "spring", stiffness: 300, damping: 25 }
    };

    // Memoized cart items rendering with enhanced UI
    const cartItemsList = useMemo(() => (
        <ul className="divide-y divide-gray-200/10">
            <AnimatePresence mode="popLayout">
                {cartItems.map(item => (
                    <motion.li
                        key={item.id}
                        layout
                        {...cartItemAnimation}
                        className={`py-6 ${isAnimating ? 'pointer-events-none' : ''}`}
                    >
                        <div className="flex items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            {/* Item Image */}
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center">
                                        <SparklesIcon className="h-8 w-8 text-primary-400" />
                                    </div>
                                )}
                            </div>

                            <div className="ml-6 flex-1">
                                <div className="flex justify-between">
                                    <motion.h3 
                                        className="text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors"
                                        layout
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        onClick={() => handleRemoveItem(item)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </motion.button>
                                </div>
                                <motion.p layout className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {item.category}
                                </motion.p>
                                <motion.div layout className="mt-2 flex items-center justify-between">
                                    <span className="text-lg font-medium text-primary-600 dark:text-primary-400">
                                        ${parseFloat(item.price || 0).toFixed(2)}
                                    </span>
                                    {item.quantity !== undefined && (
                                        <div className="flex items-center space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <MinusIcon className="h-4 w-4" />
                                            </motion.button>
                                            <span className="w-8 text-center">{item.quantity || 1}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                            </motion.button>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    ), [cartItems, handleRemoveItem, isAnimating, updateQuantity, cartItemAnimation]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                    />

                    {/* Cart Panel */}
                    <motion.div
                        variants={cartAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200/10 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {cartItems.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-24 h-24 mx-auto bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBagIcon className="h-12 w-12 text-primary-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                                        Start adding some amazing services!
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleNavigate('/services')}
                                        className="inline-flex items-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        Explore Services
                                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                                    </motion.button>
                                </motion.div>
                            ) : (
                                cartItemsList
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200/10 px-6 py-6 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-base text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <motion.div
                                        layout
                                        className="text-right"
                                    >
                                        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            ${Number(cartTotal).toFixed(2)}
                                        </span>
                                        {cartItems.some(item => String(item.price).includes('month')) && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                *Some items are billed monthly
                                            </p>
                                        )}
                                    </motion.div>
                                </div>

                                <div className="space-y-3">
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleNavigate('/checkout')}
                                        className="w-full inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        Proceed to Checkout
                                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleNavigate('/services')}
                                        className="w-full inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-200"
                                    >
                                        Continue Shopping
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;