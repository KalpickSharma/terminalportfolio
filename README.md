# Terminal Portfolio - Full Stack Application

A modern terminal-style portfolio website built with React (Vite) frontend and Node.js backend, featuring a command-line interface experience.

## 🚀 Features

- **Terminal UI**: Interactive command-line interface for portfolio navigation
- **Full Stack**: React frontend with Node.js/Express backend
- **Modern Tech Stack**: Vite, Tailwind CSS, MongoDB
- **Responsive Design**: Works on desktop and mobile devices
- **Contact Form**: Backend API for handling contact messages
- **Portfolio Data**: Dynamic content management through backend

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- CORS (Cross-origin resource sharing)

## 📁 Project Structure

```
terminal-portfolio-vite/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── services/          # API services
│   └── ...
├── backend/               # Backend source code
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── server.js          # Main server file
└── public/                # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=your_mongodb_connection_string

# Start development server
npm start
```

## 🎮 Available Commands

Once the application is running, you can use these commands in the terminal interface:

- `help` - Show available commands
- `about` - Display personal information
- `skills` - Show technical skills
- `projects` - List portfolio projects
- `links` - Social media and contact links
- `contact` - Contact form
- `test` - Test command
- `clear` - Clear terminal

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

### API Endpoints

- `GET /api/portfolio` - Get portfolio data
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables in your hosting platform
# Deploy the backend/ folder
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

---

**Note**: Make sure to update the MongoDB connection string and other environment variables before running the application.
