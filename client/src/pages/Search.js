import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideos, clearSearchResults } from '../store/slices/videoSlice';
import VideoCard from '../components/Video/VideoCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Search = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.videos);
  const [activeTab, setActiveTab] = useState('videos');

  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      dispatch(searchVideos({ query, type: activeTab }));
    }
    
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, query, activeTab]);

  const tabs = [
    { id: 'videos', name: 'Videos', count: searchResults?.results?.videos?.total || 0 },
    { id: 'users', name: 'Channels', count: searchResults?.results?.users?.total || 0 },
    { id: 'playlists', name: 'Playlists', count: searchResults?.results?.playlists?.total || 0 },
  ];

  if (!query) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Search PlayCast
        </h2>
        <p className="text-text-secondary">
          Enter a search term to find videos, channels, and playlists
        </p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Search results for "{query}"
        </h1>
        
        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex gap-8 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 font-medium text-sm transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className="ml-2 bg-bg-hover text-text-secondary py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Searching..." />
      ) : (
        <div>
          {activeTab === 'videos' && (
            <div>
              {searchResults?.results?.videos?.items?.length > 0 ? (
                <div className="grid-responsive">
                  {searchResults.results.videos.items.map((video) => (
                    <VideoCard key={video._id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-text-secondary">
                    No videos found for "{query}"
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              {searchResults?.results?.users?.items?.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.results.users.items.map((user) => (
                    <div key={user._id} className="card p-4 flex items-center gap-4">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-bg-hover rounded-full flex items-center justify-center">
                          <span className="text-xl font-medium text-text-secondary">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {user.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {user.subscribers?.length || 0} subscribers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-text-secondary">
                    No channels found for "{query}"
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'playlists' && (
            <div>
              {searchResults?.results?.playlists?.items?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.results.playlists.items.map((playlist) => (
                    <div key={playlist._id} className="card p-4">
                      <h3 className="font-semibold text-text-primary mb-2">
                        {playlist.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-2">
                        {playlist.videos?.length || 0} videos
                      </p>
                      <p className="text-sm text-text-secondary">
                        By {playlist.ownerId?.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-text-secondary">
                    No playlists found for "{query}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;