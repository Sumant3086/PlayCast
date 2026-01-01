import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  HomeIcon,
  FireIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  HeartIcon,
  FolderIcon,
  UserGroupIcon,
  VideoCameraIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { setSidebarOpen } from '../../store/slices/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      name: 'Trending',
      href: '/trending',
      icon: FireIcon,
    },
    {
      name: 'YouTube',
      href: '/youtube',
      icon: PlayIcon,
    },
    {
      name: 'Search',
      href: '/search',
      icon: MagnifyingGlassIcon,
    },
  ];

  const authenticatedNavigation = [
    {
      name: 'Upload',
      href: '/upload',
      icon: VideoCameraIcon,
    },
    {
      name: 'Watch History',
      href: '/history',
      icon: ClockIcon,
    },
    {
      name: 'Liked Videos',
      href: '/liked',
      icon: HeartIcon,
    },
    {
      name: 'Playlists',
      href: '/playlists',
      icon: FolderIcon,
    },
    {
      name: 'Subscriptions',
      href: '/subscriptions',
      icon: UserGroupIcon,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="py-4">
            {/* Main navigation */}
            <div className="px-2 mb-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                    onClick={() => dispatch(setSidebarOpen(false))}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Authenticated navigation */}
            {isAuthenticated && (
              <div className="px-2 mb-8">
                <div className="text-text-secondary text-sm font-medium px-4 mb-3">
                  Library
                </div>
                {authenticatedNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                      onClick={() => dispatch(setSidebarOpen(false))}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* User info */}
            {isAuthenticated && user && (
              <div className="px-2 mb-8">
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-text-primary text-sm font-medium">{user.name}</p>
                      <p className="text-text-secondary text-xs">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border mt-auto">
            <p className="text-text-secondary text-xs text-center">
              © 2026 PlayCast. Built with ❤️
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;