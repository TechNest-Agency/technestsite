# TechNest Solutions - Modern IT Agency Website

A modern, responsive website for TechNest Solutions built with the MERN stack.

## Features

- 🎯 Modern and professional design
- 📱 Fully responsive layout
- 🌓 Dark/Light mode toggle
- 📊 Admin dashboard for content management
- 🎨 Smooth animations and transitions
- 📝 Blog system
- 📞 Contact form with validation
- 🗺️ Interactive portfolio showcase
- 📧 Newsletter subscription
- 🔍 SEO optimized

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
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