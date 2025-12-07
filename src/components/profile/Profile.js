import React, { useState, useEffect } from 'react';
import '../../components/profile/Profile.css'
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    profileImage: user?.profileImage || null
  });
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData(prev => ({ ...prev, ...parsed }));
      setPreviewImage(parsed.profileImage || user?.profileImage || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profileImage: 'Please select an image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profileImage: 'Image size should be less than 5MB'
        }));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setPreviewImage(imageDataUrl);
        setProfileData(prev => ({
          ...prev,
          profileImage: imageDataUrl
        }));
        setErrors(prev => ({
          ...prev,
          profileImage: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setProfileData(prev => ({
      ...prev,
      profileImage: null
    }));
    // Reset file input
    const fileInput = document.getElementById('profile-image-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Save to localStorage
      const profileToSave = {
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('userProfile', JSON.stringify(profileToSave));

      // Update user context if needed
      // You can extend AuthContext to update user profile
      
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }, 1000);
    } catch (error) {
      setIsSaving(false);
      alert('Error saving profile: ' + error.message);
    }
  };

  const handleCancel = () => {
    // Reset to saved data
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData(prev => ({ ...prev, ...parsed }));
      setPreviewImage(parsed.profileImage || null);
    } else {
      setProfileData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        bio: '',
        location: '',
        website: '',
        profileImage: null
      });
      setPreviewImage(null);
    }
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="profile-subtitle">Manage your profile information and settings</p>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <span className="placeholder-icon">👤</span>
                  <span className="placeholder-text">No Image</span>
                </div>
              )}
              {isEditing && (
                <div className="image-overlay">
                  <label htmlFor="profile-image-input" className="image-upload-btn">
                    📷 Change Photo
                  </label>
                  {previewImage && (
                    <button 
                      className="image-remove-btn"
                      onClick={handleRemoveImage}
                      type="button"
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="file"
                id="profile-image-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            )}
            {errors.profileImage && (
              <span className="error-message">{errors.profileImage}</span>
            )}
            <div className="profile-name-section">
              <h2>{profileData.name || 'User'}</h2>
              <p className="profile-email">{profileData.email || 'user@example.com'}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Orders</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">$0</div>
              <div className="stat-label">Total Spent</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Reviews</div>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-actions">
            {!isEditing ? (
              <button 
                className="btn-primary"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : '💾 Save Changes'}
                </button>
                <button 
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="4"
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                />
                <span className="char-count">{profileData.bio.length}/500</span>
              </div>
            </div>

            <div className="form-section">
              <h3>Account Settings</h3>
              
              <div className="form-group">
                <label>Account Status</label>
                <div className="status-badge active">Active</div>
              </div>

              <div className="form-group">
                <label>Member Since</label>
                <p className="read-only-text">
                  {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <div className="form-group">
                <button 
                  className="btn-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      logout();
                    }
                  }}
                >
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
