import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, HeartIcon, ChatBubbleLeftIcon, PlayIcon } from '@heroicons/react/24/outline';

const VideoCard = ({ video }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!video) return null;

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  // Determine if this is a YouTube video
  const isYouTubeVideo = video.videoType === 'youtube' || video.youtubeId || video.type === 'youtube';
  
  // Get thumbnail URL
  const getThumbnailUrl = () => {
    if (isYouTubeVideo) {
      return video.thumbnails?.medium || video.thumbnails?.high || video.thumbnails?.default || 
             `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
    } else {
      // For native videos, use default thumbnail or fallback
      if (video.thumbnails?.[0]?.path) {
        return `http://localhost:5000${video.thumbnails[0].path}`;
      }
      return `http://localhost:5000/thumbnails/default-thumbnail.svg`;
    }
  };

  const thumbnailUrl = getThumbnailUrl();

  // Get video URL for navigation
  const videoUrl = isYouTubeVideo 
    ? `/video/${video.youtubeId || video._id}?type=youtube`
    : `/video/${video._id}`;

  // Get channel/owner name
  const channelName = isYouTubeVideo 
    ? video.channelTitle 
    : video.ownerId?.name || video.addedBy?.name || 'Unknown';

  // Get view count
  const viewCount = isYouTubeVideo 
    ? video.youtubeStats?.viewCount || video.views || 0
    : video.views || 0;

  // Get like count
  const likeCount = isYouTubeVideo 
    ? video.youtubeStats?.likeCount || video.likes?.length || 0
    : video.likes?.length || 0;

  // Get comment count
  const commentCount = isYouTubeVideo 
    ? video.youtubeStats?.commentCount || video.comments?.length || 0
    : video.comments?.length || 0;

  return (
    <div className="video-card group">
      <Link to={videoUrl} className="block">
        {/* Thumbnail */}
        <div className="video-thumbnail relative overflow-hidden">
          {!imageError && thumbnailUrl ? (
            <>
              <img
                src={thumbnailUrl}
                alt={video.title}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-bg-hover animate-pulse flex items-center justify-center">
                  <PlayIcon className="w-8 h-8 text-text-secondary" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-bg-hover">
              <PlayIcon className="w-12 h-12 text-text-secondary" />
            </div>
          )}
          
          {/* Video Type Badge */}
          {isYouTubeVideo && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <PlayIcon className="w-3 h-3" />
              YouTube
            </div>
          )}
          
          {/* Duration */}
          {video.duration && (
            <div className="video-duration">
              {formatDuration(video.duration)}
            </div>
          )}

          {/* Play overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3">
              <PlayIcon className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="video-info">
          <h3 className="video-title group-hover:text-accent transition-colors duration-200">
            {video.title}
          </h3>
          
          {/* Channel Info */}
          <div className="video-meta">
            {isYouTubeVideo ? (
              <>
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <PlayIcon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-text-secondary hover:text-text-primary transition-colors truncate">
                  {channelName}
                </span>
              </>
            ) : (
              <>
                {video.ownerId?.avatar || video.addedBy?.avatar ? (
                  <img
                    src={video.ownerId?.avatar || video.addedBy?.avatar}
                    alt={channelName}
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 bg-bg-hover rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-text-secondary">
                      {channelName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <span className="text-sm text-text-secondary hover:text-text-primary transition-colors truncate">
                  {channelName}
                </span>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="video-stats">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <EyeIcon className="w-3 h-3" />
                <span>{formatViews(viewCount)} views</span>
              </div>
              {likeCount > 0 && (
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-3 h-3" />
                  <span>{formatViews(likeCount)}</span>
                </div>
              )}
              {commentCount > 0 && (
                <div className="flex items-center gap-1">
                  <ChatBubbleLeftIcon className="w-3 h-3" />
                  <span>{formatViews(commentCount)}</span>
                </div>
              )}
            </div>
            <span className="text-xs">{formatDate(video.createdAt || video.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;