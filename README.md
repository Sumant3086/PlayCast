# 🎬 PlayCast - Video Streaming Platform

A modern video streaming platform built with the MERN stack, featuring YouTube integration and a Netflix-inspired UI.

## ✨ Features

- **Video Upload & Streaming** - Upload and stream videos with multiple format support
- **YouTube Integration** - Search, browse, and add YouTube videos to your platform
- **User Authentication** - Secure JWT-based authentication system
- **Responsive Design** - Professional dark theme with mobile-first approach
- **Video Management** - Full CRUD operations for video content
- **Search & Discovery** - Advanced search with category filters
- **Real-time Analytics** - Track views, likes, and engagement

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Redux Toolkit
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- YouTube Data API v3

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- YouTube API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/playcast.git
cd playcast
```

2. **Install dependencies**
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client && npm install && cd ..
```

3. **Environment setup**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
```

4. **Start the application**
```bash
# Start backend (Terminal 1)
npm start

# Start frontend (Terminal 2)
cd client && npm start
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
YOUTUBE_API_KEY=your_youtube_api_key
```

## 📱 Usage

1. **Register/Login** - Create an account or sign in
2. **Upload Videos** - Share your content with drag & drop upload
3. **Browse Content** - Discover videos and trending YouTube content
4. **YouTube Integration** - Search and add YouTube videos to the platform
5. **Manage Profile** - View and edit your profile and uploaded videos

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos/upload` - Upload video
- `GET /api/videos/:id` - Get video by ID
- `DELETE /api/videos/:id` - Delete video

### YouTube Integration
- `GET /api/youtube/search` - Search YouTube videos
- `GET /api/youtube/trending` - Get trending videos
- `POST /api/youtube/add` - Add YouTube video to platform

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sumant Yadav**
- GitHub: [@Sumant3086](https://github.com/Sumant3086)
- LinkedIn: [sumant3086](https://www.linkedin.com/in/sumant3086/)
- Email: sumantyadav3086@gmail.com

---

⭐ Star this repository if you found it helpful!