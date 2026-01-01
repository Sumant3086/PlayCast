const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { body, validationResult } = require('express-validator');
const Video = require('../models/Video');
const { auth, optionalAuth, videoOwnerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/raw');
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${req.user._id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only video files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 // 2GB limit
  }
});

// @route   POST /api/videos/upload
// @desc    Upload video
// @access  Private
router.post('/upload', auth, upload.single('video'), [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required (max 100 chars)'),
  body('description').optional().isLength({ max: 5000 }).withMessage('Description too long (max 5000 chars)'),
  body('visibility').optional().isIn(['public', 'private', 'unlisted']).withMessage('Invalid visibility')
], async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('User:', req.user ? req.user._id : 'No user');
    console.log('File:', req.file ? req.file.filename : 'No file');
    console.log('Body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const { title, description, tags, visibility, category } = req.body;

    // Parse tags if they're a string
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        console.log('Tags parsing error:', e);
        parsedTags = [];
      }
    }

    console.log('Creating video document...');

    // Create video document
    const video = new Video({
      title,
      description: description || '',
      tags: parsedTags,
      ownerId: req.user._id,
      visibility: visibility || 'public',
      category: category || 'other',
      originalFile: {
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path
      },
      status: 'ready', // Set to ready immediately for now
      metadata: {
        duration: 0, // Will be updated when processing is implemented
        resolution: { width: 1920, height: 1080 }, // Default resolution
        bitrate: 0,
        fps: 30
      },
      // Add a default thumbnail path
      thumbnails: [{
        quality: 'medium',
        path: `/thumbnails/default-thumbnail.svg`,
        timestamp: 0
      }]
    });

    await video.save();
    console.log('Video saved successfully:', video._id);

    // TODO: Add video to processing queue
    // processVideoQueue.add('process-video', { videoId: video._id });

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: {
        id: video._id,
        title: video.title,
        status: video.status,
        processingProgress: video.processingProgress
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Upload failed',
      error: error.message 
    });
  }
});

// @route   GET /api/videos
// @desc    Get videos (public feed)
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const sort = req.query.sort || 'createdAt';

    let query = { status: 'ready', visibility: 'public' };
    if (category && category !== 'all') {
      query.category = category;
    }

    let sortOption = {};
    switch (sort) {
      case 'views':
        sortOption = { views: -1 };
        break;
      case 'likes':
        sortOption = { 'likes.length': -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const videos = await Video.find(query)
      .populate('ownerId', 'name avatar')
      .select('-originalFile -processedFiles.resolutions')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments(query);

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
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/videos/:id
// @desc    Get single video
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('ownerId', 'name avatar subscribers')
      .populate('comments.user', 'name avatar')
      .populate('comments.replies.user', 'name avatar');

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if user can view private video
    if (video.visibility === 'private' && 
        (!req.user || video.ownerId._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'Video is private' });
    }

    // Increment views (only if not owner)
    if (!req.user || video.ownerId._id.toString() !== req.user._id.toString()) {
      await video.incrementViews();
    }

    res.json({ video });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/videos/:id
// @desc    Update video
// @access  Private (owner only)
router.put('/:id', auth, videoOwnerOrAdmin, [
  body('title').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().isLength({ max: 5000 }),
  body('tags').optional().isArray(),
  body('visibility').optional().isIn(['public', 'private', 'unlisted'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tags, visibility, category } = req.body;
    const video = req.video;

    if (title) video.title = title;
    if (description !== undefined) video.description = description;
    if (tags) video.tags = tags;
    if (visibility) video.visibility = visibility;
    if (category) video.category = category;

    await video.save();

    res.json({ message: 'Video updated successfully', video });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/videos/:id
// @desc    Delete video
// @access  Private (owner only)
router.delete('/:id', auth, videoOwnerOrAdmin, async (req, res) => {
  try {
    const video = req.video;

    // Delete video files from storage
    const fs = require('fs').promises;
    try {
      if (video.originalFile?.path) {
        await fs.unlink(video.originalFile.path);
        console.log('Deleted original file:', video.originalFile.path);
      }
    } catch (fileError) {
      console.warn('Could not delete video file:', fileError.message);
    }

    // Delete from database
    await Video.findByIdAndDelete(video._id);

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/videos/:id/like
// @desc    Like/unlike video
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const existingLike = video.likes.find(like => 
      like.user.toString() === req.user._id.toString()
    );

    if (existingLike) {
      await video.removeLike(req.user._id);
      res.json({ message: 'Video unliked', liked: false });
    } else {
      await video.addLike(req.user._id);
      res.json({ message: 'Video liked', liked: true });
    }
  } catch (error) {
    console.error('Like video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/videos/:id/comment
// @desc    Add comment to video
// @access  Private
router.post('/:id/comment', auth, [
  body('comment').trim().isLength({ min: 1, max: 1000 }).withMessage('Comment is required (max 1000 chars)')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const newComment = {
      user: req.user._id,
      comment: req.body.comment
    };

    video.comments.push(newComment);
    await video.save();

    await video.populate('comments.user', 'name avatar');

    res.status(201).json({ 
      message: 'Comment added successfully',
      comment: video.comments[video.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;