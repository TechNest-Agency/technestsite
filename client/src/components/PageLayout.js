import React from 'react';
import { motion } from 'framer-motion';

const PageLayout = ({ children, title, subtitle }) => {
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-primary-900 to-secondary-900 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                  {title}
                </span>
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                variants={itemVariants}
                className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default PageLayout;
