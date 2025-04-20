import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const PaymentStatus = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const isSuccess = location.pathname.includes('success');
  const { clearCart } = useCart();

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
        >
          {isSuccess ? (
            <CheckCircleIcon className="h-20 w-20 mx-auto text-green-500 mb-6" />
          ) : (
            <XCircleIcon className="h-20 w-20 mx-auto text-red-500 mb-6" />
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {isSuccess 
              ? "We've received your payment and will process your order shortly. You'll receive a confirmation email with further details."
              : "We couldn't process your payment. Please try again or contact our support team for assistance."}
          </p>
          
          <div className="space-y-4">
            {isSuccess ? (
              <>
                <Link
                  to="/"
                  className="inline-block w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Return to Home
                </Link>
                <Link
                  to="/contact"
                  className="inline-block w-full sm:w-auto px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors duration-200 sm:ml-4"
                >
                  Contact Support
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/checkout"
                  className="inline-block w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Try Again
                </Link>
                <Link
                  to="/contact"
                  className="inline-block w-full sm:w-auto px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors duration-200 sm:ml-4"
                >
                  Contact Support
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentStatus;