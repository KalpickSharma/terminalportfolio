# Terminal Portfolio Backend

Backend API server for the Terminal Portfolio application built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env with your configuration
   ```

3. **Start MongoDB:**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Portfolio Data
- `GET /api/portfolio` - Get all portfolio data
- `GET /api/portfolio/:section` - Get specific portfolio section
- `PUT /api/portfolio/:section` - Update portfolio section

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)
- `PATCH /api/contact/:id` - Update message status

### Health Check
- `GET /health` - Server health status

## 🗄️ Database Schema

### PortfolioData
```javascript
{
  type: String,        // 'about', 'skills', 'projects', etc.
  content: Mixed,      // Portfolio content
  lastUpdated: Date,   // Last update timestamp
  version: Number      // Version number
}
```

### ContactMessage
```javascript
{
  name: String,        // Contact name
  email: String,       // Contact email
  message: String,     // Contact message
  status: String,      // 'unread', 'read', 'replied'
  ipAddress: String,   // Visitor IP
  userAgent: String    // Browser info
}
```

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/terminal-portfolio
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:5173
```

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data

### Project Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   └── utils/           # Helper functions
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API request limiting
- **Input Validation** - Joi schema validation
- **Error Handling** - Global error handler

## 📊 Features

- ✅ RESTful API design
- ✅ MongoDB integration
- ✅ Data validation
- ✅ Error handling
- ✅ Security middleware
- ✅ Contact form processing
- ✅ Database seeding
- ✅ Health monitoring

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Setup
Make sure to set proper environment variables for production deployment.

## 📝 License

This project is part of the Terminal Portfolio application.
