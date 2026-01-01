const axios = require('axios');
const logger = require('../utils/logger');

class YouTubeService {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.baseURL = 'https://www.googleapis.com/youtube/v3';
    this.quotaLimit = 10000; // Daily quota limit
    this.quotaUsed = 0;
  }

  /**
   * Search YouTube videos
   */
  async searchVideos(query, options = {}) {
    try {
      const {
        maxResults = 25,
        order = 'relevance',
        type = 'video',
        videoDuration = 'any',
        videoDefinition = 'any',
        pageToken = null
      } = options;

      const params = {
        part: 'snippet',
        q: query,
        type,
        maxResults,
        order,
        videoDuration,
        videoDefinition,
        key: this.apiKey
      };

      if (pageToken) {
        params.pageToken = pageToken;
      }

      const response = await axios.get(`${this.baseURL}/search`, { params });
      
      // Update quota usage (search costs 100 units)
      this.quotaUsed += 100;
      
      return {
        videos: response.data.items,
        nextPageToken: response.data.nextPageToken,
        prevPageToken: response.data.prevPageToken,
        totalResults: response.data.pageInfo.totalResults
      };
    } catch (error) {
      logger.error('YouTube search error:', error.response?.data || error.message);
      throw new Error('Failed to search YouTube videos');
    }
  }

  /**
   * Get video details by ID
   */
  async getVideoDetails(videoId) {
    try {
      const params = {
        part: 'snippet,contentDetails,statistics,status',
        id: videoId,
        key: this.apiKey
      };

      const response = await axios.get(`${this.baseURL}/videos`, { params });
      
      // Update quota usage (videos costs 1 unit)
      this.quotaUsed += 1;

      if (response.data.items.length === 0) {
        throw new Error('Video not found');
      }

      return response.data.items[0];
    } catch (error) {
      logger.error('YouTube video details error:', error.response?.data || error.message);
      throw new Error('Failed to get video details');
    }
  }

  /**
   * Get multiple video details
   */
  async getMultipleVideoDetails(videoIds) {
    try {
      const params = {
        part: 'snippet,contentDetails,statistics,status',
        id: videoIds.join(','),
        key: this.apiKey
      };

      const response = await axios.get(`${this.baseURL}/videos`, { params });
      
      // Update quota usage
      this.quotaUsed += 1;

      return response.data.items;
    } catch (error) {
      logger.error('YouTube multiple videos error:', error.response?.data || error.message);
      throw new Error('Failed to get video details');
    }
  }

  /**
   * Get trending videos
   */
  async getTrendingVideos(regionCode = 'US', categoryId = null) {
    try {
      const params = {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode,
        maxResults: 50,
        key: this.apiKey
      };

      if (categoryId) {
        params.videoCategoryId = categoryId;
      }

      const response = await axios.get(`${this.baseURL}/videos`, { params });
      
      // Update quota usage
      this.quotaUsed += 1;

      return response.data.items;
    } catch (error) {
      logger.error('YouTube trending error:', error.response?.data || error.message);
      throw new Error('Failed to get trending videos');
    }
  }

  /**
   * Get channel details
   */
  async getChannelDetails(channelId) {
    try {
      const params = {
        part: 'snippet,statistics,brandingSettings',
        id: channelId,
        key: this.apiKey
      };

      const response = await axios.get(`${this.baseURL}/channels`, { params });
      
      // Update quota usage
      this.quotaUsed += 1;

      if (response.data.items.length === 0) {
        throw new Error('Channel not found');
      }

      return response.data.items[0];
    } catch (error) {
      logger.error('YouTube channel error:', error.response?.data || error.message);
      throw new Error('Failed to get channel details');
    }
  }

  /**
   * Get video categories
   */
  async getVideoCategories(regionCode = 'US') {
    try {
      const params = {
        part: 'snippet',
        regionCode,
        key: this.apiKey
      };

      const response = await axios.get(`${this.baseURL}/videoCategories`, { params });
      
      // Update quota usage
      this.quotaUsed += 1;

      return response.data.items;
    } catch (error) {
      logger.error('YouTube categories error:', error.response?.data || error.message);
      throw new Error('Failed to get video categories');
    }
  }

  /**
   * Parse YouTube URL to get video ID
   */
  extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Convert YouTube duration to seconds
   */
  parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Format video data for our platform
   */
  formatVideoData(youtubeVideo, addedBy = null) {
    const snippet = youtubeVideo.snippet;
    const contentDetails = youtubeVideo.contentDetails;
    const statistics = youtubeVideo.statistics;

    return {
      youtubeId: youtubeVideo.id,
      videoType: 'youtube',
      title: snippet.title,
      description: snippet.description,
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      thumbnails: {
        default: snippet.thumbnails.default?.url,
        medium: snippet.thumbnails.medium?.url,
        high: snippet.thumbnails.high?.url,
        maxres: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url
      },
      duration: this.parseDuration(contentDetails.duration),
      publishedAt: new Date(snippet.publishedAt),
      tags: snippet.tags || [],
      categoryId: snippet.categoryId,
      
      // YouTube statistics
      youtubeStats: {
        viewCount: parseInt(statistics.viewCount) || 0,
        likeCount: parseInt(statistics.likeCount) || 0,
        commentCount: parseInt(statistics.commentCount) || 0
      },
      
      // Our platform data
      addedBy,
      views: 0,
      likes: [],
      comments: [],
      
      // Cache control
      lastUpdated: new Date(),
      cacheExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      
      createdAt: new Date()
    };
  }

  /**
   * Check quota usage
   */
  getQuotaUsage() {
    return {
      used: this.quotaUsed,
      limit: this.quotaLimit,
      remaining: this.quotaLimit - this.quotaUsed,
      percentage: (this.quotaUsed / this.quotaLimit) * 100
    };
  }

  /**
   * Reset daily quota (call this daily)
   */
  resetQuota() {
    this.quotaUsed = 0;
    logger.info('YouTube API quota reset');
  }

  /**
   * Check if we can make API calls
   */
  canMakeApiCall(cost = 1) {
    return (this.quotaUsed + cost) <= this.quotaLimit;
  }
}

module.exports = new YouTubeService();