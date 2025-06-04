const nodemailer = require('nodemailer');
const Settings = require('../models/Settings');

class EmailService {
    constructor() {
        this.transporter = null;
        this.settings = null;
    }

    async init() {
        try {
            this.settings = await Settings.findOne();
            if (!this.settings?.email?.smtp) {
                throw new Error('SMTP settings not configured');
            }

            this.transporter = nodemailer.createTransport({
                host: this.settings.email.smtp.host,
                port: this.settings.email.smtp.port,
                secure: this.settings.email.smtp.secure,
                auth: {
                    user: this.settings.email.smtp.username,
                    pass: this.settings.email.smtp.password
                }
            });
        } catch (error) {
            console.error('Error initializing email service:', error);
            throw error;
        }
    }

    async sendWelcomeEmail(user) {
        try {
            if (!this.transporter) await this.init();

            const template = this.settings.email.templates.welcome;
            await this.transporter.sendMail({
                from: `${this.settings.email.from.name} <${this.settings.email.from.email}>`,
                to: user.email,
                subject: template.subject,
                html: this.replaceTemplateVariables(template.body, {
                    username: user.username,
                    email: user.email
                })
            });
        } catch (error) {
            console.error('Error sending welcome email:', error);
            throw error;
        }
    }

    async sendPasswordResetEmail(user, resetToken) {
        try {
            if (!this.transporter) await this.init();

            const template = this.settings.email.templates.passwordReset;
            const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

            await this.transporter.sendMail({
                from: `${this.settings.email.from.name} <${this.settings.email.from.email}>`,
                to: user.email,
                subject: template.subject,
                html: this.replaceTemplateVariables(template.body, {
                    username: user.username,
                    resetLink: resetLink
                })
            });
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error;
        }
    }

    async sendContactFormConfirmation(message) {
        try {
            if (!this.transporter) await this.init();

            const template = this.settings.email.templates.contactForm;
            await this.transporter.sendMail({
                from: `${this.settings.email.from.name} <${this.settings.email.from.email}>`,
                to: message.email,
                subject: template.subject,
                html: this.replaceTemplateVariables(template.body, {
                    name: message.name,
                    message: message.message
                })
            });

            // Send notification to admin
            await this.transporter.sendMail({
                from: `${this.settings.email.from.name} <${this.settings.email.from.email}>`,
                to: this.settings.contact.email,
                subject: `New Contact Form Submission from ${message.name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${message.name}</p>
                    <p><strong>Email:</strong> ${message.email}</p>
                    <p><strong>Subject:</strong> ${message.subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.message}</p>
                `
            });
        } catch (error) {
            console.error('Error sending contact form emails:', error);
            throw error;
        }
    }

    async sendOrderConfirmation(order, user) {
        try {
            if (!this.transporter) await this.init();

            await this.transporter.sendMail({
                from: `${this.settings.email.from.name} <${this.settings.email.from.email}>`,
                to: user.email,
                subject: 'Order Confirmation - TechNest Solutions',
                html: `
                    <h2>Thank you for your order!</h2>
                    <p>Your order details:</p>
                    <ul>
                        ${order.items.map(item => `
                            <li>
                                ${item.title} - ${item.price}
                            </li>
                        `).join('')}
                    </ul>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Order ID:</strong> ${order.orderId}</p>
                    <p>We'll process your order shortly.</p>
                `
            });
        } catch (error) {
            console.error('Error sending order confirmation:', error);
            throw error;
        }
    }

    replaceTemplateVariables(template, variables) {
        let result = template;
        for (const [key, value] of Object.entries(variables)) {
            result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
        return result;
    }
}

module.exports = new EmailService();