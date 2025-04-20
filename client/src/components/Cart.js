import React from 'react';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { 
        cartItems, 
        isCartOpen, 
        setIsCartOpen, 
        removeFromCart, 
        updateQuantity,
        getCartTotal
    } = useCart();

    const handleNavigate = (path) => {
        setIsCartOpen(false);
        navigate(path);
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                onClick={() => setIsCartOpen(false)} />

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="w-screen max-w-md transform transition ease-in-out duration-500">
                    <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Shopping Cart</h2>
                                <button
                                    className="relative -mr-2 p-2 text-gray-400 hover:text-gray-500"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="mt-8">
                                {cartItems.length === 0 ? (
                                    <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
                                ) : (
                                    <div className="flow-root">
                                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {cartItems.map((item) => (
                                                <li key={item.id} className="py-6">
                                                    <div className="flex flex-col space-y-3">
                                                        <div className="flex justify-between">
                                                            <div className="flex-1">
                                                                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                                                    {item.title}
                                                                </h3>
                                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                                    {item.description}
                                                                </p>
                                                                {item.features && item.features.length > 0 && (
                                                                    <ul className="mt-2 list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                                                                        {item.features.slice(0, 2).map((feature, index) => (
                                                                            <li key={index}>{feature}</li>
                                                                        ))}
                                                                        {item.features.length > 2 && (
                                                                            <li>+ {item.features.length - 2} more features</li>
                                                                        )}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                            <p className="text-base font-medium text-gray-900 dark:text-white ml-4">
                                                                {item.price}
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                {item.type && (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                                                                        {item.type}
                                                                    </span>
                                                                )}
                                                                {item.category && (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                                                        {item.category}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <button
                                                                    className="p-1 text-gray-400 hover:text-gray-500"
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                >
                                                                    <MinusIcon className="h-4 w-4" />
                                                                </button>
                                                                <span className="mx-2 text-gray-600 dark:text-gray-300">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    className="p-1 text-gray-400 hover:text-gray-500"
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                >
                                                                    <PlusIcon className="h-4 w-4" />
                                                                </button>
                                                                <button
                                                                    className="ml-4 text-primary-600 hover:text-primary-500 text-sm"
                                                                    onClick={() => removeFromCart(item.id)}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <p>Total</p>
                                    <p>${getCartTotal().toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <div className="mt-6 space-y-3">
                                    <button
                                        onClick={() => handleNavigate('/checkout')}
                                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                                    >
                                        Proceed to Checkout
                                    </button>
                                    <button
                                        onClick={() => handleNavigate('/contact')}
                                        className="w-full flex justify-center items-center px-6 py-3 border-2 border-primary-600 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10"
                                    >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;