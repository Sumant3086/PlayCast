@echo off
REM PlayCast Setup Script for Windows
REM Created by Sumant Yadav
REM Email: sumantyadav3086@gmail.com

echo 🎬 Welcome to PlayCast Setup!
echo Created by Sumant Yadav
echo ==================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    echo Visit: https://docs.docker.com/desktop/install/windows/
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    echo Visit: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy env.example .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist .compose mkdir .compose
if not exist .compose\HLS mkdir .compose\HLS
if not exist .compose\videos mkdir .compose\videos
if not exist .compose\encoder mkdir .compose\encoder
if not exist .compose\letsencrypt mkdir .compose\letsencrypt

echo ✅ Directories created

REM Start the services
echo 🚀 Starting PlayCast services...
docker-compose up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 30 /nobreak >nul

REM Check if services are running
docker-compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo ✅ PlayCast is now running!
    echo.
    echo 🎉 Setup Complete!
    echo ==================================
    echo 🌐 Access your PlayCast platform:
    echo    Main site: http://localhost
    echo    Admin panel: http://localhost/admin
    echo.
    echo 🔑 Admin credentials:
    echo    Username: admin
    echo    Password: playcast2024
    echo.
    echo 📧 Contact: sumantyadav3086@gmail.com
    echo 👨‍💻 Developer: Sumant Yadav
    echo.
    echo 📚 For more information, check the README.md file
) else (
    echo ❌ Some services failed to start. Check the logs with:
    echo    docker-compose logs
)

pause
