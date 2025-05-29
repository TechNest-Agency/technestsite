import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import {
  GlobeAltIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const TeamMembers = () => {
  const teamMembers = [
    {
      name: 'Nazat Aliyev',
      role: 'CEO & Founder',
      image: '/ceo.png',
      bio: 'Tech visionary with 4+ years of industry experience.',
      expertise: ['Strategy', 'Innovation', 'Leadership'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Halima Khatun',
      role: 'UI/UX Designer',
      image: '/halima.png',
      bio: 'Creative designer with a focus on user experience and interface design.',
      expertise: ['UI/UX', 'Prototyping', 'User Research'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Mustafizur Rahman Sumon',
      role: 'Full Stack Developer',
      image: '/sumon.jpg',
      bio: 'Full stack developer with expertise in building scalable web applications.',
      expertise: ['Full Stack Development', 'Node.js', 'React'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'MST JASMIN ARA MIM',
      role: 'Frontend Developer',
      image: '/jasmin.png',
      bio: 'Frontend developer with a knack for creating responsive and user-friendly web applications.',
      expertise: ['React', 'JavaScript', 'CSS'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
        {
      name: 'Nusrat Jahan Mim',
      role: 'UI/UX Designer',
      image: '/mim.png',
      bio: 'Innovative UI/UX designer with a passion for creating intuitive user experiences.',
      expertise: ['UI/UX Design', 'Prototyping', 'User Research'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    
    {
      name: 'Nure Jannat Mim',
      role: 'Digital Marketing Specialist',
      image: '/jannat.jpeg',
      bio: 'Digital marketing expert with a focus on social media and content strategy.',
      expertise: ['SEO', 'Content Marketing', 'Social Media'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Tafroza Tofaz',
      role: 'Sales Manager',
      image: '/tafroza.png',
      bio: 'Dynamic sales leader with a passion for building client relationships.',
      expertise: ['Sales Strategy', 'Client Relations', 'Negotiation'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Marufa Akter',
      image: '/developer.jpeg',
      bio: 'UI/UX designer with a passion for creating engaging user experiences.',
      expertise: ['UI/UX Design', 'Wireframing', 'User Testing'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Sumaiya Amin Prova',
      role: 'Frontend Developer',
      image: '/sumaiya.png',
      bio: 'Frontend developer specializing in responsive design and user interfaces.',
      expertise: ['HTML', 'CSS', 'JavaScript', 'React'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Soraya Parvin',
      role: 'Frontend Developer',
      image: '/developer.jpg',
      bio: 'Frontend developer with a focus on building interactive web applications.',
      expertise: ['React', 'JavaScript', 'CSS'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },


    // Add more team members
  ];

  const departments = ['All', 'Leadership', 'Engineering', 'Design', 'Marketing'];
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);

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

  const stats = [
    { number: '50+', label: 'Team Members', icon: UserGroupIcon },
    { number: '10+', label: 'Countries', icon: GlobeAltIcon },
    { number: '200+', label: 'Projects Completed', icon: BriefcaseIcon },
    { number: '15+', label: 'Years Experience', icon: AcademicCapIcon },
  ];

  return (
    <PageLayout
      title="Our Team"
      subtitle="Meet the Innovators Behind TechNest"
    >
      {/* Team Stats */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
            >
              <stat.icon className="h-12 w-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Department Filter */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {departments.map((department) => (
            <motion.button
              key={department}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDepartment(department)}
              className={`px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 
                ${selectedDepartment === department
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              {department}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Team Members Grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            onClick={() => setSelectedMember(member)}
          >
            {/* Member Image */}
            <div className="relative aspect-w-3 aspect-h-4 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
            </div>

            {/* Member Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-primary-400 mb-4">{member.role}</p>
              
              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {member.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/10 rounded-full text-gray-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {Object.entries(member.social).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={link}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fab fa-${platform}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.section>

      {/* Join the Team CTA */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about technology and innovation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transform transition shadow-lg"
          >
            View Open Positions
          </motion.button>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10" />
        </motion.div>
      </motion.section>
    </PageLayout>
  );
};

export default TeamMembers;