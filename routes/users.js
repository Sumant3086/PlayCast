const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Video = require('../models/Video');
const Playlist = require('../models/Playlist');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/:id
// @desc    Get user by ID (public profile)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-passwordHash -resetPasswordToken -resetPasswordExpires')
      .populate('subscribers', 'name avatar');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id/videos
// @desc    Get user's videos
// @access  Public
router.get('/:id/videos', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ 
      ownerId: req.params.id, 
      status: 'ready',
      visibility: { $in: ['public', 'unlisted'] }
    })
    .populate('ownerId', 'name avatar')
    .select('title description thumbnails views duration createdAt ownerId category')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Video.countDocuments({
      ownerId: req.params.id,
      status: 'ready',
      visibility: { $in: ['public', 'unlisted'] }
    });

    res.json({
      videos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get user videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/profile/:id
// @desc    Get user profile
// @access  Public
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-passwordHash -resetPasswordToken -resetPasswordExpires')
      .populate('subscriptions', 'name avatar')
      .populate('subscribers', 'name avatar');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's public videos
    const videos = await Video.find({ 
      ownerId: user._id, 
      status: 'ready',
      visibility: { $in: ['public', 'unlisted'] }
    })
    .select('title thumbnails views createdAt duration')
    .sort({ createdAt: -1 })
    .limit(12);

    // Get user's public playlists
    const playlists = await Playlist.find({
      ownerId: user._id,
      visibility: { $in: ['public', 'unlisted'] }
    })
    .select('title thumbnail videoCount createdAt')
    .sort({ createdAt: -1 })
    .limit(6);

    res.json({
      user,
      videos,
      playlists,
      stats: {
        videoCount: videos.length,
        subscriberCount: user.subscribers.length,
        subscriptionCount: user.subscriptions.length
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('email').optional().isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email && email !== user.email) {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    await user.save();

    res.json({ 
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/subscribe/:id
// @desc    Subscribe/unsubscribe to user
// @access  Private
router.post('/subscribe/:id', auth, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ message: 'Cannot subscribe to yourself' });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = await User.findById(currentUserId);

    // Check if already subscribed
    const isSubscribed = currentUser.subscriptions.includes(targetUserId);

    if (isSubscribed) {
      // Unsubscribe
      currentUser.subscriptions = currentUser.subscriptions.filter(
        id => id.toString() !== targetUserId
      );
      targetUser.subscribers = targetUser.subscribers.filter(
        id => id.toString() !== currentUserId.toString()
      );
      
      await Promise.all([currentUser.save(), targetUser.save()]);
      
      res.json({ message: 'Unsubscribed successfully', subscribed: false });
    } else {
      // Subscribe
      currentUser.subscriptions.push(targetUserId);
      targetUser.subscribers.push(currentUserId);
      
      await Promise.all([currentUser.save(), targetUser.save()]);
      
      res.json({ message: 'Subscribed successfully', subscribed: true });
    }
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/subscriptions
// @desc    Get user's subscriptions
// @access  Private
router.get('/subscriptions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('subscriptions', 'name avatar subscribers')
      .select('subscriptions');

    res.json({ subscriptions: user.subscriptions });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/watch-history
// @desc    Get user's watch history
// @access  Private
router.get('/watch-history', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id)
      .populate({
        path: 'watchHistory.video',
        populate: {
          path: 'ownerId',
          select: 'name avatar'
        },
        select: 'title thumbnails duration views ownerId'
      })
      .select('watchHistory');

    // Filter out deleted videos and sort by watch date
    const validHistory = user.watchHistory
      .filter(item => item.video)
      .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
      .slice(skip, skip + limit);

    res.json({
      history: validHistory,
      pagination: {
        page,
        limit,
        total: user.watchHistory.length
      }
    });
  } catch (error) {
    console.error('Get watch history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/watch-history/:videoId
// @desc    Add video to watch history
// @access  Private
router.post('/watch-history/:videoId', auth, async (req, res) => {
  try {
    const { progress } = req.body;
    const videoId = req.params.videoId;

    const user = await User.findById(req.user._id);
    
    // Remove existing entry if exists
    user.watchHistory = user.watchHistory.filter(
      item => item.video.toString() !== videoId
    );

    // Add new entry at the beginning
    user.watchHistory.unshift({
      video: videoId,
      progress: progress || 0,
      watchedAt: new Date()
    });

    // Keep only last 100 entries
    if (user.watchHistory.length > 100) {
      user.watchHistory = user.watchHistory.slice(0, 100);
    }

    await user.save();

    res.json({ message: 'Added to watch history' });
  } catch (error) {
    console.error('Add to watch history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/liked-videos
// @desc    Get user's liked videos
// @access  Private
router.get('/liked-videos', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id)
      .populate({
        path: 'likedVideos',
        populate: {
          path: 'ownerId',
          select: 'name avatar'
        },
        select: 'title thumbnails duration views ownerId createdAt'
      })
      .select('likedVideos');

    const likedVideos = user.likedVideos
      .filter(video => video) // Filter out deleted videos
      .slice(skip, skip + limit);

    res.json({
      videos: likedVideos,
      pagination: {
        page,
        limit,
        total: user.likedVideos.length
      }
    });
  } catch (error) {
    console.error('Get liked videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;