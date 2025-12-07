import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email input, 2: code verification, 3: new password
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCode = () => {
    const newErrors = {};
    if (!formData.verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (formData.verificationCode.length !== 6) {
      newErrors.verificationCode = 'Code must be 6 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Simulate sending verification code
    setTimeout(() => {
      setIsLoading(false);
      // Check if email exists in localStorage
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = savedUsers.find(u => u.email === formData.email);
      
      if (userExists) {
        // In a real app, you would send an email with a code
        // For demo purposes, we'll use a fixed code: 123456
        setSuccessMessage('Verification code sent to your email! (Demo code: 123456)');
        setStep(2);
      } else {
        setErrorMessage('No account found with this email address.');
      }
    }, 1500);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!validateCode()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Simulate code verification
    setTimeout(() => {
      setIsLoading(false);
      // Demo code is 123456
      if (formData.verificationCode === '123456') {
        setSuccessMessage('Code verified successfully!');
        setStep(3);
      } else {
        setErrorMessage('Invalid verification code. Please try again.');
      }
    }, 1000);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      // Update password in localStorage
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = savedUsers.map(user => {
        if (user.email === formData.email) {
          return { ...user, password: formData.newPassword };
        }
        return user;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setSuccessMessage('Password reset successfully! Redirecting to login...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Reset Password</h1>
          <p>
            {step === 1 && 'Enter your email to receive a verification code'}
            {step === 2 && 'Enter the verification code sent to your email'}
            {step === 3 && 'Create a new password'}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendCode} className="auth-form">
            {errorMessage && (
              <div className="error-alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="success-alert">
                {successMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="auth-form">
            {errorMessage && (
              <div className="error-alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="success-alert">
                {successMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="verificationCode">Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter 6-digit code"
                maxLength="6"
                className={errors.verificationCode ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.verificationCode && (
                <span className="error-message">{errors.verificationCode}</span>
              )}
              <p className="help-text">
                Demo code: <strong>123456</strong>
              </p>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="auth-secondary-btn"
                onClick={() => {
                  setStep(1);
                  setFormData(prev => ({ ...prev, verificationCode: '' }));
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="auth-form">
            {errorMessage && (
              <div className="error-alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="success-alert">
                {successMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className={errors.newPassword ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.newPassword && (
                <span className="error-message">{errors.newPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={errors.confirmPassword ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="auth-secondary-btn"
                onClick={() => {
                  setStep(2);
                  setFormData(prev => ({
                    ...prev,
                    newPassword: '',
                    confirmPassword: '',
                  }));
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="auth-link"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


