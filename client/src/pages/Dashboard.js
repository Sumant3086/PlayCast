import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  UsersIcon, 
  VideoCameraIcon, 
  EyeIcon,
  ServerIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock dashboard data - in real app, fetch from API
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalVideos: 3892,
        totalViews: 125847,
        storageUsed: 2.4, // GB
        recentUsers: [
          { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: new Date() },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: new Date() },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joinedAt: new Date() },
        ],
        recentVideos: [
          { id: 1, title: 'Sample Video 1', uploader: 'John Doe', views: 1250, uploadedAt: new Date() },
          { id: 2, title: 'Sample Video 2', uploader: 'Jane Smith', views: 890, uploadedAt: new Date() },
          { id: 3, title: 'Sample Video 3', uploader: 'Bob Johnson', views: 2340, uploadedAt: new Date() },
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: UsersIcon,
      color: '#FF4747'
    },
    {
      title: 'Total Videos',
      value: stats.totalVideos.toLocaleString(),
      icon: VideoCameraIcon,
      color: '#4F46E5'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: EyeIcon,
      color: '#059669'
    },
    {
      title: 'Storage Used',
      value: `${stats.storageUsed} GB`,
      icon: ServerIcon,
      color: '#DC2626'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '32px' }}>
      <div className="mb-8">
        <h1 className="text-primary mb-2" style={{ fontSize: '32px', fontWeight: '700' }}>
          Admin Dashboard
        </h1>
        <p className="text-secondary">
          Welcome back, {user?.name}! Here's what's happening on PlayCast.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-1 sm-grid-2 lg-grid-4 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary mb-1" style={{ fontSize: '14px' }}>
                    {stat.title}
                  </p>
                  <p className="text-primary" style={{ fontSize: '24px', fontWeight: '700' }}>
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-1 lg-grid-2" style={{ gap: '32px' }}>
        {/* Recent Users */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-primary" style={{ fontSize: '20px', fontWeight: '600' }}>
              Recent Users
            </h2>
            <button className="btn btn-ghost" style={{ fontSize: '14px' }}>
              View All
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-300">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-primary" style={{ fontWeight: '500' }}>
                      {user.name}
                    </p>
                    <p className="text-secondary" style={{ fontSize: '14px' }}>
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-secondary" style={{ fontSize: '12px' }}>
                    {formatDate(user.joinedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Videos */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-primary" style={{ fontSize: '20px', fontWeight: '600' }}>
              Recent Videos
            </h2>
            <button className="btn btn-ghost" style={{ fontSize: '14px' }}>
              View All
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stats.recentVideos.map((video) => (
              <div key={video.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                    <VideoCameraIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-primary" style={{ fontWeight: '500' }}>
                      {video.title}
                    </p>
                    <p className="text-secondary" style={{ fontSize: '14px' }}>
                      by {video.uploader}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary" style={{ fontSize: '14px', fontWeight: '500' }}>
                    {video.views.toLocaleString()} views
                  </p>
                  <p className="text-secondary" style={{ fontSize: '12px' }}>
                    {formatDate(video.uploadedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card p-6 mt-8">
        <h2 className="text-primary mb-6" style={{ fontSize: '20px', fontWeight: '600' }}>
          System Status
        </h2>
        
        <div className="grid grid-1 sm-grid-3" style={{ gap: '24px' }}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-primary" style={{ fontWeight: '500' }}>API Server</p>
              <p className="text-secondary" style={{ fontSize: '14px' }}>Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-primary" style={{ fontWeight: '500' }}>Database</p>
              <p className="text-secondary" style={{ fontSize: '14px' }}>Connected</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-primary" style={{ fontWeight: '500' }}>Video Processing</p>
              <p className="text-secondary" style={{ fontSize: '14px' }}>2 jobs in queue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;