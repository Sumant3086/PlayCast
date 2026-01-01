const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const youtubeService = require('../services/youtubeService');
const YouTubeVideo = require('../models/YouTubeVideo');
const User = require('../models/User');
const logger = require('../utils/logger');

// @route   GET /api/youtube/search
// @desc    Search YouTube videos
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const {
      q: query,
      maxResults = 25,
      order = 'relevance',
      videoDuration = 'any',
      pageToken
    } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Check quota before making API call
    if (!youtubeService.canMakeApiCall(100)) {
      return res.status(429).json({ 
        message: 'YouTube API quota exceeded. Please try again later.',
        quota: youtubeService.getQuotaUsage()
      });
    }

    const results = await youtubeService.searchVideos(query, {
      maxResults: Math.min(maxResults, 50),
      order,
      videoDuration,
      pageToken
    });

    // Get detailed information for the videos
    const videoIds = results.videos.map(video => video.id.videoId).filter(Boolean);
    
    if (videoIds.length > 0) {
      const detailedVideos = await youtubeService.getMultipleVideoDetails(videoIds);
      
      // Format videos for our platform
      const formattedVideos = detailedVideos.map(video => 
        youtubeService.formatVideoData(video)
      );

      res.json({
        videos: formattedVideos,
        pagination: {
          nextPageToken: results.nextPageToken,
          prevPageToken: results.prevPageToken,
          totalResults: results.totalResults
        },
        quota: youtubeService.getQuotaUsage()
      });
    } else {
      res.json({
        videos: [],
        pagination: {
          totalResults: 0
        },
        quota: youtubeService.getQuotaUsage()
      });
    }
  } catch (error) {
    logger.error('YouTube search error:', error);
    res.status(500).json({ message: 'Failed to search YouTube videos' });
  }
});

// @route   GET /api/youtube/trending
// @desc    Get trending YouTube videos
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const { regionCode = 'US', categoryId, maxResults = 25 } = req.query;

    // Check quota before making API call
    if (!youtubeService.canMakeApiCall(1)) {
      return res.status(429).json({ 
        message: 'YouTube API quota exceeded. Please try again later.',
        quota: youtubeService.getQuotaUsage()
      });
    }

    const trendingVideos = await youtubeService.getTrendingVideos(regionCode, categoryId);
    
    // Format videos for our platform
    const formattedVideos = trendingVideos.slice(0, maxResults).map(video => 
      youtubeService.formatVideoData(video)
    );

    res.json({
      videos: formattedVideos,
      quota: youtubeService.getQuotaUsage()
    });
  } catch (error) {
    logger.error('YouTube trending error:', error);
    res.status(500).json({ message: 'Failed to get trending videos' });
  }
});

// @route   POST /api/youtube/add
// @desc    Add YouTube video to our platform
// @access  Private
router.post('/add', auth, async (req, res) => {
  try {
    const { youtubeUrl, youtubeId } = req.body;
    let videoId = youtubeId;

    // Extract video ID from URL if provided
    if (youtubeUrl && !videoId) {
      videoId = youtubeService.extractVideoId(youtubeUrl);
    }

    if (!videoId) {
      return res.status(400).json({ message: 'Valid YouTube URL or video ID is required' });
    }

    // Check if video already exists in our database
    let existingVideo = await YouTubeVideo.findOne({ youtubeId: videoId });
    
    if (existingVideo) {
      // Update view count and return existing video
      await existingVideo.incrementViews();
      return res.json({
        message: 'Video already exists in our platform',
        video: existingVideo
      });
    }

    // Check quota before making API call
    if (!youtubeService.canMakeApiCall(1)) {
      return res.status(429).json({ 
        message: 'YouTube API quota exceeded. Please try again later.',
        quota: youtubeService.getQuotaUsage()
      });
    }

    // Get video details from YouTube
    const youtubeVideo = await youtubeService.getVideoDetails(videoId);
    
    // Format and save to our database
    const videoData = youtubeService.formatVideoData(youtubeVideo, req.user.id);
    const newVideo = new YouTubeVideo(videoData);
    await newVideo.save();

    // Add to user's watch history
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        watchHistory: {
          videoId: newVideo._id,
          videoType: 'youtube',
          watchedAt: new Date(),
          progress: 0
        }
      }
    });

    res.status(201).json({
      message: 'YouTube video added successfully',
      video: newVideo
    });
  } catch (error) {
    logger.error('Add YouTube video error:', error);
    res.status(500).json({ message: 'Failed to add YouTube video' });
  }
});

