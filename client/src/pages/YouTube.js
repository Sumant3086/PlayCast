import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  PlayIcon, 
  MagnifyingGlassIcon, 
  FireIcon,
  PlusIcon,
  EyeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { searchYouTubeVideos, addYouTubeVideo, clearSearchResults } from '../store/slices/videoSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

const YouTube = () => {
  const dispatch = useDispatch();
  const { youtubeSearchResults, isLoading, youtubeQuota } = useSelector((state) => state.videos);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addingVideoId, setAddingVideoId] = useState(null);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  const categories = [
    { id: '', name: 'All Categories' },
    { id: '1', name: 'Film & Animation' },
    { id: '2', name: 'Autos & Vehicles' },
    { id: '10', name: 'Music' },
    { id: '15', name: 'Pets & Animals' },
    { id: '17', name: 'Sports' },
    { id: '19', name: 'Travel & Events' },
    { id: '20', name: 'Gaming' },
    { id: '22', name: 'People & Blogs' },
    { id: '23', name: 'Comedy' },
    { id: '24', name: 'Entertainment' },
    { id: '25', name: 'News & Politics' },
    { id: '26', name: 'Howto & Style' },
    { id: '27', name: 'Education' },
    { id: '28', name: 'Science & Technology' }
  ];

  useEffect(() => {
    // Load trending videos on component mount
    loadTrendingVideos();
    
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  const loadTrendingVideos = async () => {
    try {
      setLoadingTrending(true);
      const response = await fetch('http://localhost:5000/api/youtube/trending');
      const data = await response.json();
      setTrendingVideos(data.videos || []);
    } catch (error) {
      console.error('Failed to load trending videos:', error);
      toast.error('Failed to load trending videos');
    } finally {
      setLoadingTrending(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      await dispatch(searchYouTubeVideos({ 
        query: searchQuery.trim(),
        maxResults: 25,
        categoryId: selectedCategory || undefined
      })).unwrap();
    } catch (error) {
      toast.error('Failed to search YouTube videos');
    }
  };

  const handleAddVideo = async (video) => {
    if (!isAuthenticated) {
      toast.error('Please login to add videos');
      return;
    }

    setAddingVideoId(video.youtubeId);
    
    try {
      await dispatch(addYouTubeVideo({ 
        youtubeId: video.youtubeId 
      })).unwrap();
      
      toast.success('YouTube video added to PlayCast!');
    } catch (error) {
      toast.error(error || 'Failed to add video');
    } finally {
      setAddingVideoId(null);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views?.toString() || '0';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const VideoItem = ({ video, showAddButton = true }) => (
    <div className="bg-bg-secondary rounded-xl overflow-hidden hover:bg-bg-hover transition-colors">
      <div className="flex gap-4 p-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="relative w-48 h-28 bg-bg-primary rounded overflow-hidden">
            {video.thumbnails?.medium ? (
              <img
                src={video.thumbnails.medium}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PlayIcon className="w-12 h-12 text-text-secondary" />
              </div>
            )}
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
            )}
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <PlayIcon className="w-3 h-3" />
              YouTube
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary font-semibold line-clamp-2 mb-2 leading-tight">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <PlayIcon className="w-3 h-3 text-white" />
            </div>
            <span className="text-text-secondary text-sm font-medium">
              {video.channelTitle}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
            {video.youtubeStats?.viewCount && (
              <div className="flex items-center gap-1">
                <EyeIcon className="w-3 h-3" />
                <span>{formatViews(video.youtubeStats.viewCount)} views</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>

          <p className="text-text-secondary text-sm line-clamp-2 mb-3">
            {video.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <PlayIcon className="w-4 h-4" />
                Watch on YouTube
              </a>
            </div>
            
            {showAddButton && isAuthenticated && (
              <button
                onClick={() => handleAddVideo(video)}
                disabled={addingVideoId === video.youtubeId}
                className="btn btn-primary btn-sm"
              >
                {addingVideoId === video.youtubeId ? (
                  <div className="spinner-icon w-3 h-3"></div>
                ) : (
                  <>
                    <PlusIcon className="w-4 h-4" />
                    Add to PlayCast
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <PlayIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">YouTube Videos</h1>
            <p className="text-text-secondary">Discover and add YouTube videos to PlayCast</p>
          </div>
        </div>

        {/* Quota Information */}
        {youtubeQuota && (
          <div className="bg-bg-secondary rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-text-secondary">YouTube API Quota Usage:</span>
              <span className="text-text-primary font-medium">
                {youtubeQuota.used} / {youtubeQuota.limit} ({youtubeQuota.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-bg-primary rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(youtubeQuota.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="bg-bg-secondary rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Search YouTube</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for videos, channels, or topics..."
                className="input-field pr-12"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field min-w-[200px]"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="btn btn-primary px-8"
            >
              {isLoading ? (
                <div className="spinner-icon w-4 h-4"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Trending Videos Section */}
      {!youtubeSearchResults && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <FireIcon className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-semibold text-text-primary">Trending on YouTube</h2>
          </div>
          
          {loadingTrending ? (
            <LoadingSpinner text="Loading trending videos..." />
          ) : trendingVideos.length > 0 ? (
            <div className="space-y-4">
              {trendingVideos.slice(0, 10).map((video) => (
                <VideoItem key={video.youtubeId} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FireIcon className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary">No trending videos available</p>
            </div>
          )}
        </div>
      )}

      {/* Search Results */}
      {youtubeSearchResults && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">
              Search Results ({youtubeSearchResults.videos?.length || 0})
            </h2>
            <button
              onClick={() => dispatch(clearSearchResults())}
              className="btn btn-secondary"
            >
              Clear Results
            </button>
          </div>

          {isLoading ? (
            <LoadingSpinner text="Searching YouTube..." />
          ) : youtubeSearchResults.videos?.length > 0 ? (
            <div className="space-y-4">
              {youtubeSearchResults.videos.map((video) => (
                <VideoItem key={video.youtubeId} video={video} />
              ))}
              
              {/* Load More Button */}
              {youtubeSearchResults.pagination?.nextPageToken && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => dispatch(searchYouTubeVideos({
                      query: searchQuery,
                      pageToken: youtubeSearchResults.pagination.nextPageToken,
                      categoryId: selectedCategory || undefined
                    }))}
                    className="btn btn-secondary"
                  >
                    Load More Videos
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary">No videos found for "{searchQuery}"</p>
              <p className="text-text-secondary text-sm mt-2">Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YouTube;