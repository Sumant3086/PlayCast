# PlayCast - Personal Video Streaming Platform

> **Created by Sumant Yadav**  
> **Contact: sumantyadav3086@gmail.com**

I thank God for graciously, through His mercy, giving me all the necessary knowledge acquired throughout my life and throughout the development of this project. It is only through His grace and provision that this was possible, and I am truly grateful for His presence every step of the way.

> **For of Him, and through Him, and to Him, are all things: to whom be glory forever. Amen.**  
> `Apostle Paul in Romans 11:36`

<p align="center">
  <img src="https://avideo.tube/website/assets/151/images/avideo_platform.png"/>
</p>

## Introduction to PlayCast

PlayCast is a personalized video streaming platform built on the robust AVideo framework, tailored for individual content creators, businesses, and developers alike. It stands out with its comprehensive suite of features that enable users to host, manage, and monetize video content with remarkable efficiency. This platform has been customized for Sumant Yadav's personal use and can be further tailored to meet specific requirements.

## 🌟 Key Features of PlayCast

1. **🔒 Advanced Security & Content Protection**: Safeguard your video content with PlayCast's [encrypted HLS streaming](https://github.com/WWBN/AVideo/wiki/VideoHLS-Plugin), protecting both on-demand and live streams. Encryption keys are securely managed to ensure only authorized players can access your content, offering a strong defense against unauthorized access.

2. **📡 Secure Livestreaming with Recording**: Host live events with confidence using PlayCast's [secure livestreaming](https://github.com/WWBN/AVideo/wiki/How-to-make-a-live-stream) capabilities, backed by encrypted HLS protection. Engage viewers in real-time, record live streams for future access, and enhance interaction through integrated [chat features](https://github.com/WWBN/AVideo/wiki/Chat2-Plugin) for a more immersive experience.

3. **🔄 Restreaming & Multi-Platform Broadcasting**: Extend your livestream's reach by rebroadcasting content across multiple platforms simultaneously. [Restreaming capabilities](https://github.com/WWBN/AVideo/wiki/Live-Plugin#restream) make it easy to connect with audiences wherever they are.

4. **📋 User-Generated Channels & Playlists**: Empower users to create custom channels and playlists, helping organize and promote thematic content curation. Boost engagement and community-building by letting viewers personalize their viewing experience.

5. **💰 Monetization Options**: Maximize revenue with PlayCast's flexible [subscription](https://github.com/WWBN/AVideo/wiki/Subscription-Plugin) and [Pay-Per-View](https://github.com/WWBN/AVideo/wiki/PayPerView-Plugin) options. Expand monetization opportunities, allowing users to support premium content and exclusive live events.