// @route   GET /api/youtube/video/:id
// @desc    Get YouTube video details
// @access  Public
router.get('/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // First check our database
    let video = await YouTubeVideo.findOne({ youtubeId: id })
      .populate('addedBy', 'name avatar')
      .populate('comments');

    if (video) {
      // Check if cache is expired
      if (video.isCacheExpired()) {
        // Refresh data from YouTube API
        try {
          if (youtubeService.canMakeApiCall(1)) {
            const youtubeVideo = await youtubeService.getVideoDetails(id);
            const updatedData = youtubeService.formatVideoData(youtubeVideo, video.addedBy);
            
            // Update existing video with fresh data
            Object.assign(video, updatedData);
            video.lastUpdated = new Date();
            video.cacheExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await video.save();
          }
        } catch (error) {
          logger.warn('Failed to refresh YouTube video data:', error.message);
          // Continue with cached data
        }
      }

      // Increment view count
      await video.incrementViews();
      
      return res.json({ video });
    }

    // If not in our database, fetch from YouTube API
    if (!youtubeService.canMakeApiCall(1)) {
      return res.status(429).json({ 
        message: 'YouTube API quota exceeded. Please try again later.',
        quota: youtubeService.getQuotaUsage()
      });
    }

    const youtubeVideo = await youtubeService.getVideoDetails(id);
    const formattedVideo = youtubeService.formatVideoData(youtubeVideo);

    res.json({ video: formattedVideo });
  } catch (error) {
    logger.error('Get YouTube video error:', error);
    res.status(500).json({ message: 'Failed to get video details' });
  }
});

// @route   POST /api/youtube/video/:id/like
// @desc    Like/unlike YouTube video
// @access  Private
router.post('/video/:id/like', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    let video = await YouTubeVideo.findOne({ youtubeId: id });
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const existingLike = video.likes.find(like => like.user.equals(req.user.id));
    
    if (existingLike) {
      // Remove like
      await video.removeLikeDislike(req.user.id);
      res.json({ 
        message: 'Like removed',
        liked: false,
        likeCount: video.likeCount
      });
    } else {
      // Add like
      await video.addLike(req.user.id);
      res.json({ 
        message: 'Video liked',
        liked: true,
        likeCount: video.likeCount
      });
    }
  } catch (error) {
    logger.error('Like YouTube video error:', error);
    res.status(500).json({ message: 'Failed to like video' });
  }
});

// @route   GET /api/youtube/channel/:id
// @desc    Get YouTube channel details
// @access  Public
router.get('/channel/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check quota before making API call
    if (!youtubeService.canMakeApiCall(1)) {
      return res.status(429).json({ 
        message: 'YouTube API quota exceeded. Please try again later.',
        quota: youtubeService.getQuotaUsage()
      });
    }

    const channel = await youtubeService.getChannelDetails(id);
    
    // Get videos from this channel in our database
    const channelVideos = await YouTubeVideo.find({ channelId: id })
      .sort({ publishedAt: -1 })
      .limit(20);

    res.json({
      channel,
      videos: channelVideos,
      quota: youtubeService.getQuotaUsage()
    });
  } catch (error) {
    logger.error('Get YouTube channel error:', error);
    res.status(500).json({ message: 'Failed to get channel details' });
  }
});

// @route   GET /api/youtube/categories
// @desc    Get YouTube video categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const { regionCode = 'US' } = req.query;

    // Check quota before making API call
    if (!youtubeService.canMakeApiCall(1)) {
      return res.status(429).json({ 
        message: 'YouTube API quota exceeded. Please try again later.',
        quota: youtubeService.getQuotaUsage()
      });
    }

    const categories = await youtubeService.getVideoCategories(regionCode);
    
    res.json({
      categories,
      quota: youtubeService.getQuotaUsage()
    });
  } catch (error) {
    logger.error('Get YouTube categories error:', error);
    res.status(500).json({ message: 'Failed to get video categories' });
  }
});

// @route   GET /api/youtube/quota
// @desc    Get current API quota usage
// @access  Private (Admin only)
router.get('/quota', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const quota = youtubeService.getQuotaUsage();
    res.json({ quota });
  } catch (error) {
    logger.error('Get quota error:', error);
    res.status(500).json({ message: 'Failed to get quota information' });
  }
});

// @route   POST /api/youtube/quota/reset
// @desc    Reset API quota (for testing)
// @access  Private (Admin only)
router.post('/quota/reset', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    youtubeService.resetQuota();
    res.json({ message: 'Quota reset successfully' });
  } catch (error) {
    logger.error('Reset quota error:', error);
    res.status(500).json({ message: 'Failed to reset quota' });
  }
});

// @route   GET /api/youtube/my-videos
// @desc    Get YouTube videos added by current user
// @access  Private
router.get('/my-videos', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const videos = await YouTubeVideo.find({ addedBy: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('addedBy', 'name avatar');

    const total = await YouTubeVideo.countDocuments({ addedBy: req.user.id });

    res.json({
      videos,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    logger.error('Get my YouTube videos error:', error);
    res.status(500).json({ message: 'Failed to get your videos' });
  }
});

module.exports = router;