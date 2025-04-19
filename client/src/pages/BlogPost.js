import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Helmet } from 'react-helmet-async';
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

const BlogPost = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();

    // Temporary blog post data - will be replaced with API call
    const blogPosts = {
        1: {
            title: 'The Future of Web Development',
    content: `
                <p>Web development is constantly evolving, with new technologies and frameworks emerging regularly. In this comprehensive guide, we'll explore the latest trends shaping the future of web development and how they're transforming the digital landscape.</p>
                
                <h2>1. Progressive Web Apps (PWAs)</h2>
                <p>Progressive Web Apps are revolutionizing how we interact with web applications. These apps combine the best features of web and mobile applications, offering:</p>
                <ul>
                    <li>Offline functionality through service workers</li>
                    <li>Push notifications for better user engagement</li>
                    <li>Native app-like experience with smooth animations</li>
                    <li>Installation on home screens without app stores</li>
                    <li>Automatic updates and smaller file sizes</li>
                </ul>
                <p>Major companies like Twitter, Pinterest, and Starbucks have already adopted PWAs, seeing significant improvements in user engagement and conversion rates.</p>
                
                <h2>2. Serverless Architecture</h2>
                <p>Serverless computing is transforming how we build and deploy web applications. This architecture offers several advantages:</p>
                <ul>
                    <li>Reduced operational costs with pay-per-use pricing</li>
                    <li>Automatic scaling based on demand</li>
                    <li>No server management required</li>
                    <li>Faster development cycles</li>
                    <li>Built-in high availability and fault tolerance</li>
                </ul>
                <p>Popular serverless platforms include AWS Lambda, Google Cloud Functions, and Azure Functions, each offering unique features for different use cases.</p>
      
      <h2>3. WebAssembly</h2>
                <p>WebAssembly (Wasm) is a game-changer for web performance. This binary instruction format enables:</p>
                <ul>
                    <li>Near-native performance in the browser</li>
                    <li>Support for multiple programming languages</li>
                    <li>Enhanced security through sandboxing</li>
                    <li>Better performance for compute-intensive tasks</li>
                    <li>Seamless integration with existing web technologies</li>
                </ul>
                <p>Use cases include video editing, 3D rendering, scientific simulations, and gaming applications directly in the browser.</p>

                <h2>4. AI-Powered Development</h2>
                <p>Artificial Intelligence is making its way into web development through:</p>
                <ul>
                    <li>Automated code generation and suggestions</li>
                    <li>Intelligent testing and debugging</li>
                    <li>Personalized user experiences</li>
                    <li>Automated accessibility improvements</li>
                    <li>Smart content management systems</li>
                </ul>
                <p>Tools like GitHub Copilot and Amazon CodeWhisperer are already helping developers write better code faster.</p>

                <h2>5. Enhanced Security Measures</h2>
                <p>With increasing cyber threats, security is becoming a top priority. New security measures include:</p>
                <ul>
                    <li>Zero Trust Architecture implementation</li>
                    <li>Advanced encryption standards</li>
                    <li>Automated security testing</li>
                    <li>Real-time threat detection</li>
                    <li>Secure authentication methods</li>
                </ul>
                <p>These measures help protect both user data and application integrity.</p>

                <h2>Conclusion</h2>
                <p>The future of web development is exciting and full of possibilities. By staying updated with these trends and technologies, developers can create more powerful, secure, and user-friendly web applications. The key is to continuously learn and adapt to these changes while maintaining a focus on user experience and security.</p>
            `,
            date: 'March 15, 2024',
            author: 'John Doe',
    category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            readTime: '10 min read',
            tags: ['Web Development', 'Technology', 'Future Trends', 'PWAs', 'Serverless', 'WebAssembly'],
            metaDescription: 'Explore the latest trends in web development, including PWAs, serverless architecture, WebAssembly, AI integration, and enhanced security measures.'
        },
        2: {
            title: 'Mobile App Development Best Practices',
            content: `
                <p>Creating successful mobile applications requires a comprehensive approach that combines technical expertise with user-centric design. In this detailed guide, we'll explore the essential best practices for mobile app development.</p>
                
                <h2>1. User Experience (UX) Design</h2>
                <p>Exceptional user experience is the cornerstone of successful mobile apps. Key considerations include:</p>
                <ul>
                    <li>Intuitive navigation and information architecture</li>
                    <li>Consistent design language and visual hierarchy</li>
                    <li>Responsive layouts for different screen sizes</li>
                    <li>Accessibility features for all users</li>
                    <li>Gesture-based interactions and animations</li>
                </ul>
                <p>Tools like Figma and Adobe XD help designers create and test user interfaces before development begins.</p>
                
                <h2>2. Performance Optimization</h2>
                <p>Optimizing app performance is crucial for user retention. Focus on:</p>
                <ul>
                    <li>Efficient memory management</li>
                    <li>Optimized image loading and caching</li>
                    <li>Reduced network requests</li>
                    <li>Background task optimization</li>
                    <li>Battery usage optimization</li>
                </ul>
                <p>Tools like Firebase Performance Monitoring help track and improve app performance metrics.</p>
                
                <h2>3. Security Measures</h2>
                <p>Protecting user data is paramount. Implement these security measures:</p>
                <ul>
                    <li>End-to-end encryption</li>
                    <li>Secure authentication methods</li>
                    <li>Regular security audits</li>
                    <li>Data minimization practices</li>
                    <li>Secure API communication</li>
                </ul>
                <p>Follow OWASP Mobile Security guidelines for comprehensive security implementation.</p>

                <h2>4. Cross-Platform Development</h2>
                <p>Consider these frameworks for efficient cross-platform development:</p>
                <ul>
                    <li>React Native for JavaScript developers</li>
                    <li>Flutter for beautiful, natively compiled apps</li>
                    <li>Xamarin for .NET developers</li>
                    <li>NativeScript for TypeScript/Angular developers</li>
                </ul>
                <p>Each framework has its strengths and use cases depending on project requirements.</p>

                <h2>5. Testing and Quality Assurance</h2>
                <p>Comprehensive testing is essential for app success:</p>
                <ul>
                    <li>Automated testing frameworks</li>
                    <li>Continuous Integration/Continuous Deployment</li>
                    <li>User acceptance testing</li>
                    <li>Performance testing</li>
                    <li>Security testing</li>
                </ul>
                <p>Tools like Appium and XCTest help automate the testing process.</p>

                <h2>Conclusion</h2>
                <p>Successful mobile app development requires a balance of technical excellence and user-focused design. By following these best practices and staying updated with the latest trends, developers can create apps that stand out in the competitive mobile market.</p>
            `,
            date: 'March 10, 2024',
            author: 'Jane Smith',
            category: 'Mobile Apps',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '12 min read',
            tags: ['Mobile Apps', 'Development', 'Best Practices', 'UX Design', 'Security', 'Testing'],
            metaDescription: 'Learn essential best practices for mobile app development, including UX design, performance optimization, security measures, cross-platform development, and testing strategies.'
        },
        3: {
            title: 'AI in Modern Business',
            content: `
                <p>Artificial Intelligence is revolutionizing how businesses operate and interact with customers. This comprehensive guide explores the transformative impact of AI on modern business practices.</p>
                
                <h2>1. Customer Service Automation</h2>
                <p>AI-powered solutions are transforming customer service through:</p>
                <ul>
                    <li>Intelligent chatbots for 24/7 support</li>
                    <li>Natural Language Processing for better understanding</li>
                    <li>Predictive analytics for customer needs</li>
                    <li>Automated ticket routing and resolution</li>
                    <li>Sentiment analysis for customer feedback</li>
                </ul>
                <p>Companies like Zendesk and Intercom are leading the way in AI-powered customer service solutions.</p>
                
                <h2>2. Data Analysis and Insights</h2>
                <p>AI algorithms provide valuable business insights through:</p>
                <ul>
                    <li>Predictive analytics for market trends</li>
                    <li>Customer behavior analysis</li>
                    <li>Sales forecasting</li>
                    <li>Risk assessment and management</li>
                    <li>Real-time data processing</li>
                </ul>
                <p>Tools like Tableau and Power BI integrate AI for enhanced data visualization and analysis.</p>
                
                <h2>3. Process Automation</h2>
                <p>AI is automating routine business processes through:</p>
                <ul>
                    <li>Robotic Process Automation (RPA)</li>
                    <li>Document processing and management</li>
                    <li>Workflow optimization</li>
                    <li>Supply chain management</li>
                    <li>Inventory control</li>
                </ul>
                <p>Companies like UiPath and Automation Anywhere provide enterprise-grade RPA solutions.</p>

                <h2>4. Marketing and Personalization</h2>
                <p>AI enhances marketing efforts through:</p>
                <ul>
                    <li>Personalized content recommendations</li>
                    <li>Dynamic pricing optimization</li>
                    <li>Customer segmentation</li>
                    <li>Campaign performance analysis</li>
                    <li>Content generation and optimization</li>
                </ul>
                <p>Platforms like HubSpot and Marketo integrate AI for smarter marketing automation.</p>

                <h2>5. Human Resources and Talent Management</h2>
                <p>AI is transforming HR processes through:</p>
                <ul>
                    <li>Automated resume screening</li>
                    <li>Candidate matching algorithms</li>
                    <li>Employee performance analysis</li>
                    <li>Training and development recommendations</li>
                    <li>Workforce planning and optimization</li>
                </ul>
                <p>Tools like Workday and BambooHR incorporate AI for enhanced HR management.</p>

                <h2>Conclusion</h2>
                <p>The integration of AI in business operations is no longer optional but essential for staying competitive. By leveraging AI technologies effectively, businesses can improve efficiency, enhance customer experiences, and drive innovation across all departments.</p>
            `,
            date: 'March 5, 2024',
            author: 'Mike Johnson',
            category: 'AI Solutions',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '15 min read',
            tags: ['AI', 'Business', 'Automation', 'Customer Service', 'Data Analysis', 'Marketing'],
            metaDescription: 'Discover how AI is transforming modern business operations through automation, data analysis, customer service, marketing, and HR management.'
        },
        4: {
            title: 'Cloud Computing: The Future of IT Infrastructure',
            content: `
                <p>Cloud computing has revolutionized how businesses manage their IT infrastructure. This comprehensive guide explores the current state and future of cloud computing technologies.</p>
                
                <h2>1. Cloud Service Models</h2>
                <p>Understanding different cloud service models is crucial for effective implementation:</p>
                <ul>
                    <li>Infrastructure as a Service (IaaS)</li>
                    <li>Platform as a Service (PaaS)</li>
                    <li>Software as a Service (SaaS)</li>
                    <li>Function as a Service (FaaS)</li>
                    <li>Container as a Service (CaaS)</li>
                </ul>
                <p>Each model offers different levels of control and management responsibility.</p>
                
                <h2>2. Cloud Deployment Models</h2>
                <p>Businesses can choose from various deployment models based on their needs:</p>
                <ul>
                    <li>Public Cloud (AWS, Azure, GCP)</li>
                    <li>Private Cloud (On-premises solutions)</li>
                    <li>Hybrid Cloud (Combination of public and private)</li>
                    <li>Multi-Cloud (Using multiple cloud providers)</li>
                </ul>
                <p>Each deployment model has its advantages and use cases.</p>
                
                <h2>3. Cloud Security and Compliance</h2>
                <p>Security is a top priority in cloud computing. Key aspects include:</p>
                <ul>
                    <li>Data encryption and protection</li>
                    <li>Identity and access management</li>
                    <li>Compliance with regulations (GDPR, HIPAA)</li>
                    <li>Network security and monitoring</li>
                    <li>Disaster recovery planning</li>
                </ul>
                <p>Cloud providers offer various security tools and certifications.</p>

                <h2>4. Cost Optimization and Management</h2>
                <p>Effective cloud cost management strategies include:</p>
                <ul>
                    <li>Resource optimization and right-sizing</li>
                    <li>Reserved instances and spot instances</li>
                    <li>Cost monitoring and analytics</li>
                    <li>Automated scaling and scheduling</li>
                    <li>Cloud cost governance</li>
                </ul>
                <p>Tools like AWS Cost Explorer help track and optimize cloud spending.</p>

                <h2>5. Future Trends in Cloud Computing</h2>
                <p>Emerging trends shaping the future of cloud computing:</p>
                <ul>
                    <li>Edge computing and IoT integration</li>
                    <li>Serverless computing evolution</li>
                    <li>AI and machine learning services</li>
                    <li>Quantum computing in the cloud</li>
                    <li>Sustainable cloud computing</li>
                </ul>
                <p>These trends will continue to transform cloud computing in the coming years.</p>

                <h2>Conclusion</h2>
                <p>Cloud computing continues to evolve and transform IT infrastructure. By understanding these concepts and staying updated with emerging trends, businesses can leverage cloud technologies effectively for growth and innovation.</p>
            `,
            date: 'March 1, 2024',
            author: 'Sarah Williams',
            category: 'Cloud Computing',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            readTime: '12 min read',
            tags: ['Cloud Computing', 'IT Infrastructure', 'Security', 'Cost Management', 'Future Trends'],
            metaDescription: 'Explore the comprehensive guide to cloud computing, including service models, deployment options, security measures, cost optimization, and future trends.'
        },
        5: {
            title: 'Cybersecurity Best Practices for Modern Businesses',
            content: `
                <p>In today's digital landscape, cybersecurity is more important than ever. This comprehensive guide covers essential cybersecurity practices for modern businesses.</p>
                
                <h2>1. Threat Landscape and Risk Assessment</h2>
                <p>Understanding current cybersecurity threats is crucial:</p>
                <ul>
                    <li>Ransomware attacks and prevention</li>
                    <li>Phishing and social engineering</li>
                    <li>Zero-day vulnerabilities</li>
                    <li>Insider threats and data breaches</li>
                    <li>Supply chain attacks</li>
                </ul>
                <p>Regular risk assessments help identify and mitigate potential threats.</p>
                
                <h2>2. Security Frameworks and Compliance</h2>
                <p>Implementing security frameworks ensures comprehensive protection:</p>
                <ul>
                    <li>NIST Cybersecurity Framework</li>
                    <li>ISO 27001 standards</li>
                    <li>GDPR compliance requirements</li>
                    <li>HIPAA security rules</li>
                    <li>PCI DSS standards</li>
                </ul>
                <p>These frameworks provide structured approaches to security management.</p>
                
                <h2>3. Network Security</h2>
                <p>Essential network security measures include:</p>
                <ul>
                    <li>Firewall implementation and management</li>
                    <li>Intrusion detection and prevention systems</li>
                    <li>Secure network architecture design</li>
                    <li>VPN and remote access security</li>
                    <li>Network segmentation and monitoring</li>
                </ul>
                <p>Regular network security audits help maintain protection.</p>

                <h2>4. Data Protection and Privacy</h2>
                <p>Protecting sensitive data requires multiple layers of security:</p>
                <ul>
                    <li>Data encryption at rest and in transit</li>
                    <li>Access control and authentication</li>
                    <li>Data backup and recovery plans</li>
                    <li>Privacy by design principles</li>
                    <li>Data classification and handling</li>
                </ul>
                <p>Implementing data protection measures is essential for compliance.</p>

                <h2>5. Security Awareness and Training</h2>
                <p>Employee education is crucial for cybersecurity:</p>
                <ul>
                    <li>Regular security awareness training</li>
                    <li>Phishing simulation exercises</li>
                    <li>Password management best practices</li>
                    <li>Incident response procedures</li>
                    <li>Security policy compliance</li>
                </ul>
                <p>Ongoing training helps create a security-conscious culture.</p>

                <h2>Conclusion</h2>
                <p>Implementing comprehensive cybersecurity measures is essential for protecting business assets and maintaining customer trust. By following these best practices and staying vigilant, businesses can significantly reduce their risk of cyber threats.</p>
            `,
            date: 'February 25, 2024',
            author: 'David Chen',
            category: 'Cybersecurity',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            readTime: '15 min read',
            tags: ['Cybersecurity', 'Data Protection', 'Network Security', 'Compliance', 'Training'],
            metaDescription: 'Learn essential cybersecurity best practices for modern businesses, including threat assessment, security frameworks, network protection, data privacy, and employee training.'
        }
    };

    const post = blogPosts[id];

  if (!post) {
    return (
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
                    <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Post Not Found</h1>
                    <Link
                        to="/blog"
                        className={`text-blue-600 hover:text-blue-800 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                    >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
            <Helmet>
                <title>{post.title} | TechNest Blog</title>
                <meta name="description" content={post.metaDescription} />
                <meta name="keywords" content={post.tags.join(', ')} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.metaDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://technest.com/blog/${id}`} />
                <meta property="og:image" content={post.image} />
                <meta property="article:published_time" content={new Date(post.date).toISOString()} />
                <meta property="article:author" content={post.author} />
                <meta property="article:section" content={post.category} />
                {post.tags.map((tag) => (
                    <meta key={tag} property="article:tag" content={tag} />
                ))}
            </Helmet>

      {/* Hero Section */}
            <div className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center mb-6">
                            <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                                {post.category}
                            </span>
                            <span className={`ml-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {post.date}
                            </span>
              </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {post.title}
                        </h1>
              <div className="flex items-center">
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                By {post.author} • {post.readTime}
                            </span>
              </div>
            </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
              <img
                src={post.image}
                alt={post.title}
                        className="w-full h-96 object-cover rounded-lg mb-8"
                    />
                    <div
                        className={`prose prose-lg max-w-none ${
                            isDarkMode
                                ? 'prose-invert prose-headings:text-white prose-p:text-gray-300'
                                : 'prose-headings:text-gray-900 prose-p:text-gray-600'
                        }`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
                    <div className="mt-12">
                        <Link
                            to="/blog"
                            className={`text-blue-600 hover:text-blue-800 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                        >
                            ← Back to Blog
                        </Link>
              </div>
                </div>
              </div>
            </motion.div>
  );
};

export default BlogPost; 