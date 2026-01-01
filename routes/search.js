const express = require('express');
const Video = require('../models/Video');
const YouTubeVideo = require('../models/YouTubeVideo');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const youtubeService = require('../services/youtubeService');

const router = express.Router();

// @route   GET /api/search
// @desc    Search videos, users, and playlists
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { q, type = 'all', page = 1, limit = 12 } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchQuery = q.trim();
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const results = {};

    // Search videos (both native and YouTube)
    if (type === 'all' || type === 'videos') {
      // Search native videos
      const nativeVideoQuery = {
        $and: [
          { status: 'ready' },
          { visibility: 'public' },
          {
            $or: [
              { title: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
              { tags: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
          }
        ]
      };

      const nativeVideos = await Video.find(nativeVideoQuery)
        .populate('ownerId', 'name avatar')
        .select('title description thumbnails duration views createdAt ownerId videoType')
        .sort({ views: -1, createdAt: -1 })
        .limit(parseInt(limit) / 2); // Split results between native and YouTube

      // Search YouTube videos in our database
      const youtubeVideoQuery = {
        $and: [
          { status: 'active' },
          {
            $or: [
              { title: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
              { tags: { $in: [new RegExp(searchQuery, 'i')] } },
              { channelTitle: { $regex: searchQuery, $options: 'i' } }
            ]
          }
        ]
      };

      const youtubeVideos = await YouTubeVideo.find(youtubeVideoQuery)
        .populate('addedBy', 'name avatar')
        .select('youtubeId title description thumbnails duration views createdAt addedBy videoType channelTitle')
        .sort({ views: -1, createdAt: -1 })
        .limit(parseInt(limit) / 2);

      // Combine and sort all videos
      const allVideos = [...nativeVideos, ...youtubeVideos]
        .sort((a, b) => b.views - a.views)
        .slice(skip, skip + parseInt(limit));

      const totalNative = await Video.countDocuments(nativeVideoQuery);
      const totalYouTube = await YouTubeVideo.countDocuments(youtubeVideoQuery);
      const totalVideos = totalNative + totalYouTube;

      results.videos = {
        items: allVideos,
        total: totalVideos,
        pages: Math.ceil(totalVideos / parseInt(limit)),
        breakdown: {
          native: totalNative,
          youtube: totalYouTube
        }
      };
    }

    // Search users
    if (type === 'all' || type === 'users') {
      const userQuery = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } }
        ]
      };

      const users = await User.find(userQuery)
        .select('name avatar subscribers')
        .sort({ 'subscribers.length': -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const userCount = await User.countDocuments(userQuery);

      results.users = {
        items: users,
        total: userCount,
        pages: Math.ceil(userCount / parseInt(limit))
      };
    }

    // Search playlists
    if (type === 'all' || type === 'playlists') {
      const playlistQuery = {
        $and: [
          { visibility: { $in: ['public', 'unlisted'] } },
          {
            $or: [
              { title: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } }
            ]
          }
        ]
      };

      const playlists = await Playlist.find(playlistQuery)
        .populate('ownerId', 'name avatar')
        .select('title description thumbnail videos createdAt ownerId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const playlistCount = await Playlist.countDocuments(playlistQuery);

      results.playlists = {
        items: playlists,
        total: playlistCount,
        pages: Math.ceil(playlistCount / parseInt(limit))
      };
    }

    res.json({
      query: searchQuery,
      results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
});

// @route   GET /api/search/suggestions
// @desc    Get search suggestions
// @access  Public
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.json({ suggestions: [] });
    }

    const searchQuery = q.trim();

    // Get video title suggestions
    const videoSuggestions = await Video.aggregate([
      {
        $match: {
          status: 'ready',
          visibility: 'public',
          title: { $regex: searchQuery, $options: 'i' }
        }
      },
      {
        $project: {
          title: 1,
          views: 1
        }
      },
      {
        $sort: { views: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Get tag suggestions
    const tagSuggestions = await Video.aggregate([
      {
        $match: {
          status: 'ready',
          visibility: 'public',
          tags: { $regex: searchQuery, $options: 'i' }
        }
      },
      {
        $unwind: '$tags'
      },
      {
        $match: {
          tags: { $regex: searchQuery, $options: 'i' }
        }
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 3
      }
    ]);

    const suggestions = [
      ...videoSuggestions.map(v => ({ text: v.title, type: 'video' })),
      ...tagSuggestions.map(t => ({ text: t._id, type: 'tag' }))
    ];

    res.json({ suggestions: suggestions.slice(0, 8) });
  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({ message: 'Failed to get suggestions' });
  }
});

// @route   GET /api/search/trending
// @desc    Get trending videos (both native and YouTube)
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Get videos from last 7 days, sorted by views
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Get native trending videos
    const nativeTrending = await Video.find({
      status: 'ready',
      visibility: 'public',
      createdAt: { $gte: weekAgo }
    })
    .populate('ownerId', 'name avatar')
    .select('title description thumbnails duration views createdAt ownerId videoType')
    .sort({ views: -1, createdAt: -1 })
    .limit(limit / 2);

    // Get YouTube trending videos from our database
    const youtubeTrending = await YouTubeVideo.find({
      status: 'active',
      createdAt: { $gte: weekAgo }
    })
    .populate('addedBy', 'name avatar')
    .select('youtubeId title description thumbnails duration views createdAt addedBy videoType channelTitle')
    .sort({ views: -1, createdAt: -1 })
    .limit(limit / 2);

    // Combine and sort all trending videos
    const allTrending = [...nativeTrending, ...youtubeTrending]
      .sort((a, b) => b.views - a.views)
      .slice(skip, skip + limit);

    const nativeTotal = await Video.countDocuments({
      status: 'ready',
      visibility: 'public',
      createdAt: { $gte: weekAgo }
    });

    const youtubeTotal = await YouTubeVideo.countDocuments({
      status: 'active',
      createdAt: { $gte: weekAgo }
    });

    const total = nativeTotal + youtubeTotal;

    res.json({
      videos: allTrending,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      breakdown: {
        native: nativeTotal,
        youtube: youtubeTotal
      }
    });
  } catch (error) {
    console.error('Get trending error:', error);
    res.status(500).json({ message: 'Failed to get trending videos' });
  }
});

module.exports = router;