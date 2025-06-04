import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircleIcon, 
    ClockIcon, 
    XCircleIcon, 
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    // Sample data - Replace this with actual API call
    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setOrders([
                {
                    id: "ORD001",
                    date: "2025-05-10",
                    status: "completed",
                    total: 2499.99,
                    items: [
                        {
                            name: "Web Development Package",
                            price: 1499.99,
                            description: "Custom website development with responsive design"
                        },
                        {
                            name: "SEO Package",
                            price: 1000.00,
                            description: "3-month SEO optimization package"
                        }
                    ],
                    paymentStatus: "paid"
                },
                {
                    id: "ORD002",
                    date: "2025-05-09",
                    status: "in-progress",
                    total: 3999.99,
                    items: [
                        {
                            name: "Mobile App Development",
                            price: 3999.99,
                            description: "iOS and Android app development"
                        }
                    ],
                    paymentStatus: "paid"
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
            case 'in-progress':
                return <ClockIcon className="h-6 w-6 text-yellow-500" />;
            case 'cancelled':
                return <XCircleIcon className="h-6 w-6 text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'in-progress':
                return 'In Progress';
            case 'cancelled':
                return 'Cancelled';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <div className="relative h-48 md:h-64 overflow-hidden">
                <div className="absolute inset-0">                    <img 
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="Orders Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from 
                    black/80 to-black/40"></div>
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="text-white">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
                        <p className="text-white/80">View and track your order history</p>
                    </div>
                </div>
            </div>

            {/* Orders Content */}
            <div className="container mx-auto px-4 py-12 -mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg p-6"
                >
                    {orders.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="mx-auto w-16 h-16 mb-4">
                                <svg className="w-full h-full text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-gray-600">No orders found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <motion.div
                                    key={order.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Order Header */}
                                    <div className="p-6 cursor-pointer hover:bg-gray-50"
                                         onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {getStatusIcon(order.status)}
                                                <div>
                                                    <h3 className="font-semibold">Order #{order.id}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(order.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {getStatusText(order.status)}
                                                    </p>
                                                </div>
                                                {expandedOrder === order.id ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    {expandedOrder === order.id && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto" }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-gray-100"
                                        >
                                            <div className="p-6 space-y-4">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium">{item.name}</h4>
                                                            <p className="text-sm text-gray-600">{item.description}</p>
                                                        </div>
                                                        <p className="font-medium">${item.price.toFixed(2)}</p>
                                                    </div>
                                                ))}
                                                <div className="pt-4 border-t border-gray-100">
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-semibold">Total</p>
                                                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        Payment Status: {order.paymentStatus}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Orders;