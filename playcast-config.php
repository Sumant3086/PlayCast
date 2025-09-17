<?php
/**
 * PlayCast Configuration File
 * Created by Sumant Yadav
 * Email: sumantyadav3086@gmail.com
 * 
 * This file contains the initial configuration for PlayCast
 */

return [
    // Basic Information
    'project_name' => 'PlayCast',
    'developer_name' => 'Sumant Yadav',
    'developer_email' => 'sumantyadav3086@gmail.com',
    'version' => '1.0.0',
    
    // Website Configuration
    'website_title' => 'PlayCast',
    'website_description' => 'Personal Video Streaming Platform by Sumant Yadav',
    'contact_email' => 'sumantyadav3086@gmail.com',
    'main_language' => 'en_US',
    'timezone' => 'Asia/Kolkata',
    
    // Database Configuration
    'database' => [
        'name' => 'playcast',
        'user' => 'playcast',
        'password' => 'playcast123',
        'host' => 'database',
        'port' => 3306
    ],
    
    // Admin Configuration
    'admin' => [
        'username' => 'admin',
        'password' => 'playcast2024',
        'email' => 'sumantyadav3086@gmail.com',
        'first_name' => 'Sumant',
        'last_name' => 'Yadav'
    ],
    
    // Server Configuration
    'server' => [
        'name' => 'localhost',
        'http_port' => 80,
        'https_port' => 443,
        'socket_port' => 2053,
        'nginx_rtmp_port' => 1935,
        'nginx_http_port' => 8080,
        'nginx_https_port' => 8443
    ],
    
    // Features Configuration
    'features' => [
        'live_streaming' => true,
        'user_registration' => true,
        'monetization' => true,
        'social_login' => true,
        'email_notifications' => true,
        'offline_viewing' => true,
        'vr_360_support' => true
    ],
    
    // Storage Configuration
    'storage' => [
        'type' => 'local', // local, s3, b2, ftp
        'local_path' => './.compose/videos',
        'hls_path' => './.compose/HLS',
        'encoder_path' => './.compose/encoder'
    ],
    
    // Security Configuration
    'security' => [
        'encryption_enabled' => true,
        'ssl_enabled' => true,
        'content_protection' => true,
        'download_protection' => true
    ],
    
    // Branding Configuration
    'branding' => [
        'logo_path' => 'view/img/logo.png',
        'favicon_path' => 'view/img/favicon.ico',
        'primary_color' => '#007bff',
        'secondary_color' => '#6c757d',
        'accent_color' => '#28a745'
    ],
    
    // Plugin Configuration
    'plugins' => [
        'enabled' => [
            'API',
            'Live',
            'PayPalYPT',
            'StripeYPT',
            'LoginGoogle',
            'LoginFacebook',
            'VideoHLS',
            'VideoOffline',
            'UserNotifications',
            'Gallery',
            'PlayLists',
            'VideoTags',
            'VideosStatistics'
        ],
        'disabled' => [
            'WWBNIndex', // Disable external indexing
            'SlackNotify',
            'DiscordNotify'
        ]
    ],
    
    // Email Configuration
    'email' => [
        'smtp_host' => 'localhost',
        'smtp_port' => 587,
        'smtp_secure' => 'tls',
        'smtp_username' => '',
        'smtp_password' => '',
        'from_email' => 'sumantyadav3086@gmail.com',
        'from_name' => 'PlayCast - Sumant Yadav'
    ],
    
    // Performance Configuration
    'performance' => [
        'cache_enabled' => true,
        'cdn_enabled' => false,
        'compression_enabled' => true,
        'max_upload_size' => '2GB',
        'video_quality' => 'high'
    ]
];
?>
