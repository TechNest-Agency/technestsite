import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  GlobeAltIcon,
  MapPinIcon,
  CreditCardIcon,
  QrCodeIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

const paymentMethods = {
  local: [
    {
      id: 'bkash',
      name: 'bKash',
      icon: DevicePhoneMobileIcon,
      description: 'Pay with bKash mobile banking',
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: DevicePhoneMobileIcon,
      description: 'Pay with Nagad mobile banking',
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: DevicePhoneMobileIcon,
      description: 'Pay with Rocket mobile banking',
    },
    {
      id: 'card-local',
      name: 'Card Payment',
      icon: CreditCardIcon,
      description: 'Pay with Credit/Debit Card (SSLCommerz)',
    },
  ],
  international: [
    {
      id: 'stripe',
      name: 'Card Payment',
      icon: CreditCardIcon,
      description: 'Pay with Credit/Debit Card (Stripe)',
    },
    {
      id: 'payoneer',
      name: 'Payoneer',
      icon: GlobeAltIcon,
      description: 'Request Payoneer Invoice',
    },
  ],
};

const CheckoutSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  location: Yup.string().required('Please select your location'),
  paymentMethod: Yup.string().required('Please select a payment method'),
  message: Yup.string(),
});

const Checkout = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode } = useTheme();
  const { cartItems, getCartTotal } = useCart();
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = async (values) => {
    try {
      if (values.location === 'local') {
        if (values.paymentMethod === 'card-local') {
          // Integrate SSLCommerz here
          window.location.href = '/api/payment/sslcommerz/init';
        } else {
          setShowQR(true);
        }
      } else {
        if (values.paymentMethod === 'stripe') {
          // Integrate Stripe here
          window.location.href = '/api/payment/stripe/init';
        } else if (values.paymentMethod === 'payoneer') {
          // Send email to admin for Payoneer invoice
          await fetch('/api/payment/payoneer/request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              message: values.message,
              amount: getCartTotal(),
              items: cartItems,
            }),
          });
          navigate('/thank-you');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Checkout
          </h1>

          {/* Order Summary */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-600 dark:text-gray-300"
                >
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              email: '',
              location: '',
              paymentMethod: '',
              message: '',
            }}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Location
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['local', 'international'].map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => {
                          setFieldValue('location', location);
                          setFieldValue('paymentMethod', '');
                        }}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          values.location === location
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          {location === 'local' ? (
                            <MapPinIcon className="h-5 w-5 mr-2 text-primary-600" />
                          ) : (
                            <GlobeAltIcon className="h-5 w-5 mr-2 text-primary-600" />
                          )}
                          <span className="font-medium capitalize">
                            {location === 'local' ? 'Bangladesh' : 'International'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.location && touched.location && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </div>
                  )}
                </div>

                {values.location && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods[values.location].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFieldValue('paymentMethod', method.id)}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            values.paymentMethod === method.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <method.icon className="h-5 w-5 mr-2 text-primary-600" />
                            <span className="font-medium">{method.name}</span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {method.description}
                          </p>
                        </button>
                      ))}
                    </div>
                    {errors.paymentMethod && touched.paymentMethod && (
                      <div className="text-red-500 text-sm">
                        {errors.paymentMethod}
                      </div>
                    )}
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message (Optional)
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                >
                  Proceed to Payment
                </button>
              </Form>
            )}
          </Formik>

          {/* QR Code Modal */}
          {showQR && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
                <div className="text-center">
                  <QrCodeIcon className="h-24 w-24 mx-auto mb-4 text-primary-600" />
                  <h3 className="text-xl font-bold mb-2">Scan to Pay</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Scan this QR code with your mobile banking app to complete the payment
                  </p>
                  <button
                    onClick={() => setShowQR(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;