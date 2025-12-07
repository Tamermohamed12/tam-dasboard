import React, { useState, useEffect } from 'react';
import './Settings.css';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const { language: currentLanguage, changeLanguage } = useLanguage();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [timezone, setTimezone] = useState('UTC');
  const [currency, setCurrency] = useState('USD');
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage or API
    const settings = {
      theme,
      notifications,
      language: currentLanguage,
      timezone,
      currency
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-subtitle">Manage your account settings and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <button
              className={`settings-nav-item ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              ⚙️ General
            </button>
            <button
              className={`settings-nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              🎨 Appearance
            </button>
            <button
              className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              🔔 Notifications
            </button>
            <button
              className={`settings-nav-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              👤 Account
            </button>
            <button
              className={`settings-nav-item ${activeTab === 'help' ? 'active' : ''}`}
              onClick={() => setActiveTab('help')}
            >
              ❓ Help & Support
            </button>
          </nav>
        </div>

        <div className="settings-main">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>General Settings</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Language</label>
                    <p>Choose your preferred language</p>
                  </div>
                  <select
                    className="setting-control"
                    value={currentLanguage}
                    onChange={(e) => changeLanguage(e.target.value)}
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="ar">🇸🇦 العربية (Arabic)</option>
                    <option value="de">🇩🇪 Deutsch (German)</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Timezone</label>
                    <p>Set your local timezone</p>
                  </div>
                  <select
                    className="setting-control"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Currency</label>
                    <p>Select your preferred currency</p>
                  </div>
                  <select
                    className="setting-control"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CNY">CNY (¥)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Theme</label>
                    <p>Choose your preferred theme</p>
                  </div>
                  <div className="theme-options">
                    <button
                      className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <div className="theme-preview light">
                        <div className="theme-preview-header"></div>
                        <div className="theme-preview-content"></div>
                      </div>
                      <span>Light</span>
                    </button>
                    <button
                      className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <div className="theme-preview dark">
                        <div className="theme-preview-header"></div>
                        <div className="theme-preview-content"></div>
                      </div>
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notifications</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Email Notifications</label>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Push Notifications</label>
                    <p>Receive push notifications in browser</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>SMS Notifications</label>
                    <p>Receive notifications via SMS</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Marketing Emails</label>
                    <p>Receive marketing and promotional emails</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={() => handleNotificationChange('marketing')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Name</label>
                    <p>{user?.name || 'Not set'}</p>
                  </div>
                  <button className="btn-secondary">Edit</button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Email</label>
                    <p>{user?.email || 'Not set'}</p>
                  </div>
                  <button className="btn-secondary">Edit</button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Password</label>
                    <p>Last changed: Never</p>
                  </div>
                  <button className="btn-secondary">Change Password</button>
                </div>

                <div className="setting-item danger">
                  <div className="setting-info">
                    <label>Delete Account</label>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <button className="btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="settings-section">
              <h2>Help & Support</h2>
              <div className="help-content">
                <div className="help-section">
                  <h3>📚 Documentation</h3>
                  <p>Browse our comprehensive documentation to learn how to use all features.</p>
                  <button className="btn-primary">View Documentation</button>
                </div>

                <div className="help-section">
                  <h3>💬 Contact Support</h3>
                  <p>Need help? Our support team is here to assist you.</p>
                  <div className="contact-options">
                    <button className="btn-secondary">Email Support</button>
                    <button className="btn-secondary">Live Chat</button>
                  </div>
                </div>

                <div className="help-section">
                  <h3>❓ Frequently Asked Questions</h3>
                  <div className="faq-list">
                    <div className="faq-item">
                      <h4>How do I reset my password?</h4>
                      <p>Go to the login page and click "Forgot password" to reset your password via email.</p>
                    </div>
                    <div className="faq-item">
                      <h4>How do I change my email address?</h4>
                      <p>Go to Account Settings and click "Edit" next to your email address.</p>
                    </div>
                    <div className="faq-item">
                      <h4>How do I export my data?</h4>
                      <p>Contact support to request a data export. We'll provide your data in a downloadable format.</p>
                    </div>
                    <div className="faq-item">
                      <h4>What browsers are supported?</h4>
                      <p>We support all modern browsers including Chrome, Firefox, Safari, and Edge.</p>
                    </div>
                  </div>
                </div>

                <div className="help-section">
                  <h3>ℹ️ About</h3>
                  <div className="about-info">
                    <p><strong>Version:</strong> 1.0.0</p>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>License:</strong> Proprietary</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

