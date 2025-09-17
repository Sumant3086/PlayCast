# 🚀 PlayCast Quick Start Guide

**Created by Sumant Yadav**  
**Email: sumantyadav3086@gmail.com**

## 🎯 What You Need

### Prerequisites
- **Docker Desktop** (for Windows/Mac) or **Docker** (for Linux)
- **Docker Compose**
- **At least 4GB RAM** and **2 CPU cores**
- **20GB free disk space**

### System Requirements
- **Windows 10/11** (with WSL2 for Docker)
- **macOS 10.15+**
- **Ubuntu 18.04+** (or other Linux distributions)

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Docker
1. **Windows/Mac**: Download and install [Docker Desktop](https://docs.docker.com/desktop/)
2. **Linux**: Install Docker and Docker Compose
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

### Step 2: Run Setup Script
**Windows:**
```cmd
setup-playcast.bat
```

**Linux/Mac:**
```bash
chmod +x setup-playcast.sh
./setup-playcast.sh
```

### Step 3: Access Your Platform
- **Main Site**: http://localhost
- **Admin Panel**: http://localhost/admin
- **Admin Login**: 
  - Username: `admin`
  - Password: `playcast2024`

## 🔧 Manual Setup (Alternative)

If you prefer manual setup:

1. **Create environment file:**
   ```bash
   cp env.example .env
   ```

2. **Create directories:**
   ```bash
   mkdir -p .compose/HLS .compose/videos .compose/encoder .compose/letsencrypt
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

4. **Wait 2-3 minutes** for all services to start

## 📊 Your PlayCast Configuration

### Default Settings
- **Website Title**: PlayCast
- **Admin Email**: sumantyadav3086@gmail.com
- **Database**: playcast (user: playcast, password: playcast123)
- **Admin Password**: playcast2024

### Ports Used
- **80**: Main website
- **443**: HTTPS
- **2053**: WebSocket
- **1935**: Live streaming
- **8081**: phpMyAdmin
- **8082**: Encoder phpMyAdmin

## 🎬 First Steps After Setup

1. **Login to Admin Panel**
   - Go to http://localhost/admin
   - Use admin/playcast2024

2. **Upload Your First Video**
   - Go to "Manager Videos" in admin panel
   - Click "Add New Video"
   - Upload your video file

3. **Customize Your Site**
   - Go to "Customize" in admin panel
   - Change logo, colors, and branding
   - Set up your channel information

4. **Configure Email** (Optional)
   - Go to "Configuration" → "Email"
   - Set up SMTP for notifications

## 🔒 Security Notes

- **Change default admin password** after first login
- **Update database passwords** in production
- **Enable SSL** for production use
- **Regular backups** of your database and videos

## 📱 Features Available

✅ **Video Upload & Streaming**  
✅ **Live Streaming**  
✅ **User Registration**  
✅ **Playlists & Channels**  
✅ **Monetization** (PayPal, Stripe)  
✅ **Social Login** (Google, Facebook)  
✅ **Mobile Responsive**  
✅ **API Access**  
✅ **Analytics & Statistics**  
✅ **Content Protection**  

## 🛠️ Troubleshooting

### Common Issues

**Services not starting:**
```bash
docker-compose logs
```

**Port conflicts:**
- Check if ports 80, 443, 2053 are free
- Change ports in `.env` file if needed

**Permission issues (Linux):**
```bash
sudo chown -R $USER:$USER .compose/
```

**Database connection issues:**
```bash
docker-compose restart database
```

### Getting Help

- **Email**: sumantyadav3086@gmail.com
- **Check logs**: `docker-compose logs [service-name]`
- **Restart services**: `docker-compose restart`

## 🎉 Congratulations!

Your PlayCast platform is now ready! You have your own personal video streaming platform with:

- Professional video hosting
- Live streaming capabilities
- User management system
- Monetization options
- Mobile-friendly interface
- Advanced security features

**Start creating and sharing your content!** 🎬

---

**PlayCast** - Your Personal Video Streaming Platform  
**Created with ❤️ by Sumant Yadav**
