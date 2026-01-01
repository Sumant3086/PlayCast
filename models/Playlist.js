const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videos: [{
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  thumbnail: {
    type: String,
    default: null
  },
  isSystemPlaylist: {
    type: Boolean,
    default: false
  },
  playlistType: {
    type: String,
    enum: ['custom', 'liked', 'watchLater', 'history'],
    default: 'custom'
  }
}, {
  timestamps: true
});

// Indexes
playlistSchema.index({ ownerId: 1 });
playlistSchema.index({ visibility: 1 });
playlistSchema.index({ title: 'text', description: 'text' });

// Virtual for video count
playlistSchema.virtual('videoCount').get(function() {
  return this.videos.length;
});

// Method to add video to playlist
playlistSchema.methods.addVideo = function(videoId) {
  const existingVideo = this.videos.find(v => v.video.toString() === videoId.toString());
  if (!existingVideo) {
    this.videos.push({ video: videoId });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove video from playlist
playlistSchema.methods.removeVideo = function(videoId) {
  this.videos = this.videos.filter(v => v.video.toString() !== videoId.toString());
  return this.save();
};

module.exports = mongoose.model('Playlist', playlistSchema);