6. **📢 Ad Integration & Promotion**: Increase revenue with targeted [video ad placements](https://github.com/WWBN/AVideo/wiki/Ad-Server-Plugin) and support for [VAST and VMAP ads](https://github.com/WWBN/AVideo/wiki/Plugin:-GoogleAds_IMA---Videos-Ads-on-your-page), enhancing your platform's profitability and reach.

7. **☁️ Scalable Cloud Storage**: Rely on secure and scalable storage solutions with options like S3, B2, FTP, and more, ensuring seamless video delivery even during high traffic peaks. [Learn More](https://github.com/WWBN/AVideo/wiki/Storage-Options).

8. **🔗 Third-Party Integration & API**: Extend platform capabilities by connecting third-party apps with PlayCast's [API](https://github.com/WWBN/AVideo/wiki/AVideo-Platform-API), offering flexibility for tailored integrations and custom development.

9. **📥 Offline Viewing & Secure Downloads**: Allow viewers to download and watch videos offline with PlayCast's [offline video saving](https://github.com/WWBN/AVideo/wiki/VideoOffline-Plugin) feature, while maintaining strict [content protection](https://github.com/WWBN/AVideo/wiki/VideoHLS-Plugin#download-protection) to prevent unauthorized distribution. 

## Your Comprehensive Video Streaming Solution

At PlayCast, we provide more than just a platform; we offer a comprehensive solution for hosting, managing, monetizing, and expanding your video content. Embrace the future of video streaming and unlock the full potential of your content with PlayCast.

## 📚 How PlayCast is Organized

PlayCast is a comprehensive platform, divided into three key components:

- **Streamer**: The core component for playing and managing videos. It acts as the main interface for users to interact with video content.
- **Encoder**: This tool converts your videos into a web-compatible format, ensuring they are ready for streaming on various devices and platforms.
- **Live Server**: Specifically designed for broadcasting live videos, this component is essential for real-time streaming capabilities.

## 🔍 Why Do I Need the Encoder?

Installing your own encoder can be beneficial for several reasons:

- **Faster Performance**: Having your own encoder might provide faster processing compared to using a public encoder server.
- **Privacy**: If privacy in video processing is a concern, a private encoder ensures that your content remains confidential.
- **Network Compatibility**: In cases where your server is on a private network without a public IP address or uses an IP within specific ranges (10.0.0.0/8, 127.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), having your own encoder is essential for proper communication with the streamer site.

## 📜 Agreement on the Purpose of Software Installation

PlayCast is dedicated to promoting positive and ethical content creation. As such, we firmly stipulate that:

- This Software must be used for Good, never for Evil.
- The creation of content related to sexually explicit material, pornography, or adult themes using this software is strictly prohibited.
- Any such usage is against the values and principles of our platform and is not permitted under any circumstances.

## 🖥️ Server Requirements

Ensure your server meets the following prerequisites to run the PlayCast Platform efficiently. All required tools are freely available.

[![Minimum PHP Version](https://img.shields.io/badge/PHP-8.0%2B-blue)](https://php.net/) - **PHP**: Version 8.0 or higher is required for optimal performance and security.

[![Minimum MySQL Version](https://img.shields.io/badge/MySQL-5.0%2B-blue)](https://www.mysql.com/) - **MySQL**: PlayCast requires MySQL version 5.0 or higher to manage its databases effectively.

[![Minimum Apache Version](https://img.shields.io/badge/Apache-2.x%20%28mod__rewrite%29-blue)](https://httpd.apache.org/) - **Apache**: Utilize Apache web server version 2.x with mod_rewrite module enabled for URL rewriting capabilities.

For an in-depth look at the hardware requirements and additional server configurations, please visit our comprehensive guide: [AVideo Platform Hardware Requirements](https://github.com/WWBN/AVideo/wiki/AVideo-Platform-Hardware-Requirements).

## 🚀 Quick Start for PlayCast

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB RAM and 2 CPU cores
- 20GB free disk space

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sumant3086/PlayCast
   cd playcast
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env
   ```

3. **Start the services:**
   ```bash
   docker-compose up -d
   ```

4. **Access your platform:**
   - Main site: http://localhost
   - Admin panel: http://localhost/admin
   - Admin credentials: admin / playcast2024

### Default Configuration
- **Website Title**: PlayCast
- **Admin Email**: sumantyadav3086@gmail.com
- **Database**: playcast (user: playcast, password: playcast123)
- **Admin Password**: playcast2024

## 📘 Usage

For comprehensive administrative guidance, refer to the [Admin Manual](https://github.com/WWBN/AVideo/wiki/Admin-manual). This resource provides detailed instructions on how to manage and optimize your PlayCast platform effectively.

## 🛠️ Errors and Troubleshooting

Encountered an issue? Don't worry! Our [error identification guide](https://github.com/WWBN/AVideo/wiki/How-to-find-errors-on-AVideo-Platform) is designed to help you troubleshoot and resolve common problems efficiently.

## 📞 Support

For support and questions about your PlayCast installation:
- **Email**: sumantyadav3086@gmail.com
- **Developer**: Sumant Yadav

---

**PlayCast** - Your Personal Video Streaming Platform  
**Created with ❤️ by Sumant Yadav**
