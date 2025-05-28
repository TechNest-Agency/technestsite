import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { useCart } from '../context/CartContext';
import {
  CodeBracketIcon,
  CloudArrowUpIcon,
  DevicePhoneMobileIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  SparklesIcon,
  CommandLineIcon,
  WrenchScrewdriverIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  ArrowRightIcon,
  PaintBrushIcon,
  MegaphoneIcon,  SwatchIcon,
  MapIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const Services = () => {
  const { addToCart } = useCart();
  const [selectedBillingCycle, setSelectedBillingCycle] = useState('monthly');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');

  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technologies.',
      icon: CodeBracketIcon,
      features: ['React/Next.js', 'Node.js/Express', 'REST APIs', 'Database Design'],
      category: 'Development'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure solutions.',
      icon: CloudArrowUpIcon,
      features: ['AWS/Azure', 'Cloud Migration', 'DevOps', 'Serverless'],
      category: 'Infrastructure'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications.',
      icon: DevicePhoneMobileIcon,
      features: ['React Native', 'iOS/Android', 'App Store Publishing', 'Mobile UI/UX'],
      category: 'Development'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by advanced AI.',
      icon: CubeTransparentIcon,
      features: ['Data Analysis', 'Predictive Models', 'Neural Networks', 'Computer Vision'],
      category: 'Technology'
    },
    {
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions for digital assets.',
      icon: ShieldCheckIcon,
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Data Protection'],
      category: 'Security'
    },
    {
      title: 'Digital Transformation',
      description: 'Strategic digital solutions for business growth.',
      icon: RocketLaunchIcon,
      features: ['Process Automation', 'Digital Strategy', 'Innovation', 'Analytics'],
      category: 'Consulting'
    }
  ];

  const whyChooseUs = [
    {
      icon: RocketLaunchIcon,
      title: 'Innovation',
      description: 'Cutting-edge solutions using the latest technologies'
    },
    {
      icon: ChartBarIcon,
      title: 'Scalability',
      description: 'Solutions that grow with your business needs'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Security',
      description: 'Enterprise-grade security in all our solutions'
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Support',
      description: '24/7 dedicated customer support'
    }
  ];

  const processSteps = [
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Consultation',
      description: 'Understanding your needs and objectives'
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Planning',
      description: 'Detailed project planning and architecture'
    },
    {
      icon: CommandLineIcon,
      title: 'Development',
      description: 'Development with regular updates'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Launch',
      description: 'Deployment and continuous support'
    }
  ];

  const servicePackages = {
    web: [
      {
        name: 'Starter',
        description: 'Perfect for small businesses',
        monthlyPrice: 999,
        yearlyPrice: 9990,
        features: [
          'Single Page Website',
          'Mobile Responsive',
          'Basic SEO',
          'Contact Form',
          '3 Months Support',
          'Basic Analytics'
        ],
        highlighted: false
      },
      {
        name: 'Professional',
        description: 'Ideal for growing companies',
        monthlyPrice: 1999,
        yearlyPrice: 19990,
        features: [
          'Multi-page Website',
          'Advanced SEO',
          'Content Management System',
          'E-commerce Integration',
          'Performance Optimization',
          'Email Marketing Setup',
          '6 Months Support',
          'Advanced Analytics'
        ],
        highlighted: true
      },
      {
        name: 'Enterprise',
        description: 'For large organizations',
        monthlyPrice: 3999,
        yearlyPrice: 39990,
        features: [
          'Custom Web Application',
          'Third-party Integrations',
          'Premium SEO Package',
          'Custom Features Development',
          'Load Balancing Setup',
          'Security Hardening',
          '12 Months Support',
          'Premium Analytics',
          'Dedicated Account Manager'
        ],
        highlighted: false
      }
    ],
    mobile: [
      {
        name: 'Basic',
        description: 'Start your mobile presence',
        monthlyPrice: 1499,
        yearlyPrice: 14990,
        features: [
          'Single Platform (iOS/Android)',
          'Basic Features',
          'Standard UI Components',
          'App Store Submission',
          '3 Months Support',
          'Crash Reporting'
        ],
        highlighted: false
      },
      {
        name: 'Advanced',
        description: 'Full-featured mobile app',
        monthlyPrice: 2999,
        yearlyPrice: 29990,
        features: [
          'Cross-platform Development',
          'Custom UI/UX Design',
          'Push Notifications',
          'Social Integration',
          'Analytics Integration',
          'In-app Purchases',
          '6 Months Support',
          'Priority Bug Fixes'
        ],
        highlighted: true
      },
      {
        name: 'Premium',
        description: 'Enterprise mobile solution',
        monthlyPrice: 5999,
        yearlyPrice: 59990,
        features: [
          'Native Development',
          'Custom Backend',
          'Offline Support',
          'Advanced Security',
          'Third-party Integrations',
          'Performance Optimization',
          '12 Months Support',
          'SLA Agreement',
          'Dedicated Team'
        ],
        highlighted: false
      }
    ]
  };

  const handleAddToCart = (pkg) => {
    let price;
    
    if (pkg.priceRange) {
      // For fixed price packages, extract the number from priceRange
      price = pkg.priceRange.replace(/[^\d.]/g, '');
    } else if (pkg.priceVariants) {
      // For packages with variants, use the first variant's price
      price = pkg.priceVariants[0].price.replace(/[^\d.]/g, '');
    } else {
      // For subscription based packages
      price = selectedBillingCycle === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice;
    }

    // Clean up price if it ends with "/month"
    const cleanPrice = price.toString().replace('/month', '');
    addToCart({
      id: pkg.title.toLowerCase().replace(/\s+/g, '-'),
      title: pkg.title,
      price: parseFloat(cleanPrice).toString(),
      category: pkg.category,
      description: pkg.subtitle || pkg.description,
      features: pkg.features,
      quantity: 1
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  const packages = [
    {
      title: "Enterprise Security Pack",
      subtitle: "Advanced Protection",
      icon: ShieldCheckIcon,
      category: "dev",
      featured: true,
      bestFor: "Large businesses, financial institutions, data-sensitive operations",
      features: [
        "Full Security Audit",
        "Penetration Testing",
        "Compliance Assessment",
        "Security Monitoring Setup",
        "Incident Response Plan",
        "Staff Security Training"
      ],
      delivery: "4-6 weeks",
      priceRange: "$3,000 – $5,000"
    },
    {
      title: "Custom Web Development",
      subtitle: "Tailored Solutions",
      icon: CodeBracketIcon,
      category: "dev",
      bestFor: "Growing businesses needing custom solutions",
      features: [
        "Custom Website Development",
        "Mobile-First Design",
        "API Integration",
        "Performance Optimization",
        "SEO Best Practices",
        "3 Months Support"
      ],
      delivery: "8-12 weeks",
      priceRange: "$5,000 – $15,000"
    },
    {
      title: "UI/UX Design Package",
      subtitle: "Premium Design Experience",
      icon: SwatchIcon,
      category: "design",
      bestFor: "Businesses focusing on user experience",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "UI Design System",
        "Interactive Prototypes",
        "Usability Testing",
        "Design Documentation"
      ],
      delivery: "4-6 weeks",
      priceRange: "$4,000 – $8,000"
    },
    {
      title: "Digital Marketing Bundle",
      subtitle: "Growth & Visibility",
      icon: MegaphoneIcon,
      category: "marketing",
      bestFor: "Businesses seeking online growth",
      features: [
        "SEO Strategy & Implementation",
        "Social Media Management",
        "Content Marketing Plan",
        "Email Marketing Setup",
        "Analytics & Reporting",
        "Ad Campaign Management"
      ],
      delivery: "3 months",
      priceVariants: [
        { name: "Basic", price: "$1,500/month" },
        { name: "Pro", price: "$2,500/month" },
        { name: "Enterprise", price: "$4,000/month" }
      ]
    },
    {
      title: "E-commerce Solution",
      subtitle: "Online Store Setup",
      icon: ShoppingCartIcon,
      category: "dev",
      bestFor: "Retail businesses moving online",
      features: [
        "E-commerce Platform Setup",
        "Product Catalog Integration",
        "Payment Gateway Setup",
        "Inventory Management",
        "Order Processing System",
        "Mobile Shopping App"
      ],
      delivery: "6-8 weeks",
      priceRange: "$4,000 – $10,000"
    },
    {
      title: "Brand Identity Package",
      subtitle: "Visual Brand Development",
      icon: PaintBrushIcon,
      category: "design",
      bestFor: "New businesses or rebranding projects",
      features: [
        "Logo Design",
        "Brand Style Guide",
        "Business Card Design",
        "Social Media Templates",
        "Marketing Materials",
        "Brand Strategy Document"
      ],
      delivery: "3-4 weeks",
      priceRange: "$2,500 – $5,000"
    },
    {
      title: "Visibility Kickstart Pack",
      subtitle: "Be Seen Where It Counts",
      icon: MegaphoneIcon,
      category: "marketing",
      bestFor: "Founders who just launched or rebranded",
      features: [
        "Profile Optimization (LinkedIn, Twitter, Flippa)",
        "10 Social Media Posts (Content + Design)",
        "Hashtag Strategy + Caption Guide",
        "1 Social Media Audit Report"
      ],
      delivery: "7 days",
      priceRange: "$150"
    },
    {
      title: "Cold Outreach Pack",
      subtitle: "DMs That Don't Suck",
      icon: EnvelopeIcon,
      category: "marketing",
      bestFor: "Solo founders or agencies trying to land first clients",
      features: [
        "3 Cold Email Templates (Custom)",
        "2 DM Scripts (LinkedIn/Discord)",
        "Lead Sheet Template (Notion or Sheet)",
        "Mini Training: How to follow-up without being pushy"
      ],
      delivery: "5 days",
      priceRange: "$100"
    },
    {
      title: "Growth Engine Pack",
      subtitle: "Turn Posts Into Leads",
      icon: ChartBarIcon,
      category: "marketing",
      featured: true,
      bestFor: "SaaS & Service Founders wanting steady organic reach",
      features: [
        "20 Custom Branded Social Media Posts",
        "CTA Design Integration",
        "Caption Copy + Scheduling Plan",
        "Competitor Content Analysis"
      ],
      delivery: "10-14 days",
      priceRange: "$300/month"
    },
    {
      title: "Flippa Marketing Boost",
      subtitle: "Make It Sell",
      icon: RocketLaunchIcon,
      category: "marketing",
      bestFor: "Creators listing products on Flippa",
      features: [
        "Listing Copywriting (Title + Description + CTA)",
        "Cover Image Design",
        "Product Demo Script",
        "3 Promo Posts (For social or email)",
        "Add-on: Video Demo Script/Recording [+$100]"
      ],
      delivery: "3-5 days",
      priceVariants: [
        { name: "Basic", price: "$180" },
        { name: "With Video Add-on", price: "$280" }
      ]
    },
    {
      title: "Marketing Strategy Intensive",
      subtitle: "One Week to Clarity",
      icon: SparklesIcon,
      category: "marketing",
      bestFor: "Small teams with unclear positioning, niche, or offer",
      features: [
        "60-min Strategy Call (Zoom)",
        "Ideal Client Persona Mapping",
        "Offer Refinement Doc",
        "1-Month Growth Plan (Organic + Outreach)"
      ],
      delivery: "7 days",
      priceRange: "$250"
    },
    {
      title: "Agency Bundle",
      subtitle: "Built to Get Clients",
      icon: BriefcaseIcon,
      category: "marketing",
      bestFor: "Freelancers or agencies trying to scale online",
      features: [
        "Positioning & Offer Clarity Workshop",
        "30 Social Posts (15 Carousel, 15 Promo)",
        "Cold Email + DM Templates",
        "Client Onboarding Docs (Notion Templates)"
      ],
      delivery: "3 weeks",
      priceRange: "$500"
    },
    {
      title: "UI/UX Starter Pack",
      subtitle: "Your MVP's First Look",
      icon: SwatchIcon,
      category: "design",
      bestFor: "Founders building their first product or MVP",
      features: [
        "1 Landing Page (Desktop + Mobile)",
        "1 Dashboard or App Screen Set (Up to 5 screens)",
        "Wireframe → UI Flow",
        "Light UX Research (User Personas, Goals)",
        "2 Rounds of Revisions"
      ],
      delivery: "5-7 days",
      priceRange: "$200"
    },
    {
      title: "UX Discovery Pack",
      subtitle: "Clarity Before Code",      icon: MapIcon,
      category: "design",
      bestFor: "Anyone who has a product idea but no structure yet",
      features: [
        "UX Research (User Personas, Journey Map)",
        "Low-Fidelity Wireframes (Up to 7-10 screens)",
        "Information Architecture",
        "User Flow Map (Notion or FigJam)",
        "Product Strategy Call (30 min)"
      ],
      delivery: "7-10 days",
      priceRange: "$300"
    },
    {
      title: "UI Overhaul Pack",
      subtitle: "Redesign That Converts",
      icon: PaintBrushIcon,
      category: "design",
      bestFor: "SaaS tools, marketplaces, or old platforms needing visual rework",
      features: [
        "Audit of Existing Design",
        "Fresh Modern UI Design (Up to 10 screens)",
        "Typography, Colors, Icons Revamp",
        "Interaction/Animation Suggestion Guide",
        "Developer Handoff Ready (Figma → Dev)"
      ],
      delivery: "10-14 days",
      priceRange: "$450"
    },
    {
      title: "UX Audit + Fixes",
      subtitle: "Fix Why Users Drop Off",
      icon: MagnifyingGlassIcon,
      category: "design",
      bestFor: "Live products with low conversion or confused users",
      features: [
        "Heuristic UX Audit",
        "Behavior Map (Where Users Get Stuck)",
        "Action Plan with Quick Wins",
        "Redesign of 3 Problem Screens",
        "Before/After Comparison"
      ],
      delivery: "5-7 days",
      priceRange: "$250"
    },
    {
      title: "Brand + UI Kit Pack",
      subtitle: "Look Professional from Day 1",
      icon: SparklesIcon,
      category: "design",
      bestFor: "Solo founders & micro SaaS teams",
      features: [
        "Mini Style Guide (Fonts, Colors, Buttons)",
        "Reusable Figma UI Kit",
        "5 Core UI Components (Navbar, Card, Modal, etc.)",
        "Custom Logo (Minimal Style)",
        "Branding Assets Pack (Favicon, Social, CTA banners)"
      ],
      delivery: "7-10 days",
      priceRange: "$300"
    },
    {
      title: "Complete SaaS UI/UX Pack",
      subtitle: "Everything but the Code",
      icon: RocketLaunchIcon,
      category: "design",
      featured: true,
      bestFor: "SaaS founders ready to hand off to devs",
      features: [
        "UX Discovery + Flow Mapping",
        "Wireframes (10-15 Screens)",
        "High-Fidelity UI in Figma",
        "Mobile + Desktop Variants",
        "Dev Handoff (Figma components + Export Guidelines)",
        "BONUS: Design Feedback Round with Devs"
      ],
      delivery: "2-3 weeks",
      priceRange: "$700"
    }
  ];

  return (
    <PageLayout
      title="Our Services"
      subtitle="Comprehensive Digital Solutions for Modern Businesses"
    >
      {/* Services Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}            className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
          >
            <service.icon className="h-12 w-12 text-primary-400 mb-6" />
            <span className="inline-block px-3 py-1 bg-primary-900/60 text-primary-300 rounded-full text-sm mb-4 border border-primary-700/50">
              {service.category}
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-gray-300 mb-6">{service.description}</p>
            <ul className="space-y-3">
              {service.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center text-gray-300">
                  <SparklesIcon className="h-5 w-5 text-primary-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* Service Packages */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-white text-center mb-6"
        >
          Service Packages
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
        >
          Choose the perfect package for your business needs
        </motion.p>

        {/* Billing Cycle Toggle */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center space-x-4 mb-12"
        >
          <button
            onClick={() => setSelectedBillingCycle('monthly')}            className={`px-6 py-2 rounded-lg transition-all duration-300 border ${
              selectedBillingCycle === 'monthly'
                ? 'bg-gray-800 text-white border-primary-600'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedBillingCycle('yearly')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 border ${
              selectedBillingCycle === 'yearly'
                ? 'bg-gray-800 text-white border-primary-600'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </motion.div>

        {/* Package Type Toggle */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center space-x-4 mb-12"
        >
          <button
            onClick={() => setSelectedPackage('web')}            className={`px-6 py-2 rounded-lg transition-all duration-300 border ${
              selectedPackage === 'web'
                ? 'bg-gray-800 text-white border-primary-600'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50'
            }`}
          >
            Web Development
          </button>
          <button
            onClick={() => setSelectedPackage('mobile')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 border ${
              selectedPackage === 'mobile'
                ? 'bg-gray-800 text-white border-primary-600'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50'
            }`}
          >
            Mobile Development
          </button>
        </motion.div>

        {/* Pricing Tables */}
        <AnimatePresence mode="wait">
          {selectedPackage && (
            <motion.div
              key={selectedPackage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {servicePackages[selectedPackage].map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}                  className={`relative p-8 rounded-2xl overflow-hidden ${
                    pkg.highlighted
                      ? 'bg-gray-800/90 backdrop-blur-xl border-2 border-primary-600 shadow-lg shadow-primary-500/20'
                      : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-300 mb-6">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      ${selectedBillingCycle === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice}
                    </span>
                    <span className="text-gray-300 ml-2">
                      /{selectedBillingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-300">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(pkg)}                    className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ${
                      pkg.highlighted
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20 border border-primary-500/50'
                        : 'bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600/50'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRightIcon className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          Why Choose TechNest
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}              className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all duration-300 text-center border border-gray-700/50"
            >
              <item.icon className="h-12 w-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          Our Process
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >              <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20 border border-primary-500/50">
                  {index + 1}
                </div>
                <step.icon className="h-12 w-12 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-primary-600 to-primary-500 transform -translate-y-1/2 rounded-full shadow-glow" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Package Filter */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTab('all')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedTab === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            All Packages
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTab('dev')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedTab === 'dev'
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Development
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTab('design')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedTab === 'design'
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Design
          </motion.button>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTab('marketing')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              selectedTab === 'marketing'
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Marketing
          </motion.button>
        </div>
      </motion.div>

      {/* Pricing Grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group rounded-2xl overflow-hidden ${
                pkg.featured 
                  ? 'md:col-span-2 lg:col-span-1 scale-105 z-10' 
                  : ''
              }`}
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0.5 bg-gray-900 rounded-2xl z-0" />
              <div className={`relative h-full p-8 glass-card group-hover:shadow-glow transition-all duration-300 ${
                pkg.featured
                  ? 'gradient-border'
                  : ''
              }`}>
                {pkg.featured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm px-4 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                <pkg.icon className="w-12 h-12 text-primary-400 mb-6" />
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {pkg.title}
                </h3>
                <p className="text-primary-400 mb-4">{pkg.subtitle}</p>
                
                {pkg.priceRange ? (
                  <div className="text-2xl font-bold text-white mb-4">
                    {pkg.priceRange}
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    {pkg.priceVariants.map((variant, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-400">{variant.name}</span>
                        <span className="text-white font-semibold">{variant.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-400 mb-6">
                  Best For: {pkg.bestFor}
                </p>

                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-primary-400">✓</div>
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {pkg.delivery && (
                  <p className="text-sm text-gray-400 mb-6">
                    Delivery: {pkg.delivery}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(pkg)}
                  className={`w-full py-4 px-6 rounded-lg font-medium transition-all ${
                    pkg.featured
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Other sections */}
      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="text-center"
      >
        <motion.div
          variants={itemVariants}          className="p-12 bg-gray-800/70 backdrop-blur-md rounded-2xl relative overflow-hidden border border-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our innovative solutions.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-lg shadow-primary-500/20 inline-flex items-center border border-primary-500/50"
          >
            Schedule a Consultation
            <RocketLaunchIcon className="w-5 h-5 ml-2" />
          </motion.button>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-secondary-900/30 -z-10" />
        </motion.div>
      </motion.section>
    </PageLayout>
  );
};

export default Services;