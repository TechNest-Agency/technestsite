const axios = require('axios');
const crypto = require('crypto');

class NagadService {
    constructor() {
        this.baseURL = process.env.NAGAD_BASE_URL;
        this.merchantID = process.env.NAGAD_MERCHANT_ID;
        this.merchantNumber = process.env.NAGAD_MERCHANT_NUMBER;
        this.publicKey = process.env.NAGAD_PUBLIC_KEY;
        this.privateKey = process.env.NAGAD_PRIVATE_KEY;
    }

    generateSignature(sensitiveData) {
        return crypto
            .createSign('sha256')
            .update(JSON.stringify(sensitiveData))
            .sign(this.privateKey, 'base64');
    }

    async initializePayment(amount, orderId) {
        try {
            const datetime = new Date().toISOString();
            const sensitiveData = {
                merchantId: this.merchantID,
                datetime: datetime,
                orderId: orderId,
                challenge: crypto.randomBytes(32).toString('hex')
            };

            const signature = this.generateSignature(sensitiveData);

            const response = await axios.post(`${this.baseURL}/api/dfs/check-out/initialize`, {
                dateTime: datetime,
                sensitiveData: sensitiveData,
                signature: signature,
                merchantId: this.merchantID,
                orderId: orderId,
                amount: amount,
                currencyCode: 'BDT',
                merchantCallbackURL: `${process.env.APP_URL}/api/payment/nagad/callback`
            });

            return response.data;
        } catch (error) {
            throw new Error('Failed to initialize Nagad payment');
        }
    }

    async verifyPayment(paymentRefId) {
        try {
            const response = await axios.get(
                `${this.baseURL}/api/dfs/verify/payment/${paymentRefId}`,
                {
                    headers: {
                        'X-KM-IP-V4': process.env.SERVER_IP,
                        'X-KM-Client-Type': 'PC_WEB',
                        'X-KM-Api-Version': 'v-0.2.0'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error('Failed to verify Nagad payment');
        }
    }
}

module.exports = new NagadService();
