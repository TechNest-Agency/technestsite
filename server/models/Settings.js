const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    site: {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        logo: {
            light: String,
            dark: String
        },
        favicon: String,
        language: {
            type: String,
            default: 'en'
        },
        timezone: {
            type: String,
            default: 'UTC'
        }
    },
    theme: {
        primaryColor: {
            type: String,
            default: '#2563eb'
        },
        secondaryColor: {
            type: String,
            default: '#4f46e5'
        },
        accentColor: {
            type: String,
            default: '#06b6d4'
        },
        darkMode: {
            type: Boolean,
            default: true
        },
        fonts: {
            heading: {
                type: String,
                default: 'Inter'
            },
            body: {
                type: String,
                default: 'Inter'
            }
        }
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        phone: String,
        address: String,
        googleMaps: {
            embed: String,
            link: String
        },
        socialMedia: {
            facebook: String,
            twitter: String,
            linkedin: String,
            instagram: String,
            youtube: String,
            github: String
        }
    },
    email: {
        smtp: {
            host: String,
            port: Number,
            secure: Boolean,
            username: String,
            password: String
        },
        from: {
            name: String,
            email: String
        },
        templates: {
            welcome: {
                subject: String,
                body: String
            },
            passwordReset: {
                subject: String,
                body: String
            },
            contactForm: {
                subject: String,
                body: String
            }
        }
    },
    seo: {
        googleAnalyticsId: String,
        googleTagManagerId: String,
        googleSiteVerification: String,
        bingVerification: String,
        defaultMetaTitle: String,
        defaultMetaDescription: String,
        defaultOgImage: String,
        robotsTxt: String,
        sitemapXml: String
    },
    features: {
        blog: {
            enabled: {
                type: Boolean,
                default: true
            },
            postsPerPage: {
                type: Number,
                default: 10
            },
            allowComments: {
                type: Boolean,
                default: true
            }
        },
        portfolio: {
            enabled: {
                type: Boolean,
                default: true
            },
            projectsPerPage: {
                type: Number,
                default: 12
            }
        },
        services: {
            enabled: {
                type: Boolean,
                default: true
            },
            layout: {
                type: String,
                enum: ['grid', 'list'],
                default: 'grid'
            }
        },
        testimonials: {
            enabled: {
                type: Boolean,
                default: true
            },
            autoplay: {
                type: Boolean,
                default: true
            }
        }
    },
    content: {
        home: {
            hero: {
                title: String,
                subtitle: String,
                image: String,
                cta: {
                    primary: {
                        text: String,
                        link: String
                    },
                    secondary: {
                        text: String,
                        link: String
                    }
                }
            },
            about: {
                title: String,
                content: String,
                image: String
            },
            features: [{
                title: String,
                description: String,
                icon: String
            }],
            stats: [{
                label: String,
                value: String,
                icon: String
            }]
        },
        about: {
            hero: {
                title: String,
                content: String,
                image: String
            },
            mission: {
                title: String,
                content: String,
                image: String
            },
            vision: {
                title: String,
                content: String,
                image: String
            },
            team: [{
                name: String,
                position: String,
                bio: String,
                image: String,
                social: {
                    linkedin: String,
                    twitter: String,
                    github: String
                }
            }]
        }
    },
    maintenance: {
        enabled: {
            type: Boolean,
            default: false
        },
        message: String,
        allowedIPs: [String]
    },
    security: {
        recaptcha: {
            enabled: {
                type: Boolean,
                default: false
            },
            siteKey: String,
            secretKey: String
        },
        cors: {
            allowedOrigins: [String],
            allowedMethods: [String]
        }
    }
}, {
    timestamps: true
});

// Ensure only one settings document exists
settingsSchema.pre('save', async function(next) {
    const count = await this.constructor.countDocuments();
    if (count > 0 && !this.isModified()) {
        const error = new Error('Only one settings document can exist');
        next(error);
    }
    next();
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings; 