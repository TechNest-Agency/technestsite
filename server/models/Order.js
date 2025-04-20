const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        email: {
            type: String,
            required: true
        },
        message: String
    },
    items: [{
        id: String,
        title: String,
        price: String,
        type: String
    }],
    payment: {
        method: {
            type: String,
            enum: ['sslcommerz', 'stripe', 'payoneer', 'bkash', 'nagad', 'rocket'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ['BDT', 'USD'],
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending'
        },
        transactionId: String,
        validationId: String,
        cardType: String,
        cardBrand: String,
        cardIssuer: String,
        bankTransactionId: String
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;