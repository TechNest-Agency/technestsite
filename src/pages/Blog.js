import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import {
  ClockIcon,
  UserCircleIcon,
  TagIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Web Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and maintain websites.',
      category: 'Technology',
      image: '/path/to/ai-web-dev.jpg',
      author: {
        name: 'John Smith',
        avatar: '/path/to/john.jpg'
      },
      date: '2024-05-15',
      readTime: '5 min read',
      tags: ['AI', 'Web Development', 'Future Tech']
    },
    {
      id: 2,
      title: 'Building Scalable Cloud Solutions',
      excerpt: 'Best practices for designing and implementing cloud-native applications that can handle millions of users.',
      category: 'Cloud',
      image: '/path/to/cloud-solutions.jpg',
      author: {
        name: 'Emma Wilson',
        avatar: '/path/to/emma.jpg'
      },
      date: '2024-05-10',
      readTime: '8 min read',
      tags: ['Cloud', 'Architecture', 'Scalability']
    },
    // Add more blog posts
  ];

  const categories = ['All', 'Technology', 'Cloud', 'Development', 'Design', 'Business'];

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

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout
      title="Blog"
      subtitle="Insights and Updates from Our Tech Experts"
    >
      {/* Search and Filter Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="relative max-w-xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 
                ${selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <Link to={`/blog/${filteredPosts[0].id}`}>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={filteredPosts[0].image}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm mb-4">
                  {filteredPosts[0].category}
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">{filteredPosts[0].title}</h2>
                <p className="text-gray-300 mb-6">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center text-gray-400">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  <span>{filteredPosts[0].author.name}</span>
                  <ClockIcon className="h-5 w-5 ml-6 mr-2" />
                  <span>{filteredPosts[0].readTime}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.section>
      )}

      {/* Blog Posts Grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPosts.slice(1).map((post) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            <Link to={`/blog/${post.id}`}>
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-secondary-500/20 text-secondary-300 rounded-md text-sm"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author and Read Time */}
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-6 w-6 rounded-full mr-2"
                    />
                    {post.author.name}
                  </div>
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Read More Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-medium flex items-center">
                  Read More
                  <ArrowLongRightIcon className="h-5 w-5 ml-2" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mt-20 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="p-12 bg-white/5 backdrop-blur-md rounded-2xl relative overflow-hidden"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest insights and updates delivered straight to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transform transition shadow-lg"
            >
              Subscribe
            </motion.button>
          </form>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10" />
        </motion.div>
      </motion.section>

      {/* Pagination */}
      <motion.div
        variants={itemVariants}
        className="mt-12 flex justify-center gap-2"
      >
        {[1, 2, 3].map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
              ${page === 1
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
          >
            {page}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 flex items-center justify-center"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </PageLayout>
  );
};

export default Blog;
