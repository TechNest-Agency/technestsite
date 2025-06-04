const axios = require('axios');

class BkashService {
    constructor() {
        this.baseURL = process.env.BKASH_BASE_URL;
        this.appKey = process.env.BKASH_APP_KEY;
        this.appSecret = process.env.BKASH_APP_SECRET;
        this.username = process.env.BKASH_USERNAME;
        this.password = process.env.BKASH_PASSWORD;
    }

    async getToken() {
        try {
            const response = await axios.post(`${this.baseURL}/tokenized/checkout/token/grant`, {
                app_key: this.appKey,
                app_secret: this.appSecret
            }, {
                headers: {
                    username: this.username,
                    password: this.password
                }
            });
            return response.data.id_token;
        } catch (error) {
            throw new Error('Failed to get bKash token');
        }
    }

    async createPayment(amount, orderId) {
        const token = await this.getToken();
        try {
            const response = await axios.post(`${this.baseURL}/tokenized/checkout/create`, {
                mode: '0011',
                payerReference: orderId,
                callbackURL: `${process.env.APP_URL}/api/payment/bkash/callback`,
                amount: amount,
                currency: 'BDT',
                intent: 'sale',
                merchantInvoiceNumber: orderId
            }, {
                headers: {
                    Authorization: token
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create bKash payment');
        }
    }

    async executePayment(paymentId) {
        const token = await this.getToken();
        try {
            const response = await axios.post(`${this.baseURL}/tokenized/checkout/execute`, {
                paymentId: paymentId
            }, {
                headers: {
                    Authorization: token
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to execute bKash payment');
        }
    }
}

module.exports = new BkashService();
