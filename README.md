# TechNest Solutions - Modern IT Agency Website

A modern, responsive website for TechNest Solutions built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🌟 Features

- 🎯 Modern and professional design with Tailwind CSS
- 📱 Fully responsive layout optimized for all devices
- 🌓 Dark/Light mode toggle with system preference detection
- 📊 Admin dashboard for content and user management
- 🎨 Smooth animations using Framer Motion
- 📝 Blog system with rich text editing
- 📞 Contact form with email notifications
- 🗺️ Interactive portfolio showcase
- 💳 Secure payment integration (Stripe, bKash, Nagad, Payoneer)
- 🔐 Two-factor authentication
- 📧 Newsletter subscription system
- 🔍 SEO optimized with meta tags
- 📈 Analytics tracking
- 🚀 Optimized performance with lazy loading

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Tailwind CSS for styling
- Framer Motion for animations
- React Router v6 for routing
- Context API for state management
- Heroicons for icons
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Nodemailer for emails
- Multer for file uploads
- Express Validator for validation

### Security
- Two-factor authentication
- CORS protection
- Rate limiting
- Input validation
- XSS protection
- Secure password hashing
- JWT token management

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/TechNest-Agency/TechNest.git
cd TechNest
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both client and server directories
   - Update the variables with your configurations

4. Start the development servers:
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend development server (from client directory)
npm start
```

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:
- [API Documentation](./docs/api.md)
- [Development Guide](./docs/development.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Nazat Meraz - Full Stack Developer
- Halima Sadia - Frontend Developer
- Momota Akter - UI/UX Designer
- Khadiza Khatun - Backend Developer

## 📞 Contact

Email: technestagencies@gmail.com
Phone: +880 1322-695162
Website: [https://technest.vercel.app](https://technest.vercel.app)
- Database: MongoDB
- Authentication: JWT
- Deployment: Vercel (Frontend), Render (Backend)

## Project Structure

```
technest/
├── client/          # Frontend React application
├── server/          # Backend Node.js application
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create a .env file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd client
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 