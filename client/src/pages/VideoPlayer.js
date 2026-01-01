import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  HeartIcon, 
  ShareIcon, 
  EyeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  PencilIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { fetchVideoById, likeVideo, addComment } from '../store/slices/videoSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import VideoCard from '../components/Video/VideoCard';
import toast from 'react-hot-toast';
import api from '../services/api';

const VideoPlayer = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const { currentVideo, isLoading, videos } = useSelector((state) => state.videos);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const videoType = searchParams.get('type') || 'native';
  const isYouTubeVideo = videoType === 'youtube';

  useEffect(() => {
    if (id) {
      dispatch(fetchVideoById({ videoId: id, videoType: isYouTubeVideo ? 'youtube' : 'native' }));
    }
  }, [dispatch, id, isYouTubeVideo]);

  useEffect(() => {
    if (currentVideo && user) {
      const userLike = currentVideo.likes?.find(like => 
        (like.user === user._id) || (like.user?._id === user._id)
      );
      setIsLiked(!!userLike);
    }
  }, [currentVideo, user]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like videos');
      return;
    }

    try {
      await dispatch(likeVideo({ 
        videoId: id, 
        videoType: isYouTubeVideo ? 'youtube' : 'native' 
      })).unwrap();
      setIsLiked(!isLiked);
      toast.success(isLiked ? 'Removed from liked videos' : 'Added to liked videos');
    } catch (error) {
      toast.error('Failed to update like status');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to comment');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      await dispatch(addComment({ 
        videoId: id, 
        videoType: isYouTubeVideo ? 'youtube' : 'native',
        comment: comment.trim() 
      })).unwrap();
      setComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteVideo = async () => {
    if (!window.confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete(`/videos/${id}`);
      toast.success('Video deleted successfully');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to delete video');
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: currentVideo.title,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Video link copied to clipboard!');
    }
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
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getVideoUrl = () => {
    if (isYouTubeVideo) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    } else {
      // For native videos, serve the original file directly
      return `http://localhost:5000/videos/${currentVideo.originalFile?.filename}`;
    }
  };

  const getOwnerInfo = () => {
    if (isYouTubeVideo) {
      return {
        name: currentVideo.channelTitle,
        avatar: null,
        subscribers: 0,
        _id: null
      };
    } else {
      return currentVideo.ownerId || currentVideo.addedBy;
    }
  };

  const isOwner = () => {
    if (isYouTubeVideo) return false;
    const owner = getOwnerInfo();
    return user && owner && (user._id === owner._id);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading video..." />;
  }

  if (!currentVideo) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Video not found
        </h2>
        <p className="text-text-secondary mb-6">
          The video you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary">
          Go back to home
        </Link>
      </div>
    );
  }

  const owner = getOwnerInfo();
  const viewCount = isYouTubeVideo ? 
    (currentVideo.youtubeStats?.viewCount || currentVideo.views || 0) : 
    (currentVideo.views || 0);
  const likeCount = isYouTubeVideo ? 
    (currentVideo.youtubeStats?.likeCount || currentVideo.likes?.length || 0) : 
    (currentVideo.likes?.length || 0);

  return (
    <div className="container-custom py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Video player */}
          <div className="bg-black rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
            {isYouTubeVideo ? (
              <iframe
                src={getVideoUrl()}
                title={currentVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                controls
                className="w-full h-full"
                poster={currentVideo.thumbnails?.[0] ? 
                  `http://localhost:5000${currentVideo.thumbnails[0].path}` : 
                  `http://localhost:5000/thumbnails/default-thumbnail.svg`
                }
              >
                <source src={getVideoUrl()} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Video info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-xl lg:text-2xl font-bold text-text-primary pr-4">
                {currentVideo.title}
              </h1>
              
              {/* Video menu for owner */}
              {isOwner() && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="btn-icon"
                  >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-bg-secondary border border-border rounded-lg p-2 min-w-[150px] z-50 shadow-xl">
                      <button
                        onClick={() => navigate(`/video/${id}/edit`)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-md transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                        Edit Video
                      </button>
                      <button
                        onClick={handleDeleteVideo}
                        disabled={isDeleting}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-bg-hover rounded-md transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                        {isDeleting ? 'Deleting...' : 'Delete Video'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-text-secondary text-sm">
                <div className="flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  <span>{formatViews(viewCount)} views</span>
                </div>
                <span>•</span>
                <span>{formatDate(currentVideo.createdAt || currentVideo.publishedAt)}</span>
                {isYouTubeVideo && (
                  <>
                    <span>•</span>
                    <span className="text-red-500">YouTube</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`btn ${isLiked ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
                >
                  {isLiked ? (
                    <HeartIconSolid className="w-5 h-5" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  <span>{formatViews(likeCount)}</span>
                </button>

                <button onClick={handleShare} className="btn btn-secondary flex items-center gap-2">
                  <ShareIcon className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Channel info */}
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {owner?.avatar ? (
                    <img
                      src={owner.avatar}
                      alt={owner.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : isYouTubeVideo ? (
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {owner?.name?.charAt(0)?.toUpperCase() || 'Y'}
                      </span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-bg-hover rounded-full flex items-center justify-center">
                      <UserCircleIcon className="w-8 h-8 text-text-secondary" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {owner?.name || 'Unknown Channel'}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {owner?.subscribers?.length || 0} subscribers
                    </p>
                  </div>
                </div>
                
                {isAuthenticated && !isOwner() && (
                  <button className="btn btn-primary">
                    Subscribe
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            {currentVideo.description && (
              <div className="card p-4">
                <p className="text-text-primary whitespace-pre-wrap">
                  {currentVideo.description}
                </p>
              </div>
            )}

            {/* Comments section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-6 h-6 text-text-secondary" />
                <h3 className="text-lg font-semibold text-text-primary">
                  {currentVideo.comments?.length || 0} Comments
                </h3>
              </div>

              {/* Add comment */}
              {isAuthenticated ? (
                <form onSubmit={handleAddComment} className="space-y-4">
                  <div className="flex gap-4">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-bg-hover rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-text-secondary font-medium">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="input-field resize-none"
                        rows="3"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="submit"
                          disabled={!comment.trim()}
                          className="btn btn-primary"
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-text-secondary mb-4">
                    Please login to leave a comment
                  </p>
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                </div>
              )}

              {/* Comments list */}
              <div className="space-y-6">
                {currentVideo.comments?.map((comment, index) => (
                  <div key={index} className="flex gap-4">
                    {comment.user?.avatar ? (
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-bg-hover rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-text-secondary font-medium">
                          {comment.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-text-primary">
                          {comment.user?.name || 'Anonymous'}
                        </span>
                        <span className="text-text-secondary text-sm">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-text-primary">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Related videos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Related Videos
          </h3>
          <div className="space-y-4">
            {videos.slice(0, 10).map((video) => (
              <div key={video._id || video.youtubeId} className="flex gap-3">
                <div className="w-40 flex-shrink-0">
                  <VideoCard video={video} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;