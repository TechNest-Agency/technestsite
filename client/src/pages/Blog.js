import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Helmet } from 'react-helmet-async';
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  UserIcon,
  TagIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Blog posts data
const blogPosts = [
  {
    id: 1,
            title: 'The Future of Web Development',
            excerpt: 'Explore the latest trends shaping the future of web development and how they\'re transforming the digital landscape.',
            date: 'March 15, 2024',
            author: 'John Doe',
    category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            readTime: '10 min read',
            tags: ['Web Development', 'Technology', 'Future Trends', 'PWAs', 'Serverless', 'WebAssembly'],
            isPopular: true
  },
  {
    id: 2,
            title: 'Mobile App Development Best Practices',
            excerpt: 'Learn essential best practices for mobile app development, including UX design, performance optimization, and security measures.',
            date: 'March 10, 2024',
            author: 'Jane Smith',
    category: 'Mobile Apps',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '12 min read',
            tags: ['Mobile Apps', 'Development', 'Best Practices', 'UX Design', 'Security', 'Testing'],
            isPopular: true
  },
  {
    id: 3,
            title: 'AI in Modern Business',
            excerpt: 'Discover how AI is transforming modern business operations through automation, data analysis, and customer service.',
            date: 'March 5, 2024',
            author: 'Mike Johnson',
    category: 'AI Solutions',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '15 min read',
            tags: ['AI', 'Business', 'Automation', 'Customer Service', 'Data Analysis', 'Marketing'],
            isPopular: false
  },
  {
    id: 4,
            title: 'Cloud Computing: The Future of IT Infrastructure',
            excerpt: 'Explore the comprehensive guide to cloud computing, including service models, deployment options, and security measures.',
            date: 'March 1, 2024',
            author: 'Sarah Williams',
            category: 'Cloud Computing',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            readTime: '12 min read',
            tags: ['Cloud Computing', 'IT Infrastructure', 'Security', 'Cost Management', 'Future Trends'],
            isPopular: true
  },
  {
    id: 5,
            title: 'Cybersecurity Best Practices for Modern Businesses',
            excerpt: 'Learn essential cybersecurity practices for modern businesses, including threat assessment, security frameworks, and network protection.',
            date: 'February 25, 2024',
            author: 'David Chen',
            category: 'Cybersecurity',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '15 min read',
            tags: ['Cybersecurity', 'Data Protection', 'Network Security', 'Compliance', 'Training'],
            isPopular: false
  },
  {
    id: 6,
            title: 'Blockchain Technology: Revolutionizing Digital Transactions',
            excerpt: 'Understand how blockchain technology is transforming digital transactions and creating new opportunities in various industries.',
            date: 'February 20, 2024',
            author: 'Alex Thompson',
            category: 'Blockchain',
            image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '14 min read',
            tags: ['Blockchain', 'Cryptocurrency', 'Digital Transactions', 'Smart Contracts', 'Decentralization'],
            isPopular: true
        },
        {
            id: 7,
            title: 'Data Science: The Power of Big Data Analytics',
            excerpt: 'Explore the world of data science and how big data analytics is helping businesses make informed decisions.',
            date: 'February 15, 2024',
            author: 'Emily Brown',
            category: 'Data Science',
            image: 'https://images.unsplash.com/photo-1551288049-ebec51b0b7fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '13 min read',
            tags: ['Data Science', 'Big Data', 'Analytics', 'Machine Learning', 'Business Intelligence'],
            isPopular: false
        },
        {
            id: 8,
            title: 'Internet of Things (IoT): Connecting the Digital World',
            excerpt: 'Learn about IoT technology and how it\'s creating a connected ecosystem of smart devices and systems.',
            date: 'February 10, 2024',
            author: 'Robert Wilson',
            category: 'IoT',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '11 min read',
            tags: ['IoT', 'Smart Devices', 'Connectivity', 'Automation', 'Smart Home'],
            isPopular: true
        },
        {
            id: 9,
            title: 'DevOps: Bridging Development and Operations',
            excerpt: 'Discover how DevOps practices are improving software development and deployment processes.',
            date: 'February 5, 2024',
            author: 'Lisa Anderson',
            category: 'DevOps',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '12 min read',
            tags: ['DevOps', 'CI/CD', 'Automation', 'Cloud', 'Infrastructure'],
            isPopular: false
        },
        {
            id: 10,
            title: 'UI/UX Design: Creating Engaging Digital Experiences',
            excerpt: 'Learn the principles of UI/UX design and how to create engaging digital experiences for users.',
            date: 'January 30, 2024',
            author: 'Michael Clark',
            category: 'Design',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            readTime: '10 min read',
            tags: ['UI/UX', 'Design', 'User Experience', 'Interface', 'Prototyping'],
            isPopular: true
        },
        {
            id: 11,
            title: 'Quantum Computing: The Next Computing Revolution',
            excerpt: 'Explore the fascinating world of quantum computing and its potential to revolutionize technology.',
            date: 'January 25, 2024',
            author: 'Dr. Sarah Chen',
            category: 'Quantum Computing',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '15 min read',
            tags: ['Quantum Computing', 'Technology', 'Innovation', 'Research', 'Future'],
            isPopular: false
        },
        {
            id: 12,
            title: 'Digital Marketing: Strategies for Success',
            excerpt: 'Learn effective digital marketing strategies to grow your business in the online world.',
            date: 'January 20, 2024',
            author: 'Jennifer Lee',
            category: 'Marketing',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '12 min read',
            tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Analytics'],
            isPopular: true
        },
        {
            id: 13,
            title: '5G Technology: The Future of Connectivity',
            excerpt: 'Discover how 5G technology is revolutionizing mobile connectivity and enabling new possibilities.',
            date: 'January 15, 2024',
            author: 'David Miller',
            category: 'Telecommunications',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '11 min read',
            tags: ['5G', 'Connectivity', 'Mobile', 'Technology', 'Innovation'],
            isPopular: false
        },
        {
            id: 14,
            title: 'Virtual Reality: Transforming Digital Experiences',
            excerpt: 'Explore how virtual reality is changing the way we interact with digital content and experiences.',
            date: 'January 10, 2024',
            author: 'Mark Taylor',
            category: 'VR/AR',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '13 min read',
            tags: ['Virtual Reality', 'AR', 'Immersive Technology', 'Gaming', 'Education'],
            isPopular: true
        },
        {
            id: 15,
            title: 'Software Testing: Ensuring Quality in Development',
            excerpt: 'Learn about software testing methodologies and best practices for ensuring quality in development.',
            date: 'January 5, 2024',
            author: 'Rachel Green',
            category: 'Testing',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '10 min read',
            tags: ['Software Testing', 'Quality Assurance', 'Automation', 'Manual Testing', 'CI/CD'],
            isPopular: false
        },
        {
            id: 16,
            title: 'Edge Computing: Processing Data at the Source',
            excerpt: 'Understand how edge computing is revolutionizing data processing and reducing latency.',
            date: 'December 30, 2023',
            author: 'James Wilson',
            category: 'Edge Computing',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            readTime: '12 min read',
            tags: ['Edge Computing', 'Data Processing', 'IoT', 'Cloud', 'Latency'],
            isPopular: true
        },
        {
            id: 17,
            title: 'Digital Transformation: Modernizing Business Operations',
            excerpt: 'Learn how digital transformation is helping businesses modernize their operations and stay competitive.',
            date: 'December 25, 2023',
            author: 'Patricia Brown',
            category: 'Digital Transformation',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '14 min read',
            tags: ['Digital Transformation', 'Business', 'Innovation', 'Technology', 'Strategy'],
            isPopular: false
        },
        {
            id: 18,
            title: 'Microservices Architecture: Building Scalable Applications',
            excerpt: 'Discover how microservices architecture is enabling the development of scalable and maintainable applications.',
            date: 'December 20, 2023',
            author: 'Thomas Anderson',
            category: 'Architecture',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '13 min read',
            tags: ['Microservices', 'Architecture', 'Scalability', 'Cloud', 'DevOps'],
            isPopular: true
        },
        {
            id: 19,
            title: 'Natural Language Processing: Understanding AI Communication',
            excerpt: 'Explore how natural language processing is enabling machines to understand and process human language.',
            date: 'December 15, 2023',
            author: 'Dr. Emily Chen',
            category: 'AI',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '15 min read',
            tags: ['NLP', 'AI', 'Machine Learning', 'Language Processing', 'Chatbots'],
            isPopular: false
        },
        {
            id: 20,
            title: 'Sustainable Technology: Green Computing Practices',
            excerpt: 'Learn about sustainable technology practices and how they\'re helping reduce environmental impact.',
            date: 'December 10, 2023',
            author: 'Sarah Green',
            category: 'Sustainability',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            readTime: '11 min read',
            tags: ['Sustainability', 'Green Computing', 'Environment', 'Energy Efficiency', 'Eco-friendly'],
            isPopular: true
        }
    ];

    // Get unique categories
    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    // Filter posts based on search query and selected category
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get popular posts
    const popularPosts = blogPosts.filter(post => post.isPopular);

  return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
            <Helmet>
                <title>Blog | TechNest</title>
                <meta name="description" content="Explore our latest articles on web development, mobile apps, AI solutions, cloud computing, and cybersecurity." />
                <meta name="keywords" content="blog, technology, web development, mobile apps, AI, cloud computing, cybersecurity" />
            </Helmet>

      {/* Hero Section */}
            <div className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            TechNest Blog
                        </h1>
                        <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Stay updated with the latest trends and insights in technology
                        </p>
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full px-4 py-3 pl-12 rounded-lg border ${
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            <MagnifyingGlassIcon className={`h-5 w-5 absolute left-4 top-3.5 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                        </div>
                    </div>
                </div>
        </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Blog Posts */}
                    <div className="lg:w-2/3">
                        {/* Categories */}
                        <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                                            ? isDarkMode
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-blue-500 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
                        </div>

          {/* Blog Posts Grid */}
                        <div className="grid gap-8">
            {filteredPosts.map((post) => (
                                <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                                    className={`rounded-lg overflow-hidden shadow-lg ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
              >
                                    <Link to={`/blog/${post.id}`}>
                                        <div className="relative h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                                            {post.isPopular && (
                                                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    Popular
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                    isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                                }`}>
                      {post.category}
                    </span>
                                                <div className={`flex items-center gap-2 text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <CalendarIcon className="h-4 w-4" />
                                                    {post.date}
                  </div>
                                                <div className={`flex items-center gap-2 text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <UserIcon className="h-4 w-4" />
                      {post.author}
                    </div>
                    </div>
                                            <h2 className={`text-2xl font-bold mb-3 ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                    {post.title}
                                            </h2>
                                            <p className={`mb-4 ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <TagIcon className={`h-4 w-4 ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`} />
                                                    <div className="flex flex-wrap gap-2">
                                                        {post.tags.slice(0, 3).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className={`text-sm ${
                                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                                }`}
                                                            >
                                                                #{tag}
                    </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-2 text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <span>{post.readTime}</span>
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        {/* Popular Posts */}
                        <div className={`rounded-lg p-6 mb-8 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}>
                            <h3 className={`text-xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Popular Posts
                            </h3>
                            <div className="space-y-4">
                                {popularPosts.map((post) => (
                    <Link
                                        key={post.id}
                      to={`/blog/${post.id}`}
                                        className="block group"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-medium mb-1 group-hover:text-blue-500 ${
                                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                    {post.title}
                                                </h4>
                                                <div className={`flex items-center gap-2 text-xs ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    <CalendarIcon className="h-3 w-3" />
                                                    {post.date}
                                                </div>
                                            </div>
                                        </div>
                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className={`rounded-lg p-6 mb-8 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}>
                            <h3 className={`text-xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.filter(cat => cat !== 'All').map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                            selectedCategory === category
                                                ? isDarkMode
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-500 text-white'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                  </div>
                </div>

                        {/* Tags */}
                        <div className={`rounded-lg p-6 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}>
                            <h3 className={`text-xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Popular Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(blogPosts.flatMap(post => post.tags)))
                                    .slice(0, 10)
                                    .map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => setSearchQuery(tag)}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                isDarkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            #{tag}
                                        </button>
            ))}
          </div>
        </div>
                    </div>
                </div>
    </div>
        </motion.div>
  );
};

export default Blog; 