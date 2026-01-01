const mongoose = require('mongoose');

const youtubeVideoSchema = new mongoose.Schema({
  youtubeId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  videoType: {
    type: String,
    default: 'youtube',
    enum: ['youtube']
  },
  
  // YouTube Data (cached)
  title: {
    type: String,
    required: true,
    index: 'text'
  },
  description: {
    type: String,
    index: 'text'
  },
  channelId: {
    type: String,
    required: true,
    index: true
  },
  channelTitle: {
    type: String,
    required: true,
    index: true
  },
  thumbnails: {
    default: String,
    medium: String,
    high: String,
    maxres: String
  },
  
  // Video Details
  duration: {
    type: Number, // in seconds
    required: true
  },
  publishedAt: {
    type: Date,
    required: true,
    index: true
  },
  tags: [{
    type: String,
    index: true
  }],
  categoryId: {
    type: String,
    index: true
  },
  
  // YouTube Statistics (cached)
  youtubeStats: {
    viewCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  
  // Our Platform Data
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  views: {
    type: Number,
    default: 0,
    index: true
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  dislikes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  
  // Playlists containing this video
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  }],
  
  // Cache Control
  lastUpdated: {
    type: Date,
    default: Date.now,
    index: true
  },
  cacheExpiry: {
    type: Date,
    required: true,
    index: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'unavailable', 'private', 'deleted'],
    default: 'active',
    index: true
  },
  
  // Analytics
  analytics: {
    dailyViews: [{
      date: Date,
      views: Number
    }],
    totalWatchTime: {
      type: Number,
      default: 0 // in seconds
    },
    averageWatchTime: {
      type: Number,
      default: 0 // in seconds
    },
    engagement: {
      type: Number,
      default: 0 // percentage
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
youtubeVideoSchema.index({ title: 'text', description: 'text', channelTitle: 'text', tags: 'text' });
youtubeVideoSchema.index({ createdAt: -1 });
youtubeVideoSchema.index({ views: -1 });
youtubeVideoSchema.index({ publishedAt: -1 });
youtubeVideoSchema.index({ 'likes.user': 1 });
youtubeVideoSchema.index({ addedBy: 1, createdAt: -1 });
youtubeVideoSchema.index({ channelId: 1, publishedAt: -1 });
youtubeVideoSchema.index({ categoryId: 1, views: -1 });
youtubeVideoSchema.index({ cacheExpiry: 1 }); // For cleanup

// Virtual for like count
youtubeVideoSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for dislike count
youtubeVideoSchema.virtual('dislikeCount').get(function() {
  return this.dislikes ? this.dislikes.length : 0;
});

// Virtual for comment count
youtubeVideoSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Virtual for engagement rate
youtubeVideoSchema.virtual('engagementRate').get(function() {
  if (this.views === 0) return 0;
  const totalEngagement = this.likeCount + this.dislikeCount + this.commentCount;
  return (totalEngagement / this.views) * 100;
});

// Virtual for YouTube URL
youtubeVideoSchema.virtual('youtubeUrl').get(function() {
  return `https://www.youtube.com/watch?v=${this.youtubeId}`;
});

// Virtual for embed URL
youtubeVideoSchema.virtual('embedUrl').get(function() {
  return `https://www.youtube.com/embed/${this.youtubeId}`;
});

// Virtual for formatted duration
youtubeVideoSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.duration / 3600);
  const minutes = Math.floor((this.duration % 3600) / 60);
  const seconds = this.duration % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Method to check if cache is expired
youtubeVideoSchema.methods.isCacheExpired = function() {
  return new Date() > this.cacheExpiry;
};

// Method to increment view count
youtubeVideoSchema.methods.incrementViews = async function() {
  this.views += 1;
  
  // Update daily analytics
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dailyView = this.analytics.dailyViews.find(
    dv => dv.date.getTime() === today.getTime()
  );
  
  if (dailyView) {
    dailyView.views += 1;
  } else {
    this.analytics.dailyViews.push({
      date: today,
      views: 1
    });
  }
  
  // Keep only last 30 days
  this.analytics.dailyViews = this.analytics.dailyViews
    .filter(dv => dv.date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .sort((a, b) => b.date - a.date);
  
  await this.save();
};

// Method to add like
youtubeVideoSchema.methods.addLike = async function(userId) {
  // Remove existing like/dislike
  this.likes = this.likes.filter(like => !like.user.equals(userId));
  this.dislikes = this.dislikes.filter(dislike => !dislike.user.equals(userId));
  
  // Add new like
  this.likes.push({ user: userId });
  await this.save();
};

// Method to add dislike
youtubeVideoSchema.methods.addDislike = async function(userId) {
  // Remove existing like/dislike
  this.likes = this.likes.filter(like => !like.user.equals(userId));
  this.dislikes = this.dislikes.filter(dislike => !dislike.user.equals(userId));
  
  // Add new dislike
  this.dislikes.push({ user: userId });
  await this.save();
};

// Method to remove like/dislike
youtubeVideoSchema.methods.removeLikeDislike = async function(userId) {
  this.likes = this.likes.filter(like => !like.user.equals(userId));
  this.dislikes = this.dislikes.filter(dislike => !dislike.user.equals(userId));
  await this.save();
};

// Static method to find trending videos
youtubeVideoSchema.statics.findTrending = function(limit = 20) {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  return this.aggregate([
    { $match: { status: 'active', createdAt: { $gte: oneDayAgo } } },
    {
      $addFields: {
        trendingScore: {
          $add: [
            { $multiply: ['$views', 1] },
            { $multiply: [{ $size: '$likes' }, 5] },
            { $multiply: [{ $size: '$comments' }, 3] }
          ]
        }
      }
    },
    { $sort: { trendingScore: -1 } },
    { $limit: limit }
  ]);
};

// Static method to cleanup expired cache
youtubeVideoSchema.statics.cleanupExpiredCache = function() {
  return this.deleteMany({
    cacheExpiry: { $lt: new Date() },
    status: 'unavailable'
  });
};

// Pre-save middleware
youtubeVideoSchema.pre('save', function(next) {
  if (this.isNew) {
    // Set cache expiry to 24 hours from now
    this.cacheExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('YouTubeVideo', youtubeVideoSchema);