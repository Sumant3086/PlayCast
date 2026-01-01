import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVideos, fetchTrendingVideos, setFilters } from '../store/slices/videoSlice';
import VideoCard from '../components/Video/VideoCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import YouTubeSearch from '../components/YouTube/YouTubeSearch';
import { PlayIcon, FireIcon, ClockIcon, PlusIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const dispatch = useDispatch();
  const { videos, trendingVideos, isLoading, pagination, filters } = useSelector((state) => state.videos);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showYouTubeSearch, setShowYouTubeSearch] = useState(false);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'education', name: 'Education' },
    { id: 'music', name: 'Music' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'news', name: 'News' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  useEffect(() => {
    dispatch(fetchVideos({ 
      page: 1, 
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sort: filters.sort 
    }));
    dispatch(fetchTrendingVideos());
  }, [dispatch, selectedCategory, filters.sort]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    dispatch(setFilters({ category: categoryId }));
  };

  const handleSortChange = (sortBy) => {
    dispatch(setFilters({ sort: sortBy }));
  };

  if (isLoading && videos.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-custom">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="hero-title">Welcome to PlayCast</h1>
            <p className="hero-subtitle">
              Discover amazing videos, share your creativity, and connect with creators worldwide. 
              Experience the future of video streaming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trending" className="btn btn-primary">
                <FireIcon className="w-5 h-5" />
                Explore Trending
              </Link>
              {isAuthenticated ? (
                <Link to="/upload" className="btn btn-secondary">
                  <PlayIcon className="w-5 h-5" />
                  Start Creating
                </Link>
              ) : (
                <Link to="/register" className="btn btn-secondary">
                  Join PlayCast
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom">
        {/* Trending Section */}
        {trendingVideos.length > 0 && (
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <FireIcon className="w-6 h-6 text-accent" />
                Trending Now
              </h2>
              <Link to="/trending" className="btn btn-ghost">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingVideos.slice(0, 5).map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* YouTube Search Section */}
        {isAuthenticated && (
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <PlayIcon className="w-6 h-6 text-red-500" />
                YouTube Integration
              </h2>
              <Link to="/youtube" className="btn btn-secondary">
                <PlayIcon className="w-5 h-5" />
                Browse YouTube
              </Link>
            </div>
            
            {showYouTubeSearch && (
              <YouTubeSearch 
                onVideoAdded={(video) => {
                  // Refresh videos list when a YouTube video is added
                  dispatch(fetchVideos({ 
                    page: 1, 
                    category: selectedCategory === 'all' ? undefined : selectedCategory,
                    sort: filters.sort 
                  }));
                  setShowYouTubeSearch(false);
                }}
              />
            )}
            
            {!showYouTubeSearch && (
              <div className="bg-bg-secondary rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Discover YouTube Videos
                </h3>
                <p className="text-text-secondary mb-4">
                  Search and add your favorite YouTube videos to PlayCast
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/youtube" className="btn btn-primary">
                    <PlayIcon className="w-5 h-5" />
                    Browse YouTube
                  </Link>
                  <button
                    onClick={() => setShowYouTubeSearch(true)}
                    className="btn btn-secondary"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Quick Search
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
        {isAuthenticated && (
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <ClockIcon className="w-6 h-6 text-accent" />
                Continue Watching
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <div className="card p-6 text-center">
                <ClockIcon className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary mb-4">No videos in progress</p>
                <Link to="/trending" className="btn btn-ghost">
                  Discover Videos
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-4 gap-4">
          <h2 className="section-title">
            {selectedCategory === 'all' ? 'All Videos' : `${categories.find(c => c.id === selectedCategory)?.name} Videos`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Sort by:</span>
            <select
              value={filters.sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="input-field py-2 px-3 text-sm min-w-[120px]"
            >
              <option value="createdAt">Latest</option>
              <option value="views">Most Viewed</option>
              <option value="likes">Most Liked</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Main Video Grid */}
        <section className="content-section">
          {videos.length > 0 ? (
            <div className="grid-responsive">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <PlayIcon className="w-12 h-12" />
              </div>
              <h3 className="empty-title">No videos found</h3>
              <p className="empty-description">
                {selectedCategory === 'all' 
                  ? "Be the first to upload a video and start the community!" 
                  : `No videos in the ${categories.find(c => c.id === selectedCategory)?.name} category yet.`
                }
              </p>
              {isAuthenticated ? (
                <Link to="/upload" className="btn btn-primary">
                  <PlayIcon className="w-5 h-5" />
                  Upload First Video
                </Link>
              ) : (
                <Link to="/register" className="btn btn-primary">
                  Join PlayCast
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center mt-8 mb-8">
            <div className="flex gap-2">
              {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => dispatch(fetchVideos({ 
                      page, 
                      category: selectedCategory === 'all' ? undefined : selectedCategory,
                      sort: filters.sort 
                    }))}
                    className={`btn ${pagination.page === page ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {page}
                  </button>
                );
              })}
              {pagination.pages > 5 && (
                <span className="px-4 py-2 text-text-secondary">...</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;