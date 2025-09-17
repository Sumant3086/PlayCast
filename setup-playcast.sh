#!/bin/bash

# PlayCast Setup Script
# Created by Sumant Yadav
# Email: sumantyadav3086@gmail.com

echo "🎬 Welcome to PlayCast Setup!"
echo "Created by Sumant Yadav"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p .compose/HLS
mkdir -p .compose/videos
mkdir -p .compose/encoder
mkdir -p .compose/letsencrypt

echo "✅ Directories created"

# Start the services
echo "🚀 Starting PlayCast services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ PlayCast is now running!"
    echo ""
    echo "🎉 Setup Complete!"
    echo "=================================="
    echo "🌐 Access your PlayCast platform:"
    echo "   Main site: http://localhost"
    echo "   Admin panel: http://localhost/admin"
    echo ""
    echo "🔑 Admin credentials:"
    echo "   Username: admin"
    echo "   Password: playcast2024"
    echo ""
    echo "📧 Contact: sumantyadav3086@gmail.com"
    echo "👨‍💻 Developer: Sumant Yadav"
    echo ""
    echo "📚 For more information, check the README.md file"
else
    echo "❌ Some services failed to start. Check the logs with:"
    echo "   docker-compose logs"
fi
