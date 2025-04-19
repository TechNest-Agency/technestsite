import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

// Temporary blog data - will be replaced with API calls
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development in 2024',
    content: `
      <p>The web development landscape is constantly evolving, and 2024 is no exception. In this article, we'll explore the key trends and technologies that are shaping the future of web development.</p>
      
      <h2>1. AI-Powered Development</h2>
      <p>Artificial Intelligence is revolutionizing how we build websites. From automated code generation to intelligent testing, AI tools are becoming essential in the developer's toolkit.</p>
      
      <h2>2. Progressive Web Apps (PWAs)</h2>
      <p>PWAs continue to gain momentum, offering app-like experiences directly in the browser. With improved offline capabilities and push notifications, they're blurring the line between web and native apps.</p>
      
      <h2>3. WebAssembly</h2>
      <p>WebAssembly is enabling near-native performance for web applications. This technology is particularly impactful for graphics-intensive applications and games.</p>
      
      <h2>4. Serverless Architecture</h2>
      <p>The shift towards serverless computing is accelerating, allowing developers to focus on code rather than infrastructure management.</p>
      
      <h2>5. Enhanced Security</h2>
      <p>With increasing cyber threats, security is becoming a top priority. New standards and practices are emerging to protect web applications.</p>
      
      <p>These trends represent just the beginning of what's to come in web development. Staying ahead of these changes will be crucial for developers and businesses alike.</p>
    `,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Web Development',
    author: 'John Doe',
    date: '2024-03-15',
    readTime: '5 min read',
    tags: ['Web Development', 'AI', 'PWAs', 'WebAssembly', 'Serverless']
  },
  // ... other posts would be here
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary-600 dark:text-primary-400 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Blog
            </Link>
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
            <h1 className="heading mb-6">{post.title}</h1>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">{post.readTime}</span>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  <BookmarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mb-12"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                  {post.category}
                </span>
              </div>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${post.author.replace(' ', '+')}&background=primary&color=fff`}
                  alt={post.author}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.author}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Senior Developer at TechNest Solutions. Passionate about web technologies and sharing knowledge.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost; 