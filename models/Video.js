const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 5000
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  status: {
    type: String,
    enum: ['uploading', 'processing', 'ready', 'failed'],
    default: 'uploading'
  },
  originalFile: {
    filename: String,
    size: Number,
    mimetype: String,
    path: String
  },
  processedFiles: {
    master: String, // HLS master playlist
    resolutions: [{
      quality: String, // 360p, 480p, 720p, 1080p
      path: String,
      size: Number
    }]
  },
  thumbnails: [{
    quality: String,
    path: String,
    timestamp: Number // seconds
  }],
  metadata: {
    duration: Number, // seconds
    resolution: {
      width: Number,
      height: Number
    },
    bitrate: Number,
    fps: Number
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    replies: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  category: {
    type: String,
    enum: ['entertainment', 'education', 'music', 'gaming', 'news', 'sports', 'technology', 'other'],
    default: 'other'
  },
  isMonetized: {
    type: Boolean,
    default: false
  },
  processingProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Indexes for better performance
videoSchema.index({ ownerId: 1 });
videoSchema.index({ status: 1 });
videoSchema.index({ visibility: 1 });
videoSchema.index({ createdAt: -1 });
videoSchema.index({ views: -1 });
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual for like count
videoSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
videoSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Method to increment views
videoSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to add like
videoSchema.methods.addLike = function(userId) {
  const existingLike = this.likes.find(like => like.user.toString() === userId.toString());
  if (!existingLike) {
    this.likes.push({ user: userId });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove like
videoSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  return this.save();
};

module.exports = mongoose.model('Video', videoSchema);