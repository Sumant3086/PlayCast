import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  MagnifyingGlassIcon, 
  MoonIcon, 
  UserCircleIcon,
  Bars3Icon,
  ArrowRightStartOnRectangleIcon,
  VideoCameraIcon,
  Cog6ToothIcon,
  PlusIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { toggleDarkMode, toggleSidebar, setSearchQuery } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchQuery } = useSelector((state) => state.ui);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      dispatch(setSearchQuery(localSearchQuery));
      navigate(`/search?q=${encodeURIComponent(localSearchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="btn-icon lg:hidden"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          
          <Link to="/" className="logo">
            <div className="logo-icon">
              <VideoCameraIcon className="w-5 h-5 text-white" />
            </div>
            <span className="logo-text">PlayCast</span>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search videos, channels..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="btn-icon"
          >
            <MoonIcon className="w-6 h-6" />
          </button>

          {isAuthenticated ? (
            <>
              {/* YouTube button */}
              <Link to="/youtube" className="btn btn-secondary">
                <PlayIcon className="w-5 h-5" />
                <span className="hidden sm:inline">YouTube</span>
              </Link>

              {/* Upload button */}
              <Link to="/upload" className="btn btn-primary">
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Upload</span>
              </Link>

              {/* User menu */}
              <div className="user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="btn-icon"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="avatar"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <div className="user-menu-dropdown">
                    <Link
                      to="/profile"
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <UserCircleIcon className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    
                    {user?.role === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="user-menu-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Cog6ToothIcon className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    
                    <div className="user-menu-divider" />
                    
                    <button
                      onClick={handleLogout}
                      className="user-menu-item w-full text-left"
                    >
                      <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;