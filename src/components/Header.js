import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Header = ({ onMenuClick, theme, toggleTheme, user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { logout } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <header className="main-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          ☰
        </button>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="header-right">
        <div className="header-icons">
          <div className="language-menu-container">
            <button 
              className="icon-btn language-btn"
              onClick={() => setShowLangMenu(!showLangMenu)}
              title="Change Language"
            >
              {languages.find(lang => lang.code === language)?.flag || '🌐'}
            </button>
            {showLangMenu && (
              <div className="language-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-menu-item ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="icon-btn notification-btn">
            🔔
            <span className="notification-badge">3</span>
          </button>
          <button className="icon-btn">📧</button>
          <button className="theme-toggle-header" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <button className="create-report-btn">Create Report</button>
        <div className="user-menu-container">
          <button
            className="icon-btn user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {user?.name?.charAt(0) || 'U'}
          </button>
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-info">
                <div className="user-name">{user?.name || 'User'}</div>
                <p className="user-email">{user?.email || 'user@example.com'}</p>
              </div>
              <div className="user-menu-divider"></div>
              <button 
                className="user-menu-item"
                onClick={() => {
                  navigate('/profile');
                  setShowUserMenu(false);
                }}
              >
                Profile
              </button>
              <button 
                className="user-menu-item"
                onClick={() => {
                  navigate('/settings');
                  setShowUserMenu(false);
                }}
              >
                Settings
              </button>
              <div className="user-menu-divider"></div>
              <button className="user-menu-item" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
