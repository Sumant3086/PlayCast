const express = require('express');
const { body, validationResult } = require('express-validator');
const Playlist = require('../models/Playlist');
const Video = require('../models/Video');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/playlists
// @desc    Create playlist
// @access  Private
router.post('/', auth, [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required (max 100 chars)'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Description too long'),
  body('visibility').optional().isIn(['public', 'private', 'unlisted'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, visibility } = req.body;

    const playlist = new Playlist({
      title,
      description,
      ownerId: req.user._id,
      visibility: visibility || 'public'
    });

    await playlist.save();

    res.status(201).json({
      message: 'Playlist created successfully',
      playlist
    });
  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/playlists/user/:userId
// @desc    Get user's playlists
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const playlists = await Playlist.find({
      ownerId: req.params.userId,
      visibility: { $in: ['public', 'unlisted'] }
    })
    .populate('ownerId', 'name avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Playlist.countDocuments({
      ownerId: req.params.userId,
      visibility: { $in: ['public', 'unlisted'] }
    });

    res.json({
      playlists,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Get user playlists error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/playlists/:id
// @desc    Get playlist by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('ownerId', 'name avatar')
      .populate({
        path: 'videos.video',
        populate: {
          path: 'ownerId',
          select: 'name avatar'
        }
      });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json({ playlist });
  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/playlists/:id/videos
// @desc    Add video to playlist
// @access  Private
router.post('/:id/videos', auth, [
  body('videoId').isMongoId().withMessage('Valid video ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Check if user owns the playlist
    if (playlist.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const video = await Video.findById(req.body.videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await playlist.addVideo(req.body.videoId);

    res.json({ message: 'Video added to playlist' });
  } catch (error) {
    console.error('Add video to playlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;