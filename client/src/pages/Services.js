import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaGift, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Services = () => {
  const { addToCart } = useCart();

  // New USD-based individual services
  const individualServices = [
    { name: 'UI/UX Design', desc: 'Figma-based responsive design, mobile-first, clean UI', price: '$150+ per project' },
    { name: 'Frontend Development', desc: 'React.js + Tailwind CSS, pixel-perfect from Figma', price: '$200+ per site' },
    { name: 'Admin Dashboard Development', desc: 'Custom-built admin panel with graphs & auth', price: '$400+' },
    { name: 'Landing Page Development', desc: 'Conversion-focused sales page (single or pack)', price: '$100–250' },
    { name: 'SaaS MVP Development', desc: 'Front + Backend (MongoDB/Node.js)', price: '$800–1500' },
    { name: 'Digital Marketing Setup', desc: 'Content calendar, branding & optimization', price: '$200–500/month' },
    { name: 'Flippa Product Listing & Prep', desc: 'Product build + Listing + Graphics', price: '$300–700' },
    { name: 'Website Maintenance', desc: 'Bug fix, update, speed boost', price: '$50–100/month' },
  ];

  // New USD-based packages
  const usdPackages = [
    {
      name: 'Starter Pack',
      price: '$299',
      features: [
        '1-page Landing Website (Marketing or Portfolio)',
        'Mobile responsive + SEO basic',
        'UI Design (Figma)',
        'React + Tailwind Code',
        'Delivery in 5–7 days',
        'Best for: Freelancers, Creatives, Mini Startups',
      ],
    },
    {
      name: 'Pro Website Pack',
      price: '$699',
      features: [
        '5–6 pages full business site (Home, About, Services, Contact, Blog)',
        'Figma UI + Full Development (React/Tailwind)',
        'Admin Access for blog or service update (Optional)',
        'Basic SEO Setup',
        'GitHub & Hosting Support',
        'Best for: Growing startups, Agencies, Consultants',
      ],
    },
    {
      name: 'Flippa Pro Pack',
      price: '$899',
      features: [
        'Build-for-sale website template or niche SaaS idea',
        'Modern UI (Figma) + Custom Dev',
        'Flippa Optimized Listing Copy',
        'Marketing Graphics',
        'Setup Guide & Ownership Transfer',
        'Best for: Productized Founders, Flippers',
      ],
    },
    {
      name: 'SaaS MVP Launch Pack',
      price: '$1499',
      features: [
        'UI/UX + Full Stack Development (React, Node.js, MongoDB)',
        'User Auth, Dashboard, Admin Panel',
        'API Integration (Stripe, Notion, etc.)',
        'SEO Ready + Hosting Setup',
        '1-month Tech Support',
        'Best for: Entrepreneurs building MVPs, App Launchers',
      ],
    },
    {
      name: 'Growth Bundle',
      price: '$1999/month',
      features: [
        '2 Projects (Website or SaaS MVP) per month',
        'Dedicated Designer + Developer',
        'Digital Marketer (3x Weekly Content + Outreach)',
        'Sales Executive (Client Outreach Support)',
        'Weekly Reporting + Priority Support',
        'Best for: Agencies, Resellers, Product Builders',
      ],
    },
  ];

  // New USD-based add-ons
  const usdAddons = [
    { name: 'Express Delivery (2x faster)', price: '+$100/project' },
    { name: 'Hosting + Domain Setup', price: '+$50' },
    { name: 'Monthly Maintenance', price: '+$75/month' },
    { name: 'Custom Animation (GSAP/Framer Motion)', price: '+$100' },
    { name: 'SEO Keyword Research & Optimization', price: '+$100' },
  ];

  // Add: Comprehensive digital solutions tailored to your needs
  const allServices = [
    {
      title: 'Website Design & Development',
      items: [
        'MERN Stack Website',
        'Personal Portfolio',
        'Business/Agency Website',
        'E-commerce Website',
        'Landing Page Design',
        'Blog Website',
      ],
    },
    {
      title: 'UI/UX Design',
      items: [
        'Figma Web & App UI Design',
        'Wireframe to UI',
        'Dark/Light Theme Design',
        'Dashboard UI',
      ],
    },
    {
      title: 'Web App Development',
      items: [
        'Admin Dashboard',
        'CRM System',
        'SaaS Tools',
        'Booking App',
        'Blood Donor Management',
        'Resume Builder',
      ],
    },
    {
      title: 'Maintenance & Bug Fixing',
      items: [
        'Speed Optimization',
        'Mobile Responsiveness Fix',
        'Bug Fixing & Code Refactor',
        'SEO Optimization',
      ],
    },
    {
      title: 'Custom CMS & Dashboard',
      items: [
        'React Admin Panel',
        'Firebase Dashboard',
        'Node.js + MongoDB CMS',
        'Content Management System',
      ],
    },
    {
      title: 'Template Design & Sale',
      items: [
        'HTML/CSS Templates',
        'React Templates',
        'Tailwind UI Kits',
        'Gumroad Template Setup',
      ],
    },
    {
      title: 'API Integration & Backend',
      items: [
        'Third-party API Integration',
        'Authentication (JWT, Firebase)',
        'REST API / GraphQL Setup',
        'Admin CRUD Operations',
      ],
    },
    {
      title: 'Conversion Services',
      items: [
        'PSD/Figma/XD to HTML',
        'HTML to React',
        'Static Site to Dynamic',
      ],
    },
    {
      title: 'Hosting & Deployment',
      items: [
        'Domain/Hosting Setup',
        'Firebase / Vercel / Netlify Deployment',
        'Email Setup',
      ],
    },
    {
      title: 'Additional Services',
      items: [
        'Mobile App Development (React Native)',
        'WordPress Development',
        'Graphics Design',
        'Social Media Management',
      ],
    },
  ];

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 flex items-center justify-center gap-2">
              <span role="img" aria-label="puzzle">🧩</span> TechNest Agency – Complete Service & Pricing Packages (USD-Based)
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6">
              Modern UI, Scalable Web Apps, SaaS MVPs, and Growth Bundles for every business level. Transparent USD pricing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 flex items-center gap-2 justify-center"><span role="img" aria-label="package">📦</span> Website Development Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {usdPackages.map((pkg) => (
              <div key={pkg.name} className="relative rounded-2xl shadow-lg p-6 sm:p-8 bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 flex flex-col items-center transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2 text-center">
                  {pkg.name}
                  {pkg.name === 'Pro Website Pack' && (
                    <span className="ml-2 px-2 py-1 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full animate-pulse">Best Seller</span>
                  )}
                </h3>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">{pkg.price}</div>
                <ul className="mb-6 space-y-2 w-full">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-200 text-sm sm:text-base"><FaCheckCircle className="mr-2 text-green-500 flex-shrink-0" /> {f}</li>
                  ))}
                </ul>
                <button
                  className="w-full flex items-center justify-center py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 mb-2"
                  onClick={() => addToCart({
                    id: pkg.name.toLowerCase().replace(/\s+/g, '-'),
                    title: pkg.name,
                    price: pkg.price,
                    type: 'package',
                    features: pkg.features,
                    category: 'Website Package',
                  })}
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
                <a href="/contact" className="btn-primary w-full text-center py-2 sm:py-3 text-sm sm:text-base">Let's Build → Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services Table */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><span role="img" aria-label="wrench">🔧</span> Individual Services</h2>
          <div className="overflow-x-auto rounded-xl border border-blue-100 dark:border-gray-700">
            <table className="min-w-full divide-y divide-blue-200 dark:divide-gray-700 text-sm sm:text-base">
              <thead>
                <tr className="text-left text-blue-700 dark:text-blue-300">
                  <th className="py-2 pr-2">Service</th>
                  <th className="py-2 pr-2">Description</th>
                  <th className="py-2">Starting Price (USD)</th>
                  <th className="py-2">Add</th>
                </tr>
              </thead>
              <tbody>
                {individualServices.map((srv, i) => (
                  <tr key={srv.name} className="border-b border-blue-50 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition">
                    <td className="py-2 pr-2 font-semibold whitespace-nowrap">{srv.name}</td>
                    <td className="py-2 pr-2 text-gray-600 dark:text-gray-300">{srv.desc}</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{srv.price}</td>
                    <td className="py-2">
                      <button
                        className="flex items-center px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 text-xs"
                        onClick={() => addToCart({
                          id: srv.name.toLowerCase().replace(/\s+/g, '-'),
                          title: srv.name,
                          price: srv.price,
                          type: 'service',
                          description: srv.desc,
                          category: 'Individual Service',
                        })}
                        title="Add to Cart"
                      >
                        <FaShoppingCart className="mr-1" />
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-On Services Section */}
      <section className="py-10 bg-gradient-to-r from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-2 sm:px-4">
          <h3 className="text-xl font-bold mb-4 flex items-center text-pink-600 dark:text-pink-400"><FaGift className="mr-2" /> Add-On Services (Optional)</h3>
          <div className="overflow-x-auto rounded-xl border border-blue-100 dark:border-gray-700">
            <table className="min-w-full divide-y divide-blue-200 dark:divide-gray-700 text-sm sm:text-base">
              <thead>
                <tr className="text-left text-blue-700 dark:text-blue-300">
                  <th className="py-2 pr-2">Add-On</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Add</th>
                </tr>
              </thead>
              <tbody>
                {usdAddons.map((addon, i) => (
                  <tr key={addon.name} className="border-b border-blue-50 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition">
                    <td className="py-2 pr-2 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{addon.name}</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{addon.price}</td>
                    <td className="py-2">
                      <button
                        className="flex items-center px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 text-xs"
                        onClick={() => addToCart({
                          id: 'addon-' + addon.name.toLowerCase().replace(/\s+/g, '-'),
                          title: addon.name,
                          price: addon.price,
                          type: 'addon',
                          category: 'Add-On',
                        })}
                        title="Add to Cart"
                      >
                        <FaShoppingCart className="mr-1" />
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-lg">Comprehensive digital solutions tailored to your needs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <div key={service.title} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary-600">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-200">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Let's discuss your project and find the perfect solution for your business needs.
              Our team is ready to help you succeed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="btn-white"
              >
                Get Started
              </a>
              <a
                href="/portfolio"
                className="btn-outline-white"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;