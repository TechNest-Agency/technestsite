import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// Temporary blog data - will be replaced with API calls
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development...',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Web Development',
    author: 'John Doe',
    date: '2024-03-15',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Building Scalable Mobile Applications',
    excerpt: 'Learn the best practices for creating mobile apps that scale with your user base...',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    category: 'Mobile Apps',
    author: 'Jane Smith',
    date: '2024-03-10',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'AI Integration in Modern Applications',
    excerpt: 'Discover how artificial intelligence is transforming the way we build applications...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    category: 'AI Solutions',
    author: 'Mike Johnson',
    date: '2024-03-05',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Optimizing Website Performance',
    excerpt: 'Essential tips and techniques for improving your website\'s loading speed...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    category: 'Web Development',
    author: 'Sarah Wilson',
    date: '2024-02-28',
    readTime: '4 min read'
  },
  {
    id: 5,
    title: 'Mobile App Security Best Practices',
    excerpt: 'Learn how to protect your mobile applications from common security threats...',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    category: 'Mobile Apps',
    author: 'David Brown',
    date: '2024-02-20',
    readTime: '8 min read'
  },
  {
    id: 6,
    title: 'Machine Learning in Business Applications',
    excerpt: 'How machine learning is revolutionizing business processes and decision-making...',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    category: 'AI Solutions',
    author: 'Emily Davis',
    date: '2024-02-15',
    readTime: '9 min read'
  }
];

const categories = ['All', 'Web Development', 'Mobile Apps', 'AI Solutions'];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading mb-6">Our Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay updated with the latest insights, trends, and best practices in technology.
              Our team shares their expertise to help you navigate the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center mr-4">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
                    >
                      Read More
                      <ArrowLeftIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 