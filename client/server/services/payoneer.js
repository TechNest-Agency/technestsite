const axios = require('axios');

class PayoneerService {
    constructor() {
        this.baseURL = process.env.PAYONEER_API_URL;
        this.programId = process.env.PAYONEER_PROGRAM_ID;
        this.apiKey = process.env.PAYONEER_API_KEY;
    }

    async createPayment(amount, orderId, payeeId) {
        try {
            const response = await axios.post(
                `${this.baseURL}/programs/${this.programId}/payouts`,
                {
                    payee_id: payeeId,
                    amount: amount,
                    client_reference_id: orderId,
                    currency: 'USD',
                    description: `Payment for order ${orderId}`,
                    notification_url: `${process.env.APP_URL}/api/payment/payoneer/webhook`
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to create Payoneer payment');
        }
    }

    async getPaymentStatus(payoutId) {
        try {
            const response = await axios.get(
                `${this.baseURL}/programs/${this.programId}/payouts/${payoutId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to get Payoneer payment status');
        }
    }

    async createPayeeAccount(payeeData) {
        try {
            const response = await axios.post(
                `${this.baseURL}/programs/${this.programId}/payees`,
                {
                    name: payeeData.name,
                    email: payeeData.email,
                    address: payeeData.address,
                    country: payeeData.country,
                    payment_method: 'PAYONEER'
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to create Payoneer payee account');
        }
    }
}

module.exports = new PayoneerService();
