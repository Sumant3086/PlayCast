import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  UserCircleIcon, 
  VideoCameraIcon, 
  EyeIcon,
  HeartIcon,
  CalendarIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import VideoCard from '../components/Video/VideoCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileUser, setProfileUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('videos');

  const isOwnProfile = !id || currentUser?._id === id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // If no ID provided or it's the current user's profile, use current user data
        if (!id || isOwnProfile) {
          if (currentUser) {
            setProfileUser(currentUser);
            // Fetch user's videos
            const videosResponse = await api.get(`/users/${currentUser._id}/videos`);
            setUserVideos(videosResponse.data.videos || []);
          }
        } else {
          // Fetch other user's profile
          const userResponse = await api.get(`/users/${id}`);
          setProfileUser(userResponse.data.user);
          
          // Fetch user's public videos
          const videosResponse = await api.get(`/users/${id}/videos`);
          setUserVideos(videosResponse.data.videos || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile');
        setProfileUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id, currentUser, isOwnProfile]);

  const tabs = [
    { id: 'videos', name: 'Videos', count: userVideos?.length || 0 },
    { id: 'playlists', name: 'Playlists', count: 0 },
    { id: 'about', name: 'About', count: null },
  ];

  if (isLoading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  if (!profileUser) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          User not found
        </h2>
        <p className="text-text-secondary">The profile you're looking for doesn't exist.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalViews = () => {
    return userVideos.reduce((total, video) => total + (video.views || 0), 0);
  };

  return (
    <div className="container-custom py-8">
      {/* Profile Header */}
      <div className="card p-6 mb-8">
        <div className="flex items-start gap-6">
          {profileUser.avatar ? (
            <img
              src={profileUser.avatar}
              alt={profileUser.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-bg-hover rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-16 h-16 text-text-secondary" />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {profileUser.name}
                </h1>
                <p className="text-text-secondary">
                  {profileUser.subscribers?.length || 0} subscribers • {userVideos.length} videos
                </p>
              </div>
              
              {isOwnProfile ? (
                <button className="btn btn-secondary">
                  <PencilIcon className="w-5 h-5" />
                  Edit Profile
                </button>
              ) : (
                <button className="btn btn-primary">
                  Subscribe
                </button>
              )}
            </div>
            
            {/* Stats */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <EyeIcon className="w-5 h-5 text-text-secondary" />
                <span className="text-text-secondary">{getTotalViews().toLocaleString()} total views</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-text-secondary" />
                <span className="text-text-secondary">
                  Joined {formatDate(profileUser.createdAt || new Date())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-8">
        <nav className="flex gap-8 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.name}
              {tab.count !== null && (
                <span className="ml-2 bg-bg-hover text-text-secondary py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'videos' && (
          <div>
            {userVideos.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-text-secondary">
                    {userVideos.length} video{userVideos.length !== 1 ? 's' : ''}
                  </p>
                  {isOwnProfile && (
                    <Link to="/upload" className="btn btn-primary">
                      <VideoCameraIcon className="w-5 h-5" />
                      Upload New Video
                    </Link>
                  )}
                </div>
                <div className="grid-responsive">
                  {userVideos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <VideoCameraIcon className="w-12 h-12" />
                </div>
                <h3 className="empty-title">
                  {isOwnProfile ? 'No videos uploaded yet' : 'No public videos'}
                </h3>
                <p className="empty-description">
                  {isOwnProfile 
                    ? 'Start creating content and share your videos with the world!'
                    : 'This user hasn\'t uploaded any public videos yet.'
                  }
                </p>
                {isOwnProfile && (
                  <Link to="/upload" className="btn btn-primary">
                    <VideoCameraIcon className="w-5 h-5" />
                    Upload Video
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="empty-state">
            <div className="empty-icon">
              <HeartIcon className="w-12 h-12" />
            </div>
            <h3 className="empty-title">No playlists yet</h3>
            <p className="empty-description">
              {isOwnProfile 
                ? 'Create playlists to organize your favorite videos.'
                : 'This user hasn\'t created any public playlists yet.'
              }
            </p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              About {profileUser.name}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-text-primary mb-2">Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-secondary">Total views</p>
                    <p className="font-semibold text-text-primary">
                      {getTotalViews().toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Joined</p>
                    <p className="font-semibold text-text-primary">
                      {formatDate(profileUser.createdAt || new Date())}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Email</p>
                    <p className="font-semibold text-text-primary">
                      {profileUser.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Videos uploaded</p>
                    <p className="font-semibold text-text-primary">
                      {userVideos.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;