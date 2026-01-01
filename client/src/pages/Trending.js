import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FireIcon, PlayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { fetchTrendingVideos, searchYouTubeVideos } from '../store/slices/videoSlice';
import VideoCard from '../components/Video/VideoCard';
import YouTubeSearch from '../components/YouTube/YouTubeSearch';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Trending = () => {
  const dispatch = useDispatch();
  const { trendingVideos, youtubeSearchResults, isLoading } = useSelector((state) => state.videos);
  const [showYouTubeSearch, setShowYouTubeSearch] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

  useEffect(() => {
    dispatch(fetchTrendingVideos({ includeYoutube: true }));
    // Also fetch some popular YouTube videos
    dispatch(searchYouTubeVideos({ query: 'trending', maxResults: 20 }));
  }, [dispatch]);

  const tabs = [
    { id: 'trending', name: 'Trending', icon: FireIcon },
    { id: 'youtube', name: 'YouTube Trending', icon: PlayIcon },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'youtube' && (!youtubeSearchResults || youtubeSearchResults.videos?.length === 0)) {
      dispatch(searchYouTubeVideos({ query: 'trending music gaming technology', maxResults: 25 }));
    }
  };

  const getDisplayVideos = () => {
    if (activeTab === 'youtube') {
      return youtubeSearchResults?.videos || [];
    }
    return trendingVideos || [];
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
              <FireIcon className="w-8 h-8 text-orange-500" />
              Trending Videos
            </h1>
            <p className="text-text-secondary">
              Discover what's popular right now on PlayCast and YouTube
            </p>
          </div>
          
          <button
            onClick={() => setShowYouTubeSearch(!showYouTubeSearch)}
            className="btn btn-primary"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            Search YouTube
          </button>
        </div>

        {/* YouTube Search */}
        {showYouTubeSearch && (
          <div className="mb-8">
            <YouTubeSearch onVideoAdded={() => {
              dispatch(fetchTrendingVideos({ includeYoutube: true }));
              setShowYouTubeSearch(false);
            }} />
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex gap-8 -mb-px">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-3 px-1 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? 'border-accent text-accent' 
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="Loading trending videos..." />
      ) : (
        <div>
          {getDisplayVideos().length > 0 ? (
            <div className="grid-responsive">
              {getDisplayVideos().map((video, index) => (
                <div key={video._id || video.youtubeId || index} className="relative">
                  {/* Trending rank for top videos */}
                  {activeTab === 'trending' && index < 10 && (
                    <div className="absolute -top-2 -left-2 z-10 bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  )}
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <FireIcon className="w-12 h-12" />
              </div>
              <h3 className="empty-title">No trending videos</h3>
              <p className="empty-description">
                {activeTab === 'youtube' 
                  ? 'No YouTube trending videos found. Try searching for specific content.'
                  : 'No trending videos available right now. Check back later!'
                }
              </p>
              <button
                onClick={() => setShowYouTubeSearch(true)}
                className="btn btn-primary"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Search YouTube
              </button>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-accent mb-2">
            {trendingVideos?.length || 0}
          </div>
          <div className="text-text-secondary">PlayCast Trending</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-red-500 mb-2">
            {youtubeSearchResults?.videos?.length || 0}
          </div>
          <div className="text-text-secondary">YouTube Results</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-green-500 mb-2">
            {(trendingVideos?.length || 0) + (youtubeSearchResults?.videos?.length || 0)}
          </div>
          <div className="text-text-secondary">Total Available</div>
        </div>
      </div>
    </div>
  );
};

export default Trending;