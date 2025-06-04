import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  CreditCardIcon, 
  BanknotesIcon,
  ArrowPathIcon,
  DevicePhoneMobileIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handlePayment = async (method) => {
    try {
      setLoading(true);
      setError('');
      
      // Validate form
      if (!formData.email || !formData.name) {
        throw new Error('Please fill in all required fields');
      }

      const cart = cartItems.map(item => ({
        title: item.title,
        price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
        type: item.type,
        category: item.category
      }));

      const total = getCartTotal();      // Use localhost:5000 if no environment variable is set
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/payment/${method}/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          cart,
          total,
          email: formData.email,
          message: formData.message
        })
      });

      const data = await response.json();      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => navigate('/services')}
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Browse Services
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Checkout Details
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
                {error}
              </div>
            )}

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>
            </form>
          </motion.div>

          {/* Order Summary and Payment Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      {item.type && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                          {item.type}
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.price}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-primary-600">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Methods
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handlePayment('stripe')}
                  disabled={loading || !formData.email || !formData.name}
                  className={`flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors ${
                    (!formData.email || !formData.name) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <CreditCardIcon className="h-6 w-6 mr-2 text-primary-600" />
                  <span className="font-medium">Pay with Card</span>
                </button>

                <button
                  onClick={() => handlePayment('payoneer')}
                  disabled={loading || !formData.email || !formData.name}
                  className={`flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors ${
                    (!formData.email || !formData.name) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <BanknotesIcon className="h-6 w-6 mr-2 text-primary-600" />
                  <span className="font-medium">Payoneer</span>
                </button>

                <button
                  onClick={() => handlePayment('bkash')}
                  disabled={loading || !formData.email || !formData.name}
                  className={`flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors ${
                    (!formData.email || !formData.name) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <DevicePhoneMobileIcon className="h-6 w-6 mr-2 text-pink-600" />
                  <span className="font-medium text-pink-600">bKash</span>
                </button>

                <button
                  onClick={() => handlePayment('nagad')}
                  disabled={loading || !formData.email || !formData.name}
                  className={`flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors ${
                    (!formData.email || !formData.name) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <PhoneIcon className="h-6 w-6 mr-2 text-orange-600" />
                  <span className="font-medium text-orange-600">Nagad</span>
                </button>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center items-center">
                <ArrowPathIcon className="h-6 w-6 animate-spin text-primary-600" />
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  Processing payment...
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;